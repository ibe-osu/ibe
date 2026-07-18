import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TimelineIllustration() {
  return (
    <Box sx={{ py: 0, px: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h2">
          Application Timeline
        </Typography>
      </Box>
      <picture>
        <source
          media="(max-width:800px)"
          srcSet="/recruitment/verticalTimeline.svg"
        />
        <img
          src="/recruitment/timeline.svg"
          alt="IBE application timeline: honors acceptance in January, application invitations in waves, admission offers from early March, and the April 3 application deadline"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </picture>
    </Box>
  );
}
