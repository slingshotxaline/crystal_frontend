"use client";

import { useMemo, useState } from "react";
import AnimatedInsightCard from "./AnimatedInsightCard";
import Reveal from "./Reveal";

export default function InsightsGrid({ items }) {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.title} ${i.excerpt}`.toLowerCase().includes(s));
  }, [q, items]);

  return (
    <div>
      {/* Search */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-500">
          Showing <span className="font-bold text-slate-900">{list.length}</span> of {items.length} insights
        </p>
        <label className="relative block w-full sm:w-80">
          <span className="sr-only">Search insights</span>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search air freight, customs, launch…"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
      </div>

      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {list.map((insight, i) => (
            <Reveal key={insight.slug} delay={(i % 3) * 120}>
              <AnimatedInsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-lg font-bold text-slate-900">No insights match “{q}”</p>
          <button
            type="button"
            onClick={() => setQ("")}
            className="mt-3 text-sm font-semibold text-sky-700 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}