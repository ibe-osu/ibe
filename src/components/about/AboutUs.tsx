"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH } from "@/theme/layout";

gsap.registerPlugin(useGSAP);

export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement>(null);

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
          delay: 0.15,
        });
      });
    },
    { scope: heroRef },
  );

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        position: "relative",
        height: "calc(75vh - 64px)", // Adjust for header height
        minHeight: "500px",
        overflow: "hidden",
      }}
    >
      <Image
        src="/about.jpg"
        alt="IBE students collaborating around tables with laptops in a design lab classroom"
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
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: CONTENT_MAX_WIDTH,
            mx: "auto",
            px: PAGE_GUTTER,
            pb: { xs: "3.5rem", md: "5rem" },
          }}
        >
          <Typography
            data-hero-reveal
            component="p"
            sx={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
              mb: { xs: 1.5, md: 2 },
            }}
          >
            About IBE
          </Typography>
          <Typography
            data-hero-reveal
            variant="h1"
            sx={{
              color: "#fff",
              fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.05,
              mb: { xs: 2, md: 2.5 },
            }}
          >
            About Us
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
            We are the Integrated Business and Engineering (IBE) Honors Program
            at Ohio State — a tight-knit community of students who bridge
            business and engineering to solve real-world problems. United by
            curiosity and a drive to lead, we learn by doing and grow together
            as innovators and collaborators.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
