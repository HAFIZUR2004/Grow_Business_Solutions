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
    wireColor: "#6d28d9",
  },
  {
    id: 2,
    name: "Elena Vance",
    role: "Head of Strategy",
    description: "Transforming complex market data into elegant roadmaps.",
    imageUrl: "/team/profile.jpg",
    wireColor: "#22d3ee",
  },
  {
    id: 3,
    name: "Julian Kross",
    role: "Lead Systems Architect",
    description: "Building invisible foundations with zero-latency precision.",
    imageUrl: "/team/profile.jpg",
    wireColor: "#b5a7ff",
  },
];

const TeamSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Particle Network Canvas ---
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

      nodes = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(109, 40, 217, 0.6)"
            : "rgba(34, 211, 238, 0.5)",
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
            gradient.addColorStop(0, "rgba(109, 40, 217, " + opacity + ")");
            gradient.addColorStop(1, "rgba(34, 211, 238, " + opacity + ")");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.7;
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
          ctx.arc(n.x, n.y, n.r + 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(109, 40, 217, 0.08)`;
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

    // --- SVG Wire Animation ---
    gsap.utils.toArray<SVGPathElement>(".circuit-path").forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
        },
      });
    });

    // Cards Reveal Animation
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.3,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
      }
    );

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0b0c18] py-20 px-6 overflow-hidden"
    >
      {/* Particle Network Canvas - Full Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45 z-0"
      />

      {/* Gradient Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(109,40,217,0.06),transparent_60%)] pointer-events-none z-0" />

      {/* Dynamic SVG Wires */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0" />
            <stop offset="50%" stopColor="#6d28d9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b5a7ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#b5a7ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b5a7ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left Wire - to first card */}
        <path
          className="circuit-path"
          d="M 500 120 C 500 220, 180 250, 180 520"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="1.8"
        />
        {/* Center Wire - to second card */}
        <path
          className="circuit-path"
          d="M 500 120 C 500 280, 500 380, 500 600"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="1.8"
        />
        {/* Right Wire - to third card */}
        <path
          className="circuit-path"
          d="M 500 120 C 500 220, 820 250, 820 520"
          fill="none"
          stroke="url(#grad3)"
          strokeWidth="1.8"
        />
        
        {/* Horizontal connection wires */}
        <path
          className="circuit-path"
          d="M 180 350 L 820 350"
          fill="none"
          stroke="url(#grad2)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.3"
        />
        <path
          className="circuit-path"
          d="M 180 450 L 820 450"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.3"
        />
      </svg>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Switchboard Header */}
        <div className="flex flex-col items-center mb-48 text-center">
          <div className="w-1 h-20 bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-500 mb-6" />
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
              Team
            </span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping shadow-[0_0_15px_#22d3ee]" />
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">
              System Link Established
            </span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              className={`relative group ${idx === 1 ? "md:mt-32" : ""}`}
            >
              {/* Point Node Light */}
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20"
                style={{
                  backgroundColor: member.wireColor,
                  boxShadow: `0 0 20px ${member.wireColor}`,
                  filter: "brightness(1.5)",
                }}
              />

              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0f1120] border border-white/5 transition-all duration-700 group-hover:border-white/20 backdrop-blur-sm">
                <div className="relative w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-transparent to-transparent opacity-80" />
                </div>

                {/* Info Text */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.3em] mb-2">
                    Protocol_{member.id}
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-4">
                    {member.role}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Outside Label */}
              <div className="mt-8 text-center group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-white/20 font-mono text-[10px] block mb-2">
                  — POSITION_{idx + 1}
                </span>
                <h4 className="text-white font-bold text-lg tracking-tight uppercase">
                  {member.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;