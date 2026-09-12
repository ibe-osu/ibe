import { Box, Container, Typography } from "@mui/material";
import SpeakerCarousel from "./SpeakerCarousel";
import { Speaker } from "./SpeakerCard";

const speakers: Speaker[] = [
  {
    name: "Bill Baumel",
    position: "Managing Director at Ohio Innovation Fund",
    company: "Ohio Innovation Fund",
    bio: "Bill brought his 20+ years experience in venture funding to our first-year students, providing advice to them for their Freshman Cornerstone Project.",
    imageUrl: "/people/billbaumel.jpeg",
  },
  {
    name: "Dr. Renee Eveland",
    position: "Technology Manager at NASA",
    company: "NASA",
    bio: "Dr. Eveland supports the Technology Transfer Office at the NASA Glenn Research Center, looking for opportunities to license GRC technology to parties interested in finding terrestrial commercial applications for GRC inventions.",
    imageUrl: "/people/reneeeveland.jpg",
  },
  {
    name: "Joel Rathburn",
    position: "Partner at Edgewater Capital",
    company: "Edgewater Capital",
    bio: "Joel worked his way to the Senior VP of Mergers & Acquisitions at Avient, a global company with many finance and Engineering opportunities. Joel has been sharing insights and tips on how to navigate education and career paths successfully.",
    imageUrl: "/people/joelrathbun.jpg",
  },
  {
    name: "Melinda Gloriosa",
    position: "Managing Director at Rev1 Ventures",
    company: "Rev1 Ventures",
    bio: "Melinda accelerates innovation by connecting entrepreneurs with capital and resources to build high-growth tech companies, supporting early-stage founders through a startup studio and strategic partnerships.",
    imageUrl: "/people/melindagloriosa.jpeg",
  },
  {
    name: "Thomas Millea",
    position: "Partner at AMEND Consulting",
    company: "AMEND",
    bio: "Thomas works with large enterprise and upper middle market clients to create lasting business transformation, specializing in business process improvement, technology and operational strategy development, and change management.",
    imageUrl: "/people/thomasmillea.jpeg",
  },
  {
    name: "Zach Whittington",
    position: "Manager of Supply Planning at Advanced Drainage Systems",
    company: "Advanced Drainage Systems",
    bio: "Zack is responsible for production and inventory planning across the US & Canada (35 plants & 30 yards). He has lead and enhanced the value of the supply side S&OP process.",
    imageUrl: "/people/zachwhittington.jpeg",
  },
];

export default function KeynoteSpeakers() {
  return (
    <Box
      component="section"
      aria-labelledby="keynote-speakers"
      sx={{
        py: { xs: 7, md: 11 },
        backgroundColor: "#f9f6f6",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 2,
            alignItems: "end",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            id="keynote-speakers"
            sx={{ maxWidth: "12ch" }}
          >
            Recent Keynote Speakers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "52ch",
              fontSize: { md: "1.125rem" },
            }}
          >
            Industry leaders and entrepreneurs regularly join IBE keynote events
            to share insights with the cohort.
          </Typography>
        </Box>
        <SpeakerCarousel speakers={speakers} />
      </Container>
    </Box>
  );
}
