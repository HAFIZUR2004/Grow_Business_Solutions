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
    description: "Architecting high-performance digital ecosystems with MERN stack expertise.",
    imageUrl: "/team/profile.jpg",
    wireColor: "#6d28d9", // Purple
  },
  {
    id: 2,
    name: "Elena Vance",
    role: "Head of Strategy",
    description: "Transforming complex market data into elegant roadmaps.",
    imageUrl: "/team/profile.jpg",
    wireColor: "#22d3ee", // Cyan
  },
  {
    id: 3,
    name: "Julian Kross",
    role: "Lead Systems Architect",
    description: "Building invisible foundations with zero-latency precision.",
    imageUrl: "/team/profile.jpg",
    wireColor: "#b5a7ff", // Light Purple
  },
];

const TeamSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Hero Style Particles ---
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
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
          color: Math.random() > 0.5 ? "rgba(109, 40, 217, 0.2)" : "rgba(34, 211, 238, 0.15)",
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
        return () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", resize);
        };
      }
    }

    // --- Wire "Growth" Animation ---
    // Engineering Protocol এর মত dashoffset এনিমেশন
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

    // Cards Reveal
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
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0b0c18] py-32 px-6 relative overflow-hidden">
      {/* Background Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(109,40,217,0.08),transparent_50%)] pointer-events-none" />

      {/* dynamic SVG Wires - Engineering Style */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Left Wire */}
        <path 
          className="circuit-path" 
          d="M 500 150 C 500 250, 200 250, 180 500" 
          fill="none" stroke="url(#grad1)" strokeWidth="1.5" 
        />
        {/* Center Wire */}
        <path 
          className="circuit-path" 
          d="M 500 150 C 500 300, 500 400, 500 580" 
          fill="none" stroke="url(#grad2)" strokeWidth="1.5" 
        />
        {/* Right Wire */}
        <path 
          className="circuit-path" 
          d="M 500 150 C 500 250, 800 250, 820 500" 
          fill="none" stroke="url(#grad1)" strokeWidth="1.5" 
        />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Switchboard Header */}
        <div className="flex flex-col items-center mb-48 text-center">
          <div className="w-1 h-20 bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-500 mb-6" />
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">Team</span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping shadow-[0_0_15px_#22d3ee]" />
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">System Link Established</span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => { if (el) cardRefs.current[idx] = el; }}
              className={`relative group ${idx === 1 ? "md:mt-32" : ""}`}
            >
              {/* Point Node Light */}
              <div 
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20"
                style={{ 
                  backgroundColor: member.wireColor, 
                  boxShadow: `0 0 20px ${member.wireColor}`,
                  filter: 'brightness(1.5)'
                }}
              />

              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0f1120] border border-white/5 transition-all duration-700 group-hover:border-white/20">
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
                  <p className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.3em] mb-2">Protocol_{member.id}</p>
                  <h3 className="text-3xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-4">{member.role}</p>
                  <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Outside Label (Visible initially) */}
              <div className="mt-8 text-center group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-white/20 font-mono text-[10px] block mb-2">— POSITION_{idx + 1}</span>
                <h4 className="text-white font-bold text-lg tracking-tight uppercase">{member.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;