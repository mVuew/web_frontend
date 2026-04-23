import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MVuewText
 *
 * Props
 *   className   — forwarded to the outer <span>
 *   timingScale — multiplies every duration/stagger constant (default 1).
 *                 Use > 1 for a slower version (e.g. Navbar uses 1.8).
 *
 * Physics model:
 *   EXPAND  (idle → my → multi → meta)
 *     1. Suffix chars added one-at-a-time → real layout reflow pushes
 *        "Vuew" rightward via framer-motion `layout` animation.
 *     2. "–" separator fades up after last char settles.
 *     3. 'u'→'i' cylinder roll via y-transforms (both always in DOM;
 *        a hidden spacer sets the container width to the VISIBLE char
 *        so there is no gap when 'i' is showing).
 *
 *   COLLAPSE (meta → idle)
 *     1. 'i'→'u' drum-roll immediately.
 *     2. ~420 ms later suffix fades while Vuew layout-slides left
 *        (mode="popLayout" makes both motions overlap).
 */

type Phase = 'idle' | 'my' | 'multi' | 'meta';
const SEQUENCE: Phase[] = ['idle', 'my', 'multi', 'meta'];

/* Base durations (ms) — multiplied by timingScale */
const BASE_DURATIONS: Record<Phase, number> = {
  idle:  5000,
  my:    5500,
  multi: 5500,
  meta:  5500,
};

const SUFFIX: Record<Phase, string> = {
  idle:  '',
  my:    'y',
  multi: 'ulti',
  meta:  'eta',
};

/* Base animation timing (seconds) — multiplied by timingScale */
const BASE_CHAR_DUR     = 0.55;  // one char roll
const BASE_CHAR_STAGGER = 0.22;  // DOM-insertion gap when expanding from idle
const BASE_SEP_DUR      = 0.35;  // separator fade
const BASE_LAYOUT_DUR   = 0.65;  // Vuew layout slide

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LAYOUT_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/* ── Component ────────────────────────────────────────────────── */
interface Props {
  className?:   string;
  timingScale?: number;  // default 1 (hero); use 1.8 for navbar
}

export function MVuewText({ className = '', timingScale = 1 }: Props) {
  const [idx, setIdx] = useState(0);
  const prevRef       = useRef(0);
  const timerRef      = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [revealCount, setRevealCount] = useState(0);
  const [showSep,     setShowSep]     = useState(false);
  const [showI,       setShowI]       = useState(false);
  const [showSuffix,  setShowSuffix]  = useState(false);

  /* Scaled constants — recomputed whenever timingScale changes */
  const s            = timingScale;
  const CHAR_DUR     = BASE_CHAR_DUR     * s;
  const CHAR_STAGGER = BASE_CHAR_STAGGER * s;
  const SEP_DUR      = BASE_SEP_DUR      * s;
  const LAYOUT_DUR   = BASE_LAYOUT_DUR   * s;

  const LAYOUT_TRANSITION = {
    layout: { duration: LAYOUT_DUR, ease: LAYOUT_EASE }
  };

  const phase = SEQUENCE[idx];

  /* ── Phase transition timer ──────────────────────────────────── */
  useEffect(() => {
    const dur = BASE_DURATIONS[phase] * s;
    const t = setTimeout(() => {
      prevRef.current = idx;
      setIdx(i => (i + 1) % SEQUENCE.length);
    }, dur);
    return () => clearTimeout(t);
  }, [idx, phase, s]);

  /* ── Animation orchestration ─────────────────────────────────── */
  useEffect(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    const prevPhase      = SEQUENCE[prevRef.current];
    const comingFromIdle = prevPhase === 'idle';
    const suffix         = SUFFIX[phase];

    /* ── COLLAPSE ─────────────────────────────────────────────── */
    if (phase === 'idle') {
      setShowI(false);                                     // i→u roll starts
      const t1 = setTimeout(() => setShowSuffix(false),   // suffix fades + Vuew slides
        Math.round(420 * s));
      const t2 = setTimeout(() => {
        setRevealCount(0);
        setShowSep(false);
      }, Math.round(1300 * s));
      timerRef.current.push(t1, t2);
      return;
    }

    /* ── EXPAND from idle ─────────────────────────────────────── */
    if (comingFromIdle) {
      setRevealCount(0);
      setShowSep(false);
      setShowI(false);
      setShowSuffix(true);

      // One char at a time → each DOM insertion shifts Vuew right
      suffix.split('').forEach((_, i) => {
        const t = setTimeout(
          () => setRevealCount(i + 1),
          Math.round(i * CHAR_STAGGER * 1000),
        );
        timerRef.current.push(t);
      });

      // Separator after last char finishes
      const lastCharStartMs = Math.max(0, suffix.length - 1) * CHAR_STAGGER * 1000;
      const charFinishMs    = lastCharStartMs + CHAR_DUR * 1000;
      const sepMs           = charFinishMs + 100;
      const t2 = setTimeout(() => setShowSep(true), Math.round(sepMs));
      timerRef.current.push(t2);

      // u→i after separator is ~60% through its fade
      const t3 = setTimeout(() => setShowI(true), Math.round(sepMs + SEP_DUR * 600));
      timerRef.current.push(t3);
      return;
    }

    /* ── MORPH between expanded phases ───────────────────────── */
    setRevealCount(suffix.length);
    setShowSuffix(true);
    setShowSep(true);
    setShowI(true);

  }, [phase, s]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Which suffix chars to show */
  const suffix         = SUFFIX[phase];
  const comingFromIdle = SEQUENCE[prevRef.current] === 'idle';
  const visibleSuffix  = showSuffix
    ? (comingFromIdle ? suffix.slice(0, revealCount) : suffix)
    : '';

  return (
    <span
      className={`inline-flex items-baseline font-serif ${className}`}
      aria-label="mVuew"
      style={{ lineHeight: 'inherit' }}
    >
      {/* ── "m" ──────────────────────────────────────────────────── */}
      <span style={{ display: 'inline-block', lineHeight: 'inherit' }}>m</span>

      {/* ── Suffix block ─────────────────────────────────────────── */}
      <AnimatePresence mode="popLayout" initial={false}>
        {showSuffix && (
          <motion.span
            key="suffix-block"
            layout
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: LAYOUT_DUR, ease: [0.4, 0, 0.2, 1] },
            }}
            transition={LAYOUT_TRANSITION}
            style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 'inherit' }}
          >
            {/* Clipped char slot */}
            <motion.span
              layout
              transition={LAYOUT_TRANSITION}
              style={{
                display:       'inline-flex',
                overflow:      'hidden',
                position:      'relative',
                verticalAlign: 'baseline',
                lineHeight:    'inherit',
                paddingBottom: '0.22em',
                marginBottom:  '-0.22em',
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleSuffix.split('').map((char, i) => (
                  <motion.span
                    key={`${i}_${char}`}
                    initial={{ y: '115%', opacity: 0 }}
                    animate={{ y: '0%',   opacity: 1 }}
                    exit={{    y: '-115%', opacity: 0 }}
                    transition={{ duration: CHAR_DUR, ease: EASE }}
                    style={{ display: 'inline-block', lineHeight: 'inherit' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.span>

            {/* Separator */}
            <AnimatePresence initial={false}>
              {showSep && (
                <motion.span
                  key="sep"
                  initial={{ opacity: 0, y: '55%' }}
                  animate={{ opacity: 1, y: '0%' }}
                  exit={{    opacity: 0 }}
                  transition={{ duration: SEP_DUR, ease: EASE }}
                  style={{ display: 'inline-block', lineHeight: 'inherit' }}
                >
                  -
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        )}
      </AnimatePresence>

      {/* ── "V" ──────────────────────────────────────────────────── */}
      <motion.span
        layout
        transition={LAYOUT_TRANSITION}
        style={{ display: 'inline-block', lineHeight: 'inherit' }}
      >
        V
      </motion.span>

      {/* ── 'u' / 'i' — cylinder roll via y-transforms ──────────── */}
      {/*                                                             */}
      {/*  Problem solved: 'u' is wider than 'i'. If 'u' sets the    */}
      {/*  container width (in-flow), the 'i' leaves a gap before    */}
      {/*  'ew'. Fix: a hidden spacer matches the VISIBLE char's      */}
      {/*  width at all times; both 'u' and 'i' are absolutely        */}
      {/*  positioned so only the spacer drives layout width.         */}
      <motion.span
        layout
        transition={LAYOUT_TRANSITION}
        style={{
          display:       'inline-block',
          overflow:      'hidden',
          position:      'relative',
          verticalAlign: 'baseline',
          lineHeight:    'inherit',
        }}
      >
        {/* Hidden spacer — width = currently visible char */}
        <span
          aria-hidden
          style={{ display: 'block', visibility: 'hidden', lineHeight: 'inherit' }}
        >
          {showI ? 'i' : 'u'}
        </span>

        {/* 'u' — rolls up when showI becomes true */}
        <motion.span
          animate={{ y: showI ? '-110%' : '0%' }}
          transition={{ duration: CHAR_DUR, ease: EASE }}
          style={{
            position:   'absolute',
            top:        0,
            left:       0,
            display:    'block',
            lineHeight: 'inherit',
          }}
        >
          u
        </motion.span>

        {/* 'i' — rolls in from below when showI becomes true */}
        <motion.span
          animate={{ y: showI ? '0%' : '110%' }}
          transition={{ duration: CHAR_DUR, ease: EASE }}
          style={{
            position:   'absolute',
            top:        0,
            left:       0,
            display:    'block',
            lineHeight: 'inherit',
          }}
        >
          i
        </motion.span>
      </motion.span>

      {/* ── "ew" ─────────────────────────────────────────────────── */}
      <motion.span
        layout
        transition={LAYOUT_TRANSITION}
        style={{ display: 'inline-block', lineHeight: 'inherit' }}
      >
        ew
      </motion.span>
    </span>
  );
}
