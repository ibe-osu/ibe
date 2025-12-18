import theme from "@/theme/theme";
import { alpha, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function AboutUs() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(70vh - 64px)", // Adjust for header height
        overflow: "hidden",
      }}
    >
      <Image
        src="/alumni.jpg"
        alt="Alumni"
        priority
        width={1920}
        height={540}
        style={{
          objectFit: "cover",
          objectPosition: "top",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: alpha(theme.palette.primary.main, 0.4), // Red shade with transparency
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "secondary.main",
            textAlign: "center",
            // marginBottom: 2, // Add spacing between elements
          }}
        >
          Our IBE Alumni
        </Typography>
      </Box>
    </Box>
  );
}
