"use client";

import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText);

interface PageHeroProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition?: string;
  height?: { xs: string; md: string };
}

/**
 * Shared full-bleed page hero: true-color photo, a neutral scrim rising from
 * the bottom edge, and the page h1 set flush-left on the grid. Static imports
 * give every banner an instant blur placeholder so client-side navigation
 * never shows a blank band while the photo streams in. The line-mask entrance
 * only runs for motion-tolerant visitors; the DOM is complete without it.
 */
export default function PageHero({
  title,
  subtitle,
  kicker,
  image,
  imageAlt,
  objectPosition = "center",
  height = { xs: "62svh", md: "72vh" },
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.hidden
      ) {
        return;
      }

      const heading = el.querySelector<HTMLElement>("[data-hero-title]");
      const photo = el.querySelector<HTMLElement>("[data-hero-photo]");
      const rest = el.querySelectorAll<HTMLElement>("[data-hero-rest]");
      if (!heading) return;

      let split: SplitText | undefined;
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => split?.revert(),
      });

      if (photo) {
        tl.fromTo(
          photo,
          { scale: 1.06 },
          { scale: 1, duration: 1.6, ease: "power3.out" },
          0,
        );
      }

      document.fonts.ready.then(() => {
        split = SplitText.create(heading, { type: "lines", mask: "lines" });
        tl.from(
          split.lines,
          { yPercent: 105, duration: 1, stagger: 0.09 },
          0.15,
        ).from(rest, { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.5);
      });
    },
    { scope: ref },
  );

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        position: "relative",
        height,
        minHeight: "420px",
        maxHeight: "860px",
        overflow: "hidden",
        backgroundColor: "ink.main",
      }}
    >
      <Box
        data-hero-photo
        sx={{ position: "absolute", inset: 0, transformOrigin: "center" }}
      >
        <Image
          src={image}
          alt={imageAlt}
          priority
          placeholder="blur"
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12, 12, 14, 0.78) 0%, rgba(12, 12, 14, 0.38) 42%, rgba(12, 12, 14, 0.06) 100%)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          px: { xs: 2.5, md: 4, lg: 6 },
          pb: { xs: 4, md: 7 },
        }}
      >
        {kicker && (
          <Typography
            variant="overline"
            component="p"
            data-hero-rest
            sx={{ color: "rgba(255, 255, 255, 0.82)", mb: 1.5 }}
          >
            {kicker}
          </Typography>
        )}
        <Typography
          variant="h1"
          data-hero-title
          sx={{ color: "#fff", maxWidth: "14ch" }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            component="p"
            data-hero-rest
            sx={{
              color: "rgba(255, 255, 255, 0.88)",
              maxWidth: "58ch",
              mt: { xs: 2, md: 2.5 },
              fontSize: { xs: "1.0625rem", md: "1.25rem" },
              lineHeight: 1.55,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
