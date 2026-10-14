import Link from "next/link";

export default function InsightsMarquee({ items }) {
  const row = (suffix) =>
    items.map((it) => (
      <Link
        key={`${it.slug}-${suffix}`}
        href={`/insights/${it.slug}`}
        tabIndex={suffix === "b" ? -1 : 0}
        aria-hidden={suffix === "b"}
        className="group flex shrink-0 items-center gap-3 px-6 py-4 text-sm text-slate-300 transition hover:text-white"
      >
        <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 text-xs font-bold text-sky-300">
          {it.id}
        </span>
        <span className="whitespace-nowrap font-medium">{it.title}</span>
        <span className="text-sky-500/60">✦</span>
      </Link>
    ));

  return (
    <div className="ix-marquee overflow-hidden border-y border-white/10 bg-slate-900">
      <div className="ix-marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}