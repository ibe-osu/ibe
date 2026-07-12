"use client";

import { useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion || document.hidden) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-hero-title]", { y: 36, opacity: 0, duration: 1 }, 0.15)
        .from("[data-hero-rule]", { scaleX: 0, duration: 0.9 }, 0.45)
        .from("[data-hero-subtitle]", { y: 24, opacity: 0, duration: 0.9 }, 0.6)
        .from("[data-hero-cta]", { y: 18, opacity: 0, duration: 0.8 }, 0.8);
    },
    { scope: containerRef },
  );

  return (
    <Box
      ref={containerRef}
      component="section"
      aria-label="Welcome"
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "calc(100svh - 64px)", md: "calc(100vh - 72px)" },
        minHeight: "480px",
        overflow: "hidden",
      }}
    >
      <picture
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <source media="(max-width:800px)" srcSet="/welcome-vertical.jpeg" />
        <Image
          src="/welcome.jpeg"
          alt="IBE Honors Program students gathered on Ohio State's campus"
          width={1920}
          height={1080}
          priority
          style={{
            objectFit: "cover",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </picture>

      {/* Layered scrim: scarlet brand tint + darkening gradient for text contrast */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(186, 12, 47, 0.35)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(23, 5, 9, 0.55) 0%, rgba(23, 5, 9, 0.15) 45%, rgba(23, 5, 9, 0.3) 100%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          pb: { xs: "3rem", sm: 0 },
        }}
      >
        <Typography
          variant="h1"
          data-hero-title
          sx={{
            color: "#fff",
            textAlign: "center",
            textShadow: "0 2px 24px rgba(0, 0, 0, 0.35)",
          }}
        >
          Welcome to IBE
        </Typography>

        <Box
          data-hero-rule
          sx={{
            width: { xs: "70%", sm: "34rem" },
            height: "3px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            mt: { xs: 2, md: 2.5 },
            mb: { xs: 2.5, md: 3 },
          }}
        />

        <Typography
          variant="h4"
          component="p"
          data-hero-subtitle
          sx={{
            color: "#fff",
            textAlign: "center",
            maxWidth: "36ch",
            textShadow: "0 1px 16px rgba(0, 0, 0, 0.35)",
          }}
        >
          The Ohio State University&apos;s premier interdisciplinary academic
          program
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          data-hero-cta
          sx={{ mt: { xs: 4, md: 5 } }}
        >
          <Button
            component={Link}
            href="/recruitment"
            sx={{
              backgroundColor: "#fff",
              color: "primary.main",
              px: "1.75rem",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.88)",
              },
            }}
          >
            Join the Program
          </Button>
          <Button
            component={Link}
            href="/about"
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "rgba(255, 255, 255, 0.75)",
              borderWidth: "2px",
              px: "1.75rem",
              "&:hover": {
                borderColor: "#fff",
                borderWidth: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
              },
            }}
          >
            Meet the Community
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
