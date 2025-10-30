import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

interface InfoCardProps {
  header: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  bandColor?: string;
}

export default function InfoCard({
  header,
  description,
  imageSrc,
  imageAlt = "",
  // default to the theme primary color (red) so recruitment cards show the red band
  bandColor = "primary.main",
}: InfoCardProps) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "20rem", md: "22rem" },
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      {/* White square image area */}
      <Box sx={{ bgcolor: "common.white", p: 2, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 420, aspectRatio: "4/3", position: "relative" }}>
          <Image
            src={imageSrc}
            alt={imageAlt || header}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:600px) 100vw, 320px"
          />
        </Box>
      </Box>

      {/* Colored band with header + description */}
      <Box sx={{ bgcolor: bandColor, color: "common.white", textAlign: "center", p: 3 }}>
        <Typography
          variant="h4"
          component="h3"
          sx={{ fontWeight: 500, letterSpacing: 0.2, mb: 1 }}
        >
          {header}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5, lineHeight: 1.45 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
