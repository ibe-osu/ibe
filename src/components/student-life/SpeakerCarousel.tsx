"use client";

import { useState } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SpeakerCard, { Speaker } from "./SpeakerCard";

interface IProps {
  speakers: Speaker[];
}

export default function SpeakerCarousel(props: IProps) {
  const { speakers } = props;
  const [startIndex, setStartIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  // Determine how many cards to show based on screen size
  const cardsToShow = isMobile ? 1 : isTablet ? 2 : isSmallDesktop ? 3 : 4;

  const next = () => {
    setFadeIn(false);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % speakers.length);
      setFadeIn(true);
    }, 300);
  };

  const prev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setStartIndex((prev) => (prev === 0 ? speakers.length - 1 : prev - 1));
      setFadeIn(true);
    }, 300);
  };

  // Create a circular array view showing only the cards we need
  const getVisibleSpeakers = () => {
    const visible = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (startIndex + i) % speakers.length;
      visible.push(speakers[index]);
    }
    return visible;
  };

  const visibleSpeakers = getVisibleSpeakers();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
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

      {/* Cards Container */}
      <Box
        sx={{
          flex: 1,
          px: 1,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // 1 card on mobile
              sm: "repeat(2, 1fr)", // 2 cards on tablet
              md: "repeat(3, 1fr)", // 3 cards on small desktop
              lg: "repeat(4, 1fr)", // 4 cards on large desktop
            },
            gap: 3,
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {visibleSpeakers.map((speaker, idx) => (
            <SpeakerCard key={`${speaker.name}-${startIndex}-${idx}`} speaker={speaker} />
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
