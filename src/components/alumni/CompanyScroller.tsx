"use client";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CompanyScrollRow from "./CompanyScrollRow";

const logos = [
  "/companies/accenture.svg",
  "/companies/amazon.svg",
  "/companies/american-express.svg",
  "/companies/bain.svg",
  "/companies/bcg.svg",
  "/companies/boeing.svg",
  "/companies/capital-one.svg",
  "/companies/cisco.svg",
  "/companies/citi.svg",
  "/companies/deloitte.svg",
  "/companies/disney.svg",
  "/companies/doordash.svg",
  "/companies/eaton.svg",
  "/companies/epic.svg",
  "/companies/exxon-mobil.svg",
  "/companies/ey.svg",
  "/companies/ge.svg",
  "/companies/goldman-sachs.svg",
  "/companies/google.svg",
  "/companies/honda.svg",
  "/companies/instagram.svg",
  "/companies/intel.svg",
  "/companies/jp-morgan-chase.svg",
  "/companies/kroger.svg",
  "/companies/mcdonalds.svg",
  "/companies/mckinsey.svg",
  "/companies/meta.svg",
  "/companies/microsoft.svg",
  "/companies/morgan-stanley.svg",
  "/companies/nationwide.svg",
  "/companies/netflix.svg",
  "/companies/palantir.svg",
  "/companies/pepsico.svg",
  "/companies/pg.svg",
  "/companies/pwc.svg",
  "/companies/rbc.svg",
  "/companies/stripe.svg",
  "/companies/tesla.svg",
  "/companies/uber.svg",
];

// helper: split array into n roughly equal chunks (round-robin distribution)
function splitIntoChunks<T>(arr: T[], n: number): T[][] {
  const out: T[][] = Array.from({ length: n }, () => []);
  arr.forEach((item, i) => out[i % n].push(item));
  return out;
}

// layout constants (use numeric px values as sensible defaults)
const GAP_PX = 40; // px gap between cells

export default function CompanyScroller() {
  const rows = splitIntoChunks(logos, 3);
  // Slow, slightly offset drifts — calm and readable rather than busy
  const durations = [52, 64, 58];
  const theme = useTheme();
  // Responsive cell height using MUI breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  let cellHeight = 96;
  if (isXs) cellHeight = 56;
  else if (isSm) cellHeight = 80;

  return (
    <Box
      aria-label="Companies where IBE alumni have worked"
      sx={{
        overflow: "hidden",
        width: "100%",
        py: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: `${GAP_PX}px` }}
      >
        <CompanyScrollRow
          cellHeight={cellHeight}
          gapPx={GAP_PX}
          duration={durations[0]}
          direction="normal"
          logos={rows[0] || []}
        />

        <CompanyScrollRow
          cellHeight={cellHeight}
          gapPx={GAP_PX}
          duration={durations[1]}
          direction="reverse"
          logos={rows[1] || []}
        />

        <CompanyScrollRow
          cellHeight={cellHeight}
          gapPx={GAP_PX}
          duration={durations[2]}
          direction="normal"
          logos={rows[2] || []}
        />
      </Box>
    </Box>
  );
}
