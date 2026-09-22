"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";
import { services } from "@/data/services";

// Cycled by index so the grid stays colorful and dynamic regardless of how many
// services the data file defines, without hardcoding per-slug themes.
const THEMES = [
  {
    badge: "bg-sky-100 text-sky-600",
    bar: "bg-sky-500",
    blob: "bg-sky-400/25",
    border: "group-hover:border-sky-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(14,165,233,0.4)]",
  },
  {
    badge: "bg-teal-100 text-teal-600",
    bar: "bg-teal-500",
    blob: "bg-teal-400/25",
    border: "group-hover:border-teal-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(20,184,166,0.4)]",
  },
  {
    badge: "bg-violet-100 text-violet-600",
    bar: "bg-violet-500",
    blob: "bg-violet-400/25",
    border: "group-hover:border-violet-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.4)]",
  },
  {
    badge: "bg-amber-100 text-amber-600",
    bar: "bg-amber-500",
    blob: "bg-amber-400/25",
    border: "group-hover:border-amber-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.4)]",
  },
  {
    badge: "bg-pink-100 text-pink-600",
    bar: "bg-pink-500",
    blob: "bg-pink-400/25",
    border: "group-hover:border-pink-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(236,72,153,0.4)]",
  },
  {
    badge: "bg-emerald-100 text-emerald-600",
    bar: "bg-emerald-500",
    blob: "bg-emerald-400/25",
    border: "group-hover:border-emerald-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(16,185,129,0.4)]",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.94, rotate: -1 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: (i % 6) * 0.06,
      type: "spring",
      stiffness: 220,
      damping: 20,
    },
  }),
};

export default function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream-100 py-16 sm:py-20">
      {/* Ambient multi-color background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-0 top-1/2 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Services
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          Choose the movement. Connect the handovers.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Start with the cargo, timing and delivery requirement. We will
          identify the services needed to support the agreed route.
        </motion.p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const theme = THEMES[i % THEMES.length];
            return (
              <motion.div
                key={service.slug}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={`focus-ring group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-navy-100 bg-white p-6 shadow-card transition-all duration-300 ${theme.border} ${theme.glow}`}
                >
                  {/* Top accent bar */}
                  <span
                    className={`absolute inset-x-0 top-0 h-1 ${theme.bar} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* Corner glow blob */}
                  <span
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${theme.blob} blur-2xl transition-transform duration-500 group-hover:scale-125`}
                  />

                  <motion.span
                    className={`relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-full ${theme.badge}`}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { rotate: [0, -10, 10, -6, 0], scale: 1.1 }
                    }
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Icon name={service.icon} className="h-5 w-5" />
                  </motion.span>

                  <h3 className="relative z-10 text-[15px] font-bold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="relative z-10 mt-1 text-xs font-semibold text-crimson">
                    {service.heroTagline}
                  </p>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-navy-400">
                    {service.solutionSummary}
                  </p>

                  <span className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 transition-colors duration-300 group-hover:text-crimson">
                    See how it works
                    <Icon
                      name="arrowRight"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
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
