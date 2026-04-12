"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";

interface Dot {
  x: number;
  y: number;
  size: number;
  id: number;
}

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const dotsArray = Array.from({ length: 15 }, (_, i) => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      size: Math.random() * 2 + 1,
      id: i,
    }));

    requestAnimationFrame(() => {
      setDots(dotsArray);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative min-h-screen bg-[#0b0c18] text-white flex items-center px-4 md:px-10 py-40 overflow-hidden border-t border-white/5 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6c5ce7]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[5%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-screen-2xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6">
        {/* LEFT SIDE: Heading & Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col gap-10"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[10px] uppercase font-black text-emerald-400/80">
                {t.secureChannel}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              {t.initiate} <br />
              <span
                className="text-transparent italic relative"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
              >
                {t.connection}
              </span>
            </h2>
            <p className="text-white/40 text-base mt-6 max-w-lg leading-relaxed font-medium">
              {t.contactDesc}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-w-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  label: t.nameLabel,
                  name: "name",
                  placeholder: t.namePlaceholder,
                  type: "text",
                },
                {
                  label: t.emailLabel,
                  name: "email",
                  placeholder: t.emailPlaceholder,
                  type: "email",
                },
              ].map((field) => (
                <div key={field.name} className="relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/50 to-[#6c5ce7]/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                    <label className="absolute top-2 left-4 text-[9px] tracking-widest text-emerald-500/50 uppercase font-bold">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full bg-transparent pt-7 pb-3 px-4 text-sm text-white focus:outline-none placeholder:text-white/10"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6c5ce7]/50 to-emerald-500/50 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative bg-[#0a0c0f]/80 backdrop-blur-md border border-white/10 rounded-xl">
                <label className="absolute top-2 left-4 text-[9px] tracking-widest text-emerald-500/50 uppercase font-bold">
                  {t.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent pt-8 pb-3 px-4 text-sm text-white focus:outline-none placeholder:text-white/10 resize-none font-medium"
                  placeholder={t.messagePlaceholder}
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group w-full py-5 bg-white text-black hover:text-white rounded-xl font-black text-[11px] uppercase transition-all overflow-hidden shadow-2xl"
            >
              <span className="relative z-10">{t.executeProtocol}</span>
              <div className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </form>

          {/* Footer Details */}
          <div className="flex gap-10 pt-6 border-t border-white/5">
            {[
              { label: t.quantumLine, val: t.phone },
              { label: t.neuralLink, val: t.email },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase mb-1 font-bold">
                  {item.label}
                </p>
                <p className="text-sm text-white/70 font-mono italic">
                  {item.val}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE: Cyber Radar System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 border border-emerald-500/10 rounded-full bg-[#030507]/40 backdrop-blur-[2px] overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 origin-center"
              >
                <div
                  className="w-1/2 h-1/2 bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                />
                <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-emerald-500 to-transparent shadow-[0_0_15px_#10b981]" />
              </motion.div>

              {/* Dots with a fallback check */}
              {dots.length > 0 &&
                dots.map((dot) => (
                  <motion.div
                    key={dot.id}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"
                    style={{
                      top: `calc(50% + ${dot.y}px)`,
                      left: `calc(50% + ${dot.x}px)`,
                      width: dot.size,
                      height: dot.size,
                    }}
                  />
                ))}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#030507] border border-white/10 rounded-full flex flex-col items-center justify-center shadow-2xl">
              <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">
                Grow
              </span>
              <span className="text-[6px] text-white/20 uppercase">
                V4_Secure
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase shadow-2xl"
          >
            {t.successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
