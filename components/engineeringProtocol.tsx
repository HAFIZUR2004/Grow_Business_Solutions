"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    color: "#b5a7ff",
    align: "left",
  },
  {
    id: "02",
    color: "#3ee8f6",
    align: "right",
  },
  {
    id: "03",
    color: "#b5a7ff",
    align: "left",
  },
  {
    id: "04",
    color: "#3ee8f6",
    align: "right",
  },
];

const EngineeringProtocol = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    // --- Particle Network Canvas Logic ---
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

      // নোড রি-ইনিশিয়ালাইজ
      nodes = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(181, 167, 255, 0.7)"
            : "rgba(62, 232, 246, 0.6)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // লাইন কানেক্ট করা (distance based)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(
            nodes[i].x - nodes[j].x,
            nodes[i].y - nodes[j].y,
          );
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // দূরত্ব অনুযায়ী opacity এবং গ্রেডিয়েন্ট স্টাইল
            const opacity = 0.12 * (1 - d / 160);

            // দুটি কালার মিক্স করে লাইনের কালার
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
            );
            gradient.addColorStop(0, "rgba(181, 167, 255, " + opacity + ")");
            gradient.addColorStop(1, "rgba(62, 232, 246, " + opacity + ")");

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

        // ছোট ডটের জন্য গ্লো ইফেক্ট
        if (n.r > 1.5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(181, 167, 255, 0.1)`;
          ctx.fill();
        }

        n.x += n.vx;
        n.y += n.vy;

        // বাউন্ডারি চেক
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

    // --- GSAP Scroll Animations ---
    if (lineRef.current) {
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
    }

    steps.forEach((_, i) => {
      gsap.fromTo(
        `.step-item-${i}`,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: `.step-item-${i}`,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
          },
        },
      );
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  type StepType = {
    bgText: string;
    title: string;
    desc: string;
  };

  return (
    <section
      ref={scrollRef}
      className="relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden"
    >
      {/* Particle Network Canvas - পুরো সেকশন জুড়ে */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0"
      />

      {/* সাইড গ্লো ইফেক্ট */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2 className="text-6xl md:text-8xl font-black text-center mb-40 tracking-tighter">
          {t.protocolTitle}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 italic font-light">
            {t.protocolTitleItalic}
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
            {t.steps.map((step: StepType, idx: number) => {
              const design = steps[idx];
              return (
                <div
                  key={idx}
                  className={`step-item-${idx} flex flex-col md:flex-row items-center w-full ${
                    design.align === "left"
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      design.align === "left"
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
                        style={{ color: design.color }}
                      >
                        {design.id}. {step.title}
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
                        backgroundColor: design.color,
                        boxShadow: `0 0 15px ${design.color}`,
                      }}
                    />
                  </div>

                  <div
                    className={`hidden md:block w-1/2 ${
                      design.align === "left" ? "pl-20" : "pr-20"
                    }`}
                  >
                    <span className="text-4xl font-black text-white/5 uppercase tracking-widest italic select-none">
                      {step.bgText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringProtocol;
