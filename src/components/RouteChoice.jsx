"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------
 * Data. Each combo is two legs joined at one transfer point.
 * stages = [origin, leg 1, transfer, leg 2, destination]
 * modes  = [mode of leg 1, mode of leg 2]
 * ---------------------------------------------------------------- */
const COMBOS = [
  {
    id: "sea-air",
    label: "Sea → Air",
    modes: ["sea", "air"],
    stages: ["Origin", "Ocean Leg", "Transfer", "Air Leg", "Destination"],
    description:
      "Faster than ocean freight and more cost-efficient than direct air freight.",
    detail:
      "Routing via regional air hubs, aligned to schedule, capacity and destination requirements.",
  },
  {
    id: "air-air",
    label: "Air → Air",
    modes: ["air", "air"],
    stages: ["Origin", "Air Leg 1", "Transfer", "Air Leg 2", "Destination"],
    description:
      "Two coordinated air legs when a single direct routing is not available.",
    detail:
      "Used when gateway capacity or schedule requires a transfer between two air services.",
  },
  {
    id: "land-air",
    label: "Land → Air",
    modes: ["land", "air"],
    stages: ["Origin", "Inland Leg", "Gateway", "Air Leg", "Destination"],
    description:
      "Inland movement to the most workable airport gateway before uplift.",
    detail:
      "Considered when the nearest gateway does not have the required schedule or capacity.",
  },
  {
    id: "sea-sea",
    label: "Sea → Sea",
    modes: ["sea", "sea"],
    stages: [
      "Origin",
      "Ocean Leg 1",
      "Transshipment",
      "Ocean Leg 2",
      "Destination",
    ],
    description:
      "Transshipment routing where a direct ocean service is not available.",
    detail:
      "Common for destinations without a direct vessel call from the Bangladesh gateway.",
  },
  {
    id: "sea-land",
    label: "Sea → Land",
    modes: ["sea", "land"],
    stages: [
      "Origin",
      "Ocean Leg",
      "Discharge Port",
      "Inland Leg",
      "Destination",
    ],
    description:
      "Ocean movement followed by inland delivery beyond the discharge port.",
    detail:
      "Standard for destinations requiring final delivery inland from the arrival port.",
  },
];

/* ------------------------------------------------------------------
 * Themes. "dark" is the original navy look, "light" is for white/cream
 * pages. Line colours change too, since white/pale lines would be
 * invisible on a light background.
 * ---------------------------------------------------------------- */
const THEMES = {
  dark: {
    section: "bg-navy-900 text-white",
    heading: "text-white",
    body: "text-white/70",
    muted: "text-white/55",
    pillIdle:
      "border-white/20 text-white/75 hover:border-white/50 hover:text-white",
    pillActive: "border-crimson bg-red-100 text-navy-900",
    title: "text-white",
    desc: "text-white/85",
    detail: "text-white/60",
    card: "border-white/10 bg-white/[0.04] backdrop-blur-sm",
    legendBorder: "border-white/10",
    legendText: "text-white/80",
    legendStrong: "text-white",
    note: "text-white/45",
    nodeLabel: "text-white/85",
    nodeFill: "#0f1f3d",
    nodeStroke: "#ffffff",
    grid: "rgba(255,255,255,0.06)",
    glowA: "bg-crimson/20",
    glowB: "bg-sky-400/15",
    ambientOpacity: "opacity-60",
    modes: {
      air: { name: "Air", color: "#ffffff", dash: "1 9", cycle: 10 },
      sea: { name: "Ocean", color: "#7dd3fc", dash: "10 7", cycle: 17 },
      land: { name: "Road", color: "#fcd34d", dash: "14 6", cycle: 20 },
    },
    ambient: ["#7dd3fc", "#ffffff", "#fcd34d"],
  },
  light: {
    section: "bg-gradient-to-b from-white via-sky-50/60 to-white text-navy-900",
    heading: "text-navy-900",
    body: "text-navy-700",
    muted: "text-navy-400",
    pillIdle:
      "border-navy-200 text-navy-700 hover:border-navy-400 hover:text-navy-900",
    pillActive: "border-crimson bg-red-100 text-navy-900",
    title: "text-navy-900",
    desc: "text-navy-800",
    detail: "text-navy-400",
    card: "border-sky-100 bg-white shadow-xl shadow-sky-900/5",
    legendBorder: "border-navy-100",
    legendText: "text-navy-700",
    legendStrong: "text-navy-900",
    note: "text-navy-400",
    nodeLabel: "text-navy-700",
    nodeFill: "#ffffff",
    nodeStroke: "#0f1f3d",
    grid: "rgba(15,31,61,0.06)",
    glowA: "bg-crimson/10",
    glowB: "bg-sky-400/15",
    ambientOpacity: "opacity-70",
    modes: {
      air: { name: "Air", color: "#0f1f3d", dash: "1 9", cycle: 10 },
      sea: { name: "Ocean", color: "#0284c7", dash: "10 7", cycle: 17 },
      land: { name: "Road", color: "#d97706", dash: "14 6", cycle: 20 },
    },
    ambient: ["#0284c7", "#0f1f3d", "#d97706"],
  },
};

/* ------------------------------------------------------------------
 * Route geometry (SVG viewBox 600 x 260)
 * ---------------------------------------------------------------- */
const VB_W = 600;
const VB_H = 260;
const NODES = [
  { x: 84, y: 190 },
  { x: 300, y: 130 },
  { x: 516, y: 190 },
];

function legPath(a, b, mode) {
  const dx = b.x - a.x;
  if (mode === "air") {
    const cy = Math.min(a.y, b.y) - 85;
    return `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${cy} ${b.x} ${b.y}`;
  }
  if (mode === "sea") {
    return `M ${a.x} ${a.y} C ${a.x + dx * 0.3} ${a.y + 26}, ${a.x + dx * 0.7} ${b.y - 26}, ${b.x} ${b.y}`;
  }
  return `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 + 14} ${b.x} ${b.y}`;
}

/* Vehicle glyphs, drawn around (0,0) and pointing right. */
function Glyph({ mode, color }) {
  if (mode === "air") {
    return (
      <path
        fill={color}
        d="M9 0 L2 -2 L-3 -8 L-5 -8 L-3 -2 L-8 -1.5 L-9 -4 L-11 -4 L-10 0 L-11 4 L-9 4 L-8 1.5 L-3 2 L-5 8 L-3 8 L2 2 Z"
      />
    );
  }
  if (mode === "sea") {
    return (
      <g fill={color}>
        <path d="M-10 1 H10 L7 7 H-7 Z" />
        <path d="M-4 0 V-5 H3 V0 Z" />
        <path d="M-1 -5 V-8 H1 V-5 Z" />
      </g>
    );
  }
  return (
    <g fill={color}>
      <path d="M-10 -5 H2 V3 H-10 Z" />
      <path d="M3 -2 H7 L10 1 V3 H3 Z" />
      <circle cx="-5" cy="4.5" r="2" />
      <circle cx="6" cy="4.5" r="2" />
    </g>
  );
}

/* ------------------------------------------------------------------
 * Section background: everything here loops forever, quietly.
 * ---------------------------------------------------------------- */
const AMBIENT_ROUTES = [
  {
    d: "M -40 620 C 260 420, 520 700, 820 500 S 1300 360, 1480 460",
    dur: 26,
    dash: "10 8",
  },
  {
    d: "M -40 220 C 300 80, 560 320, 900 180 S 1300 120, 1480 260",
    dur: 32,
    dash: "2 10",
  },
  {
    d: "M 200 860 C 420 640, 760 760, 1000 560 S 1360 620, 1480 700",
    dur: 38,
    dash: "14 8",
  },
];

function AnimatedBackground({ reduce, theme }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Panning grid, faded toward the edges */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${theme.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.grid} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 45%, black 25%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse at 60% 45%, black 25%, transparent 78%)",
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "56px 56px"] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* 2. Long routes with travelling dots */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-full ${theme.ambientOpacity}`}
      >
        {AMBIENT_ROUTES.map((r, i) => {
          const color = theme.ambient[i];
          return (
            <g key={i}>
              <path
                d={r.d}
                fill="none"
                stroke={color}
                strokeOpacity="0.08"
                strokeWidth="1.5"
              />
              <motion.path
                d={r.d}
                fill="none"
                stroke={color}
                strokeOpacity="0.28"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={r.dash}
                animate={
                  reduce
                    ? undefined
                    : { strokeDashoffset: [0, -parseInt(r.dash, 10) * 4] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              {!reduce && (
                <circle r="3.5" fill={color} fillOpacity="0.8">
                  <animateMotion
                    dur={`${r.dur}s`}
                    repeatCount="indefinite"
                    path={r.d}
                    begin={`-${i * 9}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* 3. Drifting glows */}
      <motion.div
        className={`absolute -left-24 top-10 h-72 w-72 rounded-full ${theme.glowA} blur-3xl sm:h-96 sm:w-96`}
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute -right-20 bottom-0 h-64 w-64 rounded-full ${theme.glowB} blur-3xl sm:h-80 sm:w-80`}
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -28, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Backdrop for the diagram card (light variant only).
 * gradient + drifting glows + dot grid + spinning globe lines + waves
 * ---------------------------------------------------------------- */
const WAVE_PATH = "M -80 345 q 40 -16 80 0" + " t 80 0".repeat(11);

function DiagramBackdrop({ reduce }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
    >
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-amber-50" />

      {/* drifting glows */}
      <motion.div
        className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-12 -right-10 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl"
        animate={reduce ? undefined : { x: [0, -36, 0], y: [0, -20, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* dot grid, fading toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,31,61,0.16) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <clipPath id="rc-globe">
            <circle cx="300" cy="190" r="185" />
          </clipPath>
        </defs>

        {/* globe: meridians "rotate" by squeezing and widening */}
        <g
          fill="none"
          stroke="#0284c7"
          strokeOpacity="0.14"
          strokeWidth="1"
          clipPath="url(#rc-globe)"
        >
          <circle cx="300" cy="190" r="185" strokeOpacity="0.2" />
          <motion.ellipse
            cx="300"
            cy="190"
            ry="185"
            initial={{ rx: 150 }}
            animate={reduce ? undefined : { rx: [150, 20, 150] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="300"
            cy="190"
            ry="185"
            initial={{ rx: 80 }}
            animate={reduce ? undefined : { rx: [80, 175, 80] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M 100 190 H 500" />
          <path d="M 120 120 Q 300 90 480 120" />
          <path d="M 120 260 Q 300 290 480 260" />
          <path d="M 170 65 Q 300 50 430 65" />
          <path d="M 170 315 Q 300 330 430 315" />
        </g>

        {/* waves along the bottom. The static offset sits on the <g> so
            it doesn't clash with the animated transform on the path. */}
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(0 ${i * 16})`}>
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="#0284c7"
              strokeOpacity={i === 0 ? 0.22 : 0.12}
              strokeWidth="1.5"
              animate={reduce ? undefined : { x: [0, -160] }}
              transition={{
                duration: i === 0 ? 9 : 13,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Route diagram for the active combination
 * ---------------------------------------------------------------- */
function RouteDiagram({ combo, reduce, theme }) {
  const legs = [
    { from: NODES[0], to: NODES[1], mode: combo.modes[0] },
    { from: NODES[1], to: NODES[2], mode: combo.modes[1] },
  ].map((l) => ({ ...l, d: legPath(l.from, l.to, l.mode) }));

  const nodeLabels = [combo.stages[0], combo.stages[2], combo.stages[4]];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`${combo.label} route: ${combo.stages.join(", ")}`}
      >
        {legs.map((leg, i) => {
          const m = theme.modes[leg.mode];
          const first = i === 0;
          return (
            <g key={i}>
              <path
                d={leg.d}
                fill="none"
                stroke={m.color}
                strokeOpacity="0.16"
                strokeWidth="2"
              />
              <motion.path
                d={leg.d}
                fill="none"
                stroke={m.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={m.dash}
                initial={{ opacity: 0 }}
                animate={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 1, strokeDashoffset: [0, -m.cycle] }
                }
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.3 },
                  strokeDashoffset: {
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
              {/* vehicle: runs leg 1 in the first half of the cycle,
                  leg 2 in the second half, then loops */}
              {!reduce && (
                <g opacity="0">
                  <g transform="scale(1.35)">
                    <Glyph mode={leg.mode} color={m.color} />
                  </g>
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path={leg.d}
                    rotate={leg.mode === "air" ? "auto" : "0"}
                    calcMode="linear"
                    keyPoints={first ? "0;1;1" : "0;0;1"}
                    keyTimes="0;0.5;1"
                  />
                  <animate
                    attributeName="opacity"
                    dur="6s"
                    repeatCount="indefinite"
                    calcMode="discrete"
                    keyTimes={first ? "0;0.49;0.5" : "0;0.5;0.99"}
                    values={first ? "1;1;0" : "0;1;1"}
                  />
                </g>
              )}
            </g>
          );
        })}

        {NODES.map((n, i) => {
          const isTransfer = i === 1;
          const stroke = isTransfer ? "#dc2430" : theme.nodeStroke;
          return (
            <g key={i}>
              {!reduce && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r="8"
                  fill="none"
                  stroke={stroke}
                  strokeWidth="1.5"
                  animate={{ r: [8, 22], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.5,
                  }}
                />
              )}
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="7"
                fill={theme.nodeFill}
                stroke={stroke}
                strokeWidth="3.5"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                transition={{
                  delay: 0.1 + i * 0.15,
                  type: "spring",
                  stiffness: 320,
                  damping: 20,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Node labels are HTML so they stay readable on small screens */}
      {NODES.map((n, i) => (
        <span
          key={i}
          className={`absolute -translate-x-1/2 text-center text-[11px] font-semibold leading-tight sm:text-xs ${theme.nodeLabel}`}
          style={{
            left: `${(n.x / VB_W) * 100}%`,
            top: `${((n.y + 18) / VB_H) * 100}%`,
          }}
        >
          {nodeLabels[i]}
        </span>
      ))}
    </div>
  );
}

function Legend({ combo, theme }) {
  return (
    <ul
      className={`mt-6 grid gap-2 border-t pt-5 sm:grid-cols-2 ${theme.legendBorder}`}
    >
      {combo.modes.map((mode, i) => {
        const m = theme.modes[mode];
        return (
          <li key={i} className="flex items-center gap-3">
            <svg
              viewBox="-14 -12 28 24"
              className="h-6 w-7 shrink-0"
              aria-hidden="true"
            >
              <Glyph mode={mode} color={m.color} />
            </svg>
            <span className={`text-sm ${theme.legendText}`}>
              <span className={`font-semibold ${theme.legendStrong}`}>
                {combo.stages[i === 0 ? 1 : 3]}
              </span>{" "}
              by {m.name.toLowerCase()}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------
 * Section
 * variant: "dark" (navy, default) | "light" (white/cream pages)
 * ---------------------------------------------------------------- */
export default function RouteChoice({ variant = "dark" }) {
  const theme = THEMES[variant] || THEMES.dark;
  const [active, setActive] = useState(COMBOS[0].id);
  const reduce = useReducedMotion();
  const activeIndex = COMBOS.findIndex((c) => c.id === active);
  const combo = COMBOS[activeIndex];

  function onKeyDown(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    setActive(COMBOS[(activeIndex + step + COMBOS.length) % COMBOS.length].id);
  }

  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${theme.section}`}
    >
      <AnimatedBackground reduce={reduce} theme={theme} />

      <div className="container-content relative grid gap-10 px-4 sm:px-6 lg:grid-cols-[1fr,1.1fr] lg:items-center lg:gap-14">
        {/* Left: copy and mode picker */}
        <div>
          <h2
            className={`max-w-lg text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl ${theme.heading}`}
          >
            One shipment can have more than one workable path.
          </h2>

          <p className={`mt-4 max-w-md text-sm sm:text-base ${theme.body}`}>
            We compare the agreed priorities, confirm the operational conditions
            and coordinate the selected route across origin, transfer and
            destination partners.
          </p>

          <p className={`mt-4 max-w-md text-sm ${theme.muted}`}>
            Select a mode combination to see when it typically adds value.
            Routing and transit times are shipment-specific and subject to
            operational conditions, so we do not publish fixed transit times.
          </p>

          <div
            role="tablist"
            aria-label="Mode combination"
            onKeyDown={onKeyDown}
            className="mt-7 flex flex-wrap gap-2"
          >
            {COMBOS.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                    isActive ? theme.pillActive : theme.pillIdle
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={combo.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-7 max-w-md border-l-2 border-crimson pl-5"
            >
              <h3 className={`text-lg font-bold ${theme.title}`}>
                {combo.label}
              </h3>
              <p className={`mt-2 ${theme.desc}`}>{combo.description}</p>
              <p className={`mt-2 text-sm ${theme.detail}`}>{combo.detail}</p>
              <p className="mt-3 text-xs font-semibold text-crimson">
                Subject to operational conditions
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: live route */}
        <div
          className={`relative overflow-hidden rounded-2xl border p-5 sm:p-8 ${theme.card}`}
        >
          {variant === "light" && <DiagramBackdrop reduce={reduce} />}

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={combo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RouteDiagram combo={combo} reduce={reduce} theme={theme} />
                <Legend combo={combo} theme={theme} />
              </motion.div>
            </AnimatePresence>

            <p className={`mt-5 text-xs italic ${theme.note}`}>
              Diagram is illustrative. Actual gateways and transit legs are
              confirmed per shipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
