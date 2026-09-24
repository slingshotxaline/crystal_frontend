'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import QuoteForm from './QuoteForm';

function Breadcrumb({ title }) {
  return (
    <p className="text-sm text-navy-100/70">
      <Link href="/" className="hover:text-white">Home</Link>
      {' / '}
      <Link href="/services" className="hover:text-white">Services</Link>
      {' / '}
      <span className="text-navy-100">{title}</span>
    </p>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-navy-900">{question}</span>
        <Icon
          name="plus"
          className={`h-4 w-4 shrink-0 text-crimson transition-transform ${open ? 'rotate-45' : ''}`}
          strokeWidth={2.4}
        />
      </button>
      {open && <p className="mt-2 text-sm text-navy-400">{answer}</p>}
    </div>
  );
}

function Sidebar({ service }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-lg border border-navy-100 bg-white p-6">
        {service.relatedServices?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-navy-900">Related services</h3>
            <div className="mt-3 flex flex-col gap-2">
              {service.relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="focus-ring rounded-md border border-navy-200 px-3 py-2 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {service.relatedIndustries?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-navy-900">Related industries</h3>
            <div className="mt-3 flex flex-col gap-2">
              {service.relatedIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="focus-ring rounded-md border border-navy-200 px-3 py-2 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
                >
                  {ind.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link
          href="#enquiry"
          className="focus-ring mt-6 block rounded-md bg-crimson px-5 py-3 text-center text-sm font-bold text-white hover:bg-crimson-700"
        >
          {service.primaryCta}
        </Link>
      </div>
    </aside>
  );
}

export default function ServiceTemplate({ service }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 py-14 text-white sm:py-16">
        <div className="container-content">
          <Breadcrumb title={service.title} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-crimson">{service.category}</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{service.headline}</h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">{service.subhead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#enquiry" className="focus-ring rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700">
              {service.primaryCta}
            </Link>
            <Link href="#enquiry" className="focus-ring rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white">
              {service.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Main content + sidebar */}
      <section className="bg-cream py-14 sm:py-16">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr,320px]">
          <div>
            {/* What this helps you control */}
            {service.controls?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                  What this helps you control
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {service.controls.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities */}
            {service.capabilities?.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Capabilities</p>
                <div className="mt-4 divide-y divide-navy-100 border-t border-navy-100">
                  {service.capabilities.map((cap) => (
                    <p key={cap} className="py-3 text-navy-700">{cap}</p>
                  ))}
                </div>
              </div>
            )}

            {/* How we support the shipment */}
            {service.supportSteps?.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                  How we support the shipment
                </p>
                <div className="mt-4 divide-y divide-navy-100 border-t border-navy-100">
                  {service.supportSteps.map((step, i) => (
                    <div key={step} className="flex items-start gap-4 py-3.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-300 text-xs font-bold text-navy-700">
                        {i + 1}
                      </span>
                      <p className="text-navy-700">{step}</p>
                    </div>
                  ))}
                </div>

                {service.proofNote && (
                  <div className="mt-5 rounded-md border border-dashed border-navy-300 bg-cream-100 p-4">
                    <p className="text-sm text-navy-500">
                      <span className="font-bold text-navy-700">Proof &amp; conversion: </span>
                      {service.proofNote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* FAQ */}
            {service.faqs?.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                  Frequently Asked Questions
                </p>
                <div className="mt-4 border-t border-navy-100">
                  {service.faqs.map((faq) => (
                    <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <Sidebar service={service} />
        </div>
      </section>

      {/* Contextual quote form */}
      <section id="enquiry" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Next Step</p>
          <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">{service.primaryCta}</h2>
          <p className="mt-3 text-navy-400">
            Share the details and Crystal will confirm the practical option within one business day.
          </p>
          <div className="mt-6">
            <QuoteForm source="general_quote" title={`${service.title} Enquiry`} />
          </div>
        </div>
      </section>
    </>
  );
}