"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import Icon from "./Icon";

const STATS = [
  {
    value: "1997",
    label: "Established",
    description:
      "Independent freight forwarder with continuous Bangladesh operating history.",
    icon: "flagpin",
  },
  // {
  //   value: "2",
  //   label: "Bangladesh Offices",
  //   description: "Dhaka head office and Chattogram branch support execution.",
  // },
  {
    value: "130+",
    label: "Team Members",
    description: "Experienced teams supporting freight and logistics delivery.",
    icon: "team",
  },
  // {
  //   value: "T.O.P.S.",
  //   label: "Global Agent Network",
  //   description:
  //     "Membership and trusted relationships connect Bangladesh to international markets.",
  // },
  {
    value: "Key",
    label: "Facilities",
    description:
      "Dedicated air-freight warehouse and Chattogram CFS capability.",
    icon: "warehouse",
  },
  {
    value: "5",
    label: "Regional Markets",
    description:
      "Bangladesh plus approved regional operations at differing ownership models.",
    icon: "globe",
  },
];

// One accent per card — same palette family used across the site's
// capability / consideration cards, so this section matches them.
const THEMES = [
  {
    tile: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/30",
    glow: "rgba(14,165,233,0.16)",
    bar: "bg-sky-500",
    mark: "text-sky-500",
    ring: "border-sky-400",
    text: "from-sky-600 to-blue-700",
  },
  {
    tile: "from-teal-400 to-emerald-600",
    shadow: "shadow-teal-500/30",
    glow: "rgba(20,184,166,0.16)",
    bar: "bg-teal-500",
    mark: "text-teal-500",
    ring: "border-teal-400",
    text: "from-teal-600 to-emerald-700",
  },
  {
    tile: "from-violet-500 to-indigo-600",
    shadow: "shadow-violet-500/30",
    glow: "rgba(139,92,246,0.16)",
    bar: "bg-violet-500",
    mark: "text-violet-500",
    ring: "border-violet-400",
    text: "from-violet-600 to-indigo-700",
  },
  {
    tile: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/30",
    glow: "rgba(245,158,11,0.18)",
    bar: "bg-amber-500",
    mark: "text-amber-500",
    ring: "border-amber-400",
    text: "from-amber-600 to-orange-700",
  },
];

// Icon names used above may not all exist in the project's Icon set yet.
// Anything unmapped falls back to "check" so the card never breaks.
const ICON_FALLBACK = "check";

// Background image for the whole section (place file in /public/images)
const BG_IMAGE = "/images/trust-bg.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function CountUpValue({ value, active, reduceMotion }) {
  const match = value.match(/^(\d+)(\+)?$/);
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    if (!match) return;
    if (!active || reduceMotion) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const controls = animate(0, target, {
      duration: 1.3,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduceMotion]);

  return <>{display}</>;
}

function StatCard({ stat, i, prefersReducedMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const theme = THEMES[i % THEMES.length];

  // Spotlight that follows the mouse across the card
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, ${theme.glow}, transparent 70%)`;

  function onMove(e) {
    if (prefersReducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <motion.div
      ref={ref}
      custom={i}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      onMouseMove={onMove}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-7">
        {/* mouse spotlight */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {/* giant faded number watermark */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-3 -top-6 select-none text-[6.5rem] font-black leading-none tracking-tighter opacity-[0.05] transition-transform duration-500 group-hover:scale-105 sm:text-[8rem] ${theme.mark}`}
        >
          {stat.value.replace(/\D/g, "") || stat.value.slice(0, 2)}
        </span>

        {/* icon tile with a slow pulse ring */}
        <div className="relative z-10 h-12 w-12">
          {!prefersReducedMotion && (
            <motion.span
              aria-hidden="true"
              className={`absolute inset-0 rounded-xl border-2 ${theme.ring}`}
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.35,
              }}
            />
          )}
          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${theme.tile} text-white shadow-lg ${theme.shadow} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
          >
            <Icon
              name={stat.icon || ICON_FALLBACK}
              className="h-6 w-6"
              strokeWidth={1.8}
            />
          </span>
        </div>

        <p
          className={`relative z-10 mt-5 bg-gradient-to-br bg-clip-text text-4xl font-extrabold tabular-nums text-transparent ${theme.text}`}
        >
          <CountUpValue
            value={stat.value}
            active={inView}
            reduceMotion={prefersReducedMotion}
          />
        </p>
        <p className="relative z-10 mt-1.5 text-xs font-bold uppercase tracking-wide text-crimson">
          {stat.label}
        </p>
        <p className="relative z-10 mt-2.5 text-sm leading-relaxed text-navy-400">
          {stat.description}
        </p>

        <motion.button
          type="button"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
          className="focus-ring relative z-10 mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800 transition-colors duration-300 hover:bg-amber-200/80"
        >
          <span className="relative flex h-2 w-2">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <Icon name="check" className="h-3 w-3" strokeWidth={2.4} />
          Validate
        </motion.button>

        {/* accent line that sweeps in on hover */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${theme.bar}`}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
 * Background: "Dhaka at the centre of the world"
 *
 *  1. A slowly rotating wireframe globe sits bottom-left.
 *  2. A tilted orbit ring circles it with a small satellite.
 *  3. Radar rings pulse out from the Dhaka hub.
 *  4. Shipment routes launch from the hub to destinations around the
 *     section: the line draws itself with a plane/dot at its tip,
 *     then a ping ripples out on arrival, then it fades and repeats.
 *  5. Soft colour glows drift underneath.
 *
 * Everything runs on SMIL/framer inside one SVG, so all layers stay
 * perfectly aligned at any screen size.
 * ---------------------------------------------------------------- */
const HUB = { x: 230, y: 580 }; // globe centre + Dhaka hub (bottom-left)
const GLOBE_R = 200;
const BG_ANIMATION_OPACITY = 0.4; // 0–1: fade of the WHOLE animated background
const GLOBE_OPACITY = 0.45; // extra fade for globe, orbit, radar and hub only
const TILT = (20 * Math.PI) / 180;
const NAVY = "#1e3a8a";
const CRIMSON = "#dc2430";

const DESTINATIONS = [
  { x: 90, y: 120, color: "#0ea5e9", dur: 8, plane: true },
  { x: 520, y: 90, color: "#8b5cf6", dur: 7 },
  { x: 900, y: 140, color: "#14b8a6", dur: 9, plane: true },
  { x: 1350, y: 200, color: "#f59e0b", dur: 10 },
  { x: 760, y: 420, color: "#0ea5e9", dur: 7.5 },
  { x: 1150, y: 470, color: NAVY, dur: 9.5, plane: true },
  { x: 800, y: 740, color: "#f59e0b", dur: 8.5 },
  { x: 1380, y: 700, color: "#14b8a6", dur: 10.5, plane: true },
];

// Curved "great-circle" style arc: control point lifted above the midpoint
function arcPath(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return `M ${a.x} ${a.y} Q ${mx} ${my - dist * 0.28} ${b.x} ${b.y}`;
}

// Latitude rings (tilted ellipses)
const LATITUDES = [-60, -30, 0, 30, 60].map((deg) => {
  const phi = (deg * Math.PI) / 180;
  return {
    cy: HUB.y + GLOBE_R * Math.sin(phi) * Math.cos(TILT),
    rx: GLOBE_R * Math.cos(phi),
    ry: GLOBE_R * Math.cos(phi) * Math.sin(TILT),
  };
});

// Meridians: rx = R·|cos θ|. Sweeping θ through half a turn makes the
// set of ellipses loop seamlessly, which reads as a rotating globe.
const MERIDIAN_STEPS = 24;
const MERIDIANS = Array.from({ length: 6 }, (_, i) => {
  const theta = (i * Math.PI) / 6;
  const at = (k) =>
    GLOBE_R * Math.abs(Math.cos(theta + (k / MERIDIAN_STEPS) * Math.PI));
  return {
    staticRx: at(0),
    values: Array.from({ length: MERIDIAN_STEPS + 1 }, (_, k) =>
      at(k).toFixed(1),
    ).join(";"),
  };
});

const ORBIT_RX = GLOBE_R * 1.42;
const ORBIT_RY = GLOBE_R * 0.34;
const ORBIT_PATH = `M ${-ORBIT_RX} 0 a ${ORBIT_RX} ${ORBIT_RY} 0 1 0 ${
  ORBIT_RX * 2
} 0 a ${ORBIT_RX} ${ORBIT_RY} 0 1 0 ${-ORBIT_RX * 2} 0`;

// Shared easing so the drawing line and its tip stay in sync
const EASE = "0.45 0 0.25 1; 0 0 1 1";
const ARRIVE = 0.6; // fraction of the cycle spent travelling

function ShipmentRoute({ dest, index, reduce }) {
  const d = arcPath(HUB, dest);
  const begin = `${(index * 1.4).toFixed(1)}s`;

  if (reduce) {
    return (
      <g>
        <path
          d={d}
          fill="none"
          stroke={dest.color}
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <circle
          cx={dest.x}
          cy={dest.y}
          r="4"
          fill={dest.color}
          fillOpacity="0.7"
        />
      </g>
    );
  }

  return (
    <g>
      {/* faint permanent track */}
      <path
        d={d}
        fill="none"
        stroke={dest.color}
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />

      {/* the line that draws itself hub → destination, then fades */}
      <path
        d={d}
        pathLength="1"
        fill="none"
        stroke={dest.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 1"
        strokeDashoffset="1"
        opacity="0.9"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur={`${dest.dur}s`}
          begin={begin}
          repeatCount="indefinite"
          values="1;0;0"
          keyTimes={`0;${ARRIVE};1`}
          calcMode="spline"
          keySplines={EASE}
        />
        <animate
          attributeName="opacity"
          dur={`${dest.dur}s`}
          begin={begin}
          repeatCount="indefinite"
          values="0.9;0.9;0"
          keyTimes={`0;${ARRIVE};1`}
        />
      </path>

      {/* the tip: a plane on air routes, a glowing dot otherwise */}
      <g opacity="0">
        {dest.plane ? (
          <g transform="scale(1.4)">
            <path
              fill={dest.color}
              d="M9 0 L2 -2 L-3 -8 L-5 -8 L-3 -2 L-8 -1.5 L-9 -4 L-11 -4 L-10 0 L-11 4 L-9 4 L-8 1.5 L-3 2 L-5 8 L-3 8 L2 2 Z"
            />
          </g>
        ) : (
          <>
            <circle r="9" fill={dest.color} fillOpacity="0.18" />
            <circle r="4" fill={dest.color} />
          </>
        )}
        <animateMotion
          dur={`${dest.dur}s`}
          begin={begin}
          repeatCount="indefinite"
          path={d}
          rotate={dest.plane ? "auto" : "0"}
          keyPoints={`0;1;1`}
          keyTimes={`0;${ARRIVE};1`}
          calcMode="spline"
          keySplines={EASE}
        />
        <animate
          attributeName="opacity"
          dur={`${dest.dur}s`}
          begin={begin}
          repeatCount="indefinite"
          values="1;1;0;0"
          keyTimes={`0;${ARRIVE};${ARRIVE + 0.01};1`}
        />
      </g>

      {/* destination node + arrival ping */}
      <circle
        cx={dest.x}
        cy={dest.y}
        r="4"
        fill={dest.color}
        fillOpacity="0.55"
      />
      <circle
        cx={dest.x}
        cy={dest.y}
        r="4"
        fill="none"
        stroke={dest.color}
        strokeWidth="1.8"
        opacity="0"
      >
        <animate
          attributeName="r"
          dur={`${dest.dur}s`}
          begin={begin}
          repeatCount="indefinite"
          values="4;4;4;28"
          keyTimes={`0;${ARRIVE};${ARRIVE + 0.01};1`}
        />
        <animate
          attributeName="opacity"
          dur={`${dest.dur}s`}
          begin={begin}
          repeatCount="indefinite"
          values="0;0;0.8;0"
          keyTimes={`0;${ARRIVE};${ARRIVE + 0.01};1`}
        />
      </circle>
    </g>
  );
}

function SectionBackground({ reduce }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* background image */}
      <Image
        src={BG_IMAGE}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* overlay keeps text/cards legible — lower /85 to show more image */}
      <div className="absolute inset-0 bg-cream/85" />

      {/* Whole animated layer: one opacity control for everything below */}
      <div
        className="absolute inset-0"
        style={{ opacity: BG_ANIMATION_OPACITY }}
      >
        {/* 5. Drifting glows (underneath the network) */}
        <motion.div
          className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-crimson/5 blur-3xl sm:h-80 sm:w-80"
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl sm:h-72 sm:w-72"
          animate={reduce ? undefined : { x: [0, -36, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/3 top-1/2 h-48 w-48 rounded-full bg-sky-300/10 blur-3xl sm:h-64 sm:w-64"
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="tev-globe-fill" cx="42%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.02" />
            </radialGradient>
          </defs>

          {/* 1. Wireframe globe + 2. orbit ring (faded together) */}
          <g opacity={GLOBE_OPACITY}>
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r={GLOBE_R}
              fill="url(#tev-globe-fill)"
              stroke={NAVY}
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
            {LATITUDES.map((l, i) => (
              <ellipse
                key={`lat-${i}`}
                cx={HUB.x}
                cy={l.cy}
                rx={l.rx}
                ry={l.ry}
                fill="none"
                stroke={NAVY}
                strokeOpacity="0.13"
                strokeWidth="1"
              />
            ))}
            {MERIDIANS.map((m, i) => (
              <ellipse
                key={`mer-${i}`}
                cx={HUB.x}
                cy={HUB.y}
                rx={m.staticRx}
                ry={GLOBE_R}
                fill="none"
                stroke={NAVY}
                strokeOpacity="0.13"
                strokeWidth="1"
              >
                {!reduce && (
                  <animate
                    attributeName="rx"
                    dur="48s"
                    repeatCount="indefinite"
                    values={m.values}
                  />
                )}
              </ellipse>
            ))}

            <g transform={`translate(${HUB.x} ${HUB.y}) rotate(-22)`}>
              <ellipse
                rx={ORBIT_RX}
                ry={ORBIT_RY}
                fill="none"
                stroke={NAVY}
                strokeOpacity="0.2"
                strokeWidth="1.2"
                strokeDasharray="3 8"
                strokeLinecap="round"
              />
              {!reduce && (
                <g>
                  <circle r="10" fill={CRIMSON} fillOpacity="0.15" />
                  <circle r="4.5" fill={CRIMSON} />
                  <animateMotion
                    dur="22s"
                    repeatCount="indefinite"
                    path={ORBIT_PATH}
                  />
                </g>
              )}
            </g>
          </g>

          {/* 4. Shipment routes launching from the hub */}
          {DESTINATIONS.map((dest, i) => (
            <ShipmentRoute key={i} dest={dest} index={i} reduce={reduce} />
          ))}

          {/* 3. Radar rings + hub (faded with the globe) */}
          <g opacity={GLOBE_OPACITY}>
            {!reduce &&
              [0, 2, 4].map((delay) => (
                <circle
                  key={delay}
                  cx={HUB.x}
                  cy={HUB.y}
                  r="8"
                  fill="none"
                  stroke={CRIMSON}
                  strokeWidth="1.5"
                  opacity="0"
                >
                  <animate
                    attributeName="r"
                    dur="6s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    values="8;260"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.2 0.6 0.4 1"
                  />
                  <animate
                    attributeName="opacity"
                    dur="6s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    values="0.45;0"
                    keyTimes="0;1"
                  />
                </circle>
              ))}
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r="14"
              fill={CRIMSON}
              fillOpacity="0.15"
            />
            <circle cx={HUB.x} cy={HUB.y} r="6.5" fill={CRIMSON} />
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r="6.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function TrustEvidence() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <SectionBackground reduce={!!prefersReducedMotion} />

      <div className="container-content relative">
        {/* <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Bangladesh Capability &amp; Evidence
        </motion.p> */}

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          Built to Execute,
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          Connected Globally
        </motion.h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              i={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-xs text-navy-400"
        >
          Every figure above is pending confirmation from Crystal Express before
          publication.
        </motion.p> */}
      </div>
    </section>
  );
}
