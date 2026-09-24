"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import Icon from "./Icon";

const STATS = [
  {
    value: "1997",
    label: "Established",
    description:
      "Independent freight forwarder with continuous Bangladesh operating history.",
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
  },
  // {
  //   value: "T.O.P.S.",
  //   label: "Global Agent Network",
  //   description:
  //     "Membership and trusted relationships connect Bangladesh to international markets.",
  // },
  {
    value: "Dhaka + CTG",
    label: "Facilities",
    description:
      "Dedicated air-freight warehouse and Chattogram CFS capability.",
  },
  {
    value: "5",
    label: "Regional Markets",
    description:
      "Bangladesh plus approved regional operations at differing ownership models.",
  },
];

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

  return (
    <motion.div
      ref={ref}
      custom={i}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:border-crimson/60 hover:shadow-[0_20px_45px_-15px_rgba(220,36,48,0.25)] sm:p-7">
        {/* Left accent bar, grows in on hover */}
        <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-crimson transition-transform duration-300 group-hover:scale-y-100" />

        {/* Watermark glow behind the value */}
        <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

        <p className="relative z-10 text-3xl font-extrabold tabular-nums text-navy-900">
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
      </div>
    </motion.div>
  );
}

export default function TrustEvidence() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-crimson/5 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Bangladesh Capability &amp; Evidence
        </motion.p>

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
