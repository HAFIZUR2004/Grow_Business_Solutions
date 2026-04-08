"use client";

import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl z-50 border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Brand Identity - Using your Logo Theme */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-11 h-11 bg-white rounded-xl p-1 shadow-lg shadow-green-500/10 transition-all duration-500 group-hover:shadow-green-500/30 group-hover:scale-105">
            <Image
              src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
              alt="Grow Business Solutions"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter italic leading-none text-white">
              GROW
            </span>
            <span className="text-[9px] font-mono text-[#22c55e] tracking-[0.3em] font-bold uppercase leading-tight">
              Business Solutions
            </span>
          </div>
        </div>

        {/* Navigation - Clean & Modern (16px) */}
        <div className="hidden md:flex gap-10 text-base font-semibold text-slate-300">
          {["Services", "Portfolio", "Process", "Insights"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#22c55e] transition-all relative group py-1"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#22c55e] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Brand Colored Button (Green & Blue Synergy) */}
        <button className="relative group overflow-hidden px-7 py-2.5 rounded-xl bg-[#22c55e] text-[#020617] font-black text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 active:translate-y-0">
          <span className="relative z-10 flex items-center gap-2">
            Start Project
          </span>
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
        </button>
      </div>
    </nav>
  );
}
