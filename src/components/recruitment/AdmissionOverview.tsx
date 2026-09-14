import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import SectionHead from "@/components/ui/SectionHead";

const FACTS = [
  { label: "Eligibility", value: "University Honors admits in Fisher or the College of Engineering" },
  { label: "Cohort size", value: "72 students — 36 Traditional, 36 Software Innovation" },
  { label: "Invitations", value: "Emailed in waves starting in January" },
  { label: "Offers", value: "Sent in waves beginning early March" },
  { label: "Deadline", value: "April 3, 2026", emphasis: true },
];

export default function AdmissionOverview() {
  return (
    <Box component="section" aria-labelledby="how-admission-works" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead id="how-admission-works" label="Admission" title="How admission works" />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 7fr) minmax(0, 5fr)" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
          <Box sx={{ display: "grid", gap: 2.25, "& p": { color: "text.secondary", maxWidth: "62ch" } }}>
            <Typography variant="body1" sx={{ color: "text.primary !important", fontSize: { md: "1.2rem" }, lineHeight: 1.55 }}>
              Application to IBE is open to prospective students already accepted into the Ohio State University Honors
              Program and either the Max M. Fisher College of Business or the College of Engineering. From that pool, IBE
              admits a cohort of 72 — 36 in the Traditional track and 36 in Software Innovation.
            </Typography>
            <Typography variant="body1">
              Invitations to apply are emailed in waves starting in January — they occasionally land in junk mail, so
              check that folder. Admission offers follow in waves beginning early March, and the application closes
              April 3, 2026.
            </Typography>
            <Typography variant="body1">
              Fill out the interest form to receive more information about IBE, invitations to virtual information
              sessions, and reminders about important deadlines.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1 }}>
              <Button
                component="a"
                href="https://forms.gle/hbkbG9sRqqBhPeag8"
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                endIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
              >
                IBE Interest Form
              </Button>
              <Button component="a" href="mailto:ohiostateibe@osu.edu" variant="outlined" size="large">
                Contact Us
              </Button>
            </Stack>
          </Box>

          <Panel component="dl" aria-label="Admission at a glance" sx={{ m: 0 }}>
            {FACTS.map((fact, i) => (
              <Box
                key={fact.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "8rem 1fr" },
                  gap: { xs: 0.5, sm: 2 },
                  px: 2.5,
                  py: 1.75,
                  borderTop: i === 0 ? 0 : "1px solid",
                  borderColor: "divider",
                }}
              >
                <Label component="dt" sx={{ color: fact.emphasis ? "signal.main" : "text.disabled", pt: "0.3em" }}>
                  {fact.label}
                </Label>
                <Typography
                  component="dd"
                  variant="body2"
                  sx={{ m: 0, fontWeight: fact.emphasis ? 600 : 400, color: fact.emphasis ? "signal.main" : "text.primary" }}
                >
                  {fact.value}
                </Typography>
              </Box>
            ))}
          </Panel>
        </Box>
      </Wrap>
    </Box>
  );
}
