"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface IProps {
  cellHeight: number;
  gapPx: number;
  duration: number;
  direction?: "normal" | "reverse";
  logos: string[];
}

// Marquee loop: translateX only (composited), never left/margin
const scrollAnimation = keyframes`
  to {
    transform: translateX(calc(-50% - var(--gap, 0px)));
  }
`;

function logoAlt(src: string): string {
  const base = src.split("/").pop()?.replace(".svg", "").replace(/-/g, " ");
  return base ? `${base} logo` : "company logo";
}

export default function CompanyScrollRow(props: IProps) {
  const { cellHeight, gapPx, duration, direction = "normal", logos } = props;

  // Progressive enhancement: only animate client-side, and only when the
  // user has not requested reduced motion. Falls back to a static wrapped
  // grid of logos otherwise.
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAnimated(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Switching to the fixed-height marquee row changes this section's height
  // after mount, which shifts everything below it and invalidates the scroll
  // positions ScrollTrigger already cached elsewhere on the page (e.g. the
  // Alumni Spotlights reveal). Refresh once the new layout has committed.
  useEffect(() => {
    if (!animated) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [animated]);

  // Duplicate the set for a seamless loop; duplicates are aria-hidden
  const logoSet = animated ? [...logos, ...logos] : logos;

  return (
    <Box
      sx={{
        width: "100%",
        height: animated ? `${cellHeight}px` : "auto",
        overflow: animated ? "hidden" : "visible",
        position: "relative",
        maskImage: animated
          ? "linear-gradient(90deg, transparent, white 15%, white 85%, transparent)"
          : undefined,
        WebkitMaskImage: animated
          ? "linear-gradient(90deg, transparent, white 15%, white 85%, transparent)"
          : undefined,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: animated ? "nowrap" : "wrap",
          justifyContent: animated ? "flex-start" : "center",
          gap: `${gapPx}px`,
          width: animated ? "max-content" : "100%",
          animation: animated
            ? `${scrollAnimation} ${duration}s linear infinite`
            : undefined,
          animationDirection: direction === "reverse" ? "reverse" : "normal",
          willChange: animated ? "transform" : undefined,
        }}
        style={
          animated
            ? ({ "--gap": `${gapPx}px` } as React.CSSProperties)
            : undefined
        }
      >
        {logoSet.map((src, i) => (
          <Box
            key={i}
            aria-hidden={i >= logos.length || undefined}
            sx={{
              height: `${cellHeight}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexShrink: 0,
              px: 1,
            }}
          >
            <Image
              src={src}
              alt={i >= logos.length ? "" : logoAlt(src)}
              height={Math.round(cellHeight * 0.55)}
              width={0}
              style={{
                objectFit: "contain",
                width: "auto",
                height: `${Math.round(cellHeight * 0.55)}px`,
                display: "block",
                // Muted monochrome press-bar treatment: quieter, more
                // prestigious than 39 competing brand palettes
                filter: "grayscale(1)",
                opacity: 0.72,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
