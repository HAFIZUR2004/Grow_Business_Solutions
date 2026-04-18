"use client";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import EngineeringProtocol from "@/components/engineeringProtocol";
import SuccessSection from "@/components/SuccessSection";
import PremiumReviews from "./reviewSection/page";
import DynamicPortfolioPage from "./DynamicPortfolioPage/page";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <EngineeringProtocol />
      <SuccessSection />
      <TechStack />
      <TeamSection/>
      <PremiumReviews/>
      <DynamicPortfolioPage/>
    </main>
  );
}