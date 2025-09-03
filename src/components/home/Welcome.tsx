import { alpha } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import theme from "@/theme/theme";

export default function Welcome() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)", // Adjust for header height
        overflow: "hidden",
      }}
    >
      <Image
        src="/welcome.png"
        alt="Welcome"
        width={1920}
        height={947}
        style={{
          objectFit: "cover",
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
            color: theme.palette.secondary.main,
            textAlign: "center",
            // marginBottom: 2, // Add spacing between elements
          }}
        >
          Welcome to IBE
        </Typography>
        <Box sx={{ width: { xs: "85%", sm: "50%" } }}>
          <Box
            sx={{
              height: "0.25rem",
              backgroundColor: theme.palette.secondary.main,
              marginTop: "0.5rem", // Add spacing above the line
              marginBottom: "1rem", // Add spacing below the line
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.secondary.main,
              textAlign: "center",
              padding: { xl: "0 2rem", lg: "0 1rem", md: "0" }, // Add horizontal padding for better readability
            }}
          >
            The Ohio State University&apos;s premier interdisciplinary academic
            program
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
