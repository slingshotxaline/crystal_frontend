import Link from 'next/link';

const CASES = [
  {
    category: 'Fashion / GOH',
    title: 'Fashion or GOH origin programme',
    rows: [
      'Requirement — apparel cargo with hanging presentation needs',
      'Route decision — pending',
      'Execution — pending',
      'Outcome — pending customer approval',
    ],
  },
  {
    category: 'Buyer Consolidation',
    title: 'Buyer consolidation through Chattogram',
    rows: [
      'Requirement — multi-supplier purchase orders',
      'Route decision — pending',
      'Execution — pending',
      'Outcome — pending customer approval',
    ],
  },
  {
    category: 'Urgent Air Freight',
    title: 'Urgent air-freight recovery',
    rows: [
      'Requirement — time-critical recovery cargo',
      'Route decision — pending',
      'Execution — pending',
      'Outcome — pending customer approval',
    ],
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Case Studies</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
          See how the shipment plan worked.
        </h2>
        <p className="mt-3 max-w-xl text-navy-400">
          Each case explains the requirement, route decision, operating controls and approved outcome without exposing confidential customer information.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {CASES.map((item) => (
            <div key={item.title} className="rounded-lg border border-navy-100 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-crimson">{item.category}</p>
              <h3 className="mt-1.5 font-bold text-navy-900">{item.title}</h3>
              <ul className="mt-4 space-y-2">
                {item.rows.map((row) => (
                  <li key={row} className="flex gap-2 text-sm text-navy-500">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                    {row}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-navy-400">
                Approved case content pending customer permission.
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/case-studies"
          className="focus-ring mt-6 inline-flex rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
        >
          View All Case Studies
        </Link>
      </div>
    </section>
  );
}
