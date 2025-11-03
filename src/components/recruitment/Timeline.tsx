import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TimelineIllustration() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 10 } }}>
      <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h2">
          Application Timeline
        </Typography>
      </Box>
      <Box component="picture" sx={{ display: "block", mx: "auto", maxWidth: 1400 }}>
        <source media="(max-width:600px)" srcSet="/recruitment/verticalTimeline.svg" />
        <Box
          component="img"
          src="/recruitment/timeline.svg"
          alt="Application Timeline"
          sx={{ display: "block", width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}
