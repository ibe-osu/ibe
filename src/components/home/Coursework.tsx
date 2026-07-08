import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH, SECTION_PY } from "@/theme/layout";

interface Track {
  name: string;
  pairings: { major: string; minor: string }[];
}

const TRACKS: Track[] = [
  {
    name: "IBE",
    pairings: [
      { major: "Engineering Majors", minor: "Business Minor" },
      { major: "Business Majors", minor: "Engineering Sciences Minor" },
    ],
  },
  {
    name: "IBE-SI",
    pairings: [
      {
        major: "Computer Science Engineering (CSE) Majors",
        minor: "Business Minor",
      },
      { major: "Business and Non-CSE", minor: "Computer Science Minor" },
    ],
  },
];

export default function Coursework() {
  return (
    <Box
      component="section"
      aria-labelledby="coursework-heading"
      sx={{
        py: SECTION_PY,
        px: PAGE_GUTTER,
      }}
    >
      <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: "auto" }}>
        <Typography
          id="coursework-heading"
          variant="h3"
          component="h2"
          sx={{ mb: "1rem" }}
        >
          IBE Coursework
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "primary.main",
            mb: { xs: "2rem", md: "3rem" },
          }}
        />

        <Grid container spacing={{ xs: 5, lg: 8 }} alignItems="center">
          {/* Left: coursework diagram */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <picture>
              <source
                media="(max-width:800px)"
                srcSet="/coursework/coursework-vertical.svg"
              />
              <Image
                src="/coursework/coursework.svg"
                alt="IBE coursework structure diagram"
                width={700}
                height={300}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </picture>
          </Grid>

          {/* Right: the two tracks, set as an editorial list */}
          <Grid size={{ xs: 12, lg: 5 }}>
            {TRACKS.map((track, i) => (
              <Box key={track.name} sx={{ mt: i === 0 ? 0 : "2.5rem" }}>
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: "var(--font-pt-serif-caption), serif",
                    fontSize: "1.75rem",
                    mb: "0.5rem",
                  }}
                >
                  {track.name}
                </Typography>
                {track.pairings.map((pairing) => (
                  <Box
                    key={pairing.major}
                    sx={{
                      py: "0.875rem",
                      borderTop: "1px solid",
                      borderColor: "grey.300",
                      "&:last-of-type": {
                        borderBottom: "1px solid",
                        borderBottomColor: "grey.300",
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      <strong>{pairing.major}</strong>
                      <Box
                        component="span"
                        sx={{ color: "grey.700", display: "block" }}
                      >
                        {pairing.minor}
                      </Box>
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
