import { NextRequest, NextResponse } from "next/server";
import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuinsClient, SuinsTransaction } from "@mysten/suins";
import { isEmailAllowed, isValidSubdomain, SUINS_CONFIG } from "@/lib/claim-config";
import { isEmailVerified } from "@/lib/otp-store";

function getAdminKeypair(): Ed25519Keypair {
  const key = process.env.SUINS_ADMIN_PRIVATE_KEY;
  if (!key) throw new Error("SUINS_ADMIN_PRIVATE_KEY not configured");
  return Ed25519Keypair.fromSecretKey(key);
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, targetAddress } = await request.json();

    // Validate inputs
    if (!email || !name || !targetAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isEmailAllowed(email)) {
      return NextResponse.json({ error: "Email not on allowlist" }, { status: 403 });
    }

    if (!isEmailVerified(email.toLowerCase().trim())) {
      return NextResponse.json({ error: "Email not verified" }, { status: 403 });
    }

    const validation = isValidSubdomain(name);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!/^0x[a-fA-F0-9]{64}$/.test(targetAddress)) {
      return NextResponse.json({ error: "Invalid Sui address" }, { status: 400 });
    }

    const keypair = getAdminKeypair();

    // Create a fresh client per request to avoid stale gas coin references
    const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl("mainnet"), network: "mainnet" });

    const suinsClient = new SuinsClient({
      client,
      network: "mainnet",
    });

    const subName = `${name.toLowerCase().trim()}.${SUINS_CONFIG.parentName}.sui`;

    // If a leaf subdomain already exists, remove it first in a separate transaction.
    // getNameRecord throws when the dynamic field doesn't exist, so we catch that.
    let existingRecord = null;
    try {
      existingRecord = await suinsClient.getNameRecord(subName);
    } catch {
      // Name doesn't exist yet — this is expected for new claims
    }
    if (existingRecord) {
      const removeTx = new Transaction();
      const removeSuinsTx = new SuinsTransaction(suinsClient, removeTx);
      removeSuinsTx.removeLeafSubName({
        parentNft: SUINS_CONFIG.parentNftId,
        name: subName,
      });
      await client.signAndExecuteTransaction({
        transaction: removeTx,
        signer: keypair,
      });
    }

    // Create a full subdomain NFT so the user gets ownership
    const transaction = new Transaction();
    const suinsTx = new SuinsTransaction(suinsClient, transaction);

    const subNft = suinsTx.createSubName({
      parentNft: SUINS_CONFIG.parentNftId,
      name: subName,
      expirationTimestampMs: SUINS_CONFIG.expirationTimestampMs,
      allowChildCreation: false,
      allowTimeExtension: false,
    });

    // Set the target address so the name resolves to the claimer's wallet
    suinsTx.setTargetAddress({
      nft: subNft,
      address: targetAddress,
      isSubname: true,
    });

    // Transfer the subdomain NFT to the claimer's wallet
    transaction.transferObjects([subNft], targetAddress);

    const result = await client.signAndExecuteTransaction({
      transaction,
      signer: keypair,
    });

    return NextResponse.json({
      success: true,
      digest: result.digest,
      name: subName,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Claim error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
