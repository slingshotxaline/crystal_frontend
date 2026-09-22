import Link from 'next/link';

const MILESTONES = ['Received', 'Cleared', 'In Transit', 'Delivered'];

const TOOLS = [
  { title: 'Shipment Tracking & Milestones', desc: 'Shipment status and activity updates across the planned journey.' },
  { title: 'Delay & Exception Alerts', desc: 'Responsive exception communication helps teams act before disruption escalates.' },
  { title: 'Customer Shipment Access', desc: 'Accessible status, history and key shipment references.' },
  { title: 'Documents & Reporting', desc: 'Digital shipping documents, invoices and statements.' },
];

export default function DigitalVisibility() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Digital Visibility</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
          See the milestone. Know the next action.
        </h2>
        <p className="mt-3 max-w-xl text-navy-400">
          Shipment information is useful when it helps a team prepare, respond or escalate. We connect agreed status, documents and exception communication to the operating plan.
        </p>

        <div className="mt-10 rounded-xl bg-navy-900 p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold">Crystal Operations Control</h3>
            <span className="text-xs font-semibold uppercase tracking-wide text-moss">
              Prototype interface &mdash; pending integration
            </span>
          </div>

          <div className="relative mt-8 flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
            {MILESTONES.map((m, i) => (
              <div key={m} className="relative z-10 flex flex-col items-center gap-2">
                <span className={`h-3 w-3 rounded-full border-2 ${i < 3 ? 'border-crimson bg-crimson' : 'border-white/40 bg-navy-900'}`} />
                <span className="text-xs text-navy-100/80">{m}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <div key={tool.title} className="rounded-lg border border-white/10 p-5">
                <h4 className="font-semibold">{tool.title}</h4>
                <p className="mt-1.5 text-sm text-navy-100/70">{tool.desc}</p>
                <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-wide text-amber-300">
                  Prototype UI
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/digital"
          className="focus-ring mt-6 inline-flex rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
        >
          Explore Available Digital Tools
        </Link>
      </div>
    </section>
  );
}
