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

export default function Facilities() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-crimson/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl sm:h-80 sm:w-80" />
      </div>

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
