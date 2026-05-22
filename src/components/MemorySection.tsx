"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const frameFloatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.35,
    },
  },
};

const itemRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const petalVariants = (
  duration: number,
  delay: number,
  startX: number,
  endX: number,
  startY: number,
  endY: number
): Variants => ({
  animate: {
    x: [startX, endX, startX],
    y: [startY, endY, startY],
    rotate: [0, 180, 360],
    opacity: [0.08, 0.45, 0.08],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

export default function MemorySection() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-visible flex flex-col items-center justify-center">
      {/* Backing Ambient Lights */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(244,63,94,0.05)_0%,transparent_70%)] rounded-full -translate-y-12" />
        <div className="w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] rounded-full translate-y-16 translate-x-8" />
        <div className="w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(250,204,21,0.03)_0%,transparent_70%)] rounded-full" />
      </div>

      {/* Floating Petals/Particles */}
      <motion.div
        variants={petalVariants(15, 0.5, -40, 40, -60, 60)}
        animate="animate"
        className="absolute top-20 left-[20%] w-3 h-4 bg-rose-300/20 rounded-full blur-[1px] pointer-events-none hidden md:block"
        style={{ borderRadius: "50% 0 50% 50%" }}
      />
      <motion.div
        variants={petalVariants(18, 2.5, 30, -30, -50, 70)}
        animate="animate"
        className="absolute bottom-24 right-[22%] w-2 h-3 bg-pink-200/20 rounded-full blur-[1px] pointer-events-none hidden md:block"
        style={{ borderRadius: "50% 0 50% 50%" }}
      />
      <motion.div
        variants={petalVariants(12, 1.2, -25, 25, 40, -40)}
        animate="animate"
        className="absolute top-1/2 left-[25%] w-1.5 h-1.5 bg-yellow-100/30 rounded-full blur-[0.5px] pointer-events-none"
      />
      <motion.div
        variants={petalVariants(16, 3.8, 20, -20, 60, -60)}
        animate="animate"
        className="absolute top-1/3 right-[28%] w-2 h-2 bg-indigo-200/25 rounded-full blur-[0.5px] pointer-events-none"
      />

      <motion.div
        variants={sectionRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 text-center"
      >
        {/* Cinematic Floating Memory Frame */}
        <motion.div
          variants={frameFloatVariants}
          animate="animate"
          className="relative p-3.5 md:p-4.5 rounded-[2.5rem] border border-white/5 bg-white/[0.04] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.05)] overflow-visible z-10 w-[280px] sm:w-[330px] md:w-[380px] aspect-[3/4] group select-none hover:border-white/10 transition-colors duration-700"
        >
          {/* Inner Image Container */}
          <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden border border-white/5 bg-slate-950">
            {/* The Blended Photo */}
            <Image
              src="/images/memory.jpg"
              alt="A cherished memory"
              fill
              sizes="(max-w-768px) 330px, 380px"
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-[0.88] contrast-[0.98] brightness-[0.93]"
            />

            {/* Dark Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a061e]/90 via-transparent to-[#0a061e]/20 pointer-events-none mix-blend-multiply z-10" />

            {/* Soft Warm/Rose Blending Tint */}
            <div className="absolute inset-0 bg-rose-500/5 mix-blend-overlay pointer-events-none z-10" />

            {/* Top Spotlight Reflection */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07)_0%,transparent_60%)] pointer-events-none z-20" />
          </div>

          {/* Subtly Glowing Outer Frame Corners on Hover */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-rose-300/0 group-hover:border-rose-300/10 pointer-events-none transition-all duration-700 -z-10 shadow-[0_0_30px_rgba(251,207,232,0)] group-hover:shadow-[0_0_30px_rgba(251,207,232,0.12)]" />
        </motion.div>

        {/* Minimalist Divider */}
        <motion.div
          variants={itemRevealVariants}
          className="h-14 w-[1px] bg-gradient-to-b from-rose-200/20 to-transparent my-8"
        />

        {/* Caption Typography */}
        <motion.h3
          variants={itemRevealVariants}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-rose-100/90 tracking-wide font-light max-w-sm sm:max-w-md leading-relaxed select-none drop-shadow-[0_2px_10px_rgba(255,211,224,0.15)]"
        >
          “Some moments deserve a beautiful frame ✨”
        </motion.h3>


      </motion.div>
    </section>
  );
}
