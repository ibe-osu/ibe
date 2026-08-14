/**
 * The only two env vars this app reads. There is deliberately no
 * SUPABASE_SECRET_KEY here — that credential bypasses row-level security
 * entirely, so nothing in this Next.js app ever touches it. The one thing
 * that needs it (sending invites) is a Supabase Edge Function, where
 * Supabase injects the key automatically.
 *
 * NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is public by design — safe in the
 * client bundle, safe in CI config. Access control comes from Postgres RLS,
 * not from hiding this key.
 */
function readSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && publishableKey ? { url, publishableKey } : null;
}

/**
 * Throws with a message pointing at .env.example. Use this everywhere
 * except middleware, where a hard failure would take down every page.
 */
export function getSupabaseEnv() {
  const env = readSupabaseEnv();
  if (!env) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "Copy .env.example to .env.local and fill in the ibe-staging project's values " +
        "(Supabase dashboard -> Project Settings -> API Keys).",
    );
  }
  return env;
}

/**
 * Non-throwing variant for the one call site (middleware) that must degrade
 * gracefully instead of breaking every request — e.g. production, before
 * the ibe-prod project exists and its env vars are set in Vercel.
 */
export function getSupabaseEnvOrNull() {
  return readSupabaseEnv();
}
