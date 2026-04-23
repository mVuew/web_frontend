"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Button from "../../ui/button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────
   Shared Card Style
───────────────────────────── */
const cardClass =
  "relative p-12 md:p-16 overflow-hidden cursor-default " +
  "bg-surface border border-border text-foreground " +
  "shadow-[0_8px_32px_rgba(2,6,23,0.14)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] " +
  "hover:shadow-[0_12px_40px_rgba(196,30,58,0.14)] " +
  "transition-all duration-300";

/* ─────────────────────────────
   Mission
───────────────────────────── */
function MissionSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className={cardClass}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-700/10 blur-3xl rounded-full" />

          <p className="text-muted-foreground mb-6 text-sm tracking-[0.18em] uppercase">
            Mission
          </p>

          <blockquote className="text-foreground font-serif text-2xl leading-tight md:text-4xl">
            "To turn information into understanding — so people can make better
            decisions."
          </blockquote>

          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-red-700/80 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   Vision
───────────────────────────── */
function VisionSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className={cardClass}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-700/5 blur-3xl rounded-full" />

          <p className="text-muted-foreground mb-6 text-sm tracking-[0.18em] uppercase">
            Vision
          </p>

          <blockquote className="text-foreground font-serif text-2xl leading-tight md:text-4xl">
            "A high-quality news intelligence platform that empowers individuals
            to grow — professionally and personally."
          </blockquote>

          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-red-700/40 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   Platform
───────────────────────────── */
function PlatformSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={cardClass}
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-700/5 blur-3xl rounded-full" />

          <blockquote className="text-foreground font-serif text-xl leading-tight md:text-3xl">
            mVuew is a <span className="text-red-500">news understanding</span>{" "}
            platform —<span className="italic"> depth-first</span> alongside
            <span className="italic"> speed-first.</span>
          </blockquote>

          <div className="mt-10 h-0.5 w-40 bg-linear-to-r from-red-700/50 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   Problem
───────────────────────────── */
const STATS = [
  { value: "72%", label: "encounter misinformation monthly" },
  { value: "61%", label: "question authenticity of content" },
  { value: "64%", label: "see algorithm-driven polarization" },
];

function BrokenInfoSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-serif text-4xl md:text-6xl mb-12">
          Online information is <span className="text-red-500">broken.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border p-14 text-center transition hover:-translate-y-1"
            >
              <div className="text-4xl text-red-500 font-serif mb-2">
                {s.value}
              </div>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   Carousel
───────────────────────────── */
const SLIDES = [
  { label: "Problem", Component: BrokenInfoSlide },
  { label: "Mission", Component: MissionSlide },
  { label: "Vision", Component: VisionSlide },
  { label: "Platform", Component: PlatformSlide },
];

export function WhyCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const next = () => {
    setDir(1);
    setActive((p) => (p + 1) % SLIDES.length);
  };

  const prev = () => {
    setDir(-1);
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  };

  const { Component } = SLIDES[active];

  return (
    <section className="overflow-hidden">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ x: dir > 0 ? "40%" : "-40%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? "-20%" : "20%", opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Component />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <Button
          variant="outline"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
          onClick={prev}
        >
          <FaChevronLeft />
        </Button>

        <Button
          variant="outline"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
          onClick={next}
        >
          <FaChevronRight />
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-4  mb-2">
        {SLIDES.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}>
            {i === active ? (
              <span className="px-4 py-1 rounded-full border border-red-700/40 bg-red-700/10 text-red-400 text-sm">
                {s.label}
              </span>
            ) : (
              <span className="bg-white/20 block h-2 w-6 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
