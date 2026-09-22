"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const CATEGORIES = [
  { title: "Bangladesh gateway guidance" },
  { title: "Air and ocean market updates" },
  { title: "Multimodal route explainers" },
  { title: "Fashion and consolidation guidance" },
];

const THEMES = [
  {
    badge: "bg-sky-100 text-sky-600",
    bar: "bg-sky-500",
    hoverGlow:
      "hover:shadow-[0_20px_45px_-15px_rgba(14,165,233,0.35)] hover:border-sky-300",
  },
  {
    badge: "bg-teal-100 text-teal-600",
    bar: "bg-teal-500",
    hoverGlow:
      "hover:shadow-[0_20px_45px_-15px_rgba(20,184,166,0.35)] hover:border-teal-300",
  },
  {
    badge: "bg-violet-100 text-violet-600",
    bar: "bg-violet-500",
    hoverGlow:
      "hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.35)] hover:border-violet-300",
  },
  {
    badge: "bg-amber-100 text-amber-600",
    bar: "bg-amber-500",
    hoverGlow:
      "hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.35)] hover:border-amber-300",
  },
];

const SKELETON_WIDTHS = ["92%", "70%", "48%"];

export default function InsightsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream-100 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Insights
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          Practical guidance for the next shipment decision.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Short, dated content to help customers prepare cargo, documents and
          route choices.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const theme = THEMES[i % THEMES.length];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className={`relative overflow-hidden rounded-lg border-2 border-navy-100 bg-white p-5 transition-all duration-300 ${theme.hoverGlow}`}
              >
                <span
                  className={`absolute inset-x-0 top-0 h-1 ${theme.bar} opacity-70`}
                />

                <h3 className="text-[15px] font-bold text-navy-900">
                  {cat.title}
                </h3>

                {/* Skeleton placeholders standing in for articles not yet published */}
                <div className="mt-4 space-y-2">
                  {SKELETON_WIDTHS.map((w, si) => (
                    <div
                      key={si}
                      className="h-2 animate-pulse rounded-full bg-navy-100"
                      style={{ width: w, animationDelay: `${si * 150}ms` }}
                    />
                  ))}
                </div>

                <span
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${theme.badge}`}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    {!prefersReducedMotion && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  Category — articles pending editorial approval
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/insights"
            className="focus-ring group mt-6 inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
          >
            Browse Insights
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
