import PageHero from "@/components/general/PageHero";
import studentLifeImg from "../../../public/happenings/cleveland-1.jpeg";

export default function StudentLifeHeader() {
  return (
    <PageHero
      title="Student Life"
      subtitle="Program treks, keynote speakers, and socials — while we strive for excellence, we build lasting relationships and enjoy the journey along the way."
      image={studentLifeImg}
      imageAlt="IBE students gathered with corporate hosts during the Cleveland trek"
    />
  );
}
