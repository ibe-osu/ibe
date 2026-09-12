"use client";

import { useId, useState } from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FAQItemProps {
  question: string;
  answer: string;
}

/**
 * Hand-rolled disclosure instead of MUI's Accordion/Collapse: Collapse
 * measures DOM height in JS on every open, which visibly stutters on first
 * expand. Animating `grid-template-rows` (0fr -> 1fr) on a CSS Grid track
 * is a pure-compositor transition — same visual result, no measurement lag.
 */
export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        "&:last-of-type": {
          borderBottom: "1px solid",
          borderBottomColor: "divider",
        },
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        sx={{
          all: "unset",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
          cursor: "pointer",
          px: 0,
          py: { xs: 2.25, md: 2.75 },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: "-2px",
          },
        }}
      >
        <Typography
          variant="h5"
          component="span"
          sx={{
            flex: 1,
            textAlign: "left",
            fontWeight: 600,
            textWrap: "pretty",
            color: open ? "primary.main" : "text.primary",
            transition: "color 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {question}
        </Typography>
        <ExpandMoreIcon
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            color: "primary.main",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </Box>

      <Box
        id={contentId}
        role="region"
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "68ch",
              pb: 3.5,
            }}
          >
            {answer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
