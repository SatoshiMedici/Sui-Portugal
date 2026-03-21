import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isEmailAllowed } from "@/lib/claim-config";
import { generateCode, storeCode } from "@/lib/otp-store";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();

    if (!isEmailAllowed(normalised)) {
      return NextResponse.json({ error: "Email not on allowlist" }, { status: 403 });
    }

    const code = generateCode();
    storeCode(normalised, code);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Sui Portugal <noreply@suiportugal.com>",
      to: normalised,
      subject: "Your Sui Portugal verification code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #111; margin-bottom: 8px;">Sui Portugal</h2>
          <p style="color: #666; font-size: 15px; margin-bottom: 24px;">
            Use the code below to verify your email and claim your @suiportugal subdomain.
          </p>
          <div style="background: #f4f4f5; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #111;">${code}</span>
          </div>
          <p style="color: #999; font-size: 13px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Send code error:", message);
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
  }
}
