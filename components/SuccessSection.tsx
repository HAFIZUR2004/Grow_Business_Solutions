"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    title: "8+ Years",
    desc: "Of dedicated craft in digital architecture.",
    icon: "✦",
    isCounter: true,
    targetValue: 8,
    suffix: "+"
  },
  {
    title: "20+ Projects",
    desc: "High-impact solutions delivered globally.",
    icon: "🚀",
    isCounter: true,
    targetValue: 20,
    suffix: "+"
  },
  {
    title: "100% Client",
    desc: "Satisfaction rate across all partnerships.",
    icon: "✔",
    isCounter: true,
    targetValue: 100,
    suffix: "%"
  },
];

const SuccessSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counters, setCounters] = useState([0, 0, 0]);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // কাউন্টার অ্যানিমেশন
  useEffect(() => {
    if (inView) {
      stats.forEach((stat, idx) => {
        if (stat.isCounter) {
          let start = 0;
          const end = stat.targetValue;
          const duration = 2000; // 2 সেকেন্ড
          const increment = end / (duration / 16); // 60fps এর জন্য
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[idx] = end;
                return newCounters;
              });
              clearInterval(timer);
            } else {
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[idx] = Math.floor(start);
                return newCounters;
              });
            }
          }, 16);
          
          return () => clearInterval(timer);
        }
      });
    }
  }, [inView]);

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
            ? "rgba(196, 181, 253, 0.7)"
            : "rgba(165, 243, 252, 0.6)",
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
            const opacity = 0.12 * (1 - d / 160);
            
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, "rgba(196, 181, 253, " + opacity + ")");
            gradient.addColorStop(1, "rgba(165, 243, 252, " + opacity + ")");
            
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
        
        if (n.r > 1.5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 181, 253, 0.1)`;
          ctx.fill();
        }
        
        n.x += n.vx;
        n.y += n.vy;
        
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > canvas.width) { n.x = canvas.width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > canvas.height) { n.y = canvas.height; n.vy *= -1; }
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
    <section
      ref={sectionRef}
      className="relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden"
    >
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0"
      />

      {/* Glow Effects */}
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

          {/* Connecting Wires */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full w-[1000px] h-[100px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" fill="none">
              <path
                d="M500 0 C 500 50, 166 50, 166 100"
                stroke="url(#wireGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-30"
              />
              <path
                d="M500 0 L 500 100"
                stroke="url(#wireGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-30"
              />
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

        {/* Cards with Animated Counters */}
        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group relative p-12 rounded-[30px] bg-white/[0.03] border border-white/10 transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-40 pointer-events-none" />
              
              <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10">
                <span className="text-lg text-white/80">{item.icon}</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-4 tracking-tight">
                {item.isCounter ? (
                  <span>
                    {counters[i]}
                    {item.suffix}
                  </span>
                ) : (
                  item.title
                )}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed max-w-[220px] mx-auto">
                {item.desc}
              </p>
              
              <div className="mt-8 flex justify-center">
                <div className="w-10 h-[2px] bg-white/20 rounded-full group-hover:w-20 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;