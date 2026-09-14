import { Box } from "@mui/material";
import CompanyScroller from "./CompanyScroller";
import Wrap from "@/components/ui/Wrap";
import SectionHead from "@/components/ui/SectionHead";

export default function Companies() {
  return (
    <Box component="section" aria-labelledby="alumni-opportunities" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap>
        <SectionHead
          id="alumni-opportunities"
          label="Where they landed"
          title="One program. Endless opportunities."
          lede="IBE graduates have received highly sought internships and post graduation opportunities spanning geographies (including Chicago, Silicon Valley, New York City, and Sydney), and industries (including tech, consulting, finance, industrial goods, and healthcare)"
        />
      </Wrap>
      <CompanyScroller />
    </Box>
  );
}
