"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

export interface Photo {
  url: string;
  alt: string;
}

interface IProps {
  photos: Photo[];
}

export default function PhotoCarousel(props: IProps) {
  const { photos } = props;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  const next = () => setIndex((prev) => (prev + 1) % photos.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true,
  });

  useEffect(() => {
    if (!isTabActive || isHovered) return; // Pause auto-advance on hover

    // Auto-advance every 10 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isTabActive, isHovered, index, photos.length]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        backgroundColor: "grey.100",
      }}
    >
      {/* Slide Container */}
      <Box
        {...handlers}
        sx={{
          display: "flex",
          width: "100%",
          transition: "transform 0.6s ease",
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
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons - Overlaid on image */}
      <IconButton
        onClick={prev}
        aria-label="Previous photo"
        sx={{
          position: "absolute",
          top: "50%",
          left: "1rem",
          transform: "translateY(-50%)",
          zIndex: 2,
          borderRadius: 0,
          color: "#17181a",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          "&:hover": {
            backgroundColor: "#fff",
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={next}
        aria-label="Next photo"
        sx={{
          position: "absolute",
          top: "50%",
          right: "1rem",
          transform: "translateY(-50%)",
          zIndex: 2,
          borderRadius: 0,
          color: "#17181a",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          "&:hover": {
            backgroundColor: "#fff",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

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
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            sx={{
              width: 24,
              height: 3,
              cursor: "pointer",
              padding: 0,
              border: "none",
              backgroundColor:
                i === index
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(255, 255, 255, 0.45)",
              boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
              transition: "background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              "&:focus-visible": {
                outline: "2px solid #fff",
                outlineOffset: "3px",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
