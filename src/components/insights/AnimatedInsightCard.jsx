"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { readingTime } from "@/data/insight";

export default function AnimatedInsightCard({ insight }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    const rx = (0.5 - y / r.height) * 6;
    const ry = (x / r.width - 0.5) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={`/insights/${insight.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="ix-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-900/15"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
        <Image
          src={insight.heroImage}
          alt={insight.heroAlt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        {/* <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-slate-800 backdrop-blur">
          Article {insight.id}
        </span> */}
        <span
          className="pointer-events-none absolute bottom-1 right-4 text-7xl font-black leading-none text-transparent transition duration-500 group-hover:-translate-y-1"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.55)" }}
        >
          {insight.id}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>{insight.date}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{readingTime(insight.words)} min read</span>
        </div> */}
        <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-sky-700">
          {insight.title}
        </h3>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600">{insight.excerpt}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-sky-700">
          Read insight
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 10h12m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Cursor spotlight */}
      <span className="ix-spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Bottom accent line */}
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}