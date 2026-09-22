import DigitalVisibility from '@/components/DigitalVisibility';

export const metadata = {
  title: 'Digital & Technology',
  description: 'Shipment tracking, visibility and digital tools from Crystal Express.',
};

export default function DigitalPage() {
  return (
    <>
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Digital</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold text-navy-900 sm:text-4xl">
            Technology that supports the operating plan, not a substitute for it.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-400">
            Shipment information is useful when it helps a team prepare, respond or escalate. Below is what&rsquo;s
            currently available and what&rsquo;s in progress.
          </p>
        </div>
      </section>
      <DigitalVisibility />
    </>
  );
}
