"use client";

import { memo } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import {
  classLine,
  currentLocation,
  currentRole,
  fullName,
  initials,
  type DirectoryAlum,
} from "@/lib/alumni/directory";

interface AlumniCardProps {
  alum: DirectoryAlum;
  /** Why this person matched the search, when it isn't visible on the card. */
  context: string | null;
  onOpen: (id: string) => void;
}

export function Initials({ alum, size }: { alum: DirectoryAlum; size: number }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        bgcolor: "background.tint",
        border: "1px solid",
        borderColor: "divider",
        color: "primary.main",
        fontFamily: (t) => t.typography.h4.fontFamily,
        fontSize: size * 0.4,
        lineHeight: 1,
      }}
    >
      {initials(alum)}
    </Box>
  );
}

// Hairline border that turns scarlet on hover, the same language as the
// recruitment InfoCard. Hover-only so a tap doesn't leave it stuck. A div,
// not a <button>, because the content is block-level; ButtonBase still gives
// it role="button", focus, and Enter/Space.
const cardSx = {
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  textAlign: "left",
  transition: "border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  "@media (hover: hover)": { "&:hover": { borderColor: "primary.main" } },
} as const;

function Context({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }} noWrap title={text}>
      {text}
    </Typography>
  );
}

// Memoized: typing in the search box or opening a profile re-renders the
// directory, and 200 unchanged cards shouldn't re-render with it.
export const AlumniCard = memo(function AlumniCard({ alum, context, onOpen }: AlumniCardProps) {
  const location = currentLocation(alum);
  return (
    <ButtonBase
      component="div"
      onClick={() => onOpen(alum.id)}
      sx={{ ...cardSx, display: "flex", flexDirection: "column", alignItems: "stretch", p: 2.5, height: "100%" }}
    >
      <Box sx={{ display: "flex", gap: 1.75, alignItems: "flex-start" }}>
        <Initials alum={alum} size={44} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" component="span" sx={{ display: "block", lineHeight: 1.3 }}>
            {fullName(alum)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {classLine(alum)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2, minWidth: 0 }}>
        {alum.currentTitle && (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {alum.currentTitle}
          </Typography>
        )}
        {alum.currentEmployer && <Typography variant="body2">{alum.currentEmployer}</Typography>}
        {!alum.currentTitle && !alum.currentEmployer && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            No current role listed
          </Typography>
        )}
        {location && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {location}
          </Typography>
        )}
        {alum.majors.length > 0 && (
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            {alum.majors.join(", ")}
          </Typography>
        )}
        {context && (
          <Box sx={{ mt: 1 }}>
            <Context text={context} />
          </Box>
        )}
      </Box>
    </ButtonBase>
  );
});

export const AlumniRow = memo(function AlumniRow({ alum, context, onOpen }: AlumniCardProps) {
  const role = currentRole(alum);
  return (
    <ButtonBase
      component="div"
      onClick={() => onOpen(alum.id)}
      sx={{
        ...cardSx,
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "auto minmax(0, 1fr)",
          md: "auto minmax(0, 1.1fr) minmax(0, 1.6fr) minmax(0, 0.8fr)",
        },
        columnGap: 2,
        rowGap: 0.25,
        alignItems: "center",
        px: 2,
        py: 1.5,
      }}
    >
      <Box sx={{ gridRow: { xs: "span 2", md: "auto" } }}>
        <Initials alum={alum} size={36} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body1" component="span" sx={{ display: "block", fontWeight: 600, lineHeight: 1.35 }} noWrap>
          {fullName(alum)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {classLine(alum)}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 0, gridColumn: { xs: 2, md: "auto" } }}>
        <Typography variant="body2" noWrap title={role}>
          {role || "No current role listed"}
        </Typography>
        <Context text={context} />
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", display: { xs: "none", md: "block" } }} noWrap>
        {currentLocation(alum)}
      </Typography>
    </ButtonBase>
  );
});
