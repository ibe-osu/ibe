import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Signs someone in from a link in a Supabase email (signup confirmation or
 * password reset) and reports whether it worked. Two link shapes:
 *
 *  1. `?token_hash=…&type=…` — the email template points here directly
 *     (Authentication → Email Templates, using
 *     `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email` or
 *     `type=recovery`). Verifying the hash server-side works from ANY device
 *     or browser, which matters because most people fill in a form on a
 *     laptop and open the email on a phone.
 *
 *  2. `?code=…` — Supabase's default PKCE link. The exchange needs the
 *     code-verifier cookie that only the browser which submitted the form
 *     has, so it fails cross-device. Kept as the fallback for projects whose
 *     template hasn't been switched yet.
 *
 * Either way the session cookie is written via the server client's setAll
 * (src/lib/supabase/server.ts).
 */
export async function verifyEmailLink(searchParams: URLSearchParams) {
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    return !error;
  }
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return !error;
  }
  return false;
}
