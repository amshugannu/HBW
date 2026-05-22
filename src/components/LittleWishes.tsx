"use client";

import { motion, Variants } from "framer-motion";

interface Wish {
  id: number;
  emoji: string;
  text: string;
  glowColor: string;
  shadowColor: string;
  translateClass: string;
  floatDuration: number;
  delay: number;
  rx: number;
  ry: number;
  rr: number;
}

const wishes: Wish[] = [
  {
    id: 1,
    emoji: "🌸",
    text: "More smiles this year",
    glowColor: "rgba(244, 63, 94, 0.2)", // Rose
    shadowColor: "rgba(244, 63, 94, 0.12)",
    translateClass: "lg:translate-y-0",
    floatDuration: 8,
    delay: 0.2,
    rx: 6,
    ry: -10,
    rr: 2,
  },
  {
    id: 2,
    emoji: "✨",
    text: "More beautiful memories",
    glowColor: "rgba(234, 179, 8, 0.18)", // Gold
    shadowColor: "rgba(234, 179, 8, 0.1)",
    translateClass: "lg:translate-y-16",
    floatDuration: 10,
    delay: 0.5,
    rx: -7,
    ry: 12,
    rr: -3,
  },
  {
    id: 3,
    emoji: "🦋",
    text: "More laughter and happiness",
    glowColor: "rgba(99, 102, 241, 0.2)", // Indigo
    shadowColor: "rgba(99, 102, 241, 0.12)",
    translateClass: "lg:translate-y-6",
    floatDuration: 7,
    delay: 0.1,
    rx: 5,
    ry: -8,
    rr: 1.5,
  },
  {
    id: 4,
    emoji: "🌙",
    text: "Softer days and brighter moments",
    glowColor: "rgba(59, 130, 246, 0.18)", // Blue
    shadowColor: "rgba(59, 130, 246, 0.1)",
    translateClass: "lg:translate-y-8",
    floatDuration: 11,
    delay: 0.8,
    rx: -8,
    ry: 14,
    rr: -4,
  },
  {
    id: 5,
    emoji: "🎀",
    text: "And of course… more cake 😄",
    glowColor: "rgba(236, 72, 153, 0.2)", // Pink
    shadowColor: "rgba(236, 72, 153, 0.12)",
    translateClass: "lg:translate-y-20",
    floatDuration: 9,
    delay: 0.4,
    rx: 6,
    ry: -11,
    rr: 2.5,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatStarVariants = (delay: number): Variants => ({
  animate: {
    y: [0, -16, 0],
    x: [0, 8, 0],
    opacity: [0.2, 0.7, 0.2],
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

export default function LittleWishes() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-visible flex flex-col items-center">
      {/* Decorative Background Glow Orb */}
      <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[70vw] h-[400px] bg-[radial-gradient(circle,rgba(244,63,94,0.05)_0%,transparent_70%)] rounded-full pointer-events-none -z-10" />

      {/* Decorative Vector Stars */}
      <motion.svg
        variants={floatStarVariants(0.5)}
        animate="animate"
        className="absolute top-10 left-[15%] w-4 h-4 text-rose-300/30 fill-current pointer-events-none hidden md:block"
        viewBox="0 0 24 24"
      >
        <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
      </motion.svg>
      <motion.svg
        variants={floatStarVariants(2.3)}
        animate="animate"
        className="absolute top-[30%] right-[12%] w-5 h-5 text-yellow-200/25 fill-current pointer-events-none hidden md:block"
        viewBox="0 0 24 24"
      >
        <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
      </motion.svg>
      <motion.svg
        variants={floatStarVariants(1.1)}
        animate="animate"
        className="absolute bottom-12 left-[10%] w-5 h-5 text-indigo-300/20 fill-current pointer-events-none hidden md:block"
        viewBox="0 0 24 24"
      >
        <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
      </motion.svg>

      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 max-w-xl mx-auto z-10"
      >
        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-rose-100/90 tracking-wide font-normal">
          Little Wishes
        </h2>
        <p className="font-sans text-[10px] sm:text-xs text-rose-200/50 tracking-[0.25em] uppercase font-light mt-3.5">
          soft birthday thoughts drifting through the stars
        </p>

        {/* Delicate divider */}
        <div className="flex items-center gap-3 justify-center mt-6 opacity-30">
          <div className="h-[1px] w-8 bg-rose-200/50" />
          <span className="text-[9px] text-yellow-300">✦</span>
          <div className="h-[1px] w-8 bg-rose-200/50" />
        </div>
      </motion.div>

      {/* Staggered Floating Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl w-full px-6 mt-16 md:mt-24 pb-20 z-10"
      >
        {wishes.map((wish) => (
          <motion.div
            key={wish.id}
            variants={cardRevealVariants}
            className={`w-full ${wish.translateClass}`}
          >
            {/* Soft Drifting Wrapper */}
            <motion.div
              animate={{
                y: [0, wish.ry * 0.6, 0],
              }}
              transition={{
                duration: wish.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: wish.delay,
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.04] shadow-[0_8px_32px_0_rgba(10,5,30,0.25)] flex flex-col items-center text-center overflow-hidden group select-none transition-all duration-500 hover:bg-white/[0.07]"
            >
              {/* Internal Radial Glow */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${wish.glowColor} 0%, transparent 70%)`,
                }}
              />

              {/* Glowing Emoji Badge */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/5 text-2xl mb-6 shadow-[0_4px_15px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:border-white/10 transition-all duration-500"
                style={{
                  boxShadow: `0 0 20px ${wish.shadowColor}`,
                }}
              >
                {wish.emoji}
              </div>

              {/* Wish text */}
              <h3 className="font-serif italic text-lg md:text-xl text-rose-100/85 leading-relaxed font-light group-hover:text-rose-50 tracking-wide transition-colors duration-300">
                {wish.text}
              </h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
