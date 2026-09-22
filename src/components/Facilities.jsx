"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, animate } from "framer-motion";
import Icon from "./Icon";

const FACILITIES = [
  {
    place: "Dhaka",
    title: "Air freight, warehouse & customer coordination",
    icon: "warehouse",
    stats: [
      { value: "25,000 sq ft", label: "Dedicated warehouse space" },
      { value: "<1 km", label: "From Airport Cargo Village" },
      { value: "2 hrs", label: "Lead time to airport scanner" },
    ],
  },
  {
    place: "Chattogram",
    title: "Ocean freight, port & CFS coordination",
    icon: "container",
    stats: [
      { value: "120,000 sq ft", label: "Dedicated operational space" },
      { value: "10 min", label: "Driving distance to terminal" },
      { value: "24/7", label: "Operations & cargo support" },
    ],
  },
];

function CountUpValue({ value, active, reduceMotion }) {
  // Matches a leading number (with optional thousand separators / decimal) and keeps the rest as a suffix.
  // Values that don't start with a number (e.g. "<1 km") are shown statically.
  const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!match) return;
    if (!active || reduceMotion) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1].replace(/,/g, ""));
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${Math.round(v).toLocaleString()}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduceMotion]);

  return <>{display}</>;
}

function FacilityCard({ facility, i, prefersReducedMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-800/40 backdrop-blur-sm transition-colors duration-300 hover:border-crimson/40"
    >
      {/* Visual panel */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy-800 to-navy-700">
        <motion.div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { backgroundPosition: ["0px 0px", "28px 28px"] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

        {/* Centerpiece icon with pulsing ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!prefersReducedMotion && (
            <motion.span
              className="absolute h-20 w-20 rounded-full border border-crimson/40"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.08, rotate: 4 }
            }
            transition={{ duration: 0.3 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-navy-900/70 text-navy-100 shadow-lg"
          >
            <Icon name={facility.icon} className="h-7 w-7" strokeWidth={1.2} />
          </motion.span>
        </div>

        {/* Location badge */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-900/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
          {facility.place}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white sm:text-xl">
          {facility.title}
        </h3>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {facility.stats.map((stat, si) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.2 + i * 0.12 + si * 0.08, duration: 0.4 }}
            >
              <StatValue
                facility={facility}
                stat={stat}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          type="button"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
          className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-full bg-amber-100/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-300 transition-colors duration-300 hover:bg-amber-100/25"
        >
          <span className="relative flex h-2 w-2">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          Validate all facility facts
        </motion.button>
      </div>
    </motion.div>
  );
}

function StatValue({ stat, prefersReducedMotion }) {
  const [ref, setRef] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const el = ref;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <div ref={setRef}>
      <p className="text-lg font-extrabold text-white sm:text-xl">
        <CountUpValue
          value={stat.value}
          active={active}
          reduceMotion={prefersReducedMotion}
        />
      </p>
      <p className="mt-1 text-[11px] leading-tight text-navy-100/55">
        {stat.label}
      </p>
    </div>
  );
}

export default function Facilities() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-crimson/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-crimson"
        >
          Facilities
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl"
        >
          Facilities that support the flow.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-100/75"
        >
          Use a dedicated Dhaka air-freight warehouse and Chattogram CFS
          capability to stage, consolidate, prepare and control cargo.
        </motion.p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {FACILITIES.map((facility, i) => (
            <FacilityCard
              key={facility.place}
              facility={facility}
              i={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
