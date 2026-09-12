import PageHero from "@/components/general/PageHero";
import recruitmentWelcomeImg from "../../../public/recruitment/welcome.jpeg";

export default function RecruitmentHero() {
  return (
    <PageHero
      title="Join IBE"
      subtitle="Open to Ohio State Honors students in Fisher and Engineering — 72 seats, two tracks, one cohort."
      image={recruitmentWelcomeImg}
      imageAlt="Prospective students visiting the IBE Honors Program at Ohio State"
      objectPosition="center 35%"
    />
  );
}
