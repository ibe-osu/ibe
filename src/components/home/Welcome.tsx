import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Wrap from "@/components/ui/Wrap";
import Chip from "@/components/ui/Chip";
import PhotoPanel from "@/components/ui/PhotoPanel";
import HeroAtmosphere from "./HeroAtmosphere";
import welcomeImg from "../../../public/welcome.jpeg";

export default function Welcome() {
  return (
    <Box component="section" aria-label="Welcome" sx={{ position: "relative", pt: { xs: 3, md: 6 } }}>
      <HeroAtmosphere />
      <Wrap sx={{ position: "relative", zIndex: 1, display: "grid", gap: { xs: 4, md: 5 } }}>
        <Box className="rise" sx={{ display: "grid", gap: 2.5, justifyItems: "center", textAlign: "center" }}>
          <Chip>Fisher College of Business · College of Engineering</Chip>
          <Typography variant="h1" sx={{ maxWidth: "20ch" }}>
            Integrated Business{" "}
            <Box component="span" sx={{ color: "signal.main" }}>
              &amp;
            </Box>{" "}
            Engineering Honors Program
          </Typography>
          <Typography
            component="p"
            sx={{ color: "text.secondary", maxWidth: "54ch", fontSize: { xs: "1.0625rem", md: "1.2rem" }, lineHeight: 1.55 }}
          >
            The Ohio State University&apos;s premier interdisciplinary academic program. Seventy-two students, two
            tracks, four years, and a 100% placement record.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Button component={Link} href="/recruitment" size="large" sx={{ px: 2.5 }}>
              Join the Program
            </Button>
            <Button
              component={Link}
              href="/about"
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem !important" }} />}
              sx={{ px: 2.25 }}
            >
              Meet the Community
            </Button>
          </Stack>
        </Box>

        <PhotoPanel
          image={welcomeImg}
          alt="IBE Honors Program students gathered on Ohio State's campus"
          tag="Cohort · Columbus, Ohio"
          objectPosition="center 35%"
          priority
          settle
        />
      </Wrap>
    </Box>
  );
}
