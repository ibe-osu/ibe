import StudentLifeHeader from "@/components/student-life/StudentLife";
import KeynoteSpeakers from "@/components/student-life/KeynoteSpeakers";
import Happenings from "@/components/student-life/Happenings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Life",
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
