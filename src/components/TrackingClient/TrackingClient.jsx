"use client";
import { useState, useEffect } from "react";

/* ---------- DEMO DATA: replace lookupShipment() with your real API call ---------- */
const DEMO = {
  ref: "CEL-000000",
  from: { city: "Shanghai", code: "CN", x: 610, y: 70 },
  to: { city: "Hamburg", code: "DE", x: 70, y: 130 },
  eta: "Fri, 9 Oct",
  progress: 0.58, // 0..1 along the route
  details: [
    ["Mode", "Ocean freight, FCL"],
    ["Container", "40 ft HC · CELU 482910 3"],
    ["Vessel / voyage", "Sample Vessel · 026E"],
    ["Cargo", "Consumer electronics, 18 pallets"],
    ["Gross weight", "14,250 kg"],
    ["Incoterm", "FOB Shanghai"],
  ],
  stats: [
    ["Distance covered", "8,120 km"],
    ["Distance remaining", "5,880 km"],
    ["Average speed", "19.2 knots"],
    ["Days to arrival", "10"],
  ],
  activity: [
    ["Position update", "Arabian Sea, heading west-northwest", "Just now"],
    ["Weather check", "Clear conditions, no route delay expected", "2 h ago"],
    ["Customs pre-alert", "Import data sent to Hamburg agent", "Yesterday"],
    ["Departure confirmed", "Vessel left Shanghai on schedule", "17 Sep"],
  ],
  docs: [
    ["Bill of lading", "PDF · 212 KB"],
    ["Commercial invoice", "PDF · 148 KB"],
    ["Packing list", "PDF · 96 KB"],
    ["Arrival notice", "Available before arrival"],
  ],
  steps: [
    { label: "Booked", place: "Shanghai", time: "12 Sep, 09:14", done: true },
    {
      label: "Picked up",
      place: "Shanghai",
      time: "14 Sep, 16:40",
      done: true,
    },
    {
      label: "Departed origin port",
      place: "Shanghai",
      time: "17 Sep, 22:05",
      done: true,
    },
    {
      label: "In transit",
      place: "Indian Ocean",
      time: "Updated 4 min ago",
      current: true,
    },
    { label: "Arrive destination port", place: "Hamburg", time: "Est. 7 Oct" },
    { label: "Customs and delivery", place: "Hamburg", time: "Est. 9 Oct" },
  ],
};

async function lookupShipment(ref) {
  await new Promise((r) => setTimeout(r, 1400)); // fake network delay
  if (!/^CEL-\d{6}$/i.test(ref.trim())) return null;
  return { ...DEMO, ref: ref.trim().toUpperCase() };
}

const ROUTE = "M610 70 C 470 -10, 330 190, 70 130";

export default function TrackingClient() {
  const [ref, setRef] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | found | notfound
  const [data, setData] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setState("loading");
    const res = await lookupShipment(ref);
    setData(res);
    setState(res ? "found" : "notfound");
  }

  return (
    <section className="min-h-screen bg-[#f4f6fa] py-14 sm:py-20">
      <style>{`
        @keyframes flow { to { stroke-dashoffset: -28; } }
        @keyframes ping { 0% { r: 6; opacity: .7 } 100% { r: 24; opacity: 0 } }
        @keyframes sweep { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }
        @keyframes blink { 50% { opacity: .35 } }
        @keyframes rise { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        .flow { animation: flow 1.2s linear infinite; }
        .ping { animation: ping 2s ease-out infinite; }
        .blink { animation: blink 1.6s ease-in-out infinite; }
        .sweep::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent); animation: sweep 1.6s linear infinite; }
        .rise { animation: rise .5s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .flow,.ping,.blink,.sweep::after,.rise { animation: none !important; } }
      `}</style>

      <div className="mx-auto max-w-5xl px-5">
        <h1 className="text-3xl font-bold tracking-tight text-[#0f2a52] sm:text-5xl">
          Where is your cargo right now?
        </h1>
        <p className="mt-3 max-w-xl text-[#5b6b85]">
          Enter your Crystal Express shipment reference to see live status, the
          route so far and what happens next.
        </p>

        {/* Search */}
        <form
          onSubmit={submit}
          className="mt-8 flex flex-col gap-3 rounded-xl border border-[#dde3ee] bg-white p-4 shadow-sm sm:flex-row"
        >
          <label className="sr-only" htmlFor="ref">
            Shipment reference
          </label>
          <input
            id="ref"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="e.g. CEL-000000"
            className="flex-1 rounded-lg border border-[#dde3ee] bg-[#f8f9fc] px-4 py-3 font-mono text-sm text-[#0f2a52] outline-none focus:border-[#e3202d] focus:ring-2 focus:ring-[#e3202d]/20"
          />
          <button
            disabled={!ref.trim() || state === "loading"}
            className="rounded-lg bg-[#e3202d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#c81a26] disabled:cursor-not-allowed disabled:bg-[#cbd5e1]"
          >
            {state === "loading" ? "Locating…" : "Track shipment"}
          </button>
        </form>
        <p className="mt-2 text-xs text-[#7a889e]">
          Prototype: results shown are sample data. Any reference like
          CEL-123456 displays the demo route.
        </p>

        {state === "loading" && (
          <div className="mt-8 space-y-3" aria-live="polite">
            {[100, 70, 85].map((w) => (
              <div
                key={w}
                className="sweep relative h-5 overflow-hidden rounded bg-[#e4e9f2]"
                style={{ width: w + "%" }}
              />
            ))}
          </div>
        )}

        {state === "notfound" && (
          <p
            className="rise mt-8 rounded-lg border border-[#f5c2c7] bg-[#fdecee] p-4 text-sm text-[#8a1c25]"
            role="alert"
          >
            We could not find that reference. Check it matches the format
            CEL-000000, or contact your coordinator.
          </p>
        )}

        {state === "found" && data && <Result d={data} />}

        {/* Always-visible help content */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            [
              "Find your reference",
              "It starts with CEL- and appears on your booking confirmation and on every email from your coordinator.",
            ],
            [
              "Read the milestones",
              'Each step shows the place and time. Estimates are marked "Est." until the event happens.',
            ],
            [
              "Get help early",
              "If a step looks late, contact your coordinator before the cut-off. Earlier warning means more options.",
            ],
          ].map(([t, b]) => (
            <div key={t} className="border-t-2 border-[#e3202d] pt-4">
              <h2 className="font-semibold text-[#0f2a52]">{t}</h2>
              <p className="mt-1 text-sm text-[#5b6b85]">{b}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-xl font-bold text-[#0f2a52]">
          Common questions
        </h2>
        <div className="mt-4 divide-y divide-[#dde3ee] rounded-xl border border-[#dde3ee] bg-white">
          {[
            [
              "How often does tracking refresh?",
              "To be confirmed with IT. Sample data on this page updates every second for demonstration only.",
            ],
            [
              "Which reference types work?",
              "Shipment references in the format CEL-000000. Container and booking numbers may be added later.",
            ],
            [
              "What if my shipment is delayed?",
              "Your coordinator is told first and will contact you with a new estimate and options.",
            ],
            [
              "Who can see my documents?",
              "Only signed-in customers with access to that shipment, once customer login is connected.",
            ],
          ].map(([q, a]) => (
            <details key={q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#0f2a52]">
                {q}
                <span className="text-[#e3202d] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm text-[#5b6b85]">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#0f2a52] p-6 text-white">
          <div>
            <p className="text-lg font-semibold">Need an answer now?</p>
            <p className="text-sm text-white/70">
              Our operations team can confirm status by phone or email.
            </p>
          </div>
          <a
            href="/contact"
            className="rounded-lg bg-[#e3202d] px-6 py-3 text-sm font-semibold hover:bg-[#c81a26]"
          >
            Contact an office
          </a>
        </div>
      </div>
    </section>
  );
}

function Result({ d }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPct(d.progress), 150); // triggers the fill animation
    return () => clearTimeout(t);
  }, [d.progress]);

  const [secs, setSecs] = useState(4 * 60);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const ago =
    secs < 60
      ? `${secs}s ago`
      : `${Math.floor(secs / 60)} min ${secs % 60}s ago`;

  return (
    <div className="rise mt-8 overflow-hidden rounded-2xl bg-[#0f2a52] text-white shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="font-mono text-sm text-white/60">{d.ref}</p>
          <p className="text-xl font-semibold">
            {d.from.city} to {d.to.city}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
          <span className="blink h-2 w-2 rounded-full bg-[#4ade80]" />
          Live · In transit · updated {ago}
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60">Estimated arrival</p>
          <p className="text-lg font-semibold">{d.eta}</p>
        </div>
      </div>

      {/* Route map */}
      <svg
        viewBox="0 0 680 220"
        className="w-full"
        role="img"
        aria-label={`Route from ${d.from.city} to ${d.to.city}, ${Math.round(d.progress * 100)}% complete`}
      >
        <defs>
          <pattern
            id="dots"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="#ffffff" opacity=".1" />
          </pattern>
        </defs>
        <rect width="680" height="220" fill="url(#dots)" />
        {/* full route (upcoming) */}
        <path
          d={ROUTE}
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".2"
          strokeWidth="2"
          strokeDasharray="4 8"
        />
        {/* travelled part, animated dashes */}
        <path
          d={ROUTE}
          pathLength="1"
          fill="none"
          stroke="#e3202d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${pct} 1`}
          style={{
            transition: "stroke-dasharray 1.6s cubic-bezier(.4,0,.2,1)",
          }}
        />
        <path
          d={ROUTE}
          pathLength="1"
          fill="none"
          stroke="#fff"
          strokeOpacity=".9"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          className="flow"
          style={{ clipPath: "none" }}
          opacity={pct ? 0.35 : 0}
        />

        {/* ports */}
        {[d.from, d.to].map((p) => (
          <g key={p.city}>
            <circle cx={p.x} cy={p.y} r="6" fill="#fff" />
            <text
              x={p.x}
              y={p.y + (p.x > 300 ? -14 : 24)}
              textAnchor="middle"
              fill="#fff"
              fontSize="13"
              fontWeight="600"
            >
              {p.city}
            </text>
          </g>
        ))}
        <circle
          cx={d.to.x}
          cy={d.to.y}
          r="6"
          fill="none"
          stroke="#fff"
          className="ping"
        />

        {/* vessel: rests at current progress, gently drifting forward */}
        <g>
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            rotate="auto"
            keyPoints={`${Math.max(d.progress - 0.03, 0)};${d.progress}`}
            keyTimes="0;1"
            calcMode="linear"
            path={ROUTE}
          />
          <circle r="16" fill="#e3202d" opacity=".25" className="blink" />
          <path d="M-9 -5 L9 0 L-9 5 L-5 0 Z" fill="#fff" />
        </g>
      </svg>

      {/* Progress bar */}
      <div className="px-6">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[#e3202d]"
            style={{
              width: `${pct * 100}%`,
              transition: "width 1.6s cubic-bezier(.4,0,.2,1)",
            }}
          />
        </div>
        <p className="mt-2 text-xs text-white/60">
          {Math.round(d.progress * 100)}% of journey complete
        </p>
      </div>

      {/* Milestones */}
      <ol className="mt-4 bg-white px-6 py-6 text-[#0f2a52]">
        {d.steps.map((s, i) => (
          <li
            key={s.label}
            className="rise relative flex gap-4 pb-5 last:pb-0"
            style={{ animationDelay: `${i * 90 + 200}ms` }}
          >
            {i < d.steps.length - 1 && (
              <span
                className={`absolute left-[7px] top-5 h-full w-0.5 ${s.done ? "bg-[#e3202d]" : "bg-[#dde3ee]"}`}
              />
            )}
            <span className="relative mt-1 h-4 w-4 shrink-0">
              {s.current && (
                <span className="blink absolute -inset-1.5 rounded-full bg-[#e3202d]/25" />
              )}
              <span
                className={`absolute inset-0 rounded-full border-2 ${s.done || s.current ? "border-[#e3202d] bg-[#e3202d]" : "border-[#c5cedd] bg-white"}`}
              />
            </span>
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
              <div>
                <p
                  className={`font-semibold ${!s.done && !s.current ? "text-[#7a889e]" : ""}`}
                >
                  {s.label}
                </p>
                <p className="text-sm text-[#5b6b85]">{s.place}</p>
              </div>
              <p className="text-sm text-[#5b6b85]">{s.time}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Journey stats */}
      <div className="grid grid-cols-2 gap-px border-t border-[#e6ebf3] bg-[#e6ebf3] sm:grid-cols-4">
        {d.stats.map(([k, v]) => (
          <div key={k} className="bg-white px-6 py-4 text-[#0f2a52]">
            <p className="text-xs text-[#7a889e]">{k}</p>
            <p className="text-lg font-semibold">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-px border-t border-[#e6ebf3] bg-[#e6ebf3] md:grid-cols-2">
        {/* Shipment details */}
        <div className="bg-white px-6 py-6 text-[#0f2a52]">
          <h2 className="text-base font-semibold">Shipment details</h2>
          <dl className="mt-3 divide-y divide-[#eef1f6] text-sm">
            {d.details.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-[#7a889e]">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Activity feed */}
        <div className="bg-white px-6 py-6 text-[#0f2a52]">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            Latest activity{" "}
            <span className="blink h-2 w-2 rounded-full bg-[#4ade80]" />
          </h2>
          <ul className="mt-3 space-y-3 text-sm">
            {d.activity.map(([t, body, when], i) => (
              <li
                key={t}
                className="rise rounded-lg bg-[#f4f6fa] p-3"
                style={{ animationDelay: `${i * 120 + 400}ms` }}
              >
                <div className="flex justify-between gap-3">
                  <p className="font-semibold">{t}</p>
                  <p className="shrink-0 text-xs text-[#7a889e]">
                    {i === 0 ? ago : when}
                  </p>
                </div>
                <p className="mt-0.5 text-[#5b6b85]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Documents */}
      <div className="border-t border-[#e6ebf3] bg-white px-6 py-6 text-[#0f2a52]">
        <h2 className="text-base font-semibold">Documents</h2>
        <p className="mt-1 text-sm text-[#5b6b85]">
          Sample list. Real downloads need customer login and permission checks.
        </p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {d.docs.map(([name, meta]) => (
            <li
              key={name}
              className="flex items-center justify-between rounded-lg border border-[#dde3ee] px-4 py-3 text-sm"
            >
              <span>
                <span className="block font-medium">{name}</span>
                <span className="text-xs text-[#7a889e]">{meta}</span>
              </span>
              <button
                disabled
                className="rounded-md border border-[#dde3ee] px-3 py-1.5 text-xs font-semibold text-[#7a889e]"
              >
                Log in to download
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e6ebf3] bg-[#f8f9fc] px-6 py-4 text-sm text-[#5b6b85]">
        <span>Need more detail on this shipment?</span>
        <a
          href="/contact"
          className="rounded-md bg-[#0f2a52] px-4 py-2 font-semibold text-white hover:bg-[#163a70]"
        >
          Contact your coordinator
        </a>
      </div>
    </div>
  );
}
