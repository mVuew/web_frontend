"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────────────
   Slide 1 — Mission
───────────────────────────────────────────── */
function MissionSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          whileHover={{ scale: 1.005, y: -2 }}
          className="relative p-12 md:p-16 cursor-default overflow-hidden"
          style={{
            background: 'linear-gradient(158deg, #1a1a1a 0%, #0d0d0d 100%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18), 0 24px 64px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)',
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.09) 0%, transparent 65%)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(196,30,58,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
              </svg>
              <p className="text-sm font-sans font-medium tracking-[0.18em] uppercase text-white/60">Mission</p>
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white/95 leading-[1.25] max-w-2xl">
              "To turn information into understanding — so people can make better decisions."
            </blockquote>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: EASE }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            style={{ background: 'linear-gradient(90deg, rgba(196,30,58,0.85), transparent 60%)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Slide 2 — Vision
───────────────────────────────────────────── */
function VisionSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          whileHover={{ scale: 1.005, y: -2 }}
          className="glass-skeu glass-skeu-hover relative p-12 md:p-16 cursor-default overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.06) 0%, transparent 65%)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50" aria-hidden="true">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
              </svg>
              <p className="text-sm font-sans font-medium tracking-[0.18em] uppercase text-foreground/60">Vision</p>
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.25] max-w-2xl">
              "A high-quality news intelligence platform that empowers individuals to grow — professionally and personally."
            </blockquote>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: EASE }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            style={{ background: 'linear-gradient(90deg, rgba(196,30,58,0.35), transparent 60%)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Slide 3 — Platform statement
───────────────────────────────────────────── */
function PlatformSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="glass-skeu p-10 md:p-14 relative overflow-hidden"
        >
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.05) 0%, transparent 65%)' }}
          />
          <blockquote className="font-serif leading-[1.25] tracking-tight relative z-10">
            <span className="block text-xl md:text-2xl lg:text-3xl text-foreground font-medium">
              mVuew is a{' '}
              <span className="text-red-700 dark:text-red-500">news understanding</span>
              {' '}platform —{' '}
              <span className="italic font-normal">depth-first</span>{' '}alongside{' '}
              <span className="italic font-normal">speed-first.</span>
            </span>
          </blockquote>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
            className="mt-10 h-px origin-left max-w-xs relative z-10"
            style={{ background: 'linear-gradient(90deg, rgba(196,30,58,0.45), transparent)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Slide 4 — Online information is broken.
───────────────────────────────────────────── */
const STATS = [
  { value: '72%', label: 'of internet users encounter misinformation every month' },
  { value: '61%', label: 'now question the authenticity of online content' },
  { value: '64%', label: 'say algorithmic news drives emotional polarization' },
];

function BrokenInfoSlide() {
  const WORDS = ['Online', 'information', 'is', 'broken.'];
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.h2
          className="font-serif font-medium leading-[1.1] text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12"
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: EASE }}
              style={{ display: 'inline-block' }}
              className={word === 'broken.' ? 'text-red-700 dark:text-red-500' : 'text-foreground'}
            >
              {i > 0 ? '\u00A0' : ''}{word}
            </motion.span>
          ))}
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: EASE }}
              className="glass-skeu p-8 text-center cursor-default"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.6, ease: 'backOut' }}
                className="font-serif text-4xl md:text-5xl font-medium text-red-700 dark:text-red-500 mb-3"
              >
                {s.value}
              </motion.div>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WhyCarousel
───────────────────────────────────────────── */
const SLIDES = [
  { label: 'The Problem', Component: BrokenInfoSlide },
  { label: 'Mission',     Component: MissionSlide    },
  { label: 'Vision',      Component: VisionSlide     },
  { label: 'Platform',    Component: PlatformSlide   },
] as const;

const AUTO_MS = 14000;

export function WhyCarousel() {
  const [active, setActive]     = useState(0);
  const [dir, setDir]           = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef    = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback((to: number, d?: number) => {
    const n = ((to % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setDir(d ?? (n >= active ? 1 : -1));
    setActive(n);
    setProgress(0);
  }, [active]);

  const next = useCallback(() => navigate(active + 1,  1), [active, navigate]);
  const prev = useCallback(() => navigate(active - 1, -1), [active, navigate]);

  useEffect(() => {
    clearInterval(progressRef.current!);
    clearTimeout(timerRef.current!);
    const step = 100 / (AUTO_MS / 50);
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 50);
    timerRef.current    = setTimeout(next, AUTO_MS);
    return () => {
      clearInterval(progressRef.current!);
      clearTimeout(timerRef.current!);
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const { Component } = SLIDES[active];

  return (
    <section id="why" className="overflow-hidden">

      {/* Slide area */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ x: dir > 0 ? '45%' : '-45%', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.48, ease: 'easeOut' } }}
            exit={{ x: dir > 0 ? '-25%' : '25%', opacity: 0, transition: { duration: 0.28, ease: 'easeIn' } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info;
              const swipe   = Math.abs(offset.x) > 60 || Math.abs(velocity.x) > 300;
              const isHoriz = Math.abs(offset.x) > Math.abs(offset.y);
              if (!swipe || !isHoriz) return;
              offset.x < 0 ? next() : prev();
            }}
            style={{ cursor: 'grab', WebkitUserSelect: 'none', userSelect: 'none', willChange: 'transform, opacity' }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <Component />
          </motion.div>
        </AnimatePresence>

        {/* Desktop arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full border border-border/40 bg-background/60 backdrop-blur-sm text-muted-foreground/60 hover:text-foreground hover:border-border hover:bg-background/80 transition-all duration-200 shadow-sm"
        >
          <FaChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full border border-border/40 bg-background/60 backdrop-blur-sm text-muted-foreground/60 hover:text-foreground hover:border-border hover:bg-background/80 transition-all duration-200 shadow-sm"
        >
          <FaChevronRight size={22} />
        </button>
      </div>

      {/* Bottom: progress bar + labeled pill indicators */}
      <div className="container mx-auto px-6 max-w-5xl pb-8">
        <div
          className="h-px relative overflow-hidden rounded-full mb-5 mx-2"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(196,30,58,0.65), rgba(196,30,58,0.2))',
            }}
          />
        </div>

        {/* Labeled pill indicators */}
        <div className="flex justify-center items-center gap-3">
          {SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={slide.label}
              className="flex items-center gap-2 rounded-full transition-all duration-300 hover:opacity-80"
              style={{
                padding: i === active ? '7px 18px' : '0',
                height: i === active ? 'auto' : 8,
                background: i === active
                  ? 'hsl(var(--foreground) / 0.12)'
                  : 'hsl(var(--foreground) / 0.18)',
                border: i === active ? '1px solid hsl(var(--foreground) / 0.28)' : 'none',
                width: i === active ? 'auto' : 32,
              }}
            >
              {i === active && (
                <span className="text-sm font-sans tracking-[0.14em] uppercase text-foreground/80 whitespace-nowrap leading-none">
                  {slide.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
