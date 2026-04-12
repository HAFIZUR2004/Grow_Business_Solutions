"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Atom, Terminal, Database, Server, FileJson, Globe, ShieldCheck,
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
    align: "left",
  },
  {
    year: "2024",
    title: "The Obsidian Shift",
    desc: "Pivot to enterprise-grade AI integration and high-end MERN stack solutions.",
    color: "#3ee8f6",
    align: "right",
  },
  {
    year: "2026",
    title: "Global Consensus",
    desc: "Scaling digital infrastructure for the next generation of businesses worldwide.",
    color: "#b5a7ff",
    align: "left",
  },
];

export default function AboutPage() {
  const orbitRefs = useRef<HTMLDivElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Full Page Particle Network Canvas ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      nodes = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(108, 92, 231, 0.45)"
            : "rgba(162, 155, 254, 0.35)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // লাইন কানেক্ট করা
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.12 * (1 - d / 170);

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, "rgba(108, 92, 231, " + opacity + ")");
            gradient.addColorStop(1, "rgba(162, 155, 254, " + opacity + ")");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ডট আঁকা এবং মুভ করা
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // গ্লো ইফেক্ট বড় ডটের জন্য
        if (n.r > 1.8) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(108, 92, 231, 0.08)`;
          ctx.fill();
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        }
        if (n.x > canvas.width) {
          n.x = canvas.width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        }
        if (n.y > canvas.height) {
          n.y = canvas.height;
          n.vy *= -1;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Orbital Animation
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
    <main className="relative min-h-screen bg-[#05070a] text-white font-sans overflow-x-hidden">
      
      {/* Full Page Particle Network Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none opacity-35 z-0" 
      />

      {/* Gradient Glow Effects - Full Page */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6c5ce7]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00cec9]/8 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.03),transparent_70%)] pointer-events-none z-0" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 text-center lg:text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-md px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] text-white uppercase font-bold">OUR ARCHITECTURAL DNA</span>
          </motion.div>

          <h1 className="font-black leading-[0.9] tracking-tighter text-white text-[clamp(2.5rem,10vw,6.5rem)] mb-6">
            ENGINEERING <br /> 
            <span className="text-transparent italic" style={{ WebkitTextStroke: "1px rgba(162,155,254,0.7)" }}>DIGITAL EQUITY</span>
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-base md:text-xl text-white/70 leading-relaxed mb-10 font-medium">
            Grow Business Solutions is a collective of architects designing <span className="text-[#a29bfe] font-bold">high-performance</span> digital ecosystems for the modern era.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto bg-[#6c5ce7] hover:bg-[#8271ff] shadow-[0_0_30px_rgba(108,92,231,0.3)] transition-all px-8 py-4 rounded-xl text-xs md:text-sm font-black tracking-widest uppercase">
              Explore Our Vision
            </button>
            <button className="w-full sm:w-auto border border-white/10 hover:bg-white/5 transition-all px-8 py-4 rounded-xl text-xs md:text-sm font-black tracking-widest uppercase">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* --- THE ATOMIC STACK --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
        <div className="mb-16 md:mb-20 text-center lg:text-left">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-4">The Atomic Stack</h2>
          <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase">Neural Infrastructure Protocol</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: Terminal, title: "Optimized Core", color: "#3ee8f6" },
              { icon: Atom, title: "Reactive UI", color: "#a29bfe" },
              { icon: Globe, title: "Distributed Edge", color: "#6c5ce7" },
              { icon: ShieldCheck, title: "Ironclad Security", color: "#00cec9" },
            ].map((item, i) => (
              <div key={i} className="p-6 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-[#6c5ce7]/30 transition-all group backdrop-blur-sm">
                <item.icon className="w-6 h-6 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                <h4 className="font-bold text-lg md:text-xl text-white mb-2">{item.title}</h4>
                <p className="text-xs md:text-sm text-white/30 italic">Engineered for peak dominance.</p>
              </div>
            ))}
          </div>

          {/* Orbital Section */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative h-[350px] md:h-[500px] flex items-center justify-center">
            <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#6c5ce7]/5 blur-[80px] rounded-full animate-pulse" />
            
            <div className="relative z-30 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#05070a]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
               <div className="text-center">
                  <div className="text-[7px] font-bold tracking-widest text-[#6c5ce7] uppercase">Core</div>
                  <div className="text-lg md:text-xl font-black text-white">MERN+</div>
               </div>
            </div>

            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              const responsiveOrbit = typeof window !== 'undefined' && window.innerWidth < 768 ? tech.orbit * 0.6 : tech.orbit;
              
              return (
                <div key={i} ref={(el) => { if (el) orbitRefs.current[i] = el; }} 
                     className="absolute flex items-center justify-center" 
                     style={{ width: responsiveOrbit * 2, height: responsiveOrbit * 2 }}>
                  <div className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0d0e14]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-xl">
                      <Icon size={18} style={{ color: tech.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- JOURNEY SECTION --- */}
      <section className="relative py-24 md:py-40 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Our <span className="text-white/20 italic">Journey.</span></h2>
          </div>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            
            <div className="space-y-24 md:space-y-32">
              {journeySteps.map((step, idx) => (
                <div key={idx} className={`relative flex items-start md:items-center ${step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${step.align === "left" ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                    <span className="text-xs font-black tracking-tighter mb-2 block" style={{ color: step.color }}>{step.year}</span>
                    <h4 className="text-2xl md:text-3xl font-black mb-3 text-white uppercase">{step.title}</h4>
                    <p className="text-white/40 text-sm md:text-lg leading-relaxed italic">{step.desc}</p>
                  </div>
                  
                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: step.color, boxShadow: `0 0 15px ${step.color}` }}>
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: step.color, opacity: 0.5 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}