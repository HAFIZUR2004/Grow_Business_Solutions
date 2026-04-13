"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── tiny helpers ─── */
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[9px] tracking-[0.18em] uppercase border border-white/20 text-white/50 px-2 py-0.5 rounded-sm">
    {children}
  </span>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.p 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="text-[10px] tracking-[0.25em] text-[#6c5ce7] uppercase mb-3"
  >
    {children}
  </motion.p>
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

/* ─── HERO SECTION (Enhanced) ─── */
function CareerHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      nodes = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 0.8,
        color:
          Math.random() > 0.6
            ? "rgba(108, 92, 231, 0.45)"
            : "rgba(162, 155, 254, 0.35)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            gradient.addColorStop(0, "rgba(108, 92, 231, " + opacity + ")");
            gradient.addColorStop(1, "rgba(162, 155, 254, " + opacity + ")");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        if (n.r > 1.8) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(108, 92, 231, 0.08)`;
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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.section 
  style={{ opacity: heroOpacity, scale: heroScale }}
  className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10"
>
  {/* Particle Canvas */}
  <canvas
    ref={canvasRef}
    className="fixed inset-0 w-full h-full pointer-events-none opacity-35 z-0"
  />

  {/* Gradient Glow */}
  <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#6c5ce7]/10 blur-[120px] rounded-full pointer-events-none z-0" />
  <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00cec9]/10 blur-[120px] rounded-full pointer-events-none z-0" />

  {/* Wave */}
  <svg
    className="absolute bottom-0 left-0 w-full h-[160px] sm:h-[200px] pointer-events-none z-1"
    viewBox="0 0 1440 220"
    preserveAspectRatio="none"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2 }}
      d="M0,140 C200,80 400,200 600,130 C800,60 1000,180 1200,110 C1320,75 1400,130 1440,120"
      fill="none"
      stroke="rgba(108,92,231,0.35)"
      strokeWidth="1.5"
    />
  </svg>

  {/* Content */}
  <div className="relative z-10 w-full max-w-6xl mx-auto text-center md:text-left">
    
    {/* Hiring Badge */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-md px-3 py-1.5 rounded-full mb-6"
    >
      <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
      <span className="text-[9px] sm:text-[11px] tracking-[0.3em] text-white uppercase font-bold">
        WE ARE HIRING
      </span>
    </motion.div>

    {/* Heading */}
    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-black leading-tight tracking-tight text-white 
      text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] mb-5"
    >
      JOIN THE DIGITAL
      <br className="hidden sm:block" />
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]">
        PROTOCOL
      </span>
    </motion.h1>

    {/* Paragraph */}
    <motion.p 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-8"
    >
      Architecting high-performance digital ecosystems for a data-driven future.
      Harness AI to transform complex processes into elegant automated solutions.
    </motion.p>

    {/* Buttons */}
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        className="w-full sm:w-auto bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase"
      >
        Explore Open Roles
      </motion.button>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        className="w-full sm:w-auto border border-white/20 px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase"
      >
        Our Philosophy
      </motion.button>
    </motion.div>

    {/* Scroll */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[8px] tracking-[0.3em] text-white/30 uppercase">
        Scroll
      </span>
      <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
    </motion.div>
  </div>
</motion.section>
  );
}

/* ─── MANIFESTO (Enhanced) ─── */
function Manifesto() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionLabel>Zone: Manifesto</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-6">
            PRECISION OVER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">CONVENIENCE.</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-10 max-w-sm">
            We don&apos;t just build software. We forge digital environments where
            data flows with architectural elegance. Our culture is rooted in deep
            focus, radical autonomy, and a relentless pursuit of engineering
            prestige.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                num: "01.",
                title: "Async Native",
                desc: "Designed for deep work. No useless stand-ups.",
              },
              {
                num: "02.",
                title: "Tech Sovereign",
                desc: "We own the stack. No technical debt compromises.",
              },
            ].map((item, idx) => (
              <motion.div 
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-[#6c5ce7] font-black text-lg mb-1">
                  {item.num}
                </p>
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">
                  {item.title}
                </p>
                <p className="text-white/35 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3-D blob */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-[340px] md:h-[420px]"
        >
          <BlobVisual />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── VACANCIES (Enhanced) ─── */
const roles = [
  {
    id: 1,
    tags: ["System Architecture", "Full-Time"],
    title: "Senior System Architect",
    desc: "Lead the foundation of our next-gen cloud orchestrator. Requires deep knowledge of distributed systems and low-level optimization.",
    stack: ["Go", "Rust", "Kubernetes", "gRPC"],
    salary: "$160k – $220k",
    featured: true,
    color: "#6c5ce7",
  },
  {
    id: 2,
    tags: ["Intelligence", "AI/ML"],
    title: "AI Integration Specialist",
    desc: "Deploying LLM frameworks within enterprise data pipelines for real-time inferences and autonomous decision-making.",
    stack: ["Python", "LangChain", "CUDA", "TensorFlow"],
    featured: false,
    color: "#00cec9",
  },
  {
    id: 3,
    tags: ["Frontend", "UI/UX"],
    title: "Frontend Engineer (Framer/Tailwind)",
    desc: "Crafting cinematic web experiences with fluid motion, pixel-perfect shadow aesthetics, and micro-interactions.",
    stack: ["Next.js", "Framer Motion", "TypeScript", "Tailwind"],
    featured: false,
    color: "#a29bfe",
  },
  {
    id: 4,
    tags: ["Infrastructure", "SRE"],
    title: "Site Reliability Engineer",
    desc: "Managing the global node network with 99.98% uptime through automated self-healing systems and chaos engineering.",
    stack: ["Terraform", "K8s", "AWS", "Prometheus"],
    featured: false,
    color: "#6c5ce7",
  },
  {
    id: 5,
    tags: [],
    title: "General Application",
    desc: "Don't see your role? Pitch your own engineering protocol. We're always looking for exceptional talent.",
    icon: true,
    featured: false,
  },
];

function VacancyCard({ role }: { role: (typeof roles)[0] }) {
  if (role.icon) {
    return (
      <motion.div 
        whileHover={{ y: -5, borderColor: "#6c5ce7" }}
        className="border border-white/10 bg-[#11111e]/80 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[220px] group cursor-pointer transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-2xl group-hover:scale-110 transition-transform">
          +
        </div>
        <p className="text-white font-bold text-base tracking-wide uppercase">
          {role.title}
        </p>
        <p className="text-white/35 text-xs leading-relaxed">{role.desc}</p>
        <button className="mt-2 text-[10px] tracking-[0.18em] uppercase text-[#6c5ce7] hover:text-white transition-colors">
          Submit Pitch →
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`border rounded-xl p-6 flex flex-col gap-4 backdrop-blur-sm transition-all duration-300 ${
        role.featured
          ? "border-[#6c5ce7]/40 bg-gradient-to-br from-[#13112a]/90 to-[#11111e]/90 col-span-1 md:col-span-2 shadow-[0_0_30px_rgba(108,92,231,0.1)]"
          : "border-white/10 bg-[#11111e]/80 hover:border-[#6c5ce7]/30"
      }`}
    >
      {role.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {role.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}

      <h3
        className={`font-black text-white leading-tight ${
          role.featured ? "text-2xl md:text-3xl" : "text-xl"
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
        <button
          className="px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase transition-all hover:opacity-80 hover:scale-105"
          style={{ backgroundColor: role.color || "#6c5ce7" }}
        >
          Apply Now →
        </button>
      </div>
    </motion.div>
  );
}

function Vacancies() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <SectionLabel>Operational Series</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <h2 className="text-5xl md:text-6xl font-black text-white leading-none">
          AVAILABLE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00cec9]">VACANCIES</span>
        </h2>
        <div className="flex gap-8">
          {[
            { dept: "Engineering", count: "12 Roles", color: "#6c5ce7" },
            { dept: "Design", count: "04 Roles", color: "#00cec9" },
          ].map((d) => (
            <div key={d.dept}>
              <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">
                {d.dept}
              </p>
              <p className="text-white font-black text-lg" style={{ color: d.color }}>
                {d.count}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {roles.map((r) => (
          <VacancyCard key={r.id} role={r} />
        ))}
      </div>
    </section>
  );
}

/* ─── WHY BUILD WITH US (Enhanced) ─── */
const perks = [
  {
    icon: "🚀",
    title: "Equity & Ownership",
    desc: "Generous stock options. You are not an employee; you are a primary stakeholder in the ecosystem's growth.",
    color: "#6c5ce7"
  },
  {
    icon: "🌐",
    title: "Remote Autonomous",
    desc: "Work from any node in the world. We focus on output quality, not clock-in timestamps.",
    color: "#00cec9"
  },
  {
    icon: "🛡",
    title: "Health Protocol",
    desc: "Premium global health coverage and a mandatory 4-week 'Deep Sabbath' sabbatical every year.",
    color: "#a29bfe"
  },
  {
    icon: "⚡",
    title: "Learning Budget",
    desc: "$5,000 annual budget for conferences, courses, and cutting-edge certifications.",
    color: "#fdcb6e"
  },
];

function WhyBuild() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <div className="text-center mb-14">
        <SectionLabel>Protocol · Rewards</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          WHY BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00cec9]">WITH US</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, borderColor: p.color }}
            className="border border-white/10 bg-[#11111e]/80 backdrop-blur-sm rounded-xl p-7 flex flex-col gap-4 transition-all duration-300 cursor-pointer"
          >
            <span className="text-3xl">{p.icon}</span>
            <h3 className="text-white font-black text-sm tracking-[0.1em] uppercase">
              {p.title}
            </h3>
            <p className="text-white/35 text-xs leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA BANNER (Enhanced) ─── */
function CtaBanner() {
  return (
    <section className="relative bg-transparent py-32 px-6 text-center overflow-hidden z-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full bg-[#6c5ce7]/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-white leading-none text-[clamp(2.5rem,9vw,6rem)]">
            READY TO INITIATE
          </h2>
          <h2
            className="font-black italic text-[clamp(2.5rem,9vw,6rem)] leading-none underline decoration-[#6c5ce7] underline-offset-8 mt-2"
            style={{
              background: "linear-gradient(135deg,#b0a8ff,#6c5ce7,#00cec9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SEQUENCE?
          </h2>
          <p className="mt-6 text-sm text-white/40 max-w-sm mx-auto leading-relaxed">
            Join a team that values technical mastery over corporate tradition.
            Your best work starts here.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all px-9 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
          >
            Initiate Application
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ROOT ─── */
export default function CareersPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      nodes = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.2 + 0.6,
        color:
          Math.random() > 0.6
            ? "rgba(108, 92, 231, 0.4)"
            : "rgba(162, 155, 254, 0.3)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.1 * (1 - d / 160);
            ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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

  return (
    <main className="relative min-h-screen bg-[#05070a] text-white overflow-x-hidden">
      {/* Full Page Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30 z-0"
      />

      {/* Fixed Gradient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6c5ce7]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00cec9]/8 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Page Content */}
      <CareerHero />
      <Manifesto />
      <Vacancies />
      <WhyBuild />
      <CtaBanner />
    </main>
  );
}