"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { OVERVIEW, SCOPE, PO_IMAGES } from "./content";
import { Icon, Reveal, SectionHeading, Stagger, StaggerItem } from "./UI";


const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Route geometry + timeline (seconds)                                 */
/* ------------------------------------------------------------------ */
const WAYPOINTS = [
  { x: 56, y: 176, labelY: 214 },
  { x: 240, y: 72, labelY: 44 },
  { x: 424, y: 176, labelY: 214 },
];
const SEG1 = "M56 176 C 120 176, 170 72, 240 72";
const ROUTE = `${SEG1} C 310 72, 360 176, 424 176`;

// dwell A -> travel -> dwell B -> travel -> dwell C -> loop
const T = {
  travel1: 2.2,
  arriveB: 4.0,
  travel2: 6.2,
  arriveC: 8.0,
  cycle: 10.6,
};
const STARTS = [0, T.arriveB, T.arriveC]; // start time of each step
const TRAIL = [14, 28, 42]; // comet trail spacing along the path

const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

function distanceAt(t, L, lenB) {
  if (t < T.travel1) return 0;
  if (t < T.arriveB)
    return ease((t - T.travel1) / (T.arriveB - T.travel1)) * lenB;
  if (t < T.travel2) return lenB;
  if (t < T.arriveC)
    return lenB + ease((t - T.travel2) / (T.arriveC - T.travel2)) * (L - lenB);
  return L;
}

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

/** Slow rising specks inside the route stage. Positions are fixed (no Math.random)
 *  so server and client markup always match. */
function Specks() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute h-1 w-1 rounded-full bg-white/40"
          style={{
            left: `${(i * 37 + 8) % 96}%`,
            top: `${(i * 53 + 20) % 90}%`,
          }}
          animate={{ y: [0, -28, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 5 + (i % 4),
            delay: (i % 6) * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/** Live shipment route. A parcel travels Order -> Readiness -> Shipment,
 *  pausing at each stop while the text card below follows along.
 *  Hover to pause and tilt the stage; click a stop or tab to jump. */
function FlowDiagram() {
  const reduce = useReducedMotion();
  const steps = OVERVIEW.flow;

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const tRef = useRef(0);
  const pausedRef = useRef(false);

  const pathRef = useRef(null);
  const seg1Ref = useRef(null);
  const overlayRef = useRef(null);
  const markerRef = useRef(null);
  const trailRefs = useRef([]);
  const geo = useRef(null); // { L, lenB }

  // 3D tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });

  useEffect(() => {
    const L = pathRef.current.getTotalLength();
    const lenB = seg1Ref.current.getTotalLength();
    geo.current = { L, lenB };
    overlayRef.current.style.strokeDasharray = `${L} ${L}`;
    overlayRef.current.style.strokeDashoffset = `${L}`;
  }, []);

  const select = (i) => {
    activeRef.current = i;
    tRef.current = STARTS[i];
    setActive(i);
  };

  useAnimationFrame((_, delta) => {
    const g = geo.current;
    if (!g) return;

    if (!reduce && !pausedRef.current) {
      tRef.current = (tRef.current + Math.min(delta, 64) / 1000) % T.cycle;
    }
    const t = reduce ? STARTS[activeRef.current] : tRef.current;

    const idx = t < T.arriveB ? 0 : t < T.arriveC ? 1 : 2;
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }

    const d = distanceAt(t, g.L, g.lenB);
    const fade = reduce
      ? 1
      : t > T.cycle - 0.4
        ? (T.cycle - t) / 0.4
        : t < 0.4
          ? t / 0.4
          : 1;

    overlayRef.current.style.strokeDashoffset = `${g.L - d}`;
    overlayRef.current.style.opacity = `${fade}`;

    const head = pathRef.current.getPointAtLength(d);
    markerRef.current.setAttribute(
      "transform",
      `translate(${head.x} ${head.y})`,
    );
    markerRef.current.setAttribute("opacity", `${fade}`);

    TRAIL.forEach((gap, k) => {
      const el = trailRefs.current[k];
      if (!el) return;
      const p = pathRef.current.getPointAtLength(Math.max(0, d - gap));
      el.setAttribute("cx", p.x);
      el.setAttribute("cy", p.y);
      el.setAttribute("opacity", `${fade * (0.45 - k * 0.13)}`);
    });
  });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry.set(nx * 8);
    rx.set(-ny * 8);
  };
  const onEnter = () => {
    pausedRef.current = true;
  };
  const onLeave = () => {
    pausedRef.current = false;
    rx.set(0);
    ry.set(0);
  };

  const current = steps[active];

  return (
    <Reveal
      x={24}
      y={0}
      className="relative overflow-hidden rounded-2xl bg-cream-100 p-4 sm:p-6"
    >
      {/* {PO_IMAGES.overview && (
        <Image
          src={PO_IMAGES.overview.src}
          alt={PO_IMAGES.overview.alt}
          width={PO_IMAGES.overview.width}
          height={PO_IMAGES.overview.height}
          loading="lazy"
          className="relative mb-5 aspect-[4/3] w-full rounded-xl object-cover"
        />
      )} */}

      <div
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        style={{ perspective: 900 }}
      >
        {/* route stage */}
        <motion.div
          className="relative overflow-hidden rounded-xl bg-navy-900 shadow-xl shadow-navy-900/20"
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        >
          {/* faint grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <Specks />

          <svg
            viewBox="0 0 480 240"
            className="relative block h-auto w-full"
            role="img"
            aria-label="Shipment route from order to readiness to shipment"
          >
            {/* measuring path (hidden) */}
            <path ref={seg1Ref} d={SEG1} fill="none" stroke="none" />

            {/* flowing dashed track */}
            <motion.path
              ref={pathRef}
              d={ROUTE}
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 9"
              animate={reduce ? undefined : { strokeDashoffset: [0, -26] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />

            {/* travelled route */}
            <path
              ref={overlayRef}
              d={ROUTE}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="text-crimson"
            />

            {/* waypoints */}
            {WAYPOINTS.map((w, i) => {
              const isActive = i === active;
              const done = i < active;
              return (
                <g
                  key={i}
                  onClick={() => select(i)}
                  style={{ cursor: "pointer" }}
                  aria-hidden="true"
                >
                  {isActive && !reduce && (
                    <motion.circle
                      key={`ping-${active}`}
                      cx={w.x}
                      cy={w.y}
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-crimson"
                      initial={{ r: 16, opacity: 0.8 }}
                      animate={{ r: 38, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <circle
                    cx={w.x}
                    cy={w.y}
                    r="17"
                    fill="currentColor"
                    stroke={
                      isActive
                        ? "currentColor"
                        : done
                          ? "currentColor"
                          : "rgba(255,255,255,0.35)"
                    }
                    strokeWidth="2"
                    className={
                      done
                        ? "text-crimson"
                        : isActive
                          ? "text-white"
                          : "text-navy-900"
                    }
                    style={{ transition: "all 0.3s" }}
                  />
                  <text
                    x={w.x}
                    y={w.y + 5}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="currentColor"
                    className={isActive ? "text-navy-900" : "text-white"}
                  >
                    {i + 1}
                  </text>
                  <text
                    x={w.x}
                    y={w.labelY}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill="currentColor"
                    className={isActive ? "text-white" : "text-navy-100"}
                    opacity={isActive ? 1 : 0.7}
                  >
                    {steps[i].label}
                  </text>
                </g>
              );
            })}

            {/* comet trail */}
            {TRAIL.map((_, k) => (
              <circle
                key={k}
                ref={(el) => (trailRefs.current[k] = el)}
                r={6 - k * 1.3}
                fill="currentColor"
                className="text-crimson"
                opacity="0"
              />
            ))}

            {/* the parcel */}
            <g ref={markerRef} opacity="0">
              <motion.circle
                r="14"
                fill="currentColor"
                className="text-crimson"
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <circle
                r="8"
                fill="currentColor"
                className="text-crimson"
                stroke="white"
                strokeWidth="2.5"
              />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* step tabs */}
      <div className="mt-4 flex gap-2" role="tablist" aria-label="Order steps">
        {steps.map((item, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <motion.button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(i)}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson ${
                isActive
                  ? "border-navy-900 bg-navy-900 text-white"
                  : done
                    ? "border-crimson/30 bg-crimson/10 text-crimson"
                    : "border-navy-100 bg-white text-navy-500 hover:border-crimson/40"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isActive ? "bg-crimson text-white" : "bg-cream-100"
                }`}
              >
                {i + 1}
              </span>
              <span className="truncate">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* detail card follows the parcel */}
      <div className="relative mt-3 min-h-[5.5rem] overflow-hidden rounded-xl border border-navy-100 bg-white px-5 py-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 right-0 text-6xl font-extrabold leading-none text-navy-100"
            >
              0{active + 1}
            </span>
            <p className="relative text-base font-bold text-navy-900">
              {current.label}
            </p>
            <p className="relative mt-1 text-sm text-navy-500">
              {current.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}



export function Overview() {

    const img = PO_IMAGES.overview;
  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20"
      aria-labelledby="overview-title"
    >
      <AnimatedBackground />

      <div className="container-content relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2
              id="overview-title"
              className="text-2xl font-bold text-navy-900 sm:text-3xl"
            >
              {OVERVIEW.title}
            </h2>
          </Reveal>
          <div className="mt-5 space-y-4 text-navy-500">
            {OVERVIEW.paragraphs.map((p, i) => (
              <Reveal key={i} as="p" delay={0.1 + i * 0.12}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
        <FlowDiagram />
      </div>

      <section className="pt-16 sm:pt-20" aria-label="Purchase order overview image ">
        <div className="container-content">
          <figure className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="aspect-[21/9] w-full object-cover"
            />
         
          </figure>
        </div>
      </section>
    </section>
  );
}



/** Selectable activity card: cursor spotlight, 3D tilt, floating icon,
 *  accent bar, and an animated check when selected. */
function ScopeCard({ item, index, selected, onToggle }) {
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
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border p-6 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson ${
        selected
          ? "border-navy-900 bg-navy-900 shadow-xl shadow-navy-900/25"
          : "border-navy-100 bg-white hover:border-crimson/30 hover:shadow-lg hover:shadow-navy-900/10"
      }`}
    >
      {/* accent bar */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 origin-left bg-crimson transition-transform duration-500 group-hover:scale-x-100 ${
          selected ? "scale-x-100" : "scale-x-0"
        }`}
      />

      {/* cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: selected
            ? "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 70%)"
            : "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(220,38,38,0.10), transparent 70%)",
        }}
      />

      {/* idle sheen */}
      {!reduce && !selected && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-navy-900/[0.04] to-transparent"
          animate={{ x: ["0%", "400%"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 6,
            delay: index * 1.5,
            ease: "easeInOut",
          }}
        />
      )}

      {/* selection badge */}
      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center">
        {selected && !reduce && (
          <motion.span
            key="burst"
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-crimson"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
        <span
          className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
            selected
              ? "border-crimson bg-crimson"
              : "border-navy-100 bg-white group-hover:border-crimson/50"
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <motion.path
              d="m5 12.5 4.5 4.5L19 7.5"
              initial={false}
              animate={{
                pathLength: selected ? 1 : 0,
                opacity: selected ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </svg>
        </span>
      </span>

      {/* icon (floats gently) */}
      <motion.span
        className="relative inline-flex self-start"
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{
          duration: 3.2,
          delay: index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
            selected ? "bg-crimson" : "bg-navy-900"
          }`}
        >
          <Icon name={item.icon} />
        </span>
      </motion.span>

      <span
        className={`relative mt-5 block text-base font-bold transition-colors duration-300 ${
          selected ? "text-white" : "text-navy-900"
        }`}
      >
        {item.title}
      </span>
      <span
        className={`relative mt-2 block text-sm transition-colors duration-300 ${
          selected ? "text-navy-100" : "text-navy-500"
        }`}
      >
        {item.text}
      </span>

      <span
        className={`relative mt-auto block pt-5 text-sm font-semibold transition-colors duration-300 ${
          selected ? "text-white" : "text-crimson"
        }`}
      >
        {selected ? "Selected" : "Select"}
      </span>
    </motion.button>
  );
}

export function Scope() {
  const reduce = useReducedMotion();
  const items = SCOPE.items;
  const total = items.length;
  const [selected, setSelected] = useState([]);
  const count = selected.length;
  const allOn = count === total;

  const toggle = (title) =>
    setSelected((s) =>
      s.includes(title) ? s.filter((t) => t !== title) : [...s, title],
    );

  return (
    <section
      className="relative overflow-hidden bg-cream-100 py-16 sm:py-20"
      aria-labelledby="scope-title"
    >
      <AnimatedBackground />

      <div className="container-content relative z-10">
        <SectionHeading title={SCOPE.title} intro={SCOPE.intro} />

        <Stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {items.map((item, i) => (
            <StaggerItem key={item.title} className="h-full">
              <ScopeCard
                item={item}
                index={i}
                selected={selected.includes(item.title)}
                onToggle={() => toggle(item.title)}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex flex-col gap-5 rounded-xl bg-navy-900 p-6 text-sm text-navy-100 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <motion.span
              className="mt-1 h-10 w-0.5 shrink-0 bg-crimson"
              aria-hidden="true"
              animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <p>{SCOPE.note}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <div className="flex w-28 gap-1.5" aria-hidden="true">
              {items.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
                >
                  <motion.span
                    className="block h-full origin-left rounded-full bg-crimson"
                    initial={false}
                    animate={{ scaleX: i < count ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                </span>
              ))}
            </div>
            <p className="whitespace-nowrap tabular-nums" aria-live="polite">
              <motion.span
                key={count}
                className="inline-block font-bold text-white"
                initial={reduce ? false : { y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {count}
              </motion.span>{" "}
              of {total} selected
            </p>
            <button
              type="button"
              onClick={() =>
                setSelected(allOn ? [] : items.map((it) => it.title))
              }
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-crimson hover:bg-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            >
              {allOn ? "Clear" : "Select all"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
