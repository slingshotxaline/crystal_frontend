export const metadata = {
  title: 'Insights',
  description: 'Practical guidance for shipment, route and documentation decisions.',
};

const CATEGORIES = [
  { title: 'Bangladesh gateway guidance', desc: 'What to know about moving cargo through Dhaka and Chattogram.' },
  { title: 'Air and ocean market updates', desc: 'Capacity and schedule notes relevant to Bangladesh trade lanes.' },
  { title: 'Multimodal route explainers', desc: 'When a combined route adds value over a single mode.' },
  { title: 'Fashion and consolidation guidance', desc: 'Preparing GOH and buyer-consolidation shipments.' },
];

export default function InsightsPage() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Insights</p>
        <h1 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
          Practical guidance for the next shipment decision.
        </h1>
        <p className="mt-4 max-w-xl text-navy-400">
          Articles are drafted, dated and published from the CMS once editorial approval is granted. This page is
          shown pending that first batch of content.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-lg border border-navy-100 bg-white p-6">
              <h2 className="font-bold text-navy-900">{cat.title}</h2>
              <p className="mt-2 text-sm text-navy-400">{cat.desc}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-crimson">
                Articles pending editorial approval
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
