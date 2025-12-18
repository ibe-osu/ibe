import { Box, Typography } from "@mui/material";
import SpeakerCarousel from "./SpeakerCarousel";
import { Speaker } from "./SpeakerCard";

// Keynote Speakers Data
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
    // Full-width background that inherits the page margin hack from the hero to
    // guarantee the keynote section shares the same edge-to-edge treatment.
    // This component absorbs leftover height to fill the viewport even when the carousel is still under construction.
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        left: "50%",
        width: "100vw",
        ml: "-50vw",
        mr: "-50vw",
        backgroundColor: "grey.200",
        // borderTop: "4px solid",
        // borderTopColor: "primary.main",
        // borderBottom: "4px solid",
        // borderBottomColor: "primary.main",
        pt: { xs: 4, md: 5 },
        pb: { xs: 4, md: 5 },
        minHeight: "calc(100vh - 64px - 400px)", // Subtract header height and approximate StudentLife height
        flexGrow: 1,
      }}
    >
      {/* Inner container stays centered so the speaker content aligns with the rest of the site grid. */}
      {/* Header band now runs full-bleed to align with hero edges, matching the mock. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
          alignItems: "stretch",
          justifyContent: "space-between",
          pl: { xs: 0, md: 12 },
          pr: { xs: 0, md: 0 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "35%" },
            display: "flex",
            alignItems: "center",
            px: { xs: 5, md: 4 },
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            IBE students attend keynote events where industry leaders and
            entrepreneurs share valuable insights.
          </Typography>
        </Box>
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "65%" },
            backgroundColor: "primary.main",
            color: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", letterSpacing: 1.5 }}
          >
            Recent Keynote Speakers:
          </Typography>
        </Box>
      </Box>

      {/* Speaker Carousel */}
      <Box
        sx={{
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
          px: { xs: 0.5, md: 6 },
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <SpeakerCarousel speakers={speakers} />
      </Box>
    </Box>
  );
}
