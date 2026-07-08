"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const paragraphs = [
  "Application to the IBE Program is open to prospective students previously accepted into the Ohio State University Honors Program and either the Max M. Fisher College of Business or College of Engineering. From this pool of talented candidates, IBE admits a cohort of 72 total students (36 within the IBE Traditional Track and 36 within the IBE Software Innovation Track).",
  "The application process will begin shortly after an individual has been accepted into the University Honors Program and the school pertaining to their respective major. Invitations to apply to IBE will be emailed to prospective students in waves starting in January. Please be advised that sometimes these emails can land in junk mail. Please be certain to double check your junk mail folder.",
  "IBE admission offers will be sent in waves beginning in early March. The IBE Application Deadline will be April 3, 2026. Please fill out the interest form linked below to receive more information regarding IBE, invitations to Virtual Information Sessions, and reminders about important deadlines.",
];

export default function RecruitmentHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        });
      });
    },
    { scope: heroRef },
  );

  return (
    <>
      <Box
        ref={heroRef}
        component="section"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          height: "calc(75vh - 64px)",
          minHeight: "500px",
          overflow: "hidden",
        }}
      >
        <Image
          src="/recruitment/welcome.jpeg"
          alt="IBE students at a recruitment welcome event"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Scrim for text legibility over the photo */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.38) 55%, rgba(0, 0, 0, 0.18) 100%)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
            pb: { xs: "3.5rem", md: "5rem" },
          }}
        >
          <Typography
            component="p"
            data-hero-reveal
            sx={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
              mb: { xs: 1.5, md: 2 },
            }}
          >
            Join IBE
          </Typography>
          <Typography
            component="h1"
            data-hero-reveal
            sx={{
              color: "#fff",
              fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.05,
              mb: { xs: 2, md: 2.5 },
            }}
          >
            Recruitment
            <Box component="span" sx={{ color: "primary.main" }}>
              .
            </Box>
          </Typography>
          <Box
            data-hero-reveal
            aria-hidden
            sx={{
              width: "6rem",
              height: "3px",
              backgroundColor: "secondary.main",
              mb: { xs: 2, md: 2.5 },
            }}
          />
          <Typography
            data-hero-reveal
            variant="body1"
            sx={{
              maxWidth: "42rem",
              color: "rgba(255, 255, 255, 0.92)",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.65,
              mb: { xs: 2.5, md: 3 },
            }}
          >
            Applications open to students accepted into the Ohio State Honors
            Program and the Fisher College of Business or College of
            Engineering.
          </Typography>
          <Box
            data-hero-reveal
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
                borderColor: "rgba(255, 255, 255, 0.6)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Application details, moved out of the hero into a plain content
          section matching the WhoAreWe convention used on the homepage */}
      <Box
        component="section"
        aria-labelledby="how-it-works-heading"
        sx={{
          py: { xs: "4rem", md: "6rem" },
          px: { xs: "1.5rem", sm: "3rem", md: "4rem" },
        }}
      >
        <Box sx={{ maxWidth: "760px", mx: "auto" }}>
          <Typography
            id="how-it-works-heading"
            variant="h3"
            component="h2"
            sx={{ mb: "1rem", textWrap: "balance" }}
          >
            How It Works
          </Typography>
          <Box
            aria-hidden="true"
            sx={{
              width: "3.5rem",
              height: "3px",
              backgroundColor: "primary.main",
              mb: "1.75rem",
            }}
          />
          {paragraphs.map((text, i) => (
            <Typography
              key={i}
              variant="body1"
              sx={{
                mb: 2.5,
                color: "grey.800",
                lineHeight: 1.7,
                fontSize: i === 0 ? "1.0625rem" : "1rem",
                textWrap: "pretty",
              }}
            >
              {text}
            </Typography>
          ))}
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              fontWeight: 600,
              color: "primary.main",
              letterSpacing: "0.01em",
            }}
          >
            Application deadline — April 3, 2026
          </Typography>
        </Box>
      </Box>
    </>
  );
}
