import { Box, Container, Typography } from "@mui/material";
import IndividualCard from "./IndividualCard";
import Reveal from "@/components/general/Reveal";

const PEOPLE = [
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
];

export default function SeniorLeadership() {
  return (
    <Box
      component="section"
      aria-labelledby="senior-leadership"
      sx={{ py: { xs: 7, md: 11 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 4,
            alignItems: "start",
          }}
        >
          <Box sx={{ position: { md: "sticky" }, top: { md: 104 } }}>
            <Typography
              variant="h2"
              id="senior-leadership"
              sx={{ maxWidth: "10ch" }}
            >
              Senior Leadership
            </Typography>
          </Box>

          <Reveal
            variant="stagger"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
              },
              columnGap: { xs: 2.5, md: 4 },
              rowGap: { xs: 4, md: 5 },
            }}
          >
            {PEOPLE.map((person) => (
              <IndividualCard key={person.email} {...person} />
            ))}
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
