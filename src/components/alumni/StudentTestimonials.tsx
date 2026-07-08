"use client";

import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TestimonialCarousel, { Testimonial } from "./TestimonialCarousel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials: Testimonial[] = [
  {
    text: "Participating in IBE has been one of the most beneficial experiences I have had at Ohio State. The opportunity to see how business and engineering are interconnected provided me with a depth and breadth of knowledge that will serve as a foundation for future success in business.",
    author: "Paul d'Hyver, Vice President @ Bain Capital, IBE 1st Cohort",
    imageUrl: "/testimonial/PauldHyver.png",
  },
  {
    text: "I credit so much of my professional development and success to the IBE program. It has allowed me to try various engineering and business internships. The mentorship I've received from the IBE network has been invaluable and I am so excited to take my knowledge with me into industry",
    author:
      "Rachel Sapola, Incoming Associate @ Boston Consulting Group, IBE 10th Cohort",
    imageUrl: "/testimonial/RachelSapola.jpeg",
  },
  {
    text: "IBE has not only driven me to succeed academically, but has also provided me with some of my closest friends and mentors. The interdisciplinary approach to learning has given me a unique perspective that I love and will carry throughout my career.",
    author: "Russel Heiser, Software Engineer @ Epic, IBE 10th Cohort",
    imageUrl: "/people/russelheiser.jpeg",
  },
];

export default function StudentTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        textAlign: "center",
        backgroundColor: "grey.100",
        py: { xs: "3.5rem", md: "6rem" },
        px: "1.5rem",
      }}
    >
      <Box data-reveal>
        <Typography variant="h3">Student Testimonials</Typography>
        <Box
          sx={{
            width: "56px",
            height: "2px",
            backgroundColor: "primary.main",
            mx: "auto",
            mt: "1.25rem",
          }}
        />
      </Box>
      <Box data-reveal sx={{ mt: { xs: "2rem", md: "3rem" } }}>
        <TestimonialCarousel testimonials={testimonials} />
      </Box>
    </Box>
  );
}
