import RecruitmentTop from "@/components/recruitment/RecruitmentTop";
import AdmissionOverview from "@/components/recruitment/AdmissionOverview";
import ApplicationTimeline from "@/components/recruitment/ApplicationTimeline";
import InfoCardSection from "@/components/recruitment/InfoCardSection";
import FAQSection, { faqItems } from "@/components/recruitment/FAQSection";
import JoinBand from "@/components/home/JoinBand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "How to join the IBE Honors Program at Ohio State: eligibility, application timeline, deadlines, and answers to frequently asked questions for prospective students.",
  alternates: {
    canonical: "/recruitment",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Recruitment() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RecruitmentTop />
      <AdmissionOverview />
      <ApplicationTimeline />
      <InfoCardSection />
      <FAQSection />
      <JoinBand />
    </>
  );
}
