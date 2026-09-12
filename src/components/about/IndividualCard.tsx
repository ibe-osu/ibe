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

/**
 * One roster entry: portrait, name, role, email — flush-left under a
 * hairline so a grid of them reads as a ruled roster, not a card wall.
 */
export default function IndividualCard(props: IndividualCardProps) {
  const { name, role, email, imageUrl, accent = "scarlet" } = props;
  const condensedName = name.replace(/\s+/g, "").toLowerCase();
  const resolvedSrc =
    imageUrl === null ? null : (imageUrl ?? `/people/${condensedName}.jpeg`);
  const onScarlet = accent === "white";
  const accentColor = onScarlet ? "#fff" : "primary.main";
  const ruleColor = onScarlet ? "rgba(255, 255, 255, 0.28)" : "divider";
  const mutedColor = onScarlet ? "rgba(255, 255, 255, 0.78)" : "text.secondary";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2,
        borderTop: "1px solid",
        borderColor: ruleColor,
        // Hover / keyboard-focus ignites the portrait: gentle zoom plus an
        // accent rule sweeping across the bottom edge.
        "&:hover img, &:focus-within img": {
          transform: "scale(1.04)",
        },
        "&:hover [data-card-rule], &:focus-within [data-card-rule]": {
          transform: "scaleX(1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "5 / 6",
          overflow: "hidden",
          backgroundColor: onScarlet
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(23, 24, 26, 0.06)",
        }}
      >
        {resolvedSrc ? (
          <Image
            src={resolvedSrc}
            alt={`Portrait of ${name}, ${role}`}
            fill
            sizes="(max-width: 600px) 45vw, (max-width: 900px) 30vw, 220px"
            style={{
              objectFit: "cover",
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
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
            }}
          >
            <Typography
              variant="h3"
              component="span"
              aria-hidden="true"
              sx={{ color: "inherit", opacity: 0.7 }}
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
      <Box sx={{ mt: 1.75 }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{ color: "inherit", lineHeight: 1.25 }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ color: mutedColor, mt: 0.25, textWrap: "balance" }}
        >
          {role}
        </Typography>
        <Typography
          variant="body2"
          component="a"
          href={`mailto:${email}`}
          sx={{
            display: "inline-block",
            mt: 1,
            color: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationThickness: "1px",
            textDecorationColor:
              "color-mix(in srgb, currentColor 35%, transparent)",
            transition: "text-decoration-color 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
            "&:hover": { textDecorationColor: "currentColor" },
          }}
        >
          {email}
        </Typography>
      </Box>
    </Box>
  );
}
