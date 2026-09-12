"use client";

import { Box } from "@mui/material";

export default function IBEVideo() {
  return (
    <Box
      sx={{
        position: "relative",
        pt: "56.25%", // 16:9
        overflow: "hidden",
        backgroundColor: "ink.main",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <iframe
        src="https://www.youtube.com/embed/bXAEpDkCZAg?si=p_tXuKEFeMjJdxNW"
        title="Integrated Business & Engineering Honors Program at The Ohio State University"
        allow="encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </Box>
  );
}
