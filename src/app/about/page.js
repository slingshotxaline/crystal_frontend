"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const timeline = [
  {
    label: "2002",
    title: "Founded in Bangladesh",
    desc: "Crystal Express Ltd. begins operations with a focus on reliable international freight forwarding.",
  },
  {
    label: "Network",
    title: "Stronger global reach",
    desc: "Trusted agent and carrier relationships extend service across international markets.",
  },
  {
    label: "Services",
    title: "More ways to move",
    desc: "Air, ocean, inland, GOH, project cargo, warehousing and CFS capabilities develop.",
  },
  {
    label: "Facilities",
    title: "Greater cargo control",
    desc: "Chattogram CFS capacity and value-added handling strengthen origin execution.",
  },
  {
    label: "Today",
    title: "Visible and responsive",
    desc: "Digital reporting, disciplined compliance and responsive communication support every shipment.",
  },
];

const approach = [
  "Understand the cargo and delivery requirement before proposing a route.",
  "Confirm responsibility at each handover.",
  "Communicate changes while there is still time to act.",
  "Use facilities and specialist handling where they add control.",
  "Keep operating claims accurate by location.",
];

const companyFacts = [
  "Established in 1997",
  "Dhaka head office and Chattogram branch ",
  "130+ professionals",
  "Regional presence across selected Asian markets",
  "T.O.P.S., JCtrans and WCA affiliations",
];

const leadership = [
  {
    initials: "MA",
    name: "MD Abrarul Alam",
    title: "Managing Director & Group CEO",
    desc: "Sets strategic direction for Crystal Express Ltd. and the wider group.",
  },
  {
    initials: "MS",
    name: "Mohammad Sams E Tabriz",
    title: "Deputy Managing Director",
    desc: "[VALIDATE title and reporting line]",
  },
  {
    initials: "AH",
    name: "Abdul Halim",
    title: "Chief Financial Officer",
    desc: "[VALIDATE entity of employment]",
  },
  {
    initials: "RH",
    name: "Rashedul Hoque Chowdhury",
    title: "Regional Manager",
    desc: "[VALIDATE market remit]",
  },
  {
    initials: "GM",
    name: "Golam Mostafa Arnab",
    title: "Head of Sales",
    desc: "[VALIDATE scope]",
  },
  {
    initials: "TA",
    name: "Tayef Al Sakib",
    title: "Head of Business Development",
    desc: "[VALIDATE scope]",
  },
  {
    initials: "FK",
    name: "Fatin Khandoker",
    title: "Senior Manager, Planning & Business Development",
    desc: "[VALIDATE scope]",
  },
];

const groupEntities = [
  {
    name: "Crystal Express Ltd.",
    tag: "THIS COMPANY",
    desc: "The Bangladesh-based international freight-forwarding platform within the wider group.",
  },
  {
    name: "EUR Logistics Services Ltd.",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Integrated logistics and supply-chain capability",
  },
  {
    name: "PT EUR Logistiks Servises",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Indonesia country operation.",
  },
  {
    name: "EXG Project Logistics",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Project cargo and complex movements",
  },
  {
    name: "Soul Aviation Limited",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Cargo charter and freighter solutions .",
  },
];

const cargoSecurity = [
  {
    name: "TAPA",
    desc: "TAPA compliant [VALIDATE audit status and permitted wording]",
  },
  {
    name: "CTPAT",
    desc: "CTPAT aligned [VALIDATE alignment vs. certification]",
  },
  {
    name: "FCPA",
    desc: "FCPA compliance statement [VALIDATE approved wording]",
  },
];

const logisticsNetwork = [
  {
    name: "T.O.P.S.",
    desc: "T.O.P.S. member [VALIDATE current status and logo permission]",
  },
  {
    name: "JCtrans",
    desc: "JCtrans member [VALIDATE current status and logo permission]",
  },
  {
    name: "WCA World",
    desc: "WCA member [VALIDATE current status and logo permission]",
  },
];

const careerValues = [
  "Ownership of the next action",
  "Accurate and timely communication",
  "Respect for procedures and compliance",
  "Practical problem solving",
  "Collaboration across functions and markets",
  "Willingness to learn freight operations",
];

const sectionNav = [
  { href: "#our-role", label: "Our Role" },
  { href: "#our-story", label: "Our Story" },
  { href: "#our-approach", label: "Our Approach" },
  { href: "#vision", label: "Vision" },
  // { href: "#group-ecosystem", label: "Group Ecosystem" },
  // { href: "#affiliations", label: "Affiliations" },
  { href: "#careers", label: "Careers" },
];

/* ------------------------------------------------------------------ */
/* HELPERS + INTERACTIVE "OUR STORY" (auto-play timeline)             */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "", from = "up" }) {
  const { ref, inView } = useInView(0.15);
  const hidden =
    from === "left"
      ? "-translate-x-10"
      : from === "right"
        ? "translate-x-10"
        : "translate-y-8";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${hidden} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Counts a number up when it scrolls into view */
function CountUp({ from, to, duration = 1600 }) {
  const { ref, inView } = useInView(0.4);
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{value}</span>;
}

function StoryBlock() {
  const { ref, inView } = useInView(0.25);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = timeline.length - 1;

  // auto-play once visible; pauses on hover / focus / click
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      setActive((a) => (a >= last ? 0 : a + 1));
    }, 3800);
    return () => clearInterval(id);
  }, [inView, paused, last]);

  const select = useCallback((i) => {
    setActive(i);
    setPaused(true);
  }, []);

  const progress = (active / last) * 100;

  return (
    <div id="our-story" ref={ref} className="mt-20 scroll-mt-20">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-navy-400">
              <span className="sx-grow-line inline-block h-px w-10 bg-crimson" />
              Our Story
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-navy-700">
              Crystal Express began operations in Bangladesh in 2002. Since
              then, the business has developed air, ocean, inland, fashion,
              project, warehousing and CFS capabilities, supported by
              international forwarding relationships.
            </p>
          </Reveal>
        </div>

        <Reveal from="right" delay={200}>
          <div className="flex items-baseline gap-3 lg:text-right">
            <span className="text-6xl font-bold tabular-nums text-navy-900 sm:text-7xl">
              <CountUp from={1980} to={2002} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-crimson">
              Est.
            </span>
          </div>
        </Reveal>
      </div>

      {/* TIMELINE */}
      <div
        className="mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* track (desktop) */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-navy-100" />
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-crimson transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
          <div className="relative grid grid-cols-5">
            {timeline.map((step, i) => {
              const done = i <= active;
              const isActive = i === active;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show ${step.label}`}
                  className="group flex justify-start py-3 focus:outline-none"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    {isActive && (
                      <span className="sx-ping absolute h-6 w-6 rounded-full bg-crimson/40" />
                    )}
                    <span
                      className={`relative h-4 w-4 rounded-full border-2 transition-all duration-500 group-hover:scale-125 group-focus-visible:ring-2 group-focus-visible:ring-crimson ${
                        done
                          ? "border-crimson bg-crimson"
                          : "border-navy-900 bg-cream"
                      } ${isActive ? "scale-125" : ""}`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {timeline.map((step, i) => {
            const isActive = i === active;
            return (
              <Reveal key={step.label} delay={i * 110}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  onFocus={() => setPaused(true)}
                  className={`relative h-full w-full overflow-hidden rounded-lg border p-5 text-left transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson motion-reduce:transition-none ${
                    isActive
                      ? "-translate-y-2 border-navy-900 bg-navy-900 text-white shadow-xl"
                      : "border-navy-100 bg-white text-navy-900 hover:-translate-y-1 hover:border-navy-400 hover:shadow-md"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-crimson">
                    {step.label}
                  </p>
                  <h3 className="mt-3 font-bold">{step.title}</h3>
                  <p
                    className={`mt-2 text-sm transition-colors duration-500 ${
                      isActive ? "text-navy-100/80" : "text-navy-400"
                    }`}
                  >
                    {step.desc}
                  </p>

                  {/* auto-play progress bar on the active card */}
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                    {isActive && (
                      <span
                        key={`${active}-${paused}`}
                        className={`block h-full bg-crimson ${
                          paused ? "w-full" : "sx-fill"
                        }`}
                      />
                    )}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center gap-3 text-xs text-navy-400">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="rounded-full border border-navy-100 bg-white px-3 py-1 font-semibold uppercase tracking-wide transition hover:border-navy-900 hover:text-navy-900"
          >
            {paused ? "▶ Auto-play" : "❚❚ Pause"}
          </button>
          <span>Click a milestone to explore</span>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-40">
        <Image
          src="/assets/About/aboutBanner2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay keeps the text readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/30" />

        <div className="container-content relative z-10">
          <p className="text-xs text-navy-100/60">Home / About</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            About Crystal Express
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Built in Bangladesh for cargo moving beyond it.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Crystal Express coordinates international freight from Bangladesh
            through local teams, service specialists and approved connections in
            key markets.
          </p>
          <button className="mt-6 rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
            Talk to Our Team
          </button>
        </div>
      </section>

      {/* IN-PAGE SECTION NAV */}
      <nav className="sticky top-0 z-10 border-b border-navy-100 bg-white/95 backdrop-blur">
        <div className="container-content flex flex-wrap gap-x-6 gap-y-2 py-3 text-sm">
          {sectionNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-navy-400 hover:text-crimson"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* OUR ROLE / OUR STORY (auto-play timeline) / OUR APPROACH */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <style>{`
          @keyframes sxFill { from { width: 0%; } to { width: 100%; } }
          @keyframes sxGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          .sx-fill { animation: sxFill 3.8s linear forwards; }
          .sx-grow-line { transform-origin: left; animation: sxGrow 900ms ease-out both; }
          @keyframes sxFadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
          @keyframes sxSlideL { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: none; } }
          @keyframes sxSlideR { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: none; } }
          @keyframes sxScaleX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes sxScaleY { from { transform: scaleY(0); } to { transform: scaleY(1); } }
          @keyframes sxPing { 0% { transform: scale(.7); opacity: .8; } 100% { transform: scale(2.2); opacity: 0; } }
          @keyframes sxDrift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(24px,-30px); } }


          .sx-orb  { animation: sxDrift 14s ease-in-out infinite; }
          .sx-ping { animation: sxPing 1.8s ease-out infinite; }


          @supports (animation-timeline: view()) {
            .sx-up    { animation: sxFadeUp linear both; animation-timeline: view(); animation-range: entry 0% entry 55%; }
            .sx-inL   { animation: sxSlideL linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
            .sx-inR   { animation: sxSlideR linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
            .sx-line  { transform-origin: left; animation: sxScaleX linear both; animation-timeline: view(); animation-range: entry 10% entry 70%; }
            .sx-mark  { transform-origin: left; animation: sxScaleX linear both; animation-timeline: view(); animation-range: entry 30% cover 40%; }
            .sx-vline { transform-origin: top; animation: sxScaleY linear both; animation-timeline: view(); animation-range: entry 0% cover 60%; }
          }

          @media (prefers-reduced-motion: reduce) {
            .sx-orb, .sx-ping, .sx-up, .sx-inL, .sx-inR, .sx-line, .sx-mark, .sx-vline,
            .sx-fill, .sx-grow-line { animation: none !important; }
          }
        `}</style>

        {/* soft ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="sx-orb absolute -right-24 top-20 h-72 w-72 rounded-full bg-crimson/10 blur-3xl" />
          <div className="sx-orb absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-navy-900/5 blur-3xl [animation-delay:-6s]" />
        </div>

        <div className="container-content relative z-10">
          {/* ---------------- OUR ROLE ---------------- */}
          <div id="our-role" className="scroll-mt-20">
            <p className="sx-up flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-navy-400">
              <span className="sx-line inline-block h-px w-10 bg-crimson" />
              Our Role
            </p>

            <p className="sx-up mt-5 max-w-3xl text-2xl font-semibold leading-snug text-navy-900 sm:text-3xl">
              We bring the{" "}
              {[
                "shipment requirement",
                "origin activity",
                "route decision",
              ].map((t) => (
                <span key={t}>
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10">{t}</span>
                    <span className="sx-mark absolute inset-x-0 bottom-0.5 z-0 h-2.5 bg-crimson/25" />
                  </span>
                  {", "}
                </span>
              ))}
              and{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">partner coordination</span>
                <span className="sx-mark absolute inset-x-0 bottom-0.5 z-0 h-2.5 bg-crimson/25" />
              </span>{" "}
              into one operating conversation.
            </p>

            <p className="sx-up mt-4 max-w-2xl text-navy-700">
              Customers know who is managing the next action and what
              information is needed.
            </p>
          </div>

          {/* ---------------- OUR STORY ---------------- */}
          <StoryBlock />

          {/* ---------------- OUR APPROACH ---------------- */}
          <div id="our-approach" className="mt-20 scroll-mt-20">
            <p className="sx-up flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-navy-400">
              <span className="sx-line inline-block h-px w-10 bg-crimson" />
              Our Approach
            </p>

            <ol className="relative mt-6">
              {/* vertical line that draws itself on scroll */}
              <span className="sx-vline absolute bottom-6 left-[22px] top-6 w-px bg-navy-100" />

              {approach.map((line, i) => (
                <li key={line} className="sx-inL">
                  <input
                    type="checkbox"
                    id={`sx-a${i}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`sx-a${i}`}
                    className="group relative flex w-full cursor-pointer items-center gap-5 overflow-hidden rounded-lg py-4 pl-1 pr-4 text-left peer-focus-visible:ring-2 peer-focus-visible:ring-crimson peer-checked:[&_.sx-bub]:border-crimson peer-checked:[&_.sx-bub]:bg-crimson peer-checked:[&_.sx-bub]:text-white peer-checked:[&_.sx-txt]:text-navy-400 peer-checked:[&_.sx-txt]:line-through peer-checked:[&_.sx-num]:hidden peer-checked:[&_.sx-tick]:inline"
                  >
                    {/* hover sweep */}
                    <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />

                    {/* number / tick bubble */}
                    <span className="sx-bub relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-navy-900 bg-cream text-sm font-bold text-navy-900 transition-all duration-500 group-hover:scale-110 group-hover:border-crimson group-hover:text-crimson">
                      <span className="sx-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="sx-tick hidden">✓</span>
                    </span>

                    <span className="sx-txt relative z-10 flex-1 text-navy-700 transition-all duration-300 group-hover:translate-x-2">
                      {line}
                    </span>

                    <span className="relative z-10 -translate-x-3 text-crimson opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>

                    {/* bottom divider that fills on hover */}
                    <span className="absolute bottom-0 left-0 h-px w-full bg-navy-100" />
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-crimson transition-all duration-500 group-hover:w-full" />
                  </label>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      {/* <section
        id="leadership"
        className="bg-navy-900 py-16 text-white sm:py-20"
      >
        <div className="container-content">
          
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            Leadership
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Clear responsibility starts with accountable people.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Our leaders connect commercial commitments with operating decisions
            across freight, facilities and customer service.
          </p>
        </div>
      </section> */}

      {/* <section className="bg-cream py-16 sm:py-20">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <div
              key={person.name}
              className="rounded-lg border border-navy-100 bg-white"
            >
              <div className="flex aspect-square items-center justify-center bg-navy-50 text-2xl font-bold text-navy-300">
                {person.initials}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy-900">{person.name}</h3>
                <p className="text-sm font-semibold text-crimson">
                  {person.title}
                </p>
                <p className="mt-2 text-sm text-navy-400">{person.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* GROUP ECOSYSTEM */}
      {/* <section
        id="group-ecosystem"
        className="bg-navy-900 py-16 text-white sm:py-20"
      >
        <div className="container-content">
         
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            Group Ecosystem
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Bring in specialist capability when the requirement needs it.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Crystal operates within a wider group of logistics businesses. Where
            appropriate, we can introduce the relevant group team and define
            which entity will contract, operate and communicate.
          </p>
        </div>
      </section> */}

      {/* <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content grid gap-4 sm:grid-cols-2">
          {groupEntities.map((entity) => (
            <div
              key={entity.name}
              className="rounded-lg border border-navy-100 bg-white p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-navy-900">{entity.name}</h3>
                <span className="rounded bg-navy-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy-400">
                  {entity.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-navy-400">{entity.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* AFFILIATIONS & COMPLIANCE */}
      {/* <section
        id="affiliations"
        className="bg-navy-900 py-16 text-white sm:py-20"
      >
        <div className="container-content">
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-crimson">
            Affiliations &amp; Compliance
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Trust depends on accurate standards and responsibilities.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            We publish a membership, compliance statement or logo only when the
            relevant entity, scope, status and permission are confirmed.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">
            Cargo Security &amp; Ethics
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cargoSecurity.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-navy-100 bg-white p-5"
              >
                <h3 className="font-bold text-navy-900">{item.name}</h3>
                <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-xs font-semibold uppercase tracking-widest text-crimson">
            Logistics Network
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {logisticsNetwork.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-navy-100 bg-white p-5"
              >
                <h3 className="font-bold text-navy-900">{item.name}</h3>
                <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <button className="mt-8 rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
            Request Credential Information
          </button>
        </div>
      </section> */}

      {/* MISSION */}
      <section
        id="mission"
        className="relative scroll-mt-16 overflow-hidden bg-navy-900 py-20 text-white sm:py-28"
      >
        <style>{`
          /* ---------- continuous background loops ---------- */
          @keyframes mvFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.15); } }
          @keyframes mvFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.2); } }
          @keyframes mvSpin { to { transform: rotate(360deg); } }
          @keyframes mvSpinRev { to { transform: rotate(-360deg); } }
          @keyframes mvGridMove { to { background-position: 48px 48px; } }
          @keyframes mvDash { to { stroke-dashoffset: -200; } }
          @keyframes mvBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
          @keyframes mvPulse { 0% { transform: scale(.8); opacity: .7; } 100% { transform: scale(2.4); opacity: 0; } }

          .mv-orb   { animation: mvFloat 12s ease-in-out infinite; }
          .mv-orb2  { animation: mvFloat2 15s ease-in-out infinite; }
          .mv-spin  { animation: mvSpin 40s linear infinite; }
          .mv-spin2 { animation: mvSpinRev 60s linear infinite; }
          .mv-grid  { animation: mvGridMove 6s linear infinite; }
          .mv-dash  { stroke-dasharray: 8 12; animation: mvDash 6s linear infinite; }
          .mv-bob   { animation: mvBob 6s ease-in-out infinite; }
          .mv-ping  { animation: mvPulse 2.4s ease-out infinite; }

          /* ---------- scroll-in animations ---------- */
          @keyframes mvFadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
          @keyframes mvSlideL { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: none; } }
          @keyframes mvSlideR { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: none; } }
          @keyframes mvZoom { from { transform: scale(1.3); } to { transform: scale(1); } }
          @keyframes mvGrow { from { width: 0; } to { width: 4rem; } }

          @supports (animation-timeline: view()) {
            .mv-up     { animation: mvFadeUp linear both; animation-timeline: view(); animation-range: entry 0% entry 55%; }
            .mv-inL    { animation: mvSlideL linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
            .mv-inR    { animation: mvSlideR linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
            .mv-zoom   { animation: mvZoom linear both;   animation-timeline: view(); animation-range: entry 0% cover 50%; }
            .mv-grow   { animation: mvGrow linear both;   animation-timeline: view(); animation-range: entry 20% entry 80%; }
          }

          @media (prefers-reduced-motion: reduce) {
            .mv-orb, .mv-orb2, .mv-spin, .mv-spin2, .mv-grid, .mv-dash, .mv-bob, .mv-ping,
            .mv-up, .mv-inL, .mv-inR, .mv-zoom, .mv-grow { animation: none !important; }
          }
        `}</style>

        {/* LIVE BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
          {/* moving grid */}
          <div
            className="mv-grid absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* floating glow orbs */}
          <div className="mv-orb absolute -left-24 top-10 h-72 w-72 rounded-full bg-crimson/25 blur-3xl" />
          <div className="mv-orb2 absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          {/* rotating rings */}
          <div className="mv-spin absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-dashed border-white/15" />
          <div className="mv-spin2 absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-white/10" />
          {/* animated shipping route */}
          <svg
            className="absolute inset-x-0 bottom-0 h-40 w-full opacity-40"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
          >
            <path
              id="mvRouteA"
              d="M0 120 C 200 20, 400 20, 600 90 S 1000 160, 1200 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mv-dash text-crimson"
            />
            <circle r="5" className="fill-white">
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#mvRouteA" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <div className="container-content relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE */}
          <div className="mv-inL relative">
            <div className="mv-bob relative">
              <div className="absolute -bottom-4 -left-4 h-full w-full rounded-lg border-2 border-crimson" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/assets/About/mission.jpg"
                  alt="Crystal Express team coordinating cargo operations"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="mv-zoom object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
              </div>
              {/* pulsing live dot */}
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center">
                <span className="mv-ping absolute h-5 w-5 rounded-full bg-crimson" />
                <span className="relative h-3 w-3 rounded-full bg-crimson" />
              </span>
            </div>
          </div>

          {/* TEXT */}
          <div className="mv-up">
            <p className="text-xs font-semibold uppercase tracking-widest text-crimson">
              Our Mission
            </p>
            <span className="mv-grow mt-3 block h-1 w-16 rounded-full bg-crimson" />
            <h2 className="mt-4 max-w-xl text-3xl font-bold sm:text-4xl">
              Every shipment moves with reliability, visibility and care.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-100/80">
              To deliver flexible, end-to-end logistics solutions through local
              expertise, global partnerships, technology, and responsive
              execution—ensuring every shipment moves with reliability,
              visibility, and care.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Local Expertise",
                "Global Partnerships",
                "Technology",
                "Responsive",
              ].map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition hover:bg-white hover:text-navy-900"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section
        id="vision"
        className="relative scroll-mt-16 overflow-hidden bg-cream-100 py-20 sm:py-28"
      >
        {/* LIVE BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="mv-grid absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#0b1b3a 1px, transparent 1px), linear-gradient(90deg, #0b1b3a 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="mv-orb2 absolute -right-24 top-10 h-72 w-72 rounded-full bg-crimson/15 blur-3xl" />
          <div className="mv-orb absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-navy-900/10 blur-3xl" />
          <div className="mv-spin2 absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full border border-dashed border-navy-900/15" />
          <div className="mv-spin absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full border border-navy-900/10" />
          <svg
            className="absolute inset-x-0 bottom-0 h-40 w-full opacity-40"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
          >
            <path
              id="mvRouteB"
              d="M1200 120 C 1000 20, 800 20, 600 90 S 200 160, 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mv-dash text-crimson"
            />
            <circle r="5" className="fill-navy-900">
              <animateMotion dur="10s" repeatCount="indefinite">
                <mpath href="#mvRouteB" />
              </animateMotion>
            </circle>
          </svg>
        </div>

        <div className="container-content relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* TEXT */}
          <div className="mv-up order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-crimson">
              Our Vision
            </p>
            <span className="mv-grow mt-3 block h-1 w-16 rounded-full bg-crimson" />
            <h2 className="mt-4 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
              Connecting businesses to global opportunities.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-700">
              To connect businesses to global opportunities by becoming a
              trusted, technology-enabled leader in international logistics and
              supply chain solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Trusted", "Technology-Enabled", "Global Reach"].map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-navy-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy-900 transition hover:bg-navy-900 hover:text-white"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="mv-inR order-1 lg:order-2">
            <div className="mv-bob relative" style={{ animationDelay: "1.5s" }}>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border-2 border-crimson" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/assets/About/vision.jpg"
                  alt="Global shipping network and cargo vessel"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="mv-zoom object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
              </div>
              <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center">
                <span className="mv-ping absolute h-5 w-5 rounded-full bg-crimson" />
                <span className="relative h-3 w-3 rounded-full bg-crimson" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          {/* <p className="text-xs text-navy-100/60">Home / About / Careers</p> */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            Careers
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Build your logistics career close to the operation.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Work with teams coordinating cargo, customers, facilities, documents
            and international partners across a changing freight environment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
              View Open Roles
            </button>
            <button className="rounded-md border border-white px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-navy-900">
              Submit Your Profile
            </button>
          </div>
        </div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
              What We Value
            </p>
            <div className="mt-4 divide-y divide-navy-100">
              {careerValues.map((value) => (
                <p key={value} className="py-4 text-navy-700">
                  {value}
                </p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-navy-100 bg-white p-6">
            <h2 className="font-bold text-navy-900">Open roles</h2>
            <p className="mt-3 text-sm text-navy-400">
              No current openings are published. You may submit your profile for
              future consideration.
            </p>
            <button className="mt-4 w-full rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
              Submit Your Profile
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
