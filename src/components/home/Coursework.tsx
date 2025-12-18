import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function Coursework() {
  return (
    <Box
      sx={{
        pt: "0rem",
        pb: "3rem",
        px: { xs: "1rem", sm: "4rem" },
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ pb: { xs: "0rem", lg: "1rem" } }}>
        IBE Coursework:
      </Typography>

      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ pt: "0.5rem" }}
      >
        {/* Left: coursework image */}
        <Grid>
          <picture>
            <source
              media="(max-width:800px)"
              srcSet="/coursework/coursework-vertical.svg"
              sizes="(max-width: 800px) 100vw, 700px" // Adjusted size for vertical image
            />
            <Image
              src="/coursework/coursework.svg"
              alt="IBE Coursework"
              width={700}
              height={300}
              style={{ maxWidth: "100%", height: "auto" }} // Ensure normal image sizing remains responsive
            />
          </picture>
        </Grid>

        {/* Right: coursework text */}
        <Grid
          sx={{
            textAlign: { xs: "center", lg: "left" },
            maxWidth: "400px",
          }}
        >
          <Box sx={{ mb: "1rem" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              IBE:
            </Typography>
            <Typography variant="body1">
              <strong>Engineering Majors</strong> - Business Minor
            </Typography>
            <Typography variant="body1">
              <strong>Business Majors</strong> - Engineering Sciences Minor
            </Typography>
          </Box>

          <Box sx={{ mt: "1rem" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              IBE-SI:
            </Typography>
            <Typography variant="body1">
              <strong>Computer Science Engineering (CSE) Majors</strong> -
              Business Minor
            </Typography>
            <Typography variant="body1">
              <strong>Business and Non-CSE</strong> - Computer Science Minor
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
