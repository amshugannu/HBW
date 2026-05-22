"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;        // start x (vw)
  size: number;     // px
  color: string;
  duration: number; // animation duration s
  delay: number;    // animation delay s
  rotate: number;   // end rotation deg
  drift: number;    // horizontal drift vw
  type: "petal" | "gold";
  opacity: number;
}

interface BurstParticle {
  id: number;
  type: "petal" | "gold";
  color: string;
  size: number;
  targetX: number;   // end X offset px
  targetY: number;   // end Y offset px
  gravityY: number;  // gravity drop offset px
  rotate: number;    // rotation deg
  duration: number;  // s
  delay: number;     // s
}

const PETAL_COLORS = ["#ffd3e0", "#ffb6c1", "#fbcfe8", "#e9d5ff", "#c6b3ec"];
const GOLD_COLORS  = ["#ffd700", "#fde047", "#fbbf24"];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => {
    const type: "petal" | "gold" = Math.random() > 0.35 ? "petal" : "gold";
    const colors = type === "gold" ? GOLD_COLORS : PETAL_COLORS;
    return {
      id: i,
      x: randomBetween(5, 95),
      size: randomBetween(6, 13),
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: randomBetween(2.5, 5.0),
      delay: randomBetween(0, 1.0),
      rotate: randomBetween(180, 720) * (Math.random() > 0.5 ? 1 : -1),
      drift: randomBetween(-8, 8),
      type,
      opacity: randomBetween(0.7, 1.0),
    };
  });
}

export default function ElegantConfetti() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate center-outward burst immediately
    const burstTimer = setTimeout(() => {
      const burstCount = 36;
      const generatedBurst: BurstParticle[] = Array.from({ length: burstCount }, (_, i) => {
        const type: "petal" | "gold" = Math.random() > 0.4 ? "petal" : "gold";
        const colors = type === "gold" ? GOLD_COLORS : PETAL_COLORS;
        
        // Spread particles around 360 degrees with slight randomness
        const angle = (i * (360 / burstCount) + randomBetween(-8, 8)) * (Math.PI / 180);
        const dist = randomBetween(50, 240); // distance of explosion in pixels
        
        return {
          id: i,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: randomBetween(6, 12),
          targetX: Math.cos(angle) * dist,
          targetY: Math.sin(angle) * dist,
          gravityY: randomBetween(60, 140),
          rotate: randomBetween(180, 540) * (Math.random() > 0.5 ? 1 : -1),
          duration: randomBetween(0.8, 1.5),
          delay: randomBetween(0, 0.2),
        };
      });
      setBurstParticles(generatedBurst);
    }, 200);

    // Generate falling petals
    const fallTimer = setTimeout(() => {
      setPetals(generatePetals(40));
    }, 200);

    // Clean up burst particles after they complete their animations
    const cleanupTimer = setTimeout(() => {
      setBurstParticles([]);
    }, 2800);

    return () => {
      clearTimeout(burstTimer);
      clearTimeout(fallTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      {/* Falling Petals */}
      {petals.map((p) => (
        <div
          key={`fall-${p.id}`}
          style={{
            position: "absolute",
            left: `${p.x}vw`,
            top: "-20px",
            width: p.type === "petal" ? `${p.size}px` : `${p.size * 0.8}px`,
            height: p.type === "petal" ? `${p.size * 1.4}px` : `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: p.type === "petal" ? "50% 0 50% 50%" : "2px",
            opacity: p.opacity,
            animation: `confetti-fall-${p.id % 4} ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `translateX(0) rotate(0deg)`,
            "--drift": `${p.drift}vw`,
            "--rotate": `${p.rotate}deg`,
          } as React.CSSProperties}
        />
      ))}

      {/* Confetti Burst */}
      {burstParticles.map((bp) => (
        <div
          key={`burst-${bp.id}`}
          style={{
            position: "absolute",
            left: "50vw",
            top: "45vh",
            width: bp.type === "petal" ? `${bp.size}px` : `${bp.size * 0.8}px`,
            height: bp.type === "petal" ? `${bp.size * 1.4}px` : `${bp.size * 0.6}px`,
            backgroundColor: bp.color,
            borderRadius: bp.type === "petal" ? "50% 0 50% 50%" : "2px",
            animation: `confetti-burst-${bp.id % 2} ${bp.duration}s ${bp.delay}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
            transformOrigin: "center center",
            "--target-x": `${bp.targetX}px`,
            "--target-y": `${bp.targetY}px`,
            "--gravity-y": `${bp.gravityY}px`,
            "--rotate": `${bp.rotate}deg`,
          } as React.CSSProperties}
        />
      ))}

      <style>{`
        @keyframes confetti-fall-0 {
          0%   { transform: translateX(0)          translateY(0)   rotate(0deg);   opacity: 1; }
          100% { transform: translateX(var(--drift)) translateY(105vh) rotate(var(--rotate)); opacity: 0; }
        }
        @keyframes confetti-fall-1 {
          0%   { transform: translateX(0)          translateY(0)   rotate(0deg);   opacity: 1; }
          70%  { opacity: 0.8; }
          100% { transform: translateX(var(--drift)) translateY(100vh) rotate(var(--rotate)); opacity: 0; }
        }
        @keyframes confetti-fall-2 {
          0%   { transform: translateX(0)          translateY(0)   rotate(0deg);   opacity: 0.9; }
          50%  { transform: translateX(calc(var(--drift) * 0.5)) translateY(50vh) rotate(calc(var(--rotate) * 0.5)); }
          100% { transform: translateX(var(--drift)) translateY(108vh) rotate(var(--rotate)); opacity: 0; }
        }
        @keyframes confetti-fall-3 {
          0%   { transform: translateX(0)          translateY(0)   rotate(0deg);   opacity: 1; }
          60%  { transform: translateX(calc(var(--drift) * 0.7)) translateY(55vh) rotate(calc(var(--rotate) * 0.6)); opacity: 0.7; }
          100% { transform: translateX(var(--drift)) translateY(102vh) rotate(var(--rotate)); opacity: 0; }
        }

        @keyframes confetti-burst-0 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(calc(var(--target-x) * 0.35), calc(var(--target-y) * 0.35)) scale(1.3) rotate(calc(var(--rotate) * 0.25));
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--target-x), calc(var(--target-y) + var(--gravity-y))) scale(0.3) rotate(var(--rotate));
            opacity: 0;
          }
        }
        @keyframes confetti-burst-1 {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(calc(var(--target-x) * 0.4), calc(var(--target-y) * 0.4)) scale(1.4) rotate(calc(var(--rotate) * 0.2));
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--target-x), calc(var(--target-y) + var(--gravity-y))) scale(0.2) rotate(var(--rotate));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
