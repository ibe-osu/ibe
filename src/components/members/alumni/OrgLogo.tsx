"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { initialsOf } from "@/lib/alumni/directory";
import { isOhioState, logoUrl } from "@/lib/alumni/logos";
import Tile from "./Tile";

/**
 * A square company or school mark: the favicon when the name is mapped in
 * logos.ts, a scarlet "O" for Ohio State, otherwise (or if the image fails)
 * a quiet initials tile. Decorative: the name always sits next to it.
 */
export default function OrgLogo({ name, size = 24 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (isOhioState(name)) return <Tile text="O" size={size} />;

  const src = logoUrl(name);
  const box = { width: size, height: size, flexShrink: 0 } as const;

  if (!src || failed) {
    return (
      <Box
        aria-hidden
        sx={{
          ...box,
          display: "grid",
          placeItems: "center",
          bgcolor: "background.tint",
          border: "1px solid",
          borderColor: "divider",
          color: "text.secondary",
          fontSize: Math.max(9, size * 0.36),
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {initialsOf(name)}
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      sx={{ ...box, objectFit: "contain" }}
    />
  );
}
