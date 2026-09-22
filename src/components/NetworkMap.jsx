"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const LEGEND = [
  { label: "Crystal Office", color: "#dc2430" },
  { label: "Joint Venture", color: "#16283f" },
  { label: "Regional Group Operation", color: "#5c6672" },
  { label: "Network Partner / Planned", color: "#aab2bc" },
];

// x / y are percentages of the map container (0-100), reused directly as the SVG
// coordinate space below (viewBox is also 0-100), so pins and lines always line up.
const HUB = { name: "Bangladesh", x: 44, y: 58, color: "#dc2430" };
const NODES = [
  HUB,
  { name: "Pakistan", x: 24, y: 52, color: "#16283f" },
  { name: "Myanmar", x: 56, y: 60, color: "#aab2bc" },
  { name: "Cambodia", x: 68, y: 65, color: "#aab2bc" },
  { name: "Indonesia / India", x: 52, y: 75, color: "#16283f" },
];

function quadPoint(t, p0, p1, p2) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

function useLinks() {
  return useMemo(
    () =>
      NODES.filter((n) => n !== HUB).map((node) => {
        const p0 = { x: HUB.x, y: HUB.y };
        const p2 = { x: node.x, y: node.y };
        const dx = p2.x - p0.x;
        const dy = p2.y - p0.y;
        const mid = { x: (p0.x + p2.x) / 2, y: (p0.y + p2.y) / 2 };
        const p1 = { x: mid.x - dy * 0.18, y: mid.y + dx * 0.18 };
        const d = `M${p0.x} ${p0.y} Q ${p1.x} ${p1.y}, ${p2.x} ${p2.y}`;
        const steps = 20;
        const xs = [];
        const ys = [];
        for (let i = 0; i <= steps; i++) {
          const p = quadPoint(i / steps, p0, p1, p2);
          xs.push(p.x);
          ys.push(p.y);
        }
        return { target: node, d, xs, ys };
      }),
    []
  );
}

// A quiet, evenly-spaced dot texture used as the map backdrop rather than a literal
// coastline illustration — swap this layer for a real map image if one is available.
const DOTS = (() => {
  const out = [];
  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 26; col++) {
      out.push({ x: (col / 25) * 100, y: (row / 10) * 100 });
    }
  }
  return out;
})();

export default function NetworkMap() {
  const prefersReducedMotion = useReducedMotion();
  const links = useLinks();
  const [activeColor, setActiveColor] = useState(null);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-16 sm:py-20">
      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Network
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          Local execution connected to the markets your cargo needs.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Crystal&rsquo;s Bangladesh teams coordinate with approved regional
          operations, group entities, carriers and international agents. Each
          location shows who operates it and what it can support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
        >
          {LEGEND.map((item) => {
            const isActive = activeColor === item.color;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveColor(isActive ? null : item.color)}
                className={`focus-ring flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-navy-900 text-white"
                    : "text-navy-700 hover:bg-navy-100"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card sm:aspect-[21/9]"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="network-glow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dot-grid backdrop */}
            {DOTS.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={0.35}
                fill="#16283f"
                opacity={0.08}
              />
            ))}

            {/* Connection lines */}
            {links.map((link, i) => (
              <g key={link.target.name}>
                <motion.path
                  d={link.d}
                  fill="none"
                  stroke="#dc2430"
                  strokeOpacity={0.3}
                  strokeWidth={0.35}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.15,
                    ease: "easeInOut",
                  }}
                />
                {!prefersReducedMotion && (
                  <motion.circle
                    r={0.7}
                    fill="#dc2430"
                    filter="url(#network-glow)"
                    animate={{
                      cx: link.xs,
                      cy: link.ys,
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      delay: 1.4 + i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "linear",
                    }}
                  />
                )}
              </g>
            ))}
          </svg>

          {/* Pins */}
          {NODES.map((node, i) => {
            const isHub = node === HUB;
            const dimmed = activeColor && node.color !== activeColor;
            return (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, scale: 0.4, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                animate={
                  dimmed
                    ? { opacity: 0.3, scale: 0.92 }
                    : { opacity: 1, scale: 1 }
                }
                transition={{
                  delay: isHub ? 0.2 : 0.5 + i * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="flex flex-col items-center">
                  <span className="mb-1 whitespace-nowrap rounded-md border border-navy-100 bg-white px-2.5 py-1 text-center text-[11px] font-semibold text-navy-900 shadow-card">
                    {node.name}
                  </span>
                  <span className="-mt-1 h-1.5 w-1.5 rotate-45 border-b border-r border-navy-100 bg-white" />
                  <span className="relative -mt-2.5 flex h-3.5 w-3.5 items-center justify-center">
                    {isHub && !prefersReducedMotion && (
                      <motion.span
                        className="absolute h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: node.color }}
                        animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                    <span
                      className="relative h-2.5 w-2.5 rounded-full ring-2 ring-white"
                      style={{ backgroundColor: node.color }}
                    />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/network"
            className="focus-ring group mt-6 inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
          >
            Explore Full Network
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
