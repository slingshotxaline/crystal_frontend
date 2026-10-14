"use client";

import { useEffect, useState } from "react";

const WORDS = ["smarter shipments", "faster recovery", "clearer updates", "better launches"];

function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function Stat({ value, label }) {
  const n = useCountUp(value);
  return (
    <div>
      <div className="text-3xl font-extrabold tabular-nums text-white sm:text-4xl">
        {n.toLocaleString()}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  );
}

export default function InsightsHero({ articles, words, minutes }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Animated background */}
      <div className="ix-grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="ix-blob-a pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl" />
      <div className="ix-blob-b pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Animated shipping route */}
      <svg
        viewBox="0 0 600 360"
        className="pointer-events-none absolute right-0 top-1/2 -z-10 hidden w-[640px] max-w-[55%] -translate-y-1/2 opacity-70 md:block"
        fill="none"
        aria-hidden="true"
      >
        <path
          id="ix-route"
          d="M40 290 C 170 290, 170 120, 300 160 S 480 250, 560 70"
          stroke="rgba(56,189,248,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          className="ix-route-dash"
        />
        {[
          [40, 290],
          [300, 160],
          [560, 70],
        ].map(([x, y], idx) => (
          <g key={idx}>
            <circle cx={x} cy={y} r="8" fill="#38bdf8" className="ix-ring" style={{ animationDelay: `${idx * 0.6}s` }} />
            <circle cx={x} cy={y} r="6" fill="#0ea5e9" stroke="#e0f2fe" strokeWidth="2" />
          </g>
        ))}
        {/* Moving cargo markers */}
        <g>
          <circle r="7" fill="#fff">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#ix-route" />
            </animateMotion>
          </circle>
          <circle r="5" fill="#22d3ee">
            <animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#ix-route" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <span className="ix-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="ix-ring-html absolute inline-flex h-full w-full rounded-full bg-sky-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          Crystal Express Insights
        </span>

        <h1
          className="ix-fade-up mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          Practical thinking for
          <span className="block min-h-[1.15em]">
            <span key={i} className="ix-word ix-gradient-text inline-block pb-1">
              {WORDS[i]}
            </span>
          </span>
        </h1>

        <p
          className="ix-fade-up mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Six focused reads on planning, preparing and managing freight — written to help you ask better questions before you book.
        </p>

        <div
          className="ix-fade-up mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6"
          style={{ animationDelay: "0.35s" }}
        >
          <Stat value={articles} label="Articles" />
          <Stat value={words} label="Words" />
          <Stat value={minutes} label="Min read" />
        </div>

        <a
          href="#featured"
          className="ix-bob mt-12 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white"
        >
          Start reading
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4v12m0 0-5-5m5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}