"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { readingTime } from "@/data/insight";

const DURATION = 6000;

export default function FeaturedSlider({ items }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n) => setI((n + items.length) % items.length), [items.length]);
  const cur = items[i];

  return (
    <div
      className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Stage */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-slate-900/20 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[500px]">
        {items.map((it, idx) => (
          <div
            key={it.slug}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={it.heroImage}
              alt={it.heroAlt}
              fill
              priority={idx === 0}
              sizes="(min-width:1024px) 70vw, 100vw"
              className="ix-kenburns object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Arrows */}
        <div className="absolute right-4 top-4 flex gap-2">
          {[
            { label: "Previous", d: "M12 4 6 10l6 6", fn: () => go(i - 1) },
            { label: "Next", d: "m8 4 6 6-6 6", fn: () => go(i + 1) },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={b.fn}
              aria-label={`${b.label} insight`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={b.d} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={cur.slug} className="ix-fade-up absolute inset-x-0 bottom-0 p-6 pb-10 text-white sm:p-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-sky-300">
            <span className="rounded-full bg-sky-500/20 px-3 py-1 backdrop-blur">Article {cur.id}</span>
            <span className="text-slate-300">{readingTime(cur.words)} min read</span>
          </div>
          <h3 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            {cur.title}
          </h3>
          <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {cur.excerpt}
          </p>
          <Link
            href={`/insights/${cur.slug}`}
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-sky-400"
          >
            Read insight
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 10h12m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Auto-play progress */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div
            key={i}
            className={`ix-progress h-full bg-gradient-to-r from-sky-400 to-cyan-300 ${paused ? "ix-paused" : ""}`}
            style={{ "--ix-dur": `${DURATION}ms` }}
            onAnimationEnd={() => go(i + 1)}
          />
        </div>
      </div>

      {/* Mobile dots */}
      <div className="flex justify-center gap-2 lg:hidden">
        {items.map((it, idx) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => go(idx)}
            aria-label={`Show insight ${it.id}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === i ? "w-8 bg-sky-500" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Desktop list */}
      <ol className="hidden flex-col gap-2 lg:flex">
        {items.map((it, idx) => (
          <li key={it.slug} className="flex-1">
            <button
              type="button"
              onClick={() => go(idx)}
              className={`group flex h-full w-full items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                idx === i
                  ? "border-sky-300 bg-white shadow-lg shadow-sky-900/10"
                  : "border-transparent bg-white/60 hover:border-slate-200 hover:bg-white"
              }`}
            >
              <span
                className={`text-2xl font-black tabular-nums transition ${
                  idx === i ? "text-sky-500" : "text-slate-300 group-hover:text-slate-400"
                }`}
              >
                {it.id}
              </span>
              <span
                className={`line-clamp-2 text-sm font-semibold leading-snug transition ${
                  idx === i ? "text-slate-900" : "text-slate-500 group-hover:text-slate-800"
                }`}
              >
                {it.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}