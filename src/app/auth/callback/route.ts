import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Where the confirmation link in a signup email lands. Two ways in:
 *
 *  1. `?token_hash=…&type=email` — the email template points here directly
 *     (Authentication → Email Templates → Confirm signup, using
 *     `{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email`). Verifying
 *     the hash server-side works from ANY device or browser, which matters
 *     because most people sign up on a laptop and open the email on a phone.
 *
 *  2. `?code=…` — Supabase's default PKCE link. The exchange needs the
 *     code-verifier cookie that only the browser which submitted the signup
 *     form has, so it fails cross-device. Kept as the fallback for projects
 *     whose template hasn't been switched yet.
 *
 * Either way the session cookie is written via the server client's setAll
 * (src/lib/supabase/server.ts) and the member continues to /members.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get("next") ?? "/members";

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  } else if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Supabase has usually already confirmed the email by the time a PKCE
  // exchange fails (the link was opened somewhere without the verifier
  // cookie), so the message on /login tells them to just log in.
  return NextResponse.redirect(`${origin}/login?reason=confirm-failed`);
}
