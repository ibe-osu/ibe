import PageHero from "@/components/general/PageHero";
import alumniImg from "../../../public/alumni.jpg";

export default function OurIBEAlumni() {
  return (
    <PageHero
      title="Our IBE Alumni"
      subtitle="A network of graduates leading in engineering, consulting, finance, and technology across the country."
      image={alumniImg}
      imageAlt="IBE alumni gathered at a program reunion"
      imageTag="Alumni · Reunion"
      objectPosition="top"
    />
  );
}
