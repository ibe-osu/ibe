"use client";

import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        px: 2,
        py: { xs: 2.5, md: 1 },
      }}
    >
      <Typography
        variant="h2"
        component="p"
        data-stat-value={value}
        sx={{ color: "#fff", lineHeight: 1.1 }}
      >
        {value}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ color: "rgba(255, 255, 255, 0.9)", mt: 0.75 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

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

      el.querySelectorAll<HTMLElement>("[data-stat-value]").forEach((node) => {
        const target = node.dataset.statValue ?? "";
        // Split "$96k" / "100%" / "3.8" into prefix, number, suffix
        const match = target.match(/^([^0-9]*)([0-9.]+)(.*)$/);
        if (!match) return;
        const [, prefix, num, suffix] = match;
        const decimals = num.includes(".") ? num.split(".")[1].length : 0;
        const counter = { v: 0 };

        gsap.to(counter, {
          v: parseFloat(num),
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            once: true,
          },
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
      sx={{
        backgroundColor: "primary.main",
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ color: "#fff", textAlign: "center", mb: { xs: 3, md: 5 } }}
        >
          Program by the Numbers
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            rowGap: { xs: 2, sm: 3 },
            "& > *:not(:first-of-type)": {
              borderLeft: {
                md: "1px solid rgba(255, 255, 255, 0.35)",
              },
            },
          }}
        >
          <Stat value="3.8" label="Average GPA" />
          <Stat value="34" label="Average ACT" />
          <Stat value="100%" label="Job Placement" />
          <Stat value="$96k" label="Avg. Starting Salary" />
        </Box>
      </Container>
    </Box>
  );
}
