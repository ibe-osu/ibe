import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  header: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
  cta: string;
}

/**
 * Clickable explore card: the whole card is one link. Hover/focus zooms the
 * photo and pulls the border to scarlet, matching the site's card language.
 */
export default function InfoCard({
  header,
  description,
  imageSrc,
  imageAlt = "",
  href,
  cta,
}: InfoCardProps) {
  const isInternal = href.startsWith("/");

  return (
    <Box
      component={isInternal ? Link : "a"}
      href={href}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "divider",
        transition: "border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        "&:hover, &:focus-visible": {
          borderColor: "primary.main",
        },
        "&:hover img, &:focus-visible img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: "3 / 2",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || header}
          fill
          sizes="(max-width:600px) 100vw, 380px"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </Box>
      <Box
        sx={{ p: { xs: 2.5, md: 3 }, display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
          {header}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{
            mt: "auto",
            pt: 2,
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {cta} →
        </Typography>
      </Box>
    </Box>
  );
}
