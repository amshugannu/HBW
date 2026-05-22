"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  driftX: number;
  driftY: number;
  isSparkle: boolean;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const colors = [
      "rgba(255, 211, 224, ", // Blush pink
      "rgba(198, 179, 236, ", // Lavender
      "rgba(255, 229, 217, ", // Peach
      "rgba(255, 255, 255, ", // Creamy white
      "rgba(253, 224, 71, ",  // Pale gold
    ];

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      // Fewer stars on high-DPR screens (retina already looks denser)
      const density = Math.min(dpr, 1.5);
      const numStars = Math.floor((w * h) / (10000 * density));
      stars = [];

      for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 1.5 + 0.5; // 0.5px to 2.0px
        const isSparkle = Math.random() > 0.96; // 4% chance to be a glowing sparkle cross
        
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: isSparkle ? size * 1.4 : size,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseOpacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          phase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.04, // slight sideways drift
          driftY: (Math.random() * 0.08) + 0.02, // slow upward drift
          isSparkle,
        });
      }
    };

    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);

    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30 fps — stars move slowly, 30fps is imperceptible

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (timestamp - lastTime < FRAME_INTERVAL) return;
      lastTime = timestamp;

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      stars.forEach((star) => {
        star.y -= star.driftY;
        star.x += star.driftX;

        if (star.y < -10) { star.y = h + 10; star.x = Math.random() * w; }
        if (star.x < -10) star.x = w + 10;
        if (star.x > w + 10) star.x = -10;

        // Calculate dynamic opacity using a sine wave
        star.phase += star.twinkleSpeed;
        const opacity = star.baseOpacity * (0.3 + 0.7 * Math.sin(star.phase));

        // Draw star
        ctx.fillStyle = `${star.color}${opacity})`;
        
        if (star.isSparkle) {
          // Draw standard circular core
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw vertical and horizontal glowing flare lines
          ctx.strokeStyle = `${star.color}${opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          
          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(star.x - star.size * 3, star.y);
          ctx.lineTo(star.x + star.size * 3, star.y);
          // Vertical line
          ctx.moveTo(star.x, star.y - star.size * 3);
          ctx.lineTo(star.x, star.y + star.size * 3);
          ctx.stroke();
        } else {
          // Draw standard star
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-1" />;
}
