import { Box, Container, Typography } from "@mui/material";
import TestimonialCarousel, { Testimonial } from "./TestimonialCarousel";

const testimonials: Testimonial[] = [
  {
    text: "Participating in IBE has been one of the most beneficial experiences I have had at Ohio State. The opportunity to see how business and engineering are interconnected provided me with a depth and breadth of knowledge that will serve as a foundation for future success in business.",
    author: "Paul d'Hyver, Vice President @ Bain Capital, IBE 1st Cohort",
    imageUrl: "/testimonial/PauldHyver.png",
  },
  {
    text: "I credit so much of my professional development and success to the IBE program. It has allowed me to try various engineering and business internships. The mentorship I've received from the IBE network has been invaluable and I am so excited to take my knowledge with me into industry",
    author:
      "Rachel Sapola, Incoming Associate @ Boston Consulting Group, IBE 10th Cohort",
    imageUrl: "/testimonial/RachelSapola.jpeg",
  },
  {
    text: "IBE has not only driven me to succeed academically, but has also provided me with some of my closest friends and mentors. The interdisciplinary approach to learning has given me a unique perspective that I love and will carry throughout my career.",
    author: "Russel Heiser, Software Engineer @ Epic, IBE 10th Cohort",
    imageUrl: "/people/russelheiser.jpeg",
  },
];

export default function StudentTestimonials() {
  return (
    <Box
      component="section"
      aria-labelledby="student-testimonials"
      sx={{ py: { xs: 7, md: 11 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" },
            columnGap: { md: 6, lg: 10 },
            rowGap: 4,
            alignItems: "start",
          }}
        >
          <Box sx={{ position: { md: "sticky" }, top: { md: 104 } }}>
            <Typography
              variant="h2"
              id="student-testimonials"
              sx={{ maxWidth: "10ch" }}
            >
              Student Testimonials
            </Typography>
          </Box>
          <TestimonialCarousel testimonials={testimonials} />
        </Box>
      </Container>
    </Box>
  );
}
