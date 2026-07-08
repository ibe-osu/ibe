import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const paragraphs = [
  "Application to the IBE Program is open to prospective students previously accepted into the Ohio State University Honors Program and either the Max M. Fisher College of Business or College of Engineering. From this pool of talented candidates, IBE admits a cohort of 72 total students (36 within the IBE Traditional Track and 36 within the IBE Software Innovation Track).",
  "The application process will begin shortly after an individual has been accepted into the University Honors Program and the school pertaining to their respective major. Invitations to apply to IBE will be emailed to prospective students in waves starting in January. Please be advised that sometimes these emails can land in junk mail. Please be certain to double check your junk mail folder.",
  "IBE admission offers will be sent in waves beginning in early March. The IBE Application Deadline will be April 3, 2026. Please fill out the interest form linked below to receive more information regarding IBE, invitations to Virtual Information Sessions, and reminders about important deadlines.",
];

export default function RecruitmentHero() {
  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2.5, sm: 4, md: 10 },
        pt: { xs: 5, md: 10 },
        pb: { xs: 6, md: 12 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
          alignItems: { md: "flex-start" },
        }}
      >
        <Box sx={{ flex: "1 1 55%", minWidth: 0 }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
              lineHeight: 1.08,
              mb: 3,
            }}
          >
            Recruitment
            <Box component="span" sx={{ color: "primary.main" }}>
              .
            </Box>
          </Typography>

          {paragraphs.map((text, i) => (
            <Typography
              key={i}
              variant="body1"
              sx={{
                mb: 2.5,
                maxWidth: "62ch",
                lineHeight: 1.65,
                fontSize: i === 0 ? { xs: "1.0625rem", md: "1.125rem" } : "1rem",
              }}
            >
              {text}
            </Typography>
          ))}

          <Typography
            variant="body2"
            sx={{
              mt: 4,
              mb: 2,
              fontWeight: 600,
              color: "primary.main",
              letterSpacing: "0.01em",
            }}
          >
            Application deadline — April 3, 2026
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button
              component={Link}
              href="https://forms.gle/hbkbG9sRqqBhPeag8"
              target="_blank"
              rel="noopener"
              variant="contained"
              sx={{
                px: 3.5,
                py: 1.25,
                fontWeight: 600,
                "&:hover": { bgcolor: "#8e0a24" },
              }}
            >
              IBE Interest Form
            </Button>

            <Button
              component="a"
              href="mailto:ohiostateibe@osu.edu"
              variant="outlined"
              sx={{
                px: 3.5,
                py: 1.25,
                fontWeight: 600,
                borderColor: "grey.400",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  bgcolor: "transparent",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { xs: "none", md: "0 0 44%" },
            width: "100%",
            alignSelf: { md: "flex-start" },
            mt: { md: 9 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              aspectRatio: "4/3",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src="/recruitment/welcome.jpeg"
              alt="IBE students at a recruitment welcome event"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width:900px) 100vw, 44vw"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
