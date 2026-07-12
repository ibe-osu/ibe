import StudentLifeHeader from "@/components/student-life/StudentLife";
import KeynoteSpeakers from "@/components/student-life/KeynoteSpeakers";
import Happenings from "@/components/student-life/Happenings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Life",
  description:
    "Life inside the IBE cohort at Ohio State — keynote speakers, socials, treks, and the traditions that make the program a community, not just a curriculum.",
  alternates: {
    canonical: "/student-life",
  },
};

export default function StudentLife() {
  return (
    <>
      <StudentLifeHeader />
      <KeynoteSpeakers />
      <Happenings />
    </>
  );
}
