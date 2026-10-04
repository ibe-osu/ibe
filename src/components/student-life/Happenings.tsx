import { Box, Button, Container, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CollectionsIcon from "@mui/icons-material/Collections";
import Image from "next/image";
import Reveal from "@/components/general/Reveal";
import {
  getInstagramPosts,
  INSTAGRAM_PROFILE_URL,
  type InstagramPost,
} from "@/lib/instagram";

interface Tile {
  key: string;
  href: string;
  imageUrl: string;
  alt: string;
  date?: string;
  caption?: string;
  mediaType?: InstagramPost["mediaType"];
}

/**
 * Shown when the live feed is unavailable — no token locally or in CI, an
 * expired token, or Instagram being down. Real cohort photos, so the section
 * never renders empty.
 */
const fallbackTiles: Tile[] = [
  {
    url: "/happenings/11-25-date-party-1.jpeg",
    alt: "IBE students at the fall 2025 date party",
  },
  {
    url: "/happenings/cleveland-2.jpeg",
    alt: "IBE students on the Cleveland trek",
  },
  {
    url: "/happenings/11-25-date-party-2.jpeg",
    alt: "IBE students at the fall 2025 date party",
  },
  {
    url: "/happenings/cleveland-3.jpeg",
    alt: "IBE students on the Cleveland trek",
  },
  {
    url: "/happenings/11-25-date-party-3.jpeg",
    alt: "IBE students at the fall 2025 date party",
  },
  {
    url: "/happenings/cleveland-4.jpeg",
    alt: "IBE students on the Cleveland trek",
  },
].map(({ url, alt }) => ({
  key: url,
  href: INSTAGRAM_PROFILE_URL,
  imageUrl: url,
  alt,
}));

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

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
    mediaType: post.mediaType,
  };
}

const mediaTypeIcon: Partial<
  Record<InstagramPost["mediaType"], typeof PlayArrowIcon>
> = {
  VIDEO: PlayArrowIcon,
  CAROUSEL_ALBUM: CollectionsIcon,
};

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
          <Box
            component="a"
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            @ohiostateibe
          </Box>{" "}
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
          {tiles.map((tile) => {
            const TypeIcon = tile.mediaType && mediaTypeIcon[tile.mediaType];

            return (
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
                  "&:focus-visible": {
                    outline: "2px solid #ba0c2f",
                    outlineOffset: "3px",
                  },
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
                  {TypeIcon && (
                    <TypeIcon
                      aria-hidden
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "#fff",
                        fontSize: "1.5rem",
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))",
                      }}
                    />
                  )}
                </Box>

                {tile.date && (
                  <Typography
                    variant="body2"
                    component="p"
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
            );
          })}
        </Reveal>

        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 6 } }}>
          <Button
            component="a"
            href={INSTAGRAM_PROFILE_URL}
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
