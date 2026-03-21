import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/claim-config";
import { verifyCode } from "@/lib/otp-store";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();

    if (!isEmailAllowed(normalised)) {
      return NextResponse.json({ error: "Email not on allowlist" }, { status: 403 });
    }

    const result = verifyCode(normalised, code.trim());

    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Verify code error:", message);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
