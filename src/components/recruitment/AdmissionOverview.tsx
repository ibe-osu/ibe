import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Reveal from "@/components/general/Reveal";

const FACTS = [
  {
    label: "Eligibility",
    value:
      "University Honors admits in Fisher or the College of Engineering",
  },
  {
    label: "Cohort size",
    value: "72 students — 36 Traditional, 36 Software Innovation",
  },
  { label: "Invitations", value: "Emailed in waves starting in January" },
  { label: "Offers", value: "Sent in waves beginning early March" },
  { label: "Deadline", value: "April 3, 2026", emphasis: true },
];

export default function AdmissionOverview() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "start",
          }}
        >
          <Reveal>
            <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
              How Admission Works
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: "65ch", mb: 2 }}
            >
              Application to IBE is open to prospective students already
              accepted into the Ohio State University Honors Program and either
              the Max M. Fisher College of Business or the College of
              Engineering. From that pool, IBE admits a cohort of 72 — 36 in
              the Traditional track and 36 in Software Innovation.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: "65ch", mb: 2 }}
            >
              Invitations to apply are emailed in waves starting in January —
              they occasionally land in junk mail, so check that folder.
              Admission offers follow in waves beginning early March, and the
              application closes April 3, 2026.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: "65ch" }}
            >
              Fill out the interest form to receive more information about IBE,
              invitations to virtual information sessions, and reminders about
              important deadlines.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
              <Button
                component="a"
                href="https://forms.gle/hbkbG9sRqqBhPeag8"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ px: "1.75rem" }}
              >
                IBE Interest Form
              </Button>
              <Button
                component="a"
                href="mailto:ohiostateibe@osu.edu"
                variant="outlined"
                sx={{ px: "1.75rem" }}
              >
                Contact Us
              </Button>
            </Stack>
          </Reveal>

          {/* At-a-glance fact panel */}
          <Reveal
            variant="stagger"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              px: { xs: 2.5, md: 3 },
              py: 1,
            }}
          >
            {FACTS.map((fact) => (
              <Box
                key={fact.label}
                sx={{
                  py: 2,
                  "&:not(:last-of-type)": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    fontWeight: 700,
                    color: fact.emphasis ? "primary.main" : "text.primary",
                    mb: 0.25,
                  }}
                >
                  {fact.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: fact.emphasis ? "primary.main" : "text.secondary",
                    fontWeight: fact.emphasis ? 600 : 400,
                  }}
                >
                  {fact.value}
                </Typography>
              </Box>
            ))}
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
