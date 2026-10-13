"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listQuotes, listEnquiries } from "@/lib/adminApi";

/* ---------- tiny inline icons (no extra dependencies) ---------- */
const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons = {
  quote: (
    <Icon>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </Icon>
  ),
  enquiry: (
    <Icon>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </Icon>
  ),
  services: (
    <Icon>
      <path d="M3 17h13l3-5h2M3 17V8h9v9M6 20a1.5 1.5 0 1 0 0-.01M15 20a1.5 1.5 0 1 0 0-.01" />
    </Icon>
  ),
  industries: (
    <Icon>
      <path d="M3 21V10l6 3V9l6 3V5h6v16zM3 21h18" />
    </Icon>
  ),
  caseStudies: (
    <Icon>
      <path d="M4 6a2 2 0 0 1 2-2h9l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 13l2.5 2.5L16 10" />
    </Icon>
  ),
  insights: (
    <Icon>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </Icon>
  ),
  jobs: (
    <Icon>
      <path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16" />
    </Icon>
  ),
  arrow: (
    <Icon className="h-4 w-4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  ),
  refresh: (
    <Icon className="h-4 w-4">
      <path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4" />
    </Icon>
  ),
  alert: (
    <Icon>
      <path d="M12 3l10 18H2zM12 10v5M12 18h.01" />
    </Icon>
  ),
};

const MANAGE_LINKS = [
  {
    label: "Services",
    desc: "Edit freight & logistics offerings",
    href: "/admin/services",
    icon: icons.services,
  },
  {
    label: "Industries",
    desc: "Update sectors you serve",
    href: "/admin/industries",
    icon: icons.industries,
  },
  {
    label: "Case Studies",
    desc: "Publish customer success stories",
    href: "/admin/case-studies",
    icon: icons.caseStudies,
  },
  {
    label: "Insights",
    desc: "Write and manage articles",
    href: "/admin/insights",
    icon: icons.insights,
  },
  {
    label: "Careers / Jobs",
    desc: "Open roles and applications",
    href: "/admin/jobs",
    icon: icons.jobs,
  },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/* ---------- stat panel ---------- */
function StatPanel({
  title,
  icon,
  newCount,
  total,
  newHref,
  allHref,
  loading,
}) {
  const pct = total > 0 ? Math.round((newCount / total) * 100) : 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-crimson/5"
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white">
            {icon}
          </span>
          <h2 className="text-base font-semibold text-navy-900">{title}</h2>
        </div>
        <Link
          href={allHref}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-navy-400 transition-colors hover:bg-navy-100/60 hover:text-navy-900"
        >
          View all {icons.arrow}
        </Link>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-4">
        <Link
          href={newHref}
          className="focus-ring group rounded-xl border border-crimson/20 bg-crimson/5 p-4 transition-colors hover:border-crimson/50"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-crimson-700">
            New
          </p>
          {loading ? (
            <div className="mt-2 h-9 w-14 animate-pulse rounded-md bg-crimson/10" />
          ) : (
            <p className="mt-1 text-4xl font-extrabold tabular-nums text-crimson">
              {newCount ?? "—"}
            </p>
          )}
          <p className="mt-1 text-xs text-navy-400 group-hover:text-navy-800">
            Needs a response
          </p>
        </Link>

        <Link
          href={allHref}
          className="focus-ring group rounded-xl border border-navy-100 bg-navy-100/30 p-4 transition-colors hover:border-navy-400"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Total
          </p>
          {loading ? (
            <div className="mt-2 h-9 w-14 animate-pulse rounded-md bg-navy-100" />
          ) : (
            <p className="mt-1 text-4xl font-extrabold tabular-nums text-navy-900">
              {total ?? "—"}
            </p>
          )}
          <p className="mt-1 text-xs text-navy-400 group-hover:text-navy-800">
            All time
          </p>
        </Link>
      </div>

      <div className="relative mt-5">
        <div className="flex items-center justify-between text-xs text-navy-400">
          <span>Unattended</span>
          <span className="font-semibold text-navy-800">
            {loading ? "…" : `${pct}%`}
          </span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-navy-100"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${title}: ${pct}% unattended`}
        >
          <div
            className="h-full rounded-full bg-crimson transition-all duration-700 ease-out"
            style={{ width: loading ? "0%" : `${pct}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default function AdminHomePage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [today, setToday] = useState("");
  const [hello, setHello] = useState("Welcome back");

  useEffect(() => {
    setHello(greeting());
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([
      listQuotes("?status=new&limit=1"),
      listQuotes("?limit=1"),
      listEnquiries("?status=new&limit=1"),
      listEnquiries("?limit=1"),
    ])
      .then(([newQuotes, allQuotes, newEnquiries, allEnquiries]) => {
        if (!active) return;
        setStats({
          newQuotes: newQuotes.total,
          allQuotes: allQuotes.total,
          newEnquiries: newEnquiries.total,
          allEnquiries: allEnquiries.total,
        });
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const pending = (stats?.newQuotes ?? 0) + (stats?.newEnquiries ?? 0);

  return (
    <div className="mx-auto container">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {today && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-400">
              {today}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">
            {hello} 👋
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            A quick look at what needs attention today.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          disabled={loading}
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-navy-400 disabled:opacity-60"
        >
          <span className={loading ? "animate-spin" : ""}>{icons.refresh}</span>
          {loading ? "Refreshing" : "Refresh"}
        </button>
      </header>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-700"
        >
          <span className="mt-0.5 text-crimson">{icons.alert}</span>
          <div className="flex-1">
            <p className="font-semibold">Couldn&rsquo;t load stats</p>
            <p className="mt-0.5 opacity-90">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="focus-ring rounded-full bg-crimson px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Try again
          </button>
        </div>
      )}

      {/* Attention banner */}
      {!loading && !error && (
        <div
          className={`mt-6 flex items-center justify-between gap-4 rounded-2xl p-5 ${
            pending > 0
              ? "bg-navy-900 text-white"
              : "border border-navy-100 bg-white text-navy-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                pending > 0 ? "bg-white/10" : "bg-navy-100/60"
              }`}
            >
              {pending > 0 ? icons.alert : icons.caseStudies}
            </span>
            <p className="text-sm">
              {pending > 0 ? (
                <>
                  You have{" "}
                  <span className="font-bold">
                    {pending} new {pending === 1 ? "item" : "items"}
                  </span>{" "}
                  waiting for a response.
                </>
              ) : (
                <>
                  You&rsquo;re all caught up. Nothing new needs your attention.
                </>
              )}
            </p>
          </div>
          {pending > 0 && (
            <Link
              href={
                stats?.newQuotes > 0
                  ? "/admin/quotes?status=new"
                  : "/admin/enquiries?status=new"
              }
              className="focus-ring hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy-900 transition hover:bg-white/90 sm:inline-flex"
            >
              Review now {icons.arrow}
            </Link>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <StatPanel
          title="Quote Requests"
          icon={icons.quote}
          newCount={stats?.newQuotes}
          total={stats?.allQuotes}
          newHref="/admin/quotes?status=new"
          allHref="/admin/quotes"
          loading={loading}
        />
        <StatPanel
          title="Enquiries"
          icon={icons.enquiry}
          newCount={stats?.newEnquiries}
          total={stats?.allEnquiries}
          newHref="/admin/enquiries?status=new"
          allHref="/admin/enquiries"
          loading={loading}
        />
      </div>

      {/* Content management */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">Manage content</h2>
        <p className="mt-1 text-sm text-navy-400">
          Jump straight into the sections of your website.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MANAGE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring group relative flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-crimson/60 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-100/50 text-navy-800 transition-colors group-hover:bg-crimson group-hover:text-white">
                {link.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-navy-900 group-hover:text-crimson">
                  {link.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-navy-400">
                  {link.desc}
                </span>
              </span>
              <span className="mt-1 text-navy-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-crimson">
                {icons.arrow}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
