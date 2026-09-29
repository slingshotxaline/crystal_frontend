"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const STEP_MS = 5000; // how long each stage stays in the spotlight

// `accent` = active node ring/number, `bar` = accent fill, `num` = ghost numeral colour.
// Kept as literal strings so Tailwind's JIT can see every class.
const STAGES = [
  {
    n: "01",
    title: "Raw Materials",
    desc: "Inbound materials and components",
    accent: "border-sky-400 text-sky-600",
    bar: "bg-sky-400",
    num: "text-sky-600",
    image: {
      src: "/assets/Home/Fashion/fashionraw.jpg",
      alt: "Rolls of fabric and raw materials ready for production",
    },
  },
  {
    n: "02",
    title: "Factory Coordination",
    desc: "Production-ready handovers",
    accent: "border-teal-400 text-teal-600",
    bar: "bg-teal-400",
    num: "text-teal-600",
    image: {
      src: "/assets/Home/Fashion/fashionCoordination.jpg",
      alt: "Garment factory production line",
    },
  },
  {
    n: "03",
    title: "Origin Consolidation",
    desc: "Cargo build and compliance",
    accent: "border-violet-400 text-violet-600",
    bar: "bg-violet-400",
    num: "text-violet-600",
    image: {
      src: "/assets/Home/Fashion/fashionOrigin.jpg",
      alt: "Warehouse team consolidating cartons between storage racks",
    },
  },
  {
    n: "04",
    title: "Export Movement",
    desc: "Air, ocean or multimodal",
    accent: "border-amber-400 text-amber-600",
    bar: "bg-amber-400",
    num: "text-amber-600",
    image: {
      src: "/assets/Home/Fashion/fashionExport.jpg",
      alt: "Export cargo moving by air and ocean",
    },
  },
  {
    n: "05",
    title: "Destination Services",
    desc: "Discharge, inland and DC",
    accent: "border-pink-400 text-pink-600",
    bar: "bg-pink-400",
    num: "text-pink-600",
    image: {
      src: "/assets/Home/Fashion/fashionDestination.jpg",
      alt: "Distribution centre unloading and inland delivery",
    },
  },
  {
    n: "06",
    title: "Store Delivery",
    desc: "Point-of-sale placement",
    accent: "border-emerald-400 text-emerald-600",
    bar: "bg-emerald-400",
    num: "text-emerald-600",
    image: {
      src: "/assets/Home/Fashion/fashionStore.jpg",
      alt: "Garments on rails in a retail store",
    },
  },
];

const Chevron = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 5 7 7-7 7" />
  </svg>
);

/** Slow drifting colour behind the section. Sits ON TOP of the section's own
 *  bg-cream, so the existing background colour is unchanged. */
function AmbientBackground() {
  const reduce = useReducedMotion();
  const loop = (duration, delay = 0) => ({
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut",
  });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.10) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-crimson/5 blur-3xl sm:h-80 sm:w-80"
        animate={
          reduce
            ? undefined
            : { x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }
        }
        transition={loop(16)}
      />
      <motion.div
        className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl sm:h-72 sm:w-72"
        animate={
          reduce
            ? undefined
            : { x: [0, -70, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }
        }
        transition={loop(18, 2)}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-52 w-52 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl"
        animate={
          reduce ? undefined : { x: [-50, 50, -50], opacity: [0.4, 1, 0.4] }
        }
        transition={loop(13, 1)}
      />
    </div>
  );
}

/** All six stages are always visible as photo panels. The active panel widens
 *  (rows on desktop, stacked rows on mobile) and reveals its story; the
 *  spotlight moves on by itself and can be clicked. */
export default function FashionJourney() {
  const reduce = useReducedMotion();
  const total = STAGES.length;

  const rootRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.25 });
  const inViewRef = useRef(false);
  inViewRef.current = inView;

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const progress = useMotionValue(0); // 0..1 within the current stage

  const select = (i) => {
    const n = (i + total) % total;
    activeRef.current = n;
    progress.set(0);
    setActive(n);
  };

  useAnimationFrame((_, delta) => {
    if (reduce || pausedRef.current || !inViewRef.current) return;
    const p = progress.get() + Math.min(delta, 64) / STEP_MS;
    if (p >= 1) select(activeRef.current + 1);
    else progress.set(p);
  });

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <section ref={rootRef} className="relative bg-cream py-16 sm:py-20">
      <AmbientBackground />

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Contract Logistics
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-navy-900 sm:text-4xl"
        >
          A coordinated apparel journey from factory readiness to international
          delivery.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 max-w-2xl text-navy-400"
        >
          We connect supplier readiness, cargo preparation, hanging-garment
          handling, consolidation and export movement through one origin plan.
        </motion.p>

        <ol
          className="mt-12 flex flex-col gap-3 lg:flex-row"
          aria-label="Journey stages"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          {STAGES.map((s, i) => {
            const isActive = i === active;
            const last = i === total - 1;
            return (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className={`relative min-w-0 transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-[440px] ${
                  isActive
                    ? "h-72 sm:h-80 lg:flex-[3.6_1_0%]"
                    : "h-20 lg:flex-[1_1_0%]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Stage ${s.n}: ${s.title}`}
                  aria-current={isActive ? "step" : undefined}
                  className="group focus-ring relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-navy-100 text-left shadow-card"
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className={`object-cover transition-transform duration-[1400ms] ease-out ${
                      isActive ? "scale-105" : "scale-100 group-hover:scale-105"
                    }`}
                  />

                  {/* dark veil when collapsed, soft gradient when open */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 bg-navy-900/60 transition-opacity duration-700 group-hover:bg-navy-900/45 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* stage number */}
                  <span
                    className={`absolute left-4 transition-all duration-500 ${
                      isActive
                        ? "top-4"
                        : "top-1/2 -translate-y-1/2 lg:top-4 lg:translate-y-0"
                    }`}
                  >
                    {isActive && !reduce && (
                      <motion.span
                        key={`ring-${active}`}
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full border-2 ${s.accent}`}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                    <span
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-xs font-extrabold shadow-card ${s.accent}`}
                    >
                      {s.n}
                    </span>
                  </span>

                  {/* collapsed title: beside the number on mobile, vertical on desktop */}
                  {!isActive && (
                    <>
                      <span className="absolute inset-y-0 left-[4.5rem] right-4 flex items-center text-sm font-semibold text-white lg:hidden">
                        {s.title}
                      </span>
                      <span className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rotate-180 text-sm font-semibold tracking-wide text-white [writing-mode:vertical-rl] lg:block">
                        {s.title}
                      </span>
                    </>
                  )}

                  {/* open panel: ghost numeral + story card + time bar */}
                  {isActive && (
                    <>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1 hidden select-none text-7xl font-extrabold leading-none text-white/25 sm:block"
                      >
                        {s.n}
                      </span>
                      <motion.span
                        className="absolute inset-x-0 bottom-0 block p-4 sm:p-5"
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                      >
                        <span className="block rounded-xl bg-white/90 p-4 backdrop-blur">
                          <span
                            className={`block h-1 w-10 rounded-full ${s.bar}`}
                          />
                          <span className="mt-3 block text-lg font-bold leading-snug text-navy-900">
                            {s.title}
                          </span>
                          <span className="mt-1 block text-sm text-navy-400">
                            {s.desc}
                          </span>
                        </span>
                      </motion.span>
                      {!reduce && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-1 bg-white/25"
                        >
                          <motion.span
                            className="block h-full origin-left bg-crimson"
                            style={{ scaleX: progress }}
                          />
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* flow arrow sitting in the gap to the next stage */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[18px] top-1/2 z-20 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-crimson shadow-card lg:flex"
                  >
                    <motion.span
                      className="flex"
                      animate={reduce ? undefined : { x: [0, 2, 0] }}
                      transition={{
                        duration: 1.4,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Chevron />
                    </motion.span>
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/services/fashion-goh"
            className="focus-ring group mt-12 inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
          >
            Explore Contract Logistics
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
