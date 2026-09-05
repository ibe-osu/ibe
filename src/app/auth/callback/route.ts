import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Where the confirmation link in a signup/invite email lands. Exchanges the
 * one-time code for a real session (setting the session cookie via the
 * server client's setAll — see src/lib/supabase/server.ts) and sends the
 * person on to /members. Falls back to a login page error state if the
 * code is missing, expired, or already used.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/members";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?reason=confirm-failed`);
}
