"use client";

import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Step {
  date: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    date: "January",
    title: "Honors Admission",
    body: "Accepted students enter the University Honors Program and either Fisher or the College of Engineering.",
  },
  {
    date: "January – February",
    title: "Invitations to Apply",
    body: "Application invitations are emailed in waves — check your junk folder so you don't miss yours.",
  },
  {
    date: "Early March",
    title: "Offers Begin",
    body: "IBE admission offers are extended in waves as applications are reviewed.",
  },
  {
    date: "April 3, 2026",
    title: "Application Deadline",
    body: "The final day to submit your IBE application.",
  },
];

/**
 * Scroll-driven application timeline: a scarlet line fills across the four
 * steps as the visitor scrolls (horizontal on desktop, a vertical spine on
 * mobile). Like the home-page journey, the completed state is the CSS
 * default — GSAP only rewinds and scrubs it when motion is allowed — so the
 * timeline is fully legible without JavaScript and under reduced motion.
 */
export default function ApplicationTimeline() {
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

      const track = el.querySelector("[data-steps]");
      const scrollTrigger = {
        trigger: track,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.6,
      };

      el.querySelectorAll<HTMLElement>("[data-fill-h]").forEach((fill) => {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger },
        );
      });
      el.querySelectorAll<HTMLElement>("[data-fill-v]").forEach((fill) => {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger },
        );
      });

      el.querySelectorAll<HTMLElement>("[data-step]").forEach((step, i) => {
        const dot = step.querySelector<HTMLElement>("[data-step-dot]");
        if (dot) {
          gsap.fromTo(
            dot,
            { backgroundColor: "#e0e0e0", scale: 0.8 },
            {
              backgroundColor: "#ba0c2f",
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
        gsap.from(step.querySelectorAll("[data-step-content] > *"), {
          y: 22,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          delay: i * 0.05,
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: step,
            start: "top 78%",
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
      aria-label="Application timeline"
      sx={{
        py: { xs: 6, md: 9 },
        backgroundColor: "#f9f6f6",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Application Timeline
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            maxWidth: "55ch",
            mx: "auto",
            mb: { xs: 5, md: 7 },
          }}
        >
          From honors acceptance to the April deadline, here is how the
          application season unfolds.
        </Typography>

        <Box data-steps sx={{ position: "relative" }}>
          {/* Horizontal track + scarlet fill (desktop) */}
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: "7px",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "grey.300",
            }}
          />
          <Box
            data-fill-h
            aria-hidden="true"
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: "7px",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "primary.main",
              transformOrigin: "left center",
            }}
          />
          {/* Vertical spine + scarlet fill (mobile) */}
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              top: "4px",
              bottom: "4px",
              left: "7px",
              width: "2px",
              backgroundColor: "grey.300",
            }}
          />
          <Box
            data-fill-v
            aria-hidden="true"
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              top: "4px",
              bottom: "4px",
              left: "7px",
              width: "2px",
              backgroundColor: "primary.main",
              transformOrigin: "top center",
            }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              columnGap: 4,
              rowGap: { xs: 5, md: 0 },
            }}
          >
            {STEPS.map((step) => (
              <Box
                key={step.title}
                data-step
                sx={{
                  position: "relative",
                  pl: { xs: 5, md: 0 },
                  pt: { xs: 0, md: 4.5 },
                  pr: { md: 3 },
                }}
              >
                <Box
                  data-step-dot
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    top: { xs: "2px", md: 0 },
                    left: 0,
                    width: 16,
                    height: 16,
                    backgroundColor: "primary.main",
                    border: "3px solid #f9f6f6",
                    outline: "1px solid",
                    outlineColor: "grey.400",
                  }}
                />
                <Box data-step-content>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ fontWeight: 700, color: "primary.main", mb: 0.5 }}
                  >
                    {step.date}
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ mb: 0.75 }}>
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", maxWidth: "38ch" }}
                  >
                    {step.body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
