import { Metadata } from "next";
import { requireMember } from "@/lib/auth/guards";
import UnderConstruction from "@/components/members/UnderConstruction";

export const metadata: Metadata = {
  title: "Alumni Database",
  robots: { index: false, follow: false },
};

// Gated server-side — see src/app/members/page.tsx for why this matters
// more than the nav link being hidden while signed out.
export default async function AlumniDatabasePage() {
  await requireMember();

  return (
    <UnderConstruction
      title="Alumni Database"
      description="A searchable directory of IBE alumni — their career paths, industries, and how to reach them — is coming soon."
    />
  );
}
