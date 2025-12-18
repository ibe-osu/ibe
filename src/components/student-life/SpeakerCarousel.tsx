"use client";

import { useState, useEffect, useRef } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // Determine how many cards to show based on screen size
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : isSmallDesktop ? 3 : 4;

  // Calculate the card width percentage based on how many cards are visible
  const cardWidthPercentage = 100 / cardsToShow;

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
        sx={{
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Cards Container with overflow hidden for sliding effect */}
      <Box
        sx={{
          flex: 1,
          px: 1,
          overflow: "hidden",
          py: 1, // Add vertical padding to prevent cutting off cards
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: isTransitioning ? "transform 0.6s ease" : "none",
            transform: `translateX(-${startIndex * cardWidthPercentage}%)`,
          }}
        >
          {extendedSpeakers.map((speaker, idx) => (
            <Box
              key={`${speaker.name}-${idx}`}
              sx={{
                minWidth: {
                  xs: "100%", // 1 card on mobile
                  sm: "50%", // 2 cards on tablet
                  md: "33.333%", // 3 cards on small desktop
                  lg: "25%", // 4 cards on large desktop
                },
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
