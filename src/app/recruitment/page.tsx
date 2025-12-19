import RecruitmentTop from "@/components/recruitment/RecruitmentTop";
import InfoCardSection from "@/components/recruitment/InfoCardSection";
import TimelineIllustration from "@/components/recruitment/Timeline";
import FAQSection from "@/components/recruitment/FAQSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment",
};

export default function Recruitment() {
  return (
    <>
      <RecruitmentTop />
      <InfoCardSection />
      <TimelineIllustration />
      <FAQSection />
    </>
  );
}
