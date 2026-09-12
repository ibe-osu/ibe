import { Box, Container, Typography } from "@mui/material";
import IndividualCard from "./IndividualCard";
import Reveal from "@/components/general/Reveal";

const PEOPLE = [
  { name: "Katie Dunn", role: "President", email: "dunn.973@osu.edu" },
  { name: "Carlo Polisena", role: "Executive VP", email: "polisena.6@osu.edu" },
  { name: "Riley Angel", role: "VP of Recruitment", email: "angel.146@osu.edu" },
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
  { name: "Devhuti Patel", role: "VP of Operations", email: "patel.5493@osu.edu" },
  { name: "Charles Hite", role: "VP of Marketing", email: "hite.189@osu.edu" },
  { name: "Asha Segall", role: "Treasurer", email: "segall.22@osu.edu" },
  { name: "Yuvraj Atre", role: "VP of Technology", email: "atre.7@osu.edu" },
];

export default function StudentLeadership() {
  return (
    <Box
      component="section"
      aria-labelledby="student-leadership"
      sx={{
        color: "#fff",
        backgroundColor: "primary.main",
        py: { xs: 7, md: 11 },
      }}
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
              id="student-leadership"
              sx={{ maxWidth: "10ch", color: "#fff" }}
            >
              Student Leadership
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: "34ch",
                color: "rgba(255, 255, 255, 0.86)",
                lineHeight: 1.7,
                letterSpacing: "0.005em",
              }}
            >
              The elected student board behind recruitment, alumni and
              corporate relations, membership, marketing, operations, and
              technology.
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
              rowGap: { xs: 4, md: 6 },
            }}
          >
            {PEOPLE.map((person) => (
              <IndividualCard key={person.email} {...person} accent="white" />
            ))}
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
