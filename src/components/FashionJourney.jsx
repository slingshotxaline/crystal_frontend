"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const STAGES = [
  {
    n: "01",
    title: "Raw Materials",
    desc: "Inbound materials and components",
    accent: "border-sky-400 text-sky-600",
    image: {
      src: "/assets/Home/Fashion/fashion1.jpg",
      alt: "Rolls of fabric and raw materials ready for production",
    },
  },
  {
    n: "02",
    title: "Factory Coordination",
    desc: "Production-ready handovers",
    accent: "border-teal-400 text-teal-600",
    image: {
      src: "/assets/Home/Fashion/fashion1.jpg",
      alt: "Garment factory production line",
    },
  },
  {
    n: "03",
    title: "Origin Consolidation",
    desc: "Cargo build and compliance",
    accent: "border-violet-400 text-violet-600",
    image: {
      src: "/assets/Home/Fashion/fashion1.jpg",
      alt: "Warehouse team consolidating cartons between storage racks",
    },
  },
  {
    n: "04",
    title: "Export Movement",
    desc: "Air, ocean or multimodal",
    accent: "border-amber-400 text-amber-600",
    image: {
      src: "/assets/Home/Fashion/fashion1.jpg",
      alt: "Export cargo moving by air and ocean",
    },
  },
  {
    n: "05",
    title: "Destination Services",
    desc: "Discharge, inland and DC",
    accent: "border-pink-400 text-pink-600",
    image: {
      src: "/assets/Home/Fashion/fashion1.jpg",
      alt: "Distribution centre unloading and inland delivery",
    },
  },
  {
    n: "06",
    title: "Store Delivery",
    desc: "Point-of-sale placement",
    accent: "border-emerald-400 text-emerald-600",
    image: {
      src: "/assets/Home/Fashion/fashion1.jpg",
      alt: "Garments on rails in a retail store",
    },
  },
];

// Static lookup so Tailwind's JIT can see every class literally (dynamic col-start-N strings get purged).
const COL_START = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

function Node({ stage, i, prefersReducedMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.25 + i * 0.12,
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white text-xs font-extrabold shadow-card ${stage.accent}`}
    >
      {stage.n}
      {!prefersReducedMotion && (
        <span
          className={`absolute inset-0 -z-10 rounded-full border ${stage.accent} animate-ping opacity-20`}
        />
      )}
    </motion.div>
  );
}

// Stage photo. The parent needs the "group" class for the hover zoom.
function StageImage({ image, aspect = "aspect-[4/3]", sizes, className = "" }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-navy-100 shadow-card ${aspect} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/20 via-transparent to-transparent" />
    </div>
  );
}

function StageText({ stage, textSize = "text-xs" }) {
  return (
    <>
      <p className="text-[15px] font-bold leading-snug text-navy-900">
        {stage.title}
      </p>
      <p className={`mt-1.5 leading-relaxed text-navy-400 ${textSize}`}>
        {stage.desc}
      </p>
    </>
  );
}

export default function FashionJourney() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-crimson/5 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

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

        {/* Desktop / large screens: connected zigzag timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="grid grid-cols-6 grid-rows-[1fr_auto_1fr]">
            {/* Connecting line, spans the node row */}
            <div className="relative col-span-6 row-start-2 h-px">
              <div className="absolute inset-0 bg-navy-100" />
              <motion.div
                className="absolute inset-0 origin-left bg-crimson/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </div>

            {STAGES.map((stage, i) => {
              const isTop = i % 2 === 0;
              return (
                <div key={stage.n} className="contents">
                  {/* Top slot: image above, text next to the node */}
                  <div
                    className={`row-start-1 ${COL_START[i]} flex items-end justify-center px-2 pb-6`}
                  >
                    {isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          delay: 0.1 + i * 0.12,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="group relative w-full max-w-[40rem] text-center"
                      >
                        <StageImage
                          image={stage.image}
                          sizes="160px"
                          className="mb-3"
                        />
                        <StageText stage={stage} />
                      </motion.div>
                    )}
                  </div>

                  {/* Node */}
                  <div
                    className={`row-start-2 ${COL_START[i]} flex justify-center`}
                  >
                    <Node
                      stage={stage}
                      i={i}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>

                  {/* Bottom slot: text next to the node, image below */}
                  <div
                    className={`row-start-3 ${COL_START[i]} flex items-start justify-center px-2 pt-6`}
                  >
                    {!isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          delay: 0.1 + i * 0.12,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="group relative w-full max-w-[40rem] text-center"
                      >
                        <StageText stage={stage} />
                        <StageImage
                          image={stage.image}
                          sizes="160px"
                          className="mt-3"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet / mobile: vertical stepper */}
        <div className="relative mt-14 lg:hidden">
          <div
            className="absolute left-[21px] top-2 w-px bg-navy-100"
            style={{ height: "calc(100% - 16px)" }}
          >
            <motion.div
              className="h-full w-full origin-top bg-crimson/40"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.n}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group relative z-10 flex items-start gap-4 sm:block sm:pl-0"
              >
                <span className="sm:hidden">
                  <Node
                    stage={stage}
                    i={i}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </span>
                <div className="hidden sm:mb-3 sm:inline-flex">
                  <Node
                    stage={stage}
                    i={i}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <StageText stage={stage} textSize="text-sm" />
                  <StageImage
                    image={stage.image}
                    aspect="aspect-[16/9]"
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="mt-4"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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
