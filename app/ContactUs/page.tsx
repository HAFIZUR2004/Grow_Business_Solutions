"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number; size: number }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Dynamic node generation for radar
  useEffect(() => {
    const newDots = Array.from({ length: 18 }, (_, i) => ({
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 320,
      size: Math.random() * 3 + 1.5,
      id: i,
    }));
    setDots(newDots);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative min-h-screen bg-[#030507] text-white flex items-center px-6 md:px-16 py-24 overflow-hidden font-sans">
      {/* Mesh Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6c5ce7]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[5%] w-[30%] h-[30%] bg-[#22d3ee]/5 blur-[100px] rounded-full" />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT — Typography & Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          <div className="space-y-1">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6c5ce7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6c5ce7]"></span>
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50">Secure_Channel_Open</span>
            </motion.div>
            
            <h2 className="text-7xl md:text-[90px] font-black leading-[0.85] tracking-tighter">
              INITIATE <br />
              <span className="text-transparent italic relative" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
                CONNECTION
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#6c5ce7] to-transparent"></span>
              </span>
            </h2>
            
            <p className="text-white/40 text-sm mt-6 max-w-md leading-relaxed">
              Deploy your inquiry through our encrypted channel. Our quantum-secure protocol ensures your data reaches the right node.
            </p>
          </div>

          {/* Glassmorphic Form Containers */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
            {[
              { label: "Operator_ID", name: "name", placeholder: "DESIGNATION / ALIAS", type: "text" },
              { label: "Signal_Route", name: "email", placeholder: "ENCRYPTED_ENDPOINT", type: "email" }
            ].map((field, i) => (
              <motion.div 
                key={i} 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6c5ce7] to-[#22d3ee] rounded-xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                <div className="relative bg-[#0a0c0f] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                  <label className="absolute top-2 left-4 text-[8px] tracking-widest text-white/30 uppercase font-bold">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full bg-transparent pt-6 pb-3 px-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              </motion.div>
            ))}

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative bg-[#0a0c0f] border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <label className="absolute top-2 left-4 text-[8px] tracking-widest text-white/30 uppercase font-bold">Payload_Data</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent pt-7 pb-3 px-4 text-sm text-white focus:outline-none placeholder:text-white/10 resize-none"
                  placeholder="TRANSMIT SECURE MESSAGE..."
                  required
                />
              </div>
            </motion.div>

            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative group w-full py-5 bg-gradient-to-r from-[#6c5ce7] to-[#7c3aed] text-white rounded-xl font-black text-[10px] tracking-[0.4em] uppercase shadow-[0_20px_40px_rgba(108,92,231,0.2)] hover:shadow-[0_20px_40px_rgba(108,92,231,0.4)] transition-all border border-white/10 overflow-hidden"
            >
              <span className="relative z-10">Execute Protocol</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </motion.button>

            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center"
                >
                  <p className="text-green-400 text-xs tracking-wider">✓ Transmission successful. Node will respond within 24h.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 pt-4 border-t border-white/5"
          >
            {[
              { label: "Quantum_Line", value: "+1 (555) 123-4567" },
              { label: "Neural_Link", value: "contact@growxp.com" }
            ].map((info, i) => (
              <div key={i}>
                <p className="text-[8px] tracking-widest text-white/30 uppercase mb-1">{info.label}</p>
                <p className="text-xs text-white/60">{info.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Cyber Radar System (Enhanced) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#6c5ce7]/5 rounded-full blur-[80px]" />
          
          <div className="relative w-[400px] h-[400px] md:w-[550px] md:h-[550px] flex items-center justify-center">
            {/* Pulsing Outer Rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="absolute inset-0 border border-[#6c5ce7]/20 rounded-full"
                style={{ margin: i * 35 }}
              />
            ))}

            {/* Main Radar Core */}
            <div className="relative w-full h-full border border-white/10 rounded-full backdrop-blur-[2px] overflow-hidden bg-[#030507]/50">
              
              {/* Radar Sweep with Motion */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 origin-center"
              >
                <div className="w-1/2 h-1/2 bg-gradient-to-tr from-[#6c5ce7]/30 via-[#22d3ee]/10 to-transparent" 
                     style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-b from-[#6c5ce7] via-[#22d3ee] to-transparent shadow-[0_0_20px_#6c5ce7]" />
                <div className="absolute top-1/2 left-0 w-1/2 h-[1px] bg-gradient-to-r from-[#6c5ce7] to-transparent" />
              </motion.div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.04]" 
                style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '25px 25px' }} 
              />

              {/* Concentric Target Rings */}
              {[60, 120, 180].map((size, i) => (
                <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#22d3ee]/10 rounded-full pointer-events-none"
                  style={{ width: size * 2, height: size * 2 }} />
              ))}

              {/* Data Nodes with Pulsing Animation */}
              {dots.map((dot) => (
                <motion.div
                  key={dot.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: Math.random() * 5 }}
                  className="absolute rounded-full bg-gradient-to-r from-[#22d3ee] to-[#6c5ce7] shadow-[0_0_10px_#22d3ee]"
                  style={{ 
                    top: `calc(50% + ${dot.y}px)`, 
                    left: `calc(50% + ${dot.x}px)`,
                    width: dot.size,
                    height: dot.size
                  }}
                />
              ))}

              {/* Connecting Lines Between Nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {dots.slice(0, 8).map((dot, i) => (
                  dots.slice(i + 1, i + 3).map((dot2, j) => {
                    const distance = Math.hypot(dot.x - dot2.x, dot.y - dot2.y);
                    if (distance < 100) {
                      return (
                        <line
                          key={`${dot.id}-${dot2.id}`}
                          x1={`calc(50% + ${dot.x}px)`}
                          y1={`calc(50% + ${dot.y}px)`}
                          x2={`calc(50% + ${dot2.x}px)`}
                          y2={`calc(50% + ${dot2.y}px)`}
                          stroke="rgba(108,92,231,0.2)"
                          strokeWidth="0.5"
                          strokeDasharray="2 3"
                        />
                      );
                    }
                    return null;
                  })
                ))}
              </svg>
            </div>

            {/* Central Identity Hub */}
            <div className="absolute w-24 h-24 bg-[#030507]/90 border border-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="relative">
                <div className="text-[10px] font-black bg-gradient-to-r from-[#6c5ce7] to-[#22d3ee] bg-clip-text text-transparent tracking-widest">
                  GROW_XP
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-[1px] bg-[#6c5ce7]/50" />
              </div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-[#6c5ce7] rounded-full"
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-l-2 border-[#22d3ee] rounded-full"
              />
            </div>

            {/* Corner Accents */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`}>
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-gradient-to-r from-[#6c5ce7] to-transparent" />
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-gradient-to-b from-[#6c5ce7] to-transparent" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}