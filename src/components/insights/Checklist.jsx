"use client";

import { useState } from "react";

export default function Checklist({ items }) {
  const [done, setDone] = useState({});
  const count = Object.values(done).filter(Boolean).length;
  const complete = count === items.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-6">
      <ul className="space-y-1">
        {items.map((text, i) => (
          <li key={i}>
            <label className="group flex cursor-pointer items-start gap-3 rounded-xl p-2 transition hover:bg-sky-100/60">
              <input
                type="checkbox"
                checked={!!done[i]}
                onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                className="peer sr-only"
              />
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-sky-300 bg-white text-transparent transition duration-300 group-hover:scale-110 peer-checked:scale-110 peer-checked:border-sky-600 peer-checked:bg-sky-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-sky-400 peer-focus-visible:ring-offset-2">
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path
                    d="m2.5 6.5 2.3 2.3 4.7-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="14"
                    strokeDashoffset={done[i] ? 0 : 14}
                    style={{ transition: "stroke-dashoffset 0.35s ease" }}
                  />
                </svg>
              </span>
              <span
                className={`text-[15px] leading-relaxed transition duration-300 ${
                  done[i] ? "text-slate-400 line-through" : "text-slate-700"
                }`}
              >
                {text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-sky-100">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${(count / items.length) * 100}%` }}
          >
            <span className="ix-shimmer absolute inset-0" />
          </div>
        </div>
        <span className="text-xs font-bold tabular-nums text-sky-700">
          {count}/{items.length}
        </span>
      </div>

      {complete && (
        <p className="ix-pop mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800">
          <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m2.5 6.5 2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Checklist complete
        </p>
      )}
    </div>
  );
}