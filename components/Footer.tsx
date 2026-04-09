"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// React Icons
import {
  FaGithub,
  FaLinkedinIn,
  FaChevronUp,
  FaShieldAlt,
  FaFacebookF,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Reveal Animation
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#02040a] text-white pt-28 pb-10 px-8 overflow-hidden font-sans border-t border-white/10"
    >
      {/* --- HIGH VISIBILITY BACKGROUND --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        {" "}
        {/* অপাসিটি বাড়িয়েছি যাতে ইমেজ দেখা যায় */}
        <Image
          src="https://i.postimg.cc/mZ3G5tqg/5542.jpg"
          alt="Network Abstract"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        {/* হালকা গ্রাডিয়েন্ট যাতে টেক্সট পড়া যায় কিন্তু ইমেজ না ঢাকে */}
        <div className="absolute inset-0 bg-linear-to-b from-[#02040a]/80 via-transparent to-[#02040a]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-8 reveal-item">
            <div className="flex items-center gap-5 group">
              <div className="relative w-16 h-16 bg-white rounded-2xl p-1 shadow-2xl shadow-emerald-500/20">
                <Image
                  src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
                  alt="Grow Business Solutions"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-4xl font-black tracking-tighter italic leading-none drop-shadow-md">
                  GROW
                </h2>
                <span className="text-[12px] font-mono text-emerald-400 tracking-[0.3em] font-bold uppercase mt-1 drop-shadow">
                  Business Solutions
                </span>
              </div>
            </div>
            <p className="text-xl text-white/60 leading-relaxed font-normal max-w-md drop-shadow-sm">
              Building{" "}
              <span className="text-emerald-400 font-bold underline decoration-white/20">
                scalable networks
              </span>{" "}
              and technical excellence for global business expansion.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 reveal-item">
            <div className="space-y-6">
              <h4 className="text-[12px] font-mono tracking-[0.4em] text-emerald-400 uppercase font-bold">
                Solutions
              </h4>
              <ul className="space-y-4 text-base font-semibold text-white/50">
                {["Development", "Strategy", "Security"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-emerald-400 transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[12px] font-mono tracking-[0.4em] text-emerald-400 uppercase font-bold">
                Protocol
              </h4>
              <ul className="space-y-4 text-base font-semibold text-white/50">
                {["Core V3", "Uptime", "Nodes"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-emerald-400 transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-8 reveal-item lg:text-right">
            <h4 className="text-[12px] font-mono tracking-[0.4em] text-emerald-400 uppercase font-bold">
              Terminal
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:contact@growbusiness.solutions"
                className="text-xl font-black block hover:text-emerald-400 transition-colors drop-shadow-md"
              >
                contact@growbusiness.solutions
              </a>
              {/* Social Icons সেকশনে এই পরিবর্তনটি করুন */}
              <div className="flex gap-4 lg:justify-end">
                {[
                  {
                    Icon: FaFacebookF,
                    url: "https://www.facebook.com/growbusinesssolutionsbd",
                  },

                  {
                    Icon: FaGithub,
                    url: "https://github.com/Grow-Business-Solutions",
                  },
                  { Icon: FaXTwitter, url: "https://x.com/GrowBS_BD" },
                  {
                    Icon: FaInstagram,
                    url: "https://www.instagram.com/growbusinesssolutions/",
                  },
                  {
                    Icon: FaLinkedinIn,
                    url: "https://www.linkedin.com/company/grow-business-solutionsbd/",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank" // নতুন ট্যাবে খোলার জন্য
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-lg"
                  >
                    <social.Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="reveal-item pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[12px] font-mono text-white/20 uppercase tracking-[0.2em]">
            <span>© {currentYear} GROW_BUSINESS_SOLUTIONS</span>
            <span className="hidden md:flex items-center gap-2 italic text-emerald-900">
              <FaShieldAlt /> ENCRYPTED_V4
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-[13px] font-black text-white/40 hover:text-white transition-all uppercase tracking-widest"
          >
            <span>Return to Top</span>
            <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-xl">
              <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
