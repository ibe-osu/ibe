import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function RecruitmentHero() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 0, sm: 0, md: 6 },
          alignItems: { xs: "stretch", md: "flex-start" },
          overflow: "visible",
          px: { xs: 2, sm: 3, md: 10 },
          py: { xs: 3, md: 8 },
          pb: { xs: 1, md: 8 },
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: 0, md: 320, lg: 400 },
            maxWidth: { xs: "100%", sm: "90%", md: "60ch" },
            mx: { xs: "auto", md: 0 },
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              maxWidth: { xs: "100%", sm: "90%", md: "60ch" },
            }}
          >
            Recruitment
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
              lineHeight: 1.5,
              maxWidth: { xs: "100%", sm: "90%", md: "60ch" },
            }}
          >
            Application to the IBE Program is open to prospective students
            previously accepted into the Ohio State University Honors Program
            and either the Max M. Fisher College of Business or College of
            Engineering. From this pool of talented candidates, IBE admits a
            cohort of 72 total students (36 within the IBE Traditional Track and
            36 within the IBE Software Innovation Track).
            <br />
            <br />
            The application process will begin shortly after an individual has
            been accepted into the University Honors Program and the school
            pertaining to their respective major. Invitations to apply to IBE
            will be emailed to prospective students in waves starting in
            January. Please be advised that sometimes these emails can land in
            junk mail. Please be certain to double check your junk mail folder.
            <br />
            <br />
            IBE admission offers will be sent in waves beginning in early March.
            The IBE Application Deadline will be April 3, 2026. Please fill out
            the interest form linked below to receive more information regarding
            IBE, invitations to Virtual Information Sessions, and reminders
            about important deadlines.
          </Typography>

          {/* In-line image for mobile/tablet */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              width: { xs: "100%", sm: "90%", md: 480 },
              maxWidth: 600,
              aspectRatio: "4/3",
              position: "relative",
              mx: "auto",
              my: 3,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Image
              src="/recruitment/welcome.jpeg"
              alt="Prospective students visiting the IBE Honors Program at Ohio State"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width:900px) 100vw, 480px"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mt: 2,
              width: "100%",
              justifyContent: { xs: "center", sm: "center", md: "flex-start" },
              alignItems: "center",
            }}
          >
            <Button
              component="a"
              href="https://forms.gle/hbkbG9sRqqBhPeag8"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              IBE Interest Form
            </Button>

            <Button
              component="a"
              href="mailto:ohiostateibe@osu.edu"
              variant="outlined"
              color="primary"
            >
              Contact Us
            </Button>
          </Box>
        </Box>

        {/* Right column image (desktop) */}
        <Box
          sx={{
            flex: { xs: "none", md: "0 0 48%" },
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            alignItems: "flex-start",
            pl: { md: 2, lg: 4 },
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              aspectRatio: "4/3",
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              mt: { md: 8, lg: 10 },
            }}
          >
            <Image
              src="/recruitment/welcome.jpeg"
              alt="Prospective students visiting the IBE Honors Program at Ohio State"
              fill
              style={{ objectFit: "cover" }}
              sizes="(min-width:900px) 600px, 480px"
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          bgcolor: "primary.main",
          color: "common.white",
          textAlign: "center",
          py: { xs: 4, md: 6 },
          mt: 6,
        }}
      >
        <Typography variant="h3" component="h2" sx={{ color: "common.white" }}>
          Learn More About IBE
        </Typography>
      </Box>
    </>
  );
}
