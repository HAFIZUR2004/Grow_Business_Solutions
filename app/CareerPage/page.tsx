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

/* ─── HERO SECTION ─── */
function CareerHero() {
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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-35 z-0"
      />

      {/* Gradient Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6c5ce7]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00cec9]/8 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Bottom wave lines */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[220px] pointer-events-none z-1"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,140 C200,80 400,200 600,130 C800,60 1000,180 1200,110 C1320,75 1400,130 1440,120"
          fill="none"
          stroke="rgba(108,92,231,0.35)"
          strokeWidth="1.5"
        />
        <path
          d="M0,170 C180,110 380,210 580,155 C780,100 980,200 1180,145 C1340,105 1420,155 1440,148"
          fill="none"
          stroke="rgba(100,60,200,0.22)"
          strokeWidth="1"
        />
      </svg>

      {/* Star Icon */}
      

      {/* Content - Centered with max-width */}
      <div className="relative z-10 w-full  mx-auto px-6 md:px-16 lg:px-24 text-center">
        

        <h1 className="font-black md:mt-9 leading-[0.9] tracking-tighter text-white text-[clamp(3rem,8vw,5.5rem)] mb-6">
          JOIN THE DIGITAL
          <br />
          PROTOCOL
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 leading-relaxed mb-10">
          Architecting high-performance digital ecosystems for a data-driven future.
          Harness the power of AI to transform complex processes into elegant,
          obsidian-grade automated solutions.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-[#6c5ce7] hover:bg-[#7c3aed] transition-all px-8 py-4 rounded-full text-sm font-black tracking-wider uppercase shadow-[0_0_30px_rgba(108,92,231,0.4)]">
            Explore Open Roles
          </button>
          <button className="border border-white/20 hover:bg-white/5 transition-all px-8 py-4 rounded-full text-sm font-black tracking-wider uppercase backdrop-blur-sm">
            Our Philosophy
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── MANIFESTO ─── */
function Manifesto() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel>Zone: Manifesto</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-6">
            PRECISION OVER
            <br />
            CONVENIENCE.
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
            ].map((item) => (
              <div key={item.num}>
                <p className="text-[#6c5ce7] font-black text-lg mb-1">
                  {item.num}
                </p>
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">
                  {item.title}
                </p>
                <p className="text-white/35 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-D blob */}
        <div className="h-[340px] md:h-[420px]">
          <BlobVisual />
        </div>
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
      <div className="border border-white/10 bg-[#121a18]/80 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[180px]">
        <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xl">
          +
        </div>
        <p className="text-white font-bold text-sm tracking-wide uppercase">
          {role.title}
        </p>
        <p className="text-white/35 text-xs leading-relaxed">{role.desc}</p>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-xl p-6 flex flex-col gap-4 backdrop-blur-sm ${
        role.featured
          ? "border-[#6c5ce7]/40 bg-[#13112a]/80 col-span-1 md:col-span-2"
          : "border-white/10 bg-[#121a18]/80"
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
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <SectionLabel>Operational Series</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <h2 className="text-5xl md:text-6xl font-black text-white leading-none">
          AVAILABLE
          <br />
          VACANCIES
        </h2>
        <div className="flex gap-8">
          {[
            { dept: "Engineering", count: "12 Roles" },
            { dept: "Design", count: "04 Roles" },
          ].map((d) => (
            <div key={d.dept}>
              <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">
                {d.dept}
              </p>
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
    desc: 'Premium global health coverage and a mandatory 4-week "Deep Sabbath" sabbatical every year.',
  },
];

function WhyBuild() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <div className="text-center mb-14">
        <SectionLabel>Protocol · Rewards</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          WHY BUILD WITH US
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {perks.map((p) => (
          <div
            key={p.title}
            className="border border-white/10 bg-[#121a18]/80 backdrop-blur-sm rounded-xl p-7 flex flex-col gap-4 hover:border-[#6c5ce7]/40 transition-colors"
          >
            <span className="text-2xl">{p.icon}</span>
            <h3 className="text-white font-black text-sm tracking-[0.1em] uppercase">
              {p.title}
            </h3>
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
    <section className="relative bg-transparent py-32 px-6 text-center overflow-hidden z-10">
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
          Join a team that values technical mastery over corporate tradition.
          Your best work starts here.
        </p>
        <button className="mt-10 bg-[#6c5ce7] hover:bg-[#7d6ff0] transition-colors px-9 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(108,92,231,0.3)]">
          Initiate Application
        </button>
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
    <main className="relative min-h-screen bg-[#0b0f0e] text-white overflow-x-hidden">
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