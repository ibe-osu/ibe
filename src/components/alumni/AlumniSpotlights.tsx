"use client";

import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpotlightCard from "./SpotlightCard";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH, SECTION_PY } from "@/theme/layout";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AlumniSpotlights() {
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
          stagger: 0.14,
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
      component="section"
      ref={sectionRef}
      sx={{
        backgroundColor: "primary.main",
        py: SECTION_PY,
        px: PAGE_GUTTER,
      }}
    >
      <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: "auto" }}>
      <Box data-reveal sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ color: "secondary.main" }}>
          Alumni Spotlights
        </Typography>
        <Box
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "secondary.main",
            mx: "auto",
            mt: "1.25rem",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: { xs: "2.5rem", md: "3.5rem" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "1.5rem", md: "2rem" },
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <Box
          data-reveal
          sx={{ flex: "1 1 0", display: "flex", minWidth: 0 }}
        >
          <SpotlightCard
            name="Andrew Topinka"
            graduationYear={18}
            major="Finance"
            minors={["Engineering", "Philosophy"]}
            currentPosition="Senior Manager, Strategy Consulting"
            currentCompany="Cherry Bekaert"
            spotlightText="When asked about applying knowledge that he gained while in college, Andrew believes that his most valuable courses during college were the freshman year design project and his senior year capstone. These IBE projects were his most beneficial academic experiences, and he believes that they are applicable to real life problem solving which he carried with him to internships and his current job."
            imageUrl="/spotlight/AndrewTopinka.png"
            linkedinUrl="https://www.linkedin.com/in/atopinka"
          />
        </Box>
        <Box
          data-reveal
          sx={{ flex: "1 1 0", display: "flex", minWidth: 0 }}
        >
          <SpotlightCard
            name="Alisa Noll"
            graduationYear={17}
            major="Industrial Engineering"
            minors={["Business"]}
            currentPosition="Senior Product Manager"
            currentCompany="Stripe"
            spotlightText="There were multiple instances during Alisa's time at OSU where she felt she was really applying the skills developed through IBE. However, she notes that the mindset she gained through IBE was as valuable as the hard skills. Specifically, in her consulting internships, she felt she was “approaching complex problems from a more creative mindset.” "
            imageUrl="/spotlight/AlisaNoll.png"
            linkedinUrl="https://www.linkedin.com/in/alisa-noll/"
          />
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
