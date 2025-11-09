"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

interface IProps {
  cellHeight:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gapPx: number;
  duration: number;
  direction?: "normal" | "reverse";
  logos: string[];
  speed?: "fast" | "slow";
}

const scrollAnimation = keyframes`
  to {
    transform: translateX(calc(-50% - var(--gap, 0px)));
  }
`;

export default function CompanyScrollRow(props: IProps) {
  const { cellHeight, gapPx, duration, direction, logos, speed } = props;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [animated, setAnimated] = useState(false);
  const [logoSet, setLogoSet] = useState<
    { src: string; ariaHidden?: boolean }[]
  >(logos.map((src) => ({ src })));

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimated(false);
      setLogoSet(logos.map((src) => ({ src })));
      return;
    }
    // JS enhancement: duplicate content for animation, set aria-hidden
    setAnimated(true);
    setLogoSet([
      ...logos.map((src) => ({ src })),
      ...logos.map((src) => ({ src, ariaHidden: true })),
    ]);
  }, [logos, prefersReducedMotion]);

  return (
    <Box
      sx={{
        width: "100%",
        height: cellHeight,
        overflow: animated ? "hidden" : "visible",
        position: "relative",
        maskImage: animated
          ? "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)"
          : undefined,
        WebkitMaskImage: animated
          ? "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)"
          : undefined,
        bgcolor: "background.paper",
      }}
      data-animated={animated ? "true" : undefined}
      data-direction={direction === "reverse" ? "right" : "left"}
      data-speed={speed}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: animated ? "nowrap" : "wrap",
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
        className={animated ? "scroller__inner" : undefined}
      >
        {logoSet.map((logo, i) => (
          <Box
            key={i}
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
              src={logo.src}
              alt={
                logo.src.split("/").pop()?.replace(/[-.]/g, " ") ||
                "company logo"
              }
              height={
                typeof cellHeight === "number"
                  ? Math.round(cellHeight * 0.7)
                  : undefined
              }
              width={0}
              aria-hidden={logo.ariaHidden || undefined}
              priority={i < logos.length}
              style={{
                objectFit: "contain",
                width: "auto",
                height:
                  typeof cellHeight === "number"
                    ? `${Math.round(cellHeight * 0.7)}px`
                    : "70%",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
