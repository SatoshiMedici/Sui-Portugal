// ─── SuiNS Claim Configuration ───
// Parent SuiNS name: @suiportugal
// Update PARENT_NFT_ID with the actual NFT object ID of the @suiportugal name.

export const SUINS_CONFIG = {
  parentName: "suiportugal",
  // Replace with the actual SuiNS NFT object ID for @suiportugal on mainnet.
  parentNftId: "0x849b1027d0d7de7912b072440234151a8e23919cf7dfafe54a691ded7635b6d7",
  // Subdomain expiration: MUST NOT exceed parent domain's expiration.
  // Using 30 days from now as a safe default for testing.
  // TODO: Query the parent's actual expiration and set this accordingly.
  expirationTimestampMs: Date.now() + 30 * 24 * 60 * 60 * 1000,
};

// ─── Email Allowlist ───
// Emails of attendees who are eligible to claim a subdomain.
// All emails are stored lowercase for case-insensitive matching.
export const ALLOWLIST: string[] = [
  "mario@interestprotocol.com",
];

export function isEmailAllowed(email: string): boolean {
  return ALLOWLIST.includes(email.toLowerCase().trim());
}

// ─── Subdomain Validation ───
const NAME_REGEX = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

export function isValidSubdomain(name: string): { valid: boolean; error?: string } {
  const n = name.toLowerCase().trim();
  if (n.length === 0) return { valid: false, error: "Name is required" };
  if (n.length < 3) return { valid: false, error: "Minimum 3 characters" };
  if (n.length > 63) return { valid: false, error: "Maximum 63 characters" };
  if (!NAME_REGEX.test(n)) {
    return {
      valid: false,
      error: "Only lowercase letters, numbers, and hyphens. Must start and end with a letter or number.",
    };
  }
  return { valid: true };
}
