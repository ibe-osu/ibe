import { Box, Typography } from "@mui/material";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import IBEVideo from "./IBEVideo";

export default function WhoAreWe() {
  return (
    <Box component="section" aria-labelledby="who-are-we" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <Box sx={{ textAlign: "center", display: "grid", gap: 1.25, justifyItems: "center" }}>
          <Label>The program</Label>
          <Typography variant="h2" id="who-are-we" sx={{ maxWidth: "20ch" }}>
            Who Are We?
          </Typography>
        </Box>

        <Panel lift>
          <IBEVideo />
        </Panel>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 5 },
            maxWidth: "62rem",
            mx: "auto",
          }}
        >
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            <Box component="strong" sx={{ color: "text.primary", fontWeight: 600 }}>
              The Integrated Business and Engineering (IBE) Honors Program
            </Box>{" "}
            is a challenging four-year program designed to help prepare the next generation of business and technology
            leaders to operate effectively across business and technical domains, and to learn an innovative approach
            to problem solving.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            <Box component="strong" id="the-need" sx={{ color: "text.primary", fontWeight: 600 }}>
              The need.
            </Box>{" "}
            An increasingly interconnected global economy creates collaborative opportunities and competitive pressures
            for U.S. companies, generating the need for broadly educated engineers and business professionals. Ohio
            State&apos;s IBE program equips graduates to meet these challenges head on.
          </Typography>
        </Box>
      </Wrap>
    </Box>
  );
}
