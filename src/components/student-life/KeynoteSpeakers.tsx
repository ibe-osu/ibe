import theme from "@/theme/theme";
import { Box, Typography } from "@mui/material";

export default function KeynoteSpeakers() {
  return (
    // Full-width background that inherits the page margin hack from the hero to
    // guarantee the keynote section shares the same edge-to-edge treatment.
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
        borderTop: `4px solid ${theme.palette.primary.main}`,
        borderBottom: `4px solid ${theme.palette.primary.main}`,
        py: { xs: 6, md: 8 },
        minHeight: "100%",
      }}
    >
      {/* Inner container stays centered so the speaker content aligns with the rest of the site grid. */}
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          px: { xs: 3, md: 6 },
          flexGrow: 1,
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Keynote content goes here
        </Typography>
      </Box>
    </Box>
  );
}
