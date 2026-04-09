"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Atom,
  Terminal,
  Database,
  Server,
  FileJson,
  Globe,
  ShieldCheck,
  Layers,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  { name: "Next.js", color: "#ffffff", orbit: 210, speed: 45, icon: Code2 },
  { name: "React", color: "#61dafb", orbit: 140, speed: 30, icon: Atom },
  { name: "Node.js", color: "#68a063", orbit: 250, speed: 55, icon: Server },
  { name: "MongoDB", color: "#47a248", orbit: 180, speed: 40, icon: Database },
  { name: "TypeScript", color: "#3178c6", orbit: 160, speed: 35, icon: FileJson },
];

const journeySteps = [
  {
    year: "2022",
    title: "The Genesis Protocol",
    desc: "Grow Business Solutions founded as a boutique research firm focused on software architecture.",
    color: "#b5a7ff",
    bgText: "genesis",
    align: "left",
  },
  {
    year: "2024",
    title: "The Obsidian Shift",
    desc: "Pivot to enterprise-grade AI integration and high-end MERN stack solutions.",
    color: "#3ee8f6",
    bgText: "intelligence",
    align: "right",
  },
  {
    year: "2026",
    title: "Global Consensus",
    desc: "Scaling digital infrastructure for the next generation of businesses worldwide.",
    color: "#b5a7ff",
    bgText: "global",
    align: "left",
  },
];

export default function AboutPage() {
  const orbitRefs = useRef<HTMLDivElement[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Canvas Particles Logic ---
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

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.5 ? "rgba(140, 100, 240, 0.4)" : "rgba(62, 232, 246, 0.3)",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    // --- GSAP Orbital Logic ---
    orbitRefs.current.forEach((node, i) => {
      if (!node) return;
      const tech = technologies[i];
      gsap.to(node, { rotation: 360, duration: tech.speed, repeat: -1, ease: "none" });
      const label = node.querySelector(".tech-node-inner");
      gsap.to(label, { rotation: -360, duration: tech.speed, repeat: -1, ease: "none" });
    });

    // --- GSAP Timeline Logic ---
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
      }
    );

    journeySteps.forEach((_, i) => {
      gsap.fromTo(
        `.journey-item-${i}`,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1,
          scrollTrigger: {
            trigger: `.journey-item-${i}`,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0c18] text-white font-inter pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 lg:pt-48 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-purple-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Our DNA</span>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            We engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">digital equity.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
            Grow Business Solutions is a collective of architects designing high-performance systems.
          </p>
        </motion.div>
        <motion.div className="relative aspect-square bg-[#16132a]/30 border border-white/5 rounded-[40px] flex items-center justify-center overflow-hidden">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rotate-45 border border-white/10 backdrop-blur-xl rounded-xl animate-pulse" />
        </motion.div>
      </section>

      {/* 2. Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32 relative">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-2 uppercase tracking-tighter">The Atomic Stack</h2>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Neural Infrastructure</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Terminal, title: "Optimized Core", color: "cyan" },
              { icon: Atom, title: "Reactive UI", color: "purple" },
              { icon: Globe, title: "Distributed Edge", color: "blue" },
              { icon: ShieldCheck, title: "Ironclad Security", color: "emerald" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                <item.icon className={`w-5 h-5 mb-4 opacity-50 group-hover:opacity-100 text-${item.color}-400`} />
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-white/30 font-light leading-relaxed italic">Engineered for peak performance.</p>
              </div>
            ))}
            <div className="md:col-span-2 p-8 rounded-[40px] bg-gradient-to-br from-[#11111e] to-transparent border border-white/5 flex justify-between items-center group relative overflow-hidden">
               <div className="relative z-10">
                  <Layers className="text-orange-400 mb-4" />
                  <h3 className="text-2xl font-bold">Autonomous Intelligence</h3>
                  <p className="text-gray-500 text-sm mt-2 max-w-xs font-light italic">Integrating neural processing into core logic.</p>
               </div>
               <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-purple-500/5 blur-[60px]" />
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[500px] flex items-center justify-center scale-90 lg:scale-110">
            <div className="relative z-30 w-32 h-32 rounded-full bg-[#08090d] border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[8px] font-mono tracking-widest text-white/20 uppercase">Core</div>
                <div className="text-xl font-black text-white">MERN+</div>
              </div>
            </div>
            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} ref={(el) => { if (el) orbitRefs.current[i] = el; }} className="absolute flex items-center justify-center pointer-events-none" style={{ width: tech.orbit * 2, height: tech.orbit * 2 }}>
                  <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
                  <div className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                    <div className="w-10 h-10 rounded-xl bg-[#0d0e14] border border-white/10 backdrop-blur-xl flex items-center justify-center transition-all hover:border-cyan-400/50">
                      <Icon size={16} style={{ color: tech.color }} className="opacity-80" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Our Journey Section (Updated Design) */}
      <section ref={scrollRef} className="mt-48 py-20 px-6 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Our <span className="text-white/30 italic font-light">Journey.</span>
            </h2>
            <p className="text-gray-500 font-mono text-xs tracking-[0.4em] mt-4 uppercase">Tracing the light through the void</p>
          </div>

          <div className="relative">
            {/* Timeline Vertical Lines */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 top-0" />
            <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#b5a7ff] to-[#3ee8f6] top-0 shadow-[0_0_15px_#3ee8f6]" />

            <div className="space-y-40 md:space-y-24">
              {journeySteps.map((step, idx) => (
                <div key={idx} className={`journey-item-${idx} flex flex-col md:flex-row items-center w-full ${step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Text Side */}
                  <div className={`w-full md:w-1/2 ${step.align === "left" ? "md:text-right md:pr-20" : "md:text-left md:pl-20"} relative`}>
                    <div className="relative inline-block w-full">
                      <span className="absolute -top-10 left-0 w-full text-center text-6xl font-black text-white/[0.02] uppercase pointer-events-none select-none">
                        {step.bgText}
                      </span>
                      <span className="text-xs font-mono font-bold mb-2 block" style={{ color: step.color }}>{step.year}</span>
                      <h4 className="text-2xl font-bold mb-3 text-white tracking-tight">{step.title}</h4>
                      <p className="text-white/40 max-w-[400px] leading-relaxed mx-auto md:mx-0 font-light italic">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Dot in Middle */}
                  <div className="relative z-20 my-10 md:my-0">
                    <div className="w-4 h-4 rounded-full border-4 border-[#0b0c18]" style={{ backgroundColor: step.color, boxShadow: `0 0 15px ${step.color}` }} />
                  </div>

                  {/* Empty/Ghost Side */}
                  <div className={`hidden md:block w-1/2 ${step.align === "left" ? "pl-20" : "pr-20"}`}>
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

      {/* 4. The Architects Section */}
      <section className="max-w-7xl mx-auto px-6 mt-48">
        <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">The Architects</h2>
        <p className="text-gray-500 mb-12 uppercase tracking-widest text-[10px] font-bold font-mono">Visionaries behind the Obsidian Void</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ name: "Hafizur Rahman", role: "Chief Architect" }, { name: "Sohel Mamun", role: "Design Principal" }, { name: "Team Member", role: "Lead Intelligence" }, { name: "Team Member", role: "Infrastructure Dev" }].map((member, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[30px] bg-[#11111e] overflow-hidden border border-white/5 mb-6 relative transition-all duration-500 group-hover:border-purple-500/30">
                <div className="absolute inset-0 bg-gray-900 mix-blend-saturation group-hover:mix-blend-normal transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-transparent to-transparent opacity-80" />
              </div>
              <h4 className="font-bold text-lg tracking-tight group-hover:text-purple-400 transition-colors">{member.name}</h4>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mt-1 font-bold">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}