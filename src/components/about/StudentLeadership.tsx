"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IndividualCard from "./IndividualCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STUDENT_LEADERS = [
  {
    name: "Claire Berlier",
    role: "President",
    email: "berlier.3@osu.edu",
  },
  {
    name: "Pranav Vuppu",
    role: "Executive VP",
    email: "panyamvuppu.1@osu.edu",
  },
  {
    name: "Max Muckley",
    role: "VP of Recruitment",
    email: "muckley.9@osu.edu",
  },
  {
    name: "Patrick Dauenhauer",
    role: "VP of Alumni Relations",
    email: "danhauer.4@osu.edu",
  },
  {
    name: "Owen Blevins",
    role: "VP of Membership Development",
    email: "blevins.348@osu.edu",
  },
  {
    name: "Carlo Polisena",
    role: "VP of Corporate Relations",
    email: "polisena.6@osu.edu",
  },
  {
    name: "Gabby Raney",
    role: "VP of Operations",
    email: "raney.51@osu.edu",
  },
  {
    name: "Katie Dunn",
    role: "VP of Marketing",
    email: "dunn.973@osu.edu",
  },
  {
    name: "Asha Segall",
    role: "Treasurer",
    email: "segall.22@osu.edu",
  },
  {
    name: "Russel Heiser",
    role: "VP of Technology",
    email: "heiser.75@osu.edu",
  },
];

export default function StudentLeadership() {
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
          stagger: 0.06,
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
    <Box
      ref={sectionRef}
      component="section"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Box
        sx={{
          maxWidth: "72rem",
          mx: "auto",
          px: { xs: 3, sm: 4, md: 6 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Box data-reveal sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h3" component="h2" sx={{ color: "#fff", mb: 1.5 }}>
            Student Leadership
          </Typography>
          <Box
            aria-hidden
            sx={{
              width: "3.5rem",
              height: "0.25rem",
              backgroundColor: "#fff",
            }}
          />
        </Box>
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {STUDENT_LEADERS.map((person) => (
            <Grid
              key={person.email}
              size={{ xs: 6, sm: 4, md: 2.4 }}
              data-reveal
            >
              <IndividualCard {...person} tone="scarlet" />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
