"use client";

import AtmosphereIntro from "@/components/AtmosphereIntro";
import ElegantConfetti from "@/components/ElegantConfetti";
import Butterfly from "@/components/Butterfly";
import LittleWishes from "@/components/LittleWishes";
import MemorySection from "@/components/MemorySection";
import SurpriseSection from "@/components/SurpriseSection";
import WordParticleSystem from "@/components/WordParticleSystem";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type IntroStep = "typing" | "transitioning" | "hero";

const typingContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const heroContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const lineVariants: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "120px",
    opacity: 0.3,
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      delay: 0.8,
    },
  },
};

const floatStarVariants = (delay: number): Variants => ({
  animate: {
    y: [0, -12, 0],
    x: [0, 6, 0],
    opacity: [0.3, 0.8, 0.3],
    scale: [1, 1.15, 1],
    transition: {
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  },
});

export default function Home() {
  const [currentStep, setCurrentStep] = useState<IntroStep>("typing");
  const [birthdayName, setBirthdayName] = useState("HITHU");

  useEffect(() => {
    // Extract and capitalize query name on mount safely
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) {
      setBirthdayName(nameParam.toUpperCase());
    }

    // Sequence timing
    // 1. Let the text type out. Length is ~50 chars * 50ms = 2500ms + 500ms delay = 3000ms.
    // We add 2000ms pause to read. Total: 5000ms before transition.
    const typingTimer = setTimeout(() => {
      setCurrentStep("transitioning");
    }, 5000);

    // 2. Transition lasts 1500ms (exit transition of typing).
    // Set to hero reveal at 6500ms.
    const heroTimer = setTimeout(() => {
      setCurrentStep("hero");
    }, 6500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  const introText = "Some birthdays deserve more than just a message ✨";

  return (
    <AtmosphereIntro>
      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-20 z-10 text-center relative w-full">
        <AnimatePresence mode="wait">
          {currentStep !== "hero" ? (
            <motion.div
              key="intro-typing"
              variants={typingContainerVariants}
              initial="hidden"
              animate={currentStep === "typing" ? "visible" : "exit"}
              exit="exit"
              className="max-w-2xl mx-auto flex items-center justify-center min-h-[30vh]"
            >
              <h2 className="font-serif italic text-xl sm:text-2xl md:text-4xl text-rose-100 tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(255,211,224,0.25)]">
                {Array.from(introText).map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </h2>
            </motion.div>
          ) : (
            <div key="hero-reveal-wrapper" className="w-full flex flex-col items-center gap-20 md:gap-28">
              <motion.div
                key="hero-reveal"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-2xl px-6 py-12 md:px-12 md:py-16 rounded-3xl border border-white/5 shadow-[0_12px_40px_0_rgba(10,5,30,0.4)] overflow-visible z-10 glass-panel"
              >
                {/* Backing Ambient Lights specifically for the card */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -m-20">
                  <div className="w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(244,63,94,0.1)_0%,transparent_70%)] rounded-full translate-x-[-120px] translate-y-[-80px]" />
                  <div className="w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] rounded-full translate-x-[120px] translate-y-[80px]" />
                  <div className="w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(250,204,21,0.05)_0%,transparent_70%)] rounded-full translate-y-[100px]" />
                </div>

                {/* Confetti Burst */}
                <ElegantConfetti />

                {/* Butterflies floating around the Card edges */}
                <Butterfly className="-top-12 -left-12" delay={0.5} floatDuration={14} flapDuration={0.7} />
                <Butterfly className="-bottom-8 -right-8" delay={2.5} floatDuration={11} flapDuration={0.85} />
                <Butterfly className="top-[-40px] right-[-30px] scale-75 opacity-70" delay={4.0} floatDuration={15} flapDuration={0.9} />

                {/* Floating Decorative Vector Star - Top Right inside card */}
                <motion.svg
                  variants={floatStarVariants(0.8)}
                  animate="animate"
                  className="absolute top-[25px] right-[25px] w-5 h-5 text-yellow-200/40 fill-current pointer-events-none"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>

                {/* Floating Decorative Vector Star - Bottom Left inside card */}
                <motion.svg
                  variants={floatStarVariants(2.0)}
                  animate="animate"
                  className="absolute bottom-[35px] left-[35px] w-4 h-4 text-rose-300/35 fill-current pointer-events-none"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>

                {/* Glass Card Inner Content */}
                <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">


                  {/* Main Heading & Subtitle */}
                  <motion.div variants={heroItemVariants} className="space-y-4">
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-tight shimmer-text select-none">
                      Happy Birthday, {birthdayName} ✨
                    </h1>
                    <p className="font-sans text-sm sm:text-base md:text-lg text-rose-100/80 max-w-lg mx-auto leading-relaxed tracking-wide font-light">
                      May your day be as lovely, bright, and beautiful as you are 🌸
                    </p>
                  </motion.div>

                  {/* Divider Line */}
                  <motion.div
                    variants={heroItemVariants}
                    className="flex items-center gap-4 py-2"
                  >
                    <motion.div variants={lineVariants} className="h-[1px] bg-gradient-to-r from-transparent to-rose-200" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="w-2.5 h-2.5 rounded-full border border-yellow-300/60 rotate-45 flex items-center justify-center"
                    >
                      <div className="w-1 h-1 bg-yellow-300/80 rounded-full" />
                    </motion.div>
                    <motion.div variants={lineVariants} className="h-[1px] bg-gradient-to-l from-transparent to-rose-200" />
                  </motion.div>



                  <motion.div variants={heroItemVariants} className="mt-2">
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(254, 240, 138, 0.35)" }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-panel-light text-rose-100 px-8 py-4 rounded-full text-xs md:text-sm font-sans tracking-[0.2em] uppercase font-semibold border border-rose-200/20 hover:border-yellow-200/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center gap-3 cursor-pointer group"
                    >
                      <span>Explore The Magic</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 group-hover:scale-150 transition-transform duration-300" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Little Wishes Section */}
              <LittleWishes />

              {/* Memory / Photo Section */}
              <MemorySection />

              {/* Birthday Surprise Section */}
              <SurpriseSection />

              {/* Word Particle System Section */}
              <WordParticleSystem name={birthdayName} />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Info Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row gap-4 justify-between items-center z-20 text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-rose-200/40 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          LONDON, UNITED KINGDOM
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 1.7 }}
        >
          OCTOBER MXXVI
        </motion.div>
      </footer>
    </AtmosphereIntro>
  );
}


