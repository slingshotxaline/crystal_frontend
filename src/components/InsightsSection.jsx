import Link from 'next/link';

const CATEGORIES = [
  { title: 'Bangladesh gateway guidance' },
  { title: 'Air and ocean market updates' },
  { title: 'Multimodal route explainers' },
  { title: 'Fashion and consolidation guidance' },
];

export default function InsightsSection() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Insights</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
          Practical guidance for the next shipment decision.
        </h2>
        <p className="mt-3 max-w-xl text-navy-400">
          Short, dated content to help customers prepare cargo, documents and route choices.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-lg border border-navy-100 bg-white p-5">
              <h3 className="text-[15px] font-bold text-navy-900">{cat.title}</h3>
              <p className="mt-2 text-xs text-navy-400">Category — articles pending editorial approval</p>
            </div>
          ))}
        </div>

        <Link
          href="/insights"
          className="focus-ring mt-6 inline-flex rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
        >
          Browse Insights
        </Link>
      </div>
    </section>
  );
}
