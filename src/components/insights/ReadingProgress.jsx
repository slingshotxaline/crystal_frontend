"use client";

import { useEffect, useState } from "react";

const R = 22;
const C = 2 * Math.PI * R;

export default function ReadingProgress({ minutes = 4 }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const left = Math.max(0, Math.ceil(minutes * (1 - p / 100)));
  const visible = p > 4;

  return (
    <>
      {/* Top glowing bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div
          className="relative h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{ width: `${p}%` }}
        >
          <span className="ix-shimmer absolute inset-0" />
        </div>
      </div>

      {/* Floating progress ring */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-slate-950/90 py-1.5 pl-1.5 pr-4 text-white shadow-xl shadow-slate-900/30 backdrop-blur transition duration-500 sm:bottom-8 sm:right-8 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="relative flex h-12 w-12 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            <circle
              cx="26"
              cy="26"
              r={R}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - p / 100)}
            />
          </svg>
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M10 16V4m0 0-5 5m5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-bold tabular-nums">{Math.round(p)}%</span>
          <span className="block text-[11px] text-slate-400">
            {left > 0 ? `${left} min left` : "Finished"}
          </span>
        </span>
      </button>
    </>
  );
}