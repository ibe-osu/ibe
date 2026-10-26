"use client";

import { memo, type ReactNode } from "react";
import { Box, ButtonBase, Chip, IconButton, Typography, type SxProps, type Theme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  COLLEGE_LABELS,
  classLine,
  currentLocation,
  fullName,
  initials,
  majorsLine,
  type DirectoryAlum,
} from "@/lib/alumni/directory";
import { serif } from "@/theme/theme";
import OrgLogo from "./OrgLogo";
import Tile from "./Tile";

interface AlumniCardProps {
  alum: DirectoryAlum;
  /** Why this person matched the search, when it isn't visible on the card. */
  context: string | null;
  onOpen: (id: string) => void;
}

/** A person's (or a school's) name in the directory's serif. */
export const nameSx = { fontFamily: serif, fontSize: "1.1rem", lineHeight: 1.3 } as const;

export const Initials = ({ alum, size }: { alum: DirectoryAlum; size: number }) => (
  <Tile text={initials(alum)} size={size} />
);

/** Small tinted label: the class and college badges on cards and profiles. */
export function Tag({ children, accent, large }: { children: ReactNode; accent?: boolean; large?: boolean }) {
  return (
    <Box
      component="span"
      sx={{
        px: large ? 1.25 : 0.75,
        py: large ? 0.5 : 0.25,
        fontSize: large ? "0.875rem" : "0.75rem",
        lineHeight: 1.4,
        bgcolor: "background.tint",
        color: accent ? "primary.main" : "text.secondary",
        fontWeight: accent ? 700 : 400,
      }}
    >
      {children}
    </Box>
  );
}

/** "'22" plus an ENG / BUS tag, top right of a card or similar-profile row. */
export function YearBadge({ alum }: { alum: DirectoryAlum }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
      {alum.classYear && (
        <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
          &rsquo;{String(alum.classYear).slice(2)}
        </Typography>
      )}
      {alum.college && <Tag accent>{COLLEGE_LABELS[alum.college].abbr}</Tag>}
    </Box>
  );
}

function Context({ text, sx }: { text: string | null; sx?: SxProps<Theme> }) {
  if (!text) return null;
  return (
    <Typography
      variant="body2"
      sx={[{ color: "text.secondary", fontStyle: "italic" }, ...(Array.isArray(sx) ? sx : [sx])]}
      noWrap
      title={text}
    >
      {text}
    </Typography>
  );
}

/** Logo, title, then "Company · City": the current role on a card or list row. */
function CurrentRole({ alum, logoSize }: { alum: DirectoryAlum; logoSize: number }) {
  const location = currentLocation(alum);
  if (!alum.currentTitle && !alum.currentEmployer) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {location || "No current role listed"}
      </Typography>
    );
  }
  return (
    <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start", minWidth: 0 }}>
      {alum.currentEmployer && (
        <Box sx={{ mt: 0.25 }}>
          <OrgLogo name={alum.currentEmployer} size={logoSize} />
        </Box>
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontFamily: serif, fontSize: "1rem", lineHeight: 1.35 }}>
          {alum.currentTitle ?? alum.currentEmployer}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {[alum.currentTitle && alum.currentEmployer, location].filter(Boolean).join(" · ")}
        </Typography>
      </Box>
    </Box>
  );
}

// Hairline frame that turns scarlet on hover (hover-only, so a tap doesn't
// leave it stuck), shared by the card and the list row.
const surfaceSx = {
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  transition: "border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  "@media (hover: hover)": { "&:hover": { borderColor: "primary.main" } },
} as const;

const MAX_CHIPS = 2;

// The name is the card's button; its ::after stretches over the whole card so
// a click anywhere opens the profile, while the LinkedIn link (raised above
// it) stays its own link instead of being nested inside a button. The card
// draws the focus ring when that button has keyboard focus.
export const AlumniCard = memo(function AlumniCard({ alum, context, onOpen }: AlumniCardProps) {
  const extra = alum.involvements.length - MAX_CHIPS;
  return (
    <Box
      component="article"
      sx={{
        ...surfaceSx,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:has(.alum-open.Mui-focusVisible)": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
      }}
    >
      <Box sx={{ p: 2.5, pb: 2 }}>
        <Box sx={{ display: "flex", gap: 1.75 }}>
          <Initials alum={alum} size={48} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
              <ButtonBase
                className="alum-open"
                disableRipple
                onClick={() => onOpen(alum.id)}
                aria-label={`${fullName(alum)}, ${classLine(alum)}. Open profile`}
                sx={{
                  ...nameSx,
                  fontSize: "1.2rem",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  // ButtonBase is position: relative by default, which would
                  // pin the ::after to the name and leave the card unclickable.
                  // Keep anything between here and the article unpositioned
                  // too, or the click area shrinks to that box.
                  position: "static",
                  "&.Mui-focusVisible": { outline: "none" },
                  "&::after": { content: '""', position: "absolute", inset: 0 },
                }}
              >
                {fullName(alum)}
              </ButtonBase>
              <YearBadge alum={alum} />
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {majorsLine(alum)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <CurrentRole alum={alum} logoSize={24} />
        </Box>
        <Context text={context} sx={{ mt: 1 }} />
      </Box>

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2.5,
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
          minWidth: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, minWidth: 0, overflow: "hidden" }}>
          {alum.involvements.slice(0, MAX_CHIPS).map((i) => (
            <Chip key={i} label={i} size="small" title={i} sx={{ minWidth: 0, maxWidth: "45%", bgcolor: "background.tint" }} />
          ))}
          {extra > 0 && (
            <Typography variant="body2" component="span" sx={{ color: "text.secondary", flexShrink: 0 }}>
              +{extra}
            </Typography>
          )}
        </Box>
        {alum.linkedinUrl && (
          <IconButton
            component="a"
            href={alum.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            aria-label={`${fullName(alum)} on LinkedIn`}
            sx={{ flexShrink: 0, position: "relative", zIndex: 1, color: "text.secondary", "@media (hover: hover)": { "&:hover": { color: "primary.main" } } }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
});

// The row has no link inside it, so unlike the card the whole row can simply
// be the button.
export const AlumniRow = memo(function AlumniRow({ alum, context, onOpen }: AlumniCardProps) {
  return (
    <ButtonBase
      component="div"
      onClick={() => onOpen(alum.id)}
      sx={{
        ...surfaceSx,
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "auto minmax(0, 1fr)",
          md: "auto minmax(0, 1fr) minmax(0, 1.4fr) auto",
        },
        columnGap: 2,
        rowGap: 1,
        alignItems: "center",
        px: 2,
        py: 1.5,
        textAlign: "left",
      }}
    >
      <Box sx={{ gridRow: { xs: "span 2", md: "auto" }, alignSelf: "start" }}>
        <Initials alum={alum} size={40} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography component="span" sx={{ ...nameSx, display: "block" }} noWrap>
          {fullName(alum)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {majorsLine(alum) || classLine(alum)}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 0, gridColumn: { xs: 2, md: "auto" } }}>
        <CurrentRole alum={alum} logoSize={20} />
        <Context text={context} />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <YearBadge alum={alum} />
      </Box>
    </ButtonBase>
  );
});
