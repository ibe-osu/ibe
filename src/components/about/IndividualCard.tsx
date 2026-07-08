import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Image from "next/image";

interface IndividualCardProps {
  name: string;
  role: string;
  email: string;
  /** "light" for white sections, "scarlet" for the scarlet-drenched section */
  tone?: "light" | "scarlet";
}

export default function IndividualCard(props: IndividualCardProps) {
  const { name, role, email, tone = "light" } = props;
  const condensedName = name.replace(/\s+/g, "").toLowerCase();
  const onScarlet = tone === "scarlet";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        textAlign: "left",
        "&:hover .ibe-portrait img, &:focus-within .ibe-portrait img": {
          transform: "scale(1.04)",
        },
      }}
    >
      <Box
        className="ibe-portrait"
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          overflow: "hidden",
          backgroundColor: onScarlet ? "rgba(0, 0, 0, 0.15)" : "grey.200",
          "& img": {
            objectFit: "cover",
            transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          },
        }}
      >
        <Image
          src={`/people/${condensedName}.jpeg`}
          alt={`Portrait of ${name}`}
          fill
          sizes="(max-width: 600px) 45vw, (max-width: 900px) 30vw, 220px"
        />
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: "1.05rem",
            lineHeight: 1.3,
            color: onScarlet ? "#fff" : "text.primary",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: onScarlet ? "rgba(255, 255, 255, 0.85)" : "primary.main",
          }}
        >
          {role}
        </Typography>
        <Link
          href={`mailto:${email}`}
          underline="hover"
          variant="body2"
          sx={{
            display: "inline-block",
            mt: 0.5,
            wordBreak: "break-all",
            color: onScarlet ? "rgba(255, 255, 255, 0.92)" : "text.secondary",
            textDecorationColor: "currentcolor",
            "&:hover": {
              color: onScarlet ? "#fff" : "primary.main",
            },
          }}
        >
          {email}
        </Link>
      </Box>
    </Box>
  );
}
