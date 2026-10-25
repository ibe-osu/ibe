"use client";

import { Box } from "@mui/material";
import { serif } from "@/theme/theme";

/** Scarlet square with serif letters: a person's initials, or Ohio State's "O". */
export default function Tile({ text, size }: { text: string; size: number }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        bgcolor: "primary.main",
        color: "#fff",
        fontFamily: serif,
        fontSize: size * (text.length > 1 ? 0.4 : 0.55),
        lineHeight: 1,
      }}
    >
      {text}
    </Box>
  );
}
