"use client";

import { motion } from "framer-motion";

interface ButterflyProps {
  className?: string;
  delay?: number;
  floatDuration?: number;
  flapDuration?: number;
}

export default function Butterfly({
  className = "",
  delay = 0,
  floatDuration = 12,
  flapDuration = 0.8,
}: ButterflyProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-10 ${className}`}
      // Slow weightless drift
      animate={{
        x: [0, 18, -12, 10, 0],
        y: [0, -28, 22, -15, 0],
        rotate: [0, 12, -10, 6, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* Rapid Wing Flap */}
      <motion.svg
        viewBox="0 0 24 24"
        className="w-7 h-7 text-rose-200/50 fill-rose-200/5 stroke-current stroke-[1.2] drop-shadow-[0_0_10px_rgba(251,207,232,0.35)]"
        animate={{
          scaleX: [1, 0.15, 1],
        }}
        transition={{
          duration: flapDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center" }}
      >
        {/* Minimalist butterfly outline */}
        <path d="M12 9.5c-0.8-2-3-2.5-4-1.2S7.2 11.5 9.5 12.2c-2.4 0.8-2.8 3.5-1.6 4.8s2.8-0.8 4.4-2.8c1.6 2 3.2 4.1 4.4 2.8s0.8-4-1.6-4.8c2.4-0.8 3.5-4 2.5-5.2s-3.2-0.8-4 1.2z" />
        <path d="M12 7v10" className="stroke-[0.8] opacity-60" />
      </motion.svg>
    </motion.div>
  );
}
