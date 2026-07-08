"use client";

import { useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  { value: "3.8", label: "Average GPA" },
  { value: "34", label: "Average ACT" },
  { value: "100%", label: "Job Placement" },
  { value: "$96k", label: "Avg. Starting Salary" },
];

export default function OurStats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".stat-item", {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Box
      ref={sectionRef}
      component="section"
      aria-labelledby="our-stats-heading"
      sx={{
        backgroundColor: "primary.main",
        color: "secondary.main",
        py: { xs: "4rem", md: "5.5rem" },
        px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
      }}
    >
      <Box sx={{ maxWidth: "1280px", mx: "auto", textAlign: "center" }}>
        <Typography
          id="our-stats-heading"
          variant="h3"
          component="h2"
          sx={{ mb: "1rem" }}
        >
          Our Statistics
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "secondary.main",
            mx: "auto",
            mb: { xs: "2.5rem", md: "3.5rem" },
          }}
        />

        <Grid container rowSpacing={{ xs: 4, md: 0 }} columnSpacing={0}>
          {STATS.map((stat, i) => (
            <Grid
              key={stat.label}
              className="stat-item"
              size={{ xs: 6, md: 3 }}
              sx={{
                px: { xs: "0.5rem", md: "2rem" },
                borderLeft: {
                  xs: "none",
                  md:
                    i === 0 ? "none" : "1px solid rgba(255, 255, 255, 0.28)",
                },
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontFamily: "var(--font-pt-serif-caption), serif",
                  fontSize: "clamp(2.75rem, 3.5vw + 1rem, 4.25rem)",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                component="p"
                sx={{
                  mt: "0.5rem",
                  fontSize: { xs: "0.9375rem", md: "1.0625rem" },
                  fontWeight: 500,
                  color: "#f6d9df",
                }}
              >
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
