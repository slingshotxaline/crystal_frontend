"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Icon from "./Icon";
import QuoteForm from "./QuoteForm";
import { getServiceBySlug } from "@/data/services";
import { industries as staticIndustries } from "@/data/industries";

// One banner per industry. Change the file name (and extension)
// here if your image is named differently. Extension is ignored:
// every supported format (webp/jpg/jpeg/png/avif) is tried too.
const INDUSTRY_HEROES = {
  "fashion-retail": "/assets/Industries/fashion-retail.webp",
  fmcg: "/assets/Industries/fmcg21.jpg",
  industrial: "/assets/Industries/industry3.webp",
  automotive: "/assets/Industries/automotive.jpg",
  healthcare: "/assets/Industries/heaalthcarebanner2.png",
  "high-tech": "/assets/Industries/hightechbanner.jpg",
};

// Used for any industry without its own entry above.
const DEFAULT_HERO = "/assets/Industries/default-hero.webp";
const PHOTO_EXTS = ["webp", "jpg", "jpeg", "png", "avif"];

function stripExt(src) {
  return src.replace(/\.[a-z0-9]+$/i, "");
}

function heroSourcesFor(slug) {
  const primary = INDUSTRY_HEROES[slug] || DEFAULT_HERO;
  const base = stripExt(primary);
  const defaultBase = stripExt(DEFAULT_HERO);
  return [
    ...PHOTO_EXTS.map((e) => `${base}.${e}`),
    ...PHOTO_EXTS.map((e) => `${defaultBase}.${e}`),
  ];
}

/**
 * Real <img> with format + fallback fallthrough, same behaviour as the
 * service hero/capability images: try each source in order, and if all
 * fail, the section's own background colour shows through.
 */
function FallbackImage({ sources, className, position = "center" }) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);

  const next = () => setIndex((i) => i + 1);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) next();
  }, [index]);

  const src = sources[index];
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      ref={imgRef}
      src={src}
      alt=""
      loading="lazy"
      onError={next}
      className={className}
      style={{ objectPosition: position }}
    />
  );
}

/* ------------------------------------------------------------------
 * Consideration cards + two photo cards, on an animated background.
 * Mirrors the Capabilities section on the service detail pages, so
 * the two page types feel like one system.
 *
 * industry.considerations: plain strings, or objects
 * { title, description?, icon? }.
 *
 * Photos: set per industry in industries.js -> sectionImages:
 *   [{ src, caption }, { src, caption }]
 * Without an entry, /assets/Industries/considerations/{slug}-1 and -2
 * are used. If a photo is missing, the industry hero image is shown.
 * ---------------------------------------------------------------- */
const CARD_ICONS = ["check", "route", "tag", "truck", "warehouse", "ship"];

const CARD_THEMES = [
  {
    tile: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/30",
    glow: "rgba(14,165,233,0.16)",
    bar: "bg-sky-500",
    mark: "text-sky-500",
    ring: "border-sky-400",
  },
  {
    tile: "from-teal-400 to-emerald-600",
    shadow: "shadow-teal-500/30",
    glow: "rgba(20,184,166,0.16)",
    bar: "bg-teal-500",
    mark: "text-teal-500",
    ring: "border-teal-400",
  },
  {
    tile: "from-violet-500 to-indigo-600",
    shadow: "shadow-violet-500/30",
    glow: "rgba(139,92,246,0.16)",
    bar: "bg-violet-500",
    mark: "text-violet-500",
    ring: "border-violet-400",
  },
  {
    tile: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/30",
    glow: "rgba(245,158,11,0.18)",
    bar: "bg-amber-500",
    mark: "text-amber-500",
    ring: "border-amber-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: (i % 6) * 0.07,
      type: "spring",
      stiffness: 220,
      damping: 22,
    },
  }),
};

function ConsiderationCard({ item, index, reduce }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const iconName = item.icon || CARD_ICONS[index % CARD_ICONS.length];

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, ${theme.glow}, transparent 70%)`;

  function onMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reduce ? undefined : { y: -6 }}
      onMouseMove={onMove}
      className="group relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <Icon
        name={iconName}
        className={`pointer-events-none absolute -right-5 -top-5 h-28 w-28 rotate-12 opacity-[0.06] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 ${theme.mark}`}
        strokeWidth={1.2}
      />

      <div className="relative h-11 w-11">
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className={`absolute inset-0 rounded-xl border-2 ${theme.ring}`}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: (index % 6) * 0.35,
            }}
          />
        )}
        <span
          className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${theme.tile} text-white shadow-lg ${theme.shadow} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
        >
          <Icon name={iconName} className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </div>

      <div className="relative mt-5">
        <h3 className="text-[15px] font-bold leading-snug text-navy-900">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1.5 text-sm text-navy-400">{item.description}</p>
        )}
      </div>

      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${theme.bar}`}
      />
    </motion.div>
  );
}

function ConsiderationPhoto({ sources, caption, position = "center" }) {
  return (
    <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-navy-900 shadow-lg">
      <FallbackImage
        sources={sources}
        position={position}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
      {/* {caption && (
        <p className="absolute bottom-4 left-5 right-5 text-xs font-bold uppercase tracking-wide text-white">
          {caption}
        </p>
      )} */}
    </div>
  );
}

/* Animated background: shares the palette and motifs of the service
 * Capabilities section (dot grid, drifting blobs, flowing lines,
 * sweeping sheen) so both page types read as one design system. */
const BG_LINES = [
  {
    d: "M -20 120 C 240 40, 480 220, 760 120 S 1240 40, 1460 140",
    color: "#0ea5e9",
    dash: "8 10",
    speed: 2.4,
  },
  {
    d: "M -20 300 C 300 220, 520 400, 820 300 S 1200 240, 1460 320",
    color: "#8b5cf6",
    dash: "2 12",
    speed: 3,
  },
  {
    d: "M -20 480 C 260 400, 560 560, 860 470 S 1240 420, 1460 500",
    color: "#14b8a6",
    dash: "12 8",
    speed: 2.8,
  },
];

function SectionBackground({ reduce }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(100,116,139,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 85%)",
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "26px 26px"] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl sm:h-[28rem] sm:w-[28rem]"
        animate={reduce ? undefined : { x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-300/25 blur-3xl sm:h-96 sm:w-96"
        animate={reduce ? undefined : { x: [0, -140, 0], y: [0, 80, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-300/25 blur-3xl sm:h-80 sm:w-80"
        animate={reduce ? undefined : { x: [0, 160, 0], y: [0, -50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-10 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl sm:h-72 sm:w-72"
        animate={reduce ? undefined : { x: [0, -90, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {BG_LINES.map((l, i) => (
          <g key={i}>
            <path
              d={l.d}
              fill="none"
              stroke={l.color}
              strokeOpacity="0.1"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={l.d}
              fill="none"
              stroke={l.color}
              strokeOpacity="0.35"
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

      {!reduce && (
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "420%" }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </div>
  );
}

function WhatShapesTheRoute({ industry, reduce }) {
  const items = (industry.considerations || []).map((c) =>
    typeof c === "string" ? { title: c } : c,
  );
  if (items.length === 0) return null;

  const heroSources = heroSourcesFor(industry.slug);

  // Read from the static file, so the backend can't override it
  const staticImages = staticIndustries.find(
    (i) => i.slug === industry.slug,
  )?.sectionImages;
  const configured = staticImages || industry.sectionImages || [];
  const photoBase = `/assets/Industries/considerations/${industry.slug}`;

  const photos = [1, 2].map((n, i) => {
    const entry = configured[i];
    const cfg = typeof entry === "string" ? { src: entry } : entry || {};
    const base = cfg.src ? stripExt(cfg.src) : `${photoBase}-${n}`;
    return {
      sources: [...PHOTO_EXTS.map((e) => `${base}.${e}`), ...heroSources],
      caption: cfg.caption,
    };
  });

  return (
    <section className="relative overflow-hidden bg-cream py-14 sm:py-16">
      <SectionBackground reduce={reduce} />

      <div className="container-content relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
          What Shapes the Route
        </p>
        <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
          Considerations specific to {industry.title}.
        </h2>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          <div className="grid content-start gap-5 sm:grid-cols-1">
            {items.map((item, i) => (
              <ConsiderationCard
                key={item.title}
                item={item}
                index={i}
                reduce={reduce}
              />
            ))}
          </div>

          <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <ConsiderationPhoto
              key={photos[0].sources[0]}
              sources={photos[0].sources}
              caption={photos[0].caption}
              position="center"
            />
            <ConsiderationPhoto
              key={photos[1].sources[0]}
              sources={photos[1].sources}
              caption={photos[1].caption}
              position="left center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IndustryTemplate({ industry }) {
  const reduce = useReducedMotion();
  const heroSources = heroSourcesFor(industry.slug);
  const relatedServices = (industry.relatedServices || [])
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-40">
        <FallbackImage
          sources={heroSources}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-navy-900/70" />

        <div className="container-content relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white">
            {industry.title}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            {industry.heroHeadline}
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">{industry.summary}</p>
          <Link
            href="#enquiry"
            className="focus-ring mt-8 inline-flex rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* What Shapes the Route: same card + photo + animated-background
          system as the Capabilities section on service detail pages */}
      <WhatShapesTheRoute industry={industry} reduce={reduce} />

      {relatedServices.length > 0 && (
        <section className="bg-cream-100 py-14 sm:py-16">
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
              Relevant Services
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="focus-ring group rounded-lg border border-navy-100 bg-white p-6 hover:border-crimson"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 text-crimson">
                    <Icon name={service.icon} className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-bold text-navy-900">{service.title}</h3>
                  <p className="mt-1.5 text-sm text-navy-400">
                    {service.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <section className="bg-cream py-14 sm:py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
            Practical Example
          </p>
          <div className="mt-4 rounded-lg border border-navy-100 bg-white p-6">
            <p className="text-navy-700">
              An approved case study for {industry.title} will appear here once
              a completed shipment is confirmed with customer permission.
            </p>
            <Link
              href="/case-studies"
              className="mt-3 inline-flex text-sm font-semibold text-crimson underline"
            >
              View all case studies
            </Link>
          </div>
        </div>
      </section> */}

      <section id="enquiry" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
            Next Step
          </p>
          <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
            Request a quote for {industry.title.toLowerCase()} cargo.
          </h2>
          <div className="mt-6">
            <QuoteForm
              source="general_quote"
              title={`${industry.title} Enquiry`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
