import { Box, Grid, Typography } from "@mui/material";
import IBEVideo from "./IBEVideo";

export default function WhoAreWe() {
  return (
    <Box
      component="section"
      aria-labelledby="who-are-we-heading"
      sx={{
        py: { xs: "4rem", md: "7rem" },
        px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
      }}
    >
      <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
          {/* Left: text */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Typography
              id="who-are-we-heading"
              variant="h3"
              component="h2"
              sx={{ mb: "1rem", textWrap: "balance" }}
            >
              Who Are We?
            </Typography>
            <Box
              aria-hidden="true"
              sx={{
                width: "3.5rem",
                height: "3px",
                backgroundColor: "primary.main",
                mb: "1.75rem",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "grey.800",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                maxWidth: "62ch",
                textWrap: "pretty",
              }}
            >
              The{" "}
              <em>Integrated Business and Engineering (IBE) Honors Program</em>{" "}
              is a challenging four-year program designed to help prepare the
              next generation of business and technology leaders to operate
              effectively across business and technical domains, and to learn
              an innovative approach to problem solving.
            </Typography>

            <Typography
              variant="h5"
              component="h3"
              sx={{ mt: "2.5rem", mb: "0.75rem" }}
            >
              The Need
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "grey.800",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                maxWidth: "62ch",
                textWrap: "pretty",
              }}
            >
              An increasingly interconnected global economy creates
              collaborative opportunities and competitive pressures for U.S.
              companies, generating the need for broadly educated engineers and
              business professionals. Ohio State&apos;s IBE program equips
              graduates to meet these challenges head on.
            </Typography>
          </Grid>

          {/* Right: video with offset scarlet frame (print-style plate) */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              sx={{
                position: "relative",
                mr: { xs: 0, md: "1rem" },
                mb: { xs: 0, md: "1rem" },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  transform: "translate(1rem, 1rem)",
                  backgroundColor: "primary.main",
                  display: { xs: "none", md: "block" },
                },
              }}
            >
              <IBEVideo />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
