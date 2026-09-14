import { Box, Typography } from "@mui/material";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import SectionHead from "@/components/ui/SectionHead";
import { monoFamily } from "@/theme/fonts";

interface Step {
  date: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    date: "November 1",
    title: "Ohio State Early Action Deadline",
    body: "Priority deadline for applying to the OSU Honors Program — a prerequisite for IBE consideration.",
  },
  {
    date: "January – March",
    title: "Honors Decisions Released",
    body: "Honors decisions are released on a rolling basis. If you're accepted into Honors, expect an email invitation to apply to IBE.",
  },
  {
    date: "January – April",
    title: "Virtual Information Sessions",
    body: "The IBE recruitment team holds virtual information sessions throughout the spring. Fill out the interest form above to be invited.",
  },
  {
    date: "Early March",
    title: "Admission Offers Begin",
    body: "Offers of admission into the IBE Program are released in waves starting in early March.",
  },
  {
    date: "Late March",
    title: "All Honors Decisions Out",
    body: "All University Honors decisions should be released by the end of March. Watch your inbox — and your junk folder — for the invitation to apply.",
  },
  {
    date: "April 3, 2026",
    title: "IBE Application Deadline",
    body: "The final day to submit your IBE application. Applications received after this date will not be considered.",
  },
];

/** The application season as a numbered list in one panel — order carries the information. */
export default function ApplicationTimeline() {
  return (
    <Box component="section" aria-label="Application timeline" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead
          label="The season"
          title="Application timeline"
          lede="From the Early Action deadline to the April 3 close, here is how the application season unfolds."
        />
        <Panel component="ol" sx={{ m: 0, p: 0, listStyle: "none", maxWidth: "58rem", width: "100%", mx: "auto" }}>
          {STEPS.map((step, i) => (
            <Box
              key={step.title}
              component="li"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "auto 1fr", md: "3rem 11rem 1fr" },
                columnGap: { xs: 2, md: 3 },
                rowGap: 0.5,
                alignItems: "start",
                px: { xs: 2.5, md: 3 },
                py: { xs: 2.5, md: 3 },
                borderTop: i === 0 ? 0 : "1px solid",
                borderColor: "divider",
              }}
            >
              <Label sx={{ color: "signal.main", pt: "0.35em" }}>0{i + 1}</Label>
              <Typography
                component="p"
                sx={{
                  fontFamily: monoFamily,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: "text.primary",
                  pt: "0.2em",
                  gridColumn: { xs: "2", md: "auto" },
                }}
              >
                {step.date}
              </Typography>
              <Box sx={{ gridColumn: { xs: "2", md: "auto" }, display: "grid", gap: 0.5 }}>
                <Typography variant="h4" component="h3">
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "58ch" }}>
                  {step.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Panel>
      </Wrap>
    </Box>
  );
}
