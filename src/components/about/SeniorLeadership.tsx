import { Box, Grid, Typography } from "@mui/material";
import IndividualCard from "./IndividualCard";

export default function SeniorLeadership() {
  return (
    <Box sx={{ textAlign: "center", py: "2rem" }}>
      <Typography variant="h4" sx={{ py: "2rem" }}>
        Senior Leadership:
      </Typography>
      <Grid container spacing={8} justifyContent="center" sx={{ mb: 4 }}>
        <IndividualCard
          name="Kristina Kennedy"
          role="Senior Program Director"
          email="kennedy.443@osu.edu"
        />
        <IndividualCard
          name="Michael Leiblein"
          role="Founding Director"
          email="leiblein.1@osu.edu"
        />
        <IndividualCard
          name="Heather Shepherd"
          role="Program Manager"
          email="shepherd.550@osu.edu"
        />
      </Grid>
    </Box>
  );
}
