'use client';

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

const iconMap: Record<string, any> = {
  faLayerGroup: faLayerGroup,
  faDatabase: faDatabase,
  faMicrochip: faMicrochip,
  faBolt: faBolt,
  faShieldAlt: faShieldAlt,
};

const colorMap = {
  purple: {
    bg: "bg-purple-500/5",
    hoverBg: "group-hover:bg-purple-500/10",
    text: "text-purple-400",
    accent: "text-purple-500/80",
    gradient: "from-purple-500/20 to-transparent",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20"
  },
  cyan: {
    bg: "bg-cyan-500/5",
    hoverBg: "group-hover:bg-cyan-500/10",
    text: "text-cyan-400",
    accent: "text-cyan-500/80",
    gradient: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20"
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "group-hover:bg-blue-500/10",
    text: "text-blue-400",
    accent: "text-blue-500/80",
    gradient: "from-blue-500/20 to-transparent",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20"
  },
  emerald: {
    bg: "bg-emerald-500/5",
    hoverBg: "group-hover:bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "text-emerald-500/80",
    gradient: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20"
  }
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

// ============ প্রিমিয়াম লোডিং স্পিনার কম্পোনেন্ট ============
const PremiumSpinner = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading Projects");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const texts = ["Fetching Data", "Processing Assets", "Preparing Portfolio", "Almost Ready"];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < texts.length) {
        setLoadingText(texts[textIndex]);
        textIndex++;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18] flex flex-col items-center justify-center z-[200]">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full"
          animate={{ x: [-300, 300], y: [-300, 300] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full bottom-0 right-0"
          animate={{ x: [300, -300], y: [300, -300] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Spinner - Quantum Ring */}
      <motion.div
        className="relative w-32 h-32 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-purple-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-500 border-r-blue-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md" />
        </motion.div>
      </motion.div>

      {/* Logo Placeholder */}
      <motion.div
        className="relative w-20 h-20 mb-6"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity },
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">🚀</span>
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="text-center space-y-3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {loadingText}
        </p>
        <p className="text-cyan-400/50 font-mono text-[10px] tracking-[0.3em] uppercase">
          Please wait
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 md:w-80 mt-8">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.p
          className="text-[10px] text-white/30 text-center mt-2 font-mono"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {loadingProgress}% Complete
        </motion.p>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: "50%",
              y: "50%",
              scale: 0,
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 100}%`,
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
};
// ==================================================

export default function DynamicPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
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
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data from API and show only first 3 projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // সিমুলেটেড লোডিং ডেলে (প্রিমিয়াম স্পিনার দেখানোর জন্য)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // শুধুমাত্র প্রথম 3টি প্রজেক্ট দেখাবে (ল্যান্ডিং পেজের জন্য)
          const firstThreeProjects = data.slice(0, 3);
          setProjects(firstThreeProjects);
          console.log(`✅ Showing ${firstThreeProjects.length} projects on landing page`);
        } else {
          setProjects(dummyProjects.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setProjects(dummyProjects.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Enhanced Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string; pulse: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const nodeCount = window.innerWidth < 768 ? 45 : 90;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.5 + 1,
        color: Math.random() > 0.6 ? "rgba(168, 85, 247, 0.5)" : "rgba(34, 211, 238, 0.4)",
        pulse: Math.random() * Math.PI * 2
      }));
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `rgba(168, 85, 247, ${0.12 * (1 - dist / 150)})`);
            gradient.addColorStop(1, `rgba(34, 211, 238, ${0.12 * (1 - dist / 150)})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const pulseRadius = n.r + Math.sin(n.pulse) * 0.5;
        n.pulse += 0.02;
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseRadius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, 0.03)`;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -50) n.x = canvas.width + 50;
        if (n.x > canvas.width + 50) n.x = -50;
        if (n.y < -50) n.y = canvas.height + 50;
        if (n.y > canvas.height + 50) n.y = -50;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const headerY = 1 - scrollProgress * 200;
  const headerOpacity = 1 - scrollProgress * 2;

  // প্রিমিয়াম স্পিনার দেখানো হচ্ছে (পুরনো স্পিনার বাদ)
  if (loading) {
    return <PremiumSpinner />;
  }

  return (
    <div className="relative bg-[#0b0c18] text-white py-20 px-6 overflow-hidden min-h-screen font-sans">
      
      {/* Enhanced Particle Network Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      />

      {/* Static Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#0b0c18_95%)]" />
      </div>

      {/* Gradient Glows */}
      <div className="fixed top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-cyan-900/15 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Premium Header Section */}
        <motion.div 
          ref={headerRef}
          animate={{ 
            y: headerY,
            opacity: headerOpacity
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
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
              Featured Work
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
              <span className="block bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                Creative
              </span>
              <span className="relative inline-block mt-2 md:mt-4">
                <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  Artifacts
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-sm md:text-base max-w-2xl mx-auto md:mx-0 mt-6 leading-relaxed"
          >
            Explore our collection of digital masterpieces — each project represents a unique challenge solved with creativity and technical excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 mt-8"
          >
            {[
              { value: projects.length, label: "Featured Projects", suffix: "+" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {stat.value}{stat.suffix || ''}
                </div>
                <div className="text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid - Shows only 3 projects */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-white/60 text-xl mb-2">No projects found.</p>
            <p className="text-white/40">Add some projects from the admin dashboard to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, idx) => {
              const colors = colorMap[project.colorKey as keyof typeof colorMap] || colorMap.purple;
              const IconComponent = iconMap[project.icon] || faLayerGroup;
              
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-transparent to-transparent z-10`} />
                    <Image
                      src={project.image || 'https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image'}
                      alt={project.imageAlt}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image';
                      }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border ${colors.border} ${colors.text}`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  </div>

                  <div className="p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${colors.text} border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <FontAwesomeIcon icon={IconComponent} className="text-xl" />
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
                            <FontAwesomeIcon icon={faGithub} className="text-lg" />
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
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-base" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${colors.text}`}>
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-4 font-light line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-mono text-white/40 uppercase tracking-wider">
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

        {/* View All Projects Button - Navigates to full projects page */}
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
                View All Projects
                <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}