"use client";

import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SpeakerCard, { Speaker } from "./SpeakerCard";

interface IProps {
  speakers: Speaker[];
}

export default function SpeakerCarousel(props: IProps) {
  const { speakers } = props;
  const [startIndex, setStartIndex] = useState(speakers.length); // Start at first "real" copy
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // How many cards are visible is decided in CSS (the --card-w custom
  // property below), not with useMediaQuery: a JS media query resolves to
  // "desktop" during hydration, so phones briefly rendered four-up and
  // then jumped to one card. CSS breakpoints are right from the first paint.

  // Create triple array: [original, original, original] for infinite loop
  const extendedSpeakers = [...speakers, ...speakers, ...speakers];

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex((prev) => prev - 1);
  };

  // Same gesture the testimonial carousel already supports; on a phone the
  // arrows alone read as "this doesn't scroll".
  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isTransitioning) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);

        // If we've gone past the second copy, jump back to first copy (no animation)
        if (startIndex >= speakers.length * 2) {
          setStartIndex(startIndex - speakers.length);
        }
        // If we've gone before the first copy, jump to second copy (no animation)
        else if (startIndex < speakers.length) {
          setStartIndex(startIndex + speakers.length);
        }
      }, 600); // Match transition duration
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startIndex, isTransitioning, speakers.length]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: { xs: 0, md: 2 },
        position: "relative",
      }}
    >
      {/* Left Arrow */}
      <IconButton
        onClick={prev}
        aria-label="Previous speakers"
        sx={{
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Cards Container with overflow hidden for sliding effect */}
      <Box
        {...swipeHandlers}
        sx={{
          flex: 1,
          px: 1,
          overflow: "hidden",
          py: 1, // Add vertical padding to prevent cutting off cards
          touchAction: "pan-y",
        }}
      >
        <Box
          sx={{
            display: "flex",
            "--card-w": {
              xs: "100%", // 1 card on mobile
              sm: "50%", // 2 cards on tablet
              md: "33.333%", // 3 cards on small desktop
              lg: "25%", // 4 cards on large desktop
            },
            transition: isTransitioning ? "transform 0.6s ease" : "none",
            transform: `translateX(calc(-${startIndex} * var(--card-w)))`,
          }}
        >
          {extendedSpeakers.map((speaker, idx) => (
            <Box
              key={`${speaker.name}-${idx}`}
              sx={{
                minWidth: "var(--card-w)",
                px: 1.5, // Half of the gap for spacing
              }}
            >
              <SpeakerCard speaker={speaker} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right Arrow */}
      <IconButton
        onClick={next}
        aria-label="Next speakers"
        sx={{
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
