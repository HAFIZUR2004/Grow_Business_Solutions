"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2.2 + 0.8,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

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

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140,100,240,0.75)";
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
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

  return (
    <>
      <style>{css}</style>
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden />
        <div className="glow-left" aria-hidden />
        <div className="glow-bottom" aria-hidden />

        {/* Bottom wave lines */}
        <svg
          className="waves"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,140 C200,80 400,200 600,130 C800,60 1000,180 1200,110 C1320,75 1400,130 1440,120"
            fill="none"
            stroke="rgba(120,80,220,0.35)"
            strokeWidth="1.5"
          />
          <path
            d="M0,170 C180,110 380,210 580,155 C780,100 980,200 1180,145 C1340,105 1420,155 1440,148"
            fill="none"
            stroke="rgba(100,60,200,0.22)"
            strokeWidth="1"
          />
          <path
            d="M0,155 C220,95 420,195 620,140 C820,85 1020,190 1210,130 C1350,90 1430,140 1440,135"
            fill="none"
            stroke="rgba(140,100,240,0.18)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Globe */}
        <div className="globe-wrap" aria-hidden>
          <GlobeSVG />
        </div>

        {/* 99.99% stat card */}
        <div className="stat-card">
          <span className="stat-value">99.99%</span>
          <span className="stat-label">Data SLA</span>
        </div>

        {/* Mini chart widget */}
        <div className="chart-widget" aria-hidden>
          <svg viewBox="0 0 80 40" width="80" height="40">
            <polyline
              points="0,32 15,24 28,28 40,14 55,20 68,8 80,12"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <circle cx="68" cy="8" r="2.5" fill="#22d3ee" />
          </svg>
        </div>

        {/* Left content */}
        <div className="content">
          <div className="badge">
            <span className="badge-dot" />
            Grow Business Solutions BD
          </div>

          <h1 className="heading">
            Your Vision, Our Expertise- Engineering Success Together.
          </h1>

          <p className="desc">
            Your vision combined with our technical expertise will pave the way
            for future success. We go beyond mere project delivery; we act as
            your dedicated partner at every step of your business journey, all
            within an affordable budget. Through cutting-edge AI and
            high-performance solutions, we will elevate your dreams to
            extraordinary heights. Consult with our expert team today at no cost
            to discover the best strategy for your business. We are by your
            side, always.
          </p>

          <div className="btns">
            <button className="btn btn-primary">Get a Free Consultation</button>
            <button className="btn btn-secondary">Our Success Stories</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Globe Component ── */
function GlobeSVG() {
  const continentDots: [number, number][] = [
    // Europe
    [258, 148],
    [265, 143],
    [272, 140],
    [280, 138],
    [288, 137],
    [295, 139],
    [302, 142],
    [268, 152],
    [275, 150],
    [282, 149],
    [290, 148],
    [297, 150],
    [303, 153],
    [270, 158],
    [277, 156],
    [284, 155],
    [291, 154],
    [298, 156],
    [272, 164],
    [279, 162],
    [286, 161],
    [292, 162],
    // Africa
    [265, 175],
    [272, 173],
    [279, 172],
    [286, 171],
    [292, 172],
    [298, 174],
    [263, 182],
    [270, 181],
    [277, 180],
    [284, 180],
    [290, 181],
    [296, 182],
    [261, 190],
    [268, 189],
    [275, 189],
    [282, 189],
    [288, 190],
    [294, 192],
    [260, 198],
    [267, 198],
    [274, 198],
    [280, 199],
    [286, 200],
    [262, 207],
    [268, 207],
    [274, 208],
    [280, 209],
    [264, 216],
    [270, 217],
    [275, 218],
    [267, 225],
    [272, 226],
    // Asia
    [306, 140],
    [313, 138],
    [320, 137],
    [327, 138],
    [334, 140],
    [340, 143],
    [308, 147],
    [315, 146],
    [322, 145],
    [329, 146],
    [336, 148],
    [310, 154],
    [317, 153],
    [324, 153],
    [330, 154],
    [336, 156],
    [312, 161],
    [318, 161],
    [324, 162],
    [330, 163],
    [308, 168],
    [314, 169],
    [320, 170],
    [325, 172],
    [305, 176],
    [310, 177],
    [315, 178],
    [320, 180],
    [300, 162],
    [300, 168],
    [300, 175],
  ];

  const hexTiles: [number, number][] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 6; col++) {
      const x = 330 + col * 26 + (row % 2) * 13;
      const y = 148 + row * 22;
      if (Math.sqrt((x - 370) ** 2 + (y - 230) ** 2) < 110) {
        hexTiles.push([x, y]);
      }
    }
  }

  return (
    <svg
      viewBox="0 0 600 480"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <radialGradient id="globeFill" cx="38%" cy="38%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#7c3aed" stopOpacity="0.88" />
          <stop offset="62%" stopColor="#3b1d8a" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0d0a1f" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="outerGlow" cx="50%" cy="50%">
          <stop offset="55%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tealGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
        <clipPath id="gc">
          <circle cx="290" cy="230" r="185" />
        </clipPath>
        <filter id="sf">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gf">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* Glow halos */}
      <circle
        cx="290"
        cy="230"
        r="245"
        fill="url(#outerGlow)"
        filter="url(#gf)"
      />
      <ellipse
        cx="430"
        cy="230"
        rx="190"
        ry="165"
        fill="url(#tealGlow)"
        filter="url(#gf)"
      />

      {/* Outer orbit ring */}
      <ellipse
        cx="290"
        cy="230"
        rx="272"
        ry="62"
        fill="none"
        stroke="rgba(140,100,240,0.3)"
        strokeWidth="1"
        transform="rotate(-14 290 230)"
      />
      {([[-14], [76], [166], [256]] as [number][]).map(([a], i) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={290 + 272 * Math.cos(r)}
            cy={230 + 62 * Math.sin(r)}
            r="5"
            fill="#7c3aed"
            opacity="0.85"
            filter="url(#sf)"
          />
        );
      })}

      {/* Second orbit */}
      <ellipse
        cx="290"
        cy="230"
        rx="242"
        ry="50"
        fill="none"
        stroke="rgba(120,80,210,0.22)"
        strokeWidth="0.8"
        transform="rotate(10 290 230)"
      />

      {/* Left wireframe cage */}
      {[-35, -18, 0, 18, 35].map((off, i) => (
        <ellipse
          key={i}
          cx={108 + off * 0.4}
          cy={230}
          rx={88}
          ry={155 - Math.abs(off) * 0.6}
          fill="none"
          stroke="rgba(120,80,220,0.18)"
          strokeWidth="0.7"
          transform={`rotate(${off * 0.35} ${108 + off * 0.4} 230)`}
        />
      ))}

      {/* Right wireframe cage */}
      {[-28, 0, 28].map((off, i) => (
        <ellipse
          key={i}
          cx={492}
          cy={230}
          rx={78}
          ry={148 - Math.abs(off)}
          fill="none"
          stroke="rgba(120,80,220,0.18)"
          strokeWidth="0.7"
          transform={`rotate(${off * 0.28} 492 230)`}
        />
      ))}

      {/* Globe body */}
      <circle cx="290" cy="230" r="185" fill="url(#globeFill)" />

      {/* Latitude lines */}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const y2 = 230 + (lat / 90) * 185;
        const rx2 = Math.cos((lat * Math.PI) / 180) * 185;
        return (
          <ellipse
            key={lat}
            cx="290"
            cy={y2}
            rx={rx2}
            ry={rx2 * 0.18}
            fill="none"
            stroke="rgba(180,150,255,0.2)"
            strokeWidth="0.6"
            clipPath="url(#gc)"
          />
        );
      })}
      {/* Longitude lines */}
      {[0, 30, 60, 90, 120, 150].map((lng) => (
        <ellipse
          key={lng}
          cx="290"
          cy="230"
          rx="185"
          ry={185 * 0.22}
          fill="none"
          stroke="rgba(180,150,255,0.18)"
          strokeWidth="0.6"
          transform={`rotate(${lng} 290 230)`}
          clipPath="url(#gc)"
        />
      ))}

      {/* Dot-matrix continents */}
      <g clipPath="url(#gc)">
        {continentDots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.3" fill="rgba(200,180,255,0.78)" />
        ))}
      </g>

      {/* Hex tile region */}
      <g clipPath="url(#gc)">
        {hexTiles.map(([x, y], i) => (
          <polygon
            key={i}
            points={hexPts(x, y, 11)}
            fill="rgba(210,195,255,0.1)"
            stroke="rgba(210,195,255,0.55)"
            strokeWidth="0.7"
          />
        ))}
      </g>

      {/* Specular highlight */}
      <ellipse
        cx="242"
        cy="178"
        rx="56"
        ry="35"
        fill="rgba(255,255,255,0.1)"
        transform="rotate(-25 242 178)"
        clipPath="url(#gc)"
      />

      {/* Network nodes on globe */}
      {(
        [
          [258, 148],
          [310, 155],
          [340, 175],
          [295, 200],
          [270, 222],
          [325, 140],
          [360, 195],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3.8"
          fill="#a78bfa"
          filter="url(#sf)"
          opacity="0.95"
        />
      ))}

      {/* Lines between globe nodes */}
      {(
        [
          [258, 148, 310, 155],
          [310, 155, 340, 175],
          [340, 175, 360, 195],
          [258, 148, 295, 200],
          [295, 200, 270, 222],
          [310, 155, 325, 140],
          [340, 175, 295, 200],
        ] as [number, number, number, number][]
      ).map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(167,139,250,0.55)"
          strokeWidth="0.9"
        />
      ))}

      {/* External network nodes + lines */}
      <circle
        cx="105"
        cy="88"
        r="4.5"
        fill="#7c3aed"
        opacity="0.75"
        filter="url(#sf)"
      />
      <circle cx="58" cy="138" r="3" fill="#7c3aed" opacity="0.6" />
      <line
        x1="105"
        y1="88"
        x2="178"
        y2="155"
        stroke="rgba(120,80,220,0.3)"
        strokeWidth="0.8"
      />
      <line
        x1="105"
        y1="88"
        x2="58"
        y2="138"
        stroke="rgba(120,80,220,0.25)"
        strokeWidth="0.8"
      />

      <circle
        cx="512"
        cy="88"
        r="4.5"
        fill="#7c3aed"
        opacity="0.75"
        filter="url(#sf)"
      />
      <circle cx="562" cy="143" r="3" fill="#7c3aed" opacity="0.55" />
      <line
        x1="512"
        y1="88"
        x2="442"
        y2="155"
        stroke="rgba(120,80,220,0.3)"
        strokeWidth="0.8"
      />
      <line
        x1="512"
        y1="88"
        x2="562"
        y2="143"
        stroke="rgba(120,80,220,0.25)"
        strokeWidth="0.8"
      />

      <circle cx="78" cy="322" r="3.5" fill="#7c3aed" opacity="0.65" />
      <line
        x1="78"
        y1="322"
        x2="140"
        y2="282"
        stroke="rgba(120,80,220,0.28)"
        strokeWidth="0.8"
      />

      <circle cx="522" cy="352" r="3.5" fill="#7c3aed" opacity="0.65" />
      <line
        x1="522"
        y1="352"
        x2="456"
        y2="312"
        stroke="rgba(120,80,220,0.28)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function hexPts(cx: number, cy: number, s: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`;
    })
    .join(" ");
}

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #0b0c18;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  }
  .hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  .glow-left {
    position: absolute;
    left: -130px;
    top: 50%;
    transform: translateY(-50%);
    width: 440px;
    height: 440px;
    background: radial-gradient(circle, rgba(88,28,210,0.2) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .glow-bottom {
    position: absolute;
    left: -60px;
    bottom: -90px;
    width: 520px;
    height: 340px;
    background: radial-gradient(ellipse, rgba(80,40,180,0.22) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .waves {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 220px;
    pointer-events: none;
    z-index: 1;
  }
  .globe-wrap {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: min(600px, 45vw);
    aspect-ratio: 1;
    z-index: 2;
    pointer-events: none;
    animation: floatG 7s ease-in-out infinite;
  }
  @keyframes floatG {
    0%,100% { transform: translateY(-50%) translateY(0); }
    50%      { transform: translateY(-50%) translateY(-16px); }
  }
  .stat-card {
    position: absolute;
    top: 20%;
    right: 35%;
    transform: translateX(-50%);
    background: rgba(22,19,42,0.78);
    border: 1px solid rgba(110,75,210,0.38);
    border-radius: 10px;
    padding: 12px 22px;
    backdrop-filter: blur(12px);
    z-index: 10;
    animation: fadeUp 1s 0.6s ease both;
    text-align: center;
  }
  .stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .stat-label {
    display: block;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    margin-top: 5px;
    letter-spacing: 0.05em;
  }
  .chart-widget {
    position: absolute;
    top: 15%;
    right: 10%;
    background: rgba(18,15,38,0.72);
    border: 1px solid rgba(90,70,190,0.32);
    border-radius: 8px;
    padding: 8px 10px;
    backdrop-filter: blur(8px);
    z-index: 10;
  }
  .star {
    position: absolute;
    bottom: 8%;
    right: 3.5%;
    z-index: 10;
    opacity: 0.92;
    filter: drop-shadow(0 0 7px rgba(255,255,255,0.65));
    animation: starP 3s ease-in-out infinite;
  }
  @keyframes starP {
    0%,100% { opacity: 0.92; transform: scale(1); }
    50%      { opacity: 0.55; transform: scale(0.86); }
  }
  .content {
    position: relative;
    z-index: 10;
    padding: 0 0 0 clamp(2rem, 6.5vw, 7.5rem);
    max-width: 700px;
    margin-left: 10%;
    margin-right: auto;
    animation: fadeUp 0.8s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(100,75,200,0.4);
    border-radius: 999px;
    padding: 7px 18px 7px 12px;
    font-size: 13px;
    color: rgba(255,255,255,0.88);
    letter-spacing: 0.01em;
    margin-bottom: 22px;
    backdrop-filter: blur(6px);
  }
  .badge-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 10px #22d3ee, 0 0 20px rgba(34,211,238,0.45);
    flex-shrink: 0;
    animation: dotP 2s ease-in-out infinite;
  }
  @keyframes dotP {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.55; transform: scale(1.28); }
  }
  .heading {
    font-size: clamp(2.9rem, 5.2vw, 4.7rem);
    font-weight: 900;
    line-height: 1.06;
    color: #ffffff;
    margin: 0 0 20px;
    letter-spacing: -0.025em;
    animation: fadeUp 0.8s 0.12s ease both;
  }
  .desc {
    font-size: clamp(0.87rem, 1.05vw, 0.99rem);
    line-height: 1.76;
    color: rgba(195,185,228,0.65);
    margin: 0 0 36px;
    animation: fadeUp 0.8s 0.22s ease both;
  }
  .btns {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    animation: fadeUp 0.8s 0.34s ease both;
  }
  .btn {
    padding: 15px 30px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    font-family: 'Inter', sans-serif;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    letter-spacing: 0.01em;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn-primary {
    background: #6d28d9;
    color: #fff;
    box-shadow: 0 4px 22px rgba(109,40,217,0.55);
  }
  .btn-primary:hover {
    background: #7c3aed;
    box-shadow: 0 8px 32px rgba(109,40,217,0.7);
  }
  .btn-secondary {
    background: rgba(38,34,62,0.88);
    color: rgba(255,255,255,0.9);
    border: 1px solid rgba(140,115,250,0.3);
    backdrop-filter: blur(6px);
  }
  .btn-secondary:hover {
    background: rgba(52,46,80,0.92);
  }

  @media (max-width: 860px) {
    .globe-wrap, .stat-card, .chart-widget, .star { display: none; }
    .content { padding: 4rem 2rem; max-width: 100%; }
    .glow-left, .glow-bottom { display: none; }
  }
`;
