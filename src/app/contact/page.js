import EnquiryForm from '@/components/EnquiryForm';

export const metadata = {
  title: 'Contact Crystal Express',
  description: 'Contact Crystal Express offices in Dhaka and Chattogram, Bangladesh.',
};

const OFFICES = [
  {
    city: 'Dhaka',
    role: 'Head Office',
    address: 'Rangs Paramount Square, Level 6, House 11, Road 17, Banani C/A, Dhaka 1213, Bangladesh [VALIDATE]',
    phone: '+880 [VALIDATE]',
    email: 'info@crystalexpress.example',
  },
  {
    city: 'Chattogram',
    role: 'Branch Office',
    address: 'Chattogram, Bangladesh [VALIDATE]',
    phone: '+880 [VALIDATE]',
    email: 'chattogram@crystalexpress.example',
  },
];

export default function ContactPage() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Contact</p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Talk to a Crystal Express office.</h1>
          <p className="mt-4 max-w-md text-navy-400">
            For shipment quotes, use the <a href="/quote" className="font-semibold text-crimson underline">Request a Quote</a> form
            so the right team gets your cargo details directly. For everything else, reach us here.
          </p>

          <div className="mt-8 space-y-6 border-t border-navy-100 pt-6">
            {OFFICES.map((office) => (
              <div key={office.city}>
                <p className="text-xs font-bold uppercase tracking-wide text-crimson">{office.role}</p>
                <h3 className="mt-1 text-lg font-bold text-navy-900">{office.city}</h3>
                <p className="mt-2 text-sm text-navy-400">{office.address}</p>
                <p className="mt-1 text-sm text-navy-400">{office.phone}</p>
                <p className="mt-1 text-sm text-navy-400">{office.email}</p>
              </div>
            ))}
          </div>
        </div>

        <EnquiryForm type="general" title="Send a Message" />
      </div>
    </section>
  );
}
