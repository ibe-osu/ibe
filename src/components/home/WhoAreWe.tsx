import { Box, Container, Grid, Typography } from "@mui/material";
import IBEVideo from "./IBEVideo";
import Reveal from "@/components/general/Reveal";

export default function WhoAreWe() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, lg: 8 }} alignItems="center">
          {/* Left: text */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Reveal
              variant="stagger"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 4, lg: 5 },
              }}
            >
              <Box>
                <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
                  Who Are We?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", maxWidth: "65ch" }}
                >
                  The{" "}
                  <em>
                    Integrated Business and Engineering (IBE) Honors Program
                  </em>{" "}
                  is a challenging four-year program designed to help prepare
                  the next generation of business and technology leaders to
                  operate effectively across business and technical domains, and
                  to learn an innovative approach to problem solving.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
                  The Need
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", maxWidth: "65ch" }}
                >
                  An increasingly interconnected global economy creates
                  collaborative opportunities and competitive pressures for U.S.
                  companies, generating the need for broadly educated engineers
                  and business professionals. Ohio State&apos;s IBE program
                  equips graduates to meet these challenges head on.
                </Typography>
              </Box>
            </Reveal>
          </Grid>

          {/* Right: video */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Reveal variant="scale">
              <IBEVideo />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
