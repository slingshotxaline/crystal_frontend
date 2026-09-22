export const metadata = {
  title: 'About Crystal Express',
  description: 'Founding story, operating model, leadership and Bangladesh presence of Crystal Express Limited.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">About Crystal Express</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Adaptable routing, Bangladesh knowledge, and responsible control.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Crystal Express is an independent freight forwarder built on Bangladesh execution. The company&rsquo;s
            strongest distinction is evaluating routing alternatives and keeping responsibility clear between
            origin, consolidation, transfer and destination coordination.
          </p>
        </div>
      </section>

      <section id="leadership" className="bg-cream py-16 sm:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Leadership</p>
            <h2 className="mt-3 text-2xl font-bold text-navy-900">Leadership profiles pending confirmation.</h2>
            <p className="mt-3 text-navy-400">
              Names, titles and photography will be published once approved by Crystal Express leadership.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Operating Model</p>
            <h2 className="mt-3 text-2xl font-bold text-navy-900">Bangladesh execution, connected internationally.</h2>
            <p className="mt-3 text-navy-400">
              Crystal coordinates air, ocean, inland and specialist logistics from Bangladesh origin, working with
              approved regional operations and international partners for onward movement.
            </p>
          </div>
        </div>
      </section>

      <section id="group-ecosystem" className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Group Ecosystem</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900">Crystal&rsquo;s place in a wider portfolio.</h2>
          <p className="mt-4 max-w-2xl text-navy-400">
            Crystal Express is one part of a broader group. Its territory is adaptable routing, Bangladesh
            knowledge and responsive control — distinct from EUR Service&rsquo;s reliability-led story, ELS&rsquo;s
            connected regional supply-chain platform, and Frugal Logistics&rsquo;s accessible, practical offer.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Crystal Express', desc: 'Flexible routing and accountable Bangladesh execution' },
              { name: 'EUR Service', desc: 'Reliability and specialist execution, GOH and CFS emphasis' },
              { name: 'ELS', desc: 'Connected regional supply chains, integrated logistics proposition' },
              { name: 'Frugal Logistics', desc: 'Accessible, responsive service for growing businesses' },
            ].map((brand) => (
              <div key={brand.name} className="rounded-lg border border-navy-100 bg-white p-5">
                <h3 className="font-bold text-navy-900">{brand.name}</h3>
                <p className="mt-2 text-sm text-navy-400">{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="affiliations" className="bg-cream py-16 sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Affiliations &amp; Compliance</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-navy-900">Memberships, verified before publication.</h2>
          <p className="mt-4 max-w-2xl text-navy-400">
            Membership, compliance programme and certification claims are published only once verified, and are
            not presented as equivalent credential types.
          </p>
        </div>
      </section>
    </>
  );
}
