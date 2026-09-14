import Compare from "@/components/home/Compare";
import FourYearJourney from "@/components/home/FourYearJourney";
import JoinBand from "@/components/home/JoinBand";
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
      <Compare />
      <Sponsors />
      <JoinBand />
    </>
  );
}
