"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden px-6 py-20">
      
      {/* --- Advanced Background Layering --- */}
      
      {/* 1. Main Subtle Grid */}
      <div className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
        }} 
      />

      {/* 2. Complex Mesh/Wireframe (The "Weir" Look) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(6, 182, 212, 0.4)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>

      {/* 3. Organic Animated Blob for "Complexity" */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-[40%_60%_70%_30%] border border-purple-500/10"
      />

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
            <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
            </div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase">Software Engineering Excellence</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8 text-white">
            Grow Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-700">
              Solutions BD.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed mb-10 font-light italic opacity-80">
            "Architecting high-performance digital ecosystems. We turn complex requirements into elegant, obsidian-grade software."
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="relative group overflow-hidden bg-[#7C5DFA] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_40px_-5px_#7C5DFA]">
               <span className="relative z-10">View Ecosystem</span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="bg-white/[0.02] backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
              Our Thesis
            </button>
          </div>
        </motion.div>

        {/* Right Side: High-Complexity Wireframe Globe */}
        <div className="relative flex items-center justify-center">
          
          {/* Animated SVG Connections (The "Nodes") */}
          <div className="absolute inset-0 z-0 opacity-40">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <motion.circle 
                cx="250" cy="250" r="240" 
                fill="none" stroke="rgba(124, 93, 250, 0.1)" strokeWidth="1" strokeDasharray="10 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="250" cy="250" r="180" 
                fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" strokeDasharray="5 15"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* The Main Visual Core */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-square max-w-[550px] flex items-center justify-center"
          >
            {/* Globe Image with Glass Effect */}
            <div className="relative w-full h-full rounded-full p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl" />
              <img 
                src="https://raw.githubusercontent.com/gist/PiyushSuthar/39739ecd6844955b9a896d8594247077/raw/b13a7c73a0e633d7b88df178cc0548ca7c6f0147/globe.png" 
                alt="Globe Wireframe"
                className="w-full h-full object-contain opacity-70 contrast-125 brightness-110"
              />
            </div>

            {/* Premium 99.9% Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-0 md:-left-4 bg-black/80 backdrop-blur-2xl px-6 py-4 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
            >
              <div className="text-white text-3xl font-black flex items-center gap-2">
                99.9% <span className="text-[10px] text-cyan-400 animate-pulse">●</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Uptime SLA Protocol</div>
            </motion.div>

            {/* Small floating node badge */}
            <div className="absolute bottom-20 right-0 bg-white/[0.03] backdrop-blur-xl p-3 rounded-lg border border-white/5 opacity-60">
                <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1 h-4 bg-purple-500/40 rounded-full" />)}
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sparkle Decoration */}
      <div className="absolute bottom-12 right-12 text-white/20 animate-pulse">
        <svg width="30" height="30" viewBox="0 0 40 40">
          <path d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16L20 0Z" fill="currentColor" />
        </svg>
      </div>

    </section>
  );
};

export default Hero;