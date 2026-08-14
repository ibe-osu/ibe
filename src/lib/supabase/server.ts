import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/env";

/**
 * Supabase client for Server Components, Server Actions, and Route
 * Handlers. Create a fresh one per request — cookies() is request-scoped,
 * so this can't be module-level.
 *
 * SECURITY NOTE: after calling this, always authenticate with
 * `supabase.auth.getUser()` or `getClaims()`, never `getSession()`.
 * getSession() reads the (possibly stale, unverified) cookie as-is;
 * getUser()/getClaims() verify the token. Middleware only refreshes the
 * session cookie — it is not the authorization boundary — so every
 * protected Server Component must independently re-check here.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component, which can't write cookies.
          // Harmless as long as middleware.ts is running and refreshing the
          // session on every request — that's the only place a refreshed
          // cookie actually needs to be persisted.
        }
      },
    },
  });
}
