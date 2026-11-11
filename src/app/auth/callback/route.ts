import { NextResponse, type NextRequest } from "next/server";
import { verifyEmailLink } from "@/lib/supabase/emailLink";

/**
 * Where the confirmation link in a signup email lands (see verifyEmailLink
 * for the two link shapes). On success the member continues to /members.
 * Password-reset links go to the sibling /auth/reset instead.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get("next") ?? "/members";

  if (await verifyEmailLink(searchParams)) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  // Supabase has usually already confirmed the email by the time a PKCE
  // exchange fails (the link was opened somewhere without the verifier
  // cookie), so the message on /login tells them to just log in.
  return NextResponse.redirect(`${origin}/login?reason=confirm-failed`);
}
