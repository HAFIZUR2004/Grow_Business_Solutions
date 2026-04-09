"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    date: "April 09, 2026",
    category: "Development",
    title: "The Future of MERN Stack in Enterprise Solutions",
    excerpt:
      "Exploring why high-scale businesses are migrating to Next.js and Node architectures.",
  },
  {
    date: "April 02, 2026",
    category: "UI/UX Design",
    title: "Engineering Motion: Why Micro-interactions Matter",
    excerpt:
      "How GSAP and Framer Motion can increase user retention by up to 40%.",
  },
  {
    date: "March 25, 2026",
    category: "Strategy",
    title: "Optimizing Web Vitals for Global Growth",
    excerpt:
      "A technical guide on achieving perfect lighthouse scores in 2026.",
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="pt-44 pb-24 px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-[#22c55e]" />
            <p className="text-[#22c55e] font-mono text-xs uppercase tracking-[0.5em] font-bold">
              Industry Intelligence
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Technical <br />{" "}
            <span className="text-white/10 italic">Insights.</span>
          </h1>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 gap-6">
          {articles.map((post, idx) => (
            <div
              key={idx}
              className="group relative bg-[#0a101f] border border-white/5 p-8 md:p-12 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4 text-xs font-mono">
                  <span className="text-[#22c55e]">{post.category}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-slate-500">{post.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#22c55e] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <button className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#22c55e] group-hover:text-[#020617] transition-all duration-500">
                <span className="text-2xl group-hover:rotate-45 transition-transform duration-500">
                  ↗
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
