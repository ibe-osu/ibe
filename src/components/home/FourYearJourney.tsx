import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import SectionHead from "@/components/ui/SectionHead";

interface Milestone {
  year: string;
  title: string;
  body: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: "Year one",
    title: "Build the foundation",
    body: "Seventy-two students from Fisher and the College of Engineering arrive as one class and move into the IBE learning community together. First Year Engineering (ENGR 1281H) pairs with the IBE Freshman Capstone (ENGR 1282H) — the Freshman Cornerstone Project — where the cohort tackles its first real design problem as a team.",
    highlights: ["IBE learning community", "First Year Engineering & Freshman Capstone", "Cohort traditions & socials"],
  },
  {
    year: "Year two",
    title: "Take on the second discipline",
    body: "Engineers begin the business core and business majors begin engineering sciences — each earning the minor that makes IBE integrated. The Corporate Strategy Seminar (BUSMHR 2400H) grounds that new coursework in how real companies actually make decisions.",
    highlights: ["Corporate Strategy Seminar (BUSMHR 2400H)", "Cross-disciplinary minor coursework", "Peer & alumni mentorship"],
  },
  {
    year: "Year three",
    title: "Step into industry",
    body: "The classroom opens outward. The Innovation Strategy Seminar (BUSMHR 3400H) turns toward new-venture strategy as students take on internships, network with corporate partners over industry lunches, and step into elected roles on the student leadership board.",
    highlights: ["Innovation Strategy Seminar (BUSMHR 3400H)", "Internships & industry networking lunches", "Student leadership board"],
  },
  {
    year: "Year four",
    title: "Deliver the capstone",
    body: "The year-long IBE Capstone (ENGR 5901H, ENGR 5902H) puts everything to work: seniors take on a sponsor-directed project guided by executives from the program's corporate partners, then graduate into a network with a 100% job placement record.",
    highlights: ["IBE Capstone I & II (ENGR 5901H/5902H)", "Executive mentorship", "100% job placement"],
  },
];

const bullet = {
  m: 0,
  pl: 0,
  listStyle: "none",
  display: "grid",
  gap: 0.75,
  "& li": { display: "flex", gap: 1.25, alignItems: "flex-start", fontSize: "0.9rem", lineHeight: 1.45, color: "text.secondary" },
  "& li::before": { content: '""', flexShrink: 0, width: 5, height: 5, borderRadius: "50%", backgroundColor: "signal.main", mt: "0.5em" },
} as const;

export default function FourYearJourney() {
  return (
    <Box component="section" aria-label="The four-year journey" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead
          label="The lifecycle"
          title="One program. Four years. Zero gaps."
          lede="From move-in day to a sponsor-directed capstone, IBE is a single continuous arc — each year building on the last."
        />

        <Panel component="ol" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" } }}>
          {MILESTONES.map((m, i) => (
            <Box
              key={m.year}
              component="li"
              sx={{
                display: "grid",
                gap: 1.25,
                alignContent: "start",
                p: { xs: 2.5, md: 3 },
                borderRight: { sm: i % 2 === 0 ? "1px solid" : 0, lg: i < 3 ? "1px solid" : 0 },
                borderBottom: { xs: i < 3 ? "1px solid" : 0, sm: i < 2 ? "1px solid" : 0, lg: 0 },
                borderColor: "divider",
              }}
            >
              <Label sx={{ color: "signal.main" }}>
                0{i + 1} · {m.year}
              </Label>
              <Typography variant="h3" component="h3">
                {m.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {m.body}
              </Typography>
              <Box component="ul" sx={{ ...bullet, mt: 0.5 }}>
                {m.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </Box>
            </Box>
          ))}
        </Panel>

        <Box sx={{ display: "grid", gap: { xs: 3, md: 4 }, pt: { xs: 4, md: 6 } }}>
          <SectionHead as="h3" title="Two tracks, one cohort" />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <Panel sx={{ p: { xs: 2.5, md: 3 }, display: "grid", gap: 1 }}>
              <Label sx={{ color: "signal.main" }}>Track A</Label>
              <Typography variant="h4" component="h4">
                IBE Traditional
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Engineering majors</strong> earn a business minor; <strong>business majors</strong> earn an
                engineering sciences minor.
              </Typography>
            </Panel>
            <Panel sx={{ p: { xs: 2.5, md: 3 }, display: "grid", gap: 1 }}>
              <Label sx={{ color: "signal.main" }}>Track B</Label>
              <Typography variant="h4" component="h4">
                IBE Software Innovation
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>CSE majors</strong> earn a business minor; <strong>business and non-CSE majors</strong> earn a
                computer science minor.
              </Typography>
            </Panel>
          </Box>
          <Panel sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#ffffff" }}>
            <picture>
              <source media="(max-width:800px)" srcSet="/coursework/coursework-vertical.svg" />
              <Image
                src="/coursework/coursework.svg"
                alt="Diagram of the IBE four-year coursework plan across business and engineering"
                width={700}
                height={300}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </picture>
          </Panel>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button component={Link} href="/recruitment" variant="outlined" size="large">
              See how to apply
            </Button>
          </Box>
        </Box>
      </Wrap>
    </Box>
  );
}
