"use client";

import { useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { getImageProps } from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { sansFamily } from "@/theme/fonts";
import welcomeImg from "../../../public/welcome.jpeg";
import welcomeVerticalImg from "../../../public/welcome-vertical.jpeg";

gsap.registerPlugin(useGSAP, SplitText);

const heroAlt = "IBE Honors Program students gathered on Ohio State's campus";

const { props: desktopImg } = getImageProps({
  src: welcomeImg,
  alt: heroAlt,
  priority: true,
  sizes: "(max-width: 900px) 100vw, 50vw",
});
const { props: mobileImg } = getImageProps({
  src: welcomeVerticalImg,
  alt: heroAlt,
  priority: true,
  sizes: "100vw",
});

const PROOF = [
  "72 students per cohort",
  "Fisher College of Business + College of Engineering",
  "Two tracks: Traditional and Software Innovation",
  "100% job placement",
];

export default function Welcome() {
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
      const proof = el.querySelectorAll<HTMLElement>("[data-hero-proof]");
      if (!heading || !photo) return;

      let split: SplitText | undefined;
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => split?.revert(),
      });

      tl.fromTo(
        photo,
        { clipPath: "inset(0 0 0 100%)", scale: 1.05 },
        {
          clipPath: "inset(0 0 0 0%)",
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
          clearProps: "clipPath",
        },
        0.05,
      );

      document.fonts.ready.then(() => {
        split = SplitText.create(heading, { type: "lines", mask: "lines" });
        tl.from(
          split.lines,
          { yPercent: 105, duration: 1.1, stagger: 0.1 },
          0.2,
        )
          .from(rest, { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.65)
          .from(
            proof,
            { y: 10, opacity: 0, duration: 0.6, stagger: 0.06 },
            1.05,
          );
      });
    },
    { scope: ref },
  );

  return (
    <Box ref={ref} component="section" aria-label="Welcome">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 11fr) minmax(0, 13fr)" },
          minHeight: { md: "min(calc(100vh - 75px), 820px)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            containerType: "inline-size",
            px: { xs: 2.5, md: 4, lg: 6 },
            pt: { xs: 6, md: 8 },
            pb: { xs: 5, md: 8 },
          }}
        >
          <Typography
            variant="overline"
            component="p"
            data-hero-rest
            sx={{ color: "primary.main", mb: { xs: 2, md: 3 } }}
          >
            Fisher College of Business · College of Engineering
          </Typography>

          <Typography
            variant="h1"
            data-hero-title
            sx={{
              // Sized against the text column, not the viewport, so the
              // longest word ("Engineering") always fits beside the photo.
              fontSize: "clamp(2.5rem, 11.5cqw, 5rem)",
              maxWidth: "13ch",
              textWrap: "balance",
            }}
          >
            Integrated Business &amp; Engineering
          </Typography>

          <Typography
            variant="h4"
            component="p"
            data-hero-rest
            sx={{
              color: "text.secondary",
              maxWidth: "34ch",
              mt: { xs: 2.5, md: 3.5 },
              fontFamily: sansFamily,
              fontSize: { xs: "1.125rem", md: "1.375rem" },
              lineHeight: 1.45,
              fontWeight: 400,
            }}
          >
            The Ohio State University&apos;s premier interdisciplinary
            academic program.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 3 }}
            alignItems={{ xs: "stretch", sm: "center" }}
            data-hero-rest
            sx={{ mt: { xs: 4, md: 5 } }}
          >
            <Button component={Link} href="/recruitment" sx={{ px: "1.75rem" }}>
              Join the Program
            </Button>
            <Typography
              component={Link}
              href="/about"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                fontWeight: 600,
                color: "text.primary",
                width: "fit-content",
                py: 1,
                "& svg": {
                  fontSize: "1.125rem",
                  transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
                },
                "&:hover svg": { transform: "translateX(4px)" },
                "&:hover": { color: "primary.main" },
              }}
            >
              Meet the Community <ArrowForwardIcon />
            </Typography>
          </Stack>
        </Box>

        <Box
          data-hero-photo
          sx={{
            position: "relative",
            minHeight: { xs: "62svh", md: "auto" },
            overflow: "hidden",
            transformOrigin: "center",
          }}
        >
          <picture
            style={{
              display: "block",
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${welcomeImg.blurDataURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <source media="(max-width:899px)" srcSet={mobileImg.srcSet} />
            <img
              {...desktopImg}
              alt={heroAlt}
              style={{
                objectFit: "cover",
                objectPosition: "center 30%",
                pointerEvents: "none",
                width: "100%",
                height: "100%",
              }}
            />
          </picture>
        </Box>
      </Box>

      <Box
        component="ul"
        aria-label="Program at a glance"
        sx={{
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: { xs: 0, lg: 3 },
        }}
      >
        {PROOF.map((item, i) => (
          <Typography
            key={item}
            component="li"
            variant="body2"
            data-hero-proof
            sx={{
              fontWeight: 600,
              letterSpacing: "0.005em",
              px: { xs: 2.5, md: 3 },
              py: { xs: 2, md: 2.5 },
              borderLeft: { xs: i % 2 === 1 ? "1px solid" : "none", md: i > 0 ? "1px solid" : "none" },
              borderTop: { xs: i > 1 ? "1px solid" : "none", md: "none" },
              borderColor: { xs: "divider", md: "divider" },
              textWrap: "balance",
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
