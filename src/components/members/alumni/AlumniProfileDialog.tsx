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
  classLine,
  COLLEGE_LABELS,
  currentLocation,
  currentRole,
  fullName,
  type DirectoryAlum,
  type DirectoryJob,
} from "@/lib/alumni/directory";
import { Initials } from "./AlumniCard";

interface AlumniProfileDialogProps {
  alum: DirectoryAlum | null;
  similar: DirectoryAlum[];
  onClose: () => void;
  onOpen: (id: string) => void;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section" sx={{ pt: 3, mt: 3, borderTop: "1px solid", borderColor: "divider" }}>
      <Typography
        variant="overline"
        component="h3"
        sx={{ display: "block", color: "primary.main", mb: 1.5 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

const dateRange = (j: DirectoryJob) =>
  j.start && j.end ? `${j.start} – ${j.end}` : (j.start ?? j.end ?? "");

function Experience({ jobs }: { jobs: DirectoryJob[] }) {
  return (
    <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {jobs.map((j, i) => (
        <Box
          component="li"
          key={i}
          sx={{
            position: "relative",
            pl: 2.5,
            pb: i === jobs.length - 1 ? 0 : 2,
            // Square marker on a 2px grey.300 spine, like the recruitment and
            // four-year timelines.
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 8,
              width: 8,
              height: 8,
              bgcolor: j.end === "Present" ? "primary.main" : "grey.400",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              left: 3,
              top: 20,
              bottom: 0,
              width: "2px",
              bgcolor: "grey.300",
              display: i === jobs.length - 1 ? "none" : "block",
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
            {j.title ?? j.company}
          </Typography>
          {j.title && j.company && <Typography variant="body2">{j.company}</Typography>}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {[dateRange(j), j.location].filter(Boolean).join(" · ")}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function AlumniProfileDialog({ alum, similar, onClose, onOpen }: AlumniProfileDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  if (!alum) return null;

  const role = currentRole(alum);
  const location = currentLocation(alum);
  const undergrad = [
    alum.majors.length > 0 && alum.majors.join(" and "),
    alum.minors.length > 0 && `Minor in ${alum.minors.join(" and ")}`,
  ].filter(Boolean);

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alumni-profile-name"
    >
      <IconButton
        onClick={onClose}
        aria-label="Close profile"
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 3, sm: 4 } }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", pr: 5 }}>
          <Initials alum={alum} size={64} />
          <Box sx={{ minWidth: 0 }}>
            <Typography id="alumni-profile-name" variant="h4" component="h2">
              {fullName(alum)}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {classLine(alum)}
            </Typography>
          </Box>
        </Stack>

        {role && (
          <Box sx={{ mt: 2.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {role}
            </Typography>
            {location && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {location}
              </Typography>
            )}
          </Box>
        )}

        {alum.linkedinUrl && (
          <Button
            variant="outlined"
            href={alum.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LinkedInIcon />}
            sx={{ mt: 2.5 }}
          >
            View on LinkedIn
          </Button>
        )}

        {alum.jobs.length > 0 && (
          <Section title="Experience">
            <Experience jobs={alum.jobs} />
          </Section>
        )}

        <Section title="Education">
          <Stack spacing={1.5}>
            {alum.education.map((e) => (
              <Box key={`${e.institution}-${e.program}`}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {e.institution}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {[e.program, e.inProgress ? "In progress" : e.year].filter(Boolean).join(" · ")}
                </Typography>
              </Box>
            ))}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                The Ohio State University
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {[alum.college && COLLEGE_LABELS[alum.college].long, alum.classYear]
                  .filter(Boolean)
                  .join(" · ")}
              </Typography>
              {undergrad.map((line) => (
                <Typography key={String(line)} variant="body2" sx={{ color: "text.secondary" }}>
                  {line}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Section>

        {alum.involvements.length > 0 && (
          <Section title="Involvement">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {alum.involvements.map((i) => (
                <Chip key={i} label={i} variant="outlined" />
              ))}
            </Box>
          </Section>
        )}

        {similar.length > 0 && (
          <Section title="Similar IBEers">
            <Stack spacing={1}>
              {similar.map((s) => (
                <ButtonBase
                  key={s.id}
                  onClick={() => onOpen(s.id)}
                  sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                    gap: 1.5,
                    p: 1,
                    mx: -1,
                    "@media (hover: hover)": { "&:hover": { bgcolor: "background.tint" } },
                  }}
                >
                  <Initials alum={s} size={36} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body1" component="span" sx={{ display: "block", fontWeight: 600 }}>
                      {fullName(s)}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ display: "block", color: "text.secondary" }} noWrap>
                      {[classLine(s), s.currentEmployer].filter(Boolean).join(" · ")}
                    </Typography>
                  </Box>
                </ButtonBase>
              ))}
            </Stack>
          </Section>
        )}
      </DialogContent>
    </Dialog>
  );
}
