"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Butterfly from "@/components/Butterfly";

interface WordParticleSystemProps {
  name?: string;
}

type AnimationState = "idle" | "floating" | "converging" | "revealed";
type RipplePhase = "none" | "exploded" | "merging";

interface FloatingElement {
  id: number;
  text: string;
  font: "serif" | "sans";
  color: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  floatX: number[];
  floatY: number[];
  floatRotate: number[];
  floatDuration: number;
  floatDelay: number;
  convergeDelay: number;
  sizeClass: string;
}

const QUALITY_WORDS = [
  { text: "kind", font: "serif" as const, color: "text-rose-200/90" },
  { text: "graceful", font: "serif" as const, color: "text-purple-200/90" },
  { text: "bright", font: "sans" as const, color: "text-yellow-100/90" },
  { text: "lovely", font: "serif" as const, color: "text-rose-100/90" },
  { text: "joyful", font: "sans" as const, color: "text-amber-100/90" },
  { text: "smile", font: "serif" as const, color: "text-yellow-200/90" },
  { text: "dream", font: "serif" as const, color: "text-blue-100/90" },
  { text: "sparkle", font: "sans" as const, color: "text-yellow-200/90" },
  { text: "bloom", font: "serif" as const, color: "text-rose-200/90" },
  { text: "calm", font: "sans" as const, color: "text-teal-100/90" },
  { text: "magical", font: "serif" as const, color: "text-indigo-200/90" },
  { text: "caring", font: "sans" as const, color: "text-rose-100/90" },
  { text: "creative", font: "sans" as const, color: "text-purple-100/90" },
  { text: "beautiful", font: "serif" as const, color: "text-rose-200/95" },
  { text: "gentle", font: "serif" as const, color: "text-teal-200/90" },
  { text: "warm", font: "sans" as const, color: "text-orange-100/90" },
  { text: "sincere", font: "serif" as const, color: "text-purple-200/90" },
  { text: "elegant", font: "serif" as const, color: "text-yellow-100/90" },
  { text: "sweet", font: "sans" as const, color: "text-pink-100/90" },
  { text: "radiant", font: "sans" as const, color: "text-amber-200/90" },
  { text: "thoughtful", font: "serif" as const, color: "text-blue-200/90" },
  { text: "pure", font: "sans" as const, color: "text-white/95" },
  { text: "bright-eyed", font: "serif" as const, color: "text-yellow-100/90" },
  { text: "wonder", font: "serif" as const, color: "text-rose-300/90" },
];

const GLYPHS = [
  { text: "✦", font: "sans" as const, color: "text-yellow-300/80" },
  { text: "✧", font: "sans" as const, color: "text-purple-300/80" },
  { text: "✿", font: "sans" as const, color: "text-rose-300/70" },
  { text: "♡", font: "sans" as const, color: "text-pink-300/70" },
  { text: "•", font: "sans" as const, color: "text-white/60" },
  { text: "❋", font: "sans" as const, color: "text-yellow-200/70" },
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function WordParticleSystem({ name = "HITHU" }: WordParticleSystemProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [ripplePhase, setRipplePhase] = useState<RipplePhase>("none");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const convergeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rippleMergeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rippleResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const targetW = isMobile ? 160 : 255;
    const targetH = isMobile ? 215 : 325;
    
    const items = [...QUALITY_WORDS, ...GLYPHS];
    const N = items.length;

    const generated = items.map((item, idx) => {
      // 1. Target positions forming a nice ellipse framing the portrait for the ripple blast
      const angle = (idx * (360 / N)) * (Math.PI / 180);
      const targetX = Math.cos(angle) * targetW;
      const targetY = Math.sin(angle) * targetH;

      // 2. Start positions scattered far in the outer ring
      const startAngle = Math.random() * Math.PI * 2;
      const startR = randomBetween(isMobile ? 160 : 320, isMobile ? 280 : 560);
      const startX = Math.cos(startAngle) * startR;
      const startY = Math.sin(startAngle) * startR;

      // Organic micro-float cycles
      const floatDuration = randomBetween(6, 10);
      const floatDelay = randomBetween(0, 2);
      const floatX = [0, randomBetween(-8, 8), 0];
      const floatY = [0, randomBetween(-10, 10), 0];
      const floatRotate = [0, randomBetween(-3, 3), 0];

      // Staggered sequential delay based on item index
      const convergeDelay = idx * 0.18;

      const sizeClass = item.text.length === 1
        ? (isMobile ? "text-sm" : "text-base")
        : item.text.length > 7
        ? (isMobile ? "text-[10px]" : "text-xs md:text-sm")
        : (isMobile ? "text-xs" : "text-sm md:text-base");

      return {
        ...item,
        id: idx,
        startX,
        startY,
        targetX,
        targetY,
        floatX,
        floatY,
        floatRotate,
        floatDuration,
        floatDelay,
        convergeDelay,
        sizeClass,
      };
    });

    setElements(generated);

    return () => {
      if (convergeTimerRef.current) clearTimeout(convergeTimerRef.current);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      if (rippleMergeTimerRef.current) clearTimeout(rippleMergeTimerRef.current);
      if (rippleResetTimerRef.current) clearTimeout(rippleResetTimerRef.current);
    };
  }, []);

  const handlePortraitClick = () => {
    if (animationState !== "revealed" || ripplePhase !== "none") return;

    if (rippleMergeTimerRef.current) clearTimeout(rippleMergeTimerRef.current);
    if (rippleResetTimerRef.current) clearTimeout(rippleResetTimerRef.current);

    setRipplePhase("exploded");
    
    // Hold explosion for 1.4s, then merge back in
    rippleMergeTimerRef.current = setTimeout(() => {
      setRipplePhase("merging");
    }, 1400);

    // Completely finish the merge cycle after 2.8s
    rippleResetTimerRef.current = setTimeout(() => {
      setRipplePhase("none");
    }, 2800);
  };

  return (
    <motion.section
      ref={containerRef}
      onViewportEnter={() => {
        if (animationState === "idle") {
          setAnimationState("floating");
          
          convergeTimerRef.current = setTimeout(() => {
            setAnimationState("converging");
          }, 4000); // 4.0 seconds of pure floating

          revealTimerRef.current = setTimeout(() => {
            setAnimationState("revealed");
          }, 16500); // 4.0s floating + 12.5s converging/fade-in sequence
        }
      }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative w-full h-[85vh] md:h-screen flex flex-col items-center justify-center overflow-hidden py-24 select-none"
    >
      {/* Cinematic Radial Backdrop Lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{
            scale: animationState === "revealed" ? 1.3 : 1,
            opacity: animationState === "revealed" ? 0.35 : 0.15,
          }}
          transition={{ duration: 6.0, ease: "easeOut" }}
          className="absolute w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(244,63,94,0.18)_0%,transparent_70%)] -translate-x-[15%] -translate-y-[8%]"
        />
        <motion.div
          animate={{
            scale: animationState === "revealed" ? 1.35 : 1,
            opacity: animationState === "revealed" ? 0.40 : 0.20,
          }}
          transition={{ duration: 7.0, ease: "easeOut" }}
          className="absolute w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,transparent_70%)] translate-x-[20%] translate-y-[10%]"
        />
      </div>



      {/* Centered Portrait Centerpiece */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Soft backlighting glow pulses */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 -m-16">
          <div
            className={`w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.15)_0%,transparent_75%)] transition-all duration-[2500ms] ease-out ${
              animationState === "revealed" ? (ripplePhase !== "none" ? "scale-[1.35] opacity-100" : "scale-125 opacity-100") : "scale-75 opacity-20"
            }`}
          />
          <div
            className={`absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_75%)] transition-all duration-[2500ms] ease-out translate-y-8 ${
              animationState === "revealed" ? (ripplePhase !== "none" ? "scale-[1.4] opacity-95" : "scale-130 opacity-90") : "scale-80 opacity-10"
            }`}
          />
        </div>

        {/* Central energy orb pulsing during convergence */}
        <AnimatePresence>
          {animationState === "converging" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: [0.3, 0.85, 0.3],
                scale: [0.8, 1.25, 0.8],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                opacity: { duration: 2.0, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 2.0, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.22)_0%,rgba(99,102,241,0.11)_45%,transparent_70%)] pointer-events-none z-20"
            />
          )}
        </AnimatePresence>

        {/* Glassmorphic Frame holding the portrait */}
        <motion.div
          onClick={handlePortraitClick}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(40px)" }}
          animate={
            animationState === "idle" || animationState === "floating"
              ? { opacity: 0, scale: 0.9, filter: "blur(40px)", pointerEvents: "none" as const }
              : {
                  opacity: 1,
                  scale: 1.0,
                  filter: "blur(0px)",
                  pointerEvents: "auto" as const,
                  transition: {
                    duration: 3.5,
                    delay: 9.0, // Delay portrait display until 1.2s after all words have merged at the center (approx 7.8s merge complete + 1.2s hold)
                    ease: [0.16, 1, 0.3, 1],
                  }
                }
          }
          className="relative p-3.5 sm:p-4 rounded-[2.2rem] border border-white/5 bg-white/[0.03] shadow-[0_20px_50px_-10px_rgba(10,5,30,0.5)] overflow-hidden w-[240px] sm:w-[300px] md:w-[360px] aspect-[3/4] group select-none cursor-pointer"
        >
          {/* Inner Image Wrapper */}
          <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden border border-white/5 bg-slate-950">
            <Image
              src="/images/portrait.jpg"
              alt="Hithu Portrait"
              fill
              sizes="(max-w-768px) 300px, 360px"
              priority
              className="object-cover filter saturate-[0.92] contrast-[0.98] brightness-[0.94] transition-transform duration-[4000ms] ease-out group-hover:scale-[1.03]"
            />
            {/* Vignette Overlay for atmospheric blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08041a]/95 via-[#08041a]/15 to-[#08041a]/40 pointer-events-none z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-rose-500/5 mix-blend-overlay pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_50%)] pointer-events-none z-20" />
          </div>

          {/* Subtly Glowing Outer Frame Corners on Hover */}
          <div className="absolute inset-0 rounded-[2.2rem] border border-rose-300/0 group-hover:border-rose-300/10 pointer-events-none transition-all duration-700 -z-10 shadow-[0_0_30px_rgba(251,207,232,0)] group-hover:shadow-[0_0_30px_rgba(251,207,232,0.1)]" />
        </motion.div>

        {/* Butterflies flying around centerpiece frame once revealed */}
        {animationState === "revealed" && (
          <>
            <Butterfly
              className="absolute -top-6 -left-12 scale-75 z-20 pointer-events-none"
              delay={0.2}
              floatDuration={11}
              flapDuration={0.8}
            />
            <Butterfly
              className="absolute -bottom-8 -right-10 scale-90 z-20 pointer-events-none"
              delay={1.5}
              floatDuration={13}
              flapDuration={0.72}
            />
          </>
        )}
      </div>

      {/* Floating Traits/Words orbiting/scattered around portrait */}
      {elements.map((el) => {
        return (
          <motion.div
            key={el.id}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transformOrigin: "center center",
              pointerEvents: "none",
            }}
            initial={{
              x: el.startX,
              y: el.startY,
              opacity: 0,
              scale: 0.8,
            }}
            animate={
              animationState === "idle"
                ? { x: el.startX, y: el.startY, opacity: 0, scale: 0.8 }
                : animationState === "floating"
                ? { x: el.startX, y: el.startY, opacity: 0.85, scale: 1.0 }
                : animationState === "converging"
                ? {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.1,
                    transition: {
                      x: { duration: 2.6, ease: [0.25, 1, 0.45, 1], delay: el.convergeDelay },
                      y: { duration: 2.6, ease: [0.25, 1, 0.45, 1], delay: el.convergeDelay },
                      opacity: { duration: 2.6, ease: "easeIn", delay: el.convergeDelay },
                      scale: { duration: 2.6, ease: "easeIn", delay: el.convergeDelay },
                    },
                  }
                : {
                    // revealed
                    ...(ripplePhase === "exploded"
                      ? {
                          x: el.targetX,
                          y: el.targetY,
                          opacity: 0.9,
                          scale: 1.0,
                          transition: {
                            type: "spring",
                            stiffness: 110,
                            damping: 12,
                            delay: el.id * 0.015,
                          },
                        }
                      : ripplePhase === "merging"
                      ? {
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0.1,
                          transition: {
                            duration: 1.4,
                            ease: [0.25, 1, 0.5, 1],
                            delay: (elements.length - el.id) * 0.015, // inward stagger wave
                          },
                        }
                      : {
                          // none
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0.1,
                          transition: {
                            duration: 0.2,
                          },
                        })
                  }
            }
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            {/* Inner micro-floating loop */}
            <motion.div
              animate={{
                x: el.floatX,
                y: el.floatY,
                rotate: el.floatRotate,
              }}
              transition={{
                duration: el.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: el.floatDelay,
              }}
              className={`${
                el.font === "serif" ? "font-serif italic" : "font-sans font-light"
              } ${el.color} ${el.sizeClass} whitespace-nowrap drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)]`}
            >
              {el.text}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Description Typography at the Bottom */}
      <div className="absolute bottom-12 left-0 right-0 z-20 text-center px-6 pointer-events-none flex flex-col items-center justify-center">
        <div className="h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {animationState !== "revealed" ? (
              <motion.p
                key="pre-attract"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="font-sans text-xs md:text-sm text-rose-100/70 font-light leading-relaxed max-w-sm tracking-wide select-none"
              >
                Watch closely as her beautiful qualities gather together... ✨
              </motion.p>
            ) : (
              <motion.p
                key="post-attract"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.65, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="font-sans text-xs md:text-sm text-rose-100/70 font-light leading-relaxed max-w-sm tracking-wide select-none"
              >
                A beautiful canvas of traits, dreams, and wishes woven together. {ripplePhase !== "none" ? "✨" : "Tap portrait to release her qualities."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
