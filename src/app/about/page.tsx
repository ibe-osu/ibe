import AboutUs from "@/components/about/AboutUs";
import SeniorLeadership from "@/components/about/SeniorLeadership";
import StudentLeadership from "@/components/about/StudentLeadership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the IBE Honors Program at Ohio State — our mission, senior leadership, and the student leaders who shape a tight-knit community bridging business and engineering.",
  alternates: {
    canonical: "/about",
  },
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
