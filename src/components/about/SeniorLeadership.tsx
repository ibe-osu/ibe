import { Box, Grid, Typography } from "@mui/material";
import IndividualCard from "./IndividualCard";

export default function SeniorLeadership() {
  return (
    <Box sx={{ textAlign: "center", pt: "2rem", pb: "3rem" }}>
      <Typography variant="h4" sx={{ py: "2rem" }}>
        Senior Leadership:
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        justifyItems="center"
        sx={{
          mb: 4,
          width: { xs: "14rem", sm: "28rem", md: "42rem", lg: "48rem" },
          margin: "auto",
        }}
      >
        {[
          {
            name: "Kristina Kennedy",
            role: "Senior Program Director",
            email: "kennedy.443@osu.edu",
          },
          {
            name: "Michael Leiblein",
            role: "Founding Director",
            email: "leiblein.1@osu.edu",
          },
          {
            name: "Heather Shepherd",
            role: "Program Manager",
            email: "shepherd.550@osu.edu",
          },
        ].map((person) => (
          <Grid key={person.email} size={{ xs: 12, sm: 6, md: 4 }}>
            <IndividualCard {...person} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
