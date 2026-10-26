"use server";

import { requireMember } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";

/**
 * One alum's email, fetched when their profile opens rather than sent with
 * the whole directory, so a page load doesn't hand every address to the
 * browser at once. That's about visibility, not access: RLS lets any member
 * read every email directly with their own session, by the VP's decision.
 * The query starts before the membership check, as on the page.
 */
export async function getAlumEmail(id: string): Promise<string | null> {
  const query = createClient().then((supabase) =>
    supabase.from("alumni").select("email").eq("id", id).maybeSingle(),
  );
  query.catch(() => {}); // a redirect below would otherwise leave it unhandled
  await requireMember();
  const { data, error } = await query;
  // Throw rather than return null, so the profile doesn't remember a failed
  // lookup as "no email".
  if (error) throw new Error("email lookup failed");
  return data?.email ?? null;
}
