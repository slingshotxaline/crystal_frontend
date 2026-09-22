"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const CASES = [
  {
    category: "Fashion / GOH",
    title: "Fashion or GOH origin programme",
    rows: [
      "Requirement — apparel cargo with hanging presentation needs",
      "Route decision — pending",
      "Execution — pending",
      "Outcome — pending customer approval",
    ],
  },
  {
    category: "Buyer Consolidation",
    title: "Buyer consolidation through Chattogram",
    rows: [
      "Requirement — multi-supplier purchase orders",
      "Route decision — pending",
      "Execution — pending",
      "Outcome — pending customer approval",
    ],
  },
  {
    category: "Urgent Air Freight",
    title: "Urgent air-freight recovery",
    rows: [
      "Requirement — time-critical recovery cargo",
      "Route decision — pending",
      "Execution — pending",
      "Outcome — pending customer approval",
    ],
  },
];

// Cycled by index so the card accents stay varied regardless of how many cases exist.
const THEMES = [
  {
    text: "text-sky-600",
    bg: "bg-sky-500",
    badge: "bg-sky-100 text-sky-600",
    glow: "rgba(14,165,233,0.4)",
  },
  {
    text: "text-teal-600",
    bg: "bg-teal-500",
    badge: "bg-teal-100 text-teal-600",
    glow: "rgba(20,184,166,0.4)",
  },
  {
    text: "text-violet-600",
    bg: "bg-violet-500",
    badge: "bg-violet-100 text-violet-600",
    glow: "rgba(139,92,246,0.4)",
  },
];

function isPending(row) {
  return /pending/i.test(row);
}

function CaseCard({ item, i, prefersReducedMotion }) {
  const theme = THEMES[i % THEMES.length];
  const doneCount = item.rows.filter((r) => !isPending(r)).length;
  const total = item.rows.length;
  const fraction = doneCount / total;
  const firstPendingIndex = item.rows.findIndex((r) => isPending(r));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      className="relative overflow-hidden rounded-xl border-2 border-navy-100 bg-white p-6 shadow-card transition-all duration-300"
      style={{ "--glow": theme.glow }}
    >
      <style jsx>{`
        div:hover {
          box-shadow: 0 20px 45px -15px var(--glow);
        }
      `}</style>

      {/* Progress bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-navy-100">
        <motion.div
          className={`h-full origin-left ${theme.bg}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: fraction }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
        />
      </div>

      <p
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${theme.badge}`}
      >
        {item.category}
      </p>
      <h3 className="mt-3 font-bold text-navy-900">{item.title}</h3>

      <ul className="mt-4 space-y-3">
        {item.rows.map((row, ri) => {
          const pending = isPending(row);
          const isNext = ri === firstPendingIndex;
          return (
            <motion.li
              key={row}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.3 + i * 0.1 + ri * 0.06, duration: 0.35 }}
              className="flex items-start gap-2.5"
            >
              <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                {isNext && !prefersReducedMotion && (
                  <motion.span
                    className="absolute h-4 w-4 rounded-full bg-amber-400"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                {pending ? (
                  <span className="relative h-3 w-3 rounded-full border border-dashed border-navy-300" />
                ) : (
                  <span
                    className={`relative flex h-4 w-4 items-center justify-center rounded-full ${theme.bg}`}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5"
                      fill="none"
                      stroke="white"
                      strokeWidth={1.8}
                    >
                      <path
                        d="M2.5 6.5 5 9l5-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </span>
              <span
                className={`text-sm leading-relaxed ${
                  pending ? "text-navy-400" : "text-navy-700"
                }`}
              >
                {row}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <p className="mt-5 inline-flex items-center gap-1.5 text-xs italic text-navy-400">
        <span className="relative flex h-1.5 w-1.5">
          {!prefersReducedMotion && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
          )}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
        </span>
        Approved case content pending customer permission.
      </p>
    </motion.div>
  );
}

export default function CaseStudies() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Case Studies
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          See how the shipment plan worked.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Each case explains the requirement, route decision, operating controls
          and approved outcome without exposing confidential customer
          information.
        </motion.p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {CASES.map((item, i) => (
            <CaseCard
              key={item.title}
              item={item}
              i={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/case-studies"
            className="focus-ring group mt-6 inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
          >
            View All Case Studies
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
