"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

export interface Testimonial {
  text: string;
  author: string;
  imageUrl: string;
}

interface IProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel(props: IProps) {
  const { testimonials } = props;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true,
  });

  useEffect(() => {
    if (!isTabActive || isHovered) return; // Pause auto-advance on hover

    // Auto-advance every 10 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isTabActive, isHovered, index, testimonials.length]);

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
        maxWidth: "900px",
        mx: "auto",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Slide Container */}
      <Box
        {...handlers}
        sx={{
          display: "flex",
          transition: "transform 0.6s ease",
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {testimonials.map((testimonial, i) => (
          <Box
            key={i}
            sx={{
              minWidth: "100%",
              px: 3,
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              opacity: i === index ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* Text */}
            <Box sx={{ maxWidth: "500px" }}>
              <Typography variant="h3" sx={{ marginBottom: "-2rem" }}>
                “
              </Typography>
              <Typography
                variant="body1"
                sx={{ my: "1rem", color: "text.primary" }}
              >
                {testimonial.text}
              </Typography>
              <Typography variant="h3" sx={{ marginTop: "-0.75rem" }}>
                ”
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {testimonial.author}
              </Typography>
            </Box>

            {/* Image */}
            <Box
              sx={{
                width: "200px",
                height: "260px",
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.author}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "-1.5rem", // pulls the arrow outward for visual balance
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          top: "50%",
          right: "-1.5rem",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{ mt: 2, display: "flex", justifyContent: "center", gap: "0.5rem" }}
      >
        {testimonials.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor: i === index ? "grey.400" : "grey.700",
              transition: "background-color .3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
