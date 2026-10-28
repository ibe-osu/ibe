/**
 * Format: IBE-<prefix>-<secret>. Matches the shape validate_invite_code()
 * checks server-side (supabase/migrations/0002_invite_codes.sql) — this is
 * client-side only for instant "that doesn't look like a code" feedback
 * before a round trip. The database is the real check; this is UX only.
 */
const INVITE_CODE_PATTERN = /^IBE-[A-Za-z0-9]+-[A-Za-z0-9]+$/;

export function looksLikeInviteCode(value: string) {
  return INVITE_CODE_PATTERN.test(value.trim());
}

/**
 * Uppercases on submit, so codes are effectively case-insensitive from the
 * user's side. This only works because the secret portion is bcrypt-hashed
 * server-side (case-sensitive) against whatever was submitted — so code
 * generation (PR 4's admin UI) MUST only ever produce uppercase alphanumeric
 * characters. Lowercase in a generated code would make it unredeemable after
 * this normalization.
 *
 * It also rebuilds the hyphens, since a code that went through an email
 * often arrives with a line-break hyphen or space inside the secret, which
 * validate_invite_code() would read as a wrong secret. issue_invite_code()
 * always makes an 8-character prefix, so the hyphens can go back by position.
 */
export function normalizeInviteCode(value: string) {
  const upper = value.trim().toUpperCase();
  const match = /^IBE([A-Z0-9]{8})([A-Z0-9]+)$/.exec(upper.replace(/[^A-Z0-9]/g, ""));
  return match ? `IBE-${match[1]}-${match[2]}` : upper;
}
