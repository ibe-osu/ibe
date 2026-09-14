"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import Panel from "@/components/ui/Panel";
import { displayFamily } from "@/theme/fonts";

export interface Testimonial {
  text: string;
  author: string;
  imageUrl: string;
}

interface IProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: IProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handlers = useSwipeable({ onSwipedLeft: next, onSwipedRight: prev, trackMouse: true });

  useEffect(() => {
    if (!isTabActive || isHovered) return;
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % testimonials.length), 10000);
    return () => clearInterval(interval);
  }, [isTabActive, isHovered, index, testimonials.length]);

  useEffect(() => {
    const onVisibilityChange = () => setIsTabActive(document.visibilityState == "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const controlSx = {
    width: 36,
    height: 36,
    border: "1px solid",
    borderColor: "divider",
    color: "text.primary",
    "&:hover": { borderColor: "text.primary", backgroundColor: "action.hover" },
  } as const;

  return (
    <Panel
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ maxWidth: "58rem", width: "100%", mx: "auto" }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Box
          {...handlers}
          sx={{ display: "flex", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)", transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <Box
              key={i}
              aria-hidden={i !== index}
              sx={{
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "8rem minmax(0, 1fr)" },
                gap: { xs: 2.5, md: 4 },
                alignItems: "start",
                p: { xs: 2.5, md: 4 },
                opacity: i === index ? 1 : 0,
                transition: "opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <Box sx={{ position: "relative", width: { xs: "6.5rem", sm: "100%" }, aspectRatio: "4 / 5", overflow: "hidden", borderRadius: 1, backgroundColor: "background.panel" }}>
                <Image src={t.imageUrl} alt={t.author} fill sizes="(max-width: 600px) 104px, 128px" style={{ objectFit: "cover" }} />
              </Box>
              <Box component="figure" sx={{ m: 0, minWidth: 0, display: "grid", gap: 2 }}>
                <Typography
                  component="blockquote"
                  sx={{
                    m: 0,
                    fontFamily: displayFamily,
                    fontWeight: 500,
                    fontSize: "clamp(1.15rem, 1.4vw + 0.5rem, 1.5rem)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.015em",
                    textWrap: "pretty",
                  }}
                >
                  “{t.text}”
                </Typography>
                <Typography component="figcaption" variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {t.author}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: { xs: 2.5, md: 4 }, py: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <IconButton onClick={prev} aria-label="Previous testimonial" sx={controlSx}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={next} aria-label="Next testimonial" sx={controlSx}>
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
                borderRadius: 2,
                backgroundColor: i === index ? "signal.main" : "divider",
                transition: "background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                "&:focus-visible": { outline: "2px solid", outlineColor: "signal.main", outlineOffset: 4 },
              }}
            />
          ))}
        </Box>
      </Box>
    </Panel>
  );
}
