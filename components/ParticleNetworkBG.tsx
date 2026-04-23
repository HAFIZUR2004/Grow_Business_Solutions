"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ParticleNetworkProps {
  opacity?: number;
  particleCount?: number;
  connectionDistance?: number;
  particleSize?: {
    min?: number;
    max?: number;
  };
  particleColor?: string;
  lineColor?: string;
  lineOpacity?: number;
  speed?: number;
  className?: string;
  glowEffect?: boolean;
}

export default function ParticleNetwork({
  opacity = 0.85,
  particleCount = 85,
  connectionDistance = 200,
  particleSize = { min: 1.8, max: 4.5 },
  particleColor = "rgba(139, 92, 246, 0.95)",
  lineColor = "rgba(139, 92, 246",
  lineOpacity = 0.4,
  speed = 0.8,
  className = "",
  glowEffect = true,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      pulse: number;
      pulseDir: number;
      brightness: number;
    }> = [];

    const initNodes = (width: number, height: number) => {
      const actualCount = Math.min(particleCount, Math.floor((width * height) / 10000));
      nodes = [];
      for (let i = 0; i < actualCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
          pulse: Math.random() * Math.PI * 2,
          pulseDir: 0.04 + Math.random() * 0.06,
          brightness: 0.6 + Math.random() * 0.4,
        });
      }
    };

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Set initial dark background
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      initNodes(canvas.width, canvas.height);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", resize);

    // Function to draw glowing lines with blur effect
    const drawGlowLine = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
      if (!ctx) return;
      
      // Thicker line for better visibility
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity + 0.15})`);
      gradient.addColorStop(0.3, `rgba(167, 139, 250, ${opacity + 0.2})`);
      gradient.addColorStop(0.7, `rgba(34, 211, 238, ${opacity + 0.15})`);
      gradient.addColorStop(1, `rgba(20, 184, 166, ${opacity + 0.1})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    const draw = () => {
      if (!ctx || !canvas || nodes.length === 0) return;
      const W = canvas.width;
      const H = canvas.height;
      
      // Clear with fade effect for smooth trail
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, W, H);
      
      // Add subtle grid pattern for depth
      ctx.strokeStyle = "rgba(139, 92, 246, 0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < W; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, H);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(W, i);
        ctx.stroke();
      }

      // Draw connections with glow effect
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const connectionOpacity = lineOpacity * (1 - distance / connectionDistance);
            
            // Multiple layers for glow effect
            for (let layer = 0; layer < 2; layer++) {
              ctx.lineWidth = 2 + layer * 2;
              ctx.strokeStyle = `rgba(139, 92, 246, ${connectionOpacity * (0.3 - layer * 0.1)})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
            
            // Main bright line
            drawGlowLine(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, connectionOpacity);
          }
        }
      }

      // Draw nodes with enhanced glow
      nodes.forEach((node) => {
        let pulseRadius = node.r + Math.sin(node.pulse) * 1.0;
        pulseRadius = Math.max(0.8, Math.min(pulseRadius, node.r + 1.2));
        node.pulse += node.pulseDir;
        
        // Multiple glow layers for star-like effect
        for (let layer = 3; layer >= 0; layer--) {
          const glowSize = pulseRadius + layer * 4;
          const glowOpacity = 0.15 - layer * 0.035;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          
          const glowGradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowSize
          );
          glowGradient.addColorStop(0, `rgba(139, 92, 246, ${glowOpacity + 0.08})`);
          glowGradient.addColorStop(0.5, `rgba(167, 139, 250, ${glowOpacity * 0.7})`);
          glowGradient.addColorStop(1, `rgba(34, 211, 238, 0)`);
          
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
        
        // Main particle with vibrant gradient
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        
        const particleGradient = ctx.createRadialGradient(
          node.x - 3, node.y - 3, 0,
          node.x, node.y, pulseRadius
        );
        
        const brightness = node.brightness;
        particleGradient.addColorStop(0, `rgba(255, 255, 255, 1)`);
        particleGradient.addColorStop(0.2, `rgba(199, 139, 250, ${brightness})`);
        particleGradient.addColorStop(0.5, `rgba(139, 92, 246, ${brightness * 0.9})`);
        particleGradient.addColorStop(0.8, `rgba(34, 211, 238, ${brightness * 0.7})`);
        particleGradient.addColorStop(1, `rgba(20, 184, 166, ${brightness * 0.5})`);
        
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Star-like sparkle effect
        if (node.r > 2) {
          ctx.save();
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(139, 92, 246, 0.8)";
          
          // Cross sparkle lines
          ctx.beginPath();
          ctx.moveTo(node.x - pulseRadius * 1.5, node.y);
          ctx.lineTo(node.x + pulseRadius * 1.5, node.y);
          ctx.moveTo(node.x, node.y - pulseRadius * 1.5);
          ctx.lineTo(node.x, node.y + pulseRadius * 1.5);
          ctx.strokeStyle = `rgba(255, 255, 255, 0.7)`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Diagonal sparkle
          ctx.beginPath();
          ctx.moveTo(node.x - pulseRadius, node.y - pulseRadius);
          ctx.lineTo(node.x + pulseRadius, node.y + pulseRadius);
          ctx.moveTo(node.x + pulseRadius, node.y - pulseRadius);
          ctx.lineTo(node.x - pulseRadius, node.y + pulseRadius);
          ctx.stroke();
          
          ctx.restore();
        }

        // Intense white core
        ctx.beginPath();
        ctx.arc(node.x - 1, node.y - 1, pulseRadius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.fill();
        
        // Secondary bright core
        ctx.beginPath();
        ctx.arc(node.x - 0.5, node.y - 0.5, pulseRadius * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fill();

        // Update position - faster movement
        node.x += node.vx;
        node.y += node.vy;

        // Smooth boundary handling
        const margin = 20;
        if (node.x < -margin) node.x = canvas.width + margin;
        if (node.x > canvas.width + margin) node.x = -margin;
        if (node.y < -margin) node.y = canvas.height + margin;
        if (node.y > canvas.height + margin) node.y = -margin;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, [particleCount, connectionDistance, particleSize, particleColor, lineColor, lineOpacity, speed, glowEffect]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity }}
      />
    </motion.div>
  );
}