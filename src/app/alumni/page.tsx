import Companies from "@/components/alumni/Companies";
import OurIBEAlumni from "@/components/alumni/OurIBEAlumni";
import AlumniSpotlights from "@/components/alumni/AlumniSpotlights";
import StudentTestimonials from "@/components/alumni/StudentTestimonials";
import JoinBand from "@/components/home/JoinBand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "IBE alumni lead at companies like Microsoft, Goldman Sachs, Tesla, and McKinsey. Explore spotlights, testimonials, and where our graduates build their careers.",
  alternates: {
    canonical: "/alumni",
  },
};

export default function Alumni() {
  return (
    <>
      <OurIBEAlumni />
      <Companies />
      <AlumniSpotlights />
      <StudentTestimonials />
      <JoinBand />
    </>
  );
}
