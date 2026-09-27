import { Box, Grid, Typography } from "@mui/material";
import IndividualCard from "./IndividualCard";
import Reveal from "@/components/general/Reveal";

export default function SeniorLeadership() {
  return (
    <Box component="section" sx={{ textAlign: "center", py: { xs: 6, md: 8 } }}>
      <Typography variant="h3" component="h2" sx={{ pb: { xs: 3, md: 4 } }}>
        Senior Leadership
      </Typography>
      <Reveal variant="stagger" targets=".MuiGrid-container > *">
        <Grid
          container
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          justifyItems="center"
          sx={{
            mb: 4,
            // Phones: two people per row across the full width (a 14rem
            // single column left 40% of the screen empty on each side and
            // made ten officers a very long scroll). Wider: fixed rem so
            // the grid stays a tidy centred block.
            width: { xs: "100%", sm: "28rem", md: "42rem", lg: "48rem" },
            px: { xs: 2, sm: 0 },
            margin: "auto",
          }}
        >
          {[
            {
              name: "Kristina Kennedy",
              role: "Engineering Faculty Director",
              email: "kennedy.443@osu.edu",
            },
            {
              name: "Robin Soster",
              role: "Business Faculty Director",
              email: "soster.4@osu.edu",
            },
            {
              name: "Heather Shepherd",
              role: "Program Manager",
              email: "shepherd.550@osu.edu",
            },
          ].map((person) => (
            <Grid key={person.email} size={{ xs: 6, md: 4 }}>
              <IndividualCard {...person} />
            </Grid>
          ))}
        </Grid>
      </Reveal>
    </Box>
  );
}
