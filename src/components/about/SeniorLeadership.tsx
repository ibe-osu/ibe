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
            <Grid key={person.email} size={{ xs: 12, sm: 6, md: 4 }}>
              <IndividualCard {...person} />
            </Grid>
          ))}
        </Grid>
      </Reveal>
    </Box>
  );
}
