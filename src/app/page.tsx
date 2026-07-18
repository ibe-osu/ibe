import Coursework from "@/components/home/Coursework";
import OurStats from "@/components/home/OurStats";
import Sponsors from "@/components/home/Sponsors";
import Welcome from "@/components/home/Welcome";
import WhoAreWe from "@/components/home/WhoAreWe";

export default function Home() {
  return (
    <>
      <Welcome />
      <WhoAreWe />
      <OurStats />
      <Coursework />
      <Sponsors />
    </>
  );
}
