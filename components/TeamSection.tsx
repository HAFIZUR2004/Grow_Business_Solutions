"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useLanguage } from "@/constants/LanguageContext";
import { translations } from "@/constants/translations";

// React Icons
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Type definitions
interface SocialLinks {
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  facebook?: string;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
  social?: SocialLinks;
}

// wireColors - বিভিন্ন কার্ডের জন্য বিভিন্ন রং
const wireColors = [
  "#6d28d9", // purple
  "#22d3ee", // cyan
  "#b5a7ff", // light purple
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ef4444", // red
  "#3b82f6", // blue
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#14b8a6", // teal
];

const TeamSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const { lang } = useLanguage();
  const t = translations[lang];
  const teamMembers = t.teamMembers as TeamMember[];

  const [flippedStates, setFlippedStates] = useState<boolean[]>(() =>
    new Array(teamMembers.length).fill(false),
  );
  const [isFlipping, setIsFlipping] = useState<number | null>(null);

  // ফ্লিপ এনিমেশন - GSAP সহ
  const handleFlip = (index: number) => {
    if (isFlipping === index) return;

    setIsFlipping(index);

    const cardElement = document.querySelector(`[data-card-index="${index}"]`);

    if (cardElement) {
      gsap.to(cardElement, {
        duration: 0.6,
        rotationY: flippedStates[index] ? 0 : 180,
        ease: "back.out(1.2)",
        transformStyle: "preserve-3d",
        onComplete: () => {
          setFlippedStates((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
          });
          setIsFlipping(null);
        },
      });
    } else {
      setFlippedStates((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index];
        return newState;
      });
      setTimeout(() => setIsFlipping(null), 600);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 100, scale: 0.8, rotationX: -45 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.5,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
          },
        );
      }

      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  // Particle network animation
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
      nodes = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        color:
          Math.random() > 0.6
            ? "rgba(139, 92, 246, 0.4)"
            : "rgba(34, 211, 238, 0.3)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(
            nodes[i].x - nodes[j].x,
            nodes[i].y - nodes[j].y,
          );
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.1 * (1 - d / 120);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.x = Math.min(Math.max(n.x, 0), canvas.width);
        n.y = Math.min(Math.max(n.y, 0), canvas.height);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const renderCard = (member: TeamMember, idx: number) => (
    <div
      key={idx}
      className="relative group cursor-pointer"
      onClick={() => handleFlip(idx)}
    >
      {/* Connecting Line from Node to Card */}
      <div
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-[2px] h-5 z-10 transition-all duration-300 group-hover:h-8"
        style={{
          background: `linear-gradient(to bottom, ${wireColors[idx % wireColors.length]}, ${wireColors[idx % wireColors.length]}40)`,
        }}
      />

      {/* Node Light - বড় এবং উজ্জ্বল */}
      <div
        className="node-light absolute -top-10 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-20 transition-all duration-300 flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: wireColors[idx % wireColors.length],
          boxShadow: `0 0 25px ${wireColors[idx % wireColors.length]}, 0 0 50px ${wireColors[idx % wireColors.length]}`,
          border: "2px solid rgba(255,255,255,0.5)",
        }}
      >
        {/* Inner pulsing dot */}
        <div
          className="w-2 h-2 rounded-full bg-white animate-pulse"
          style={{
            boxShadow: `0 0 15px ${wireColors[idx % wireColors.length]}`,
          }}
        />
      </div>

      {/* Card Number Badge */}
      <div
        className="absolute -top-9 left-1/2 -translate-x-1/2 translate-x-8 z-20 text-[10px] font-mono whitespace-nowrap"
        style={{
          color: wireColors[idx % wireColors.length],
          textShadow: `0 0 10px ${wireColors[idx % wireColors.length]}`,
        }}
      >
        #{idx + 1}
      </div>

      {/* Flip Card Container */}
      <div
        className="relative w-full aspect-[3/4]"
        style={{ perspective: "1200px" }}
      >
        <div
          data-card-index={idx}
          className="relative w-full h-full transition-all duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flippedStates[idx] ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0f1120] border border-white/10 group-hover:border-purple-500/50 transition-all duration-300"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative w-full h-full">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-cyan-900/40 flex items-center justify-center">
                  <FiUser className="w-20 h-20 text-white/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c18] via-[#0b0c18]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {member.name.split(" ")[0]}
                </h3>
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider">
                  {member.role.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="mt-4 text-white/30 text-xs font-mono flex items-center justify-center gap-1">
                  <span className="inline-block animate-bounce">↺</span>
                  <span>Click to flip</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/60 to-cyan-900/60 backdrop-blur-md border border-white/20 p-6 flex flex-col"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center flex-1 flex flex-col justify-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg bg-[#0f1120]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                    <FiUser className="w-10 h-10 text-white/50" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-cyan-300 text-[10px] font-mono uppercase mb-4 tracking-wider">
                {member.role}
              </p>

              <div className="w-12 h-[1px] bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4" />

              <p className="text-white/60 text-xs leading-relaxed mb-6 line-clamp-3">
                {member.description}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-3 flex-wrap">
                {member.social?.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 hover:scale-110 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdEmail className="w-4 h-4 text-white/80" />
                  </a>
                )}
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 hover:scale-110 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaLinkedin className="w-4 h-4 text-white/80" />
                  </a>
                )}
                {member.social?.facebook && (
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 hover:scale-110 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaFacebook className="w-4 h-4 text-white/80" />
                  </a>
                )}
                {member.social?.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 hover:scale-110 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="w-4 h-4 text-white/80" />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500/50 hover:scale-110 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaTwitter className="w-4 h-4 text-white/80" />
                  </a>
                )}
              </div>

              <div className="mt-6 text-white/30 text-[10px] font-mono">
                ↻ Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#0b0c18] to-[#0a0a14] py-20 md:py-28 px-4 overflow-hidden"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      {/* Gradient Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6" />

          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase"
          >
            {t.teamTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
              {t.teamTitleGradient}
            </span>
          </h2>

          <div ref={badgeRef} className="mt-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="text-cyan-400 font-mono text-[11px] tracking-[0.3em] uppercase">
              {t.teamBadge} • {teamMembers.length} MEMBERS
            </span>
          </div>
        </div>

        {/* Swiper Carousel with Navigation */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="team-carousel"
            style={{ padding: "20px 0 60px 0" }}
          >
            {teamMembers.map((member, idx) => (
              <SwiperSlide key={idx}>{renderCard(member, idx)}</SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:scale-110 transition-all duration-300"
            style={{ left: "-20px" }}
          >
            ❮
          </button>
          <button
            className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:scale-110 transition-all duration-300"
            style={{ right: "-20px" }}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Instruction Toast */}
      <div className="fixed bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 text-white/50 text-[9px] font-mono z-50 pointer-events-none border border-white/10">
        💡 Click cards to flip • Swipe for more
      </div>
    </section>
  );
};

export default TeamSection;
