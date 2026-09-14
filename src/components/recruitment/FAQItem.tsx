"use client";

import { useId, useState } from "react";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FAQItemProps {
  question: string;
  answer: string;
}

/**
 * Hand-rolled disclosure: animating `grid-template-rows` (0fr -> 1fr) is a
 * pure-compositor transition, unlike MUI's Collapse which measures height
 * in JS and stutters on first open.
 */
export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider", "&:first-of-type": { borderTop: 0 } }}>
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
          px: { xs: 2.5, md: 3 },
          py: 2,
          "&:hover": { backgroundColor: "action.hover" },
          "&:focus-visible": { outline: "2px solid", outlineColor: "signal.main", outlineOffset: -2 },
        }}
      >
        <Typography variant="h6" component="span" sx={{ flex: 1, textAlign: "left", textWrap: "pretty", color: open ? "signal.main" : "text.primary" }}>
          {question}
        </Typography>
        <AddIcon
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            fontSize: 20,
            color: "text.disabled",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </Box>

      <Box
        id={contentId}
        role="region"
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "68ch", px: { xs: 2.5, md: 3 }, pb: 2.5 }}>
            {answer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
