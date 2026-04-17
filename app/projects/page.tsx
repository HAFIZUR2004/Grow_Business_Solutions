'use client';

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
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

// আইকন ম্যাপিং
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
    border: "border-purple-500/20"
  },
  cyan: {
    bg: "bg-cyan-500/5",
    hoverBg: "group-hover:bg-cyan-500/10",
    text: "text-cyan-400",
    accent: "text-cyan-500/80",
    gradient: "from-cyan-500/20 to-transparent",
    border: "border-cyan-500/20"
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "group-hover:bg-blue-500/10",
    text: "text-blue-400",
    accent: "text-blue-500/80",
    gradient: "from-blue-500/20 to-transparent",
    border: "border-blue-500/20"
  },
  emerald: {
    bg: "bg-emerald-500/5",
    hoverBg: "group-hover:bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "text-emerald-500/80",
    gradient: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/20"
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

export default function DynamicPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          console.log(`✅ Loaded ${data.length} projects from API`);
        } else {
          console.warn('⚠️ No projects found in API');
          setProjects([]);
        }
      } catch (err) {
        console.error('❌ Error fetching portfolio:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Hero Section Style Particle Network Canvas Effect
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
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    const initNodes = () => {
      nodes = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2.2 + 0.8,
      }));
    };

    resize();
    initNodes();
    window.addEventListener("resize", () => {
      resize();
      initNodes();
    });

    const draw = () => {
      if (!ctx || !canvas) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw connecting lines (Hero section style)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(120,80,220,${0.22 * (1 - d / 160)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (Hero section style)
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140,100,240,0.75)";
        ctx.fill();
        
        // Update position
        n.x += n.vx;
        n.y += n.vy;
        
        // Boundary check
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c18] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500/30 border-b-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs whitespace-nowrap">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0b0c18] text-white py-20 px-4 md:py-28 md:px-6 overflow-hidden font-sans min-h-screen">
      
      {/* Hero Section Style Particle Network Canvas - Full Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero Section Style Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 md:mb-32 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 mx-auto md:mx-0">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500" />
              <span className="text-purple-400 font-mono text-xs uppercase tracking-[0.3em] font-semibold">
                Our Portfolio
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[1.1] mb-6">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Engineering
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
                  Digital Excellence
                </span>
              </span>
            </h1>
            
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Explore our collection of innovative digital solutions — each project represents a unique challenge solved with creativity and technical mastery.
            </p>

            {/* Stats Row - Dynamic count shows total projects */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 mt-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {projects.length}
                </div>
                <div className="text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-wider mt-1">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-wider mt-1">
                  Client Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-[10px] md:text-xs text-white/30 font-mono uppercase tracking-wider mt-1">
                  Support Available
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Projects Grid - Shows ALL projects from API */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-white/60 text-xl mb-2">No projects found.</p>
            <p className="text-white/40">Add some projects from the admin dashboard to see them here.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, idx) => {
                const colors = colorMap[project.colorKey as keyof typeof colorMap] || colorMap.purple;
                const IconComponent = iconMap[project.icon] || faLayerGroup;
                
                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                    className="group relative rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/15 hover:shadow-2xl"
                  >
                    {/* Image Section */}
                    <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} z-10`} />
                      <Image
                        src={project.image?.trim() || 'https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image'}
                        alt={project.imageAlt || project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/800x600/1a1a2e/ffffff?text=Project+Image';
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-sm border ${colors.border} ${colors.text}`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6 md:p-8">
                      <div className={`absolute top-0 right-0 w-64 h-64 ${colors.bg} blur-[80px] ${colors.hoverBg} transition-all duration-500 opacity-0 group-hover:opacity-100`} />

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-5">
                          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${colors.text} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                            <FontAwesomeIcon icon={IconComponent} className="text-xl md:text-2xl" />
                          </div>
                          <div className="flex gap-3 opacity-40 group-hover:opacity-100 transition-all duration-300">
                            {project.github && (
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform duration-200"
                              >
                                <FontAwesomeIcon 
                                  icon={faGithub} 
                                  className="text-lg md:text-xl cursor-pointer hover:text-white transition-colors" 
                                />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a 
                                href={project.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform duration-200"
                              >
                                <FontAwesomeIcon 
                                  icon={faExternalLinkAlt} 
                                  className="text-base md:text-lg cursor-pointer hover:text-white transition-colors" 
                                />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="mb-5">
                          <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2 transition-colors duration-300 ${colors.text}`}>
                            {project.title}
                          </h3>
                          <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[8px] md:text-[9px] text-white/40 font-mono uppercase tracking-wider hover:bg-white/10 transition-colors">
                              {tag}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[8px] md:text-[9px] text-white/40 font-mono uppercase tracking-wider">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="pt-5 border-t border-white/5 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500/60 text-[10px] md:text-xs" />
                            <span className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-wider">
                              {project.stats || 'Production Ready'}
                            </span>
                          </div>
                          <span className="text-2xl md:text-3xl font-black text-white/[0.03] italic">
                            {project.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Project Count Footer */}
            <div className="text-center mt-12 pt-8 border-t border-white/5">
              <p className="text-white/30 text-xs font-mono uppercase tracking-wider">
                Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}