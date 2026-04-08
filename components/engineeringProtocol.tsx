"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "Deep-dive audit into existing systems and market opportunities.",
    color: "#b5a7ff",
    bgText: "architecture",
    align: "left",
  },
  {
    id: "02",
    title: "Blueprint",
    desc: "Wireframing the high-fidelity user journey and technical stack mapping.",
    color: "#3ee8f6",
    bgText: "code",
    align: "right",
  },
  {
    id: "03",
    title: "Engineering",
    desc: "Sprinting through development with modular, test-driven architecture.",
    color: "#b5a7ff",
    bgText: "speed",
    align: "left",
  },
  {
    id: "04",
    title: "Optimization",
    desc: "Iterative fine-tuning and deployment on high-speed global nodes.",
    color: "#3ee8f6",
    bgText: "global",
    align: "right",
  },
];

const EngineeringProtocol = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Central Line Drawing Animation
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1,
        },
      },
    );

    // Card Fade-in with Beam Effect
    steps.forEach((_, i) => {
      gsap.fromTo(
        `.step-item-${i}`,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: `.step-item-${i}`,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        },
      );
    });
  }, []);

  return (
    <section
      ref={scrollRef}
      className="bg-[#0b0c18] text-white py-20 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-40 tracking-tighter">
          The Engineering{" "}
          <span className="text-white/30 italic font-light">Protocol.</span>
        </h2>

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Static Line Background */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 top-0" />
          {/* Animated Glow Line (The Beam) */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#b5a7ff] to-[#3ee8f6] top-0 shadow-[0_0_15px_#3ee8f6]"
          />

          <div className="space-y-40 md:space-y-20">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`step-item-${idx} flex flex-col md:flex-row items-center w-full ${step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content Block */}
                <div
                  className={`w-full md:w-1/2 ${step.align === "left" ? "md:text-right md:pr-20" : "md:text-left md:pl-20"} relative`}
                >
                  <div className="relative inline-block">
                    {/* Background Text (Like your image) */}
                    <span className="absolute -top-10 left-0 w-full text-center text-6xl font-black text-white/[0.02] uppercase pointer-events-none select-none">
                      {step.bgText}
                    </span>

                    <h4
                      className="text-xl font-bold mb-2"
                      style={{ color: step.color }}
                    >
                      {step.id}. {step.title}
                    </h4>
                    <p className="text-white/40 max-w-[400px] leading-relaxed ml-auto mr-auto md:ml-0 md:mr-0">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Central Glowing Node */}
                <div className="relative z-20 my-10 md:my-0">
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-[#0b0c18] shadow-[0_0_20px_rgba(255,255,255,0.5)]`}
                    style={{
                      backgroundColor: step.color,
                      boxShadow: `0 0 15px ${step.color}`,
                    }}
                  />
                </div>

                {/* Decorative Side (Empty space or icons like image) */}
                <div
                  className={`hidden md:block w-1/2 ${step.align === "left" ? "pl-20" : "pr-20"}`}
                >
                  <span className="text-4xl font-black text-white/[0.03] uppercase tracking-widest italic select-none">
                    {step.bgText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringProtocol;
