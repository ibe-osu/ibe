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
        // The footer is also scarlet — without a seam the two sections
        // read as one undifferentiated red mass.
        borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
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
              name: "Katie Dunn",
              role: "President",
              email: "dunn.973@osu.edu",
            },
            {
              name: "Carlo Polisena",
              role: "Executive VP",
              email: "polisena.6@osu.edu",
            },
            {
              name: "Riley Angel",
              role: "VP of Recruitment",
              email: "angel.146@osu.edu",
            },
            {
              name: "Anya Mehta",
              role: "VP of Alumni Relations",
              email: "mehta.684@osu.edu",
            },
            {
              name: "Owen Blevins",
              role: "VP of Membership Development",
              email: "blevins.348@osu.edu",
            },
            {
              name: "Emma Cheng",
              role: "VP of Corporate Relations",
              email: "cheng.2066@osu.edu",
            },
            {
              name: "Devhuti Patel",
              role: "VP of Operations",
              email: "patel.5493@osu.edu",
            },
            {
              name: "Charles Hite",
              role: "VP of Marketing",
              email: "hite.189@osu.edu",
            },
            {
              name: "Asha Segall",
              role: "Treasurer",
              email: "segall.22@osu.edu",
            },
            {
              name: "Yuvraj Atre",
              role: "VP of Technology",
              email: "atre.7@osu.edu",
            },
          ].map((person) => (
            <Grid key={person.email} size={{ xs: 12, sm: 6, md: 4 }}>
              <IndividualCard {...person} accent="white" />
            </Grid>
          ))}
        </Grid>
      </Reveal>
    </Box>
  );
}
