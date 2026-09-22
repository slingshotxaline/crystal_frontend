import Link from 'next/link';
import Icon from './Icon';
import QuoteForm from './QuoteForm';
import { getServiceBySlug } from '@/data/services';

export default function IndustryTemplate({ industry }) {
  const relatedServices = (industry.relatedServices || [])
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">{industry.title}</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{industry.heroHeadline}</h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">{industry.summary}</p>
          <Link href="#enquiry" className="focus-ring mt-8 inline-flex rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700">
            Request a Quote
          </Link>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">What Shapes the Route</p>
          <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
            Considerations specific to {industry.title.toLowerCase()}.
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {(industry.considerations || []).map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-lg border border-navy-100 bg-white p-4 text-navy-700">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-crimson" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-cream-100 py-14 sm:py-16">
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Relevant Services</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="focus-ring group rounded-lg border border-navy-100 bg-white p-6 hover:border-crimson"
                >
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 text-crimson">
                    <Icon name={service.icon} className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-bold text-navy-900">{service.title}</h3>
                  <p className="mt-1.5 text-sm text-navy-400">{service.heroTagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-cream py-14 sm:py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Practical Example</p>
          <div className="mt-4 rounded-lg border border-navy-100 bg-white p-6">
            <p className="text-navy-700">
              An approved case study for {industry.title} will appear here once a completed shipment is confirmed
              with customer permission.
            </p>
            <Link href="/case-studies" className="mt-3 inline-flex text-sm font-semibold text-crimson underline">
              View all case studies
            </Link>
          </div>
        </div>
      </section>

      <section id="enquiry" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Next Step</p>
          <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
            Request a quote for {industry.title.toLowerCase()} cargo.
          </h2>
          <div className="mt-6">
            <QuoteForm source="general_quote" title={`${industry.title} Enquiry`} />
          </div>
        </div>
      </section>
    </>
  );
}
