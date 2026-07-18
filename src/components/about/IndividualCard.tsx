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
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function IndividualCard(props: IndividualCardProps) {
  const { name, role, email, imageUrl } = props;
  const condensedName = name.replace(/\s+/g, "").toLowerCase();
  const resolvedSrc =
    imageUrl === null ? null : (imageUrl ?? `/people/${condensedName}.jpeg`);

  return (
    <Box
      sx={{
        py: { xs: "0rem", sm: "1rem" },
        px: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {resolvedSrc ? (
        <Image
          src={resolvedSrc}
          alt={`Portrait of ${name}, ${role}`}
          width={167}
          height={200}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Box
          role="img"
          aria-label={`${name}, ${role}`}
          sx={{
            width: 167,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
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
      <Box sx={{ textAlign: "center", mt: 1 }}>
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
