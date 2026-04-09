import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import EngineeringProtocol from "@/components/engineeringProtocol";
import TeamSection from "@/components/TeamSection";
import SuccessSection from "@/components/SuccessSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EngineeringProtocol/>
      <SuccessSection/>
      <TeamSection/>
      <Portfolio />
      <TechStack />
      <Footer />
    </main>
  );
}