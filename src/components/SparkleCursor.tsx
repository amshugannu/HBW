"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
}

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    // Disable cursor sparkles on touch devices to preserve performance and prevent touch bugs
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sparkles: Sparkle[] = [];
    let isLoopRunning = false;
    const colors = [
      "rgba(255, 211, 224, ", // Blush pink
      "rgba(198, 179, 236, ", // Lavender
      "rgba(255, 229, 217, ", // Peach
      "rgba(253, 224, 71, ",  // Gold
      "rgba(255, 255, 255, ", // White
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
    };

    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const dx = clientX - lastMousePos.current.x;
      const dy = clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 6) {
        createSparkles(clientX, clientY, 2);
        lastMousePos.current = { x: clientX, y: clientY };
        // Restart loop if idle
        if (!isLoopRunning) {
          isLoopRunning = true;
          animate();
        }
      }
    };

    const createSparkles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        sparkles.push({
          x,
          y,
          // Expand outward from cursor position
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.2, // slight float upwards
          size: Math.random() * 5 + 3, // 3px to 8px
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015, // lasts about 50-70 frames
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    // Draw a 4-pointed magical star using quadratic curves
    // Draw a 4-pointed magical star using quadratic curves
    const drawSparkleStar = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      colorString: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);

      // Draw larger glow star with low opacity to simulate shadowBlur/glow
      context.fillStyle = `${colorString}${alpha * 0.18})`;
      const glowSize = size * 2.2;
      context.beginPath();
      context.moveTo(0, -glowSize);
      context.quadraticCurveTo(0, 0, glowSize, 0);
      context.quadraticCurveTo(0, 0, 0, glowSize);
      context.quadraticCurveTo(0, 0, -glowSize, 0);
      context.quadraticCurveTo(0, 0, 0, -glowSize);
      context.closePath();
      context.fill();

      // Draw crisp core star
      context.fillStyle = `${colorString}${alpha})`;
      context.beginPath();
      context.moveTo(0, -size);
      // Curve to right tip
      context.quadraticCurveTo(0, 0, size, 0);
      // Curve to bottom tip
      context.quadraticCurveTo(0, 0, 0, size);
      // Curve to left tip
      context.quadraticCurveTo(0, 0, -size, 0);
      // Curve back to top tip
      context.quadraticCurveTo(0, 0, 0, -size);
      context.closePath();
      context.fill();
      context.restore();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    // Loop starts on first mouse move — no idle rAF waste

    const animate = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      sparkles = sparkles.filter((sparkle) => {
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;
        sparkle.alpha -= sparkle.decay;
        sparkle.rotation += sparkle.rotationSpeed;

        if (sparkle.alpha <= 0) return false;

        drawSparkleStar(ctx, sparkle.x, sparkle.y, sparkle.size * sparkle.alpha, sparkle.rotation, sparkle.color, sparkle.alpha);
        return true;
      });

      if (sparkles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // No sparkles — pause loop until next mouse move
        isLoopRunning = false;
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
