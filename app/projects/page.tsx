"use client";

import React from "react";
import { motion } from "framer-motion";
// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { 
  faExternalLinkAlt, 
  faMicrochip, 
  faDatabase, 
  faShieldAlt, 
  faBolt, 
  faLayerGroup 
} from "@fortawesome/free-solid-svg-icons";

const colorMap = {
  purple: {
    bg: "bg-purple-500/5",
    hoverBg: "group-hover:bg-purple-500/10",
    text: "text-purple-400",
    accent: "text-purple-500/80"
  },
  cyan: {
    bg: "bg-cyan-500/5",
    hoverBg: "group-hover:bg-cyan-500/10",
    text: "text-cyan-400",
    accent: "text-cyan-500/80"
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "group-hover:bg-blue-500/10",
    text: "text-blue-400",
    accent: "text-blue-500/80"
  },
  emerald: {
    bg: "bg-emerald-500/5",
    hoverBg: "group-hover:bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "text-emerald-500/80"
  }
};

const projects = [
  {
    id: "01",
    title: "Nexus Edu Management",
    category: "Enterprise Solution",
    desc: "A robust multi-branch Madrasa Management system. Architected to handle high-volume student data.",
    tech: ["MERN Stack", "Next.js", "TypeScript"],
    icon: faLayerGroup,
    colorKey: "purple",
    stats: "High Performance"
  },
  {
    id: "02",
    title: "Vanguard AI Inventory",
    category: "Industrial Intelligence",
    desc: "Smart inventory manager for garments tracking with neural-driven analytics.",
    tech: ["Node.js", "Express", "AI Model"],
    icon: faDatabase,
    colorKey: "cyan",
    stats: "Real-time Sync"
  },
  {
    id: "03",
    title: "SecureGate IoT",
    category: "Hardware Integration",
    desc: "IoT-based attendance system integrated with ZKTeco biometric terminals.",
    tech: ["IoT", "RFID", "ZKTeco API"],
    icon: faMicrochip,
    colorKey: "blue",
    stats: "Biometric Secured"
  },
  {
    id: "04",
    title: "Digital Sovereign Shop",
    category: "Premium E-Commerce",
    desc: "High-end retail ecosystem with premium motion kinetics and complex state management.",
    tech: ["Next.js", "Tailwind", "Stripe"],
    icon: faBolt,
    colorKey: "emerald",
    stats: "Premium Motion"
  }
];

export default function ModernProjectsPage() {
  return (
    <div className="bg-[#0b0c18] text-white py-24 px-6 selection:bg-purple-500/30 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-500 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Our Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none text-white">
              Engineering <br />
              <span className="text-white/30 italic font-light">Digital Sovereign.</span>
            </h1>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => {
            const colors = colorMap[project.colorKey as keyof typeof colorMap];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-10 rounded-[40px] bg-[#11111e] border border-white/5 overflow-hidden transition-all duration-500 hover:border-purple-500/20"
              >
                <div className={`absolute top-0 right-0 w-72 h-72 ${colors.bg} blur-[100px] ${colors.hoverBg} transition-all duration-500`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${colors.text}`}>
                      <FontAwesomeIcon icon={project.icon} className="text-2xl" />
                    </div>
                    <div className="flex gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                      {/* GitHub FontAwesome Icon */}
                      <FontAwesomeIcon 
                        icon={faGithub} 
                        className="text-xl cursor-pointer hover:text-white transition-colors" 
                      />
                      <FontAwesomeIcon 
                        icon={faExternalLinkAlt} 
                        className="text-lg cursor-pointer hover:text-white transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="mb-10">
                    <span className={`text-[10px] font-mono font-bold ${colors.accent} uppercase tracking-widest mb-2 block`}>
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 italic">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-gray-500 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500 text-xs" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Efficiency: {project.stats}
                      </span>
                    </div>
                    <span className="text-3xl font-black text-white/[0.02] italic">{project.id}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}