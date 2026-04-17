"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { translations } from "@/constants/translations";

import {
  FaGithub,
  FaLinkedinIn,
  FaChevronUp,
  FaShieldAlt,
  FaFacebookF,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useLanguage } from "@/constants/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang];

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

      nodes = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(16, 185, 129, 0.4)"
            : "rgba(52, 211, 153, 0.3)",
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
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.1 * (1 - d / 150);

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, "rgba(16, 185, 129, " + opacity + ")");
            gradient.addColorStop(1, "rgba(52, 211, 153, " + opacity + ")");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
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
    const refreshTrigger = () => ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          onEnter: refreshTrigger,
        },
      });
    }, footerRef);

    window.addEventListener("load", refreshTrigger);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refreshTrigger);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#02040a] text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="https://i.postimg.cc/mZ3G5tqg/5542.jpg"
          alt="bg"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a]" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand - Font size optimized */}
          <div className="lg:col-span-5 space-y-6 reveal-item">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 bg-white rounded-xl p-1">
                <Image
                  src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
                  alt="Logo"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black italic leading-none tracking-tight">
                  GROW
                </h2>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  Business Solutions
                </span>
              </div>
            </div>
            <p className="text-base text-white/50 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
          </div>

          {/* Links - Scaled down */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 reveal-item">
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-[0.2em]">
                {t.solutions}
              </h4>
              <ul className="space-y-3 text-sm font-medium text-white/40">
                {[t.development, t.strategy, t.security].map((item) => (
                  <li
                    key={item}
                    className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FiArrowUpRight size={14} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-[0.2em]">
                {t.protocol}
              </h4>
              <ul className="space-y-3 text-sm font-medium text-white/40">
                {[t.corev3, t.uptime, t.nodes].map((item) => (
                  <li
                    key={item}
                    className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FiArrowUpRight size={14} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6 reveal-item lg:text-right">
            <h4 className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-[0.2em]">
              {t.terminal}
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:contact@growbusiness.solutions"
                className="text-lg font-bold block hover:text-emerald-400 transition-colors"
              >
                growbusinesssolutionsbd@gmail.com
              </a>
              <div className="flex gap-3 lg:justify-end">
                {[
                  {
                    Icon: FaFacebookF,
                    url: "https://www.facebook.com/growbusinesssolutionsbd",
                  },
                  {
                    Icon: FaGithub,
                    url: "https://github.com/Grow-Businesssolutionsbd",
                  },
                  { Icon: FaXTwitter, url: "https://x.com/GrowBS_BD" },
                  {
                    Icon: FaInstagram,
                    url: "https://www.instagram.com/growbusinesssolutions/",
                  },
                  {
                    Icon: FaLinkedinIn,
                    url: "https://www.linkedin.com/company/grow-business-solutionsbd/",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    <social.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="reveal-item border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span>© {currentYear} GROW_BUSINESS_SOLUTIONS</span>
            <span className="hidden md:flex items-center gap-2">
              <FaShieldAlt /> ENCRYPTED_V4
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs font-bold text-white/30 hover:text-white transition-all uppercase tracking-tighter"
          >
            <span>{t.returnTop}</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
              <FaChevronUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}