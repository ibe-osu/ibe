import theme from "@/theme/theme";
import { Box, Typography } from "@mui/material";
import SpeakerCarousel from "./SpeakerCarousel";
import { Speaker } from "./SpeakerCard";

// Keynote Speakers Data
const speakers: Speaker[] = [
  {
    name: "Speaker Name 1",
    position: "Managing Director at Company",
    company: "Company Name",
    bio: "Brief bio about the speaker's experience and what they shared with IBE students during their keynote presentation.",
    imageUrl: "/speakers/speaker-1.jpg",
  },
  {
    name: "Speaker Name 2",
    position: "CEO at Innovation Firm",
    company: "Innovation Firm",
    bio: "Description of the speaker's background and insights they provided to IBE students.",
    imageUrl: "/speakers/speaker-2.jpg",
  },
  {
    name: "Speaker Name 3",
    position: "VP of Strategy at Tech Corp",
    company: "Tech Corp",
    bio: "Overview of the speaker's career and key takeaways from their talk with IBE students.",
    imageUrl: "/speakers/speaker-3.jpg",
  },
  {
    name: "Speaker Name 4",
    position: "Entrepreneur & Investor",
    company: "Venture Capital",
    bio: "Summary of the speaker's entrepreneurial journey and advice shared with IBE students.",
    imageUrl: "/speakers/speaker-4.jpg",
  },
  {
    name: "Speaker Name 5",
    position: "Chief Innovation Officer",
    company: "Fortune 500",
    bio: "Details about the speaker's role and valuable insights provided to IBE students.",
    imageUrl: "/speakers/speaker-5.jpg",
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
        backgroundColor: theme.palette.grey[200],
        // borderTop: `4px solid ${theme.palette.primary.main}`,
        // borderBottom: `4px solid ${theme.palette.primary.main}`,
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
          pl: { xs: 3, md: 12 },
          pr: { xs: 3, md: 0 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "35%" },
            display: "flex",
            alignItems: "center",
            px: { xs: 2, md: 4 },
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
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
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
          px: { xs: 3, md: 6 },
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
