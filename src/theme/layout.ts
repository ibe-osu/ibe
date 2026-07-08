// Shared layout tokens.
//
// Every standard content section on every page should use these so that
// content starts and ends at the same horizontal position site-wide, and
// vertical rhythm is consistent from page to page. Hand-typing per-section
// max-widths and gutters is what caused pages to feel like different sites.
//
// Full-bleed heroes intentionally do NOT use CONTENT_MAX_WIDTH on their outer
// box (the photo spans edge to edge), but their inner content box should still
// use PAGE_GUTTER + CONTENT_MAX_WIDTH so hero text lines up with body content.

import type { SxProps, Theme } from "@mui/material";

/** Page edge padding. The horizontal gutter, consistent across all pages. */
export const PAGE_GUTTER = { xs: "1.5rem", sm: "3rem", md: "4rem" } as const;

/** Max width of the readable content column. */
export const CONTENT_MAX_WIDTH = "1280px";

/** Standard vertical padding for a content section. */
export const SECTION_PY = { xs: "4rem", md: "6rem" } as const;

/**
 * Standard content section: full-width band (so a background color spans the
 * viewport) with consistent vertical padding and horizontal gutter. Drop the
 * section's content directly inside — it is centered and width-capped.
 */
export const sectionSx: SxProps<Theme> = {
  py: SECTION_PY,
  px: PAGE_GUTTER,
};

/** Inner wrapper that caps and centers content within a full-width band. */
export const containerSx: SxProps<Theme> = {
  maxWidth: CONTENT_MAX_WIDTH,
  mx: "auto",
};
