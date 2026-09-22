import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-crimson py-16 text-center text-white sm:py-20">
      <div className="container-content">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Share the cargo, route and timing.
        </h2>
        <p className="mt-3 text-white/85">We will tell you what we need to assess the next practical option.</p>

        <Link
          href="/quote"
          className="focus-ring mt-8 inline-flex rounded-md bg-white px-8 py-3.5 text-sm font-bold text-crimson hover:bg-cream-100"
        >
          Request a Quote
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/contact" className="focus-ring rounded font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white">
            Contact an Office
          </Link>
          <Link href="/tracking" className="focus-ring rounded font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white">
            Track a Shipment
          </Link>
          <Link href="/partnership" className="focus-ring rounded font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white">
            Partner with Crystal
          </Link>
        </div>
      </div>
    </section>
  );
}
