import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Wrap from "@/components/ui/Wrap";

export default function JoinBand() {
  return (
    <Box component="section" aria-labelledby="join-band" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap>
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "primary.main",
            color: "#fff",
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 7 },
            display: "grid",
            gap: 2,
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" id="join-band" sx={{ color: "#fff", maxWidth: "16ch" }}>
            Join the next IBE cohort.
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", maxWidth: "52ch", fontSize: { md: "1.125rem" } }}>
            Open to Ohio State Honors students in Fisher and Engineering. Invitations to apply are emailed in waves
            starting in January; the interest form gets you program information, virtual information sessions, and
            deadline reminders.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1, width: { xs: "100%", sm: "auto" } }}>
            <Button
              component={Link}
              href="/recruitment"
              size="large"
              sx={{ backgroundColor: "#fff", color: "primary.main", "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" } }}
            >
              How to Apply
            </Button>
            <Button
              component="a"
              href="https://forms.gle/hbkbG9sRqqBhPeag8"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              endIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem !important" }} />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                backgroundColor: "transparent",
                "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              IBE Interest Form
            </Button>
          </Stack>
        </Box>
      </Wrap>
    </Box>
  );
}
