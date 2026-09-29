"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { WORKFLOW, VALUE } from "./content";
import { SectionHeading, Stagger, StaggerItem, Icon } from "./UI";

const EASE = [0.22, 1, 0.36, 1];

/** Continuous decorative background. Sits ON TOP of the section's own bg color,
 *  so the existing colors (bg-white / bg-cream-100) stay exactly as they are. */
function AnimatedBackground() {
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
        className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-crimson/10 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }
        }
        transition={loop(16)}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-navy-900/10 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -70, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }
        }
        transition={loop(18, 2)}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-crimson/5 blur-3xl"
        animate={
          reduce ? undefined : { x: [-40, 40, -40], opacity: [0.5, 1, 0.5] }
        }
        transition={loop(12, 1)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Workflow                                                            */
/* ------------------------------------------------------------------ */

/** One step. Unreached = outlined, reached = navy, current (centre of the
 *  viewport) = crimson with a pulsing ring. */
function Step({ step, index }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const current = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const [reached, setReached] = useState(false);

  useEffect(() => {
    if (current) setReached(true);
  }, [current]);

  return (
    <li
      ref={ref}
      className="relative grid gap-4 md:grid-cols-[minmax(0,1fr),minmax(0,1.5fr)] md:gap-10"
    >
      <div className="flex items-center gap-5">
        <motion.span
          className="relative z-10 shrink-0"
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          {current && !reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-lg border-2 border-crimson/60"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span
            animate={{ scale: current ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`relative flex h-12 w-12 items-center justify-center rounded-lg border-2 text-sm font-bold ring-4 ring-white transition-colors duration-500 ${
              current
                ? "border-crimson bg-crimson text-white"
                : reached
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-100 bg-white text-navy-500"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </motion.span>
        <h3
          className={`text-lg font-bold transition-colors duration-500 ${
            current ? "text-crimson-700" : "text-navy-900"
          }`}
        >
          {step.title}
        </h3>
      </div>

      <motion.div
        className="pl-[68px] md:pl-0"
        initial={reduce ? false : { opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
      >
        <div
          className={`group relative overflow-hidden rounded-xl border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/10 ${
            current
              ? "border-crimson/40 shadow-lg shadow-navy-900/10"
              : "border-navy-100"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 left-0 w-1 origin-top bg-crimson transition-transform duration-500 group-hover:scale-y-100 ${
              current ? "scale-y-100" : "scale-y-0"
            }`}
          />
          <p className="text-navy-500">{step.text}</p>
        </div>
      </motion.div>
    </li>
  );
}

export function Workflow() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      id={WORKFLOW.id}
      className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-20"
      aria-labelledby="workflow-title"
    >
      <AnimatedBackground />

      <div className="container-content relative z-10">
        <SectionHeading title={WORKFLOW.title} intro={WORKFLOW.intro} />

        <ol ref={listRef} className="relative mt-12 space-y-10">
          {/* track, scroll-fill and travelling lights, centred behind the badges */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[23px] top-6 w-0.5 bg-navy-100"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-crimson"
              style={{ scaleY: reduce ? 1 : fill }}
            />
            {!reduce &&
              [0, 2.4].map((delay) => (
                <motion.span
                  key={delay}
                  className="absolute -left-[3px] h-2 w-2 rounded-full bg-crimson shadow-[0_0_10px_2px_rgba(220,38,38,0.6)]"
                  initial={{ top: "0%", opacity: 0 }}
                  animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 4.8,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
          </span>

          {WORKFLOW.steps.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value                                                               */
/* ------------------------------------------------------------------ */

/** Value card: cursor spotlight, 3D tilt, orbiting ring around a floating icon,
 *  and an accent bar on hover. */
function ValueCard({ item, index }) {
  const reduce = useReducedMotion();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useSpring(tx, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(ty, { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
    if (!reduce) {
      ty.set((x / r.width - 0.5) * 8);
      tx.set(-(y / r.height - 0.5) * 8);
    }
  };
  const onLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative h-full overflow-hidden rounded-xl border border-navy-100 bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-crimson/30 hover:shadow-xl hover:shadow-navy-900/10"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(220,38,38,0.10), transparent 70%)",
        }}
      />
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-navy-900/[0.04] to-transparent"
          animate={{ x: ["0%", "400%"] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 6,
            delay: index * 1.6,
            ease: "easeInOut",
          }}
        />
      )}

      {/* floating icon with an orbiting dashed ring */}
      <motion.span
        className="relative inline-flex h-16 w-16 items-center justify-center"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{
          duration: 3.4,
          delay: index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-dashed border-crimson/40"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-crimson/10 text-crimson-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-crimson group-hover:text-white">
          <Icon name={item.icon} className="h-6 w-6" />
        </span>
      </motion.span>

      <h3 className="relative mt-5 text-lg font-bold text-navy-900">
        {item.title}
      </h3>
      <p className="relative mt-2 text-navy-500">{item.text}</p>
    </motion.div>
  );
}

export function Value() {
  return (
    <section
      className="relative overflow-hidden bg-cream-100 py-16 sm:py-20"
      aria-labelledby="value-title"
    >
      <AnimatedBackground />

      <div className="container-content relative z-10">
        <SectionHeading title={VALUE.title} />

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.14}>
          {VALUE.items.map((item, i) => (
            <StaggerItem key={item.title} className="h-full">
              <ValueCard item={item} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
