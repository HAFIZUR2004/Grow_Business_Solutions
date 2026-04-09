"use client";

import { useState, useEffect, useRef } from "react";

export default function ContactSection() {
  const [signalAngle, setSignalAngle] = useState(0);
  const [dots, setDots] = useState<{ x: number; y: number; opacity: number }[]>([]);
  const animRef = useRef<number>();

  useEffect(() => {
    // Generate random dots on the radar
    setDots(
      Array.from({ length: 6 }, () => ({
        x: Math.random() * 80 - 40,
        y: Math.random() * 80 - 40,
        opacity: Math.random() * 0.6 + 0.3,
      }))
    );

    let angle = 0;
    const animate = () => {
      angle = (angle + 0.4) % 360;
      setSignalAngle(angle);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current!);
  }, []);

  return (
    <section className="min-h-screen bg-[#0d1a18] text-white flex items-center px-8 md:px-16 py-20">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — Form */}
        <div className="flex flex-col gap-8">
          {/* Heading */}
          <div>
            <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tight">
              GET IN
            </h1>
            <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tight text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.25)", fontStyle: "italic" }}>
              TOUCH
            </h1>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Our architecture is built for performance. Initiate the protocol to connect with our core engineering team.
          </p>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Identity Vector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
                Identity Vector
              </label>
              <input
                type="text"
                placeholder="NAME / ALIAS"
                className="bg-transparent border border-white/20 text-white placeholder:text-white/20 placeholder:text-xs px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>

            {/* Signal Channel */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
                Signal Channel
              </label>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border border-white/20 text-white placeholder:text-white/20 placeholder:text-xs px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>

            {/* Payload Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
                Payload Description
              </label>
              <textarea
                placeholder="YOUR MESSAGE / DATA"
                rows={5}
                className="bg-transparent border border-white/20 text-white placeholder:text-white/20 placeholder:text-xs px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-white/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button className="flex items-center gap-3 bg-[#6c5ce7] hover:bg-[#7d6ff0] transition-colors px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              INITIATE CONNECTION
              <span className="text-base">↗</span>
            </button>
          </div>

          {/* Divider */}
          <hr className="border-white/10" />

          {/* Contact Info */}
          <div className="flex gap-12 text-xs">
            <div>
              <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1">Secure Terminal</p>
              <p className="text-white/70">ops@obsidian.io</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1">Telegram</p>
              <p className="text-white/70">@obsidian_arc</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1">Mainframe</p>
              <p className="text-white/70">Zurich, CH</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Radar */}
        <div className="relative flex items-center justify-center">
          {/* Signal strength badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#1a2e2b] border border-white/10 px-3 py-1.5 rounded-full z-10">
            <span className="w-2 h-2 rounded-full bg-[#6c5ce7] animate-pulse" />
            <span className="text-[10px] tracking-widest text-white/70 uppercase">Signal_Strength: 98%</span>
          </div>

          {/* Node verified badge */}
          <div className="absolute bottom-8 right-0 bg-[#1a2e2b] border border-white/10 px-3 py-1.5 rounded-full z-10">
            <span className="text-[10px] tracking-widest text-white/70 uppercase">Node_Verified: LX-09</span>
          </div>

          {/* Radar Circle */}
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
            {/* Outer rings */}
            {[1, 0.72, 0.48, 0.28].map((scale, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-white/10"
                style={{ transform: `scale(${scale})`, margin: "auto", top: 0, left: 0, right: 0, bottom: 0 }}
              />
            ))}

            {/* Cross-hair lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-white/5" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-white/5" />
            </div>

            {/* Radar sweep */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 420 420"
              style={{ transform: `rotate(${signalAngle}deg)`, transformOrigin: "center" }}
            >
              <defs>
                <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M210 210 L210 10 A200 200 0 0 1 380 290 Z"
                fill="url(#sweep)"
              />
              <line x1="210" y1="210" x2="210" y2="10" stroke="#6c5ce7" strokeWidth="1" strokeOpacity="0.6" />
            </svg>

            {/* Dots on radar */}
            {dots.map((dot, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#6c5ce7]"
                style={{
                  top: `calc(50% + ${dot.y}px)`,
                  left: `calc(50% + ${dot.x}px)`,
                  opacity: dot.opacity,
                }}
              />
            ))}

            {/* Center icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="4" fill="#6c5ce7" />
                <circle cx="8" cy="8" r="3" fill="#6c5ce7" opacity="0.7" />
                <circle cx="24" cy="8" r="3" fill="#6c5ce7" opacity="0.7" />
                <circle cx="8" cy="24" r="3" fill="#6c5ce7" opacity="0.7" />
                <circle cx="24" cy="24" r="3" fill="#6c5ce7" opacity="0.7" />
                <line x1="16" y1="16" x2="8" y2="8" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
                <line x1="16" y1="16" x2="24" y2="8" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
                <line x1="16" y1="16" x2="8" y2="24" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
                <line x1="16" y1="16" x2="24" y2="24" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
              </svg>
              <span className="text-[9px] tracking-[0.25em] text-white/40 uppercase">Global Sync</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}