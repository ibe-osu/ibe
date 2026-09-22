"use client";

import { useState } from "react";
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
}

/**
 * Speaker card: name and role are always visible below the portrait (no
 * hover required, so mobile users see them too); hover or keyboard focus
 * reveals the bio over the photo. A tap toggles it too — phones have no
 * hover, and a touch tap doesn't reliably produce :focus-visible, so
 * without this the six bios were unreachable on mobile.
 */
export default function SpeakerCard(props: IProps) {
  const { speaker } = props;
  const [open, setOpen] = useState(false);

  return (
    <Box
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${speaker.name} — ${open ? "hide" : "show"} bio`}
      onClick={() => setOpen((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen((value) => !value);
        }
      }}
      data-open={open ? "true" : undefined}
      sx={{
        outline: "none",
        cursor: "pointer",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: "3px",
        },
        "&:hover [data-speaker-bio], &:focus-visible [data-speaker-bio], &[data-open] [data-speaker-bio]":
          {
            opacity: 1,
          },
        "&:hover img, &:focus-visible img, &[data-open] img": {
          transform: "scale(1.04)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          aspectRatio: "1",
          overflow: "hidden",
        }}
      >
        <Image
          src={speaker.imageUrl}
          alt={`Portrait of ${speaker.name}, ${speaker.position}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <Box
          data-speaker-bio
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(23, 24, 26, 0.85)",
            color: "#fff",
            opacity: 0,
            transition: "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            display: "flex",
            alignItems: "center",
            p: { xs: 2, md: 2.5 },
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.55 }}>
            {speaker.bio}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pt: 1.25 }}>
        <Typography variant="h6" component="h3">
          {speaker.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {speaker.position}
        </Typography>
      </Box>
    </Box>
  );
}
