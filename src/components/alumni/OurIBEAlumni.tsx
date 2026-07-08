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
        justifyContent: "center",
        alignItems: "center",
        height: "calc(70vh - 64px)", // Adjust for header height
        minHeight: "380px",
        overflow: "hidden",
      }}
    >
      <Image
        src="/alumni.jpg"
        alt="IBE alumni"
        priority
        width={1920}
        height={540}
        style={{
          objectFit: "cover",
          objectPosition: "top",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
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
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: "1.5rem",
        }}
      >
        <Typography
          component="p"
          variant="body2"
          data-hero-reveal
          sx={{
            color: "secondary.main",
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            fontWeight: 600,
            mb: "1rem",
          }}
        >
          Integrated Business and Engineering
        </Typography>
        <Typography
          variant="h1"
          data-hero-reveal
          sx={{
            color: "secondary.main",
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            lineHeight: 1.05,
          }}
        >
          Our IBE Alumni
        </Typography>
        <Box
          data-hero-reveal
          sx={{
            width: "64px",
            height: "2px",
            backgroundColor: "secondary.main",
            mt: "1.75rem",
          }}
        />
      </Box>
    </Box>
  );
}
