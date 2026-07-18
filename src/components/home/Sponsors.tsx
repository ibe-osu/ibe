import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { SPONSORS } from "@/data/sponsors";
import Reveal from "@/components/general/Reveal";

export default function Sponsors() {
  return (
    <Box
      component="section"
      aria-label="Program sponsors"
      sx={{
        py: { xs: 6, md: 9 },
        backgroundColor: "#fff",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Program Sponsors
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: { xs: 4, md: 5 },
            mx: "auto",
            maxWidth: "55ch",
          }}
        >
          Industry partners who invest in the next generation of business and
          engineering leaders.
        </Typography>
        <Reveal
          variant="stagger"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: { xs: 4, md: 7 },
            rowGap: { xs: 3, md: 4 },
          }}
        >
          {SPONSORS.map((sponsor) => (
            <Box
              key={sponsor.name}
              sx={{
                display: "flex",
                transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                width={150}
                height={80}
                style={{
                  maxWidth: "150px",
                  maxHeight: "80px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Reveal>
      </Container>
    </Box>
  );
}
