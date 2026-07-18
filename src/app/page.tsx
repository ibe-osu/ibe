import FourYearJourney from "@/components/home/FourYearJourney";
import OurStats from "@/components/home/OurStats";
import Sponsors from "@/components/home/Sponsors";
import Welcome from "@/components/home/Welcome";
import WhoAreWe from "@/components/home/WhoAreWe";

export default function Home() {
  return (
    <>
      <Welcome />
      <OurStats />
      <WhoAreWe />
      <FourYearJourney />
      <Sponsors />
    </>
  );
}
