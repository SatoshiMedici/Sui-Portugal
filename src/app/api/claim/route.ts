import { NextRequest, NextResponse } from "next/server";
import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuinsClient, SuinsTransaction } from "@mysten/suins";
import { isEmailAllowed, isValidSubdomain, SUINS_CONFIG } from "@/lib/claim-config";

const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl("mainnet"), network: "mainnet" });

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

    const validation = isValidSubdomain(name);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!/^0x[a-fA-F0-9]{64}$/.test(targetAddress)) {
      return NextResponse.json({ error: "Invalid Sui address" }, { status: 400 });
    }

    const keypair = getAdminKeypair();

    const suinsClient = new SuinsClient({
      client,
      network: "mainnet",
    });

    const transaction = new Transaction();
    const suinsTx = new SuinsTransaction(suinsClient, transaction);

    const subName = `${name.toLowerCase().trim()}.${SUINS_CONFIG.parentName}.sui`;

    // Remove any existing leaf subdomain record (e.g. from a previous claim attempt)
    const existingRecord = await suinsClient.getNameRecord(subName);
    if (existingRecord) {
      suinsTx.removeLeafSubName({
        parentNft: SUINS_CONFIG.parentNftId,
        name: subName,
      });
    }

    // Create a full subdomain NFT (not a leaf) so the user gets ownership
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
