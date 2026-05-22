"use client";

import { motion } from "framer-motion";
import AmbientGlow from "./AmbientGlow";
import Starfield from "./Starfield";
import SparkleCursor from "./SparkleCursor";

interface AtmosphereIntroProps {
  children: React.ReactNode;
}

export default function AtmosphereIntro({ children }: AtmosphereIntroProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#070313] via-[#0b061e] to-[#04010a]">
      {/* Background Ambient Glows */}
      <AmbientGlow />

      {/* Twinkling Starfield */}
      <Starfield />

      {/* Interactive Sparkle Trail */}
      <SparkleCursor />

      {/* Decorative Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none z-2 opacity-60" 
      />

      {/* Cinematic Vignette Shadow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,1,10,0.85)_100%)] pointer-events-none z-3" 
      />

      {/* Entry Page Animation Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative w-full min-h-screen flex flex-col z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
