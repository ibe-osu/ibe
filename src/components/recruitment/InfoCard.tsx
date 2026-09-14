import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface InfoCardProps {
  header: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
  cta: string;
}

/** One "Keep exploring" panel: photo, title, blurb, link. The whole panel is the link. */
export default function InfoCard({ header, description, imageSrc, imageAlt = "", href, cta }: InfoCardProps) {
  const isInternal = href.startsWith("/");

  return (
    <Box
      component={isInternal ? Link : "a"}
      href={href}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "background.paper",
        transition: "border-color 0.2s cubic-bezier(0.25,1,0.5,1), transform 0.2s cubic-bezier(0.25,1,0.5,1)",
        "&:hover": { borderColor: "text.disabled", transform: "translateY(-2px)" },
        "&:hover img": { transform: "scale(1.03)" },
        "&:hover [data-cta] svg": { transform: "translateX(4px)" },
        "&:focus-visible": { outline: "2px solid", outlineColor: "signal.main", outlineOffset: 2 },
        "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "3 / 2", overflow: "hidden", backgroundColor: "background.panel", borderBottom: "1px solid", borderColor: "divider" }}>
        <Image
          src={imageSrc}
          alt={imageAlt || header}
          fill
          sizes="(max-width: 600px) 100vw, 360px"
          style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </Box>
      <Box sx={{ p: { xs: 2.5, md: 3 }, display: "grid", gap: 1, flex: 1, alignContent: "start" }}>
        <Typography variant="h3" component="h3">
          {header}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
        <Typography
          component="span"
          data-cta
          variant="body2"
          sx={{
            mt: "auto",
            pt: 1.5,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            fontWeight: 600,
            color: "signal.main",
            "& svg": { fontSize: "1rem", transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" },
          }}
        >
          {cta} <ArrowForwardIcon />
        </Typography>
      </Box>
    </Box>
  );
}
