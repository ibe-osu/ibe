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
    date: "November 1",
    title: "Ohio State Early Action Deadline",
    body: "Priority deadline for applying to the OSU Honors Program — a prerequisite for IBE consideration.",
  },
  {
    date: "January – March",
    title: "Honors Decisions Released",
    body: "Honors decisions are released on a rolling basis. If you're accepted into Honors, expect an email invitation to apply to IBE.",
  },
  {
    date: "January – April",
    title: "Virtual Information Sessions",
    body: "The IBE recruitment team holds virtual information sessions throughout the spring. Fill out the interest form above to be invited.",
  },
  {
    date: "Early March",
    title: "Admission Offers Begin",
    body: "Offers of admission into the IBE Program are released in waves starting in early March.",
  },
  {
    date: "Late March",
    title: "All Honors Decisions Out",
    body: "All University Honors decisions should be released by the end of March. Watch your inbox — and your junk folder — for the invitation to apply.",
  },
  {
    date: "April 3, 2026",
    title: "IBE Application Deadline",
    body: "The final day to submit your IBE application. Applications received after this date will not be considered.",
  },
];

/**
 * Scroll-driven application timeline: a scarlet spine fills past six dated
 * milestones as the visitor scrolls. Mirrors the home page journey's
 * [date | spine | content] grammar on desktop; the spine moves to the left
 * edge on mobile. The completed state is the CSS default — GSAP only
 * rewinds and scrubs it when motion is allowed — so the timeline is fully
 * legible without JavaScript and under reduced motion.
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

      const fill = el.querySelector<HTMLElement>("[data-timeline-fill]");
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector("[data-steps]"),
              start: "top 65%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          },
        );
      }

      el.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
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
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
        gsap.from(step.querySelectorAll("[data-step-content] > *"), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
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
          From the Early Action deadline to the April 3 close, here is how the
          application season unfolds.
        </Typography>

        <Box
          data-steps
          sx={{
            position: "relative",
            maxWidth: "52rem",
            mx: "auto",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 4,
              bottom: 4,
              left: { xs: "7px", md: "calc(30% + 7px)" },
              width: "2px",
              backgroundColor: "grey.300",
            },
          }}
        >
          <Box
            data-timeline-fill
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: 4,
              bottom: 4,
              left: { xs: "7px", md: "calc(30% + 7px)" },
              width: "2px",
              backgroundColor: "primary.main",
              transformOrigin: "top center",
            }}
          />

          {STEPS.map((step) => (
            <Box
              key={step.title}
              data-step
              sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: { xs: "16px 1fr", md: "30% 16px 1fr" },
                columnGap: { xs: 2.5, md: 4 },
                "&:not(:last-of-type)": {
                  pb: { xs: 4.5, md: 5.5 },
                },
              }}
            >
              {/* Date label: right-aligned against the spine on desktop */}
              <Typography
                variant="body2"
                component="p"
                sx={{
                  display: { xs: "none", md: "block" },
                  textAlign: "right",
                  fontWeight: 700,
                  color: "primary.main",
                  pt: "1px",
                }}
              >
                {step.date}
              </Typography>

              {/* Spine marker */}
              <Box
                sx={{ position: "relative", gridColumn: { xs: 1, md: 2 } }}
                aria-hidden="true"
              >
                <Box
                  data-step-dot
                  sx={{
                    position: "absolute",
                    top: 2,
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

              <Box data-step-content sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    display: { md: "none" },
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 0.5,
                  }}
                >
                  {step.date}
                </Typography>
                <Typography variant="h5" component="h3" sx={{ mb: 0.75 }}>
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", maxWidth: "52ch" }}
                >
                  {step.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
