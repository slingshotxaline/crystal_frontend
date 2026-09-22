import QuoteForm from '@/components/QuoteForm';

export const metadata = {
  title: 'Request a Quote',
  description: 'Share your cargo, route and timing and Crystal Express will assess the practical options.',
};

export default function QuotePage() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Request a Quote</p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
            Share the cargo, route and timing.
          </h1>
          <p className="mt-4 max-w-md text-navy-400">
            We will tell you what we need to assess the next practical option. A member of the Crystal Express team
            reviews every request and responds with the workable route for your shipment.
          </p>

          <dl className="mt-8 space-y-5 border-t border-navy-100 pt-6">
            <div>
              <dt className="text-sm font-semibold text-navy-900">Fashion or GOH shipment?</dt>
              <dd className="mt-1 text-sm text-navy-400">
                Use this form and select Mode &rarr; Not sure, or visit the{' '}
                <a href="/services/fashion-goh" className="font-semibold text-crimson underline">Fashion Logistics</a> page for a specialist enquiry.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy-900">Oversized or project cargo?</dt>
              <dd className="mt-1 text-sm text-navy-400">
                Select Project Cargo as the mode so your enquiry reaches the project logistics team directly.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy-900">Looking to partner with Crystal?</dt>
              <dd className="mt-1 text-sm text-navy-400">
                Visit <a href="/partnership" className="font-semibold text-crimson underline">Partner with Crystal</a> instead.
              </dd>
            </div>
          </dl>
        </div>

        <QuoteForm source="general_quote" title="Request a Quote" />
      </div>
    </section>
  );
}
