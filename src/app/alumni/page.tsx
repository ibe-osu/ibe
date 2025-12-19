import Companies from "@/components/alumni/Companies";
import OurIBEAlumni from "@/components/alumni/OurIBEAlumni";
import AlumniSpotlights from "@/components/alumni/AlumniSpotlights";
import StudentTestimonials from "@/components/alumni/StudentTestimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni",
};

export default function Alumni() {
  return (
    <>
      <OurIBEAlumni />
      <Companies />
      <AlumniSpotlights />
      <StudentTestimonials />
    </>
  );
}
