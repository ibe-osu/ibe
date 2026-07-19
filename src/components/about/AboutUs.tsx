import PageHero from "@/components/general/PageHero";
import aboutImg from "../../../public/about.jpg";

export default function AboutUs() {
  return (
    <PageHero
      title="About Us"
      subtitle="We are the Integrated Business and Engineering (IBE) Honors Program at Ohio State — a tight-knit community of students who bridge business and engineering to solve real-world problems. United by curiosity and a drive to lead, we learn by doing and grow together as innovators and collaborators."
      image={aboutImg}
      imageAlt="IBE students posing together at an Ohio State event"
    />
  );
}
