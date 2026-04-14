'use client';

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { 
  faExternalLinkAlt, 
  faMicrochip, 
  faDatabase, 
  faShieldAlt, 
  faBolt, 
  faLayerGroup 
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
    gradient: "from-purple-500/20 to-transparent"
  },
  cyan: {
    bg: "bg-cyan-500/5",
    hoverBg: "group-hover:bg-cyan-500/10",
    text: "text-cyan-400",
    accent: "text-cyan-500/80",
    gradient: "from-cyan-500/20 to-transparent"
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "group-hover:bg-blue-500/10",
    text: "text-blue-400",
    accent: "text-blue-500/80",
    gradient: "from-blue-500/20 to-transparent"
  },
  emerald: {
    bg: "bg-emerald-500/5",
    hoverBg: "group-hover:bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "text-emerald-500/80",
    gradient: "from-emerald-500/20 to-transparent"
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
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch data from API
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err);
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

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
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      nodes = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.2 + 0.6,
        color:
          Math.random() > 0.6
            ? "rgba(168, 85, 247, 0.45)"
            : "rgba(6, 182, 212, 0.35)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // লাইন কানেক্ট করা
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 155) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.09 * (1 - d / 155);

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, "rgba(168, 85, 247, " + opacity + ")");
            gradient.addColorStop(1, "rgba(6, 182, 212, " + opacity + ")");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // ডট আঁকা এবং মুভ করা
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        if (n.r > 1.5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, 0.06)`;
          ctx.fill();
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        }
        if (n.x > canvas.width) {
          n.x = canvas.width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        }
        if (n.y > canvas.height) {
          n.y = canvas.height;
          n.vy *= -1;
        }
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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0c18] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b0c18] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 text-xl mb-4">No projects found.</p>
          <p className="text-white/40">Add some projects from the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0b0c18] text-white py-24 px-6 selection:bg-purple-500/30 font-sans overflow-hidden">
      
      {/* Particle Network Canvas - Full Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      {/* Gradient Glow Effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/8 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-500 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Our Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none text-white">
              Engineering <br />
              <span className="text-white/30 italic font-light">Digital Sovereign.</span>
            </h1>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => {
            const colors = colorMap[project.colorKey as keyof typeof colorMap];
            const IconComponent = iconMap[project.icon] || faLayerGroup;
            
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-[40px] bg-[#11111e]/80 backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-500 hover:border-purple-500/20 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} z-10`} />
                  <Image
  src={project.image?.trim() || ''} 
  alt={project.imageAlt}
  width={800}
  height={600}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://placehold.co/800x600/1a1a2e/ffffff?text=Image+Not+Found';
  }}
/>
                  {/* Overlay Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm ${colors.text}`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="relative p-8">
                  <div className={`absolute top-0 right-0 w-72 h-72 ${colors.bg} blur-[100px] ${colors.hoverBg} transition-all duration-500`} />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${colors.text}`}>
                        <FontAwesomeIcon icon={IconComponent} className="text-2xl" />
                      </div>
                      <div className="flex gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon 
                              icon={faGithub} 
                              className="text-xl cursor-pointer hover:text-white transition-colors" 
                            />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon 
                              icon={faExternalLinkAlt} 
                              className="text-lg cursor-pointer hover:text-white transition-colors" 
                            />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-gray-500 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500 text-xs" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          {project.stats}
                        </span>
                      </div>
                      <span className="text-3xl font-black text-white/[0.02] italic">{project.id}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}