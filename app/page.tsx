import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import EngineeringProtocol from "@/components/engineeringProtocol";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EngineeringProtocol/>
      <TeamSection/>
      <Portfolio />
      <TechStack />
      <Footer />
    </main>
  );
}