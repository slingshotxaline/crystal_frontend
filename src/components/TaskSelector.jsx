"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

const TASKS = [
  {
    title: "Move urgent or high-value cargo by air",
    href: "/services/air-freight",
    icon: "plane",
    image: {
      src: "/assets/Home/Task/task1.jpg",
      alt: "Cargo aircraft being loaded on the airport apron",
    },
    theme: {
      badge: "bg-sky-100 text-sky-600",
      bar: "bg-sky-500",
      blob: "bg-sky-400/25",
      border: "group-hover:border-sky-400",
      glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(14,165,233,0.45)]",
      arrow: "group-hover:border-sky-500 group-hover:bg-sky-500",
    },
  },
  {
    title: "Plan FCL, LCL or buyer consolidation by ocean",
    href: "/services/ocean-freight",
    icon: "ship",
    image: {
      src: "/assets/Home/Task/task2.webp",
      alt: "Container port with stacked shipping containers and cranes",
    },
    theme: {
      badge: "bg-teal-100 text-teal-600",
      bar: "bg-teal-500",
      blob: "bg-teal-400/25",
      border: "group-hover:border-teal-400",
      glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(20,184,166,0.45)]",
      arrow: "group-hover:border-teal-500 group-hover:bg-teal-500",
    },
  },
  {
    title: "Combine modes for cost, time or capacity reasons",
    href: "/services/multimodal-logistics",
    icon: "route",
    image: {
      src: "/assets/Home/Task/task1.jpg",
      alt: "Multimodal logistics with plane, ship and truck transport",
    },
    theme: {
      badge: "bg-violet-100 text-violet-600",
      bar: "bg-violet-500",
      blob: "bg-violet-400/25",
      border: "group-hover:border-violet-400",
      glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.45)]",
      arrow: "group-hover:border-violet-500 group-hover:bg-violet-500",
    },
  },
  {
    title: "Coordinate factory pickup, customs and inland delivery",
    href: "/services/inland-customs",
    icon: "truck",
    image: {
      src: "/assets/Home/Task/task2.webp",
      alt: "Cargo truck collecting goods for inland delivery",
    },
    theme: {
      badge: "bg-amber-100 text-amber-600",
      bar: "bg-amber-500",
      blob: "bg-amber-400/25",
      border: "group-hover:border-amber-400",
      glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.45)]",
      arrow: "group-hover:border-amber-500 group-hover:bg-amber-500",
    },
  },
  {
    title: "Manage fashion cargo / GOH",
    href: "/services/fashion-goh",
    icon: "hanger",
    image: {
      src: "/assets/Home/Task/task1.jpg",
      alt: "Garments on hangers ready for goods-on-hanger shipping",
    },
    theme: {
      badge: "bg-pink-100 text-pink-600",
      bar: "bg-pink-500",
      blob: "bg-pink-400/25",
      border: "group-hover:border-pink-400",
      glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(236,72,153,0.45)]",
      arrow: "group-hover:border-pink-500 group-hover:bg-pink-500",
    },
  },
  {
    title: "Plan oversized or complex cargo",
    href: "/services/project-logistics",
    icon: "crane",
    image: {
      src: "/assets/Home/Task/task2.webp",
      alt: "Heavy-lift crane handling oversized project cargo",
    },
    theme: {
      badge: "bg-emerald-100 text-emerald-600",
      bar: "bg-emerald-500",
      blob: "bg-emerald-400/25",
      border: "group-hover:border-emerald-400",
      glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(16,185,129,0.45)]",
      arrow: "group-hover:border-emerald-500 group-hover:bg-emerald-500",
    },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.92, rotate: -1.5 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.07,
      type: "spring",
      stiffness: 220,
      damping: 20,
    },
  }),
};

export default function TaskSelector() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      {/* Ambient multi-color background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-crimson"
        >
          Start with the shipment
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          What does this shipment need to do?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Choose the requirement closest to yours. We&rsquo;ll point you to the
          relevant service and what to prepare next.
        </motion.p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TASKS.map((task, i) => {
            const t = task.theme;
            return (
              <motion.div
                key={task.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="h-full"
              >
                <Link
                  href={task.href}
                  className={`focus-ring group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-navy-100 bg-white p-6 shadow-card transition-all duration-300 ${t.border} ${t.glow}`}
                >
                  {/* Top accent bar */}
                  <span
                    className={`absolute inset-x-0 top-0 h-1 ${t.bar} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* Corner glow blob */}
                  <span
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${t.blob} blur-2xl transition-transform duration-500 group-hover:scale-125`}
                  />

                  {/* Header row: icon badge (left) + arrow button (right) */}
                  <div className="relative z-10 flex items-start justify-between">
                    <motion.span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${t.badge}`}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { rotate: [0, -10, 10, -6, 0], scale: 1.1 }
                      }
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Icon name={task.icon} className="h-5 w-5" />
                    </motion.span>

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy-200 bg-white text-navy-800 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white ${t.arrow}`}
                    >
                      <Icon
                        name="arrowRight"
                        className="h-4 w-4"
                        strokeWidth={2}
                      />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 mt-4 flex-1 text-[15px] font-semibold leading-snug text-navy-900">
                    {task.title}
                  </h3>

                  {/* Image below the title */}
                  {task.image && (
                    <div className="relative z-10 mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <Image
                        src={task.image.src}
                        alt={task.image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent" />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/quote"
            className="focus-ring group relative mt-6 flex items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-navy-200 bg-white py-4 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:border-crimson hover:text-crimson"
          >
            <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-crimson/5 via-transparent to-sky-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            Not sure? Start a general quote request
            <Icon
              name="arrowRight"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
