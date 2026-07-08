"use client";

import { alpha, Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function OurIBEAlumni() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
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
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        height: "calc(75vh - 64px)", // Adjust for header height
        minHeight: "500px",
        overflow: "hidden",
      }}
    >
      <Image
        src="/alumni.jpg"
        alt="IBE alumni"
        priority
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "top",
          pointerEvents: "none",
        }}
      />
      {/* Neutral scrim keeps the photo legible without washing it in flat brand color */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${alpha("#000", 0.62)} 0%, ${alpha(
            "#000",
            0.3,
          )} 55%, ${alpha("#000", 0.42)} 100%)`,
        }}
      />
      {/* Faint scarlet tint so the hero still reads as OSU */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
          mixBlendMode: "multiply",
        })}
      />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
          pb: { xs: "3.5rem", md: "5rem" },
        }}
      >
        <Typography
          component="p"
          data-hero-reveal
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#fff",
            mb: { xs: 1.5, md: 2 },
          }}
        >
          Integrated Business and Engineering
        </Typography>
        <Typography
          variant="h1"
          data-hero-reveal
          sx={{
            color: "secondary.main",
            fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.05,
            mb: { xs: 2, md: 2.5 },
          }}
        >
          Our IBE Alumni
        </Typography>
        <Box
          data-hero-reveal
          aria-hidden
          sx={{
            width: "6rem",
            height: "3px",
            backgroundColor: "secondary.main",
          }}
        />
      </Box>
    </Box>
  );
}
