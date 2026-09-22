export const metadata = {
  title: 'Track a Shipment',
  description: 'Access shipment status, documents and your responsible contact at Crystal Express.',
};

export default function TrackingPage() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Existing Customers</p>
        <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
          Track your shipment or reach your contact.
        </h1>
        <p className="mt-4 text-navy-400">
          Customer shipment access is being connected to Crystal&rsquo;s operations systems. Until that handoff is
          live, contact your responsible coordinator directly, or reach the office nearest your shipment.
        </p>

        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">Prototype notice</p>
          <p className="mt-1">
            This page reserves the URL and layout for the customer tracking handoff described in the brief. IT
            confirmation is required before this is connected to a live system.
          </p>
        </div>

        <a
          href="/contact"
          className="focus-ring mt-8 inline-flex rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Contact an Office Instead
        </a>
      </div>
    </section>
  );
}
