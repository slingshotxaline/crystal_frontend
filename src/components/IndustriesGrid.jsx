import Link from 'next/link';
import { industries } from '@/data/industries';

export default function IndustriesGrid() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Industries</p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">The cargo changes the plan.</h2>
        <p className="mt-3 max-w-xl text-navy-400">
          Product, order cycle, handling risk and compliance requirements shape the route, facility tasks and information each shipment needs.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-navy-100 bg-navy-100 sm:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="focus-ring group bg-white p-6 transition-colors hover:bg-cream-100"
            >
              <h3 className="text-[15px] font-bold text-navy-900 group-hover:text-crimson">{industry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-400">{industry.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
