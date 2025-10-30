import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqItems = [
  {
    q: "What do you need to be eligible for the IBE Program?",
    a: "Placeholder answer — replace this with the real eligibility details.",
  },
  { q: "I am already at OSU. Can I apply to join IBE?", a: "Placeholder answer." },
  { q: "Are you allowed to switch your major when in IBE?", a: "Placeholder answer." },
  { q: "I applied to Scholars instead of Honors. Can I apply to join IBE?", a: "Placeholder answer." },
  { q: "Does the IBE Program allow students to go on Co-op?", a: "Placeholder answer." },
  { q: "How many students are admitted into the IBE Program each year?", a: "Placeholder answer." },
];

export default function FAQSection() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 10 }, maxWidth: 1100, mx: "auto" }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        FAQ
      </Typography>

      <Box sx={{ display: "grid", gap: 3 }}>
        {faqItems.map((it) => (
          <Accordion
            key={it.q}
            sx={{
              bgcolor: "primary.light",
              boxShadow: 0,
              borderRadius: 0,
              "&.Mui-expanded": { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 3,
                minHeight: 54,
                display: "flex",
                alignItems: "center",
                "& .MuiAccordionSummary-content": { minHeight: 54, display: "flex", alignItems: "center" },
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{it.q}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 2.5, pb: 3 }}>
              <Typography>{it.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
