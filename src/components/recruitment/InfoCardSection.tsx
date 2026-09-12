import { Box, Container, Typography } from "@mui/material";
import InfoCard from "./InfoCard";
import CARDS from "./cardsData";

export default function InfoCardSection() {
  return (
    <Box
      component="section"
      aria-labelledby="keep-exploring"
      sx={{ py: { xs: 7, md: 11 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Typography
          variant="h2"
          id="keep-exploring"
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          Keep Exploring
        </Typography>

        {/* Ruled row: 1px gaps over the divider color draw the hairlines
            between entries, so nothing needs a box of its own. */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: "1px",
            backgroundColor: "divider",
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {CARDS.map((c) => (
            <InfoCard key={c.header} {...c} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
