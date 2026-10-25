import { Box, Button, Container, Grid, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Image from "next/image";
import Reveal from "@/components/general/Reveal";
import { EYEBROW_TYPOGRAPHY, serif } from "@/theme/theme";
import podium from "../../../public/news/groundbreaking-abigail-podium.jpg";
import ceremony from "../../../public/news/groundbreaking-ceremony.jpg";

// The homepage's one featured story. Swap this object (and the two photos in
// public/news/) when there's a newer moment worth leading with.
const story = {
  eyebrow: "IBE in the News",
  headline:
    "Abigail Theobald speaks at the Timashev Technology Tower groundbreaking",
  body: "When Ohio State broke ground on the newest building in its Innovation District on Oct. 20, 2026, fourth-year biomedical engineering student and IBE member Abigail Theobald took the podium, sharing the stage with President Ravi V. Bellamkonda, Lt. Gov. Jim Tressel and donor Ratmir Timashev.",
  quote:
    "At Ohio State, I haven’t had to choose among business, engineering, medicine or software.",
  quoteBy: "Abigail Theobald",
  link: "https://news.osu.edu/ohio-state-holds-groundbreaking-ceremony-for-timashev-technology-tower/",
  linkLabel: "Read the Ohio State News story",
};

export default function FeaturedStory() {
  return (
    <Box
      component="section"
      aria-labelledby="featured-story-heading"
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.tint" }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, lg: 8 }} alignItems="center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Reveal variant="scale">
              {/* Leaves room under the podium shot for the inset on desktop. */}
              <Box sx={{ position: "relative", pb: { md: "12%" } }}>
                <Box sx={{ position: "relative", aspectRatio: "3 / 2" }}>
                  <Image
                    src={podium}
                    alt="Abigail Theobald speaking at a podium at the Timashev Technology Tower groundbreaking"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1200px) 760px, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    position: "absolute",
                    right: { md: -16, lg: -32 },
                    bottom: 0,
                    width: "42%",
                    aspectRatio: "3 / 2",
                    border: "6px solid",
                    borderColor: "background.tint",
                  }}
                >
                  <Image
                    src={ceremony}
                    alt="Abigail Theobald with university leaders holding ceremonial shovels at the groundbreaking"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1200px) 360px, (min-width: 900px) 42vw, 0px"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Reveal
              variant="stagger"
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <Typography
                component="p"
                sx={{
                  ...EYEBROW_TYPOGRAPHY,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {story.eyebrow}
              </Typography>
              <Typography
                id="featured-story-heading"
                variant="h3"
                component="h2"
              >
                {story.headline}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", maxWidth: "65ch" }}
              >
                {story.body}
              </Typography>
              <Box
                component="blockquote"
                sx={{
                  m: 0,
                  py: 2.5,
                  borderTop: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontFamily: serif,
                    fontSize: { xs: "1.2rem", md: "1.35rem" },
                    lineHeight: 1.4,
                  }}
                >
                  &ldquo;{story.quote}&rdquo;
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1, fontWeight: 600 }}
                >
                  {story.quoteBy}
                </Typography>
              </Box>
              <Box>
                <Button
                  component="a"
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon />}
                >
                  {story.linkLabel}
                </Button>
              </Box>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
