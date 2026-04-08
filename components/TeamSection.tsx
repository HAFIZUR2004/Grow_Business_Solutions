"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  {
    id: 1,
    name: "Hafizur Rahman",
    role: "Founder & Lead Developer",
    description:
      "Architecting high-performance digital ecosystems with MERN stack expertise.",
    imageUrl: "/team/profile.jpg",
  },
  {
    id: 2,
    name: "Elena Vance",
    role: "Head of Strategy",
    description: "Transforming complex market data into elegant roadmaps.",
    imageUrl: "/team/profile.jpg",
  },
  {
    id: 3,
    name: "Julian Kross",
    role: "Lead Systems Architect",
    description: "Building invisible foundations with zero-latency precision.",
    imageUrl: "/team/profile.jpg",
  },
];

const TeamSection = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Reveal Animation on Scroll
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      },
    );
  }, []);

  const onMouseMove = (e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    // Mouse relative to card center
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    // Smooth Ultra-Fluid Tilt
    gsap.to(card, {
      duration: 0.8,
      rotationY: xPos * 12,
      rotationX: -yPos * 12,
      transformPerspective: 1200,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Move the image slightly opposite for Parallax
    gsap.to(card.querySelector(".member-img"), {
      duration: 0.8,
      x: -xPos * 25,
      y: -yPos * 25,
      ease: "power3.out",
    });
  };

  const onMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    gsap.to(card, {
      duration: 1.2,
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(card.querySelector(".member-img"), {
      duration: 1.2,
      x: 0,
      y: 0,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="bg-[#0b0c18] py-20 px-6 relative overflow-hidden"
    >
      {/* Background: Abstract Lines & Hero Glow */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.03]" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-white/[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Minimal Header */}
        <div className="mb-32 flex items-baseline justify-between border-b border-white/5 pb-10">
          <div>
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">
              Core Collective
            </p>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
                Team.
              </span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-white/20 font-mono text-sm tracking-widest uppercase">
              Growth Architecture / 2026
            </span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              onMouseMove={(e) => onMouseMove(e, idx)}
              onMouseLeave={() => onMouseLeave(idx)}
              className={`relative group cursor-none md:cursor-default ${idx === 1 ? "md:mt-24" : ""}`}
            >
              {/* Image Container with Parallax Effect */}
              <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden bg-[#121323] border border-white/5 transition-colors duration-500 group-hover:border-cyan-500/30">
                <div className="member-img w-full h-full scale-125 relative">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  {/* Subtle technical overlay */}
                  <div className="absolute inset-0 bg-[#0b0c18]/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                {/* Info Overlay (Appears on Hover) */}
                <div className="absolute bottom-0 left-0 w-full p-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-[#0b0c18] to-transparent">
                  <p className="text-cyan-400 font-mono text-[9px] tracking-[0.3em] uppercase mb-2">
                    Internal node_{member.id}
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-white/50 text-sm italic font-light leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Static Label (Visible always) */}
              <div className="mt-8 px-4 flex justify-between items-center group-hover:opacity-0 transition-opacity duration-300">
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {member.name}
                  </h4>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
                <div className="w-8 h-[1px] bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
