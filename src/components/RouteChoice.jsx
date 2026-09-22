"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const COMBOS = [
  {
    id: "sea-air",
    label: "Sea → Air",
    stages: ["Origin", "Ocean Leg", "Transfer", "Air Leg", "Destination"],
    description:
      "Faster than ocean freight and more cost-efficient than direct air freight.",
    detail:
      "Routing via regional air hubs, aligned to schedule, capacity and destination requirements.",
  },
  {
    id: "air-air",
    label: "Air → Air",
    stages: ["Origin", "Air Leg 1", "Transfer", "Air Leg 2", "Destination"],
    description:
      "Two coordinated air legs when a single direct routing is not available.",
    detail:
      "Used when gateway capacity or schedule requires a transfer between two air services.",
  },
  {
    id: "land-air",
    label: "Land → Air",
    stages: ["Origin", "Inland Leg", "Gateway", "Air Leg", "Destination"],
    description:
      "Inland movement to the most workable airport gateway before uplift.",
    detail:
      "Considered when the nearest gateway does not have the required schedule or capacity.",
  },
  {
    id: "sea-sea",
    label: "Sea → Sea",
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

// Gentle wave offsets so the route reads as a flight/shipping path rather
// than a flat progress bar. Same rhythm is reused across combos; the
// content (labels, description) is what actually changes.
const WAVE_Y = [60, 24, 44, 20, 60];
const VB_W = 1000;
const VB_H = 90;

function pathPoints(total) {
  return Array.from({ length: total }, (_, i) => {
    const x = (i / (total - 1)) * VB_W;
    const y = WAVE_Y[i % WAVE_Y.length];
    return { x, y };
  });
}

function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

function stageDotColor(i, total) {
  if (i === 0) return "var(--rc-navy-900, #0f1f3d)";
  if (i === total - 1) return "var(--rc-moss, #4a7c59)";
  if (i % 2 === 1) return "var(--rc-crimson, #dc2430)";
  return "var(--rc-navy-300, #9aa7c2)";
}

function StageDiagram({ combo, prefersReducedMotion }) {
  const total = combo.stages.length;
  const points = pathPoints(total);
  const d = smoothPath(points);

  return (
    <div>
      {/* Tablet / desktop: curved animated route */}
      <div className="hidden sm:block">
        <div className="relative">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full overflow-visible"
            style={{ height: "clamp(70px, 9vw, 110px)" }}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-navy-100"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              key={`${combo.id}-line`}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-crimson/60"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            {!prefersReducedMotion && (
              <circle r="5" fill="currentColor" className="text-crimson">
                <animateMotion
                  key={`${combo.id}-motion`}
                  dur="3.2s"
                  repeatCount="indefinite"
                  begin="1s"
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;1;0"
                  keyTimes="0;0.08;0.85;0.95;1"
                  dur="3.2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
            )}
            {points.map((p, i) => (
              <motion.circle
                key={combo.stages[i]}
                cx={p.x}
                cy={p.y}
                r={i === 0 || i === total - 1 ? 8 : 6.5}
                fill="white"
                stroke={stageDotColor(i, total)}
                strokeWidth="4"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15 + i * 0.12,
                  type: "spring",
                  stiffness: 320,
                  damping: 20,
                }}
              />
            ))}
          </svg>
          <div className="mt-1 flex justify-between">
            {combo.stages.map((stage, i) => (
              <motion.span
                key={stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.12 }}
                className="w-16 text-center text-[10px] font-semibold uppercase tracking-wide text-navy-400 sm:w-20 md:text-[11px]"
              >
                {stage}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical stepper */}
      <div className="sm:hidden">
        <div className="relative pl-1">
          <div className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px overflow-hidden bg-navy-100">
            <motion.div
              className="h-full w-full origin-top bg-crimson/50"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex flex-col gap-5">
            {combo.stages.map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="relative z-10 flex items-center gap-3"
              >
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-white"
                  style={{ backgroundColor: stageDotColor(i, total) }}
                />
                <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                  {stage}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TiltCard({ children, prefersReducedMotion }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [5, -5]);
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);
  const glowX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(sy, [0, 1], ["0%", "100%"]);

  function handleMove(e) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8"
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(320px circle at ${glowX} ${glowY}, rgba(220,36,48,0.08), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export default function RouteChoice() {
  const [active, setActive] = useState(COMBOS[0].id);
  const prefersReducedMotion = useReducedMotion();
  const combo = COMBOS.find((c) => c.id === active);
  const activeIndex = COMBOS.findIndex((c) => c.id === active);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-14 sm:py-20 lg:py-24">
      {/* Ambient background motion */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-crimson/5 blur-3xl sm:h-80 sm:w-80"
          animate={
            prefersReducedMotion ? undefined : { x: [0, 24, 0], y: [0, 16, 0] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl sm:h-72 sm:w-72"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, -20, 0], y: [0, -14, 0] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-content relative grid gap-10 px-4 sm:px-6 lg:grid-cols-[1fr,1.1fr] lg:items-start lg:gap-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-navy-400"
          >
            Route Choice
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-3 text-2xl font-bold leading-tight text-navy-900 sm:text-3xl lg:text-4xl"
          >
            One shipment can have more than one workable path.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-4 max-w-md text-sm text-navy-400 sm:text-base"
          >
            We compare the agreed priorities, confirm the operational conditions
            and coordinate the selected route across origin, transfer and
            destination partners.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 max-w-md text-sm text-navy-400"
          >
            Select a mode combination to see when it typically adds value.
            Routing and transit times are shipment-specific and subject to
            operational conditions — we do not publish fixed transit times.
          </motion.p>

          <div
            role="tablist"
            aria-label="Mode combination"
            className="relative mt-6 flex flex-wrap gap-2"
          >
            {COMBOS.map((c) => {
              const isActive = active === c.id;
              return (
                <motion.button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`focus-ring relative rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 ${
                    isActive ? "text-white" : "text-navy-800 hover:bg-navy-100"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="route-choice-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-navy-900"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white" />
                  )}
                  {c.label}
                </motion.button>
              );
            })}
          </div>

          {/* Step indicator: which of the 5 combos is active */}
          <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
            {COMBOS.map((c, i) => (
              <motion.span
                key={c.id}
                className="h-1 rounded-full bg-navy-900"
                initial={false}
                animate={{
                  width: i === activeIndex ? 20 : 6,
                  opacity: i === activeIndex ? 1 : 0.25,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative mt-6 border-t border-navy-100 pt-6"
            >
              <h3 className="text-lg font-bold text-navy-900">{combo.label}</h3>
              <p className="mt-2 text-navy-700">{combo.description}</p>
              <p className="mt-2 text-navy-400">{combo.detail}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-crimson">
                Subject to operational conditions
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="group">
          <TiltCard prefersReducedMotion={prefersReducedMotion}>
            <AnimatePresence mode="wait">
              <motion.div
                key={combo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <StageDiagram
                  combo={combo}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            </AnimatePresence>

            <p className="mt-8 text-xs italic text-navy-400">
              Diagram is illustrative. Actual gateways and transit legs are
              confirmed per shipment.
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
