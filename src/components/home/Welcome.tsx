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
      <picture
        style={{
          display: "block", // Ensure the picture element behaves as a block-level element
          width: "100%", // Fill the width of the parent box
          height: "100%", // Fill the height of the parent box
        }}
      >
        <source
          media="(max-width:800px)"
          srcSet="/welcome-vertical.jpeg"
          sizes="(max-width: 800px) 100vw, 100vh" // Ensure it fills the parent box
        />
        <Image
          src="/welcome.jpeg"
          alt="Welcome"
          width={1920}
          height={1080}
          style={{
            objectFit: "cover", // Ensures the image covers the parent box
            pointerEvents: "none",
            width: "100%", // Fills the width of the parent box
            height: "100%", // Fills the height of the parent box
          }}
        />
      </picture>
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
          pb: { xs: "4.5rem", sm: "0rem" },
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
          Welcome to IBE
        </Typography>
        <Box sx={{ width: { xs: "85%", sm: "50%" } }}>
          <Box
            sx={{
              height: "0.25rem",
              backgroundColor: "secondary.main",
              marginTop: "0.5rem", // Add spacing above the line
              marginBottom: { xs: "5rem", sm: "1rem" }, // Add spacing below the line
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "secondary.main",
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
