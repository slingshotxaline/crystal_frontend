import "@/components/insights/insights.css";
import "@/components/insights/detail.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedInsightCard from "@/components/insights/AnimatedInsightCard";
import Checklist from "@/components/insights/Checklist";
import HeroImage from "@/components/insights/HeroImage";
import ReadingProgress from "@/components/insights/ReadingProgress";
import Reveal from "@/components/insights/Reveal";
import ShareButton from "@/components/insights/ShareButton";
import TableOfContents from "@/components/insights/TableOfContents";
import {
  CTA_LINK_TEXT,
  getInsightBySlug,
  insights,
  readingTime,
  slugify,
} from "@/data/insight";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return {
    title: `${insight.title} | Crystal Express Insights`,
    description: insight.excerpt,
    openGraph: { title: insight.title, description: insight.excerpt, images: [insight.heroImage] },
  };
}

function CtaSentence({ text, href }) {
  const [before, after] = text.split(CTA_LINK_TEXT);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-sky-300 decoration-2 underline-offset-4 transition hover:decoration-white"
      >
        {CTA_LINK_TEXT}
      </a>
      {after}
    </>
  );
}

function Arrow({ className = "" }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function InsightDetailPage({ params }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const minutes = readingTime(insight.words);
  const idx = insights.findIndex((i) => i.slug === slug);
  const more = [1, 2, 3].map((n) => insights[(idx + n) % insights.length]);

  const toc = [
    ...insight.sections.map((s) => ({ id: slugify(s.heading), label: s.heading })),
    { id: slugify(insight.closing.heading), label: insight.closing.heading },
  ];

  return (
    <main className="bg-white">
      <ReadingProgress minutes={minutes} />

      {/* Header */}
      <header className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="ix-grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="ix-blob-a pointer-events-none absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="ix-blob-b pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14 lg:px-8">
          <Link
            href="/insights"
            className="ix-fade-up group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 10H4m0 0 5-5m-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All insights
          </Link>

          <p
            className="ix-fade-up mt-8 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-sky-400"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="ix-ring-html absolute inline-flex h-full w-full rounded-full bg-sky-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            Article {insight.id} · Insights
          </p>

          {/* Word-by-word title reveal */}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {insight.title.split(" ").map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span className="ix-rise inline-block" style={{ animationDelay: `${0.15 + i * 0.06}s` }}>
                  {w}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="ix-fade-up mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg"
            style={{ animationDelay: "0.7s" }}
          >
            {insight.excerpt}
          </p>

          <div
            className="ix-fade-up mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-slate-400"
            style={{ animationDelay: "0.85s" }}
          >
            <span>{insight.date}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>{insight.words} words</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>{minutes} min read</span>
            <span className="sm:ml-auto">
              <ShareButton title={insight.title} />
            </span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-4 sm:-mt-24 sm:px-6 lg:px-8">
        <HeroImage
          src={insight.heroImage}
          alt={insight.heroAlt}
          caption={insight.heroCaption}
          chips={[`Article ${insight.id}`, `${minutes} min read`]}
        />
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 lg:px-8">
        <div>
          <TableOfContents items={toc} />
        </div>

        <article className="min-w-0 max-w-3xl">
          <Reveal>
            <div className="ix-stagger space-y-5">
              {insight.intro.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg font-medium leading-relaxed text-slate-800 sm:text-xl"
                      : "text-base leading-relaxed text-slate-600 sm:text-lg"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {insight.sections.map((s) => (
            <section key={s.heading} id={slugify(s.heading)} className="mt-12 scroll-mt-24">
              <Reveal>
                <h2 className="flex items-start gap-3 text-2xl font-bold leading-snug text-slate-900">
                  <span className="ix-bar mt-2 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-sky-500 to-cyan-400" />
                  {s.heading}
                </h2>

                {s.type === "checklist" ? (
                  <div className="mt-5 space-y-5">
                    <Checklist items={s.items} />
                    {s.after && (
                      <div className="ix-stagger">
                        <p className="text-base leading-relaxed text-slate-600 sm:text-[17px]">{s.after}</p>
                      </div>
                    )}
                  </div>
                ) : s.type === "example" ? (
                  <div className="relative mt-5 overflow-hidden rounded-2xl bg-amber-200/60 p-[2px]">
                    <span className="ix-spin-border absolute -inset-[60%]" />
                    <div className="relative rounded-[14px] bg-gradient-to-br from-amber-50 to-white p-5 sm:p-7">
                      <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="ix-ring-html absolute inline-flex h-full w-full rounded-full bg-amber-500" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                        </span>
                        Illustrative example
                      </span>
                      <div className="ix-stagger space-y-4">
                        {s.paragraphs.map((p, i) => (
                          <p key={i} className="text-base leading-relaxed text-slate-700 sm:text-[17px]">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ix-stagger mt-5 space-y-4">
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="text-base leading-relaxed text-slate-600 sm:text-[17px]">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </Reveal>
            </section>
          ))}

          {/* Closing + CTA */}
          <section id={slugify(insight.closing.heading)} className="mt-14 scroll-mt-24">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-10">
                <div className="ix-grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
                <div className="ix-blob-a pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-sky-500/35 blur-3xl" />
                <div className="ix-blob-b pointer-events-none absolute -bottom-20 -left-10 -z-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

                {/* Moving route decoration */}
                <svg
                  viewBox="0 0 300 120"
                  className="pointer-events-none absolute bottom-4 right-4 hidden w-56 opacity-70 sm:block"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    id="ix-cta-route"
                    d="M10 100 C 80 100, 90 20, 150 50 S 250 90, 290 14"
                    stroke="rgba(56,189,248,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="ix-route-dash"
                  />
                  <circle r="6" fill="#fff">
                    <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#ix-cta-route" />
                    </animateMotion>
                  </circle>
                  <circle cx="290" cy="14" r="5" fill="#38bdf8" className="ix-ring" />
                </svg>

                <h2 className="text-2xl font-bold sm:text-3xl">{insight.closing.heading}</h2>
                <div className="mt-4 max-w-xl space-y-4">
                  {insight.closing.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-slate-300">
                      {p}
                    </p>
                  ))}
                </div>
                <p className="mt-6 max-w-xl text-lg font-semibold leading-snug sm:text-xl">
                  <CtaSentence text={insight.closing.cta} href={insight.serviceLink} />
                </p>
                <a
                  href={insight.serviceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ix-glow group mt-7 inline-flex items-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-sky-400"
                >
                  Explore the service
                  <Arrow className="ix-nudge" />
                </a>
              </div>
            </Reveal>
          </section>

          {insight.references && (
            <Reveal>
              <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Official import references
                </h3>
                <ul className="mt-3 space-y-2">
                  {insight.references.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words text-sm font-medium text-sky-700 underline-offset-4 hover:underline"
                      >
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {insight.referenceNote && (
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">{insight.referenceNote}</p>
                )}
              </section>
            </Reveal>
          )}
        </article>
      </div>

      {/* Keep reading */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-600">Keep reading</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  More insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-sky-700"
              >
                View all insights
                <Arrow className="transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {more.map((m, i) => (
              <Reveal key={m.slug} delay={i * 120}>
                <AnimatedInsightCard insight={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}