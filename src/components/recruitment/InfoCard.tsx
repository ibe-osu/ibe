import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

/**
 * One entry in the "Keep Exploring" ruled row. The whole entry is a single
 * link; hover/focus eases the photo in and draws the CTA underline.
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
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        py: { xs: 3, md: 4 },
        px: { xs: 0, md: 3 },
        "&:first-of-type": { pl: 0 },
        "&:last-of-type": { pr: 0 },
        "&:hover img, &:focus-visible img": { transform: "scale(1.04)" },
        "&:hover [data-cta]::after, &:focus-visible [data-cta]::after": {
          transform: "scaleX(1)",
        },
        "&:hover [data-cta] svg, &:focus-visible [data-cta] svg": {
          transform: "translateX(4px)",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: "-2px",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: "3 / 2",
          overflow: "hidden",
          backgroundColor: "grey.100",
          mb: 3,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || header}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </Box>
      <Typography variant="h3" component="h3" sx={{ mb: 1.25 }}>
        {header}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", maxWidth: "48ch", textWrap: "pretty" }}
      >
        {description}
      </Typography>
      <Typography
        component="span"
        data-cta
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          width: "fit-content",
          mt: 3,
          fontWeight: 600,
          color: "primary.main",
          "& svg": {
            fontSize: "1.125rem",
            transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -2,
            height: "1.5px",
            backgroundColor: "primary.main",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          },
        }}
      >
        {cta} <ArrowForwardIcon />
      </Typography>
    </Box>
  );
}
