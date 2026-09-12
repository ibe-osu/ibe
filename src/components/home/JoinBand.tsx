import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function JoinBand() {
  return (
    <Box
      component="section"
      aria-labelledby="join-band"
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 4,
            alignItems: "end",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              id="join-band"
              sx={{ color: "#fff", maxWidth: "14ch" }}
            >
              Join the next IBE cohort.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2.5,
                maxWidth: "52ch",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { md: "1.125rem" },
                lineHeight: 1.7,
                letterSpacing: "0.005em",
              }}
            >
              Open to Ohio State Honors students in Fisher and Engineering.
              Invitations to apply are emailed in waves starting in January.
              The interest form gets you program information, virtual
              information sessions, and deadline reminders.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: { md: "flex-end" } }}
          >
            <Button
              component={Link}
              href="/recruitment"
              sx={{
                backgroundColor: "#fff",
                color: "primary.main",
                px: "1.75rem",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
              }}
            >
              How to Apply
            </Button>
            <Button
              component="a"
              href="https://forms.gle/hbkbG9sRqqBhPeag8"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              endIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255, 255, 255, 0.7)",
                px: "1.5rem",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              IBE Interest Form
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
