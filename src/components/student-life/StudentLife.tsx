"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
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
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
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
        backgroundColor: "primary.main",
        color: "#fff",
        px: { xs: 3, sm: 5, md: 8 },
        py: { xs: 7, md: 10 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          columnGap: { md: 8 },
          rowGap: 4,
          alignItems: "center",
        }}
      >
        <Box data-hero-reveal>
          <Typography
            component="p"
            sx={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
              mb: 2,
            }}
          >
            Life at IBE
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{ lineHeight: 1.05, textWrap: "balance" }}
          >
            Student Life
          </Typography>
        </Box>

        <Box
          data-hero-reveal
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            borderLeft: { md: "1px solid rgba(255, 255, 255, 0.4)" },
            pl: { md: 6 },
            pt: { xs: 1, md: 0 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              fontSize: { md: "1.0625rem" },
              color: "rgba(255, 255, 255, 0.95)",
            }}
          >
            IBE fosters a culture of professional growth and meaningful
            connections&mdash;ensuring that while we strive for excellence, we
            also build lasting relationships and enjoy the journey along the
            way.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              fontSize: { md: "1.0625rem" },
              color: "rgba(255, 255, 255, 0.95)",
            }}
          >
            Whether it&apos;s program trips, speaker events or socials, see
            below for what our students at IBE are up to!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
