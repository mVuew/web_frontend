"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  duration?: number; // time per word (ms)
};

const WORDS = ["meta", "my", "multi"];

export default function MVuewText({
  className = "",
  duration = 2000,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      
      {/* Animated Prefix */}
      <span
        key={index}
        className="inline-block text-3xl animate-fadeIn font-medium font-serif"
      >
        {WORDS[index]}
      </span>

      {/* Static Part */}
      <span className="inline-block text-3xl font-medium font-serif">-Vuew</span>
    </span>
  );
}