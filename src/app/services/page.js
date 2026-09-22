import ServicesGrid from '@/components/ServicesGrid';

export const metadata = {
  title: 'Services',
  description: 'Air, ocean, multimodal, inland, project, fashion, warehousing and CFS services from Crystal Express.',
};

export default function ServicesOverviewPage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">Services</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Choose the movement. Connect the handovers.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Start with the cargo, timing and delivery requirement. Crystal identifies the services needed to
            support the agreed route, and stays accountable at each handover.
          </p>
        </div>
      </section>
      <ServicesGrid />
    </>
  );
}
