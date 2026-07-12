import React from "react";
import { Box, Grid } from "@mui/material";
import InfoCard from "./InfoCard";
import CARDS from "./cardsData";
import Reveal from "@/components/general/Reveal";

export default function InfoCardSection() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
        <Reveal variant="stagger" targets=".MuiGrid-container > *">
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            alignItems="stretch"
            justifyContent="center"
          >
            {CARDS.map((c) => (
              <Grid key={c.header} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <InfoCard {...c} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Reveal>
      </Box>
    </Box>
  );
}
