import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Ref } from "react";

interface InfoCardProps {
  header: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  bandColor?: string;
  bandRef?: Ref<HTMLDivElement>;
}

export default function InfoCard({
  header,
  description,
  imageSrc,
  imageAlt = "",
  bandColor = "primary.main",
  bandRef,
}: InfoCardProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "common.white",
          p: 2,
          display: "flex",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            aspectRatio: "4/3",
            position: "relative",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || header}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:600px) 100vw, 320px"
          />
        </Box>
      </Box>
      <Box
        ref={bandRef}
        sx={{
          bgcolor: bandColor,
          color: "common.white",
          textAlign: "center",
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: { xs: 140, sm: 140, md: 160 },
          flex: "0 0 auto",
        }}
      >
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
