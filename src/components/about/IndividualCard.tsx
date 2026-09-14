import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { monoFamily } from "@/theme/fonts";

interface IndividualCardProps {
  name: string;
  role: string;
  email: string;
  /** Explicit photo path; omit to derive `/people/{name}.jpeg`; `null` for an initials placeholder. */
  imageUrl?: string | null;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** One cell of a roster panel: portrait, name, role, email. */
export default function IndividualCard({ name, role, email, imageUrl }: IndividualCardProps) {
  const condensedName = name.replace(/\s+/g, "").toLowerCase();
  const resolvedSrc = imageUrl === null ? null : (imageUrl ?? `/people/${condensedName}.jpeg`);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.5,
        alignContent: "start",
        p: { xs: 2, md: 2.5 },
        backgroundColor: "background.paper",
        "&:hover img, &:focus-within img": { transform: "scale(1.03)" },
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", borderRadius: 1, backgroundColor: "background.panel" }}>
        {resolvedSrc ? (
          <Image
            src={resolvedSrc}
            alt={`Portrait of ${name}, ${role}`}
            fill
            sizes="(max-width: 600px) 45vw, (max-width: 900px) 30vw, 260px"
            style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
        ) : (
          <Box role="img" aria-label={`${name}, ${role}`} sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <Typography variant="h3" component="span" aria-hidden="true" sx={{ color: "text.disabled" }}>
              {getInitials(name)}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ display: "grid", gap: 0.25 }}>
        <Typography variant="h4" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {role}
        </Typography>
        <Typography
          component="a"
          href={`mailto:${email}`}
          sx={{
            mt: 0.5,
            fontFamily: monoFamily,
            fontSize: "0.78rem",
            color: "text.secondary",
            width: "fit-content",
            textDecoration: "underline",
            textDecorationColor: "transparent",
            textUnderlineOffset: "3px",
            transition: "color 0.2s, text-decoration-color 0.2s",
            "&:hover": { color: "signal.main", textDecorationColor: "currentColor" },
          }}
        >
          {email}
        </Typography>
      </Box>
    </Box>
  );
}
