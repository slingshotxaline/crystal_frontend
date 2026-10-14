import Image from "next/image";
import Link from "next/link";
import { readingTime } from "@/data/insight";

export default function InsightCard({ insight, priority = false }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
        <Image
          src={insight.heroImage}
          alt={insight.heroAlt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-slate-800 backdrop-blur">
          Article {insight.id}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>{insight.date}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{readingTime(insight.words)} min read</span>
        </div>

        <h2 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-sky-700">
          {insight.title}
        </h2>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600">
          {insight.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-sky-700">
          Read insight
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 10h12m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}