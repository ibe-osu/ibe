import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FAQItem from "./FAQItem";

export const faqItems = [
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
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 9 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          Frequently Asked Questions
        </Typography>

        <Box>
          {faqItems.map((it) => (
            <FAQItem key={it.q} question={it.q} answer={it.a} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
