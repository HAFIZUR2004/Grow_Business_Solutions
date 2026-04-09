"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "01",
    tag: "FinTech",
    title: "Quantum Ledger",
    description:
      "Next-gen banking infrastructure with real-time transaction tracking.",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    color: "#b5a7ff",
  },
  {
    id: "02",
    tag: "Mobile",
    title: "EcoPulse App",
    description:
      "Seamless IoT integration for smart energy monitoring and management.",
    tech: ["React Native", "Firebase", "Zustand"],
    color: "#3ee8f6",
  },
  {
    id: "03",
    tag: "Data System",
    title: "Nova Engine",
    description:
      "High-performance data processing engine for enterprise-level analytics.",
    tech: ["MERN Stack", "Redis", "Docker"],
    color: "#ffffff",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Using gsap.context ensures all animations are cleaned up on unmount
    const ctx = gsap.context(() => {
      // Reveal Animation for Title
      gsap.from(".portfolio-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 2. Filter out any null references before passing to GSAP
      const validCards = cardRefs.current.filter((el) => el !== null);

      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 50, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          },
        );
      }
    }, sectionRef); // 3. Scope the context to this section

    return () => ctx.revert(); // 4. Clean up
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0c18] py-32 px-6 relative overflow-hidden min-h-screen"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(62,232,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-24 portfolio-title">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-12 bg-cyan-500" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">
              Selected Works
            </p>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            Digital <span className="text-white/20">Artifacts.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative bg-[#121323] border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-500"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-4xl font-black text-white/5">
                    {project.id}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 group-hover:rotate-45 transition-transform duration-500"
                    style={{ color: project.color }}
                  >
                    ↗
                  </div>
                </div>

                <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-2">
                  {project.tag}
                </p>
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-white/60 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center portfolio-title">
          <button className="group relative px-8 py-4 bg-transparent border border-white/10 overflow-hidden rounded-full transition-all duration-300 hover:border-cyan-500/50">
            <span className="relative z-10 text-white/80 font-mono text-xs uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
              Explore All Protocols
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
}
