"use client";

import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CompanyScroller from "./CompanyScroller";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH, SECTION_PY } from "@/theme/layout";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
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
      component="section"
      ref={sectionRef}
      sx={{
        textAlign: "center",
        px: PAGE_GUTTER,
        py: SECTION_PY,
      }}
    >
      <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: "auto" }}>
      <Typography
        component="p"
        variant="body2"
        data-reveal
        sx={{
          color: "primary.main",
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          fontWeight: 700,
          mb: "1rem",
        }}
      >
        Alumni Outcomes
      </Typography>
      <Typography variant="h3" data-reveal sx={{ mb: "1rem" }}>
        One Program. Endless Opportunities.
      </Typography>
      <Box
        data-reveal
        aria-hidden="true"
        sx={{
          width: "3.5rem",
          height: "3px",
          backgroundColor: "primary.main",
          mx: "auto",
          mb: "1.25rem",
        }}
      />
      <Typography
        variant="body1"
        data-reveal
        sx={{
          color: "text.secondary",
          maxWidth: "62ch",
          mx: "auto",
          lineHeight: 1.7,
        }}
      >
        IBE graduates have received highly sought internships and post
        graduation opportunities spanning geographies (including Chicago,
        Silicon Valley, New York City, and Sydney), and industries (including
        tech, consulting, finance, industrial goods, and healthcare)
      </Typography>
      <Box data-reveal sx={{ mt: { xs: "2rem", md: "3rem" } }}>
        <CompanyScroller />
      </Box>
      </Box>
    </Box>
  );
}
