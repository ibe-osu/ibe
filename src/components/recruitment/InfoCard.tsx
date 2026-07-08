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

export default function InfoCard({
  header,
  description,
  imageSrc,
  imageAlt = "",
  href,
  cta,
}: InfoCardProps) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");

  return (
    <Box
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "common.white",
        border: "1px solid",
        borderColor: "grey.300",
        transition: "border-color 200ms ease",
        "&:hover": { borderColor: "grey.500" },
        "&:hover .info-card-image": { transform: "scale(1.03)" },
        "@media (prefers-reduced-motion: reduce)": {
          "&:hover .info-card-image": { transform: "none" },
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "3/2",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || header}
          fill
          className="info-card-image"
          style={{
            objectFit: "cover",
            transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
        />
      </Box>

      <Box
        sx={{
          p: { xs: 3, md: 3.5 },
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography
          component="h3"
          variant="h6"
          sx={{ mb: 1.5, lineHeight: 1.3 }}
        >
          {header}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6, flexGrow: 1 }}
        >
          {description}
        </Typography>

        <Typography
          component={isExternal ? "a" : Link}
          href={href}
          variant="body2"
          sx={{
            mt: 3,
            fontWeight: 600,
            color: "primary.main",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            width: "fit-content",
            "& .info-card-arrow": {
              transition: "transform 200ms ease",
            },
            "&:hover": { textDecoration: "underline" },
            "&:hover .info-card-arrow": { transform: "translateX(3px)" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
            },
            "@media (prefers-reduced-motion: reduce)": {
              "&:hover .info-card-arrow": { transform: "none" },
            },
          }}
        >
          {cta}
          <Box component="span" aria-hidden="true" className="info-card-arrow">
            &rarr;
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
