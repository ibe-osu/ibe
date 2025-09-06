import { Box, Grid, Typography } from "@mui/material";

export default function WhoAreWe() {
  return (
    <Box sx={{ p: { xs: "2rem", md: "4rem" } }}>
      <Grid container spacing={{ xs: 2, lg: 6 }} alignItems="stretch">
        {/* Left: text */}
        <Grid size={{ xs: 12, lg: 5, xl: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "100%",
              gap: { xs: "1rem", lg: 0 },
            }}
          >
            <Box sx={{ pb: { xs: 0, lg: "1rem" } }}>
              <Typography variant="h3" sx={{ mb: "0.5rem" }}>
                Who Are We?
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                The{" "}
                <em>
                  Integrated Business and Engineering (IBE) Honors Program
                </em>{" "}
                is a challenging four-year program designed to help prepare the
                next generation of business and technology leaders to operate
                effectively across business and technical domains, and to learn
                an innovative approach to problem solving.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ mb: "0.5rem" }}>
                The Need
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                An increasingly interconnected global economy creates
                collaborative opportunities and competitive pressures for U.S.
                companies, generating the need for broadly educated engineers
                and business professionals. Ohio State&apos;s IBE program equips
                graduates to meet these challenges head on.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Left: text */}
        <Grid size={{ xs: 12, lg: 7, xl: 8 }} sx={{ alignContent: "center" }}>
          <Box
            sx={{
              position: "relative",
              pt: "56.25%", // 16:9
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/bXAEpDkCZAg?si=p_tXuKEFeMjJdxNW"
              title="Integrated Business & Engineering Honors Program at The Ohio State University"
              allow="encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
