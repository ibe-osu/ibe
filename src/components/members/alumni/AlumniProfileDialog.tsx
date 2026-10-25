"use client";

import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type { ReactNode } from "react";
import {
  COLLEGE_LABELS,
  currentLocation,
  fullName,
  majorsLine,
  type DirectoryAlum,
  type DirectoryJob,
} from "@/lib/alumni/directory";
import { Initials, nameSx, Tag, YearBadge } from "./AlumniCard";
import OrgLogo from "./OrgLogo";

interface AlumniProfileDialogProps {
  alum: DirectoryAlum | null;
  similar: DirectoryAlum[];
  onClose: () => void;
  onOpen: (id: string) => void;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section" sx={{ pt: 3, mt: 3, borderTop: "1px solid", borderColor: "divider" }}>
      <Typography variant="overline" component="h3" sx={{ display: "block", color: "text.secondary", mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

/** One logo-led entry: a job or a school. */
function LogoRow({ name, title, lines }: { name: string; title: ReactNode; lines: ReactNode[] }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      <OrgLogo name={name} size={40} />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
          {title}
        </Typography>
        {lines.filter(Boolean).map((line, i) => (
          <Typography key={i} variant="body2" sx={{ color: "text.secondary" }}>
            {line}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

const dateRange = (j: DirectoryJob) =>
  j.start && j.end ? `${j.start} – ${j.end}` : (j.start ?? j.end ?? "");

export default function AlumniProfileDialog({ alum, similar, onClose, onOpen }: AlumniProfileDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  if (!alum) return null;

  const location = currentLocation(alum);

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alumni-profile-name"
      slotProps={{ paper: { elevation: 0 } }}
    >
      <IconButton onClick={onClose} aria-label="Close profile" sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <CloseIcon />
      </IconButton>
      {/* Keyed by person so opening a Similar IBEer starts at the top. */}
      <DialogContent key={alum.id} sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 3, sm: 4 } }}>
        <Stack direction="row" spacing={2.5} sx={{ alignItems: "flex-start", pr: 5 }}>
          <Initials alum={alum} size={72} />
          <Box sx={{ minWidth: 0 }}>
            <Typography id="alumni-profile-name" variant="h4" component="h2" sx={{ lineHeight: 1.2 }}>
              {fullName(alum)}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              <Tag large>{alum.classYear ? `Class of ${alum.classYear}` : "Class year unknown"}</Tag>
              {alum.college && (
                <Tag large accent>
                  {COLLEGE_LABELS[alum.college].short}
                </Tag>
              )}
            </Box>
            {alum.linkedinUrl && (
              <Button
                href={alum.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkedInIcon />}
                size="small"
                sx={{ mt: 1.5, px: 2 }}
              >
                LinkedIn
              </Button>
            )}
          </Box>
        </Stack>

        {alum.jobs.length > 0 && (
          <Section title="Experience">
            <Stack spacing={2.5}>
              {alum.jobs.map((j, i) => (
                <LogoRow
                  key={i}
                  name={j.company ?? j.title ?? ""}
                  title={j.title ?? j.company}
                  lines={[
                    j.title && j.company,
                    [dateRange(j), j.location ?? (i === 0 && j.end === "Present" ? location : null)]
                      .filter(Boolean)
                      .join(" · "),
                  ]}
                />
              ))}
            </Stack>
          </Section>
        )}

        <Section title="Education">
          <Stack spacing={2.5}>
            {alum.education.map((e) => (
              <LogoRow
                key={`${e.institution}-${e.program}`}
                name={e.institution}
                title={e.institution}
                lines={[e.program, e.inProgress ? "In progress" : e.year && `Class of ${e.year}`]}
              />
            ))}
            <LogoRow
              name="The Ohio State University"
              title="The Ohio State University"
              lines={[
                majorsLine(alum),
                alum.minors.length > 0 && `Minor: ${alum.minors.join(" & ")}`,
                [alum.classYear && `Class of ${alum.classYear}`, alum.college && COLLEGE_LABELS[alum.college].long]
                  .filter(Boolean)
                  .join(" · "),
              ]}
            />
          </Stack>
        </Section>

        {alum.involvements.length > 0 && (
          <Section title="Campus involvement">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {alum.involvements.map((i) => (
                <Chip key={i} label={i} variant="outlined" />
              ))}
            </Box>
          </Section>
        )}

        {similar.length > 0 && (
          <Section title="Similar IBEers">
            <Stack spacing={0.5}>
              {similar.map((s) => (
                <ButtonBase
                  key={s.id}
                  onClick={() => onOpen(s.id)}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    gap: 1.75,
                    p: 1,
                    mx: -1,
                    "@media (hover: hover)": { "&:hover": { bgcolor: "background.tint" } },
                  }}
                >
                  <Initials alum={s} size={40} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography component="span" sx={{ ...nameSx, display: "block" }}>
                      {fullName(s)}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ display: "block", color: "text.secondary" }} noWrap>
                      {[s.currentTitle, s.currentEmployer].filter(Boolean).join(" · ") || majorsLine(s)}
                    </Typography>
                  </Box>
                  <YearBadge alum={s} />
                  {s.currentEmployer && <OrgLogo name={s.currentEmployer} size={20} />}
                </ButtonBase>
              ))}
            </Stack>
          </Section>
        )}
      </DialogContent>
    </Dialog>
  );
}
