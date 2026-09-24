"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";
import { services } from "@/data/services";

// Cycled by index so the grid stays colorful regardless of how many
// services the data file defines, without hardcoding per-slug themes.
const THEMES = [
  {
    badge: "bg-sky-100 text-sky-600",
    bar: "bg-sky-500",
    blob: "bg-sky-400/25",
    tint: "bg-sky-50",
    border: "group-hover:border-sky-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(14,165,233,0.4)]",
  },
  {
    badge: "bg-teal-100 text-teal-600",
    bar: "bg-teal-500",
    blob: "bg-teal-400/25",
    tint: "bg-teal-50",
    border: "group-hover:border-teal-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(20,184,166,0.4)]",
  },
  {
    badge: "bg-violet-100 text-violet-600",
    bar: "bg-violet-500",
    blob: "bg-violet-400/25",
    tint: "bg-violet-50",
    border: "group-hover:border-violet-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.4)]",
  },
  {
    badge: "bg-amber-100 text-amber-600",
    bar: "bg-amber-500",
    blob: "bg-amber-400/25",
    tint: "bg-amber-50",
    border: "group-hover:border-amber-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.4)]",
  },
  {
    badge: "bg-pink-100 text-pink-600",
    bar: "bg-pink-500",
    blob: "bg-pink-400/25",
    tint: "bg-pink-50",
    border: "group-hover:border-pink-400",
    glow: "group-hover:shadow-[0_20px_45px_-15px_rgba(236,72,153,0.4)]",
  },
  {
    badge: "bg-emerald-100 text-emerald-600",
    bar: "bg-emerald-500",
    blob: "bg-emerald-400/25",
    tint: "bg-emerald-50",
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

/* ---------- Shared pieces ---------- */

// Tried in this order until one loads: /public/assets/Home/Services/<slug>.<ext>
const IMAGE_EXTENSIONS = ["webp", "jpg", "jpeg", "png"];

function Photo({ service, sizes }) {
  const [extIndex, setExtIndex] = useState(0);
  const ext = IMAGE_EXTENSIONS[extIndex];

  // No matching file found: plain placeholder so the card doesn't break
  if (!ext) {
    return <span className="absolute inset-0 bg-navy-100" />;
  }

  return (
    <Image
      key={ext}
      src={`/assets/Home/Services/${service.slug}.${ext}`}
      alt=""
      fill
      sizes={sizes}
      onError={() => setExtIndex((i) => i + 1)}
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

function Badge({ service, theme, reduce, className = "" }) {
  return (
    <motion.span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${theme.badge} ${className}`}
      whileHover={
        reduce ? undefined : { rotate: [0, -10, 10, -6, 0], scale: 1.1 }
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Icon name={service.icon} className="h-5 w-5" />
    </motion.span>
  );
}

function Cta({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-300 ${className}`}
    >
      See how it works
      <Icon
        name="arrowRight"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={2}
      />
    </span>
  );
}

function TopBar({ theme }) {
  return (
    <span
      className={`absolute inset-x-0 top-0 z-20 h-1 ${theme.bar} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
    />
  );
}

/* ---------- Layouts ---------- */

// 1. Large hero: full-bleed photo, text over a dark gradient
function OverlayCard({ service, theme, reduce }) {
  return (
    <>
      <Photo service={service} sizes="(min-width: 1024px) 66vw, 100vw" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/10" />
      <TopBar theme={theme} />
      <div className="relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-8">
        <Badge service={service} theme={theme} reduce={reduce} />
        <div>
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {service.tagline}
          </span>
          <h3 className="mt-3 max-w-md text-2xl font-bold text-white sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75">
            {service.cardDescription}
          </p>
          <Cta className="mt-4 text-white" />
        </div>
      </div>
    </>
  );
}

// 2. Photo on top, icon badge overlapping the photo edge
function StackedCard({ service, theme, reduce }) {
  return (
    <>
      <TopBar theme={theme} />
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Photo service={service} sizes="(min-width: 1024px) 33vw, 100vw" />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
      </div>
      <div className="relative flex flex-1 flex-col p-6 pt-8">
        <Badge
          service={service}
          theme={theme}
          reduce={reduce}
          className="absolute -top-6 left-6 border-4 border-white shadow-card"
        />
        <h3 className="text-[15px] font-bold text-navy-900">{service.title}</h3>
        <p className="mt-1 text-xs font-semibold text-crimson">
          {service.tagline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-400">
          {service.cardDescription}
        </p>
        <Cta className="mt-auto pt-4 text-navy-900 group-hover:text-crimson" />
      </div>
    </>
  );
}

// 3. Text on top, photo below with a slanted top edge
function SlantCard({ service, theme, reduce }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${theme.blob} blur-2xl transition-transform duration-500 group-hover:scale-125`}
      />
      <TopBar theme={theme} />
      <div className="relative z-10 p-6 pb-4">
        <Badge service={service} theme={theme} reduce={reduce} />
        <h3 className="mt-4 text-[15px] font-bold text-navy-900">
          {service.title}
        </h3>
        <p className="mt-1 text-xs font-semibold text-crimson">
          {service.tagline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-400">
          {service.cardDescription}
        </p>
      </div>
      <div className="relative min-h-[11rem] flex-1 [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)]">
        <Photo service={service} sizes="(min-width: 1024px) 33vw, 100vw" />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
        <Cta className="absolute bottom-4 left-6 z-10 text-white" />
      </div>
    </>
  );
}

// 4. Wide card: text left, photo right with a diagonal cut
function SplitCard({ service, theme, reduce }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full ${theme.blob} blur-2xl transition-transform duration-500 group-hover:scale-125`}
      />
      <TopBar theme={theme} />
      <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 md:w-[55%] md:shrink-0">
        <Badge service={service} theme={theme} reduce={reduce} />
        <h3 className="mt-4 text-lg font-bold text-navy-900 sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-1 text-xs font-semibold text-crimson">
          {service.tagline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-400">
          {service.cardDescription}
        </p>
        <Cta className="mt-4 text-navy-900 group-hover:text-crimson" />
      </div>
      <div className="relative min-h-[14rem] flex-1 md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
        <Photo service={service} sizes="(min-width: 1024px) 40vw, 100vw" />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent" />
      </div>
    </>
  );
}

// 5. Tinted card, photo in a leaf-shaped frame with the badge on its corner
function LeafCard({ service, theme, reduce }) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-bl-xl rounded-br-[3rem] rounded-tl-[3rem] rounded-tr-xl">
          <Photo service={service} sizes="(min-width: 1024px) 50vw, 100vw" />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent" />
        </div>
        <Badge
          service={service}
          theme={theme}
          reduce={reduce}
          className="absolute -bottom-5 right-6 z-10 border-4 border-white shadow-card"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-7">
        <h3 className="text-[15px] font-bold text-navy-900">{service.title}</h3>
        <p className="mt-1 text-xs font-semibold text-crimson">
          {service.tagline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-400">
          {service.cardDescription}
        </p>
        <Cta className="mt-auto pt-4 text-navy-900 group-hover:text-crimson" />
      </div>
    </div>
  );
}

// 6. Full-bleed photo, details slide up on hover (always visible on touch screens)
function RevealCard({ service, theme, reduce }) {
  return (
    <>
      <Photo service={service} sizes="(min-width: 1024px) 50vw, 100vw" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent" />
      <TopBar theme={theme} />
      <div className="relative z-10 mt-auto p-6">
        <div className="flex items-center gap-3">
          <Badge service={service} theme={theme} reduce={reduce} />
          <h3 className="text-[15px] font-bold text-white sm:text-lg">
            {service.title}
          </h3>
        </div>
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-focus-visible:grid-rows-[1fr] lg:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-3 text-xs font-semibold text-amber-300">
              {service.tagline}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/80">
              {service.cardDescription}
            </p>
            <Cta className="mt-3 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}

// 7. Dark navy card, arch-shaped photo with the badge on its bottom edge
function ArchCard({ service, theme, reduce }) {
  return (
    <>
      <TopBar theme={theme} />
      <div className="flex flex-1 flex-col p-4 pt-5">
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-lg rounded-t-[5rem] border border-white/10">
            <Photo service={service} sizes="(min-width: 1024px) 33vw, 100vw" />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
          </div>
          <Badge
            service={service}
            theme={theme}
            reduce={reduce}
            className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 border-4 border-navy-900"
          />
        </div>
        <div className="flex flex-1 flex-col items-center px-2 pb-2 pt-8 text-center">
          <h3 className="text-[15px] font-bold text-white">{service.title}</h3>
          <p className="mt-1 text-xs font-semibold text-amber-300">
            {service.tagline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            {service.cardDescription}
          </p>
          <Cta className="mt-auto pt-4 text-white" />
        </div>
      </div>
    </>
  );
}

// 8. Wide card, mirrored: photo left with a diagonal cut, text and control chips right
function MirrorCard({ service, theme, reduce }) {
  const chips = (service.controls || []).slice(0, 3);
  return (
    <>
      <span
        className={`pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full ${theme.blob} blur-2xl transition-transform duration-500 group-hover:scale-125`}
      />
      <TopBar theme={theme} />
      <div className="relative min-h-[14rem] flex-1 lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
        <Photo service={service} sizes="(min-width: 1024px) 40vw, 100vw" />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent" />
        <span className="absolute left-4 top-5 rounded-full bg-navy-900/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
          {service.category}
        </span>
      </div>
      <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:w-[55%] lg:shrink-0">
        <Badge service={service} theme={theme} reduce={reduce} />
        <h3 className="mt-4 text-lg font-bold text-navy-900 sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-1 text-xs font-semibold text-crimson">
          {service.tagline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-400">
          {service.cardDescription}
        </p>
        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-navy-100 bg-cream px-2.5 py-1 text-[11px] font-medium text-navy-600"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        <Cta className="mt-4 text-navy-900 group-hover:text-crimson" />
      </div>
    </>
  );
}

// Layouts are keyed by slug, so reordering the data file won't change the designs.
// Desktop rows (6 columns): 4+2, 2+4, 3+3, 2+4.
const LAYOUTS = {
  "air-freight": {
    span: "sm:col-span-2 lg:col-span-4",
    link: "min-h-[24rem] border-transparent",
    Content: OverlayCard,
  },
  "ocean-freight": {
    span: "lg:col-span-2",
    link: "border-navy-100 bg-white",
    Content: StackedCard,
  },
  "multimodal-logistics": {
    span: "lg:col-span-2",
    link: "border-navy-100 bg-white",
    Content: SlantCard,
  },
  "inland-customs": {
    span: "sm:col-span-2 lg:col-span-4",
    link: "border-navy-100 bg-white md:flex-row",
    Content: SplitCard,
  },
  "project-logistics": {
    span: "lg:col-span-3",
    link: "min-h-[22rem] border-transparent",
    Content: RevealCard,
  },
  "fashion-goh": {
    span: "lg:col-span-3",
    link: "border-navy-100",
    tinted: true,
    Content: LeafCard,
  },
  "value-added-services": {
    span: "lg:col-span-2",
    link: "border-navy-900 bg-navy-900",
    Content: ArchCard,
  },
  warehousing: {
    span: "lg:col-span-4",
    link: "border-navy-100 bg-white lg:flex-row",
    Content: MirrorCard,
  },
};

// Any service added later without its own layout falls back to this one.
const FALLBACK_LAYOUT = {
  span: "lg:col-span-3",
  link: "border-navy-100 bg-white",
  Content: StackedCard,
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => {
            const theme = THEMES[i % THEMES.length];
            const layout = LAYOUTS[service.slug] || FALLBACK_LAYOUT;
            const Content = layout.Content;
            return (
              <motion.div
                key={service.slug}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className={`h-full ${layout.span}`}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={`focus-ring group relative flex h-full flex-col overflow-hidden rounded-xl border-2 shadow-card transition-all duration-300 ${
                    layout.link
                  } ${layout.tinted ? theme.tint : ""} ${theme.border} ${
                    theme.glow
                  }`}
                >
                  <Content
                    service={service}
                    theme={theme}
                    reduce={prefersReducedMotion}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
