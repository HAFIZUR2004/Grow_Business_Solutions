"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faMicrochip,
  faDatabase,
  faShieldAlt,
  faBolt,
  faLayerGroup,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";
import ParticleNetwork from "@/components/ParticleNetwork";

// ✅ Icon Map with proper type
const iconMap: Record<string, IconDefinition> = {
  faLayerGroup: faLayerGroup,
  faDatabase: faDatabase,
  faMicrochip: faMicrochip,
  faBolt: faBolt,
  faShieldAlt: faShieldAlt,
};
interface StatType {
  label: string;
  suffix: string;
}

// ✅ Color Map type
interface ColorStyles {
  bg: string;
  hoverBg: string;
  text: string;
  accent: string;
  gradient: string;
  border: string;
  glow: string;
}

const colorMap: Record<string, ColorStyles> = {
  purple: {
    bg: "bg-purple-500/5",
    hoverBg: "group-hover:bg-purple-500/10",
    text: "text-purple-400",
    accent: "text-purple-500/80",
    gradient: "from-purple-500/20 to-transparent",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/5",
    hoverBg: "group-hover:bg-cyan-500/10",
    text: "text-cyan-400",
    accent: "text-cyan-500/80",
    gradient: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "group-hover:bg-blue-500/10",
    text: "text-blue-400",
    accent: "text-blue-500/80",
    gradient: "from-blue-500/20 to-transparent",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/5",
    hoverBg: "group-hover:bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "text-emerald-500/80",
    gradient: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
};

interface PortfolioItem {
  _id: string;
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: string;
  colorKey: string;
  stats: string;
  image: string;
  imageAlt: string;
  github?: string;
  liveUrl?: string;
}

// Dummy Data for fallback
const dummyProjects: PortfolioItem[] = [];

// ==================================================

interface DynamicPortfolioPageProps {
  t?: any;
  lang?: string;
}

export default function DynamicPortfolioPage({
  t: propT,
  lang: propLang,
}: DynamicPortfolioPageProps) {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const context = useLanguage();
  const lang = propLang || context.lang;
  const t = propT || translations[lang as keyof typeof translations];
  const portfolio = t.portfolio;

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!headerRef.current) return;

    const handleScroll = () => {
      const element = headerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const startOffset = rect.top;
      const endOffset = rect.height;
      const scrollPosition = window.scrollY;

      let progress = (scrollPosition - startOffset) / endOffset;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    // Attach scroll listener. Do not call handleScroll immediately on mount
    // because rect.top is viewport-relative and may produce an incorrect
    // large progress value before layout stabilizes (causing opacity 0).
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const res = await fetch("/api/portfolio");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const firstThreeProjects = data.slice(0, 3);
          setProjects(firstThreeProjects);
        } else {
          setProjects(dummyProjects.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setProjects(dummyProjects.slice(0, 3));
      }
    };
    fetchProjects();
  }, []);

  // Compute animation targets and clamp them to safe ranges so the header
  // never animates to an extremely large offset or negative opacity.
  const rawHeaderY = 1 - scrollProgress * 200;
  const rawHeaderOpacity = 1 - scrollProgress * 2;
  const headerY = Math.max(-220, Math.min(60, rawHeaderY));
  const headerOpacity = Math.max(0, Math.min(1, rawHeaderOpacity));

  return (
    <div
      className={`relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden min-h-screen ${lang === "BN" ? "font-hind" : "font-sans"}`}
    >
      {/* Particle Network Background */}
      <ParticleNetwork
        opacity={0.5}
        particleCount={90}
        connectionDistance={150}
        particleSize={{ min: 1, max: 2.5 }}
        particleColor="rgba(168, 85, 247, 0.5)"
        lineColor="rgba(168, 85, 247"
        lineOpacity={0.12}
        speed={0.3}
        glowEffect={true}
      />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header Section */}
        <motion.div
          ref={headerRef}
          animate={{
            y: headerY,
            opacity: headerOpacity,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6 mx-auto md:mx-0"
          >
            <div className="h-px w-8 bg-cyan-500/30" />
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              {portfolio?.badge || "Our Portfolio"}
            </span>
            <div className="h-px w-8 bg-cyan-500/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-[1.1] md:leading-[1.05] py-4 overflow-visible">
              <span className="block text-white pb-1">
                {portfolio?.title || "Creative"}
              </span>
              <span className="relative inline-block mt-1 md:mt-2 px-2">
                <span className="absolute -inset-4 bg-purple-600/20 blur-2xl" />
                <span className="relative text-white py-1 block">
                  {portfolio?.titleGradient || "Artifacts"}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-purple-500/40" />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-sm md:text-base max-w-2xl mx-auto md:mx-0 mt-6 leading-relaxed"
          >
            {portfolio?.desc ||
              "Explore our collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 mt-8"
          >
            {portfolio?.stats?.map((stat: StatType, idx: number) => {
              let value;
              if (idx === 0) value = projects.length;
              else if (idx === 1) value = "100%";
              else value = "24/7";

              return (
                <div key={idx} className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {value}
                    {stat.suffix || ""}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Projects Grid - Shows only 3 projects */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-white/60 text-xl mb-2">
              {portfolio?.noProjects || "No projects found."}
            </p>
            <p className="text-white/40">
              {portfolio?.noProjectsDesc ||
                "Add some projects from the admin dashboard to see them here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, idx) => {
              const colors =
                colorMap[project.colorKey as keyof typeof colorMap] ||
                colorMap.purple;
              const IconComponent = iconMap[project.icon] || faLayerGroup;

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-transparent to-transparent z-10`}
                    />
                    <Image
                      src={
                        project.image ||
                        "https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image"
                      }
                      alt={project.imageAlt}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image";
                      }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border ${colors.border} ${colors.text}`}
                      >
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  </div>

                  <div className="p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${colors.text} border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <FontAwesomeIcon
                          icon={IconComponent}
                          className="text-xl"
                        />
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="text-white/20 hover:text-white transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="text-lg"
                            />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="text-white/20 hover:text-white transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faExternalLinkAlt}
                              className="text-base"
                            />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <h3
                      className={`text-xl font-bold mb-2 transition-colors duration-300 ${colors.text}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-4 font-light line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-mono text-white/40 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-mono text-white/40 uppercase tracking-wider">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg cursor-pointer"
            >
              <span className="relative z-10 text-white/80 font-mono text-xs uppercase tracking-widest group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                {portfolio?.viewAll || "View All Projects"}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
