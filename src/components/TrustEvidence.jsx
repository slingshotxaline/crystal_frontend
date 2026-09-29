"use client";

import { useEffect, useRef, useState } from "react";
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

/* Ambient background: a drifting dot grid plus slow-moving colour
 * blobs, shared visual language with the other animated sections. */
function SectionBackground({ reduce }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(100,116,139,0.28) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 25%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 25%, transparent 80%)",
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "26px 26px"] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
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
    </div>
  );
}

export default function TrustEvidence() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <SectionBackground reduce={prefersReducedMotion} />

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
          Built to Execute, Connected Globally
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-xs text-navy-400"
        >
          Every figure above is pending confirmation from Crystal Express before
          publication.
        </motion.p>
      </div>
    </section>
  );
}
