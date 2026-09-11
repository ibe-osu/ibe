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
 * Uppercases and trims as the user types, so codes are effectively
 * case-insensitive from the user's side. This only works because the secret
 * portion is bcrypt-hashed server-side (case-sensitive) against whatever
 * was submitted — so code generation (PR 4's admin UI) MUST only ever
 * produce uppercase alphanumeric characters. Lowercase in a generated code
 * would make it unredeemable after this normalization.
 */
export function normalizeInviteCode(value: string) {
  return value.trim().toUpperCase();
}
