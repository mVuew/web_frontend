"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PhoneMockup3D } from './../../ui/PhoneMockup3D';
import { GlobalFeedIllustration } from '../../ui/GlobalFeedIllustration';
import { AnimatedVuew, renderWithAnimatedVuew } from '../../ui/AnimatedVuew';

/* ─────────────────────────────────────────────────────────── */
/* 1. my-Vuew. — Global curated feed                         */
/* ─────────────────────────────────────────────────────────── */
export function FeedSection() {
  return (
    <section id="feed" className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.02]"
            >
              my-<AnimatedVuew delay={0} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif text-2xl md:text-3xl text-foreground italic border-l-2 border-foreground/30 pl-4"
            >
              Your Growth.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground font-serif text-lg md:text-xl max-w-md leading-relaxed"
            >
              <AnimatedVuew delay={0.8} /> the world's foremost primary sources, across countries and disciplines — distilling them into a single, structured feed in order to help you grow professionally and intellectually.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground/70 font-serif text-base max-w-md leading-relaxed"
            >
              Taking into account the advice of the world's best minds regarding how the news feed composition should be to suit your best interests.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-sans"
            >
              Reuters · BBC News · WSJ · NYT · The Hindu · Al Jazeera · Financial Times
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="w-full aspect-square max-w-[420px] mx-auto"
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
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative flex justify-center w-full min-h-[580px] items-center">

            {[
              { label: "Geopolitical", quote: "Resource shifts destabilize traditional alliances.", pos: "top-8 left-0", anim: { x: -24, y: -16 }, delay: 0.5 },
              { label: "Economic", quote: "Capital constraints restrict immediate adaptation.", pos: "top-1/2 -translate-y-1/2 right-0", anim: { x: 24 }, delay: 0.7 },
              { label: "Human Impact", quote: "Labor displacement accelerates at the margins.", pos: "bottom-12 left-6", anim: { x: -20, y: 16 }, delay: 0.9 },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, ...card.anim }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute ${card.pos} z-20 glass-skeu p-4 w-[175px]`}
              >
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">{card.label}</div>
                <p className="text-xs font-serif leading-relaxed text-foreground">{card.quote}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="z-10 w-[240px] sm:w-[260px]"
            >
              <PhoneMockup3D src="/app-perspective-detail.jpeg" alt="mVuew Perspective Detail" />
            </motion.div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] whitespace-nowrap"
            >
              multi-<AnimatedVuew delay={0} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif text-2xl md:text-3xl text-foreground italic border-l-2 border-foreground/30 pl-4"
            >
              Tackles Biasness and polarization.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground font-serif text-lg md:text-xl max-w-md leading-relaxed"
            >
              <AnimatedVuew delay={0.8} /> how the same incident is perceived across different regions of the world in order to understand and remove Biasness of any incident.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-3"
            >
              {[
                { region: "European Union", src: "BBC News · Reuters" },
                { region: "United States",  src: "WSJ · New York Times" },
                { region: "Global South",   src: "The Hindu · Al Jazeera" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0 } }}
                  className="flex items-center gap-4 border-l border-border/50 pl-4 py-2"
                >
                  <div>
                    <div className="font-serif text-foreground text-base">{item.region}</div>
                    <div className="text-[10px] text-muted-foreground/50 font-sans mt-0.5">{item.src}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.02]"
            >
              meta-<AnimatedVuew delay={0} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif text-2xl md:text-3xl text-foreground italic border-l-2 border-foreground/30 pl-4"
            >
              Understand story/intent in depth.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground font-serif text-lg md:text-xl max-w-md leading-relaxed"
            >
              <AnimatedVuew delay={0.8} /> how a story evolved over the course of time in order to take the current form as it is.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground/70 font-serif text-base max-w-md leading-relaxed"
            >
              <AnimatedVuew delay={1.6} /> the intent or meta-layer of the story.
            </motion.p>
          </div>

          <div className="flex justify-center items-center gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="z-10 w-[240px] sm:w-[260px] shrink-0"
            >
              <PhoneMockup3D src="/app-story-detail.jpeg" alt="mVuew Story Detail" />
            </motion.div>

            <div className="hidden lg:flex flex-col relative py-10 min-h-[360px]">
              <svg className="absolute left-[3px] top-0 bottom-0 w-[2px] h-full" preserveAspectRatio="none">
                <motion.line x1="1" y1="0" x2="1" y2="100%" stroke="currentColor" strokeWidth="1" className="text-border"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }} />
              </svg>
              <div className="flex flex-col justify-between h-full py-10 space-y-10">
                {markers.map((marker, i) => (
                  <div key={i} className="relative pl-6 flex items-center">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }} whileInView={{ width: 10, opacity: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-border"
                    />
                    {marker.isLive && (
                      <motion.div
                        animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                        className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600"
                      />
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.4 + 0.5, duration: 0.5 }}
                    >
                      <span className={`text-[9px] uppercase tracking-widest block ${marker.isLive ? 'text-red-600 font-semibold' : 'text-muted-foreground/40'}`}>
                        {marker.year}
                      </span>
                      <span className="font-serif text-sm text-foreground whitespace-nowrap">{marker.label}</span>
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
/* 4. Expert-Led Analysis — Glassmorphism + 3D orbits         */
/* ─────────────────────────────────────────────────────────── */
const experts = [
  { role: "Economist", quote: "Trade deficits signal structural imbalance, not temporary volatility." },
  { role: "Policy Expert", quote: "Regulatory gaps allow capital to flow unchecked across borders." },
  { role: "Scientist", quote: "Climate data confirms feedback loops are accelerating beyond projections." },
];

function OrbitIllustration() {
  const nodes = [
    { label: "Economist",     angle: -90 },
    { label: "Scientist",     angle: 30  },
    { label: "Policy Expert", angle: 150 },
  ];
  const R = 110;

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center">
      <svg viewBox="0 0 300 300" className="w-full h-full text-foreground" style={{ overflow: "visible" }}>
        {/* Orbit ring */}
        <circle cx="150" cy="150" r={R} fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" strokeDasharray="4 6" />
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
                <line x1="150" y1="150" x2={x} y2={y} stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.12" />
                <circle cx={x} cy={y} r="22" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
                {/* Counter-rotate label */}
                <motion.text
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  x={x} y={y + 3}
                  fontSize="7"
                  fontFamily="Inter, sans-serif"
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
          <circle cx="150" cy="150" r="18" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
        </motion.g>
        <circle cx="150" cy="150" r="8" fill="currentColor" fillOpacity="0.8" />
        <text x="150" y="172" fontSize="7" fontFamily="'Playfair Display', serif" fill="currentColor" fillOpacity="0.4" textAnchor="middle">Analysis</text>
      </svg>
    </div>
  );
}

function GlassCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, rotateY: -10 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="glass-skeu glass-skeu-hover p-6 cursor-default relative overflow-hidden"
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(circle, rgba(196,30,58,0.08) 0%, transparent 70%)" }}
      />
      {children}
    </motion.div>
  );
}

export function ExpertSection() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] whitespace-nowrap"
            >
              Expert <AnimatedVuew delay={0} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif text-2xl md:text-3xl text-foreground italic border-l-2 border-foreground/30 pl-4"
            >
              Technocrat's opinion.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground font-serif text-lg leading-relaxed max-w-md"
            >
              <AnimatedVuew delay={0.8} /> the story from the lens of a technocrat.
            </motion.p>

            <div className="flex flex-col gap-4 pt-2">
              {experts.map((e, i) => (
                <GlassCard key={i} delay={i * 0.12}>
                  <div className="flex items-start gap-4">
                    <span className="text-[9px] font-sans text-muted-foreground/30 pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-sans mb-1.5">{e.role}</p>
                      <p className="font-serif text-sm text-foreground leading-relaxed italic">"{e.quote}"</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
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

/* ─────────────────────────────────────────────────────────── */
/* 5. One screen. Full picture. — Glass + 3D card stack       */
/* ─────────────────────────────────────────────────────────── */
const storyLayers = [
  { label: "Summary",         desc: "The essential facts in under 60 seconds.", color: "from-foreground/5 to-foreground/2" },
  { label: "Perspectives",    desc: "Geopolitical, economic, and human viewpoints.", color: "from-foreground/4 to-foreground/1" },
  { label: "Timeline",        desc: "Historical context mapped in sequence.", color: "from-foreground/3 to-foreground/1" },
  { label: "Expert Insights", desc: "Verified analysis from domain specialists.", color: "from-foreground/2 to-transparent" },
];

function StoryLayerRow({ layer, index }: { layer: typeof storyLayers[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { x: 6 } : { x: 0 }}
      style={{
        backdropFilter: hovered ? "blur(16px)" : "none",
        WebkitBackdropFilter: hovered ? "blur(16px)" : "none",
        background: hovered ? "rgba(255,255,255,0.08)" : "transparent",
        transition: "all 0.3s ease",
      }}
      className="flex items-start gap-5 px-4 py-4 border-t border-border/40 cursor-default"
    >
      <span className="text-[9px] font-sans text-muted-foreground/30 pt-1 w-5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p className={`font-serif text-base transition-colors duration-300 ${hovered ? 'text-foreground' : 'text-foreground/80'}`}>{layer.label}</p>
        <p className="text-xs text-muted-foreground font-sans mt-0.5">{layer.desc}</p>
      </div>
    </motion.div>
  );
}

function Card3DStack() {
  return (
    <div className="relative w-full flex justify-center">
      {/* Ambient glow stage behind the stack */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-12 w-64 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(196,30,58,0.12) 0%, transparent 70%)", filter: "blur(24px)" }}
        aria-hidden="true"
      />

      {/* Glass panel container */}
      <div
        className="glass-skeu relative w-full max-w-md"
        style={{ padding: "48px 32px 80px", minHeight: 460, perspective: "900px" }}
      >
        {/* Section hint */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600/70" aria-hidden="true" />
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-sans">Story structure</p>
        </div>

        {/* Stacked cards */}
        {storyLayers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: 25 }}
            whileInView={{
              opacity: 1 - i * 0.15,
              y: i * 34,
              rotateX: -3 - i * 2,
            }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.13, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 56 + i * 34,
              left: 20 + i * 8,
              right: 20 + i * 8,
              zIndex: storyLayers.length - i,
              transformStyle: "preserve-3d",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              background: i === 0
                ? "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))"
                : "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
              border: i === 0
                ? "1px solid rgba(255,255,255,0.35)"
                : "1px solid rgba(255,255,255,0.12)",
              boxShadow: i === 0
                ? "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)"
                : "0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            className="px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: i === 0 ? "rgba(196,30,58,0.7)" : "rgba(128,128,128,0.4)" }}
                  aria-hidden="true"
                />
                <p className={`text-[9px] uppercase tracking-[0.18em] font-sans ${i === 0 ? 'text-foreground/70' : 'text-muted-foreground/60'}`}>
                  {layer.label}
                </p>
              </div>
              <span className="text-[9px] font-sans text-muted-foreground/30">{String(i + 1).padStart(2, "0")}</span>
            </div>
            {i <= 1 && (
              <p className={`font-serif text-xs mt-2 leading-relaxed ${i === 0 ? 'text-foreground/70' : 'text-muted-foreground/50'}`}>
                {layer.desc}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function StructuredStorySection() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-tight"
            >
              One screen.{" "}
              <span className="text-muted-foreground/60 italic font-normal">Full picture.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground font-serif text-lg leading-relaxed max-w-md"
            >
              No tab-switching. No fragmentation. Every story arrives structured — ready to read, understand, and apply.
            </motion.p>

            <div className="space-y-0">
              {storyLayers.map((layer, i) => (
                <StoryLayerRow key={i} layer={layer} index={i} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card3DStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* 6. Less noise. More signal. — Glass hover + chaos → calm   */
/* ─────────────────────────────────────────────────────────── */
const noiseItems = [
  { before: "5 browser tabs",         after: "1 structured story" },
  { before: "Clickbait headlines",    after: "Verified primary sources" },
  { before: "Emotional polarization", after: "Balanced perspectives" },
  { before: "Breaking news anxiety",  after: "Depth-first understanding" },
];

function NoiseRow({ item, index }: { item: typeof noiseItems[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        backdropFilter: hovered ? "blur(18px)" : "none",
        WebkitBackdropFilter: hovered ? "blur(18px)" : "none",
        background: hovered ? "rgba(255,255,255,0.07)" : "transparent",
        transition: "all 0.3s ease",
      }}
      className="grid grid-cols-2 border-t border-border/40 cursor-default"
    >
      <div className="px-4 py-4 flex items-center gap-3">
        <span className="text-sm text-muted-foreground/40 font-sans line-through decoration-muted-foreground/20">{item.before}</span>
      </div>
      <div className="px-4 py-4 flex items-center gap-3 border-l border-border/30">
        <motion.div
          animate={hovered ? { width: 16, opacity: 1 } : { width: 8, opacity: 0.4 }}
          className="h-px bg-foreground shrink-0"
        />
        <span className={`text-sm font-sans transition-colors duration-300 ${hovered ? 'text-foreground' : 'text-foreground/70'}`}>{item.after}</span>
      </div>
    </motion.div>
  );
}

function ChaosToCalm() {
  const chaosRects = [
    { x: 14,  y: 32,  w: 68, h: 9  },
    { x: 8,   y: 50,  w: 44, h: 7  },
    { x: 28,  y: 68,  w: 80, h: 11 },
    { x: 5,   y: 88,  w: 56, h: 8  },
    { x: 40,  y: 106, w: 72, h: 9  },
    { x: 12,  y: 124, w: 50, h: 7  },
    { x: 60,  y: 142, w: 65, h: 10 },
    { x: 18,  y: 160, w: 78, h: 8  },
    { x: 35,  y: 178, w: 48, h: 9  },
    { x: 10,  y: 196, w: 70, h: 8  },
    { x: 48,  y: 214, w: 55, h: 7  },
    { x: 22,  y: 232, w: 64, h: 9  },
  ];

  const calmRows = [
    { label: "Summary",         w: 130, pct: "100%" },
    { label: "Perspectives",    w: 114, pct: "88%"  },
    { label: "Timeline",        w: 100, pct: "76%"  },
    { label: "Expert Insights", w: 120, pct: "92%"  },
  ];

  return (
    <div className="glass-skeu relative w-full mx-auto p-6" style={{ maxWidth: 500 }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-none pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(196,30,58,0.05) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <svg viewBox="0 0 420 295" className="w-full h-auto" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="redBar" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(196,30,58,0.75)" />
            <stop offset="100%" stopColor="rgba(196,30,58,0.3)" />
          </linearGradient>
        </defs>

        {/* ── Left header ── */}
        <text x="90" y="18" fontSize="8" fontFamily="Inter,sans-serif" fill="currentColor" fillOpacity="0.45" textAnchor="middle" letterSpacing="2">BEFORE</text>

        {/* ── Chaos rects ── */}
        {chaosRects.map((r, i) => (
          <motion.rect
            key={i}
            x={r.x} y={r.y} width={r.w} height={r.h} rx="1.5"
            fill="currentColor"
            fillOpacity={0.1 + (i % 3) * 0.05}
            stroke="currentColor" strokeWidth="0.75"
            strokeOpacity={0.22 + (i % 4) * 0.06}
            animate={{
              x: [r.x - 3, r.x + 3, r.x - 3],
              opacity: [0.55, 1, 0.55],
            }}
            transition={{ duration: 2.4 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }}
          />
        ))}

        {/* X marks on chaos side */}
        {[60, 118, 176, 234].map((y, i) => (
          <g key={i} opacity="0.55">
            <line x1="93" y1={y - 5} x2="103" y2={y + 5} stroke="rgba(196,30,58,0.7)" strokeWidth="1.5" />
            <line x1="103" y1={y - 5} x2="93" y2={y + 5} stroke="rgba(196,30,58,0.7)" strokeWidth="1.5" />
          </g>
        ))}

        {/* ── Divider ── */}
        <motion.line
          x1="210" y1="8" x2="210" y2="278"
          stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        {/* ── Right header ── */}
        <text x="318" y="18" fontSize="8" fontFamily="Inter,sans-serif" fill="rgba(196,30,58,0.9)" textAnchor="middle" letterSpacing="1.5">WITH mTRUTH</text>

        {/* ── Calm rows ── */}
        {calmRows.map((row, i) => {
          const y = 36 + i * 58;
          return (
            <g key={i}>
              {/* Row background */}
              <rect x="218" y={y - 2} width="186" height={40} rx="3"
                fill="currentColor" fillOpacity={0.04 + i * 0.015} />

              {/* Red dot */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5, duration: 0.4 }}
                style={{ transformOrigin: `230px ${y + 8}px` }}
              >
                <circle cx="230" cy={y + 8} r="3" fill="rgba(196,30,58,0.75)" />
              </motion.g>

              {/* Label */}
              <motion.text
                x="241" y={y + 13}
                fontSize="8.5" fontFamily="Inter,sans-serif"
                fill="currentColor" fillOpacity="0.7"
                fontWeight="500"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.6, duration: 0.5 }}
              >{row.label}</motion.text>

              {/* Pct label */}
              <motion.text
                x="395" y={y + 13}
                fontSize="7" fontFamily="Inter,sans-serif"
                fill="rgba(196,30,58,0.7)" textAnchor="end"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 1.1, duration: 0.5 }}
              >{row.pct}</motion.text>

              {/* Bar track */}
              <rect x="228" y={y + 22} width="165" height="5" rx="2.5"
                fill="currentColor" fillOpacity="0.08" />

              {/* Bar fill */}
              <motion.g
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.15 + 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `228px ${y + 24}px` }}
              >
                <rect x="228" y={y + 22} width={row.w} height="5" rx="2.5"
                  fill="url(#redBar)" />
              </motion.g>
            </g>
          );
        })}

        {/* Bottom lines */}
        <line x1="6" y1="278" x2="172" y2="278" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.14" />
        <line x1="218" y1="278" x2="402" y2="278" stroke="rgba(196,30,58,0.25)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function CalmUXSection() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-tight"
            >
              Less noise.{" "}
              <span className="text-muted-foreground/60 italic font-normal">More signal.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground font-serif text-lg leading-relaxed max-w-md"
            >
              Engineered around reduced cognitive load — no algorithmic amplification, no sensationalism, no tab overload. Structured clarity.
            </motion.p>

            <div className="space-y-0">
              {noiseItems.map((item, i) => (
                <NoiseRow key={i} item={item} index={i} />
              ))}
              <div className="grid grid-cols-2 border-t border-border/40">
                <div className="px-4 py-2">
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground/30 font-sans">Elsewhere</span>
                </div>
                <div className="px-4 py-2 border-l border-border/30">
                  <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-sans">mVuew</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <ChaosToCalm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
