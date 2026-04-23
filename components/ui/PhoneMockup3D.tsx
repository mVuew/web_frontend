"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// simple cn (no external file needed)
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface PhoneMockup3DProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function PhoneMockup3D({
  src,
  alt,
  className,
  delay = 0,
}: PhoneMockup3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 20, stiffness: 150, mass: 1 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-[300px] h-[610px] mx-auto group",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: delay,
        }}
        className="relative w-full h-full"
      >
        {/* Shadow */}
        <motion.div
          className="absolute -inset-4 bg-black/20 blur-2xl rounded-[44px] -z-10 opacity-50 group-hover:opacity-70 transition"
          style={{
            transform: "translateZ(-50px)",
          }}
        />

        {/* Phone */}
        <div className="relative w-full h-full bg-[#111] rounded-[44px] p-2 shadow-2xl border-4 border-black/90 ring-1 ring-white/10 overflow-hidden flex flex-col">
          
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl flex items-center justify-center">
            <div className="w-16 h-1 rounded-full bg-[#222]" />
          </div>

          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[32px] overflow-hidden">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}