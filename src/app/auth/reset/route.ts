import { NextResponse, type NextRequest } from "next/server";
import { verifyEmailLink } from "@/lib/supabase/emailLink";

/**
 * Where the link in a password-reset email lands (ForgotPasswordForm sets
 * it as the redirectTo). A separate route from /auth/callback so the path
 * alone says "reset": that works with either email template, whereas a
 * `?next=` would break the token_hash template, which appends its own
 * `?token_hash=` to this URL.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  if (await verifyEmailLink(searchParams)) {
    return NextResponse.redirect(`${origin}/reset-password`);
  }

  // Expired or already used. Logging in won't help someone who has
  // forgotten their password, so offer a fresh link instead.
  return NextResponse.redirect(`${origin}/forgot-password?reason=expired`);
}
