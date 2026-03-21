// In-memory OTP store. Codes expire after 10 minutes.
// For production at scale, replace with Redis or a database.

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
}

const store = new Map<string, OtpEntry>();

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeCode(email: string, code: string): void {
  store.set(email, {
    code,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
    verified: false,
  });
}

export function verifyCode(
  email: string,
  code: string
): { valid: boolean; error?: string } {
  const entry = store.get(email);

  if (!entry) {
    return { valid: false, error: "No code sent to this email. Please request a new code." };
  }

  if (Date.now() > entry.expiresAt) {
    store.delete(email);
    return { valid: false, error: "Code expired. Please request a new code." };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(email);
    return { valid: false, error: "Too many attempts. Please request a new code." };
  }

  entry.attempts++;

  if (entry.code !== code) {
    return { valid: false, error: "Invalid code. Please try again." };
  }

  entry.verified = true;
  return { valid: true };
}

export function isEmailVerified(email: string): boolean {
  const entry = store.get(email);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(email);
    return false;
  }
  return entry.verified;
}
