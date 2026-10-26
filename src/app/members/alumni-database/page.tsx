import { Metadata } from "next";
import { Alert, Container } from "@mui/material";
import { requireMember } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { inferIndustry } from "@/lib/alumni/industry";
import type { DirectoryAlum, DirectoryJob } from "@/lib/alumni/directory";
import AlumniDirectory from "@/components/members/alumni/AlumniDirectory";

export const metadata: Metadata = {
  title: "Alumni Database",
  robots: { index: false, follow: false },
};

// Columns are named one by one, never `*`, so a column added to these tables
// later can't reach the browser without someone choosing to send it.
const SELECT = `
  id, first_name, last_name, class_year, college, majors, minors, linkedin_url,
  current_title, current_employer, current_city, current_state, involvements,
  updated_at,
  alumni_jobs ( position, title, company, start_label, end_label, location, note ),
  alumni_education ( institution, program, year, in_progress )
`;

interface AlumniQueryRow {
  id: string;
  first_name: string;
  last_name: string;
  class_year: number | null;
  college: "UENG" | "UBUS" | null;
  majors: string[];
  minors: string[];
  linkedin_url: string | null;
  current_title: string | null;
  current_employer: string | null;
  current_city: string | null;
  current_state: string | null;
  involvements: string[];
  updated_at: string;
  alumni_jobs: {
    position: number;
    title: string | null;
    company: string | null;
    start_label: string | null;
    end_label: string | null;
    location: string | null;
    note: string | null;
  }[];
  alumni_education: {
    institution: string;
    program: string | null;
    year: number | null;
    in_progress: boolean;
  }[];
}

// Some LinkedIn histories stop short of the current role (a med student whose
// last listed job ended in 2024). Lead with it, so jobs[0] is always the
// current role for the card, the search context and the profile alike.
function withCurrentRole(row: AlumniQueryRow, jobs: DirectoryJob[]): DirectoryJob[] {
  const { current_title: title, current_employer: company } = row;
  const first = jobs[0];
  const listed = first?.end === "Present" && (first.company === company || first.title === title);
  return (title || company) && !listed
    ? [{ title, company, start: null, end: "Present", location: null }, ...jobs]
    : jobs;
}

function toDirectoryAlum(row: AlumniQueryRow): DirectoryAlum {
  const education = row.alumni_education.map((e) => ({
    institution: e.institution,
    program: e.program,
    year: e.year,
    inProgress: e.in_progress,
  }));
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    classYear: row.class_year,
    college: row.college,
    majors: row.majors,
    minors: row.minors,
    linkedinUrl: row.linkedin_url,
    currentTitle: row.current_title,
    currentEmployer: row.current_employer,
    currentCity: row.current_city,
    currentState: row.current_state,
    involvements: row.involvements,
    // Note rows ("older roles behind Load more") are import bookkeeping, not
    // roles; they stay in the database and out of the page.
    jobs: withCurrentRole(
      row,
      row.alumni_jobs
        .filter((j) => j.note === null)
        .sort((a, b) => a.position - b.position)
        .map((j) => ({
          title: j.title,
          company: j.company,
          start: j.start_label,
          end: j.end_label,
          location: j.location,
        })),
    ),
    education,
    industry: inferIndustry(
      row.current_title,
      row.current_employer,
      education.some((e) => e.inProgress),
    ),
  };
}

// Gated server-side — see src/app/members/page.tsx for why this matters
// more than the nav link being hidden while signed out. The query runs with
// the member's own session, so RLS (migration 0005) is the second wall.
export default async function AlumniDatabasePage() {
  // The query starts before the membership check finishes (RLS limits it to
  // members anyway); requireMember() is still awaited first, so it redirects.
  const query = createClient().then((supabase) =>
    supabase
      .from("alumni")
      .select(SELECT)
      .order("last_name")
      .order("first_name")
      .overrideTypes<AlumniQueryRow[], { merge: false }>(),
  );
  query.catch(() => {}); // a redirect below would otherwise leave it unhandled
  await requireMember();
  const { data, error } = await query;
  if (error) {
    console.error("alumni directory query failed:", error.code, error.message);
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Alert severity="error">
          The alumni directory couldn&apos;t load. Refresh the page, and if it
          keeps happening, let the tech team know.
        </Alert>
      </Container>
    );
  }

  // The seed stamps every row each time it runs, so the newest updated_at is
  // when the data was last loaded. Formatted here; the browser gets one string.
  const newest = data.reduce((max, row) => (row.updated_at > max ? row.updated_at : max), "");
  const lastUpdated = newest
    ? new Date(newest).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "America/New_York" })
    : null;

  return <AlumniDirectory alumni={data.map(toDirectoryAlum)} lastUpdated={lastUpdated} />;
}
