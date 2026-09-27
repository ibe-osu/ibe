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
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Program Sponsors
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: { xs: 4, md: 5 },
            mx: "auto",
            maxWidth: "55ch",
          }}
        >
          Industry partners who invest in the next generation of business and
          engineering leaders.
        </Typography>

        {/* Ruled logo wall: 1px gaps over the divider color draw the
            hairlines; logos rest muted and take full color on hover. */}
        <Reveal
          variant="stagger"
          sx={{
            display: "grid",
            // minmax(0, 1fr), not 1fr: a bare 1fr can't shrink below the
            // logo's intrinsic width, so two columns of 140px logos plus
            // padding overflowed a 375px phone and the right column clipped.
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: "1px",
            backgroundColor: "divider",
            border: "1px solid",
            borderColor: "divider",
            maxWidth: "56rem",
            mx: "auto",
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
                px: { xs: 2, md: 3 },
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
                  maxWidth: "min(140px, 100%)",
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
