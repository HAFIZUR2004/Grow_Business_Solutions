"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LogoSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  const handleLoading = () => {
    setShowSpinner(true);
    // ৩ সেকেন্ড পর অটোমেটিক বন্ধ হবে
    setTimeout(() => setShowSpinner(false), 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#0b0c18] text-white p-10 font-sans">
      <h1 className="text-3xl font-black mb-16 text-center tracking-tighter uppercase">
        Logo <span className="text-cyan-400 italic">Animation System</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-center">
        {/* ভার্সন ১: বেসিক ঘূর্ণন */}
        <div className="flex flex-col items-center gap-6 border border-white/5 p-8 rounded-2xl bg-[#121323] hover:border-white/20 transition-all">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            Protocol_01: Linear
          </p>
          <motion.div
            className="w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          >
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </motion.div>
        </div>

        {/* ভার্সন ২: পালস এবং ঘূর্ণন */}
        <div className="flex flex-col items-center gap-6 border border-white/5 p-8 rounded-2xl bg-[#121323] hover:border-white/20 transition-all">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            Protocol_02: Pulse
          </p>
          <motion.div
            className="w-20 h-20"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 1.2, ease: "easeInOut", repeat: Infinity },
              rotate: { duration: 2, ease: "linear", repeat: Infinity },
            }}
          >
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </motion.div>
        </div>

        {/* ভার্সন ৩: কালার গ্লো */}
        <div className="flex flex-col items-center gap-6 border border-white/5 p-8 rounded-2xl bg-[#121323] hover:border-white/20 transition-all">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            Protocol_03: Glow
          </p>
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute w-24 h-24 rounded-full blur-2xl"
              animate={{
                backgroundColor: [
                  "rgba(34, 211, 238, 0.3)",
                  "rgba(139, 92, 246, 0.3)",
                  "rgba(34, 211, 238, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="relative w-20 h-20 z-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, ease: "circOut", repeat: Infinity }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* অ্যাকশন বাটন */}
      <div className="mt-20">
        <motion.button
          onClick={handleLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-cyan-500 text-black font-bold rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-white transition-colors uppercase text-sm tracking-widest"
        >
          Execute Protocol
        </motion.button>
      </div>

      {/* ফুল স্ক্রিন ওভারলে লোডার */}
      <AnimatePresence>
        {showSpinner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0b0c18]/95 flex flex-col items-center justify-center z-[100] backdrop-blur-md"
          >
            <motion.div
              className="w-32 h-32 mb-8"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 1.5, ease: "linear", repeat: Infinity },
                scale: { duration: 1, ease: "easeInOut", repeat: Infinity },
              }}
            >
              <Image
                src="/logo.png"
                alt="Loading"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              />
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="text-cyan-400 font-mono text-sm tracking-[0.5em] uppercase">
                Initializing
              </p>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-cyan-500"
                  animate={{ x: [-200, 200] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogoSpinner;
