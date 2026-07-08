import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
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

        <Box
          sx={{
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          {faqItems.map((it, i) => (
            <Accordion
              key={it.q}
              square
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "transparent",
                borderTop: i === 0 ? "none" : "1px solid",
                borderColor: "grey.300",
                transition: "background-color 0.25s ease",
                "&::before": { display: "none" },
                // Resting hover: quiet grey wash + scarlet question text
                "&:not(.Mui-expanded):hover": { bgcolor: "grey.100" },
                "&:not(.Mui-expanded):hover .MuiTypography-root": {
                  color: "primary.main",
                },
                // Open state: scarlet fills the row, contents invert to white
                "&.Mui-expanded": {
                  bgcolor: "primary.main",
                  "& .MuiTypography-root": { color: "#fff" },
                  "& .MuiAccordionSummary-expandIconWrapper": { color: "#fff" },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<AddIcon />}
                sx={{
                  px: { xs: 2.5, md: 3.5 },
                  minHeight: 68,
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                    pr: 2,
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "primary.main",
                    transition: "transform 0.25s ease, color 0.25s ease",
                  },
                  // Plus rotates into a cross when the row opens
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(135deg)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "-2px",
                    bgcolor: "transparent",
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transition: "none",
                    },
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.0625rem" },
                    fontWeight: 600,
                    lineHeight: 1.45,
                    transition: "color 0.25s ease",
                  }}
                >
                  {it.q}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{ px: { xs: 2.5, md: 3.5 }, pt: 0, pb: 3 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.92)",
                    lineHeight: 1.7,
                    maxWidth: "68ch",
                  }}
                >
                  {it.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
