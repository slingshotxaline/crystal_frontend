"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

const POINTS = [
  {
    icon: "warehouse",
    title: "Dedicated warehouse space",
    desc: "Room to stage, consolidate and prepare cargo before it moves.",
  },
  {
    icon: "route",
    title: "Close to airport and port terminals",
    desc: "Short distances keep handovers and cut-off times under control.",
  },
  {
    icon: "container",
    title: "24/7 operations & cargo support",
    desc: "Coordination that keeps working when your shipment does.",
  },
];

/* ------------------------------------------------------------------
 * Continuous background: everything loops forever, kept low-contrast
 * against the dark navy so the text and photo stay easy to read.
 *   - drifting dot grid (depth)
 *   - a slow-turning conic glow behind the whole section (premium sheen)
 *   - three moving colour glows (crimson, sky, amber)
 *   - flowing dashed lines crossing the width, echoing the route motif
 *     used elsewhere on the site but in the facility's own palette
 *   - two scanning light beams, crossing at different speeds/directions
 *   - small particles drifting upward with soft pulsing rings
 * Stops for visitors who prefer reduced motion.
 * ---------------------------------------------------------------- */
const BG_LINES = [
  {
    d: "M -20 100 C 260 20, 520 200, 800 100 S 1280 20, 1500 120",
    color: "#dc2430",
    dash: "8 10",
    speed: 2.6,
  },
  {
    d: "M -20 260 C 280 180, 540 360, 820 260 S 1260 200, 1500 280",
    color: "#38bdf8",
    dash: "2 12",
    speed: 3.2,
  },
  {
    d: "M -20 420 C 260 340, 560 500, 840 410 S 1260 360, 1500 440",
    color: "#fbbf24",
    dash: "12 8",
    speed: 3,
  },
];

const PARTICLES = [
  { left: "6%", size: 7, dur: 20, delay: 0 },
  { left: "16%", size: 5, dur: 25, delay: 5 },
  { left: "26%", size: 9, dur: 18, delay: 9 },
  { left: "37%", size: 6, dur: 23, delay: 2 },
  { left: "48%", size: 5, dur: 27, delay: 12 },
  { left: "58%", size: 8, dur: 19, delay: 6 },
  { left: "68%", size: 6, dur: 24, delay: 15 },
  { left: "78%", size: 9, dur: 21, delay: 3 },
  { left: "88%", size: 6, dur: 26, delay: 10 },
];

function FacilitiesBackground({ reduce }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* slow-turning conic glow, a soft premium sheen behind everything */}
      {!reduce && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 opacity-25"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(220,36,48,0.35) 40deg, transparent 100deg, rgba(56,189,248,0.3) 200deg, transparent 260deg, rgba(251,191,36,0.25) 320deg, transparent 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* drifting dot grid */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 78%)",
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "30px 30px"] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* moving glows */}
      <motion.div
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-crimson/15 blur-3xl sm:h-96 sm:w-96"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 34, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl sm:h-80 sm:w-80"
        animate={reduce ? undefined : { x: [0, -48, 0], y: [0, -28, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl sm:h-72 sm:w-72"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -36, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* flowing dashed lines crossing the whole width */}
      <svg
        viewBox="0 0 1440 540"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        {BG_LINES.map((l, i) => (
          <g key={i}>
            <path
              d={l.d}
              fill="none"
              stroke={l.color}
              strokeOpacity="0.12"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={l.d}
              fill="none"
              stroke={l.color}
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={l.dash}
              vectorEffect="non-scaling-stroke"
              animate={
                reduce
                  ? undefined
                  : {
                      strokeDashoffset: [
                        0,
                        -l.dash.split(" ").reduce((a, n) => a + Number(n), 0),
                      ],
                    }
              }
              transition={{
                duration: l.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}
      </svg>

      {/* two scanning light beams, different speeds and directions */}
      {!reduce && (
        <>
          <motion.div
            className="absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
            initial={{ x: "-140%" }}
            animate={{ x: "500%" }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2.5,
            }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/5 skew-x-12 bg-gradient-to-l from-transparent via-sky-300/[0.08] to-transparent"
            initial={{ x: "140%" }}
            animate={{ x: "-500%" }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 4,
            }}
          />
        </>
      )}

      {/* particles drifting upward, each with a soft pulsing ring */}
      {!reduce &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{ left: p.left, bottom: "-5%" }}
          >
            <motion.span
              className="absolute rounded-sm border border-white/25 bg-white/5"
              style={{ width: p.size, height: p.size }}
              initial={{ y: "0%", opacity: 0, rotate: 0 }}
              animate={{
                y: "-118vh",
                opacity: [0, 0.7, 0.7, 0],
                rotate: 90,
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay,
              }}
            />
            <motion.span
              className="absolute rounded-full border border-crimson/30"
              style={{
                width: p.size * 3,
                height: p.size * 3,
                left: -p.size,
                top: -p.size,
              }}
              initial={{ y: "0%", opacity: 0, scale: 0.6 }}
              animate={{
                y: "-118vh",
                opacity: [0, 0.35, 0.35, 0],
                scale: [0.6, 1.4, 1.4, 0.6],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay + 0.6,
              }}
            />
          </span>
        ))}
    </div>
  );
}

export default function Facilities() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
      <FacilitiesBackground reduce={prefersReducedMotion} />

      <div className="container-content relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div>
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
              Use dedicated air-freight warehouse and CFS capability to stage,
              consolidate, prepare and control cargo.
            </motion.p>

            <div className="mt-8 space-y-3">
              {POINTS.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                  className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-crimson/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-navy-800 text-navy-100 transition-colors duration-300 group-hover:border-crimson/50 group-hover:text-white">
                    <Icon
                      name={point.icon}
                      className="h-5 w-5"
                      strokeWidth={1.4}
                    />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold leading-snug text-white">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-100/65">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="focus-ring mt-8 inline-flex items-center gap-1.5 rounded-full bg-amber-100/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-300 transition-colors duration-300 hover:bg-amber-100/25"
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

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/assets/Home/Facilities/facilities.jpg"
                alt="Container ships alongside quay cranes at a port terminal"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
            </div>

            {/* Offset accent frame behind the photo */}
            <span className="pointer-events-none absolute -bottom-3 -right-3 -z-10 hidden h-full w-full rounded-2xl border border-crimson/30 sm:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
