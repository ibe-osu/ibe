import { Box, Container, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import { SPONSORS } from "@/data/sponsors";
import Reveal from "@/components/general/Reveal";

export default function Sponsors() {
  return (
    <Box
      component="section"
      aria-label="Program sponsors"
      sx={{
        py: { xs: 6, md: 9 },
        backgroundColor: "#fff",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 2,
            alignItems: "end",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography variant="h2" sx={{ maxWidth: "10ch" }}>
            Program Sponsors
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "52ch",
              fontSize: { md: "1.125rem" },
            }}
          >
            Industry partners who invest in the next generation of business and
            engineering leaders.
          </Typography>
        </Box>

        {/* Ruled logo wall: 1px gaps over the divider color draw the
            hairlines; logos rest muted and take full color on hover. */}
        <Reveal
          variant="stagger"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            },
            gap: "1px",
            backgroundColor: "divider",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {SPONSORS.map((sponsor) => (
            <Box
              key={sponsor.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                minHeight: { xs: "6.5rem", md: "8rem" },
                px: 3,
                py: 2.5,
                "& img": {
                  filter: "grayscale(1)",
                  opacity: 0.6,
                  transition:
                    "filter 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                },
                "&:hover img": {
                  filter: "none",
                  opacity: 1,
                },
              }}
            >
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                width={150}
                height={80}
                style={{
                  maxWidth: "140px",
                  maxHeight: "64px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
          {/* Filler cell keeps the ruled grid rectangular and doubles as a
              partnership invitation. */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              minHeight: { xs: "6.5rem", md: "8rem" },
              px: 3,
              py: 2.5,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Interested in sponsoring?{" "}
              <MuiLink
                href="mailto:cheng.2066@osu.edu"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  "&:hover": { color: "primary.dark" },
                }}
              >
                Partner with IBE
              </MuiLink>
            </Typography>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
