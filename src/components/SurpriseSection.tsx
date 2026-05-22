"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Sparkle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

const cardFloatVariants: Variants = {
  animate: {
    y: [0, -7, 5, -4, 0],
    rotate: [0, 1, -0.8, 0.6, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const generateSparkles = (): Sparkle[] => {
  return Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 18 + (Math.random() - 0.5) * 15,
    distance: Math.random() * 80 + 75, // Radius of burst
    size: Math.random() * 4 + 3, // Sparkle sizes
    delay: Math.random() * 0.1,
  }));
};

export default function SurpriseSection() {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleOpenSurprise = () => {
    if (isClicked) return;
    setIsClicked(true);
    setSparkles(generateSparkles());

    // Transition timing: let the explosion expand first, then transition layouts
    setTimeout(() => {
      setIsOpened(true);
    }, 450);
  };

  return (
    <section className="relative w-full py-20 md:py-28 overflow-visible flex flex-col items-center justify-center">
      {/* Dynamic Backing Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          animate={{
            scale: isOpened ? 1.25 : 1,
            opacity: isOpened ? 0.35 : 0.15,
          }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          className="w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(244,63,94,0.1)_0%,transparent_70%)] rounded-full"
        />
        <motion.div 
          animate={{
            scale: isOpened ? 1.3 : 1,
            opacity: isOpened ? 0.3 : 0.15,
          }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="w-[320px] h-[320px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] rounded-full translate-y-6"
        />
      </div>

      <motion.div
        variants={sectionRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 w-full flex flex-col items-center px-6 max-w-lg text-center"
      >
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="surprise-button-area"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative py-12 px-6 flex items-center justify-center min-h-[220px] w-full"
            >
              {/* Radial Pulse Shockwave */}
              {isClicked && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 2.8, opacity: [0, 0.8, 0] }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="absolute w-28 h-28 rounded-full border border-yellow-300/30 bg-yellow-300/5 blur-[4px] pointer-events-none z-0"
                />
              )}

              {/* Sparkle Burst Particles */}
              {isClicked &&
                sparkles.map((sp) => (
                  <motion.svg
                    key={sp.id}
                    className="absolute w-3.5 h-3.5 text-yellow-200 fill-current pointer-events-none z-20"
                    viewBox="0 0 24 24"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: Math.cos((sp.angle * Math.PI) / 180) * sp.distance,
                      y: Math.sin((sp.angle * Math.PI) / 180) * sp.distance,
                      scale: [0, 1.25, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.9,
                      ease: "easeOut",
                      delay: sp.delay,
                    }}
                  >
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                  </motion.svg>
                ))}

              {/* Interactive Button */}
              <motion.button
                onClick={handleOpenSurprise}
                whileHover={isClicked ? {} : { scale: 1.04, boxShadow: "0 0 25px rgba(251, 207, 232, 0.3)" }}
                whileTap={isClicked ? {} : { scale: 0.98 }}
                className={`relative px-8 py-5 rounded-full border border-rose-200/20 bg-white/[0.04] text-rose-100 font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-semibold hover:border-rose-300/30 hover:bg-white/[0.06] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.2)] cursor-pointer select-none overflow-hidden z-10 ${
                  isClicked ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {/* Button Text */}
                <span className="relative z-10 flex items-center gap-3">
                  <span>Open Your Birthday Surprise</span>
                  <span className="text-sm">🎁</span>
                </span>

                {/* Soft Shimmer Overlay */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_5s_infinite] pointer-events-none z-0" />
              </motion.button>
            </motion.div>
          ) : (
            /* Revealed Message Card */
            <motion.div
              key="surprise-message-card"
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="z-10"
            >
              <motion.div
                variants={cardFloatVariants}
                animate="animate"
                className="relative p-10 md:p-12 rounded-3xl border border-white/8 bg-white/[0.04] shadow-[0_20px_50px_rgba(10,5,30,0.4)] flex flex-col items-center text-center overflow-hidden w-[290px] sm:w-[350px] md:w-[420px] select-none"
              >
                {/* Internal Soft Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-20 bg-gradient-to-tr from-rose-500/10 to-yellow-500/10 pointer-events-none z-0" />

                {/* Message Header */}
                <span className="font-sans text-[10px] sm:text-xs text-rose-300/75 tracking-[0.25em] uppercase font-light mb-6 select-none relative z-10">
                  Today’s rule is simple —
                </span>

                {/* Message Body */}
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-rose-100/90 leading-relaxed font-light">
                    smile more,
                  </span>
                  <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-rose-100/90 leading-relaxed font-light">
                    worry less,
                  </span>
                  <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-yellow-200/95 leading-relaxed font-normal mt-2 drop-shadow-[0_0_15px_rgba(254,240,138,0.25)]">
                    and eat extra cake 🎂✨
                  </span>
                </div>

                {/* Minimalist Divider */}
                <div className="flex items-center gap-3 justify-center mt-8 opacity-20 relative z-10">
                  <div className="h-[1px] w-6 bg-rose-200/40" />
                  <span className="text-[8px] text-rose-200">✦</span>
                  <div className="h-[1px] w-6 bg-rose-200/40" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
