import { Box, Grid, Typography } from "@mui/material";
import InfoCard from "./InfoCard";
import CARDS from "./cardsData";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH, SECTION_PY } from "@/theme/layout";

export default function InfoCardSection() {
  return (
    <Box component="section" sx={{ bgcolor: "grey.100", py: SECTION_PY, px: PAGE_GUTTER }}>
      <Box
        sx={{
          maxWidth: CONTENT_MAX_WIDTH,
          mx: "auto",
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.375rem" },
            mb: "1rem",
          }}
        >
          Learn More About IBE
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "primary.main",
            mb: { xs: 4, md: 6 },
          }}
        />

        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          {CARDS.map((c) => (
            <Grid key={c.header} size={{ xs: 12, sm: 6, md: 4 }}>
              <InfoCard {...c} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
