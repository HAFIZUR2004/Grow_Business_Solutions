"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Layers, Cpu, Globe, Search, Layout, Terminal, Rocket, ArrowRight 
} from "lucide-react";

// --- Services Data ---
const services = [
  {
    title: "Custom Web Engineering",
    desc: "MERN stack এবং Next.js ব্যবহার করে আমরা তৈরি করি সুপার-ফাস্ট এবং স্কেলেবল অ্যাপ্লিকেশন।",
    value: "Future-proof Scalability",
    icon: Code2,
    color: "#6c5ce7",
    span: "md:col-span-2"
  },
  {
    title: "Immersive UI/UX",
    desc: "Tailwind এবং Framer Motion এর সমন্বয়ে হাই-কনভার্সন এবং প্রিমিয়াম ইউজার এক্সপেরিয়েন্স।",
    value: "GSAP • Framer Motion",
    icon: Layout,
    color: "#a29bfe",
    span: "md:col-span-1"
  },
  {
    title: "Intelligent Systems",
    desc: "স্কুল এবং বিভিন্ন প্রতিষ্ঠানের জন্য AI-চালিত কাস্টম ম্যানেজমেন্ট সলিউশন।",
    value: "Automated Precision",
    icon: Cpu,
    color: "#00cec9",
    span: "md:col-span-1"
  },
  {
    title: "IoT Integration",
    desc: "Biometric এবং RFID টেকনোলজির মাধ্যমে সিকিউর অ্যাসেট কন্ট্রোল সিস্টেম।",
    value: "Node & Hardware Fusion",
    icon: Terminal,
    color: "#0984e3",
    span: "md:col-span-1"
  },
  {
    title: "Enterprise Architecture",
    desc: "গ্লোবাল স্কেলে কাজের জন্য ক্লাউড-রেডি এবং রেজিলিয়েন্ট ফ্রেমওয়ার্ক।",
    value: "AWS • GCP • Azure",
    icon: Globe,
    color: "#00b894",
    span: "md:col-span-1"
  }
];

// --- Timeline Data ---
const timeline = [
  { id: "01", title: "The Briefing", desc: "সিস্টেম গোল এবং আপনার বিজনেসের প্রয়োজনীয়তা নিয়ে গভীর আলোচনা।", icon: Search },
  { id: "02", title: "Architecture", desc: "মডুলার ডিজাইন প্রিন্সিপাল ব্যবহার করে ব্লু-প্রিন্ট তৈরি করা।", icon: Layers },
  { id: "03", title: "The Build", desc: "TDD এবং এজাইল মেথডোলজিতে প্যারালাল ডেভেলপমেন্ট স্প্রিন্ট।", icon: Terminal },
  { id: "04", title: "Deployment", desc: "পারফরম্যান্স টিউনিং এবং স্ট্রেস টেস্টিং শেষে গ্লোবাল লঞ্চ।", icon: Rocket },
];

export default function ServicesPage() {
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

    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.2 * (1 - d / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(162, 155, 254, 0.6)";
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <main className="min-h-screen bg-[#05070a] text-white selection:bg-[#6c5ce7]/30 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#6c5ce7]/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[0%] w-[30%] h-[40%] bg-[#00cec9]/5 blur-[100px] rounded-full" />
        
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-xl px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] font-black uppercase">Service_Protocol_v3</span>
            </div>
            
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.85] tracking-tighter mb-8">
              ENGINEERING <br /> 
              <span className="text-transparent italic" style={{ WebkitTextStroke: "1px rgba(162,155,254,0.6)" }}>RELIABILITY</span>
            </h1>
            
            <p className="max-w-xl text-lg text-white/50 leading-relaxed mb-10 font-medium">
              আমরা শুধু সফটওয়্যার তৈরি করি না, আমরা আপনার বিজনেসের জন্য একটি <span className="text-white">হাই-পারফরম্যান্স ডিজিটাল ইকোসিস্টেম</span> আর্কিটেক্ট করি।
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="px-10 py-5 bg-[#6c5ce7] rounded-2xl font-black text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:scale-105 transition-all">
                Initiate Project
              </button>
              <button className="px-10 py-5 border border-white/10 hover:bg-white/5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all">
                Core Capabilities
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0a0c0f]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem]">
                <div className="flex items-center justify-between mb-10">
                    <div className="text-[10px] font-mono text-white/40 tracking-[0.2em]">SYSTEM_MONITOR</div>
                    <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/50"/><div className="w-2 h-2 rounded-full bg-yellow-500/50"/><div className="w-2 h-2 rounded-full bg-green-500/50"/></div>
                </div>
                <div className="space-y-6">
                    {[78, 92, 65].map((val, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
                                <span>Module_{i+1}_Sync</span>
                                <span>{val}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 2, delay: i*0.2 }} className="h-full bg-[#6c5ce7]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">Precise Instrumentality</h2>
          <p className="text-white/40 max-w-xl font-medium">প্রতিটি কম্পোনেন্ট এমনভাবে তৈরি যা স্বাধীনভাবে এবং সম্মিলিতভাবে সর্বোচ্চ আউটপুট নিশ্চিত করে।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, borderColor: `${s.color}40` }}
              className={`${s.span} p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group transition-all`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: s.color }} />
              <s.icon className="mb-8 group-hover:scale-110 transition-transform" style={{ color: s.color }} size={36} />
              <h3 className="text-2xl font-black mb-4 tracking-tight">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 font-medium">{s.desc}</p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/20 block mb-1">Value_Prop</span>
                  <span className="text-[11px] font-bold uppercase tracking-tighter" style={{ color: s.color }}>{s.value}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TIMELINE --- */}
      <section className="py-32 px-6 relative bg-black/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-3xl font-black tracking-[0.3em] uppercase opacity-40 mb-2">Process</h2>
             <h3 className="text-5xl font-black tracking-tighter">THE ARCHITECTURAL PATH</h3>
          </div>
          
          <div className="relative space-y-24">
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            {timeline.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                key={idx} 
                className={`relative flex items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-1/2" />
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-[#05070a] border-2 border-white/10 flex items-center justify-center text-[#6c5ce7] shadow-[0_0_20px_rgba(108,92,231,0.25)]">
                    <item.icon size={18} />
                  </div>
                </div>
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
                  <span className="text-[10px] font-mono text-[#6c5ce7] font-black mb-3 block uppercase tracking-[0.3em]">Step_{item.id}</span>
                  <h3 className="text-3xl font-black mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-base font-medium leading-relaxed max-w-sm ml-0 md:ml-auto mr-0 md:mr-0">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="relative p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-[#111319] to-transparent border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6c5ce7]/10 blur-[100px] rounded-full" />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-10 tracking-tighter">
                READY TO <br /> <span className="text-white/30 italic">SCALE UP?</span>
              </h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#6c5ce7]/20 transition-colors border border-white/5"><Terminal size={24} /></div>
                  <span className="text-xl text-white/70 font-bold">hello@grow-solutions.io</span>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#00cec9]/20 transition-colors border border-white/5"><Globe size={24} /></div>
                  <span className="text-xl text-white/70 font-bold">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white/[0.02] backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-inner">
              <input type="text" placeholder="Identity_Full_Name" className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#6c5ce7] outline-none transition-all font-bold text-sm" />
              <input type="email" placeholder="Signal_Endpoint (Email)" className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#6c5ce7] outline-none transition-all font-bold text-sm" />
              <textarea placeholder="Mission_Brief..." className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#6c5ce7] outline-none transition-all font-bold text-sm h-32 resize-none" />
              <button className="w-full py-6 bg-[#6c5ce7] rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-[#5a4ad1] transition-all active:scale-95">
                Transmit Signal
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}