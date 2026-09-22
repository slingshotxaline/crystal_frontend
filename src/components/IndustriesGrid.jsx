"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { industries } from "@/data/industries";

// Cycled by index so the list stays colorful regardless of how many industries
// the data file defines, without hardcoding per-slug themes.
const THEMES = [
  {
    groupHoverText: "group-hover:text-sky-600",
    bg: "bg-sky-500",
    tint: "bg-sky-50",
    badge: "bg-sky-100 text-sky-600",
  },
  {
    groupHoverText: "group-hover:text-teal-600",
    bg: "bg-teal-500",
    tint: "bg-teal-50",
    badge: "bg-teal-100 text-teal-600",
  },
  {
    groupHoverText: "group-hover:text-violet-600",
    bg: "bg-violet-500",
    tint: "bg-violet-50",
    badge: "bg-violet-100 text-violet-600",
  },
  {
    groupHoverText: "group-hover:text-amber-600",
    bg: "bg-amber-500",
    tint: "bg-amber-50",
    badge: "bg-amber-100 text-amber-600",
  },
  {
    groupHoverText: "group-hover:text-pink-600",
    bg: "bg-pink-500",
    tint: "bg-pink-50",
    badge: "bg-pink-100 text-pink-600",
  },
  {
    groupHoverText: "group-hover:text-emerald-600",
    bg: "bg-emerald-500",
    tint: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-600",
  },
];

export default function IndustriesGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Industries
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          The cargo changes the plan.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Product, order cycle, handling risk and compliance requirements shape
          the route, facility tasks and information each shipment needs.
        </motion.p>

        <div className="mt-10 divide-y divide-navy-100 border-y border-navy-100">
          {industries.map((industry, i) => {
            const theme = THEMES[i % THEMES.length];
            const number = String(i + 1).padStart(2, "0");
            const initial = industry.title.trim().charAt(0).toUpperCase();

            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: (i % 8) * 0.05,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="focus-ring group relative flex items-center gap-4 overflow-hidden py-6 sm:gap-6 sm:py-7"
                >
                  {/* Hover background sweep */}
                  <span
                    className={`pointer-events-none absolute inset-0 -translate-x-full ${theme.tint} transition-transform duration-500 ease-out group-hover:translate-x-0`}
                  />
                  {/* Left accent bar */}
                  <span
                    className={`absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 ${theme.bg} transition-transform duration-300 group-hover:scale-y-100`}
                  />

                  {/* Ghost number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 bottom-0 select-none text-6xl font-extrabold text-navy-900/[0.04] sm:text-7xl"
                  >
                    {number}
                  </span>

                  {/* Monogram badge */}
                  <motion.span
                    className={`relative z-10 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold sm:flex ${theme.badge}`}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { scale: 1.12, rotate: -6 }
                    }
                    transition={{ duration: 0.25 }}
                  >
                    {initial}
                  </motion.span>

                  <div className="relative z-10 min-w-0 flex-1">
                    <h3
                      className={`text-[15px] font-bold text-navy-900 transition-colors duration-300 sm:text-lg ${theme.groupHoverText}`}
                    >
                      {industry.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-navy-400">
                      {industry.summary}
                    </p>
                  </div>

                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-navy-900 group-hover:text-navy-900">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
