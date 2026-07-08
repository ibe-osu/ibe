"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    date: "November 1",
    title: "Ohio State Early Action Deadline",
    body: "Priority deadline for applying to OSU Honors program (prerequisite for IBE consideration).",
  },
  {
    date: "January through March",
    title: "Honors Decisions Released",
    body: "Honors decisions released on rolling basis, expect an email invitation to apply to IBE if accepted into Honors.",
  },
  {
    date: "January through April",
    title: "IBE Virtual Information Sessions",
    body: "Our IBE Recruitment team will be holding virtual information sessions throughout January to April. Please fill out the interest form linked above to be invited to them.",
  },
  {
    date: "Beginning of March",
    title: "IBE Begins Sending Admission Offers",
    body: "Offers of admission into the IBE Program will be released in waves starting in early March.",
  },
  {
    date: "End of March",
    title: "All Honors Decisions Released",
    body: "All University Honors decisions should be released. Keep an eye on your email inbox for an invitation to apply to IBE (be sure to also check your junk mail folder).",
  },
  {
    date: "April 3",
    title: "IBE Application Deadline",
    body: "April 3rd is the IBE application deadline. All applications received after this date will not be considered.",
  },
];

export default function TimelineIllustration() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        bgcolor: "primary.main",
        color: "common.white",
        py: { xs: 6, md: 10 },
        px: { xs: 2.5, sm: 4, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 920, mx: "auto" }}>
        <Typography
          component="h2"
          variant="h3"
          sx={{
            color: "common.white",
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.375rem" },
            mb: "1rem",
          }}
        >
          Application Timeline
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "secondary.main",
            mb: { xs: 5, md: 7 },
          }}
        />

        <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <Box
                component="li"
                key={step.title}
                className="timeline-step"
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "16px 1fr",
                    md: "200px 16px 1fr",
                  },
                  columnGap: { xs: 2.5, md: 4 },
                }}
              >
                {/* Date */}
                <Typography
                  sx={{
                    gridColumn: { xs: "2 / 3", md: "1 / 2" },
                    gridRow: "1",
                    textAlign: { md: "right" },
                    fontFamily: "var(--font-pt-serif-caption), serif",
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                    lineHeight: 1.35,
                    mb: { xs: 0.5, md: 0 },
                  }}
                >
                  {step.date}
                </Typography>

                {/* Marker: dot + connecting line */}
                <Box
                  aria-hidden="true"
                  sx={{
                    gridColumn: { xs: "1 / 2", md: "2 / 3" },
                    gridRow: { xs: "1 / 3", md: "1" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      bgcolor: "common.white",
                      flexShrink: 0,
                      mt: "0.35rem",
                    }}
                  />
                  {!isLast && (
                    <Box
                      sx={{
                        width: "2px",
                        flexGrow: 1,
                        bgcolor: "rgba(255,255,255,0.4)",
                        mt: 1,
                        mb: 1,
                      }}
                    />
                  )}
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    gridColumn: { xs: "2 / 3", md: "3 / 4" },
                    gridRow: { xs: "2", md: "1" },
                    pb: isLast ? 0 : { xs: 5, md: 6 },
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{ color: "common.white", lineHeight: 1.3, mb: 1 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.6,
                      maxWidth: "58ch",
                    }}
                  >
                    {step.body}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
