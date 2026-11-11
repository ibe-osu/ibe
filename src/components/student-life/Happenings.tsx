import { Box, Button, Container, Link, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CollectionsIcon from "@mui/icons-material/Collections";
import Image from "next/image";
import Reveal from "@/components/general/Reveal";
import { getInstagramPosts, type InstagramPost } from "@/lib/instagram";
import { INSTAGRAM_URL } from "@/data/social";

interface Tile {
  key: string;
  href: string;
  imageUrl: string;
  alt: string;
  date?: string;
  caption?: string;
  /** Corner badge marking videos and carousels. */
  Icon?: typeof PlayArrowIcon;
}

/**
 * Shown when the live feed is unavailable — no token locally or in CI, an
 * expired token, or Instagram being down. Real cohort photos, so the section
 * never renders empty.
 */
const DATE_PARTY_ALT = "IBE students at the fall 2025 date party";
const CLEVELAND_ALT = "IBE students on the Cleveland trek";

const fallbackTiles: Tile[] = [
  ["11-25-date-party-1.jpeg", DATE_PARTY_ALT],
  ["cleveland-2.jpeg", CLEVELAND_ALT],
  ["11-25-date-party-2.jpeg", DATE_PARTY_ALT],
  ["cleveland-3.jpeg", CLEVELAND_ALT],
  ["11-25-date-party-3.jpeg", DATE_PARTY_ALT],
  ["cleveland-4.jpeg", CLEVELAND_ALT],
].map(([file, alt]) => ({
  key: file,
  href: INSTAGRAM_URL,
  imageUrl: `/happenings/${file}`,
  alt,
}));

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

const mediaTypeIcon: Partial<
  Record<InstagramPost["mediaType"], typeof PlayArrowIcon>
> = {
  VIDEO: PlayArrowIcon,
  CAROUSEL_ALBUM: CollectionsIcon,
};

function toTile(post: InstagramPost): Tile {
  const caption = post.caption.replace(/\s+/g, " ").trim();
  return {
    key: post.id,
    href: post.permalink,
    imageUrl: post.imageUrl,
    // The caption is rendered as text right under the image, so repeating
    // it as alt text would make screen readers read it twice.
    alt: caption ? "" : "Photo from IBE's Instagram",
    date: dateFormat.format(new Date(post.timestamp)),
    caption,
    Icon: mediaTypeIcon[post.mediaType],
  };
}

export default async function Happenings() {
  const posts = await getInstagramPosts();
  const tiles = posts ? posts.map(toTile) : fallbackTiles;

  return (
    <Box component="section" sx={{ backgroundColor: "background.paper" }}>
      {/* Header Banner */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "secondary.main",
          py: { xs: 3, md: 4 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h2">
          IBE Happenings
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            maxWidth: "58ch",
            mx: "auto",
            mb: { xs: 4, md: 5 },
          }}
        >
          Treks, socials, and everything in between — the latest from{" "}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            @ohiostateibe
          </Link>{" "}
          on Instagram.
        </Typography>

        <Reveal
          variant="stagger"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            columnGap: { xs: 2, md: 3 },
            rowGap: { xs: 3, md: 4 },
          }}
        >
          {tiles.map(({ Icon, ...tile }) => (
            <Box
              key={tile.key}
              component="a"
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "block",
                color: "inherit",
                textDecoration: "none",
                "@media (prefers-reduced-motion: no-preference)": {
                  "&:hover .ig-image": { transform: "scale(1.03)" },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  // Instagram's own grid crops to 4:5 portrait; matching it
                  // keeps posts framed the way they were composed.
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  backgroundColor: "grey.100",
                }}
              >
                <Image
                  src={tile.imageUrl}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 900px) 380px, 50vw"
                  className="ig-image"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
                {Icon && (
                  <Icon
                    aria-hidden
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "common.white",
                      fontSize: "1.5rem",
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))",
                    }}
                  />
                )}
              </Box>

              {tile.date && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1.5,
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  {tile.date}
                </Typography>
              )}
              {tile.caption && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    color: "text.primary",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: { xs: 2, md: 3 },
                    overflow: "hidden",
                  }}
                >
                  {tile.caption}
                </Typography>
              )}
            </Box>
          ))}
        </Reveal>

        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 6 } }}>
          <Button
            component="a"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<InstagramIcon />}
          >
            Follow @ohiostateibe
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
