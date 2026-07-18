import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

interface IndividualCardProps {
  name: string;
  role: string;
  email: string;
  /**
   * Explicit photo path. Omit to derive `/people/{name}.jpeg` from `name`.
   * Pass `null` when no photo exists yet to render an initials placeholder.
   */
  imageUrl?: string | null;
  /**
   * Accent for the hover rule under the portrait: "scarlet" on white
   * sections, "white" on scarlet sections.
   */
  accent?: "scarlet" | "white";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function IndividualCard(props: IndividualCardProps) {
  const { name, role, email, imageUrl, accent = "scarlet" } = props;
  const condensedName = name.replace(/\s+/g, "").toLowerCase();
  const resolvedSrc =
    imageUrl === null ? null : (imageUrl ?? `/people/${condensedName}.jpeg`);
  const accentColor = accent === "white" ? "#fff" : "primary.main";

  return (
    <Box
      sx={{
        py: { xs: "0rem", sm: "1rem" },
        px: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Hover / keyboard-focus ignites the portrait: gentle zoom plus an
        // accent rule sweeping across the bottom edge.
        "&:hover img, &:focus-within img": {
          transform: "scale(1.05)",
        },
        "&:hover [data-card-rule], &:focus-within [data-card-rule]": {
          transform: "scaleX(1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "min(100%, 176px)",
          aspectRatio: "5 / 6",
          overflow: "hidden",
        }}
      >
        {resolvedSrc ? (
          <Image
            src={resolvedSrc}
            alt={`Portrait of ${name}, ${role}`}
            fill
            sizes="176px"
            style={{
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ) : (
          <Box
            role="img"
            aria-label={`${name}, ${role}`}
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                accent === "white"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(23, 24, 26, 0.06)",
              border:
                accent === "white"
                  ? "1px solid rgba(255, 255, 255, 0.4)"
                  : "1px solid rgba(23, 24, 26, 0.15)",
            }}
          >
            <Typography
              variant="h4"
              component="span"
              aria-hidden="true"
              sx={{ color: "inherit", opacity: 0.85 }}
            >
              {getInitials(name)}
            </Typography>
          </Box>
        )}
        <Box
          data-card-rule
          aria-hidden="true"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "3px",
            backgroundColor: accentColor,
            transform: "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </Box>
      <Box sx={{ textAlign: "center", mt: 1.25 }}>
        <Typography variant="h6" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {role}
        </Typography>
        <Typography
          variant="body2"
          component="a"
          href={`mailto:${email}`}
          sx={{
            display: "block",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            textDecorationColor:
              "color-mix(in srgb, currentColor 35%, transparent)",
            "&:hover": { textDecorationColor: "currentColor" },
          }}
        >
          {email}
        </Typography>
      </Box>
    </Box>
  );
}
