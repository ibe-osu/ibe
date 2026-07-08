"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function StudentLifeHeader() {
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
          stagger: 0.12,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        height: "calc(75vh - 64px)",
        minHeight: "500px",
        overflow: "hidden",
      }}
    >
      <Image
        src="/happenings/cleveland-1.jpeg"
        alt="IBE students on a program trip to Cleveland"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      {/* Scrim for text legibility over the photo */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.38) 55%, rgba(0, 0, 0, 0.18) 100%)",
        }}
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
          Life at IBE
        </Typography>
        <Typography
          component="h1"
          data-hero-reveal
          sx={{
            color: "#fff",
            fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.05,
            mb: { xs: 2, md: 2.5 },
          }}
        >
          Student Life
        </Typography>
        <Box
          data-hero-reveal
          aria-hidden
          sx={{
            width: "6rem",
            height: "3px",
            backgroundColor: "secondary.main",
            mb: { xs: 2, md: 2.5 },
          }}
        />
        <Typography
          data-hero-reveal
          variant="body1"
          sx={{
            maxWidth: "42rem",
            color: "rgba(255, 255, 255, 0.92)",
            fontSize: { xs: "1rem", md: "1.125rem" },
            lineHeight: 1.65,
          }}
        >
          IBE fosters a culture of professional growth and meaningful
          connections&mdash;ensuring that while we strive for excellence, we
          also build lasting relationships and enjoy the journey along the
          way. Whether it&apos;s program trips, speaker events, or socials, see
          below for what our students at IBE are up to!
        </Typography>
      </Box>
    </Box>
  );
}
