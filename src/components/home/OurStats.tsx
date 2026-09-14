"use client";

import { Box, Typography } from "@mui/material";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import { displayFamily } from "@/theme/fonts";
import { useCountUp } from "@/components/ui/useCountUp";

const FIGURES = [
  { value: "3.8", label: "Average GPA" },
  { value: "34", label: "Average ACT" },
  { value: "100%", label: "Job placement", signal: true },
  { value: "$96k", label: "Avg. starting salary" },
];

function Figure({ value, label, signal }: { value: string; label: string; signal?: boolean }) {
  const ref = useCountUp<HTMLSpanElement>(value);
  return (
    <Box
      sx={{
        display: "grid",
        gap: 0.75,
        justifyItems: "center",
        textAlign: "center",
        px: 2,
        py: { xs: 2.5, md: 3 },
        borderRight: { sm: "1px solid" },
        borderColor: { sm: "divider" },
        "&:last-of-type": { borderRight: 0 },
      }}
    >
      <Label component="dt">{label}</Label>
      <Typography
        component="dd"
        ref={ref}
        sx={{
          m: 0,
          fontFamily: displayFamily,
          fontWeight: 600,
          fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums",
          color: signal ? "signal.main" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function OurStats() {
  return (
    <Box component="section" aria-label="Program outcomes" sx={{ pt: { xs: 5, md: 7 } }}>
      <Wrap>
        <Panel>
          <Box sx={{ px: 2, py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
            <Label>Every cohort</Label>
          </Box>
          <Box
            component="dl"
            sx={{
              m: 0,
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              "& > div:nth-of-type(-n+2)": { borderBottom: { xs: "1px solid", sm: 0 }, borderBottomColor: { xs: "divider" } },
              "& > div:nth-of-type(odd)": { borderRight: { xs: "1px solid", sm: "1px solid" }, borderRightColor: "divider" },
            }}
          >
            {FIGURES.map((f) => (
              <Figure key={f.label} {...f} />
            ))}
          </Box>
          <Box sx={{ px: 2, py: 1.5, borderTop: "1px solid", borderColor: "divider", textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Thirty-six Traditional and thirty-six Software Innovation seats, filled once a year from admitted Ohio
              State Honors students.
            </Typography>
          </Box>
        </Panel>
      </Wrap>
    </Box>
  );
}
