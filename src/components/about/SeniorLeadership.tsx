"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IndividualCard from "./IndividualCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SENIOR_LEADERS = [
  {
    name: "Kristina Kennedy",
    role: "Senior Program Director",
    email: "kennedy.443@osu.edu",
  },
  {
    name: "Michael Leiblein",
    role: "Founding Director",
    email: "leiblein.1@osu.edu",
  },
  {
    name: "Heather Shepherd",
    role: "Program Manager",
    email: "shepherd.550@osu.edu",
  },
];

export default function SeniorLeadership() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Box ref={sectionRef} component="section" sx={{ backgroundColor: "#fff" }}>
      <Box
        sx={{
          maxWidth: "72rem",
          mx: "auto",
          px: { xs: 3, sm: 4, md: 6 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Box data-reveal sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Senior Leadership
          </Typography>
          <Box
            aria-hidden
            sx={{
              width: "3.5rem",
              height: "0.25rem",
              backgroundColor: "primary.main",
            }}
          />
        </Box>
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
          {SENIOR_LEADERS.map((person) => (
            <Grid key={person.email} size={{ xs: 6, sm: 4 }} data-reveal>
              <IndividualCard {...person} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
