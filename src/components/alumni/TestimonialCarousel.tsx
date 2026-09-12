"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { serifFamily } from "@/theme/fonts";

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
    if (!isTabActive || isHovered) return;
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
      sx={{ width: "100%", minWidth: 0 }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Box
          {...handlers}
          sx={{
            display: "flex",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, i) => (
            <Box
              key={i}
              aria-hidden={i !== index}
              sx={{
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) 12rem" },
                columnGap: { xs: 3, md: 6 },
                rowGap: 3,
                alignItems: "start",
                opacity: i === index ? 1 : 0,
                transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
                <Typography
                  component="span"
                  aria-hidden="true"
                  sx={{
                    display: "block",
                    fontFamily: serifFamily,
                    fontSize: "clamp(4rem, 6vw, 6rem)",
                    lineHeight: 0.6,
                    color: "primary.main",
                    mb: 1.5,
                    ml: "-0.06em",
                  }}
                >
                  “
                </Typography>
                <Typography
                  component="blockquote"
                  sx={{
                    m: 0,
                    fontFamily: serifFamily,
                    fontSize: "clamp(1.25rem, 1.4vw + 0.6rem, 1.75rem)",
                    lineHeight: 1.4,
                    letterSpacing: "-0.005em",
                    color: "text.primary",
                    maxWidth: "40ch",
                    textWrap: "pretty",
                  }}
                >
                  {testimonial.text}
                </Typography>
                <Typography
                  component="figcaption"
                  variant="body2"
                  sx={{
                    mt: 3,
                    pt: 2,
                    fontWeight: 600,
                    color: "text.secondary",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    maxWidth: "40ch",
                  }}
                >
                  {testimonial.author}
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: { xs: "10rem", sm: "100%" },
                  aspectRatio: "10 / 13",
                  overflow: "hidden",
                  backgroundColor: "grey.100",
                  order: { xs: -1, sm: 0 },
                }}
              >
                <Image
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                  fill
                  sizes="(max-width: 600px) 160px, 192px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          mt: { xs: 3, md: 4 },
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={prev}
          aria-label="Previous testimonial"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            color: "text.primary",
            "&:hover": { borderColor: "text.primary" },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={next}
          aria-label="Next testimonial"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            color: "text.primary",
            "&:hover": { borderColor: "text.primary" },
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>

        <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
          {testimonials.map((_, i) => (
            <Box
              key={i}
              component="button"
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              sx={{
                width: 28,
                height: 3,
                cursor: "pointer",
                border: "none",
                padding: 0,
                backgroundColor: i === index ? "primary.main" : "grey.300",
                transition: "background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "4px",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
