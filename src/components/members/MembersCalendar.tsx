"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Link as MuiLink,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { NAV_LABEL_TYPOGRAPHY } from "@/theme/theme";
import {
  CALENDAR_ADD_URL,
  CALENDAR_ICS_URL,
  CALENDAR_PAGE_URL,
  calendarEmbedUrl,
  type CalendarMode,
} from "@/data/calendar";

const MODES: { value: CalendarMode; label: string }[] = [
  { value: "MONTH", label: "Month" },
  { value: "WEEK", label: "Week" },
  { value: "AGENDA", label: "Agenda" },
];

/**
 * Everything on the page above the calendar frame, in px, on a desktop
 * viewport: sticky header (72) + page top padding (32) + title block
 * (~78 + 16 margin) + view toggle row (~36 + 12 margin) + the caption
 * below the frame (~28) + bottom breathing room (~16). The frame takes
 * whatever is left of the viewport, within sane bounds, so the whole
 * calendar sits on one screen instead of forcing a page scroll.
 */
const DESKTOP_CHROME_PX = 290;

/**
 * The IBE Google Calendar, embedded. Google's month grid is unreadable on a
 * phone, so the default view follows the viewport — agenda on small screens,
 * month on large — until the member picks one themselves.
 */
export default function MembersCalendar() {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));
  const [chosen, setChosen] = useState<CalendarMode | null>(null);
  // The iframe only mounts after hydration. The server can't know the
  // viewport, so rendering it during SSR means every phone would load the
  // MONTH view, throw it away, and load AGENDA — two full Google loads. By
  // the time this effect runs, useMediaQuery has resolved, so the frame
  // mounts exactly once with the right view. (Google's embed needs JS to
  // render anyway, so there's nothing to lose for a no-JS visitor; they
  // still get the "open in a new tab" link below.)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mode: CalendarMode =
    chosen ?? (mounted && isNarrow ? "AGENDA" : "MONTH");

  return (
    <Box>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={mode}
        onChange={(_event, next: CalendarMode | null) => {
          if (next) setChosen(next);
        }}
        aria-label="Calendar view"
        sx={{ mb: 1.5 }}
      >
        {MODES.map((m) => (
          <ToggleButton
            key={m.value}
            value={m.value}
            sx={{
              px: 2,
              ...NAV_LABEL_TYPOGRAPHY,
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
              },
            }}
          >
            {m.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "grey.300",
          backgroundColor: "#fff",
          // Viewport-relative so the grid fits on one screen; clamped so a
          // short laptop window still gets a usable grid and a tall monitor
          // doesn't stretch Google's layout past what it's designed for.
          height: {
            xs: "68svh",
            md: `clamp(440px, calc(100svh - ${DESKTOP_CHROME_PX}px), 720px)`,
          },
        }}
      >
        {mounted && (
          <Box
            component="iframe"
            // Remount only when the member picks a view — not when the
            // media query settles, which would be a second load for nothing.
            key={chosen ?? "default"}
            src={calendarEmbedUrl(mode)}
            title="IBE calendar"
            sx={{ display: "block", width: "100%", height: "100%", border: 0 }}
          />
        )}
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={{ xs: 1, sm: 3 }}
        sx={{ mt: 1.5 }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Times are shown in Eastern Time.
        </Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
          <MuiLink
            href={CALENDAR_ADD_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            variant="body2"
            sx={{ fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 0.5 }}
          >
            Add to Google Calendar
            <OpenInNewIcon sx={{ fontSize: 15 }} />
          </MuiLink>
          <MuiLink
            href={CALENDAR_ICS_URL}
            underline="hover"
            variant="body2"
            sx={{ fontWeight: 600 }}
          >
            Subscribe (.ics)
          </MuiLink>
          <MuiLink
            href={CALENDAR_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            variant="body2"
            sx={{ fontWeight: 600 }}
          >
            Open in new tab
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
}
