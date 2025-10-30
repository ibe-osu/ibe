import RecruitmentHero from "@/components/recruitment/RecruitmentHero";
import InfoCardSection from "@/components/recruitment/InfoCardSection";
import FAQSection from "@/components/recruitment/FAQSection";

export default function Recruitment() {
  return (
    <>
      <RecruitmentHero />
      <InfoCardSection />
  <FAQSection />
      {/* Additional recruitment sections can be added here as separate components, mirroring the About page structure. */}
    </>
  );
}
