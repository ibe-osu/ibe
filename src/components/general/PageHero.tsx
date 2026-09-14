import { Box, Typography } from "@mui/material";
import type { StaticImageData } from "next/image";
import Wrap from "@/components/ui/Wrap";
import Chip from "@/components/ui/Chip";
import PhotoPanel from "@/components/ui/PhotoPanel";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  image: StaticImageData;
  imageAlt: string;
  imageTag?: string;
  objectPosition?: string;
}

/**
 * Page opener: centered title and lede, then the page's photograph in a
 * bordered panel. No scrim, no full-bleed, no entrance choreography beyond
 * a single rise.
 */
export default function PageHero({ title, subtitle, kicker, image, imageAlt, imageTag, objectPosition = "center" }: PageHeroProps) {
  return (
    <Box component="section" sx={{ pt: { xs: 3, md: 6 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 4, md: 5 } }}>
        <Box className="rise" sx={{ display: "grid", gap: 2, justifyItems: "center", textAlign: "center" }}>
          {kicker && <Chip>{kicker}</Chip>}
          <Typography variant="h1" sx={{ maxWidth: "20ch" }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary", maxWidth: "62ch", fontSize: { xs: "1.0625rem", md: "1.2rem" }, lineHeight: 1.55 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <PhotoPanel image={image} alt={imageAlt} tag={imageTag} objectPosition={objectPosition} priority settle />
      </Wrap>
    </Box>
  );
}
