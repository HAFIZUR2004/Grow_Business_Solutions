"use client";

import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Star, 
  Rocket, 
  Trophy, 
  Briefcase, 
  Clock,
  Users,
  Award
} from "lucide-react";

// সংখ্যাকে বাংলা digits এ কনভার্ট করার ফাংশন
const toBengaliDigits = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
};

const SuccessSection = () => {
  const [counters, setCounters] = useState([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { lang } = useLanguage();
  const t = translations[lang];

  // ল্যাঙ্গুয়েজ অনুযায়ী স্ট্যাটাস ডাটা তৈরি
  const getStatsData = () => {
    if (lang === 'BN' && t.stats) {
      return t.stats.map((stat, idx) => ({
        title: stat.title,
        desc: stat.desc,
        icon: [Clock, Briefcase, Users][idx] || Clock,
        isCounter: true,
        targetValue: idx === 2 ? 100 : 2,
        suffix: idx === 2 ? "%" : "+",
      }));
    }
    // ইংরেজির জন্য ডিফল্ট ডাটা
    return [
      {
        title: "2+ Years",
        desc: "Of dedicated craft in digital architecture.",
        icon: Clock,
        isCounter: true,
        targetValue: 2,
        suffix: "+",
      },
      {
        title: "2 Projects",
        desc: "High-impact solutions delivered globally.",
        icon: Briefcase,
        isCounter: true,
        targetValue: 2,
        suffix: "+",
      },
      {
        title: "100% Client",
        desc: "Satisfaction rate across all partnerships.",
        icon: Users,
        isCounter: true,
        targetValue: 100,
        suffix: "%",
      },
    ];
  };

  const statsData = getStatsData();

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // কাউন্টার অ্যানিমেশন
  useEffect(() => {
    if (inView) {
      statsData.forEach((stat, idx) => {
        if (stat.isCounter) {
          let start = 0;
          const end = stat.targetValue;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[idx] = end;
                return newCounters;
              });
              clearInterval(timer);
            } else {
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[idx] = Math.floor(start);
                return newCounters;
              });
            }
          }, 16);

          return () => clearInterval(timer);
        }
      });
    }
  }, [inView, lang]);

  // ফিক্সড cardVariants - টাইপিং সমস্যা সমাধান করা হয়েছে
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  // কাউন্টার ভ্যালু ফরম্যাট করা (বাংলা digits সহ)
  const getFormattedCounter = (value: number, suffix: string) => {
    if (lang === 'BN') {
      return `${toBengaliDigits(value)}${suffix}`;
    }
    return `${value}${suffix}`;
  };

  return (
    <section
      ref={(el) => {
        if (el) {
          sectionRef.current = el;
          inViewRef(el);
        }
      }}
      className={`relative bg-[#0b0c18] text-white py-24 px-6 overflow-hidden ${lang === 'BN' ? 'font-hind' : ''}`}
    >
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              {lang === 'BN' ? 'আমাদের সাফল্য' : 'Our Achievements'}
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {lang === 'BN' ? 'সাফল্যের' : 'Success in'}
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  {lang === 'BN' ? 'পরিসংখ্যান' : 'Numbers'}
                </span>
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {lang === 'BN' 
              ? 'পরিমাপযোগ্য ফলাফল এবং গ্রাহক সন্তুষ্টির মাধ্যমে শ্রেষ্ঠত্ব প্রদান করছি'
              : 'Delivering excellence through measurable results and client satisfaction'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {statsData.map((config, i) => {
            const IconComponent = config.icon;
            const counterValue = counters[i];
            
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.15 }}
                className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative p-8 md:p-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                  >
                    <IconComponent 
                      className="w-8 h-8 text-white/80 group-hover:text-cyan-400 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black mb-3 tracking-tight"
                  >
                    <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {getFormattedCounter(counterValue, config.suffix)}
                    </span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.45 }}
                    viewport={{ once: true }}
                    className="text-white/60 text-sm font-semibold mb-2"
                  >
                    {config.title}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className="text-white/40 text-xs leading-relaxed max-w-[200px] mx-auto"
                  >
                    {config.desc}
                  </motion.p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    transition={{ delay: i * 0.1 + 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-6 mx-auto group-hover:w-24 transition-all duration-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 pt-8 border-t border-white/5"
        >
          {lang === 'BN' 
            ? [
                { icon: Trophy, text: "২টি প্রজেক্ট সম্পন্ন" },
                { icon: Star, text: "৫ স্টার রেটিং" },
                { icon: Rocket, text: "সময়মতো ডেলিভারি" },
                { icon: Award, text: "প্রিমিয়াম কোয়ালিটি" }
              ].map((badge, idx) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <BadgeIcon className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                    <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
                      {badge.text}
                    </span>
                  </motion.div>
                );
              })
            : [
                { icon: Trophy, text: "2 Projects Completed" },
                { icon: Star, text: "5 Star Rating" },
                { icon: Rocket, text: "On-Time Delivery" },
                { icon: Award, text: "Premium Quality" }
              ].map((badge, idx) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <BadgeIcon className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                    <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
                      {badge.text}
                    </span>
                  </motion.div>
                );
              })
          }
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuccessSection;