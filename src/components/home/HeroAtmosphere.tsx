"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, useColorScheme } from "@mui/material";

// The shader is ~40 kB of WebGL that only matters on the dark ground, so it
// is loaded after first paint and only when it will actually be seen.
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);

export default function HeroAtmosphere() {
  const { mode, systemMode } = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Desktop-class devices only: a live WebGL field is a poor trade on a
    // phone's battery and on software renderers.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if ((navigator.hardwareConcurrency ?? 0) < 4) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") return;
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      : window.setTimeout(() => setReady(true), 1200);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  const isDark = (mode === "system" ? systemMode : mode) === "dark";
  if (!ready || !isDark) return null;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
        maskImage: "radial-gradient(70% 60% at 50% 30%, #000 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, #000 20%, transparent 75%)",
      }}
    >
      <MeshGradient
        colors={["#0b0b0d", "#3a0512", "#ba0c2f", "#0b0b0d"]}
        distortion={0.8}
        swirl={0.5}
        speed={0.12}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
