"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Package, Radar } from "lucide-react";

const CHIPS = [
  "Air & Ocean",
  "Multimodal",
  "Inland & Customs",
  "Fashion & GOH",
  "Project Cargo",
  "Warehousing & CFS",
];

const STATS = [
  { value: "35+", label: "Countries served" },
  { value: "24/7", label: "Shipment visibility" },
  { value: "99%", label: "On-time dispatch" },
];

// Each route is a cubic bezier from the Bangladesh origin to a destination node.
// Control points double as data for both the static <path> and the sampled marker animation.
const ROUTES = [
  {
    start: { x: 60, y: 300 },
    cp1: { x: 180, y: 260 },
    cp2: { x: 260, y: 120 },
    end: { x: 380, y: 60 },
    destination: { x: 470, y: 20 },
    color: "#dc2430",
    delay: 0,
    duration: 5.5,
    muted: false,
  },
  {
    start: { x: 60, y: 300 },
    cp1: { x: 160, y: 280 },
    cp2: { x: 260, y: 220 },
    end: { x: 360, y: 190 },
    destination: { x: 470, y: 150 },
    color: "#3fa9f5",
    delay: 0.8,
    duration: 6.2,
    muted: false,
  },
  {
    start: { x: 60, y: 300 },
    cp1: { x: 160, y: 320 },
    cp2: { x: 260, y: 350 },
    end: { x: 360, y: 330 },
    destination: { x: 470, y: 300 },
    color: "rgba(255,255,255,0.35)",
    delay: 1.6,
    duration: 7,
    muted: true,
  },
];

function bezierPoint(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  const x =
    mt * mt * mt * p0.x +
    3 * mt * mt * t * p1.x +
    3 * mt * t * t * p2.x +
    t * t * t * p3.x;
  const y =
    mt * mt * mt * p0.y +
    3 * mt * mt * t * p1.y +
    3 * mt * t * t * p2.y +
    t * t * t * p3.y;
  return { x, y };
}

function useRoutePoints(steps = 24) {
  return useMemo(
    () =>
      ROUTES.map((r) => {
        const xs = [];
        const ys = [];
        for (let i = 0; i <= steps; i++) {
          const p = bezierPoint(i / steps, r.start, r.cp1, r.cp2, r.end);
          xs.push(p.x);
          ys.push(p.y);
        }
        return { xs, ys };
      }),
    [steps]
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.08, ease: "easeOut" },
  }),
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const routePoints = useRoutePoints();
  const loopRepeat = prefersReducedMotion ? 0 : Infinity;

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* Ambient background layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,36,48,0.16),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(63,169,245,0.14),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-crimson/25 blur-3xl sm:h-96 sm:w-96"
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl sm:h-80 sm:w-80"
              animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="container-content relative grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-crimson"
          >
            <Radar className="h-3.5 w-3.5" aria-hidden="true" />
            Bangladesh Freight Forwarding
          </motion.div>

          <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.12] sm:text-5xl">
            <motion.span
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="block overflow-hidden"
            >
              The right route,
            </motion.span>
            <motion.span
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="block overflow-hidden"
            >
              managed from the first handover.
            </motion.span>
          </h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-navy-100/80"
          >
            Tell us what must move, when it needs to arrive and what the cargo
            requires. Crystal will assess the practical options and coordinate
            the agreed plan from Bangladesh origin onward.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/quote"
              className="focus-ring group inline-flex items-center gap-2 rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-700"
            >
              Request a Quote
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/services"
              className="focus-ring rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* <motion.div
            initial="hidden"
            animate="show"
            custom={5}
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-2"
          >
            {CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.05 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-navy-100/85 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <Package
                  className="h-3 w-3 text-navy-100/60"
                  aria-hidden="true"
                />
                {chip}
              </motion.span>
            ))}
          </motion.div> */}

          <motion.div
            initial="hidden"
            animate="show"
            custom={6}
            variants={fadeUp}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-navy-100/60 sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto aspect-[520/360] w-full max-w-xl"
        >
          <div className="absolute right-0 top-0 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-900/70 px-3 py-1.5 text-[11px] font-semibold text-navy-100/85 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live shipment tracking
          </div>

          <svg
            viewBox="0 0 520 360"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="hero-glow"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Origin pulse rings */}
            <circle
              cx="60"
              cy="300"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
            />
            <circle
              cx="60"
              cy="300"
              r="72"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
            />
            {!prefersReducedMotion && (
              <motion.circle
                cx={60}
                cy={300}
                r={18}
                fill="none"
                stroke="#dc2430"
                strokeWidth={1.5}
                animate={{ r: [18, 46, 18], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {ROUTES.map((r, i) => {
              const d = `M${r.start.x} ${r.start.y} C ${r.cp1.x} ${r.cp1.y}, ${r.cp2.x} ${r.cp2.y}, ${r.end.x} ${r.end.y}`;
              const points = routePoints[i];
              return (
                <g key={i}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={r.color}
                    strokeWidth={r.muted ? 1.5 : 2}
                    strokeDasharray={r.muted ? "5 5" : "0"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.4,
                      delay: 0.5 + r.delay * 0.35,
                      ease: "easeInOut",
                    }}
                  />

                  {!r.muted && !prefersReducedMotion && (
                    <motion.circle
                      r={4}
                      fill={r.color}
                      filter="url(#hero-glow)"
                      animate={{
                        cx: points.xs,
                        cy: points.ys,
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: r.duration,
                        delay: 2 + r.delay,
                        repeat: loopRepeat,
                        repeatDelay: 0.6,
                        ease: "linear",
                      }}
                    />
                  )}

                  <motion.circle
                    cx={r.end.x}
                    cy={r.end.y}
                    r={5}
                    fill="#0f1f33"
                    stroke="white"
                    strokeWidth={1.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 + r.delay * 0.35 }}
                  />
                  <motion.circle
                    cx={r.destination.x}
                    cy={r.destination.y}
                    r={5}
                    fill="#1f9d58"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + r.delay * 0.35 }}
                  />
                </g>
              );
            })}

            <circle cx="60" cy="300" r="6" fill="#dc2430" />
            <text
              x="10"
              y="332"
              fill="white"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              ORIGIN
            </text>
            <text
              x="440"
              y="10"
              fill="#7fd6a1"
              fontSize="10"
              fontWeight="700"
              letterSpacing="0.06em"
              textAnchor="end"
            >
              DESTINATION
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
