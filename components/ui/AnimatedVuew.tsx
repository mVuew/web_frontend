import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// ~20s holding u → 2.5s crossfade → 20s holding i → 2.5s crossfade → repeat (45s cycle)
const DURATION  = 45;
const KF_TIMES  = [0, 0.44, 0.50, 0.94, 1] as const;
const U_OPACITY = [1,  1,    0,    0,    1] as const;
const I_OPACITY = [0,  0,    1,    1,    0] as const;

function AnimatedU({ delay = 0 }: { delay?: number }) {
  const base = {
    duration: DURATION,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay,
  };

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* Invisible spacer keeps "u" width so layout never shifts */}
      <span style={{ visibility: 'hidden' }}>u</span>

      {/* Visible 'u' */}
      <motion.span
        aria-hidden="true"
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 }}
        animate={{ opacity: [...U_OPACITY] }}
        transition={{ ...base, times: [...KF_TIMES] }}
      >
        u
      </motion.span>

      {/* Visible 'i' */}
      <motion.span
        aria-hidden="true"
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 }}
        animate={{ opacity: [...I_OPACITY] }}
        transition={{ ...base, times: [...KF_TIMES] }}
      >
        i
      </motion.span>
    </span>
  );
}

/** Renders the word "Vuew" with a smooth u↔i crossfade on the 'u'. */
export function AnimatedVuew({ delay = 0 }: { delay?: number }) {
  return (
    <>V<AnimatedU delay={delay} />ew</>
  );
}

/**
 * Splits `text` on every occurrence of "Vuew" (case-insensitive on the prefix)
 * and replaces each with an animated version, staggered by 0.4 s per occurrence.
 */
export function renderWithAnimatedVuew(text: string, baseDelay = 0): ReactNode {
  const parts = text.split('Vuew');
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(part);
    if (i < parts.length - 1) {
      nodes.push(<AnimatedVuew key={i} delay={baseDelay + i * 0.4} />);
    }
  });
  return <>{nodes}</>;
}
