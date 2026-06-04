import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { PublicLayout } from "./public-layout";
import ClientSections from "@/components/ClientSections";
import { translations } from "@/constants/translations";

// Dynamically import heavy components compatible with SSR
const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-900/20" />,
});

const EngineeringProtocol = dynamic(() => import("@/components/engineeringProtocol"), {
  ssr: true,
});

const SuccessSection = dynamic(() => import("@/components/SuccessSection"), {
  ssr: true,
});

const TeamSection = dynamic(() => import("@/components/TeamSection"), {
  ssr: true,
});

export default function Home() {
  // Server-side default language
  const lang = "EN";
  const t = translations[lang];

  return (
    <PublicLayout showFooter={true}>
      <Hero t={t} lang={lang} />
      <Suspense fallback={<div className="h-screen" />}>
        <EngineeringProtocol t={t} lang={lang} />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <SuccessSection t={t} lang={lang} />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <TeamSection teamData={t.teamHorizontal} lang={lang} />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <TechStack t={t} lang={lang} />
      </Suspense>
      
      {/* Client-only sections handled by ClientSections wrapper */}
      <ClientSections t={t} lang={lang} />
    </PublicLayout>
  );
}
