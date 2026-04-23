"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Smile, Rocket, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  company: string;
  icon: string;
  image?: string;
}

// ============ প্রিমিয়াম লোডিং স্পিনার কম্পোনেন্ট ============
const PremiumSpinner = ({ loadingTexts, pleaseWait, complete }: { loadingTexts: string[], pleaseWait: string, complete: string }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

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

    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < loadingTexts.length) {
        setLoadingText(loadingTexts[textIndex]);
        textIndex++;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [loadingTexts]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18] flex flex-col items-center justify-center z-[200]">
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

      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

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
          <span className="text-white text-2xl font-bold">⭐</span>
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {loadingText}
        </p>
        <p className="text-cyan-400/50 font-mono text-[10px] tracking-[0.3em] uppercase">
          {pleaseWait}
        </p>
      </motion.div>

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
          {loadingProgress}% {complete}
        </motion.p>
      </div>

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

const PremiumReviews = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { lang } = useLanguage();
  const t = translations[lang];

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const res = await fetch('/api/testimonials?admin=true');
        const data = await res.json();
        console.log('Fetched data:', data);
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Particle Network Canvas Effect - FIXED VERSION
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
      pulse: number;
      pulseDir: number;
    }> = [];

    const initNodes = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || window.innerWidth;
      const height = rect?.height || window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      const nodeCount = Math.min(65, Math.floor((width * height) / 20000));
      nodes = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2.8 + 1,
          color: Math.random() > 0.5 
            ? `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
            : `rgba(34, 211, 238, ${Math.random() * 0.5 + 0.2})`,
          pulse: Math.random() * Math.PI * 2,
          pulseDir: 0.02 + Math.random() * 0.03,
        });
      }
    };

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initNodes();
    };

    // Initial setup
    initNodes();
    
    // Use ResizeObserver for better resize handling
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas || nodes.length === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            const opacity = 0.1 * (1 - distance / 170);
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
            gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulse effect
      nodes.forEach((node) => {
        const pulseRadius = node.r + Math.sin(node.pulse) * 0.8;
        node.pulse += node.pulseDir;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Glow effect for larger nodes
        if (node.r > 2) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, 0.05)`;
          ctx.fill();
        }
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary check with padding
        const padding = 50;
        if (node.x < -padding) node.x = canvas.width + padding;
        if (node.x > canvas.width + padding) node.x = -padding;
        if (node.y < -padding) node.y = canvas.height + padding;
        if (node.y > canvas.height + padding) node.y = -padding;
      });
      
      animId = requestAnimationFrame(draw);
    };
    
    // Start animation after a small delay to ensure canvas is ready
    const timeoutId = setTimeout(() => {
      draw();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setIsAutoPlaying(false);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setIsAutoPlaying(false);
    setIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  if (loading) {
    return <PremiumSpinner 
      loadingTexts={t.reviews.loadingTexts} 
      pleaseWait={t.reviews.pleaseWait}
      complete={t.reviews.complete}
    />;
  }

  if (testimonials.length === 0) {
    return (
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18]">
        <div className="text-center">
          <p className="text-white/40">{t.reviews.noTestimonials}</p>
        </div>
      </section>
    );
  }

  const currentReview = testimonials[index];

  return (
    <section 
      ref={containerRef}
      className={`relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-[#0b0c18] via-[#0f0f1a] to-[#0b0c18] ${lang === 'BN' ? 'font-hind' : ''}`}
    >
      {/* Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.45 }}
      />

      <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/15 blur-[100px] md:blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-900/15 blur-[100px] md:blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <svg
        className="absolute bottom-0 left-0 w-full h-24 md:h-32 pointer-events-none z-1 opacity-40 md:opacity-50"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C200,40 400,100 600,60 C800,20 1000,90 1200,50 C1320,30 1400,70 1440,60"
          fill="none"
          stroke="rgba(139,92,246,0.4)"
          strokeWidth="1.5"
        />
        <path
          d="M0,95 C180,55 380,115 580,75 C780,35 980,105 1180,65 C1340,40 1420,80 1440,72"
          fill="none"
          stroke="rgba(34,211,238,0.25)"
          strokeWidth="1"
        />
        <path
          d="M0,108 C220,68 420,128 620,88 C820,48 1020,118 1220,78 C1360,50 1430,90 1440,85"
          fill="none"
          stroke="rgba(139,92,246,0.15)"
          strokeWidth="0.8"
        />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4"
          >
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold">
              {t.reviews.badge}
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-tight"
          >
            {t.reviews.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400">
              {t.reviews.titleGradient}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm md:text-base max-w-2xl mx-auto mt-3 md:mt-4 px-4"
          >
            {t.reviews.desc}
          </motion.p>
        </div>

        <div 
          className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview._id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -30 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="absolute w-full max-w-3xl lg:max-w-4xl px-2 md:px-0"
            >
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:border-purple-500/30 transition-all duration-500 mx-2 md:mx-0">
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-4 md:top-8 right-4 md:right-8 text-6xl md:text-8xl opacity-5 text-white font-serif">
                  "
                </div>

                <div className="p-6 md:p-10 lg:p-12">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center gap-1 md:gap-1.5 mb-6 md:mb-8"
                  >
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-current drop-shadow-lg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </motion.div>

                  <motion.blockquote 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-slate-200 mb-6 md:mb-10 leading-relaxed text-center italic px-2 md:px-4"
                  >
                    "{currentReview.comment}"
                  </motion.blockquote>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {currentReview.image ? (
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
                          <Image
                            src={currentReview.image}
                            alt={currentReview.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              console.error('Image failed to load:', currentReview.image);
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                                  <span class="text-3xl md:text-4xl">${currentReview.icon}</span>
                                </div>`;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                          <span className="text-3xl md:text-4xl">{currentReview.icon}</span>
                        </div>
                      )}
                    </div>
                    
                    <h4 className="text-white font-bold text-lg md:text-xl mt-3 md:mt-4">
                      {currentReview.name}
                    </h4>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-1">
                      <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wider">
                        {currentReview.role}
                      </p>
                      <span className="hidden sm:inline text-white/20">•</span>
                      <p className="text-cyan-400 text-xs md:text-sm font-mono">
                        {currentReview.company}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 group backdrop-blur-sm"
                    aria-label="Previous review"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>

                <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-300 group backdrop-blur-sm"
                    aria-label="Next review"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-cyan-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setIndex(i);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`relative h-1.5 transition-all duration-500 rounded-full overflow-hidden ${
                i === index ? "w-12 md:w-16" : "w-3 md:w-4 bg-white/10 hover:bg-white/20"
              }`}
              aria-label={`Go to review ${i + 1}`}
            >
              {i === index && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  onAnimationComplete={() => {
                    if (isAutoPlaying) {
                      setIndex((prev) => (prev + 1) % testimonials.length);
                    }
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5"
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              4.9/5 {t.reviews.avgRating}
            </span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Smile className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
            <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              {testimonials.length}+ {t.reviews.happyClients}
            </span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Rocket className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              50+ {t.reviews.projectsDelivered}
            </span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              24/7 {t.reviews.support}
            </span>
          </motion.div>
        </motion.div>

        <div className="block md:hidden text-center mt-6">
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-wider">
            {t.reviews.swipeHint}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumReviews;