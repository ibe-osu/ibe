"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Welcome() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".hero-kicker", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.15)
          .from(".hero-title", { y: 36, autoAlpha: 0, duration: 0.9 }, 0.25)
          .from(
            ".hero-rule",
            { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
            0.5,
          )
          .from(".hero-tagline", { y: 24, autoAlpha: 0, duration: 0.8 }, 0.6);
      });
    },
    { scope: heroRef },
  );

  return (
    <Box
      ref={heroRef}
      component="section"
      aria-labelledby="welcome-heading"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        minHeight: { xs: "calc(100svh - 64px)", md: "calc(100vh - 64px)" },
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <Box
        component="picture"
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          display: "block",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          },
        }}
      >
        <source media="(max-width:800px)" srcSet="/welcome-vertical.jpeg" />
        <Image
          src="/welcome.jpeg"
          alt=""
          width={1920}
          height={1080}
          priority
        />
      </Box>

      {/* Scrim: deep scarlet cast, weighted toward the text corner for contrast */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to top, rgba(30, 2, 9, 0.85) 0%, rgba(30, 2, 9, 0.42) 45%, rgba(30, 2, 9, 0.18) 100%),
            linear-gradient(115deg, rgba(186, 12, 47, 0.45) 0%, rgba(186, 12, 47, 0.08) 70%)
          `,
        }}
      />

      {/* Content — bottom-left, editorial */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
          pb: { xs: "4.5rem", md: "6rem" },
          pt: "8rem",
        }}
      >
        <Typography
          className="hero-kicker"
          component="p"
          sx={{
            fontFamily: "var(--font-pt-serif-caption), serif",
            fontStyle: "italic",
            fontSize: { xs: "1rem", md: "1.25rem" },
            color: "#f3cdd6",
            mb: { xs: "0.75rem", md: "1rem" },
          }}
        >
          Integrated Business &amp; Engineering Honors Program
        </Typography>

        <Typography
          id="welcome-heading"
          component="h1"
          className="hero-title"
          sx={{
            fontFamily: "var(--font-pt-serif-caption), serif",
            color: "secondary.main",
            fontSize: "clamp(3rem, 6.5vw + 0.5rem, 5.5rem)",
            lineHeight: 1.05,
            textWrap: "balance",
            maxWidth: "14ch",
          }}
        >
          Welcome to IBE
        </Typography>

        <Box
          className="hero-rule"
          aria-hidden="true"
          sx={{
            width: "6rem",
            height: "3px",
            backgroundColor: "secondary.main",
            my: { xs: "1.25rem", md: "1.75rem" },
          }}
        />

        <Typography
          className="hero-tagline"
          component="p"
          sx={{
            color: "rgba(255, 255, 255, 0.94)",
            fontSize: "clamp(1.125rem, 1.2vw + 0.75rem, 1.5rem)",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: "36ch",
            textWrap: "pretty",
          }}
        >
          The Ohio State University&apos;s premier interdisciplinary academic
          program
        </Typography>
      </Box>
    </Box>
  );
}
