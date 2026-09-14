import { Box } from "@mui/material";
import InfoCard from "./InfoCard";
import CARDS from "./cardsData";
import Wrap from "@/components/ui/Wrap";
import SectionHead from "@/components/ui/SectionHead";

export default function InfoCardSection() {
  return (
    <Box component="section" aria-labelledby="keep-exploring" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead id="keep-exploring" title="Keep exploring" />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
          {CARDS.map((c) => (
            <InfoCard key={c.header} {...c} />
          ))}
        </Box>
      </Wrap>
    </Box>
  );
}
