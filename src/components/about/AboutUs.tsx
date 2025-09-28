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
        height: "calc(80vh - 64px)", // Adjust for header height
        overflow: "hidden",
      }}
    >
      <Image
        src="/about.png"
        alt="About Us"
        width={1920}
        height={947}
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
          About Us
        </Typography>
        <Typography
          variant="h6"
          sx={{
            width: { xs: "85%", sm: "65%" },
            color: "secondary.main",
            textAlign: "center",
            padding: { xl: "0 2rem", lg: "0 1rem", md: "0" }, // Add horizontal padding for better readability
          }}
        >
          We are the Integrated Business and Engineering (IBE) Honors Program at
          Ohio State — a tight-knit community of students who bridge business
          and engineering to solve real-world problems. United by curiosity and
          a drive to lead, we learn by doing and grow together as innovators and
          collaborators.
        </Typography>
      </Box>
    </Box>
  );
}
