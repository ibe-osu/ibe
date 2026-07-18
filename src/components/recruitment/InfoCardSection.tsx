import { Box, Container, Grid, Typography } from "@mui/material";
import InfoCard from "./InfoCard";
import CARDS from "./cardsData";
import Reveal from "@/components/general/Reveal";

export default function InfoCardSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}
        >
          Keep Exploring
        </Typography>
        <Reveal variant="stagger" targets=".MuiGrid-container > *">
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            alignItems="stretch"
            justifyContent="center"
          >
            {CARDS.map((c) => (
              <Grid key={c.header} size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoCard {...c} />
              </Grid>
            ))}
          </Grid>
        </Reveal>
      </Container>
    </Box>
  );
}
