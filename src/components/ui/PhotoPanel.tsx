import { Box } from "@mui/material";
import Image, { type StaticImageData } from "next/image";
import { monoFamily } from "@/theme/fonts";

interface PhotoPanelProps {
  image: StaticImageData | string;
  alt: string;
  /** Mono caption pinned to the bottom-left corner. */
  tag?: string;
  objectPosition?: string;
  priority?: boolean;
  aspect?: { xs: string; md: string };
  settle?: boolean;
}

/**
 * A photograph in a bordered panel. The image is requested at the panel's
 * rendered width (never the viewport's), so it stays cheap to load.
 */
export default function PhotoPanel({
  image,
  alt,
  tag,
  objectPosition = "center",
  priority = false,
  aspect = { xs: "4 / 3", md: "21 / 9" },
  settle = false,
}: PhotoPanelProps) {
  return (
    <Box
      className={settle ? "settle" : undefined}
      sx={{
        position: "relative",
        aspectRatio: aspect,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "background.panel",
        boxShadow: "0 1px 0 rgba(18,17,20,0.04), 0 16px 40px -28px rgba(18,17,20,0.4)",
      }}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        quality={70}
        placeholder={typeof image === "string" ? "empty" : "blur"}
        sizes="(max-width: 1200px) 100vw, 1120px"
        style={{ objectFit: "cover", objectPosition }}
      />
      {tag && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            left: 12,
            bottom: 12,
            px: 1.25,
            py: 0.6,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "color-mix(in srgb, var(--mui-palette-background-default) 86%, transparent)",
            backdropFilter: "blur(6px)",
            fontFamily: monoFamily,
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "text.primary",
          }}
        >
          {tag}
        </Box>
      )}
    </Box>
  );
}
