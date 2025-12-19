import AboutUs from "@/components/about/AboutUs";
import SeniorLeadership from "@/components/about/SeniorLeadership";
import StudentLeadership from "@/components/about/StudentLeadership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
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
