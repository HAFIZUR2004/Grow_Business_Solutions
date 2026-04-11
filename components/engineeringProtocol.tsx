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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Canvas Particles Logic (Hero Style) ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ডটগুলোর সেটআপ (Hero Section এর কালার স্কিম অনুযায়ী)
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      // হিরো সেকশনের পার্পল এবং সায়ান কালার মিক্স
      color:
        Math.random() > 0.5
          ? "rgba(140, 100, 240, 0.4)"
          : "rgba(62, 232, 246, 0.3)",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    // --- GSAP Scroll Animations ---
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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={scrollRef}
      className="bg-[#0b0c18] text-white py-20 px-6 relative overflow-hidden"
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Hero Section এর মত সাইড গ্লো (Glow effect) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2 className="text-6xl md:text-8xl font-black text-center mb-40 tracking-tighter">
          The Engineering{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 italic font-light">
            Protocol.
          </span>
        </h2>

        {/* Central Vertical Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 top-0" />
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#b5a7ff] to-[#3ee8f6] top-0 shadow-[0_0_15px_#3ee8f6]"
          />

          <div className="space-y-40 md:space-y-20">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`step-item-${idx} flex flex-col md:flex-row items-center w-full ${
                  step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    step.align === "left"
                      ? "md:text-right md:pr-20"
                      : "md:text-left md:pl-20"
                  } relative`}
                >
                  <div className="relative inline-block">
                    <span className="absolute -top-10 left-0 w-full text-center text-6xl font-black text-white/[0.02] uppercase pointer-events-none select-none">
                      {step.bgText}
                    </span>

                    <h4
                      className="text-2xl font-bold mb-2"
                      style={{ color: step.color }}
                    >
                      {step.id}. {step.title}
                    </h4>
                    <p className="text-white/40 max-w-[400px] leading-relaxed mx-auto md:mx-0">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-20 my-10 md:my-0">
                  <div
                    className="w-4 h-4 rounded-full border-4 border-[#0b0c18]"
                    style={{
                      backgroundColor: step.color,
                      boxShadow: `0 0 15px ${step.color}`,
                    }}
                  />
                </div>

                <div
                  className={`hidden md:block w-1/2 ${
                    step.align === "left" ? "pl-20" : "pr-20"
                  }`}
                >
                  <span className="text-4xl font-black text-white/5 uppercase tracking-widest italic select-none">
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
