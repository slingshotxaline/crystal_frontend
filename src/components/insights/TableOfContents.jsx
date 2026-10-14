"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const idx = Math.max(0, items.findIndex((i) => i.id === active));
  const pct = ((idx + 1) / items.length) * 100;

  const list = (
    <div className="relative pl-5">
      {/* Track + animated fill */}
      <span className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-slate-200" />
      <span
        className="absolute left-0 top-0 w-0.5 rounded-full bg-gradient-to-b from-sky-500 to-cyan-400 transition-all duration-700 ease-out"
        style={{ height: `${pct}%` }}
      />
      <ol className="space-y-0.5">
        {items.map((item, n) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex items-start gap-2 rounded-lg py-2 pr-2 text-sm leading-snug transition-all duration-300 ${
                active === item.id
                  ? "translate-x-1 font-semibold text-sky-700"
                  : n < idx
                  ? "text-slate-400 hover:text-slate-700"
                  : "text-slate-600 hover:translate-x-0.5 hover:text-slate-900"
              }`}
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition ${
                  active === item.id ? "ix-glow bg-sky-500" : n < idx ? "bg-sky-300" : "bg-slate-300"
                }`}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      {/* Mobile / tablet */}
      <details className="group mb-8 rounded-2xl border border-slate-200 bg-white p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900">
          In this article
          <svg
            className="h-4 w-4 transition group-open:rotate-180"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="mt-3">{list}</div>
      </details>

      {/* Desktop */}
      <aside className="sticky top-24 hidden lg:block">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          In this article
        </p>
        {list}
      </aside>
    </>
  );
}