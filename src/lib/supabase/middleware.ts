import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnvOrNull } from "@/lib/env";

/**
 * Refreshes the Supabase session cookie on every request. This is its ONLY
 * job — it must never grow into an authorization check.
 *
 * Why: Next.js middleware has a documented history of bypass
 * vulnerabilities (e.g. CVE-2025-29927, an x-middleware-subrequest header
 * that skipped middleware entirely on affected versions). Treat middleware
 * as untrusted for anything security-sensitive. Every protected page
 * independently re-verifies the session server-side via
 * `supabase.auth.getUser()`/`getClaims()`, and Postgres RLS independently
 * enforces access at the database level — those two layers are the actual
 * security boundary, not this file.
 *
 * If you're tempted to add a redirect-unauthenticated-users-to-/login check
 * here: don't. Add it to the protected page instead.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const env = getSupabaseEnvOrNull();
  if (!env) {
    // Supabase isn't configured in this environment yet — e.g. production,
    // before the ibe-prod project exists and its env vars are set in
    // Vercel. Pass the request through untouched rather than breaking every
    // page load on a site that today has no auth-dependent pages deployed.
    return supabaseResponse;
  }

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do not remove or replace with getSession(): calling getUser() is what
  // triggers the token refresh this function exists to perform.
  await supabase.auth.getUser();

  return supabaseResponse;
}
