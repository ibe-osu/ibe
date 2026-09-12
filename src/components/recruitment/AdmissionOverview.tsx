import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const FACTS = [
  {
    label: "Eligibility",
    value: "University Honors admits in Fisher or the College of Engineering",
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
    <Box
      component="section"
      aria-labelledby="how-admission-works"
      sx={{ py: { xs: 7, md: 11 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 6,
            alignItems: "start",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              id="how-admission-works"
              sx={{ mb: 3, maxWidth: "12ch" }}
            >
              How Admission Works
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                "& p": { color: "text.secondary", maxWidth: "62ch" },
                "& p:first-of-type": {
                  color: "text.primary",
                  fontSize: { md: "1.25rem" },
                  lineHeight: 1.55,
                },
              }}
            >
              <Typography variant="body1">
                Application to IBE is open to prospective students already
                accepted into the Ohio State University Honors Program and
                either the Max M. Fisher College of Business or the College of
                Engineering. From that pool, IBE admits a cohort of 72 — 36 in
                the Traditional track and 36 in Software Innovation.
              </Typography>
              <Typography variant="body1">
                Invitations to apply are emailed in waves starting in January —
                they occasionally land in junk mail, so check that folder.
                Admission offers follow in waves beginning early March, and the
                application closes April 3, 2026.
              </Typography>
              <Typography variant="body1">
                Fill out the interest form to receive more information about
                IBE, invitations to virtual information sessions, and reminders
                about important deadlines.
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: { xs: 4, md: 5 } }}
            >
              <Button
                component="a"
                href="https://forms.gle/hbkbG9sRqqBhPeag8"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
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
          </Box>

          <Box
            component="dl"
            aria-label="Admission at a glance"
            sx={{ m: 0, position: { md: "sticky" }, top: { md: 104 } }}
          >
            {FACTS.map((fact) => (
              <Box
                key={fact.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "9rem 1fr" },
                  columnGap: 3,
                  rowGap: 0.5,
                  py: 2.25,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  "&:last-of-type": {
                    borderBottom: "1px solid",
                    borderBottomColor: "divider",
                  },
                }}
              >
                <Typography
                  component="dt"
                  variant="overline"
                  sx={{
                    color: fact.emphasis ? "primary.main" : "text.secondary",
                    pt: "0.35em",
                  }}
                >
                  {fact.label}
                </Typography>
                <Typography
                  component="dd"
                  sx={{
                    m: 0,
                    fontSize: "1.0625rem",
                    lineHeight: 1.5,
                    fontWeight: fact.emphasis ? 600 : 400,
                    color: fact.emphasis ? "primary.main" : "text.primary",
                    textWrap: "pretty",
                  }}
                >
                  {fact.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
