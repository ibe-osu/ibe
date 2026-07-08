import AboutUs from "@/components/about/AboutUs";
import SeniorLeadership from "@/components/about/SeniorLeadership";
import StudentLeadership from "@/components/about/StudentLeadership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the senior and student leadership of the Integrated Business & Engineering (IBE) Honors Program at The Ohio State University.",
};

export default function About() {
  return (
    <>
      <AboutUs />
      <SeniorLeadership />
      <StudentLeadership />
    </>
  );
}
