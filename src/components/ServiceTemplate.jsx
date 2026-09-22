import Link from 'next/link';
import Icon from './Icon';
import QuoteForm from './QuoteForm';
import { industries } from '@/data/industries';
import { getServiceBySlug } from '@/data/services';

export default function ServiceTemplate({ service }) {
  const relatedIndustries = (service.relatedIndustries || [])
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter(Boolean);
  const relatedServices = (service.relatedServices || [])
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  return (
    <>
      {/* Hero — customer problem + service proposition */}
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-crimson">{service.heroTagline}</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{service.heroHeadline}</h1>
            <p className="mt-4 max-w-2xl text-navy-100/80">{service.problemStatement}</p>
            <p className="mt-3 max-w-2xl text-navy-100/80">{service.solutionSummary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#enquiry" className="focus-ring rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700">
                Request a Quote
              </Link>
              <Link href="/services" className="focus-ring rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white">
                All Services
              </Link>
            </div>
          </div>
          <span className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 text-crimson lg:flex">
            <Icon name={service.icon} className="h-9 w-9" strokeWidth={1.2} />
          </span>
        </div>
      </section>

      {/* When to use + required shipment info */}
      <section className="bg-cream py-14 sm:py-16">
        <div className="container-content grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">When to use this service</p>
            <p className="mt-3 text-navy-700">{service.whenToUse}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Information we&rsquo;ll need</p>
            <ul className="mt-3 space-y-2">
              {(service.requiredShipmentInfo || []).map((item) => (
                <li key={item} className="flex items-start gap-2 text-navy-700">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-crimson" strokeWidth={2.2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Available options — no guaranteed capacity/transit language */}
      {service.capabilities?.length > 0 && (
        <section className="bg-cream-100 py-14 sm:py-16">
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Available Options</p>
            <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
              Options matched to your shipment, confirmed per booking.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((cap) => (
                <div key={cap} className="rounded-lg border border-navy-100 bg-white p-5">
                  <p className="font-semibold text-navy-900">{cap}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs italic text-navy-400">
              Capacity, schedule and cost vary by shipment and operational conditions — options are confirmed once
              Operations reviews your requirement.
            </p>
          </div>
        </section>
      )}

      {/* Operating sequence + handover responsibilities */}
      {service.operatingSequence?.length > 0 && (
        <section className="bg-cream py-14 sm:py-16">
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">How It Works</p>
            <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">Operating sequence and handovers.</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {service.operatingSequence.map((step, i) => (
                <div key={step.title}>
                  <p className="text-xs font-bold text-crimson">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-bold text-navy-900">{step.title}</p>
                  <p className="mt-1.5 text-sm text-navy-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Evidence */}
      {service.evidence?.length > 0 && (
        <section className="bg-navy-900 py-14 text-white sm:py-16">
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-crimson">Evidence</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Backed by verified capability.</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {service.evidence.map((item) => (
                <li key={item} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits?.length > 0 && (
        <section className="bg-cream-100 py-14 sm:py-16">
          <div className="container-content">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Benefits</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="rounded-lg border border-navy-100 bg-white p-5">
                  <p className="text-navy-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related industries and services */}
      {(relatedIndustries.length > 0 || relatedServices.length > 0) && (
        <section className="bg-cream py-14 sm:py-16">
          <div className="container-content grid gap-10 lg:grid-cols-2">
            {relatedIndustries.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Relevant Industries</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedIndustries.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      className="focus-ring rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
                    >
                      {ind.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedServices.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Related Services</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="focus-ring rounded-full border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Case study placeholder */}
      <section className="bg-cream-100 py-14 sm:py-16">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Practical Example</p>
          <div className="mt-4 rounded-lg border border-navy-100 bg-white p-6">
            <p className="text-navy-700">
              An approved case study for {service.title} will appear here once a completed shipment is confirmed
              with customer permission.
            </p>
            <Link href="/case-studies" className="mt-3 inline-flex text-sm font-semibold text-crimson underline">
              View all case studies
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs?.length > 0 && (
        <section className="bg-cream py-14 sm:py-16">
          <div className="container-content max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Frequently Asked</p>
            <div className="mt-6 divide-y divide-navy-100 border-t border-navy-100">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between font-semibold text-navy-900">
                    {faq.question}
                    <Icon name="arrowRight" className="h-4 w-4 rotate-90 text-navy-400 transition-transform group-open:rotate-[270deg]" />
                  </summary>
                  <p className="mt-2 text-sm text-navy-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contextual form */}
      <section id="enquiry" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Next Step</p>
          <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
            Request a quote for {service.title}.
          </h2>
          <p className="mt-3 text-navy-400">
            Share the details above and Crystal will confirm the practical route within one business day.
          </p>
          <div className="mt-6">
            <QuoteForm source="general_quote" title={`${service.title} Enquiry`} />
          </div>
        </div>
      </section>
    </>
  );
}
