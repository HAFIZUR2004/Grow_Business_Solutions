"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";
import { 
  Send, Mail, Phone, MapPin, Clock, Shield, Lock, 
  CheckCircle, MessageSquare, User, AtSign
} from "lucide-react";

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // আপনার কন্ট্যাক্ট ইনফো (ডায়নামিক)
  const contactInfo = [
    { icon: Phone, label: "DIRECT LINE", value: "+8801884369340", color: "#6c5ce7" },
    { icon: Mail, label: "QUANTUM MAIL", value: "growbusinesssolutionsbd@gmail.com", color: "#a29bfe" },
    { icon: MapPin, label: "GLOBAL NODE", value: "Barishal, Bangladesh • Remote First", color: "#00cec9" },
    { icon: Clock, label: "RESPONSE SLA", value: "< 24 Hours", color: "#fdcb6e" },
  ];

  // Particle Network Canvas Effect
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
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.12 * (1 - d / 160);

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

        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > canvas.width) { n.x = canvas.width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > canvas.height) { n.y = canvas.height; n.vy *= -1; }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative min-h-screen bg-[#05070a] text-white flex items-center px-4 md:px-10 py-32 overflow-hidden font-sans">
      
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6c5ce7]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00cec9]/8 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.03),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-4xl w-full mx-auto relative z-10 px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-10 max-w-3xl mx-auto"
        >
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-xl mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-[#00cec9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00cec9]"></span>
              </span>
              <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#a29bfe]/80">
                {t.secureChannel || "ENCRYPTED CHANNEL"}
              </span>
              <Shield size={10} className="text-[#6c5ce7]" />
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-center">
              {t.initiate || "INITIATE"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] italic">
                {t.connection || "CONNECTION"}
              </span>
            </h2>
            
            <p className="text-white/40 text-base max-w-lg leading-relaxed font-medium mx-auto">
              {t.contactDesc || "Ready to transform your digital presence? Let's connect and build something extraordinary together."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00cec9]/50 to-[#6c5ce7]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                  <User size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                    {t.nameLabel || "IDENTIFICATION"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                    placeholder={t.namePlaceholder || "Enter your full name"}
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6c5ce7]/50 to-[#00cec9]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                  <AtSign size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                  <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                    {t.emailLabel || "QUANTUM ID"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                    placeholder={t.emailPlaceholder || "your@email.com"}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6c5ce7]/50 via-[#a29bfe]/30 to-[#00cec9]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group-hover:border-white/20 transition-colors">
                <MessageSquare size={12} className="absolute left-4 top-5 text-white/20" />
                <label className="absolute top-2 left-9 text-[9px] tracking-widest text-[#6c5ce7]/60 uppercase font-bold">
                  {t.messageLabel || "ENCRYPTED MESSAGE"}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent pt-7 pb-3 pl-9 pr-4 text-sm text-white focus:outline-none placeholder:text-white/10 resize-none"
                  placeholder={t.messagePlaceholder || "Tell us about your project..."}
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              disabled={isLoading}
              className="relative group w-full py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all overflow-hidden shadow-2xl disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                {isLoading ? "SENDING..." : (t.executeProtocol || "SEND SECURE MESSAGE")}
                {!isLoading && <Send size={14} className={isHovered ? "translate-x-1 transition-transform" : ""} />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00cec9] via-[#a29bfe] to-[#6c5ce7] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer text-center md:text-left"
              >
                <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                  <item.icon size={10} style={{ color: item.color }} />
                  <p className="text-[8px] tracking-[0.15em] text-white/30 uppercase font-bold">
                    {item.label}
                  </p>
                </div>
                <p className="text-[11px] text-white/60 group-hover:text-white transition-colors font-mono">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase shadow-2xl flex items-center gap-3"
          >
            <CheckCircle size={18} />
            {t.successMessage || "MESSAGE TRANSMITTED SUCCESSFULLY"}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}