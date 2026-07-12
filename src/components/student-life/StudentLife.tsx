import { Box, Typography } from "@mui/material";

export default function StudentLifeHeader() {
  return (
    // Full-bleed wrapper: offsetting the container by half the viewport width
    // lets the hero stretch edge-to-edge while the rest of the app stays centered.
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
        left: "50%",
        width: "100vw",
        ml: "-50vw",
        mr: "-50vw",
        border: "4px solid",
        borderColor: "primary.main",
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "60%" },
          backgroundColor: "primary.main",
          color: "secondary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="h2" component="h1" sx={{ textAlign: "center" }}>
          Student Life
        </Typography>
      </Box>
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "40%" },
          backgroundColor: "secondary.main",
          color: "text.primary",
          borderLeft: { md: "4px solid" },
          borderLeftColor: { md: "primary.main" },
          borderTop: { xs: "4px solid", md: "none" },
          borderTopColor: { xs: "primary.main" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4 },
          gap: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.6, textAlign: "center" }}
        >
          IBE fosters a culture of professional growth and meaningful
          connections—ensuring that while we strive for excellence, we also
          build lasting relationships and enjoy the journey along the way.
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.6, textAlign: "center" }}
        >
          Whether it&apos;s program trips, speaker events or socials, see below
          for what our students at IBE are up to!
        </Typography>
      </Box>
    </Box>
  );
}
