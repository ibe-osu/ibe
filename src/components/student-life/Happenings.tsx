import { Box, Typography } from "@mui/material";
import React from "react";
import PhotoCarousel, { Photo } from "./PhotoCarousel";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";
import SectionHead from "@/components/ui/SectionHead";

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
      { url: "/happenings/11-25-date-party-1.jpeg", alt: "IBE Date Party - Photo 1" },
      { url: "/happenings/11-25-date-party-2.jpeg", alt: "IBE Date Party - Photo 2" },
      { url: "/happenings/11-25-date-party-3.jpeg", alt: "IBE Date Party - Photo 3" },
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
          sx={{ color: "signal.main", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          Collin Aldrich
        </Box>{" "}
        at Deloitte!
      </>,
    ],
    photos: [
      { url: "/happenings/cleveland-1.jpeg", alt: "IBE Cleveland Trip - Photo 1" },
      { url: "/happenings/cleveland-2.jpeg", alt: "IBE Cleveland Trip - Photo 2" },
      { url: "/happenings/cleveland-3.jpeg", alt: "IBE Cleveland Trip - Photo 3" },
      { url: "/happenings/cleveland-4.jpeg", alt: "IBE Cleveland Trip - Photo 4" },
    ],
  },
];

export default function Happenings() {
  return (
    <Box component="section" aria-labelledby="happenings" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead id="happenings" label="Happenings" title="Recent events" />
        <Box sx={{ display: "grid", gap: 2 }}>
          {events.map((event, index) => {
            const photoLeft = index % 2 === 1;
            return (
              <Panel
                key={event.title}
                component="article"
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 6fr) minmax(0, 6fr)" } }}
              >
                <Box sx={{ order: { md: photoLeft ? 1 : 2 }, borderBottom: { xs: "1px solid", md: 0 }, borderLeft: { md: photoLeft ? 0 : "1px solid" }, borderRight: { md: photoLeft ? "1px solid" : 0 }, borderColor: "divider" }}>
                  <PhotoCarousel photos={event.photos} />
                </Box>
                <Box sx={{ order: { md: photoLeft ? 2 : 1 }, p: { xs: 2.5, md: 4 }, display: "grid", gap: 1.5, alignContent: "center" }}>
                  <Label sx={{ color: "signal.main" }}>{event.date}</Label>
                  <Typography variant="h3" component="h3">
                    {event.title}
                  </Typography>
                  {event.descriptions.map((description, i) => (
                    <Typography key={i} variant="body2" sx={{ color: "text.secondary", maxWidth: "56ch", textWrap: "pretty" }}>
                      {description}
                    </Typography>
                  ))}
                </Box>
              </Panel>
            );
          })}
        </Box>
      </Wrap>
    </Box>
  );
}
