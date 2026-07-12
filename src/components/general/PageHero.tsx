"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  objectPosition?: string;
  height?: { xs: string; md: string };
}

/**
 * Shared full-bleed page hero: photo, scarlet brand tint plus darkening
 * gradient for text contrast, and the page h1.
 */
export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  objectPosition = "center",
  height = { xs: "56svh", md: "64vh" },
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.hidden
      ) {
        return;
      }
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-hero-title]", { y: 30, opacity: 0, duration: 0.9 }, 0.1)
        .from(
          "[data-hero-subtitle]",
          { y: 20, opacity: 0, duration: 0.8 },
          0.35,
        );
    },
    { scope: ref },
  );

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
        minHeight: "380px",
        overflow: "hidden",
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        priority
        width={imageWidth}
        height={imageHeight}
        style={{
          objectFit: "cover",
          objectPosition,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      />
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
          gap: { xs: 2, md: 2.5 },
          px: 3,
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
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            component="p"
            data-hero-subtitle
            sx={{
              color: "#fff",
              textAlign: "center",
              maxWidth: "62ch",
              textShadow: "0 1px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
