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
export default async function MembersPage() {
  await requireMember();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="overline"
          component="p"
          sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.12em" }}
        >
          Members
        </Typography>
        <Typography variant="h2" component="h1" sx={{ mb: 1.5 }}>
          IBE Calendar
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: "62ch" }}
        >
          Every cohort meeting, speaker, social, and deadline in one place.
          Add it to your own calendar so nothing sneaks up on you.
        </Typography>
      </Box>

      <MembersCalendar />

      <Divider sx={{ my: { xs: 6, md: 8 } }} />

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
