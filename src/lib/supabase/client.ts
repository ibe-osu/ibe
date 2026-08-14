import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/env";

/** Supabase client for Client Components. One per call — cheap, no pooling needed. */
export function createClient() {
  const { url, publishableKey } = getSupabaseEnv();
  return createBrowserClient(url, publishableKey);
}
