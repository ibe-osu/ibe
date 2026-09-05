import { Metadata } from "next";
import { requireMember } from "@/lib/auth/guards";
import UnderConstruction from "@/components/members/UnderConstruction";

export const metadata: Metadata = {
  title: "Resources",
  robots: { index: false, follow: false },
};

// Gated server-side (requireMember() redirects to /login if this fails) —
// the "Resources" nav link only showing when signed in is cosmetic, not
// the actual protection. See src/lib/auth/guards.ts.
export default async function MembersPage() {
  await requireMember();

  return (
    <UnderConstruction
      title="Resources"
      description="Meeting materials, the recruitment handbook, and officer contacts will live here."
    />
  );
}
