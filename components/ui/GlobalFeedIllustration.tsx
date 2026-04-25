import { motion } from "framer-motion";

interface Source {
  name: string;
  x: number;
  y: number;
}

const sources: Source[] = [
  { name: "Reuters", x: 72, y: 12 },
  { name: "BBC News", x: 42, y: 8 },
  { name: "NYT", x: 14, y: 22 },
  { name: "WSJ", x: 5, y: 50 },
  { name: "The Hindu", x: 16, y: 78 },
  { name: "Al Jazeera", x: 44, y: 88 },
  { name: "Financial Times", x: 74, y: 82 },
  { name: "Le Monde", x: 90, y: 52 },
  { name: "Nikkei", x: 86, y: 24 },
  { name: "The Guardian", x: 60, y: 10 },
];

const CENTER = { x: 50, y: 50 };

function arcPath(sx: number, sy: number, seed: number) {
  const polarityX = seed % 2 === 0 ? 1 : -1;
  const polarityY = seed % 3 === 0 ? -1 : 1;
  const bend = 4 + (seed % 3);
  const mx = (sx + CENTER.x) / 2 + bend * polarityX;
  const my = (sy + CENTER.y) / 2 + bend * polarityY;
  return `M ${sx} ${sy} Q ${mx} ${my} ${CENTER.x} ${CENTER.y}`;
}

const paths = sources.map((s, index) => arcPath(s.x, s.y, index));

function FlowDot({
  path,
  dur,
  begin,
}: {
  path: string;
  dur: number;
  begin: string;
}) {
  return (
    <circle r="0.9" fill="currentColor" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur={`${dur}s`}
        begin={begin}
        repeatCount="indefinite"
        keyTimes="0;0.2;1"
      />
      <animateMotion
        path={path}
        dur={`${dur}s`}
        begin={begin}
        repeatCount="indefinite"
      />
    </circle>
  );
}

export function GlobalFeedIllustration() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full text-foreground"
      style={{ overflow: "visible" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      {/* Outer glow ring */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="7"
        fill="currentColor"
        opacity="0.04"
      />
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="4.5"
        fill="currentColor"
        opacity="0.06"
      />

      {/* Connection lines */}
      {sources.map((s, i) => (
        <path
          key={i}
          d={paths[i]}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          strokeOpacity="0.1"
          strokeDasharray="0.8 1.2"
        />
      ))}

      {/* Animated dots — 3 per line at staggered offsets */}
      {sources.map((_, i) =>
        [0, 1.4, 2.8].map((offset, j) => {
          const dur = 2.6 + (i % 3) * 0.3;
          const begin = `${i * 0.22 + offset}s`;
          return (
            <FlowDot
              key={`${i}-${j}`}
              path={paths[i]}
              dur={dur}
              begin={begin}
            />
          );
        }),
      )}

      {/* Center orb */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="2.2"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Pulsing ring */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="2.2;6;2.2"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Source nodes */}
      {sources.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="1.1" fill="currentColor" opacity="0.5" />
          <text
            x={s.x + (s.x < CENTER.x ? -2.2 : 2.2)}
            y={s.y + (s.y < 30 ? -1.8 : s.y > 70 ? 2.6 : 0.5)}
            fontSize="2.8"
            fontFamily="var(--font-site), sans-serif"
            fill="currentColor"
            opacity="0.4"
            textAnchor={s.x < CENTER.x ? "end" : "start"}
          >
            {s.name}
          </text>
        </g>
      ))}

      {/* Center label */}
      <text
        x={CENTER.x}
        y={CENTER.y + 8}
        fontSize="2.6"
        fontFamily="var(--font-site), sans-serif"
        fill="currentColor"
        opacity="0.45"
        textAnchor="middle"
      >
        Your Feed
      </text>
    </motion.svg>
  );
}
