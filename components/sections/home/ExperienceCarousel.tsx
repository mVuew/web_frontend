"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FeedSection,
  PerspectivesSection,
  TimelineSection,
  ExpertSection,
} from "./Experience";
import { renderWithAnimatedVuew } from "@/components/ui/AnimatedVuew";
import Button from "@/components/ui/button";

const SLIDES = [
  { label: "my-Vuew", Component: FeedSection },
  { label: "multi-Vuew", Component: PerspectivesSection },
  { label: "meta-Vuew", Component: TimelineSection },
  { label: "Expert Vuew", Component: ExpertSection },
] as const;

const AUTO_MS = 14000;

export function ExperienceCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback(
    (to: number, d?: number) => {
      const n = ((to % SLIDES.length) + SLIDES.length) % SLIDES.length;
      setDir(d ?? (n >= active ? 1 : -1));
      setActive(n);
      setProgress(0);
    },
    [active],
  );

  const next = useCallback(() => navigate(active + 1, 1), [active, navigate]);
  const prev = useCallback(() => navigate(active - 1, -1), [active, navigate]);

  /* ── Auto-advance with progress bar ── */
  useEffect(() => {
    clearInterval(progressRef.current!);
    clearTimeout(timerRef.current!);

    const step = 100 / (AUTO_MS / 50);
    progressRef.current = setInterval(
      () => setProgress((p) => Math.min(p + step, 100)),
      50,
    );
    timerRef.current = setTimeout(next, AUTO_MS);

    return () => {
      clearInterval(progressRef.current!);
      clearTimeout(timerRef.current!);
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const { Component } = SLIDES[active];

  return (
    <section id="feed" className="overflow-hidden pt-16 md:pt-24">
      {/* ── Sticky tab bar: no border, no background track ── */}
      <div
        className="sticky top-18 z-40"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "transparent",
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div
            role="tablist"
            aria-label="Experience sections"
            className="flex overflow-x-auto py-2 gap-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                onClick={() => navigate(i)}
                className={`relative shrink-0 px-4 md:px-5 py-2.5  font-bold  md:text-lg whitespace-nowrap transition-colors duration-200 ${
                  i === active ? "text-foreground" : "cursor-pointer"
                }`}
                style={
                  i === active ? undefined : { color: "var(--color-tab-muted)" }
                }
              >
                <span className="relative z-10">
                  {renderWithAnimatedVuew(slide.label)}
                </span>
              </button>
            ))}
          </div>

          {/* Progress strip — red fill only, no gray track */}
          <div className="h-px relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, var(--color-accent-strong), var(--color-accent-soft))",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Slide area ── */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ x: dir > 0 ? "55%" : "-55%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.52, ease: "easeOut" },
            }}
            exit={{
              x: dir > 0 ? "-28%" : "28%",
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info;
              const swipe =
                Math.abs(offset.x) > 60 || Math.abs(velocity.x) > 300;
              const isHoriz = Math.abs(offset.x) > Math.abs(offset.y);
              if (!swipe || !isHoriz) return;
              offset.x < 0 ? next() : prev();
            }}
            style={{
              cursor: "grab",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            whileDrag={{ cursor: "grabbing" }}
          >
            <Component />
          </motion.div>
        </AnimatePresence>

        {/* Desktop prev/next arrows */}
        <Button
          variant="outline"
          onClick={prev}
          className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    w-12 h-12
                    !rounded-full
                  "
        >
          <ChevronLeft />
        </Button>

        <Button
          variant="outline"
          onClick={next}
          className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    w-12 h-12
                    !rounded-full
                  "
        >
          <ChevronRight />
        </Button>
      </div>

      {/* ── Bottom pill indicators (no text) ── */}
      <div className="flex justify-center items-center gap-2 pt-0 pb-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300 hover:opacity-70"
            style={{
              width: i === active ? 36 : 10,
              height: 6,
              background:
                i === active
                  ? "var(--color-foreground)"
                  : "var(--color-accent-muted)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
