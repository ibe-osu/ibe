"use client";

import NavButton from "@/components/general/NavButton";
import { useAuthState } from "@/lib/auth/useAuthState";

/**
 * "Members" (calendar, resources) and "Alumni Database" — signed-in members only. Deliberately
 * render nothing while signed out or loading, rather than a disabled state:
 * these links don't exist for a signed-out visitor, full stop.
 *
 * This is cosmetic only — see src/lib/auth/useAuthState.ts. The actual
 * gate is requireMember() on the /members pages themselves plus RLS.
 */
export default function AuthNavLinks() {
  const auth = useAuthState();

  if (auth.status !== "signed-in") return null;

  return (
    <>
      <NavButton href="/members">Members</NavButton>
      <NavButton href="/members/alumni-database">Alumni Database</NavButton>
    </>
  );
}
