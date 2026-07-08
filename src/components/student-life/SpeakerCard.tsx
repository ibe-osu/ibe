import { Box, Typography } from "@mui/material";
import Image from "next/image";

export interface Speaker {
  name: string;
  position: string;
  company: string;
  bio: string;
  imageUrl: string;
}

interface IProps {
  speaker: Speaker;
  /**
   * When false the card is outside the carousel viewport (or a clone used for
   * the infinite loop), so it is removed from the tab order and hidden from
   * assistive tech.
   */
  isInteractive?: boolean;
}

export default function SpeakerCard(props: IProps) {
  const { speaker, isInteractive = true } = props;

  return (
    <Box
      tabIndex={isInteractive ? 0 : -1}
      aria-hidden={!isInteractive}
      role="group"
      aria-label={`${speaker.name}, ${speaker.position}`}
      sx={{
        position: "relative",
        aspectRatio: "1",
        overflow: "hidden",
        backgroundColor: "grey.300",
        outline: "none",
        "&:focus-visible": {
          boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}`,
        },
        "&:hover .speaker-bio, &:focus-within .speaker-bio, &:focus .speaker-bio":
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        "@media (prefers-reduced-motion: reduce)": {
          "& .speaker-bio": {
            transition: "opacity 0.01s linear",
            transform: "none",
          },
        },
      }}
    >
      {/* Image */}
      <Image
        src={speaker.imageUrl}
        alt={speaker.name}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Always-visible identity scrim */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          px: 2,
          pt: 6,
          pb: 1.75,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0) 100%)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{ lineHeight: 1.25, fontSize: "1.0625rem" }}
        >
          {speaker.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.4, mt: 0.25 }}
        >
          {speaker.position}
        </Typography>
      </Box>

      {/* Bio overlay — shown on hover or keyboard focus */}
      <Box
        className="speaker-bio"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          opacity: 0,
          transform: "translateY(12px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 2.5, md: 3 },
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 3,
            backgroundColor: "primary.main",
            mb: 1.5,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="h6"
          component="p"
          sx={{ color: "primary.main", lineHeight: 1.25 }}
        >
          {speaker.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "text.primary", mt: 0.5, mb: 1.5 }}
        >
          {speaker.position}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.55,
            fontSize: { xs: "0.8125rem", md: "0.875rem" },
          }}
        >
          {speaker.bio}
        </Typography>
      </Box>
    </Box>
  );
}
