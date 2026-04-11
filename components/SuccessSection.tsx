"use client";

import React, { useEffect, useRef } from "react";

const stats = [
  {
    title: "8+ Years",
    desc: "Of dedicated craft in digital architecture.",
    icon: "✦",
  },
  {
    title: "20+ Projects",
    desc: "High-impact solutions delivered globally.",
    icon: "🚀",
  },
  {
    title: "100% Client",
    desc: "Satisfaction rate across all partnerships.",
    icon: "✔",
  },
];

const SuccessSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 z-0" />

      <div className="max-w-screen-2xl mx-auto relative z-10 text-center">
        <p className="text-cyan-400 tracking-[0.4em] text-xs mb-6 uppercase">
          MILESTONES
        </p>

        <div className="relative inline-block mb-24">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight">
            <span className="text-white">Success in </span>
            <span className="bg-gradient-to-r from-[#c4b5fd] to-[#a5f3fc] text-transparent bg-clip-text">
              Motion.
            </span>
          </h2>

          {/* --- Connecting Wires (Desktop Only) --- */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full w-[1000px] h-[100px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" fill="none">
              {/* Left Wire */}
              <path
                d="M500 0 C 500 50, 166 50, 166 100"
                stroke="url(#wireGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-30"
              />
              {/* Middle Wire */}
              <path
                d="M500 0 L 500 100"
                stroke="url(#wireGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-30"
              />
              {/* Right Wire */}
              <path
                d="M500 0 C 500 50, 833 50, 833 100"
                stroke="url(#wireGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-30"
              />
              <defs>
                <linearGradient
                  id="wireGradient"
                  x1="500"
                  y1="0"
                  x2="500"
                  y2="100"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#c4b5fd" />
                  <stop offset="1" stopColor="#a5f3fc" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group relative p-12 rounded-[30px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-40 pointer-events-none" />
              <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10">
                <span className="text-lg text-white/80">{item.icon}</span>
              </div>
              <h3 className="text-4xl font-bold mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-[220px] mx-auto">
                {item.desc}
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-10 h-[2px] bg-white/20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;
