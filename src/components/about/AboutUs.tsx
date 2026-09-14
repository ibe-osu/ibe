import PageHero from "@/components/general/PageHero";
import aboutImg from "../../../public/about.jpg";

export default function AboutUs() {
  return (
    <PageHero
      title="About IBE"
      subtitle="We are the Integrated Business and Engineering (IBE) Honors Program at Ohio State — a tight-knit community of students who bridge business and engineering to solve real-world problems. United by curiosity and a drive to lead, we learn by doing and grow together as innovators and collaborators."
      image={aboutImg}
      imageAlt="IBE students working together in a classroom at Ohio State"
      imageTag="The cohort · In class"
    />
  );
}
