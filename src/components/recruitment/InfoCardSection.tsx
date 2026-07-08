import { Box, Grid, Typography } from "@mui/material";
import InfoCard from "./InfoCard";
import CARDS from "./cardsData";

export default function InfoCardSection() {
  return (
    <Box component="section" sx={{ bgcolor: "grey.100" }}>
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          py: { xs: 6, md: 10 },
          px: { xs: 2.5, sm: 4, md: 10 },
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.375rem" },
            mb: { xs: 4, md: 6 },
          }}
        >
          Learn More About IBE
        </Typography>

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
