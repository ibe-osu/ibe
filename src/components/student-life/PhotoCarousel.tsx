"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Box, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Image from "next/image";

export interface Photo {
  url: string;
  alt: string;
}

interface IProps {
  photos: Photo[];
  /** Accessible name for the carousel region, e.g. the event title. */
  label?: string;
}

const controlSx = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  color: "rgba(0, 0, 0, 0.75)",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#fff",
  },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: "2px",
  },
} as const;

export default function PhotoCarousel(props: IProps) {
  const { photos, label = "Event photos" } = props;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  // Reduced-motion users never get autoplay; everyone else can pause it.
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [isPausedByUser, setIsPausedByUser] = useState(false);

  const autoplayEnabled = !prefersReducedMotion && !isPausedByUser;

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true,
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  useEffect(() => {
    // Pause auto-advance when hidden, hovered, keyboard-focused,
    // paused by the user, or when the user prefers reduced motion.
    if (!isTabActive || isHovered || isFocused || !autoplayEnabled) return;

    // Auto-advance every 10 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isTabActive, isHovered, isFocused, autoplayEnabled, index, photos.length]);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabActive(document.visibilityState == "visible");
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        backgroundColor: "grey.300",
      }}
    >
      {/* Slide Container */}
      <Box
        {...handlers}
        sx={{
          display: "flex",
          width: "100%",
          transition: prefersReducedMotion
            ? "none"
            : "transform 0.6s ease",
          transform: `translateX(-${index * 100}%)`,
          cursor: "grab",
          "&:active": {
            cursor: "grabbing",
          },
        }}
      >
        {photos.map((photo, i) => (
          <Box
            key={i}
            aria-hidden={i !== index}
            sx={{
              flex: "0 0 100%",
              position: "relative",
              width: "100%",
              pt: "56.25%", // 16:9
            }}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons - Overlaid on image */}
      <IconButton
        onClick={prev}
        aria-label="Previous photo"
        size="small"
        sx={{
          ...controlSx,
          position: "absolute",
          top: "50%",
          left: "0.75rem",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={next}
        aria-label="Next photo"
        size="small"
        sx={{
          ...controlSx,
          position: "absolute",
          top: "50%",
          right: "0.75rem",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      {/* Play/Pause toggle — hidden for reduced-motion users (no autoplay at all) */}
      {!prefersReducedMotion && (
        <IconButton
          onClick={() => setIsPausedByUser((paused) => !paused)}
          aria-label={
            isPausedByUser ? "Resume slideshow" : "Pause slideshow"
          }
          aria-pressed={isPausedByUser}
          size="small"
          sx={{
            ...controlSx,
            position: "absolute",
            bottom: "0.75rem",
            right: "0.75rem",
            zIndex: 2,
          }}
        >
          {isPausedByUser ? (
            <PlayArrowIcon fontSize="small" />
          ) : (
            <PauseIcon fontSize="small" />
          )}
        </IconButton>
      )}

      {/* Dots - Overlaid at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        {photos.map((_, i) => (
          <Box
            key={i}
            component="button"
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1} of ${photos.length}`}
            aria-current={i === index ? "true" : undefined}
            sx={{
              width: "10px",
              height: "10px",
              p: 0,
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor:
                i === index
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(255, 255, 255, 0.5)",
              transition: "background-color .3s",
              border: "1px solid rgba(0, 0, 0, 0.35)",
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
