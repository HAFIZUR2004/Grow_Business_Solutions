"use client";

import React from "react";

const steps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    description:
      "Deep research to understand your business goals and target audience.",
    color: "#22c55e",
  },
  {
    id: "02",
    title: "Design & Protocol",
    description:
      "Creating a unique visual map using modern UI/UX engineering protocols.",
    color: "#3ee8f6",
  },
  {
    id: "03",
    title: "Development & Build",
    description:
      "Building high-performance solutions using MERN Stack and Next.js.",
    color: "#ffffff",
  },
  {
    id: "04",
    title: "Deployment & Growth",
    description:
      "Ensuring growth through continuous support and data-driven optimization.",
    color: "#22c55e",
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-[#22c55e]/30">
      <div className="pt-44 pb-24 px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-[#22c55e]" />
            <p className="text-[#22c55e] font-mono text-xs uppercase tracking-[0.5em] font-bold">
              How We Scale
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Engineering <br />{" "}
            <span className="text-white/10 italic">Success.</span>
          </h1>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-[#0a101f] border border-white/5 p-10 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-700 h-full flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl font-black text-white/5 mb-10 group-hover:text-[#22c55e]/10 transition-colors duration-700">
                  {step.id}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#22c55e] transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Decorative indicator */}
              <div className="mt-12 w-8 h-[2px] bg-white/10 group-hover:w-full group-hover:bg-[#22c55e] transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
