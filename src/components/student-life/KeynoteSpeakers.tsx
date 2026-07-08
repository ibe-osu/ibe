"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpeakerCarousel from "./SpeakerCarousel";
import { Speaker } from "./SpeakerCard";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH, SECTION_PY } from "@/theme/layout";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Keynote Speakers Data
const speakers: Speaker[] = [
  {
    name: "Bill Baumel",
    position: "Managing Director at Ohio Innovation Fund",
    company: "Ohio Innovation Fund",
    bio: "Bill brought his 20+ years experience in venture funding to our first-year students, providing advice to them for their Freshman Cornerstone Project.",
    imageUrl: "/people/billbaumel.jpeg",
  },
  {
    name: "Dr. Renee Eveland",
    position: "Technology Manager at NASA",
    company: "NASA",
    bio: "Dr. Eveland supports the Technology Transfer Office at the NASA Glenn Research Center, looking for opportunities to license GRC technology to parties interested in finding terrestrial commercial applications for GRC inventions.",
    imageUrl: "/people/reneeeveland.jpg",
  },
  {
    name: "Joel Rathburn",
    position: "Partner at Edgewater Capital",
    company: "Edgewater Capital",
    bio: "Joel worked his way to the Senior VP of Mergers & Acquisitions at Avient, a global company with many finance and Engineering opportunities. Joel has been sharing insights and tips on how to navigate education and career paths successfully.",
    imageUrl: "/people/joelrathbun.jpg",
  },
  {
    name: "Melinda Gloriosa",
    position: "Managing Director at Rev1 Ventures",
    company: "Rev1 Ventures",
    bio: "Melinda accelerates innovation by connecting entrepreneurs with capital and resources to build high-growth tech companies, supporting early-stage founders through a startup studio and strategic partnerships.",
    imageUrl: "/people/melindagloriosa.jpeg",
  },
  {
    name: "Thomas Millea",
    position: "Partner at AMEND Consulting",
    company: "AMEND",
    bio: "Thomas works with large enterprise and upper middle market clients to create lasting business transformation, specializing in business process improvement, technology and operational strategy development, and change management.",
    imageUrl: "/people/thomasmillea.jpeg",
  },
  {
    name: "Zach Whittington",
    position: "Manager of Supply Planning at Advanced Drainage Systems",
    company: "Advanced Drainage Systems",
    bio: "Zack is responsible for production and inventory planning across the US & Canada (35 plants & 30 yards). He has lead and enhanced the value of the supply side S&OP process.",
    imageUrl: "/people/zachwhittington.jpeg",
  },
];

export default function KeynoteSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-section-reveal]")
          .forEach((el) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 28,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        backgroundColor: "grey.100",
        px: PAGE_GUTTER,
        py: SECTION_PY,
      }}
    >
      <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: "auto" }}>
        {/* Section header */}
        <Box data-section-reveal sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            component="p"
            sx={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "primary.main",
              mb: 1.5,
            }}
          >
            Speaker Series
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 1.5, textWrap: "balance" }}
          >
            Recent Keynote Speakers
          </Typography>
          <Box
            aria-hidden="true"
            sx={{
              width: "3.5rem",
              height: "3px",
              backgroundColor: "primary.main",
              mb: 2,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              maxWidth: "56ch",
            }}
          >
            IBE students attend keynote events where industry leaders and
            entrepreneurs share valuable insights.
          </Typography>
        </Box>

        {/* Speaker Carousel */}
        <Box data-section-reveal>
          <SpeakerCarousel speakers={speakers} />
        </Box>
      </Box>
    </Box>
  );
}
