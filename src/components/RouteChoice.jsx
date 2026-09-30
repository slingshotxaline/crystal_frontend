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

/* Each mode has its own line colour, dash pattern and vehicle, so the
 * diagram shows the mode without needing to read a label. */
const MODES = {
  air: { name: "Air", color: "#ffffff", dash: "1 9", cycle: 10 },
  sea: { name: "Ocean", color: "#7dd3fc", dash: "10 7", cycle: 17 },
  land: { name: "Road", color: "#fcd34d", dash: "14 6", cycle: 20 },
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
 * Background: everything here loops forever, quietly.
 * 1. a lat/long grid that pans diagonally
 * 2. long dashed routes with vehicles travelling along them
 * 3. two soft glows that drift
 * ---------------------------------------------------------------- */
const AMBIENT_ROUTES = [
  {
    d: "M -40 620 C 260 420, 520 700, 820 500 S 1300 360, 1480 460",
    color: "#7dd3fc",
    dur: 26,
    dash: "10 8",
  },
  {
    d: "M -40 220 C 300 80, 560 320, 900 180 S 1300 120, 1480 260",
    color: "#ffffff",
    dur: 32,
    dash: "2 10",
  },
  {
    d: "M 200 860 C 420 640, 760 760, 1000 560 S 1360 620, 1480 700",
    color: "#fcd34d",
    dur: 38,
    dash: "14 8",
  },
];

function AnimatedBackground({ reduce }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Panning grid, faded toward the edges */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
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

      {/* 2. Long routes with travelling vehicles */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-60"
      >
        {AMBIENT_ROUTES.map((r, i) => (
          <g key={i}>
            <path
              d={r.d}
              fill="none"
              stroke={r.color}
              strokeOpacity="0.08"
              strokeWidth="1.5"
            />
            <motion.path
              d={r.d}
              fill="none"
              stroke={r.color}
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
              <circle r="3.5" fill={r.color} fillOpacity="0.8">
                <animateMotion
                  dur={`${r.dur}s`}
                  repeatCount="indefinite"
                  path={r.d}
                  begin={`-${i * 9}s`}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* 3. Drifting glows */}
      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-crimson/20 blur-3xl sm:h-96 sm:w-96"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl sm:h-80 sm:w-80"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -28, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Route diagram for the active combination
 * ---------------------------------------------------------------- */
function RouteDiagram({ combo, reduce }) {
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
          const m = MODES[leg.mode];
          const first = i === 0;
          return (
            <g key={i}>
              {/* faint solid underlay so the path always reads */}
              <path
                d={leg.d}
                fill="none"
                stroke={m.color}
                strokeOpacity="0.16"
                strokeWidth="2"
              />
              {/* flowing dashes */}
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
          return (
            <g key={i}>
              {!reduce && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r="8"
                  fill="none"
                  stroke={isTransfer ? "#dc2430" : "#ffffff"}
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
                fill="#0f1f3d"
                stroke={isTransfer ? "#dc2430" : "#ffffff"}
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
          className="absolute -translate-x-1/2 text-center text-[11px] font-semibold leading-tight text-white/85 sm:text-xs"
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

function Legend({ combo }) {
  return (
    <ul className="mt-6 grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-2">
      {combo.modes.map((mode, i) => {
        const m = MODES[mode];
        return (
          <li key={i} className="flex items-center gap-3">
            <svg
              viewBox="-14 -12 28 24"
              className="h-6 w-7 shrink-0"
              aria-hidden="true"
            >
              <Glyph mode={mode} color={m.color} />
            </svg>
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">
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
 * ---------------------------------------------------------------- */
export default function RouteChoice() {
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
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20 lg:py-24">
      <AnimatedBackground reduce={reduce} />

      <div className="container-content relative grid gap-10 px-4 sm:px-6 lg:grid-cols-[1fr,1.1fr] lg:items-center lg:gap-14">
        {/* Left: copy and mode picker */}
        <div>
          <h2 className="max-w-lg text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            One shipment can have more than one workable path.
          </h2>

          <p className="mt-4 max-w-md text-sm text-white/70 sm:text-base">
            We compare the agreed priorities, confirm the operational conditions
            and coordinate the selected route across origin, transfer and
            destination partners.
          </p>

          <p className="mt-4 max-w-md text-sm text-white/55">
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
                    isActive
                      ? "border-crimson bg-red-100 text-navy-900"
                      : "border-white/20 text-white/75 hover:border-white/50 hover:text-white"
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
              <h3 className="text-lg font-bold">{combo.label}</h3>
              <p className="mt-2 text-white/85">{combo.description}</p>
              <p className="mt-2 text-sm text-white/60">{combo.detail}</p>
              <p className="mt-3 text-xs font-semibold text-crimson">
                Subject to operational conditions
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: live route */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={combo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RouteDiagram combo={combo} reduce={reduce} />
              <Legend combo={combo} />
            </motion.div>
          </AnimatePresence>

          <p className="mt-5 text-xs italic text-white/45">
            Diagram is illustrative. Actual gateways and transit legs are
            confirmed per shipment.
          </p>
        </div>
      </div>
    </section>
  );
}
