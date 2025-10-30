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

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {cards.map((c) => (
            <Box key={c.header} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
              <InfoCard {...c} />
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
