import { Box, Typography } from "@mui/material";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import SectionHead from "@/components/ui/SectionHead";

const OUTSIDE = [
  "Pick a major and add a minor from the other college",
  "Different classmates in every course",
  "Standard coursework and advising",
  "Build your own network from scratch",
];

const INSIDE = [
  "Custom coursework and dedicated faculty",
  "The same 72 people in your core classes for four years",
  "A tight-knit community with exclusive professional development",
  "Networking and social events built into the program",
];

function Column({ label, items, signal }: { label: string; items: string[]; signal?: boolean }) {
  return (
    <Box sx={{ p: { xs: 2.5, md: 3 }, display: "grid", gap: 1.5, alignContent: "start" }}>
      <Label sx={{ color: signal ? "signal.main" : "text.disabled" }}>{label}</Label>
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: 1.25 }}>
        {items.map((item) => (
          <Box key={item} component="li" sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
            <Box
              aria-hidden="true"
              sx={{
                flexShrink: 0,
                mt: "0.35em",
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "1px solid",
                borderColor: signal ? "signal.main" : "divider",
                backgroundColor: signal ? "signal.main" : "transparent",
                boxShadow: signal ? "inset 0 0 0 3px var(--mui-palette-background-paper)" : "none",
              }}
            />
            <Typography variant="body1" sx={{ color: signal ? "text.primary" : "text.secondary" }}>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** The FAQ's "benefits of IBE" answer, set as a side-by-side comparison. */
export default function Compare() {
  return (
    <Box component="section" aria-labelledby="compare" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead id="compare" title="A major and a minor, or IBE." />
        <Panel sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, maxWidth: "58rem", width: "100%", mx: "auto" }}>
          <Box sx={{ borderRight: { sm: "1px solid" }, borderBottom: { xs: "1px solid", sm: 0 }, borderColor: "divider" }}>
            <Column label="On your own" items={OUTSIDE} />
          </Box>
          <Column label="In IBE" items={INSIDE} signal />
        </Panel>
      </Wrap>
    </Box>
  );
}
