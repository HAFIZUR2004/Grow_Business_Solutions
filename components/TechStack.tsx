"use client";

import React, { useEffect, useRef, useState } from "react";
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
  ChevronUp,
  ChevronDown,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  { name: "Next.js", color: "#ffffff", orbit: 260, speed: 50, icon: Code2 },
  { name: "React", color: "#61dafb", orbit: 170, speed: 35, icon: Atom },
  { name: "Node.js", color: "#68a063", orbit: 300, speed: 60, icon: Server },
  { name: "MongoDB", color: "#47a248", orbit: 210, speed: 45, icon: Database },
  {
    name: "PostgreSQL",
    color: "#336791",
    orbit: 280,
    speed: 55,
    icon: Database,
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    orbit: 190,
    speed: 40,
    icon: FileJson,
  },
];

const features = [
  {
    icon: Terminal,
    title: "Optimized Core",
    desc: "Latency-tuned server environments for near-zero downtime.",
    color: "cyan",
  },
  {
    icon: Atom,
    title: "Reactive UI",
    desc: "State-driven fluid interfaces with flawless user interactions.",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Distributed Edge",
    desc: "Global CDN delivery ensuring blazing-fast access everywhere.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Ironclad Security",
    desc: "End-to-end encryption and advanced authentication protocols.",
    color: "emerald",
  },
  {
    icon: Layers,
    title: "Scalable Logic",
    desc: "Modular architecture built for long-term maintainability and growth.",
    color: "orange",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    desc: "Real-time monitoring and user behavior data tracking.",
    color: "pink",
  },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const orbitRefs = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentRow, setCurrentRow] = useState(0);

  const totalRows = Math.ceil(features.length / 2);
  const visibleRows = 2;

  const scrollNext = () => {
    if (currentRow < totalRows - visibleRows) setCurrentRow((prev) => prev + 1);
  };

  const scrollPrev = () => {
    if (currentRow > 0) setCurrentRow((prev) => prev - 1);
  };

  // Particle Network Canvas Effect
  useEffect(() => {
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
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      nodes = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(97, 218, 251, 0.5)"
            : "rgba(104, 160, 99, 0.4)",
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
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.1 * (1 - d / 160);

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, "rgba(97, 218, 251, " + opacity + ")");
            gradient.addColorStop(1, "rgba(104, 160, 99, " + opacity + ")");

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

        if (n.r > 1.8) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(97, 218, 251, 0.08)`;
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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      gsap.from(".tech-content-title", {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Orbital Animation
      orbitRefs.current.forEach((node, i) => {
        if (!node) return;
        const tech = technologies[i];
        gsap.to(node, {
          rotation: 360,
          duration: tech.speed,
          repeat: -1,
          ease: "none",
        });
        const label = node.querySelector(".tech-node-inner");
        if (label)
          gsap.to(label, {
            rotation: -360,
            duration: tech.speed,
            repeat: -1,
            ease: "none",
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Vertical Slide Effect
  useEffect(() => {
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        y: `-${currentRow * 280}px`,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [currentRow]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-8 overflow-hidden bg-[#0b0c18] text-[#E5E2E1]"
    >
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0b0c18_0%,transparent_85%)]" />
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Side: Content & Vertical Slider */}
        <div className="tech-content space-y-12">
          <div className="space-y-1 tech-content-title">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 italic font-light">
                Atomic
              </span>{" "}
              <br />
              Stack.
            </h2>
          </div>

          {/* Sliding Grid Area */}
          <div className="relative h-[560px] overflow-hidden">
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colorMap: Record<string, string> = {
                  cyan: "#22d3ee",
                  purple: "#a78bfa",
                  blue: "#3b82f6",
                  emerald: "#10b981",
                  orange: "#f97316",
                  pink: "#ec4899",
                };
                return (
                  <div
                    key={index}
                    className="feature-card h-[270px] p-7 rounded-[35px] bg-white/[0.015] border border-white/5 hover:border-cyan-500/20 transition-all duration-700 group hover:bg-white/[0.025]"
                  >
                    <Icon
                      className="w-6 h-6 mb-5 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ color: colorMap[feature.color] }}
                    />
                    <h4 className="font-extrabold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-white/35 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              onClick={scrollPrev}
              disabled={currentRow === 0}
              className={`p-4 rounded-full border border-white/10 transition-all duration-300 ${
                currentRow === 0 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-white/10 hover:border-cyan-400/50"
              }`}
            >
              <ChevronUp size={24} />
            </button>
            <button
              onClick={scrollNext}
              disabled={currentRow >= totalRows - visibleRows}
              className={`p-4 rounded-full border border-white/10 transition-all duration-300 ${
                currentRow >= totalRows - visibleRows 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-cyan-500/20 hover:border-cyan-400"
              }`}
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>

        {/* Right Side: Orbital Engine */}
        <div className="relative h-[700px] flex items-center justify-center scale-75 md:scale-100">
          <div className="absolute inset-0">
            {[260, 210, 190, 170, 280, 300].map((radius) => (
              <div
                key={radius}
                className="orbit-path absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
                style={{ width: radius * 2, height: radius * 2 }}
              />
            ))}
          </div>

          <div className="relative z-30 w-40 h-40 rounded-full bg-[#06070a] border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(62,232,246,0.07)]">
            <div className="text-3xl font-black tracking-tighter text-white">
              MERN<span className="text-cyan-400">+</span>
            </div>
          </div>

          {technologies.map((tech, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) orbitRefs.current[i] = el;
              }}
              className="tech-node absolute flex items-center justify-center pointer-events-none"
              style={{ width: tech.orbit * 2, height: tech.orbit * 2 }}
            >
              <div className="tech-node-inner absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group">
                <div className="w-18 h-18 rounded-3xl bg-[#08090e]/80 border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                  <tech.icon
                    size={28}
                    style={{ color: tech.color }}
                    className="mb-1.5 opacity-80 group-hover:opacity-100"
                  />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 group-hover:text-white">
                    {tech.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;