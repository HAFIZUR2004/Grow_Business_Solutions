"use client";

import { useEffect, useRef, useState } from "react";

/* ─── tiny helpers ─── */
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[9px] tracking-[0.18em] uppercase border border-white/20 text-white/50 px-2 py-0.5 rounded-sm">
    {children}
  </span>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] tracking-[0.25em] text-[#6c5ce7] uppercase mb-3">
    {children}
  </p>
);

/* ─── blob 3-D placeholder (pure CSS) ─── */
function BlobVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#111]">
      <div
        className="w-48 h-48 rounded-full animate-spin-slow"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #b0a8ff 0%, #6c5ce7 40%, #1a1a2e 80%)",
          filter: "blur(0px)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
          animation: "morph 8s ease-in-out infinite",
          boxShadow: "0 0 80px #6c5ce755",
        }}
      />
      <style>{`
        @keyframes morph {
          0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; transform: rotate(0deg); }
          25%      { border-radius: 30% 70% 40% 60% / 60% 40% 70% 30%; transform: rotate(90deg); }
          50%      { border-radius: 50% 50% 30% 70% / 40% 60% 50% 50%; transform: rotate(180deg); }
          75%      { border-radius: 70% 30% 60% 40% / 70% 50% 30% 60%; transform: rotate(270deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0b0f0e]">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#6c5ce7]/10 blur-3xl" />
      </div>

      {/* Live badge */}
      <div className="mb-8 flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur px-4 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6c5ce7] animate-pulse" />
        <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">
          A Live Deployment: P.A.B.L.O.
        </span>
      </div>

      <h1 className="relative z-10 font-black leading-none tracking-tight">
        <span className="block text-[clamp(3.5rem,12vw,8rem)] text-white">JOIN THE</span>
        <span
          className="block text-[clamp(3.5rem,12vw,8rem)] text-transparent italic"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" }}
        >
          DIGITAL
        </span>
        <span
          className="block text-[clamp(3rem,10vw,7rem)] italic"
          style={{
            background: "linear-gradient(135deg,#b0a8ff 0%,#6c5ce7 60%,#4a3fa0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PROTOCOL
        </span>
      </h1>

      <p className="relative z-10 mt-6 max-w-md text-sm text-white/40 leading-relaxed">
        Architecting the future of enterprise systems through obsidian-grade logic and cinematic engineering standards.
      </p>

      <div className="relative z-10 mt-10 flex flex-wrap gap-4 justify-center">
        <button className="bg-[#6c5ce7] hover:bg-[#7d6ff0] transition-colors px-7 py-3 rounded-full text-xs font-bold tracking-[0.18em] uppercase">
          Explore Open Roles
        </button>
        <button className="border border-white/20 hover:border-white/40 transition-colors px-7 py-3 rounded-full text-xs font-bold tracking-[0.18em] uppercase text-white/70">
          Our Philosophy
        </button>
      </div>
    </section>
  );
}

/* ─── MANIFESTO ─── */
function Manifesto() {
  return (
    <section className="bg-[#0b0f0e] py-24 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <SectionLabel>// Zone: Manifesto</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-6">
          PRECISION OVER<br />CONVENIENCE.
        </h2>
        <p className="text-sm text-white/40 leading-relaxed mb-10 max-w-sm">
          We don't just build software. We forge digital environments where data flows with architectural elegance. Our culture is rooted in deep focus, radical autonomy, and a relentless pursuit of engineering prestige.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {[
            { num: "01.", title: "Async Native", desc: "Designed for deep work. No useless stand-ups." },
            { num: "02.", title: "Tech Sovereign", desc: "We own the stack. No technical debt compromises." },
          ].map((item) => (
            <div key={item.num}>
              <p className="text-[#6c5ce7] font-black text-lg mb-1">{item.num}</p>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">{item.title}</p>
              <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3-D blob */}
      <div className="h-[340px] md:h-[420px]">
        <BlobVisual />
      </div>
    </section>
  );
}

/* ─── VACANCIES ─── */
const roles = [
  {
    id: 1,
    tags: ["System Architecture", "Full-Time"],
    title: "Senior System Architect",
    desc: "Lead the foundation of our next-gen cloud orchestrator. Requires deep knowledge of distributed systems and low-level optimization.",
    stack: ["Go", "Rust", "Kubernetes", "gRPC"],
    salary: "$160k – $220k",
    featured: true,
    applyColor: "#6c5ce7",
  },
  {
    id: 2,
    tags: ["Intelligence"],
    title: "AI Integration Specialist",
    desc: "Deploying LLM frameworks within enterprise data pipelines for real-time inferences.",
    stack: ["Python", "Keras", "CUDA"],
    featured: false,
    cta: "View Protocol",
  },
  {
    id: 3,
    tags: ["Frontend"],
    title: "Frontend Engineer (Framer/Tailwind)",
    desc: "Crafting cinematic web experiences with fluid motion and pixel-perfect shadow aesthetics.",
    stack: ["Next.js", "Framer Motion", "TypeScript"],
    featured: false,
    applyColor: "#6c5ce7",
  },
  {
    id: 4,
    tags: [],
    title: "General Application",
    desc: "Don't see your role? Pitch your own engineering protocol.",
    icon: true,
    featured: false,
  },
  {
    id: 5,
    tags: ["Reliability"],
    title: "Site Reliability Engineer",
    desc: "Managing the global node network with 99.98% uptime through automated self-healing systems.",
    stack: ["Terraform", "K8s", "Debian"],
    featured: false,
    applyColor: "#6c5ce7",
  },
];

function VacancyCard({ role }: { role: (typeof roles)[0] }) {
  if (role.icon) {
    return (
      <div className="border border-white/10 bg-[#121a18] rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[180px]">
        <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xl">
          +
        </div>
        <p className="text-white font-bold text-sm tracking-wide uppercase">{role.title}</p>
        <p className="text-white/35 text-xs leading-relaxed">{role.desc}</p>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-xl p-6 flex flex-col gap-4 ${
        role.featured
          ? "border-[#6c5ce7]/40 bg-[#13112a] col-span-1 md:col-span-2"
          : "border-white/10 bg-[#121a18]"
      }`}
    >
      {/* Tags */}
      {role.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {role.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}

      <h3
        className={`font-black text-white leading-tight ${
          role.featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {role.title}
      </h3>
      <p className="text-white/40 text-xs leading-relaxed">{role.desc}</p>

      {role.stack && (
        <div className="flex flex-wrap gap-2">
          {role.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
        {role.salary && (
          <p className="text-[10px] tracking-widest text-white/40 uppercase">
            Salary: {role.salary}
          </p>
        )}
        {role.applyColor && (
          <button
            className="px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
            style={{ backgroundColor: role.applyColor }}
          >
            Apply Now
          </button>
        )}
        {role.cta && (
          <button className="text-[10px] tracking-[0.18em] uppercase text-white/50 hover:text-white transition-colors">
            {role.cta} →
          </button>
        )}
      </div>
    </div>
  );
}

function Vacancies() {
  return (
    <section className="bg-[#0b0f0e] py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <SectionLabel>Operational Series</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <h2 className="text-5xl md:text-6xl font-black text-white leading-none">
          AVAILABLE<br />VACANCIES
        </h2>
        <div className="flex gap-8">
          {[
            { dept: "Engineering", count: "12 Roles" },
            { dept: "Design", count: "04 Roles" },
          ].map((d) => (
            <div key={d.dept}>
              <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">{d.dept}</p>
              <p className="text-white font-black text-lg">{d.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((r) => (
          <VacancyCard key={r.id} role={r} />
        ))}
      </div>
    </section>
  );
}

/* ─── WHY BUILD WITH US ─── */
const perks = [
  {
    icon: "🚀",
    title: "Equity & Ownership",
    desc: "Generous stock options. You are not an employee; you are a primary stakeholder in the ecosystem's growth.",
  },
  {
    icon: "🌐",
    title: "Remote Autonomous",
    desc: "Work from any node in the world. We focus on output quality, not clock-in timestamps.",
  },
  {
    icon: "🛡",
    title: "Health Protocol",
    desc: "Premium global health coverage and a mandatory 4-week \"Deep Sabbath\" sabbatical every year.",
  },
];

function WhyBuild() {
  return (
    <section className="bg-[#0b0f0e] py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <SectionLabel>Protocol · Rewards</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white">WHY BUILD WITH US</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {perks.map((p) => (
          <div
            key={p.title}
            className="border border-white/10 bg-[#121a18] rounded-xl p-7 flex flex-col gap-4 hover:border-[#6c5ce7]/40 transition-colors"
          >
            <span className="text-2xl">{p.icon}</span>
            <h3 className="text-white font-black text-sm tracking-[0.1em] uppercase">{p.title}</h3>
            <p className="text-white/35 text-xs leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CtaBanner() {
  return (
    <section className="bg-[#0b0f0e] py-32 px-6 text-center relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full bg-[#6c5ce7]/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <h2 className="font-black text-white leading-none text-[clamp(2.5rem,9vw,6rem)]">
          READY TO INITIATE
        </h2>
        <h2
          className="font-black italic text-[clamp(2.5rem,9vw,6rem)] leading-none underline decoration-[#6c5ce7] underline-offset-4"
          style={{
            background: "linear-gradient(135deg,#b0a8ff,#6c5ce7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SEQUENCE?
        </h2>
        <p className="mt-6 text-sm text-white/40 max-w-sm mx-auto leading-relaxed">
          Join a team that values technical mastery over corporate tradition. Your best work starts here.
        </p>
        <button className="mt-10 bg-[#6c5ce7] hover:bg-[#7d6ff0] transition-colors px-9 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
          Initiate Application
        </button>
      </div>
    </section>
  );
}

/* ─── ROOT ─── */
export default function CareersPage() {
  return (
    <main className="bg-[#0b0f0e] text-white min-h-screen">
      <Hero />
      <Manifesto />
      <Vacancies />
      <WhyBuild />
      <CtaBanner />
    </main>
  );
}