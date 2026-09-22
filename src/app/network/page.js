import NetworkMap from '@/components/NetworkMap';
import Link from 'next/link';

export const metadata = {
  title: 'Network',
  description: 'Crystal Express owned operations, joint ventures, group entities and partner coverage.',
};

const CATEGORIES = [
  {
    title: 'Crystal Office',
    color: '#dc2430',
    description: 'Directly operated by Crystal Express — Dhaka head office and Chattogram branch.',
  },
  {
    title: 'Joint Venture',
    color: '#16283f',
    description: 'Operated jointly with a local partner under a shared ownership model.',
  },
  {
    title: 'Regional Group Operation',
    color: '#5c6672',
    description: 'Operated by another entity within the wider group ecosystem.',
  },
  {
    title: 'Network Partner / Planned',
    color: '#aab2bc',
    description: 'Independent agents and trusted relationships, or coverage planned but not yet active.',
  },
];

export default function NetworkPage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">Network</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Local execution connected to the markets your cargo needs.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Every location on Crystal&rsquo;s network is classified by who operates it, so ownership is never
            implied where it does not exist.
          </p>
        </div>
      </section>

      <NetworkMap />

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-content">
          <h2 className="text-2xl font-bold text-navy-900">How locations are classified</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="rounded-lg border border-navy-100 bg-white p-5">
                <span className="mb-3 flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <h3 className="font-bold text-navy-900">{cat.title}</h3>
                <p className="mt-2 text-sm text-navy-400">{cat.description}</p>
              </div>
            ))}
          </div>

          <Link
            href="/partnership"
            className="focus-ring mt-8 inline-flex rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700"
          >
            Partner with Crystal
          </Link>
        </div>
      </section>
    </>
  );
}
