import { Box, Container, Typography } from "@mui/material";
import IBEVideo from "./IBEVideo";

export default function WhoAreWe() {
  return (
    <Box
      component="section"
      aria-labelledby="who-are-we"
      sx={{
        py: { xs: 7, md: 11 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 5,
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 4, md: 5 },
            }}
          >
            <Box>
              <Typography variant="h2" id="who-are-we" sx={{ mb: 2 }}>
                Who Are We?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", maxWidth: "58ch" }}
              >
                The{" "}
                <em>Integrated Business and Engineering (IBE) Honors Program</em>{" "}
                is a challenging four-year program designed to help prepare the
                next generation of business and technology leaders to operate
                effectively across business and technical domains, and to learn
                an innovative approach to problem solving.
              </Typography>
            </Box>
            <Box
              sx={{
                pt: { xs: 3, md: 4 },
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h3" component="h3" sx={{ mb: 1.5 }}>
                The Need
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", maxWidth: "58ch" }}
              >
                An increasingly interconnected global economy creates
                collaborative opportunities and competitive pressures for U.S.
                companies, generating the need for broadly educated engineers
                and business professionals. Ohio State&apos;s IBE program
                equips graduates to meet these challenges head on.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ pt: { md: 1 } }}>
            <IBEVideo />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
