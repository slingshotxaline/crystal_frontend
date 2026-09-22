import EnquiryForm from '@/components/EnquiryForm';

export const metadata = {
  title: 'Partner with Crystal Express',
  description: 'Discuss an overseas agency, joint venture or network membership with Crystal Express.',
};

export default function PartnershipPage() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Network</p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Partner with Crystal.</h1>
          <p className="mt-4 max-w-md text-navy-400">
            Crystal&rsquo;s Bangladesh teams coordinate with approved regional operations, group entities, carriers
            and international agents. Tell us about your network and the markets you cover, and the responsible
            team will follow up.
          </p>
          <p className="mt-4 max-w-md text-sm text-navy-400">
            Overseas agents and networks typically ask: does Crystal respond quickly and execute reliably at
            origin? This form reaches the team that can answer that directly.
          </p>
        </div>

        <EnquiryForm type="partnership" title="Discuss a Partnership" />
      </div>
    </section>
  );
}
