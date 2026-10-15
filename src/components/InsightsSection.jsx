"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { insights, readingTime } from "@/data/insight";

const FEATURED = insights.slice(0, 3);

const CATEGORY = {
  "multimodal-routing": "Route planning",
  "air-freight-preparation": "Air freight",
  "buyer-consolidation": "Consolidation",
};

const THEMES = [
  {
    chip: "bg-sky-500",
    ping: "bg-sky-400",
    text: "text-sky-600",
    node: "group-hover/stop:border-sky-400 group-hover/stop:text-sky-600",
    glow: "hover:shadow-[0_20px_45px_-15px_rgba(14,165,233,0.35)] hover:border-sky-300",
    bar: "bg-sky-500",
  },
  {
    chip: "bg-teal-500",
    ping: "bg-teal-400",
    text: "text-teal-600",
    node: "group-hover/stop:border-teal-400 group-hover/stop:text-teal-600",
    glow: "hover:shadow-[0_20px_45px_-15px_rgba(20,184,166,0.35)] hover:border-teal-300",
    bar: "bg-teal-500",
  },
  {
    chip: "bg-violet-500",
    ping: "bg-violet-400",
    text: "text-violet-600",
    node: "group-hover/stop:border-violet-400 group-hover/stop:text-violet-600",
    glow: "hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.35)] hover:border-violet-300",
    bar: "bg-violet-500",
  },
];

const loop = (duration, extra = {}) => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
  ...extra,
});

function AnimatedBackground({ reduce }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Drifting dot grid */}
      <motion.div
        className="absolute inset-0 text-navy-900 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 25%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at center, #000 25%, transparent 75%)",
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }
        }
        transition={loop(5, { ease: "linear" })}
      />

      {/* Blobs */}
      <motion.div
        className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80"
        animate={
          reduce
            ? undefined
            : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }
        }
        transition={loop(16)}
      />
      <motion.div
        className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl sm:h-72 sm:w-72"
        animate={
          reduce
            ? undefined
            : { x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }
        }
        transition={loop(19)}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl sm:h-64 sm:w-64"
        animate={
          reduce
            ? undefined
            : {
                x: [0, -40, 40, 0],
                y: [0, 30, -30, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={loop(22)}
      />
    </div>
  );
}

/* Dashed route line + travelling shipment dot.
   Desktop: horizontal, runs from the centre of column 1 to the centre of column 3.
   Mobile: vertical, runs down the left side. */
function RouteTrack({ reduce }) {
  return (
    <>
      {/* Desktop (horizontal) */}
      <div className="pointer-events-none absolute top-5 hidden h-0 lg:left-[calc((100%_-_4rem)/6)] lg:right-[calc((100%_-_4rem)/6)] lg:block">
        <svg
          className="absolute left-0 top-0 h-[2px] w-full -translate-y-1/2 text-sky-500 opacity-40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 8"
          >
            {!reduce && (
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-14"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>
        </svg>

        {!reduce && (
          <motion.div
            className="absolute top-0"
            animate={{
              left: ["0%", "0%", "50%", "100%", "100%"],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.06, 0.5, 0.94, 1],
            }}
          >
            <span className="absolute right-0 top-0 h-[3px] w-20 -translate-y-1/2 bg-gradient-to-l from-sky-400 to-transparent" />
            <span className="absolute left-0 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 shadow-[0_0_16px_4px_rgba(14,165,233,0.55)] ring-4 ring-sky-500/20" />
          </motion.div>
        )}
      </div>

      {/* Mobile (vertical) */}
      <div
        className="pointer-events-none absolute bottom-10 left-5 top-5 w-0 lg:hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 80%, transparent)",
          maskImage: "linear-gradient(to bottom, #000 80%, transparent)",
        }}
      >
        <svg
          className="absolute left-0 top-0 h-full w-[2px] -translate-x-1/2 text-sky-500 opacity-40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 8"
          >
            {!reduce && (
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-14"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>
        </svg>

        {!reduce && (
          <motion.div
            className="absolute left-0"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.08, 0.92, 1],
            }}
          >
            <span className="absolute left-0 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 shadow-[0_0_16px_4px_rgba(14,165,233,0.55)] ring-4 ring-sky-500/20" />
          </motion.div>
        )}
      </div>
    </>
  );
}

function Stop({ item, index, reduce }) {
  const theme = THEMES[index % THEMES.length];
  const category = CATEGORY[item.slug] || "Insight";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
      className="group/stop relative pl-14 lg:pl-0"
    >
      {/* Checkpoint node */}
      <div className="absolute left-0 top-0 lg:relative lg:mx-auto lg:w-10">
        <span
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-100 bg-white text-sm font-bold text-navy-900 shadow-sm transition-colors duration-300 ${theme.node}`}
        >
          {!reduce && (
            <span
              className={`absolute inset-0 animate-ping rounded-full opacity-30 ${theme.ping}`}
              style={{
                animationDelay: `${index * 0.8}s`,
                animationDuration: "2.6s",
              }}
            />
          )}
          <span className="relative">{item.id}</span>
        </span>
      </div>

      {/* Connector (desktop) — middle stop hangs lower for a staggered rhythm */}
      <span
        aria-hidden="true"
        className={`mx-auto hidden w-px bg-navy-100 lg:block ${index === 1 ? "h-16" : "h-8"}`}
      />

      {/* Card */}
      <motion.div
        whileHover={reduce ? undefined : { y: -6 }}
        className="lg:mt-0"
      >
        <Link
          href={`/insights/${item.slug}`}
          className={`focus-ring group relative flex flex-col overflow-hidden rounded-lg border-2 border-navy-100 bg-white transition-all duration-300 ${theme.glow}`}
        >
          <span
            className={`absolute inset-x-0 top-0 z-10 h-1 ${theme.bar} opacity-70`}
          />

          <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
            <Image
              src={item.heroImage}
              alt={item.heroAlt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 70vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />
            <span
              className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${theme.chip}`}
            >
              {category}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-navy-400">
              {item.date} · {readingTime(item.words)} min read
            </p>
            <h3 className="mt-2 text-[17px] font-bold leading-snug text-navy-900">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy-400">
              {item.excerpt}
            </p>
            <span
              className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${theme.text}`}
            >
              Read insight
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function InsightsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream-100 py-16 sm:py-20">
      <AnimatedBackground reduce={reduce} />

      <div className="container-content relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
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
              Short, dated content to help customers prepare cargo, documents
              and route choices.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:block"
          >
            <Link
              href="/insights"
              className="focus-ring group inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
            >
              Browse Insights
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Tracking timeline */}
        <div className="relative mt-12">
          <RouteTrack reduce={reduce} />
          <div className="grid gap-10 lg:grid-cols-3 lg:items-start lg:gap-8">
            {FEATURED.map((item, i) => (
              <Stop key={item.slug} item={item} index={i} reduce={reduce} />
            ))}
          </div>
        </div>

        {/* Mobile button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 md:hidden"
        >
          <Link
            href="/insights"
            className="focus-ring group inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
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
