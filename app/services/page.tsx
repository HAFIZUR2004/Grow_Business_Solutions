"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Cpu, 
  Globe, 
  Search, 
  Layout, 
  Terminal, 
  Rocket, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const services = [
  {
    title: "Custom Web Engineering",
    desc: "Utilizing the MERN stack and Next.js to deploy lightning-fast, secure, and infinitely scalable applications.",
    value: "Future-proof scalability for high-stakes business logic.",
    icon: Code2,
    color: "cyan",
    span: "md:col-span-2"
  },
  {
    title: "Immersive UI/UX",
    desc: "High-conversion aesthetic that commands market authority through Tailwind and custom motion kinetics.",
    value: "GSAP • Framer Motion • Figma Precision",
    icon: Layout,
    color: "purple",
    span: "md:col-span-1"
  },
  {
    title: "Intelligent Management",
    desc: "ERP/MIS solutions architected for schools and garments with AI-driven workflows.",
    value: "AUTOMATED PRECISION",
    icon: Cpu,
    color: "indigo",
    span: "md:col-span-1"
  },
  {
    title: "IoT & Hardware Fusion",
    desc: "Biometric and RFID integration for secure, seamless asset control.",
    value: "POWERED BY ZKTECO",
    icon: Terminal,
    color: "blue",
    span: "md:col-span-1"
  },
  {
    title: "Enterprise Architecture",
    desc: "Cloud-ready, modular frameworks built with Test-Driven Development for bulletproof resilience at global scale.",
    value: "AWS • GCP • AZURE",
    icon: Globe,
    color: "emerald",
    span: "md:col-span-1"
  }
];

const timeline = [
  { id: "01", title: "The Briefing", desc: "Deep dive discovery to align system goals with market dominance trajectories.", icon: Search },
  { id: "02", title: "System Architecture", desc: "Engineering the blueprint using modular design principles and data modeling.", icon: Layers },
  { id: "03", title: "The Build", desc: "Parallel development sprints utilizing TDD and agile methodologies for rapid iteration.", icon: Terminal },
  { id: "04", title: "Optimization & Launch", desc: "Rigorous performance tuning and stress testing prior to global deployment.", icon: Rocket },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0b0c18] text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-600/10 via-transparent to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">The Vanguard Standard</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Engineering Sovereign <br />
            <span className="text-white/40 italic font-light">Digital Ecosystems</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            We don't just build software; we architect high-performance environments for enterprise dominance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-bold transition-all shadow-lg shadow-purple-500/20">
              Architect Your Future
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold transition-all flex items-center gap-2">
              View Capabilities <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- BENTO GRID (PRECISE INSTRUMENTALITY) --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Precise Instrumentality</h2>
          <p className="text-gray-500 max-w-xl font-light">Our modular engineering approach ensures each component operates with absolute autonomy and collective synergy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`${s.span} p-8 rounded-[40px] bg-[#11111e] border border-white/5 relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${s.color}-500/5 blur-[60px] group-hover:bg-${s.color}-500/10 transition-all`} />
              <s.icon className={`text-${s.color}-400 mb-6 group-hover:scale-110 transition-transform`} size={32} />
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{s.desc}</p>
              <div className="pt-6 border-t border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-1">Business Value:</span>
                <span className={`text-[11px] font-bold text-${s.color}-400 uppercase tracking-tighter`}>{s.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TIMELINE (THE ARCHITECTURAL PATH) --- */}
      <section className="py-32 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-24 tracking-tighter uppercase">The Architectural Path</h2>
          
          <div className="relative space-y-24">
            <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
            
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-1/2" />
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0b0c18] border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <item.icon size={18} />
                  </div>
                </div>
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <span className="text-xs font-mono text-purple-500 font-bold mb-2 block uppercase tracking-widest">Phase {item.id}</span>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm ml-0 md:ml-auto mr-0 md:mr-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black leading-tight mb-8">Ready to Command <br /> the Market?</h2>
            <p className="text-gray-400 text-lg mb-12 font-light">Let's discuss the architecture of your next competitive advantage.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Terminal size={18} /></div>
                <span className="text-gray-300 font-light">intelligence@growbusiness.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Globe size={18} /></div>
                <span className="text-gray-300 font-light">Headquarters: Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-[40px] bg-[#11111e] border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">Initiate Your Build</h3>
            <div className="space-y-6">
              <input type="text" placeholder="Identity / Organization" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-cyan-400 outline-none transition-all font-light" />
              <input type="email" placeholder="Communication Channel (Email)" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-cyan-400 outline-none transition-all font-light" />
              <select className="w-full bg-transparent border-b border-white/10 py-4 focus:border-cyan-400 outline-none transition-all font-light text-gray-400">
                <option>Mission: Custom Engineering</option>
                <option>Mission: UI/UX Redesign</option>
              </select>
              <textarea placeholder="The Objectives Brief..." className="w-full bg-transparent border-b border-white/10 py-4 focus:border-cyan-400 outline-none transition-all font-light h-32" />
              <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">
                Signal Transmission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* <footer className="py-20 border-t border-white/5 text-center">
        <h2 className="text-xl font-black mb-8 tracking-[0.3em] uppercase">Grow Business Solutions</h2>
        <div className="flex justify-center gap-8 mb-12 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Security</a>
          <a href="#" className="hover:text-white">Intelligence</a>
        </div>
        <p className="text-[10px] text-gray-600 uppercase font-mono tracking-widest">© 2026 Grow Business Solutions. Architected for the Void.</p>
      </footer> */}
    </main>
  );
}