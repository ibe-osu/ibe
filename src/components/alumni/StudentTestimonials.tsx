import { Box } from "@mui/material";
import TestimonialCarousel, { Testimonial } from "./TestimonialCarousel";
import Wrap from "@/components/ui/Wrap";
import SectionHead from "@/components/ui/SectionHead";

const testimonials: Testimonial[] = [
  {
    text: "Participating in IBE has been one of the most beneficial experiences I have had at Ohio State. The opportunity to see how business and engineering are interconnected provided me with a depth and breadth of knowledge that will serve as a foundation for future success in business.",
    author: "Paul d'Hyver, Vice President @ Bain Capital, IBE 1st Cohort",
    imageUrl: "/testimonial/PauldHyver.png",
  },
  {
    text: "I credit so much of my professional development and success to the IBE program. It has allowed me to try various engineering and business internships. The mentorship I've received from the IBE network has been invaluable and I am so excited to take my knowledge with me into industry",
    author: "Rachel Sapola, Incoming Associate @ Boston Consulting Group, IBE 10th Cohort",
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
    <Box component="section" aria-labelledby="student-testimonials" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead id="student-testimonials" label="In their words" title="Student testimonials" />
        <TestimonialCarousel testimonials={testimonials} />
      </Wrap>
    </Box>
  );
}
