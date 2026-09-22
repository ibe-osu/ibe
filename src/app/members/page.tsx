import { Metadata } from "next";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { requireMember } from "@/lib/auth/guards";
import MembersCalendar from "@/components/members/MembersCalendar";

export const metadata: Metadata = {
  title: "Members",
  robots: { index: false, follow: false },
};

// Gated server-side (requireMember() redirects to /login if this fails) —
// the "Members" nav link only showing when signed in is cosmetic, not the
// actual protection. See src/lib/auth/guards.ts.
//
// Layout goal: the calendar frame fits inside one desktop viewport with the
// header, so the week/month grid is usable without scrolling the page. The
// title is deliberately one compact block; the calendar itself sizes to
// the viewport (see MembersCalendar). "Coming soon" sits below the fold on
// purpose — it's a footnote, not the point of the page.
export default async function MembersPage() {
  await requireMember();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 4 } }}>
      <Box sx={{ mb: { xs: 2.5, md: 2 } }}>
        <Typography
          variant="overline"
          component="p"
          sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.12em", lineHeight: 1.6 }}
        >
          Members
        </Typography>
        <Typography variant="h3" component="h1">
          IBE Calendar
        </Typography>
      </Box>

      <MembersCalendar />

      <Divider sx={{ my: { xs: 5, md: 6 } }} />

      <Stack spacing={1}>
        <Typography variant="h4" component="h2">
          Coming soon
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "62ch" }}>
          Meeting materials, the recruitment handbook, officer contacts, and
          the alumni database are on the way. Check back here.
        </Typography>
      </Stack>
    </Container>
  );
}
