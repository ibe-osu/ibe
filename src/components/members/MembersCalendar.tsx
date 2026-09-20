"use client";

import { useState } from "react";
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
 * The IBE Google Calendar, embedded. Google's month grid is unreadable on a
 * phone, so the default view follows the viewport — agenda on small screens,
 * month on large — until the member picks one themselves. The iframe itself
 * is plain HTML with no JS gating, so the calendar is visible even if
 * hydration never happens; the toggle just swaps the src.
 */
export default function MembersCalendar() {
  const theme = useTheme();
  // noSsr: resolve the media query on the first client render instead of
  // defaulting to false, then flipping. Without it every phone would mount
  // the MONTH iframe, throw it away, and mount AGENDA — two Google loads.
  // The server still renders MONTH; hydration reconciles the src attribute
  // without remounting because the key is stable until the user chooses.
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [chosen, setChosen] = useState<CalendarMode | null>(null);
  const mode: CalendarMode = chosen ?? (isNarrow ? "AGENDA" : "MONTH");

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <ToggleButtonGroup
          exclusive
          size="small"
          value={mode}
          onChange={(_event, next: CalendarMode | null) => {
            if (next) setChosen(next);
          }}
          aria-label="Calendar view"
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

        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
          <MuiLink
            href={CALENDAR_ADD_URL}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 0.5 }}
          >
            Add to Google Calendar
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </MuiLink>
          <MuiLink
            href={CALENDAR_ICS_URL}
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Subscribe (.ics)
          </MuiLink>
        </Stack>
      </Stack>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "grey.300",
          backgroundColor: "#fff",
          // Google's embed has a fixed internal layout; give it real height
          // rather than an aspect ratio so the month grid isn't squashed.
          height: { xs: "70svh", md: 720 },
          minHeight: 480,
        }}
      >
        <Box
          component="iframe"
          key={chosen ?? "default"}
          src={calendarEmbedUrl(mode)}
          title="IBE calendar"
          loading="lazy"
          sx={{ display: "block", width: "100%", height: "100%", border: 0 }}
        />
      </Box>

      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1.5 }}>
        Times are shown in Eastern Time. Not loading?{" "}
        <MuiLink
          href={CALENDAR_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          Open the calendar in a new tab
        </MuiLink>
        .
      </Typography>
    </Box>
  );
}
