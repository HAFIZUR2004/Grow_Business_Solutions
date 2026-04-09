import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import EngineeringProtocol from "@/components/engineeringProtocol";
import TeamSection from "@/components/TeamSection";
import SuccessSection from "@/components/SuccessSection";
import Portfolio from "./portfolio/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <EngineeringProtocol />
      <SuccessSection />
      <TeamSection />
      <TechStack />
      <Portfolio />
    </main>
  );
}
