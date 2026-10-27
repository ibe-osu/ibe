// Every members page makes several trips to Supabase in a row (session,
// membership, then the page's data), and ibe-prod is in us-west-2. Vercel
// runs functions in iad1 by default, so each of those trips crossed the
// country; Portland keeps them next to the database.
export const preferredRegion = "pdx1";

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
