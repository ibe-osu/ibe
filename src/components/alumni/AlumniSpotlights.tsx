import { Box, Typography } from "@mui/material";
import SpotlightCard from "./SpotlightCard";
import Reveal from "@/components/general/Reveal";

export default function AlumniSpotlights() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "primary.main",
        py: { xs: 6, md: 8 },
        px: { xs: "1rem", sm: "15%", md: "2rem", lg: "8rem", xl: "14rem" },
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{ color: "secondary.main", textAlign: "center" }}
      >
        Alumni Spotlights
      </Typography>
      <Reveal
        variant="stagger"
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "2rem",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
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
          spotlightText="There were multiple instances during Alisa's time at OSU where she felt she was really applying the skills developed through IBE. However, she notes that the mindset she gained through IBE was as valuable as the hard skills. Specifically, in her consulting internships, she felt she was “approaching complex problems from a more creative mindset.” "
          imageUrl="/spotlight/AlisaNoll.png"
          linkedinUrl="https://www.linkedin.com/in/alisa-noll/"
        />
      </Reveal>
    </Box>
  );
}
