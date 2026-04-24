"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Button from "../../ui/button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/*─────────────────────────────
 Theme-driven shared card
─────────────────────────────*/
const cardClass = `
  relative
  p-12 md:p-16
  overflow-hidden
  cursor-default

  bg-surface
  border border-border
  text-foreground

  shadow-lg
  transition-all duration-300
  hover:-translate-y-1
  hover:shadow-2xl
`;

const AccentGlow = () => (
  <div
    className="
      absolute -top-20 -right-20
      w-72 h-72 rounded-full blur-3xl
      opacity-20
      bg-[var(--color-accent)]
    "
  />
);

/*─────────────────────────────
 Mission
─────────────────────────────*/
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
          <AccentGlow />

          <p className="text-muted-foreground mb-6 text-sm tracking-[0.18em] uppercase">
            Mission
          </p>

          <blockquote className="text-2xl md:text-4xl leading-tight text-foreground">
            “Turn information into understanding — so people can think
            independently, not passively consume narratives.”
          </blockquote>

          <div className="absolute bottom-0 left-0 h-px w-full bg-border" />
        </motion.div>
      </div>
    </div>
  );
}

/*─────────────────────────────
 Vision
─────────────────────────────*/
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
          <AccentGlow />

          <p className="text-muted-foreground mb-6 text-sm tracking-[0.18em] uppercase">
            Vision
          </p>

          <blockquote className="text-2xl md:text-4xl leading-tight text-foreground">
            “A platform where multiple perspectives sharpen judgment rather than
            reinforce bias.”
          </blockquote>

          <div className="absolute bottom-0 left-0 h-px w-full bg-border" />
        </motion.div>
      </div>
    </div>
  );
}

/*─────────────────────────────
 Platform
─────────────────────────────*/
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
          <AccentGlow />

          <blockquote className="text-xl md:text-3xl leading-tight text-foreground">
            mVuew is a{" "}
            <span
              style={{
                color: "var(--color-accent-strong)",
              }}
            >
              multi-perspective intelligence
            </span>{" "}
            platform —<span className="italic">compare viewpoints,</span> test
            assumptions, decide what holds true.
          </blockquote>

          <div className="mt-10 h-px w-40 bg-border" />
        </motion.div>
      </div>
    </div>
  );
}

/*─────────────────────────────
 Problem
─────────────────────────────*/
const STATS = [
  {
    value: "72%",
    label: "encounter misinformation monthly",
  },
  {
    value: "61%",
    label: "question content authenticity",
  },
  {
    value: "64%",
    label: "see algorithmic polarization",
  },
];

function BrokenInfoSlide() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl md:text-6xl mb-12 text-foreground">
          Online information is {" "}
          <span
            style={{
              color: "var(--color-accent-strong)",
            }}
          >
            broken.
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="
                bg-surface
                border border-border
                p-14
                text-center
                transition
                hover:-translate-y-1
              "
            >
              <div
                className="text-4xl mb-2"
                style={{
                  color: "var(--color-accent-strong)",
                }}
              >
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

/*─────────────────────────────
 Carousel
─────────────────────────────*/
const SLIDES = [
  {
    label: "Problem",
    Component: BrokenInfoSlide,
  },
  {
    label: "Mission",
    Component: MissionSlide,
  },
  {
    label: "Vision",
    Component: VisionSlide,
  },
  {
    label: "Platform",
    Component: PlatformSlide,
  },
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
            initial={{
              x: dir > 0 ? "40%" : "-40%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: dir > 0 ? "-20%" : "20%",
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <Component />
          </motion.div>
        </AnimatePresence>

        {/* arrows */}
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
          <FaChevronLeft />
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
          <FaChevronRight />
        </Button>
      </div>

      {/* indicators */}
      <div className="flex justify-center gap-4 mb-2">
        {SLIDES.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}>
            {i === active ? (
              <span
                className="
                  px-4 py-1
                  rounded-full
                  border border-border
                  bg-surface
                  text-sm
                  text-foreground
                "
              >
                {s.label}
              </span>
            ) : (
              <span className="bg-border block h-2 w-6 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
