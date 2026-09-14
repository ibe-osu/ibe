"use client";

import { useEffect, useState } from "react";
import { IconButton, useColorScheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolved = mode === "system" ? systemMode : mode;
  const isDark = resolved === "dark";

  return (
    <IconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setMode(isDark ? "light" : "dark")}
      size="small"
      sx={{
        width: 34,
        height: 34,
        border: "1px solid",
        borderColor: "divider",
        color: "text.secondary",
        "&:hover": { color: "text.primary", backgroundColor: "action.hover" },
      }}
    >
      {mounted && isDark ? (
        <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
      ) : (
        <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />
      )}
    </IconButton>
  );
}
