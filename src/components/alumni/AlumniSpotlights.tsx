import { Box, Container, Typography } from "@mui/material";
import SpotlightCard from "./SpotlightCard";

export default function AlumniSpotlights() {
  return (
    <Box
      component="section"
      aria-labelledby="alumni-spotlights"
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
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
              id="alumni-spotlights"
              sx={{ color: "#fff", maxWidth: "10ch" }}
            >
              Alumni Spotlights
            </Typography>
          </Box>

          <Box>
            <SpotlightCard
              name="Andrew Topinka"
              graduationYear={18}
              major="Finance"
              minors={["Engineering", "Philosophy"]}
              currentPosition="Senior Manager, Strategy Consulting"
              currentCompany="Cherry Bekaert"
              spotlightText="When asked about applying knowledge that he gained while in college, Andrew believes that his most valuable courses during college were the freshman year design project and his senior year capstone. These IBE projects were his most beneficial academic experiences, and he believes that they are applicable to real life problem solving which he carried with him to internships and his current job."
              imageUrl="/spotlight/AndrewTopinka.png"
              linkedinUrl="https://www.linkedin.com/in/atopinka"
            />
            <SpotlightCard
              name="Alisa Noll"
              graduationYear={17}
              major="Industrial Engineering"
              minors={["Business"]}
              currentPosition="Senior Product Manager"
              currentCompany="Stripe"
              spotlightText="There were multiple instances during Alisa's time at OSU where she felt she was really applying the skills developed through IBE. However, she notes that the mindset she gained through IBE was as valuable as the hard skills. Specifically, in her consulting internships, she felt she was “approaching complex problems from a more creative mindset.”"
              imageUrl="/spotlight/AlisaNoll.png"
              linkedinUrl="https://www.linkedin.com/in/alisa-noll/"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
