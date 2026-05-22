"use client";

import { motion } from "framer-motion";

export default function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Lavender Glow Orb - Top Left */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blush Pink Glow Orb - Bottom Right */}
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.1)_0%,transparent_70%)]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Peach Glow Orb - Center Left */}
      <motion.div
        className="absolute top-[30%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.05)_0%,transparent_70%)]"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gold Glow Orb - Top Right */}
      <motion.div
        className="absolute top-[5%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(254,240,138,0.05)_0%,transparent_70%)]"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
