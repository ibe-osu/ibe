"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import InfoCard from "./InfoCard";

export default function InfoCardSection() {
  const cards = [
    {
      header: "Alumni",
      description:
        "IBE graduates have had highly coveted internships and post-grad opportunities. Find out more about where our alumni are now!",
      imageSrc: "/recruitment/alumni.png",
    },
    {
      header: "About IBE",
      description: "Learn more about our program, curriculum, and academics",
      imageSrc: "/recruitment/aboutIBE.png",
    },
    {
      header: "Schedule a Visit",
      description: "Want to sit in on an IBE course and tour our facilities?",
      imageSrc: "/recruitment/visit.png",
    },
  ];

  const bandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [bandHeight, setBandHeight] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const heights = bandRefs.current.map((el) => (el ? el.offsetHeight : 0));
      const max = heights.length ? Math.max(...heights) : 0;
      setBandHeight(max || null);
    };

    // initial measure after layout
    const id = window.setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch", // allow children to stretch to the tallest
          }}
        >
          {cards.map((c, idx) => (
            <Box
              key={c.header}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                display: "flex",
                flexDirection: "column",
                height: "100%",
                alignSelf: "stretch",
              }}
            >
              <InfoCard
                {...c}
                bandRef={(el: HTMLDivElement | null) => {
                  bandRefs.current[idx] = el;
                }}
                bandHeight={bandHeight}
              />
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
