import { Box, Typography } from "@mui/material";
import CompanyScroller from "./CompanyScroller";
import Reveal from "@/components/general/Reveal";

export default function Companies() {
  return (
    <>
      <Box
        component="section"
        sx={{
          textAlign: "center",
          px: { xs: "1rem", sm: "4rem", md: "8rem", lg: "12rem" },
          py: { xs: 6, md: 8 },
        }}
      >
        <Reveal>
          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            One Program. Endless Opportunities.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: "70ch", mx: "auto" }}
          >
            IBE graduates have received highly sought internships and post
            graduation opportunities spanning geographies (including Chicago,
            Silicon Valley, New York City, and Sydney), and industries
            (including tech, consulting, finance, industrial goods, and
            healthcare)
          </Typography>
        </Reveal>
        <CompanyScroller />
      </Box>
    </>
  );
}
