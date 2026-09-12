"use client";

import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { serifFamily } from "@/theme/fonts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FIGURES = [
  { value: "3.8", label: "Average GPA" },
  { value: "34", label: "Average ACT" },
  { value: "100%", label: "Job Placement" },
  { value: "$96k", label: "Avg. Starting Salary" },
];

/**
 * The ledger: the program's proof set as large scarlet figures in ruled
 * rows. Figures count up on scroll for motion-tolerant visitors; the final
 * values are in the DOM from the start.
 */
export default function OurStats() {
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

      el.querySelectorAll<HTMLElement>("[data-figure]").forEach((node) => {
        const target = node.dataset.figure ?? "";
        const match = target.match(/^([^0-9]*)([0-9.]+)(.*)$/);
        if (!match) return;
        const [, prefix, num, suffix] = match;
        const decimals = num.includes(".") ? num.split(".")[1].length : 0;
        const counter = { v: 0 };

        gsap.to(counter, {
          v: parseFloat(num),
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
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
      aria-label="Program outcomes"
      sx={{ py: { xs: 7, md: 11 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 4,
            alignItems: "start",
          }}
        >
          <Box sx={{ position: { md: "sticky" }, top: { md: 104 } }}>
            <Typography variant="h2" sx={{ maxWidth: "10ch" }}>
              Program by the Numbers
            </Typography>
          </Box>

          <Box component="dl" sx={{ m: 0 }}>
            {FIGURES.map((figure) => (
              <Box
                key={figure.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) minmax(0, 1fr)" },
                  alignItems: "baseline",
                  columnGap: 3,
                  py: { xs: 2.5, md: 3 },
                  borderTop: "1px solid",
                  borderColor: "divider",
                  "&:last-of-type": {
                    borderBottom: "1px solid",
                    borderBottomColor: "divider",
                  },
                }}
              >
                <Typography
                  component="dd"
                  data-figure={figure.value}
                  sx={{
                    m: 0,
                    fontFamily: serifFamily,
                    fontSize: "clamp(3.25rem, 6vw, 5.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "primary.main",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {figure.value}
                </Typography>
                <Typography
                  component="dt"
                  variant="h5"
                  sx={{ color: "text.primary", mt: { xs: 1, sm: 0 } }}
                >
                  {figure.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
