import { Box, Container, Typography } from "@mui/material";
import CompanyScroller from "./CompanyScroller";

export default function Companies() {
  return (
    <Box
      component="section"
      aria-labelledby="alumni-opportunities"
      sx={{ pt: { xs: 7, md: 11 }, pb: { xs: 4, md: 6 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 2.5,
            alignItems: "end",
          }}
        >
          <Typography
            variant="h2"
            id="alumni-opportunities"
            sx={{ maxWidth: "12ch" }}
          >
            One Program. Endless Opportunities.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "58ch",
              fontSize: { md: "1.125rem" },
            }}
          >
            IBE graduates have received highly sought internships and post
            graduation opportunities spanning geographies (including Chicago,
            Silicon Valley, New York City, and Sydney), and industries
            (including tech, consulting, finance, industrial goods, and
            healthcare)
          </Typography>
        </Box>
      </Container>
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <CompanyScroller />
      </Box>
    </Box>
  );
}
