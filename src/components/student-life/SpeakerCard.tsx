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

export default function SpeakerCard(props: IProps) {
  const { speaker } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        aspectRatio: "1",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: 2,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {/* Image */}
      <Image
        src={speaker.imageUrl}
        alt={speaker.name}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Hover Overlay with Text */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mb: { xs: 0.5, md: 1 },
          }}
        >
          {speaker.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            mb: { xs: 1, md: 2 },
          }}
        >
          {speaker.position}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            fontSize: { xs: "0.75rem", md: "0.875rem" },
          }}
        >
          {speaker.bio}
        </Typography>
      </Box>
    </Box>
  );
}
