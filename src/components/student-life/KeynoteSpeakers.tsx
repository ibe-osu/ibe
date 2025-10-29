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
        // borderTop: `4px solid ${theme.palette.primary.main}`,
        // borderBottom: `4px solid ${theme.palette.primary.main}`,
        pt: { xs: 4, md: 5 },
        pb: { xs: 4, md: 5 },
        height: "100%",
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

      {/* Inner content area remains centered for the upcoming speaker cards. */}
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          px: { xs: 3, md: 6 },
          flexGrow: 1,
          display: "flex",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            border: `1px dashed ${theme.palette.grey[400]}`,
            minHeight: { xs: 200, md: 320 },
          }}
        />
      </Box>
    </Box>
  );
}
