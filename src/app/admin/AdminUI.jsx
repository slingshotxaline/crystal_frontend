'use client';

/* =====================================================================
   Shared admin UI pieces used by the Quotes and Enquiries pages.
   Place at: app/admin/AdminUI.jsx   (matches your import path)
   ===================================================================== */

export const pretty = (s) => (s ? String(s).replace(/_/g, ' ') : '');

export const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

/* ---------- icons ---------- */
const Svg = ({ children, className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const icons = {
  search: (
    <Svg>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Svg>
  ),
  refresh: (
    <Svg>
      <path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4" />
    </Svg>
  ),
  chevron: (
    <Svg className="h-3.5 w-3.5">
      <path d="M6 9l6 6 6-6" />
    </Svg>
  ),
  arrowRight: (
    <Svg className="h-3.5 w-3.5 shrink-0">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  ),
  mail: (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  ),
  phone: (
    <Svg>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </Svg>
  ),
  inbox: (
    <Svg className="h-7 w-7">
      <path d="M3 13l3-8h12l3 8v6H3z" />
      <path d="M3 13h5l1 3h6l1-3h5" />
    </Svg>
  ),
  alert: (
    <Svg className="h-5 w-5">
      <path d="M12 3l10 18H2zM12 10v5M12 18h.01" />
    </Svg>
  ),
  file: (
    <Svg>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
    </Svg>
  ),
  x: (
    <Svg>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  ),
};

/* ---------- status colours ---------- */
const STATUS_STYLES = {
  new: { pill: 'bg-crimson/10 text-crimson-700 ring-crimson/25', dot: 'bg-crimson' },
  in_review: { pill: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500' },
  quoted: { pill: 'bg-sky-50 text-sky-700 ring-sky-200', dot: 'bg-sky-500' },
  responded: { pill: 'bg-sky-50 text-sky-700 ring-sky-200', dot: 'bg-sky-500' },
  won: { pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  lost: { pill: 'bg-slate-100 text-slate-600 ring-slate-200', dot: 'bg-slate-400' },
  closed: { pill: 'bg-slate-100 text-slate-600 ring-slate-200', dot: 'bg-slate-400' },
  spam: { pill: 'bg-neutral-100 text-neutral-500 ring-neutral-200', dot: 'bg-neutral-400' },
};
const fallbackStyle = STATUS_STYLES.closed;

const TYPE_STYLES = {
  general: 'bg-slate-100 text-slate-700 ring-slate-200',
  partnership: 'bg-violet-50 text-violet-700 ring-violet-200',
  careers: 'bg-teal-50 text-teal-700 ring-teal-200',
};

export function TypeBadge({ type }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
        TYPE_STYLES[type] ?? TYPE_STYLES.general
      }`}
    >
      {type}
    </span>
  );
}

/** Coloured status pill that is also a native <select> (accessible, no popover code). */
export function StatusSelect({ value, options, onChange, label }) {
  const s = STATUS_STYLES[value] ?? fallbackStyle;
  return (
    <span className="relative inline-flex items-center">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`focus-ring cursor-pointer appearance-none rounded-full py-2 pl-6 pr-7 text-xs font-semibold capitalize ring-1 ring-inset transition-shadow hover:shadow-sm sm:py-1.5 ${s.pill}`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {pretty(o)}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-2.5 h-2 w-2 rounded-full ${s.dot}`}
      />
      <span aria-hidden="true" className="pointer-events-none absolute right-2 opacity-60">
        {icons.chevron}
      </span>
    </span>
  );
}

/* ---------- layout pieces ---------- */
export function PageHeader({ title, subtitle, onRefresh, loading }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-navy-400">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-navy-400 disabled:opacity-60 sm:w-fit sm:py-2"
      >
        <span className={loading ? 'animate-spin' : ''}>{icons.refresh}</span>
        {loading ? 'Refreshing' : 'Refresh'}
      </button>
    </header>
  );
}

export function SearchInput({ value, onChange, placeholder, className = '' }) {
  return (
    <label className={`relative block w-full lg:max-w-xs ${className}`}>
      <span className="sr-only">{placeholder}</span>
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400">
        {icons.search}
      </span>
      {/* text-base on mobile stops iOS Safari zooming the page when the field is focused */}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-navy-100 bg-white py-2.5 pl-10 pr-4 text-base text-navy-900 shadow-sm placeholder:text-navy-400 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20 sm:text-sm"
      />
    </label>
  );
}

/**
 * Pill-style filter group. `value === ''` means "all".
 * One swipeable row on phones, wraps on larger screens.
 */
export function FilterChips({ options, value, onChange, allLabel = 'All', label, className = '' }) {
  const all = ['', ...options];
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex w-0 min-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:w-auto sm:min-w-0 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {all.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt || 'all'}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`focus-ring shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold capitalize transition sm:px-3.5 sm:py-1.5 ${
              active
                ? 'bg-navy-900 text-white shadow-sm'
                : 'border border-navy-100 bg-white text-navy-500 hover:border-navy-400 hover:text-navy-900'
            }`}
          >
            {opt ? pretty(opt) : allLabel}
          </button>
        );
      })}
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="mt-6 flex flex-wrap items-start gap-3 rounded-xl border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-700"
    >
      <span className="mt-0.5 text-crimson">{icons.alert}</span>
      <p className="min-w-0 flex-1 basis-40 break-words">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="focus-ring rounded-full bg-crimson px-3.5 py-2 text-xs font-semibold text-white hover:opacity-90 sm:py-1.5"
      >
        Try again
      </button>
    </div>
  );
}

export function EmptyState({ title, text, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center sm:py-16">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100/60 text-navy-400">
        {icons.inbox}
      </span>
      <h3 className="mt-4 text-base font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-navy-400">{text}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="focus-ring mt-5 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-navy-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* ---------- loading skeletons ---------- */
export function SkeletonRows({ cols, rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-navy-100 last:border-0">
          {Array.from({ length: cols }).map((__, c) => (
            <td key={c} className="px-5 py-4">
              <div
                className="h-4 animate-pulse rounded-md bg-navy-100"
                style={{ width: `${55 + ((r * 7 + c * 13) % 40)}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/** Card-shaped skeletons for the phone / tablet layout. */
export function SkeletonCards({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-6 w-28 animate-pulse rounded-md bg-navy-100" />
            <div className="h-4 w-16 animate-pulse rounded-md bg-navy-100" />
          </div>
          <div className="mt-4 h-4 w-3/4 animate-pulse rounded-md bg-navy-100" />
          <div className="mt-4 flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-full bg-navy-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded-md bg-navy-100" />
              <div className="h-3 w-1/3 animate-pulse rounded-md bg-navy-100" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4">
            <div className="h-8 w-24 animate-pulse rounded-full bg-navy-100" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-navy-100" />
          </div>
        </div>
      ))}
    </>
  );
}

/** Card wrapper for the phone / tablet layout. An open card spans both columns on tablets. */
export function MobileCard({ open, children }) {
  return (
    <article
      className={`min-w-0 rounded-2xl border bg-white p-4 shadow-sm transition-colors ${
        open ? 'border-navy-400 sm:col-span-2' : 'border-navy-100'
      }`}
    >
      {children}
    </article>
  );
}

/* ---------- small building blocks ---------- */
export function Avatar({ name }) {
  const initials = (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white"
    >
      {initials || '?'}
    </span>
  );
}

export function ExpandButton({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={`focus-ring inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition sm:px-3 sm:py-1.5 ${
        open
          ? 'border-navy-900 bg-navy-900 text-white'
          : 'border-navy-100 bg-white text-navy-700 hover:border-crimson hover:text-crimson'
      }`}
    >
      {open ? 'Hide' : 'Details'}
      <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>{icons.chevron}</span>
    </button>
  );
}

/** `wide` makes the field span both columns (long values like email, subject, commodity). */
export function Field({ label, value, href, wide }) {
  const content = value ?? '—';
  return (
    <div className={`min-w-0 ${wide ? 'col-span-2' : ''}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">{label}</p>
      {href && value && value !== '—' ? (
        <a
          href={href}
          className="focus-ring mt-0.5 block text-sm font-medium text-navy-900 underline-offset-4 [overflow-wrap:anywhere] hover:text-crimson hover:underline"
        >
          {content}
        </a>
      ) : (
        <p className="mt-0.5 text-sm font-medium text-navy-900 [overflow-wrap:anywhere]">{content}</p>
      )}
    </div>
  );
}

export function DetailCard({ title, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-navy-100 bg-white p-4 sm:p-5">
      <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-navy-400">{title}</h4>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6">{children}</div>
    </div>
  );
}

/** Free-text block (message / notes). */
export function TextCard({ title, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-navy-100 bg-white p-4 sm:p-5">
      <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-navy-400">{title}</h4>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-navy-700 [overflow-wrap:anywhere]">{children}</p>
    </div>
  );
}

export function ActionLink({ href, icon, children, primary }) {
  return (
    <a
      href={href}
      className={`focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition sm:flex-none sm:py-2 ${
        primary
          ? 'bg-crimson text-white hover:opacity-90'
          : 'border border-navy-100 bg-white text-navy-800 hover:border-navy-400'
      }`}
    >
      {icon}
      {children}
    </a>
  );
}