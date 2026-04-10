"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Atom, Terminal, Database, Server, FileJson, Globe, ShieldCheck, Layers,
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
  const stackCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Hero Canvas Logic ---
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

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(162, 155, 254, ${0.3 * (1 - d / 170)})`;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(162, 155, 254, 0.8)";
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    // --- Orbital Animation ---
    orbitRefs.current.forEach((node, i) => {
      if (!node) return;
      const tech = technologies[i];
      gsap.to(node, { rotation: 360, duration: tech.speed, repeat: -1, ease: "none" });
      const inner = node.querySelector(".tech-node-inner");
      if (inner) gsap.to(inner, { rotation: -360, duration: tech.speed, repeat: -1, ease: "none" });
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#05070a] text-white font-sans overflow-hidden">
      <style>{localStyles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center px-8 md:px-16 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6c5ce7]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[0%] w-[40%] h-[40%] bg-[#00cec9]/10 blur-[100px] rounded-full" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div className="globe-wrap hidden lg:block drop-shadow-[0_0_50px_rgba(108,92,231,0.3)]">
          <GlobeSVG />
        </div>

        <div className="relative z-20 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 border border-[#a29bfe]/50 bg-[#6c5ce7]/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-8 shadow-[0_0_20px_rgba(108,92,231,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00cec9] animate-pulse" />
            <span className="text-[11px] tracking-[0.4em] text-white uppercase font-black">OUR ARCHITECTURAL DNA</span>
          </motion.div>
          <h1 className="font-black leading-[0.85] tracking-tight text-white text-[clamp(3.5rem,9vw,7rem)] mb-8">
            ENGINEERING <br /> 
            <span className="text-transparent italic brightness-150" style={{ WebkitTextStroke: "1.5px rgba(162,155,254,0.6)" }}>DIGITAL EQUITY</span>
          </h1>
          <p className="max-w-xl text-xl text-white/70 leading-relaxed mb-12 font-medium drop-shadow-md">
            Grow Business Solutions is a collective of architects designing <span className="text-[#a29bfe] font-bold">high-performance</span> digital ecosystems.
          </p>
          <button className="bg-[#6c5ce7] hover:bg-[#8271ff] shadow-[0_0_40px_rgba(108,92,231,0.3)] transition-all px-10 py-5 rounded-2xl text-sm font-black tracking-widest uppercase text-white">
            Explore Our Vision
          </button>
        </div>
      </section>

      {/* --- THE ATOMIC STACK (ORBITAL WITHOUT CIRCLES) --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">The Atomic Stack</h2>
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Neural Infrastructure Protocol</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Terminal, title: "Optimized Core", color: "#3ee8f6" },
              { icon: Atom, title: "Reactive UI", color: "#a29bfe" },
              { icon: Globe, title: "Distributed Edge", color: "#6c5ce7" },
              { icon: ShieldCheck, title: "Ironclad Security", color: "#00cec9" },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[30px] bg-white/[0.03] border border-white/5 hover:border-[#6c5ce7]/30 transition-all group">
                <item.icon className="w-6 h-6 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                <h4 className="font-black text-xl text-white mb-2 tracking-tight">{item.title}</h4>
                <p className="text-sm text-white/30 font-medium leading-relaxed italic">Engineered for peak dominance.</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center scale-75 md:scale-100">
            {/* Animated Glow in Center */}
            <div className="absolute w-[400px] h-[400px] bg-[#6c5ce7]/5 blur-[100px] rounded-full animate-pulse" />
            
            <div className="relative z-30 w-32 h-32 rounded-full bg-[#05070a] border-2 border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(108,92,231,0.2)]">
               <div className="text-center">
                  <div className="text-[8px] font-black tracking-[0.3em] text-[#6c5ce7] uppercase mb-1">Core</div>
                  <div className="text-xl font-black text-white">MERN+</div>
               </div>
            </div>

            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} ref={(el) => { if (el) orbitRefs.current[i] = el; }} 
                     className="absolute flex items-center justify-center" 
                     style={{ width: tech.orbit * 2, height: tech.orbit * 2 }}>
                  
                  {/* Wire Connection (Simplified Line to Center) */}
                  <div className="absolute w-[2px] h-full left-1/2 -translate-x-1/2 bg-gradient-to-t from-transparent via-white/10 to-transparent pointer-events-none" 
                       style={{ height: tech.orbit, top: 0, transformOrigin: "bottom center" }} />

                  <div className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-2xl bg-[#0d0e14] border border-white/10 backdrop-blur-3xl flex items-center justify-center shadow-xl hover:border-cyan-400/50 transition-all relative">
                      <div className="absolute inset-0 bg-white/5 blur-sm rounded-2xl -z-10" />
                      <Icon size={20} style={{ color: tech.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- JOURNEY SECTION --- */}
      <section ref={scrollRef} className="py-40 px-6 relative bg-black/30">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">Our <span className="text-white/20 italic">Journey.</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/5 top-0" />
            <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#6c5ce7] top-0 shadow-[0_0_15px_#6c5ce7]" />
            <div className="space-y-40">
              {journeySteps.map((step, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center w-full ${step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-1/2 ${step.align === "left" ? "md:text-right md:pr-20" : "md:text-left md:pl-20"}`}>
                    <span className="text-xs font-black tracking-widest mb-4 block" style={{ color: step.color }}>{step.year}</span>
                    <h4 className="text-3xl font-black mb-4 text-white tracking-tighter uppercase">{step.title}</h4>
                    <p className="text-white/40 text-lg leading-relaxed font-medium italic">{step.desc}</p>
                  </div>
                  <div className="relative z-20 my-10 md:my-0">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}` }} />
                  </div>
                  <div className="hidden md:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function GlobeSVG() {
  return (
    <svg viewBox="0 0 600 480" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="brightGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a29bfe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="290" cy="230" r="240" fill="url(#brightGlow)" />
      <circle cx="290" cy="230" r="185" fill="rgba(108, 92, 231, 0.1)" stroke="#a29bfe" strokeWidth="0.5" strokeDasharray="5 5" />
      <text x="50%" y="50%" textAnchor="middle" fill="#a29bfe" fontSize="10" fontWeight="black" opacity="0.3" letterSpacing="5">ACTIVE_PROTOCOL</text>
    </svg>
  );
}

const localStyles = `
  .globe-wrap {
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
    width: 700px;
    height: 600px;
    z-index: 5;
    pointer-events: none;
    animation: floatG 12s ease-in-out infinite;
  }
  @keyframes floatG {
    0%, 100% { transform: translateY(-50%) translateX(0); }
    50% { transform: translateY(-54%) translateX(-20px); }
  }
`;