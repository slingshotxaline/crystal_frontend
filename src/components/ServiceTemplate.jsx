"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Icon from "./Icon";
import QuoteForm from "./QuoteForm";
import { services as staticServices } from "@/data/services";

/* ------------------------------------------------------------------
 * Default image for the "How we support the shipment" section.
 * Used when a service has no `supportImage` in services.js, or when
 * that file fails to load.
 * Put your file in /public and change this path to match.
 * e.g. /public/assets/Services/support-steps.jpg
 * ---------------------------------------------------------------- */
const STEPS_IMAGE = "/assets/Services/support-steps.jpg";

/**
 * Hero image uses next/image. `sources` is a list of URLs (any of
 * jpg/jpeg/png/webp/avif). If one fails to load, the next is tried.
 * If all fail, bg-navy-900 shows underneath.
 */
function HeroBackground({ sources }) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);

  const next = () => setIndex((i) => i + 1);

  // Catches images that already failed before React hydrated
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) next();
  }, [index]);

  const src = sources[index];
  if (!src) return null;

  return (
    <Image
      key={src}
      ref={imgRef}
      src={src}
      alt=""
      fill
      priority
      sizes="100vw"
      onError={next}
      className="object-cover"
    />
  );
}

/**
 * Left image of "How we support the shipment". Each service can set its
 * own `supportImage` in services.js. If it fails to load, the default
 * STEPS_IMAGE is shown instead.
 */
function SupportImage({ src, alt }) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      onError={() => {
        if (current !== STEPS_IMAGE) setCurrent(STEPS_IMAGE);
      }}
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

/* ------------------------------------------------------------------
 * Capabilities: icon cards on the left, two photo cards on the right.
 *
 * service.capabilities can be plain strings (shown as the card title)
 * or objects: { title, description?, icon? }.
 *
 * Photos: set per service in services.js -> capabilityImages:
 *   [{ src, caption }, { src, caption }]
 * The extension in src is ignored (webp/jpg/jpeg/png/avif all work).
 * Without an entry, /assets/Services/capabilities/{slug}-1 and -2 are used.
 * If a photo is missing, the service's hero image is shown instead.
 * ---------------------------------------------------------------- */
const CAP_ICONS = ["route", "tag", "warehouse", "truck", "ship", "plane"];
const PHOTO_EXTS = ["webp", "jpg", "jpeg", "png", "avif"];

function CapabilityPhoto({ sources, caption, position = "center" }) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);

  const next = () => setIndex((i) => i + 1);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) next();
  }, [index]);

  const src = sources[index];

  return (
    <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-navy-900 shadow-lg">
      {src && (
        <Image
          key={src}
          ref={imgRef}
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          onError={next}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: position }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
      {caption && (
        <p className="absolute bottom-4 left-5 right-5 text-xs font-bold uppercase tracking-wide text-white">
          {caption}
        </p>
      )}
    </div>
  );
}

// One accent per card, cycled by index.
const CAP_THEMES = [
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
  {
    tile: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-500/30",
    glow: "rgba(236,72,153,0.16)",
    bar: "bg-pink-500",
    mark: "text-pink-500",
    ring: "border-pink-400",
  },
];

const capCardVariants = {
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

function CapabilityCard({ item, index, reduce }) {
  const theme = CAP_THEMES[index % CAP_THEMES.length];
  const iconName = item.icon || CAP_ICONS[index % CAP_ICONS.length];

  // Spotlight that follows the mouse across the card
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
      variants={capCardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reduce ? undefined : { y: -6 }}
      onMouseMove={onMove}
      className="group relative flex min-h-[10.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* mouse spotlight */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* large faded icon in the corner */}
      <Icon
        name={iconName}
        className={`pointer-events-none absolute -right-5 -top-5 h-32 w-32 rotate-12 opacity-[0.06] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 ${theme.mark}`}
        strokeWidth={1.2}
      />

      {/* icon tile with a slow pulse ring */}
      <div className="relative h-12 w-12">
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
          className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${theme.tile} text-white shadow-lg ${theme.shadow} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
        >
          <Icon name={iconName} className="h-6 w-6" strokeWidth={1.8} />
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="text-base font-bold leading-snug text-navy-900">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1.5 text-sm text-navy-400">{item.description}</p>
        )}
      </div>

      {/* accent line that sweeps in on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${theme.bar}`}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------
 * Full-width animated background shared by the Capabilities, Steps
 * and FAQ sections. Everything loops forever and stays low-contrast:
 *   - drifting dot grid
 *   - soft colour blobs floating around
 *   - dashed route lines flowing across the whole width
 *   - a light sheen sweeping left to right
 * Stops for visitors who prefer reduced motion.
 * ---------------------------------------------------------------- */
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

/* Drifting dot grid. Used only behind the Capabilities section. */
function DotGrid({ reduce }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(rgba(100,116,139,0.35) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
      }}
      animate={
        reduce ? undefined : { backgroundPosition: ["0px 0px", "26px 26px"] }
      }
      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    />
  );
}

function CapabilitiesBackground({ reduce }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* colour blobs */}
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
        className="absolute -left-20 top-1/2 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl sm:h-96 sm:w-96"
        animate={reduce ? undefined : { x: [0, 130, 0], y: [0, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
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

      {/* flowing route lines, edge to edge */}
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

      {/* light sheen sweeping across */}
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

      {/* soft fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </div>
  );
}

function Capabilities({ service, heroSources = [] }) {
  const reduce = useReducedMotion();
  const items = service.capabilities.map((c) =>
    typeof c === "string" ? { title: c } : c,
  );

  // Read from the static file, so the backend can't override it
  const staticImages = staticServices.find(
    (s) => s.slug === service.slug,
  )?.capabilityImages;
  const configured = staticImages || service.capabilityImages || [];

  const photos = [1, 2].map((n, i) => {
    const entry = configured[i];
    const cfg = typeof entry === "string" ? { src: entry } : entry || {};
    // Path without extension: every supported format is tried
    const base = cfg.src
      ? cfg.src.replace(/\.[a-z0-9]+$/i, "")
      : `/assets/Services/capabilities/${service.slug}-${n}`;
    return {
      sources: [...PHOTO_EXTS.map((e) => `${base}.${e}`), ...heroSources],
      caption: cfg.caption || service.controls?.[i],
    };
  });

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
        Capabilities
      </p>

      <div className="relative mt-4">
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          {/* Cards */}
          <div className="grid content-start gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <CapabilityCard
                key={item.title}
                item={item}
                index={i}
                reduce={reduce}
              />
            ))}
          </div>

          {/* Photo cards */}
          <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <CapabilityPhoto
              key={photos[0].sources[0]}
              sources={photos[0].sources}
              caption={photos[0].caption}
              position="center"
            />
            <CapabilityPhoto
              key={photos[1].sources[0]}
              sources={photos[1].sources}
              caption={photos[1].caption}
              position="left center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ title }) {
  return (
    <p className="text-sm text-navy-100/70">
      <Link href="/" className="hover:text-white">
        Home
      </Link>
      {" / "}
      <Link href="/services" className="hover:text-white">
        Services
      </Link>
      {" / "}
      <span className="text-navy-100">{title}</span>
    </p>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-navy-900">{question}</span>
        <Icon
          name="plus"
          className={`h-4 w-4 shrink-0 text-crimson transition-transform ${open ? "rotate-45" : ""}`}
          strokeWidth={2.4}
        />
      </button>
      {open && <p className="mt-2 text-sm text-navy-400">{answer}</p>}
    </div>
  );
}

function Sidebar({ service }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-lg border border-navy-100 bg-white p-6">
        {service.relatedServices?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-navy-900">
              Related services
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {service.relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="focus-ring rounded-md border border-navy-200 px-3 py-2 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {service.relatedIndustries?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-navy-900">
              Related industries
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {service.relatedIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="focus-ring rounded-md border border-navy-200 px-3 py-2 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
                >
                  {ind.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href="#enquiry"
          className="focus-ring mt-6 block rounded-md bg-crimson px-5 py-3 text-center text-sm font-bold text-white hover:bg-crimson-700"
        >
          {service.primaryCta}
        </Link>
      </div>
    </aside>
  );
}

export default function ServiceTemplate({ service, heroSources }) {
  const reduce = useReducedMotion();

  // Per-service image for "How we support the shipment".
  // Read from the static file (same as capabilityImages), then the service
  // object, then the default image.
  const supportImage =
    staticServices.find((s) => s.slug === service.slug)?.supportImage ||
    service.supportImage ||
    STEPS_IMAGE;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 py-14 text-white sm:py-40">
        <HeroBackground key={heroSources[0]} sources={heroSources} />

        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-navy-900/70" />

        <div className="container-content relative z-10">
          <Breadcrumb title={service.title} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-crimson">
            {service.category}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            {service.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">{service.subhead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#enquiry"
              className="focus-ring rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700"
            >
              {service.primaryCta}
            </Link>
            <Link
              href="#enquiry"
              className="focus-ring rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              {service.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities + Steps + FAQ share one animated background */}
      <div className="relative overflow-hidden bg-cream">
        <CapabilitiesBackground reduce={reduce} />

        {/* Capabilities */}
        <section className="relative z-10 py-14 sm:py-16">
          <DotGrid reduce={reduce} />
          <div className="container-content relative">
            {/* What this helps you control */}
            {service.controls?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                  What this helps you control
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {service.controls.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-navy-200 bg-white/90 px-4 py-2 text-sm font-semibold text-navy-800 backdrop-blur-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities */}
            {service.capabilities?.length > 0 && (
              <div className={service.controls?.length > 0 ? "mt-10" : ""}>
                <Capabilities service={service} heroSources={heroSources} />
              </div>
            )}
          </div>
        </section>

        {/* Steps + FAQ (no bg color, so the animation shows through) */}
        <section className="relative z-10 pb-14 pt-4 sm:pb-16">
          <div className="container-content">
            {/* How we support the shipment: image left (different per service), steps right */}
            {service.supportSteps?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                  How we support the shipment
                </p>

                <div className="mt-4 grid items-stretch gap-8 lg:grid-cols-2">
                  {/* Left: service image */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="group relative min-h-[20rem] overflow-hidden rounded-2xl bg-navy-900 shadow-lg"
                  >
                    <SupportImage
                      key={supportImage}
                      src={supportImage}
                      alt={`${service.title} shipment support`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  </motion.div>

                  {/* Right: steps */}
                  <div className="divide-y divide-navy-100 border-t border-navy-100">
                    {service.supportSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={reduce ? false : { opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          delay: i * 0.08,
                          duration: 0.45,
                          ease: "easeOut",
                        }}
                        className="flex items-start gap-4 py-3.5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-300 bg-white/80 text-xs font-bold text-navy-700">
                          {i + 1}
                        </span>
                        <p className="text-navy-700">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* {service.proofNote && (
                  <div className="mt-5 rounded-md border border-dashed border-navy-300 bg-cream-100 p-4">
                    <p className="text-sm text-navy-500">
                      <span className="font-bold text-navy-700">Proof &amp; conversion: </span>
                      {service.proofNote}
                    </p>
                  </div>
                )} */}
              </div>
            )}

            {/* FAQ */}
            {service.faqs?.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                  Frequently Asked Questions
                </p>
                <div className="mt-4 border-t border-navy-100">
                  {service.faqs.map((faq) => (
                    <FaqItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* <Sidebar service={service} /> */}
          </div>
        </section>
      </div>

      {/* Contextual quote form */}
      <section id="enquiry" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
            Next Step
          </p>
          <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
            {service.primaryCta}
          </h2>
          <p className="mt-3 text-navy-400">
            Share the details and Crystal will confirm the practical option
            within one business day.
          </p>
          <div className="mt-6">
            <QuoteForm
              source="general_quote"
              title={`${service.title} Enquiry`}
            />
          </div>
        </div>
      </section>
    </>
  );
}