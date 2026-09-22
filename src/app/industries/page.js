import IndustriesGrid from '@/components/IndustriesGrid';

export const metadata = {
  title: 'Industries',
  description: 'Fashion & Retail, FMCG, Industrial, Automotive, Healthcare and High Tech logistics from Crystal Express.',
};

export default function IndustriesOverviewPage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">Industries</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">The cargo changes the plan.</h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Product, order cycle, handling risk and compliance requirements shape the route, facility tasks and
            information each shipment needs.
          </p>
        </div>
      </section>
      <IndustriesGrid />
    </>
  );
}
