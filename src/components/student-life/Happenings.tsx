import { Box, Container, Typography } from "@mui/material";
import PhotoCarousel, { Photo } from "./PhotoCarousel";
import React from "react";
import { serifFamily } from "@/theme/fonts";

interface Event {
  title: string;
  date: string;
  descriptions: React.ReactNode[];
  photos: Photo[];
}

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
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            "&:hover": { color: "primary.dark" },
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
  return (
    <Box
      component="section"
      aria-labelledby="happenings"
      sx={{ py: { xs: 7, md: 11 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Typography variant="h2" id="happenings" sx={{ mb: { xs: 5, md: 8 } }}>
          IBE Happenings
        </Typography>

        {events.map((event, index) => {
          // Alternate the photo side so consecutive entries don't stack
          // into one repeating template.
          const photoLeft = index % 2 === 1;
          return (
            <Box
              key={event.title}
              component="article"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
                columnGap: { md: 6, lg: 10 },
                rowGap: 3,
                alignItems: "start",
                py: { xs: 5, md: 7 },
                borderTop: "1px solid",
                borderColor: "divider",
                "&:last-of-type": {
                  borderBottom: "1px solid",
                  borderBottomColor: "divider",
                },
              }}
            >
              <Box sx={{ order: { md: photoLeft ? 2 : 1 }, minWidth: 0 }}>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: serifFamily,
                    fontSize: "clamp(1.375rem, 1.6vw, 1.875rem)",
                    lineHeight: 1.1,
                    color: "primary.main",
                    mb: 1.5,
                  }}
                >
                  {event.date}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
                  {event.title}
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  {event.descriptions.map((description, descIndex) => (
                    <Typography
                      key={descIndex}
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        maxWidth: "56ch",
                        lineHeight: 1.7,
                        textWrap: "pretty",
                      }}
                    >
                      {description}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Box sx={{ order: { md: photoLeft ? 1 : 2 }, minWidth: 0 }}>
                <PhotoCarousel photos={event.photos} />
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
