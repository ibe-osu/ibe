"use client";

import { useRef } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { serifFamily } from "@/theme/fonts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Milestone {
  year: string;
  title: string;
  body: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: "Year One",
    title: "Build the Foundation",
    body: "Seventy-two students from Fisher and the College of Engineering arrive as one class and move into the IBE learning community together. First Year Engineering (ENGR 1281H) pairs with the IBE Freshman Capstone (ENGR 1282H) — the Freshman Cornerstone Project — where the cohort tackles its first real design problem as a team.",
    highlights: [
      "IBE learning community",
      "First Year Engineering & Freshman Capstone",
      "Cohort traditions & socials",
    ],
  },
  {
    year: "Year Two",
    title: "Take On the Second Discipline",
    body: "Engineers begin the business core and business majors begin engineering sciences — each earning the minor that makes IBE integrated. The Corporate Strategy Seminar (BUSMHR 2400H) grounds that new coursework in how real companies actually make decisions.",
    highlights: [
      "Corporate Strategy Seminar (BUSMHR 2400H)",
      "Cross-disciplinary minor coursework",
      "Peer & alumni mentorship",
    ],
  },
  {
    year: "Year Three",
    title: "Step Into Industry",
    body: "The classroom opens outward. The Innovation Strategy Seminar (BUSMHR 3400H) turns toward new-venture strategy as students take on internships, network with corporate partners over industry lunches, and step into elected roles on the student leadership board.",
    highlights: [
      "Innovation Strategy Seminar (BUSMHR 3400H)",
      "Internships & industry networking lunches",
      "Student leadership board",
    ],
  },
  {
    year: "Year Four",
    title: "Deliver the Capstone",
    body: "The year-long IBE Capstone (ENGR 5901H, ENGR 5902H) puts everything to work: seniors take on a sponsor-directed project guided by executives from the program's corporate partners, then graduate into a network with a 100% job placement record.",
    highlights: [
      "IBE Capstone I & II (ENGR 5901H/5902H)",
      "Executive mentorship",
      "100% job placement",
    ],
  },
];

/**
 * Scroll-driven four-year timeline. A scarlet line "fills" the central spine
 * as the visitor scrolls, and each milestone's marker ignites as the line
 * passes it. Everything is fully visible without JavaScript: GSAP only
 * rewinds the default (completed) state at mount, then scrubs it back in,
 * so no content is ever gated on the animation. Respects
 * prefers-reduced-motion by leaving the completed state untouched.
 */
export default function FourYearJourney() {
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

      const spine = el.querySelector<HTMLElement>("[data-journey-fill]");
      const nodes = el.querySelectorAll<HTMLElement>("[data-journey-node]");

      // The spine fill tracks scroll position: origin top, scaleY 0 -> 1.
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector("[data-journey-track]"),
              start: "top 62%",
              end: "bottom 68%",
              scrub: 0.6,
            },
          },
        );
      }

      nodes.forEach((node) => {
        const dot = node.querySelector<HTMLElement>("[data-journey-dot]");
        const content = node.querySelectorAll<HTMLElement>(
          "[data-journey-content] > *",
        );

        // Marker ignites (scarlet) as the fill line reaches it, and
        // reverses if the visitor scrolls back above it.
        if (dot) {
          gsap.fromTo(
            dot,
            { backgroundColor: "#e0e0e0", scale: 0.8 },
            {
              backgroundColor: "#ba0c2f",
              scale: 1,
              duration: 0.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 62%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        gsap.from(content, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: node,
            start: "top 74%",
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Box
      ref={ref}
      component="section"
      aria-label="The four-year journey"
      sx={{
        py: { xs: 7, md: 11 },
        backgroundColor: "#f9f6f6",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 2,
            alignItems: "end",
            mb: { xs: 6, md: 9 },
          }}
        >
          <Typography variant="h2" sx={{ maxWidth: "10ch" }}>
            The Four-Year Journey
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "52ch",
              fontSize: { md: "1.125rem" },
            }}
          >
            From move-in day to a sponsor-directed capstone, IBE is a single
            continuous arc — each year building on the last.
          </Typography>
        </Box>

        {/* Timeline track: spine on the left (mobile) or left-of-center
            (desktop), with the year label and content beside it. */}
        <Box
          data-journey-track
          sx={{
            position: "relative",
            maxWidth: "56rem",
            mx: "auto",
            // The static grey spine; the scarlet fill sits on top of it.
            "&::before": {
              content: '""',
              position: "absolute",
              top: 6,
              bottom: 6,
              left: { xs: "7px", md: "calc(28% + 7px)" },
              width: "2px",
              backgroundColor: "grey.300",
            },
          }}
        >
          <Box
            data-journey-fill
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: 6,
              bottom: 6,
              left: { xs: "7px", md: "calc(28% + 7px)" },
              width: "2px",
              backgroundColor: "primary.main",
              transformOrigin: "top center",
            }}
          />

          {MILESTONES.map((milestone, index) => (
            <Box
              key={milestone.year}
              data-journey-node
              sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: { xs: "16px 1fr", md: "28% 16px 1fr" },
                columnGap: { xs: 2.5, md: 4 },
                "&:not(:last-of-type)": {
                  pb: { xs: 5.5, md: 8 },
                },
              }}
            >
              {/* Year figure: right-aligned against the spine on desktop */}
              <Box
                component="h3"
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  alignItems: "flex-end",
                  textAlign: "right",
                  m: 0,
                  mt: "-0.18em",
                }}
              >
                <Typography
                  component="span"
                  aria-hidden="true"
                  sx={{
                    fontFamily: serifFamily,
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "primary.main",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography
                  component="span"
                  variant="overline"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  {milestone.year}
                </Typography>
              </Box>

              {/* Spine marker */}
              <Box
                sx={{ position: "relative", gridColumn: { xs: 1, md: 2 } }}
                aria-hidden="true"
              >
                <Box
                  data-journey-dot
                  sx={{
                    position: "absolute",
                    top: 6,
                    left: 0,
                    width: 16,
                    height: 16,
                    backgroundColor: "primary.main",
                    border: "3px solid #f9f6f6",
                    outline: "1px solid",
                    outlineColor: "grey.400",
                  }}
                />
              </Box>

              <Box data-journey-content sx={{ minWidth: 0 }}>
                <Typography
                  variant="overline"
                  component="h3"
                  sx={{ display: { md: "none" }, color: "primary.main", mb: 1 }}
                >
                  {milestone.year}
                </Typography>
                <Typography
                  variant="h3"
                  component="p"
                  sx={{ mb: 1.5, maxWidth: "20ch" }}
                >
                  {milestone.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", maxWidth: "56ch", mb: 2 }}
                >
                  {milestone.body}
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                  }}
                >
                  {milestone.highlights.map((highlight) => (
                    <Typography
                      key={highlight}
                      component="li"
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        "&::before": {
                          content: '""',
                          flexShrink: 0,
                          width: 5,
                          height: 5,
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      {highlight}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Two tracks end-cap: the academic blueprint behind the journey */}
        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            pt: { xs: 5, md: 7 },
            borderTop: "1px solid",
            borderColor: "divider",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 4,
            alignItems: "start",
          }}
        >
          <Box>
            <Typography variant="h2" component="h3" sx={{ maxWidth: "10ch" }}>
              Two Tracks, One Cohort
            </Typography>
            <Button
              component={Link}
              href="/recruitment"
              sx={{ px: "1.75rem", mt: { xs: 3, md: 4 } }}
            >
              See How to Apply
            </Button>
          </Box>

          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 3, md: 5 },
                mb: { xs: 4, md: 6 },
              }}
            >
              <Box
                sx={{ pt: 2, borderTop: "2px solid", borderColor: "primary.main" }}
              >
                <Typography variant="h5" component="h4" sx={{ mb: 0.75 }}>
                  IBE Traditional
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  <strong>Engineering majors</strong> earn a business minor;{" "}
                  <strong>business majors</strong> earn an engineering sciences
                  minor.
                </Typography>
              </Box>
              <Box
                sx={{ pt: 2, borderTop: "2px solid", borderColor: "primary.main" }}
              >
                <Typography variant="h5" component="h4" sx={{ mb: 0.75 }}>
                  IBE Software Innovation
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  <strong>CSE majors</strong> earn a business minor;{" "}
                  <strong>business and non-CSE majors</strong> earn a computer
                  science minor.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "#fff",
                p: { xs: 2, md: 3 },
              }}
            >
              <picture>
                <source
                  media="(max-width:800px)"
                  srcSet="/coursework/coursework-vertical.svg"
                />
                <Image
                  src="/coursework/coursework.svg"
                  alt="Diagram of the IBE four-year coursework plan across business and engineering"
                  width={700}
                  height={300}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </picture>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
