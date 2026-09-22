import CaseStudies from '@/components/CaseStudies';

export const metadata = {
  title: 'Case Studies',
  description: 'How Crystal Express shipment plans worked, from requirement to approved outcome.',
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Case Studies</p>
          <h1 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
            Requirement, route decision, execution, approved outcome.
          </h1>
          <p className="mt-4 max-w-xl text-navy-400">
            Every case is published only with written customer permission and without exposing confidential
            information.
          </p>
        </div>
      </section>
      <CaseStudies />
    </>
  );
}
