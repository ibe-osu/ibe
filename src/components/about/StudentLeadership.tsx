import { Box, Grid, Typography } from "@mui/material";
import IndividualCard from "./IndividualCard";
import Reveal from "@/components/general/Reveal";

export default function StudentLeadership() {
  return (
    <Box
      component="section"
      sx={{
        color: "secondary.main",
        backgroundColor: "primary.main",
        textAlign: "center",
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Typography variant="h3" component="h2" sx={{ pb: { xs: 3, md: 4 } }}>
        Student Leadership
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
              name: "Claire Berlier",
              role: "President",
              email: "berlier.3@osu.edu",
            },
            {
              name: "Pranav Vuppu",
              role: "Executive VP",
              email: "panyamvuppu.1@osu.edu",
            },
            {
              name: "Max Muckley",
              role: "VP of Recruitment",
              email: "muckley.9@osu.edu",
            },
            {
              name: "Patrick Dauenhauer",
              role: "VP of Alumni Relations",
              email: "danhauer.4@osu.edu",
            },
            {
              name: "Owen Blevins",
              role: "VP of Membership Development",
              email: "blevins.348@osu.edu",
            },
            {
              name: "Carlo Polisena",
              role: "VP of Corporate Relations",
              email: "polisena.6@osu.edu",
            },
            {
              name: "Gabby Raney",
              role: "VP of Operations",
              email: "raney.51@osu.edu",
            },
            {
              name: "Katie Dunn",
              role: "VP of Marketing",
              email: "dunn.973@osu.edu",
            },
            {
              name: "Asha Segall",
              role: "Treasurer",
              email: "segall.22@osu.edu",
            },
            {
              name: "Russel Heiser",
              role: "VP of Technology",
              email: "heiser.75@osu.edu",
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
