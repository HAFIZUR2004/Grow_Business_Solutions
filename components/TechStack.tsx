"use client";

import React, { useEffect, useRef } from "react";
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
  BarChart3,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  { name: "Next.js", color: "#ffffff", orbit: 240, speed: 45, icon: Code2 },
  { name: "React", color: "#61dafb", orbit: 160, speed: 30, icon: Atom },
  { name: "Node.js", color: "#68a063", orbit: 280, speed: 55, icon: Server },
  { name: "MongoDB", color: "#47a248", orbit: 200, speed: 40, icon: Database },
  {
    name: "PostgreSQL",
    color: "#336791",
    orbit: 260,
    speed: 50,
    icon: Database,
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    orbit: 180,
    speed: 35,
    icon: FileJson,
  },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const orbitRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Reveal Entrance
    gsap.from(".tech-content", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Orbital Logic
    orbitRefs.current.forEach((node, i) => {
      if (!node) return;
      const tech = technologies[i];

      // Rotate the orbit container
      gsap.to(node, {
        rotation: 360,
        duration: tech.speed,
        repeat: -1,
        ease: "none",
      });

      // Keep icons upright
      const label = node.querySelector(".tech-node-inner");
      gsap.to(label, {
        rotation: -360,
        duration: tech.speed,
        repeat: -1,
        ease: "none",
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-40 px-8 overflow-hidden relative bg-[#08090d] text-[#E5E2E1]"
    >
      {/* Animated Mesh Background (No Images) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1b2e_0%,transparent_70%)]" />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Side: Content */}
        <div className="tech-content space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-cyan-500/50" />
              <span className="text-[10px] font-mono tracking-[0.5em] text-cyan-400 uppercase">
                Neural Infrastructure
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic font-light">
                Atomic
              </span>{" "}
              <br />
              Stack.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-lg font-light">
              Architecting high-performance systems with a curated selection of
              industry-leading technologies for maximum scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Optimized Core (Existing) */}
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 group">
              <Terminal className="w-5 h-5 text-cyan-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-bold text-white mb-1">Optimized Core</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                Latency-tuned server environments for 99.9% uptime.
              </p>
            </div>

            {/* 2. Reactive UI (Existing) */}
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all duration-500 group">
              <Atom className="w-5 h-5 text-purple-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-bold text-white mb-1">Reactive UI</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                State-driven fluid interfaces with zero layout shifts.
              </p>
            </div>

            {/* 3. Distributed Edge (New) */}
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500 group">
              <Globe className="w-5 h-5 text-blue-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-bold text-white mb-1">Distributed Edge</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                Global CDN delivery ensuring low-latency access everywhere.
              </p>
            </div>

            {/* 4. Ironclad Security (New) */}
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-500 group">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-bold text-white mb-1">Ironclad Security</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                End-to-end encryption and advanced JWT authentication.
              </p>
            </div>

            {/* 5. Atomic Design (New) */}
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-orange-500/20 transition-all duration-500 group">
              <Layers className="w-5 h-5 text-orange-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-bold text-white mb-1">Scalable Logic</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                Modular architecture built for long-term maintainability.
              </p>
            </div>

            {/* 6. Insightful Analytics (New) */}
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 hover:border-pink-500/20 transition-all duration-500 group">
              <BarChart3 className="w-5 h-5 text-pink-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h4 className="font-bold text-white mb-1">Smart Insights</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                Real-time monitoring and user behavior data tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Orbital Engine */}
        <div className="relative h-[650px] flex items-center justify-center scale-75 md:scale-100">
          {/* Central Engine Core */}
          <div className="relative z-30 w-36 h-36 rounded-full bg-[#08090d] border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(62,232,246,0.05)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 animate-pulse" />
            <div className="text-center z-10">
              <div className="text-[9px] font-mono tracking-widest text-white/20 uppercase mb-1">
                Stack
              </div>
              <div className="text-2xl font-black tracking-tighter text-white">
                MERN+
              </div>
            </div>
          </div>

          {/* Orbiting Nodes */}
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) orbitRefs.current[i] = el;
                }}
                className="absolute flex items-center justify-center pointer-events-none"
                style={{ width: tech.orbit * 2, height: tech.orbit * 2 }}
              >
                {/* Orbit Circle Path */}
                <div className="absolute inset-0 rounded-full border border-white/[0.04]" />

                {/* Tech Node */}
                <div className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0d0e14] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <Icon
                      size={24}
                      style={{ color: tech.color }}
                      className="mb-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-[8px] font-mono uppercase tracking-tighter text-white/30 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>

                  {/* Subtle link back to core */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}

          {/* Massive Deep Background Glow */}
          <div className="absolute w-[500px] h-[500px] bg-cyan-500/[0.03] blur-[150px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
