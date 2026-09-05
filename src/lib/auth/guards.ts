import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * The real gate for every page under /members and /admin. Call this at the
 * top of the Server Component — never rely on middleware or on the header's
 * client-side auth state for anything security-sensitive; both are cosmetic
 * (see src/lib/supabase/middleware.ts and src/components/auth/AuthNav.tsx).
 *
 * Two independent checks, both required:
 *  1. getUser() — is there a real, verified session at all?
 *  2. app_users row, status = 'active' — is this account actually a member?
 *     (RLS also enforces this at the database level on every other table;
 *     this second check is what lets the *page* redirect with a clear
 *     reason instead of just silently rendering an empty page.)
 */
export async function requireMember() {
  // Deliberately outside the redirect calls below: redirect() works by
  // throwing a special NEXT_REDIRECT error, so wrapping those in a
  // try/catch would swallow them and break every redirect in this file.
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    // Supabase isn't configured in this environment. Nobody can be an
    // authenticated member without an auth backend, so treat it exactly
    // like a signed-out visitor — a redirect to /login, not a 500.
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appUser } = await supabase
    .from("app_users")
    .select("role, status")
    .eq("user_id", user.id)
    .single();

  if (!appUser || appUser.status !== "active") {
    // A verified account with no (or a suspended) app_users row. RLS would
    // block them from seeing anything anyway; this just gives them an
    // honest reason instead of a blank/broken page.
    redirect("/login?reason=inactive");
  }

  return { user, role: appUser.role };
}

export async function requireAdmin() {
  const { user, role } = await requireMember();

  if (role !== "admin") {
    redirect("/members");
  }

  return { user };
}
