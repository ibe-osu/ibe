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

// Author strings are "Name, Role @ Company, Cohort" — surface the name,
// keep the credentials quieter beneath it.
function splitAuthor(author: string): { name: string; detail: string } {
  const splitAt = author.indexOf(", ");
  if (splitAt === -1) return { name: author, detail: "" };
  return {
    name: author.slice(0, splitAt),
    detail: author.slice(splitAt + 2),
  };
}

export default function TestimonialCarousel(props: IProps) {
  const { testimonials } = props;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    // Pause auto-advance on hover, keyboard focus, hidden tab, or when the
    // user prefers reduced motion
    if (!isTabActive || isHovered || isFocused || reducedMotion) return;

    // Auto-advance every 10 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isTabActive, isHovered, isFocused, reducedMotion, index, testimonials.length]);

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
      aria-label="Student testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      sx={{
        width: "100%",
        maxWidth: "900px",
        mx: "auto",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Slide track: transform + opacity only */}
      <Box sx={{ overflow: "hidden" }}>
        <Box
          {...handlers}
          sx={{
            display: "flex",
            transition: reducedMotion ? "none" : "transform 0.6s ease",
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, i) => {
            const { name, detail } = splitAuthor(testimonial.author);
            return (
              <Box
                key={i}
                aria-hidden={i !== index || undefined}
                sx={{
                  minWidth: "100%",
                  px: { xs: 1, sm: 3 },
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "1.5rem", md: "3rem" },
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  opacity: i === index ? 1 : 0,
                  transition: reducedMotion ? "none" : "opacity 0.4s ease",
                }}
              >
                {/* Quote */}
                <Box sx={{ maxWidth: "520px", textAlign: "left" }}>
                  <Typography
                    component="span"
                    variant="h3"
                    aria-hidden
                    sx={{
                      display: "block",
                      color: "primary.main",
                      lineHeight: 0.6,
                      mb: "0.5rem",
                      userSelect: "none",
                    }}
                  >
                    &ldquo;
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "1.0625rem", md: "1.125rem" },
                      lineHeight: 1.75,
                      color: "text.primary",
                      mb: "1.5rem",
                    }}
                  >
                    {testimonial.text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {name}
                  </Typography>
                  {detail && (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: "0.125rem" }}
                    >
                      {detail}
                    </Typography>
                  )}
                </Box>

                {/* Image */}
                <Box
                  sx={{
                    width: "200px",
                    height: "260px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                    backgroundColor: "grey.200",
                  }}
                >
                  <Image
                    src={testimonial.imageUrl}
                    alt={name}
                    fill
                    sizes="200px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Navigation Buttons (hidden on phones; swipe + dots take over) */}
      <IconButton
        onClick={prev}
        aria-label="Previous testimonial"
        sx={{
          position: "absolute",
          top: "50%",
          left: { sm: "-2.75rem", md: "-3.5rem" },
          transform: "translateY(-50%)",
          zIndex: 2,
          display: { xs: "none", sm: "inline-flex" },
          color: "text.secondary",
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={next}
        aria-label="Next testimonial"
        sx={{
          position: "absolute",
          top: "50%",
          right: { sm: "-2.75rem", md: "-3.5rem" },
          transform: "translateY(-50%)",
          zIndex: 2,
          display: { xs: "none", sm: "inline-flex" },
          color: "text.secondary",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          gap: "0.25rem",
        }}
      >
        {testimonials.map((_, i) => (
          <Box
            component="button"
            type="button"
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
            aria-current={i === index || undefined}
            sx={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "none",
              padding: 0,
              cursor: "pointer",
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "-4px",
              },
              "&::after": {
                content: '""',
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: (theme) =>
                  i === index
                    ? theme.palette.primary.main
                    : theme.palette.grey[400],
                transition: "background-color .3s",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
