import { Box, Typography, Divider } from "@mui/material";
import PhotoCarousel, { Photo } from "./PhotoCarousel";
import React from "react";

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
    date: "4/11/25",
    descriptions: [
      "IBE certainly made our Date Party one to remember! From the great music and dancing to the amazing energy and unforgettable moments, the night was a huge success. Until next time, keep the memories alive and the good vibes going! Thanks to Buckeye Undergraduate Consulting Club, Students Consulting for Nonprofit Organizations, and Ohio State Business Builders for partnering with us on this exciting event!",
    ],
    photos: [
      { url: "/happenings/date-party-1.jpg", alt: "IBE Date Party - Photo 1" },
      { url: "/happenings/date-party-2.jpg", alt: "IBE Date Party - Photo 2" },
      { url: "/happenings/date-party-3.jpg", alt: "IBE Date Party - Photo 3" },
      { url: "/happenings/date-party-4.jpg", alt: "IBE Date Party - Photo 4" },
      { url: "/happenings/date-party-5.jpg", alt: "IBE Date Party - Photo 5" },
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
          component="span"
          sx={{
            color: "primary.main",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Collin Aldrich
        </Box>{" "}
        at Deloitte!
      </>,
    ],
    photos: [
      { url: "/happenings/cleveland-1.jpg", alt: "IBE Cleveland Trip - Photo 1" },
      { url: "/happenings/cleveland-2.jpg", alt: "IBE Cleveland Trip - Photo 2" },
      { url: "/happenings/cleveland-3.jpg", alt: "IBE Cleveland Trip - Photo 3" },
      { url: "/happenings/cleveland-4.jpg", alt: "IBE Cleveland Trip - Photo 4" },
      { url: "/happenings/cleveland-5.jpg", alt: "IBE Cleveland Trip - Photo 5" },
    ],
  },
];

export default function Happenings() {
  return (
    <Box
      sx={{
        position: "relative",
        left: "50%",
        width: "100vw",
        ml: "-50vw",
        mr: "-50vw",
        backgroundColor: "background.paper",
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "secondary.main",
          py: { xs: 3, md: 4 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ letterSpacing: 1.5 }}>
          IBE Happenings:
        </Typography>
      </Box>

      {/* Content Container */}
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        {events.map((event, index) => {
          // Alternate layout: even indices have photo on right, odd indices have photo on left
          const isPhotoOnLeft = index % 2 !== 0;
          const textAlign = isPhotoOnLeft ? "left" : "right";

          const textContent = (
            <Box
              sx={{
                flex: { xs: "1", md: "0 0 45%" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: textAlign,
                order: { xs: 1, md: isPhotoOnLeft ? 2 : 1 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  textAlign: textAlign,
                }}
              >
                {event.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                  textAlign: textAlign,
                }}
              >
                {event.date}
              </Typography>
              {event.descriptions.map((description, descIndex) => (
                <Typography
                  key={descIndex}
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: "text.primary",
                    textAlign: textAlign,
                  }}
                >
                  {description}
                </Typography>
              ))}
            </Box>
          );

          const photoContent = (
            <Box
              sx={{
                flex: { xs: "1", md: "0 0 50%" },
                order: { xs: 2, md: isPhotoOnLeft ? 1 : 2 },
              }}
            >
              <PhotoCarousel photos={event.photos} />
            </Box>
          );

          return (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 3, md: 4 },
                }}
              >
                {isPhotoOnLeft ? (
                  <>
                    {photoContent}
                    {textContent}
                  </>
                ) : (
                  <>
                    {textContent}
                    {photoContent}
                  </>
                )}
              </Box>
              {index < events.length - 1 && (
                <Divider
                  sx={{
                    my: { xs: 4, md: 6 },
                    borderColor: "grey.400",
                    borderWidth: 1,
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
