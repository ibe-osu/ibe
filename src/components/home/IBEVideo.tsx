"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import poster from "../../../public/video-poster.jpg";

const VIDEO_ID = "bXAEpDkCZAg";
const TITLE = "Integrated Business & Engineering Honors Program at The Ohio State University";

/**
 * Click-to-play facade. YouTube's player is ~900 kB of script; loading it
 * only after a click keeps it out of the first load entirely.
 */
export default function IBEVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <Box sx={{ position: "relative", aspectRatio: "16 / 9", backgroundColor: "#0b0b0d" }}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={TITLE}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        <Box
          component="button"
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Watch: inside the IBE program — play ${TITLE}`}
          sx={{
            all: "unset",
            position: "absolute",
            inset: 0,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            "&:hover [data-play], &:focus-visible [data-play]": { transform: "scale(1.06)", backgroundColor: "primary.dark" },
            "&:focus-visible": { outline: "2px solid", outlineColor: "signal.main", outlineOffset: -2 },
          }}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1120px"
            quality={70}
            placeholder="blur"
            style={{ objectFit: "cover", opacity: 0.85 }}
          />
          <Box
            data-play
            sx={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              color: "#fff",
              boxShadow: "0 12px 40px -12px rgba(0,0,0,0.6)",
              transition: "transform 0.2s cubic-bezier(0.22,1,0.36,1), background-color 0.2s",
            }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 44, ml: "3px" }} />
          </Box>
          <Typography
            component="span"
            sx={{
              position: "absolute",
              left: 16,
              bottom: 14,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Watch: inside the IBE program
          </Typography>
        </Box>
      )}
    </Box>
  );
}
