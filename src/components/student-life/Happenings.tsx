"use client";

import { useRef } from "react";
import { Box, Typography, Divider } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PhotoCarousel, { Photo } from "./PhotoCarousel";
import React from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Event data structure
interface Event {
  title: string;
  date: string;
  descriptions: React.ReactNode[];
  photos: Photo[];
}

// Events content
const events: Event[] = [
  {
    title: "IBE Date Party!",
    date: "11/14/25",
    descriptions: [
      "IBE certainly made our Date Party one to remember! From the great music and dancing to the amazing energy and unforgettable moments, the night was a huge success. Until next time, keep the memories alive and the good vibes going! Thanks to Buckeye Undergraduate Consulting Club, Students Consulting for Nonprofit Organizations, Women in Business, and Scarlet Investment Group for partnering with us on this exciting event!",
    ],
    photos: [
      {
        url: "/happenings/11-25-date-party-1.jpeg",
        alt: "IBE Date Party - Photo 1",
      },
      {
        url: "/happenings/11-25-date-party-2.jpeg",
        alt: "IBE Date Party - Photo 2",
      },
      {
        url: "/happenings/11-25-date-party-3.jpeg",
        alt: "IBE Date Party - Photo 3",
      },
    ],
  },
  {
    title: "IBE Goes to Cleveland!",
    date: "3/5/25 - 3/7/25",
    descriptions: [
      "IBE students recently took a trek to Cleveland, where we met with Deloitte, Sherwin-Williams, and Encore Venture Labs. The trip included a networking event with industry professionals and alumni, plus an exciting chance to see the Cavaliers secure a big win!",
      <>
        Huge thank-you to IBE alum{" "}
        <Box
          component="a"
          href="https://www.linkedin.com/in/collin-aldrich-b17108164/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            cursor: "pointer",
          }}
        >
          Collin Aldrich
        </Box>{" "}
        at Deloitte!
      </>,
    ],
    photos: [
      {
        url: "/happenings/cleveland-1.jpeg",
        alt: "IBE Cleveland Trip - Photo 1",
      },
      {
        url: "/happenings/cleveland-2.jpeg",
        alt: "IBE Cleveland Trip - Photo 2",
      },
      {
        url: "/happenings/cleveland-3.jpeg",
        alt: "IBE Cleveland Trip - Photo 3",
      },
      {
        url: "/happenings/cleveland-4.jpeg",
        alt: "IBE Cleveland Trip - Photo 4",
      },
    ],
  },
];

export default function Happenings() {
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
        backgroundColor: "background.paper",
        px: { xs: 3, sm: 5, md: 8 },
        py: { xs: 7, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Section header */}
        <Box data-section-reveal sx={{ mb: { xs: 5, md: 8 } }}>
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
            On &amp; Off Campus
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 1.5, textWrap: "balance" }}
          >
            IBE Happenings
          </Typography>
          <Box
            aria-hidden="true"
            sx={{
              width: "3.5rem",
              height: "3px",
              backgroundColor: "primary.main",
            }}
          />
        </Box>

        {events.map((event, index) => {
          // Alternate layout: photos swap sides each event, but text stays
          // left-aligned for readability.
          const isPhotoOnLeft = index % 2 !== 0;

          return (
            <React.Fragment key={index}>
              <Box
                data-section-reveal
                component="article"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "5fr 6fr" },
                  gap: { xs: 3, md: 8 },
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    order: { xs: 1, md: isPhotoOnLeft ? 2 : 1 },
                  }}
                >
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "primary.main",
                    }}
                  >
                    {event.date}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.75rem", md: "2.125rem" },
                      lineHeight: 1.2,
                      color: "text.primary",
                    }}
                  >
                    {event.title}
                  </Typography>
                  {event.descriptions.map((description, descIndex) => (
                    <Typography
                      key={descIndex}
                      variant="body1"
                      sx={{
                        lineHeight: 1.75,
                        color: "text.primary",
                        maxWidth: "62ch",
                      }}
                    >
                      {description}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ order: { xs: 2, md: isPhotoOnLeft ? 1 : 2 } }}>
                  <PhotoCarousel
                    photos={event.photos}
                    label={`${event.title} photos`}
                  />
                </Box>
              </Box>
              {index < events.length - 1 && (
                <Divider
                  sx={{
                    my: { xs: 6, md: 9 },
                    borderColor: "grey.300",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
