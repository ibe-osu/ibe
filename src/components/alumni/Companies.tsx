import { Box, Typography } from "@mui/material";
import CompanyScroller from "./CompanyScroller";

export default function Companies() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          px: { xs: "1rem", sm: "4rem", md: "8rem", lg: "12rem" },
          py: { xs: "2rem", md: "4rem" },
        }}
      >
        <Typography variant="h3" sx={{ mb: "0.5rem" }}>
          One Program. Endless Opportunities.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          IBE graduates have received highly sought internships and post
          graduation opportunities spanning geographies (including Chicago,
          Silicon Valley, New York City, and Sydney), and industries (including
          tech, consulting, finance, industrial goods, and healthcare)
        </Typography>
        <CompanyScroller />
      </Box>
    </>
  );
}
