import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { SPONSORS } from "@/data/sponsors";

export default function Sponsors() {
  return (
    <Box
      component="section"
      aria-labelledby="sponsors-heading"
      sx={{
        backgroundColor: "grey.100",
        py: { xs: "4rem", md: "5.5rem" },
        px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
      }}
    >
      <Box sx={{ maxWidth: "1280px", mx: "auto", textAlign: "center" }}>
        <Typography
          id="sponsors-heading"
          variant="h3"
          component="h2"
          sx={{ mb: "1rem" }}
        >
          Program Sponsors
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "primary.main",
            mx: "auto",
            mb: { xs: "2rem", md: "3rem" },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: { xs: "2.5rem", md: "4rem" },
            rowGap: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {SPONSORS.map((sponsor) => (
            <Box
              key={sponsor.name}
              sx={{
                display: "flex",
                alignItems: "center",
                filter: "grayscale(1)",
                opacity: 0.65,
                transition: "filter 0.25s ease, opacity 0.25s ease",
                "&:hover": {
                  filter: "grayscale(0)",
                  opacity: 1,
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
              }}
            >
              <Image
                src={sponsor.logoUrl}
                alt={sponsor.name}
                width={150}
                height={100}
                style={{
                  maxWidth: "150px",
                  maxHeight: "100px",
                  width: "auto",
                  height: "auto",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
