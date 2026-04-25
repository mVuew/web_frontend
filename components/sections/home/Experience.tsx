"use client";
import { motion } from "framer-motion";
import { PhoneMockup3D } from "./../../ui/PhoneMockup3D";
import { GlobalFeedIllustration } from "../../ui/GlobalFeedIllustration";
import { AnimatedVuew } from "@/components/ui/AnimatedVuew";
import CTA from "@/components/atoms/CTA";

/* ─────────────────────────────────────────────────────────── */
/* 1. my-Vuew. — Global curated feed                         */
/* ─────────────────────────────────────────────────────────── */
export function FeedSection() {
  return (
    <section
      id="feed"
      className="overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border-l-2 border-foreground/30 pl-4 text-xl italic text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            >
              Understand any story in seconds — without reading long articles
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              <AnimatedVuew delay={0.8} />
              mVuew gives you a clear, simple summary that highlights only what
              matters. No noise, no confusion just the key information you need.
            </motion.p>

            <CTA />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="mx-auto w-full max-w-70 aspect-square sm:max-w-md md:max-w-105"
          >
            <GlobalFeedIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 2. multi-Vuew. — Multi-perspective                        */
/* ─────────────────────────────────────────────────────────── */
export function PerspectivesSection() {
  return (
    <section className="overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="relative order-2 flex min-h-96 w-full items-center justify-center sm:min-h-120 md:order-1 md:min-h-145">
            {[
              {
                label: "Geopolitical",
                quote: "Resource shifts destabilize traditional alliances.",
                pos: "top-2 left-0 sm:top-8",
                anim: { x: -24, y: -16 },
                delay: 0.5,
              },
              {
                label: "Economic",
                quote: "Capital constraints restrict immediate adaptation.",
                pos: "top-1/2 -translate-y-1/2 right-0",
                anim: { x: 24 },
                delay: 0.7,
              },
              {
                label: "Human Impact",
                quote: "Labor displacement accelerates at the margins.",
                pos: "bottom-2 left-1 sm:bottom-12 sm:left-6",
                anim: { x: -20, y: 16 },
                delay: 0.9,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, ...card.anim }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: card.delay,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute ${card.pos} z-20 glass-skeu w-28 p-2.5 sm:w-36 sm:p-3 md:w-43.75 md:p-4`}
              >
                <div className="mb-1.5 text-[8px] uppercase tracking-widest text-muted-foreground sm:mb-2 sm:text-[9px]">
                  {card.label}
                </div>
                <p className="text-[11px] leading-relaxed text-foreground sm:text-xs">
                  {card.quote}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="z-10 w-48 sm:w-60 md:w-65"
            >
              <PhoneMockup3D
                src="/images/app-perspective-detail.jpeg"
                alt="mVuew Perspective Detail"
              />
            </motion.div>
          </div>

          <div className="order-1 space-y-6 md:order-2 md:space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border-l-2 border-foreground/30 pl-4 text-xl italic text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            >
              See all sides in one place — not just one opinion
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              <AnimatedVuew delay={0.8} />
              mVuew shows multiple perspectives side-by-side, so you don’t have
              to jump between sources or guess what’s missing.
            </motion.p>

            <CTA />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 3. meta-Vuew. — Timeline                                  */
/* ─────────────────────────────────────────────────────────── */
export function TimelineSection() {
  const markers = [
    { year: "2019", label: "Initial Framework" },
    { year: "2021", label: "Policy Shift" },
    { year: "2023", label: "Market Reaction" },
    { year: "Today", label: "Structural Impact", isLive: true },
  ];

  return (
    <section className="overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border-l-2 border-foreground/30 pl-4 text-xl italic text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            >
              Understand the full story — not just what’s happening now.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              <AnimatedVuew delay={0.8} />
              mVuew gives you a simple timeline that shows how the story
              started, evolved, and where it stands today.
            </motion.p>

            <CTA />
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="z-10 w-48 shrink-0 sm:w-56 md:w-60 lg:w-65"
            >
              <PhoneMockup3D
                src="/images/app-story-detail.jpeg"
                alt="mVuew Story Detail"
              />
            </motion.div>

            <div className="hidden lg:flex flex-col relative py-10 min-h-90">
              <svg
                className="absolute left-0.75 top-0 bottom-0 w-0.5 h-full"
                preserveAspectRatio="none"
              >
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <div className="flex flex-col justify-between h-full py-10 space-y-10">
                {markers.map((marker, i) => (
                  <div key={i} className="relative pl-6 flex items-center">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: 10, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-border"
                    />
                    {marker.isLive && (
                      <motion.div
                        animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeOut",
                        }}
                        className="absolute -left-0.75 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600"
                      />
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.4 + 0.5, duration: 0.5 }}
                    >
                      <span
                        className={`text-[9px] uppercase tracking-widest block ${marker.isLive ? "text-red-600 font-semibold" : "text-muted-foreground/40"}`}
                      >
                        {marker.year}
                      </span>
                      <span className=" text-sm text-foreground whitespace-nowrap">
                        {marker.label}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 4. Expert-Led Analysis                                     */
/* ─────────────────────────────────────────────────────────── */

function OrbitIllustration() {
  const nodes = [
    { label: "Economist", angle: -90 },
    { label: "Scientist", angle: 30 },
    { label: "Policy Expert", angle: 150 },
  ];
  const R = 110;

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full text-foreground"
        style={{ overflow: "visible" }}
      >
        {/* Orbit ring */}
        <circle
          cx="150"
          cy="150"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.12"
          strokeDasharray="4 6"
        />
        {/* Rotating group */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 150px" }}
        >
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 150 + R * Math.cos(rad);
            const y = 150 + R * Math.sin(rad);
            return (
              <g key={i}>
                <line
                  x1="150"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeOpacity="0.12"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="22"
                  fill="currentColor"
                  fillOpacity="0.04"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
                {/* Counter-rotate label */}
                <motion.text
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  x={x}
                  y={y + 3}
                  fontSize="7"
                  fontFamily="var(--font-site), sans-serif"
                  fill="currentColor"
                  fillOpacity="0.55"
                  textAnchor="middle"
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}
        </motion.g>
        {/* Center pulse — use scale on a group, not r animation */}
        <motion.g
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "150px 150px" }}
        >
          <circle
            cx="150"
            cy="150"
            r="18"
            fill="currentColor"
            fillOpacity="0.06"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
        </motion.g>
        <circle cx="150" cy="150" r="8" fill="currentColor" fillOpacity="0.8" />
        <text
          x="150"
          y="172"
          fontSize="7"
          fontFamily="var(--font-site), sans-serif"
          fill="currentColor"
          fillOpacity="0.4"
          textAnchor="middle"
        >
          Analysis
        </text>
      </svg>
    </div>
  );
}

export function ExpertSection() {
  return (
    <section className="overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border-l-2 border-foreground/30 pl-4 text-xl italic text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            >
              Know what it really means — not just what happened
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              <AnimatedVuew delay={0.8} />
              mVuew adds expert insights in simple language, so you can
              understand the impact and think with confidence.
            </motion.p>

            <CTA />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <OrbitIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OneViewFusionAnimation() {
  const cards = [
    {
      label: "Summary",
      className: "top-5 left-3",
      initial: { x: -36, y: -16, opacity: 0 },
    },
    {
      label: "Perspectives",
      className: "top-12 right-2",
      initial: { x: 36, y: -8, opacity: 0 },
    },
    {
      label: "Timeline",
      className: "bottom-16 left-0",
      initial: { x: -34, y: 12, opacity: 0 },
    },
    {
      label: "Insights",
      className: "bottom-8 right-4",
      initial: { x: 34, y: 16, opacity: 0 },
    },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-65 sm:max-w-85 md:max-w-105">
      <div className="absolute inset-0 rounded-full bg-foreground/5 blur-2xl sm:blur-3xl" />

      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={card.initial}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.15 + i * 0.12,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute ${card.className} z-20 glass-skeu px-3 py-1.5 sm:px-4 sm:py-2`}
        >
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
            {card.label}
          </p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-border bg-background/80 sm:h-44 sm:w-44 md:h-48 md:w-48">
          <motion.div
            animate={{ scale: [1, 1.14, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-foreground/20"
          />
          <p className="text-sm tracking-wide text-foreground sm:text-lg md:text-xl">
            One View
          </p>
        </div>
      </motion.div>

      <motion.svg
        viewBox="0 0 420 420"
        className="absolute inset-0 w-full h-full text-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.7 }}
      >
        {[
          "M70 74 L210 210",
          "M340 95 L210 210",
          "M58 312 L210 210",
          "M342 320 L210 210",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function CalmExperienceAnimation() {
  const noisyRows = [34, 62, 90, 118, 146, 174, 202, 230];
  const calmRows = [
    { y: 56, width: 112, label: "Summary" },
    { y: 102, width: 136, label: "Perspectives" },
    { y: 148, width: 124, label: "Timeline" },
    { y: 194, width: 144, label: "Insights" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-80 overflow-hidden glass-skeu p-4 sm:max-w-105 sm:p-6 md:max-w-120 md:p-8">
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-transparent via-foreground/5 to-transparent" />

      <svg
        viewBox="0 0 460 280"
        className="h-auto w-full"
        style={{ overflow: "visible" }}
      >
        <text
          x="84"
          y="20"
          fontSize="8"
          letterSpacing="1.6"
          fill="currentColor"
          fillOpacity="0.45"
          textAnchor="middle"
        >
          NOISE
        </text>

        <text
          x="364"
          y="20"
          fontSize="8"
          letterSpacing="1.6"
          fill="currentColor"
          fillOpacity="0.65"
          textAnchor="middle"
        >
          CALM CLARITY
        </text>

        {noisyRows.map((y, i) => (
          <motion.rect
            key={y}
            x="18"
            y={y}
            rx="2"
            width={88 + (i % 3) * 20}
            height="8"
            fill="currentColor"
            fillOpacity="0.18"
            animate={{ x: [18, 24, 18], opacity: [0.35, 0.75, 0.35] }}
            transition={{
              repeat: Infinity,
              duration: 2.2 + i * 0.13,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.line
          x1="226"
          y1="34"
          x2="226"
          y2="252"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {calmRows.map((row, i) => (
          <g key={row.label}>
            <rect
              x="250"
              y={row.y - 14}
              width="188"
              height="30"
              rx="4"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <motion.rect
              x="258"
              y={row.y - 3}
              width={row.width}
              height="6"
              rx="3"
              fill="currentColor"
              fillOpacity="0.7"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              style={{ transformOrigin: `258px ${row.y}px` }}
            />
            <text
              x="258"
              y={row.y - 7}
              fontSize="7.5"
              fill="currentColor"
              fillOpacity="0.65"
            >
              {row.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function OneView() {
  return (
    <section id="feed" className="overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="order-2 space-y-6 sm:space-y-8 md:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border-l-2 border-foreground/30 pl-4 text-xl italic text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            >
              Everything in one place — no more switching tabs
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              <AnimatedVuew delay={0.8} />
              mVuew combines summary, perspectives, timeline, and insights into
              one clean view, so you don’t have to piece things together
            </motion.p>

            <CTA />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <OneViewFusionAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export function CalmExperience() {
  return (
    <section id="feed" className="overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="order-2 space-y-6 sm:space-y-8 md:order-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border-l-2 border-foreground/30 pl-4 text-xl italic text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            >
              Stay informed without feeling overwhelmed.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              <AnimatedVuew delay={0.8} />
              mVuew removes noise and clutter, giving you a calm, focused way to
              understand the news.
            </motion.p>

            <CTA />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <CalmExperienceAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
