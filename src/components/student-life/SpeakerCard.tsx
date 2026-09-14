import { Box, Typography } from "@mui/material";
import Image from "next/image";

export interface Speaker {
  name: string;
  position: string;
  company: string;
  bio: string;
  imageUrl: string;
}

/**
 * Speaker panel: name and role always visible under the portrait; hover
 * or keyboard focus reveals the bio over the photo.
 */
export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Box
      tabIndex={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "background.paper",
        outline: "none",
        "&:focus-visible": { outline: "2px solid", outlineColor: "signal.main", outlineOffset: 2 },
        "&:hover [data-speaker-bio], &:focus-visible [data-speaker-bio]": { opacity: 1 },
        "&:hover img, &:focus-visible img": { transform: "scale(1.03)" },
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "1", overflow: "hidden", backgroundColor: "background.panel" }}>
        <Image
          src={speaker.imageUrl}
          alt={`Portrait of ${speaker.name}, ${speaker.position}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 280px"
          style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
        <Box
          data-speaker-bio
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(11, 11, 13, 0.86)",
            color: "#fff",
            opacity: 0,
            transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            display: "flex",
            alignItems: "center",
            p: 2.5,
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
            {speaker.bio}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2, display: "grid", gap: 0.25 }}>
        <Typography variant="h4" component="h3">
          {speaker.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {speaker.position}
        </Typography>
      </Box>
    </Box>
  );
}
