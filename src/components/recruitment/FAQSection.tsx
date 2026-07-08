import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PAGE_GUTTER, CONTENT_MAX_WIDTH, SECTION_PY } from "@/theme/layout";

const faqItems = [
  {
    q: "What is the difference between IBE and IBE-SI?",
    a: "In the IBE Program, Business Majors earn an Engineering Sciences Minor and Engineering Majors earn a Business Minor. In the IBE-SI track, Business Majors earn a Computer Science Minor and Engineering Majors earn a Business Minor. Additionally, the IBE-SI project-based classes focus on software and app solutions vs. traditional design/prototypes of the IBE classes.",
  },
  {
    q: "What are the benefits of IBE compared to pursuing an engineering major/business minor or business major/engineering minor outside of the program?",
    a: "IBE offers many benefits in addition to custom coursework and dedicated faculty. IBE's small cohort size allows for students to enjoy a more personal college experience, as the same individuals will be in IBE core classes throughout all four years of college. IBE also provides a tight-knit community to students; with access to exclusive professional development, networking, and social events for IBE students.",
  },
  {
    q: "Can a student switch from IBE-SI to the IBE track and vice-versa?",
    a: "It depends on cohort size and availability within each track. Since the IBE and IBE-SI programs are honors programs, maximum capacity is 36 students per year for each track. Requests will be considered but are generally accommodated if space permits.",
  },
  {
    q: "Can a student switch from an engineering major to a business major and vice-versa?",
    a: "Yes, students can change majors within the program, but the feasibility of such a change can vary greatly depending on the completed coursework and age of a student.",
  },
  {
    q: "Should I report my ACT best score or super score?",
    a: "Report your best individual score for a single test. The IBE admissions review does not account for super score.",
  },
  {
    q: "What is the acceptance rate for IBE applications?",
    a: "IBE's acceptance rate is 10-15% depending on application volume, with roughly a 50-50 split of engineering and business majors admitted annually.",
  },
];

export default function FAQSection() {
  return (
    <Box component="section" sx={{ py: SECTION_PY, px: PAGE_GUTTER }}>
      <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, mx: "auto" }}>
        <Typography variant="h3" component="h2" sx={{ mb: "1rem" }}>
          FAQ
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            width: "3.5rem",
            height: "3px",
            backgroundColor: "primary.main",
            mb: { xs: 4, md: 6 },
          }}
        />

        <Box sx={{ display: "grid", gap: 3 }}>
        {faqItems.map((it) => (
          <Accordion
            key={it.q}
            sx={{
              color: "secondary.main",
              bgcolor: "primary.main",
              boxShadow: 0,
              borderRadius: 0,
              "&.Mui-expanded": { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />}
              sx={{
                px: 3,
                minHeight: 54,
                display: "flex",
                alignItems: "center",
                "& .MuiAccordionSummary-content": {
                  minHeight: 54,
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {it.q}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 3, pt: 2.5, pb: 3 }}>
              <Typography variant="body1">{it.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        </Box>
      </Box>
    </Box>
  );
}
