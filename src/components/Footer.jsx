import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Air Freight', href: '/services/air-freight' },
      { label: 'Ocean Freight', href: '/services/ocean-freight' },
      { label: 'Multimodal Logistics', href: '/services/multimodal-logistics' },
      { label: 'Inland Transport & Customs', href: '/services/inland-customs' },
      { label: 'Project Logistics', href: '/services/project-logistics' },
      { label: 'Fashion Logistics & GOH', href: '/services/fashion-goh' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Fashion & Retail', href: '/industries/fashion-retail' },
      { label: 'FMCG', href: '/industries/fmcg' },
      { label: 'Industrial & Manufacturing', href: '/industries/industrial' },
      { label: 'Automotive', href: '/industries/automotive' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'High Tech', href: '/industries/high-tech' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Crystal Express', href: '/about' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Group Ecosystem', href: '/about#group-ecosystem' },
      { label: 'Affiliations & Compliance', href: '/about#affiliations' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { label: 'Request a Quote', href: '/quote' },
      { label: 'Track Shipment', href: '/tracking' },
      { label: 'Contact an Office', href: '/contact' },
      { label: 'Partner with Crystal', href: '/partnership' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-content grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-crimson text-xs font-bold text-crimson">
            EL
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/80">
            Crystal Express Ltd. connects Bangladesh to global markets through coordinated air, ocean, inland and specialist logistics solutions.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="focus-ring rounded text-sm text-navy-100/75 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-2 py-5 text-xs text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Crystal Express Limited. Prototype build for internal design review — not for public deployment.</p>
          <p>Rangs Paramount Square, Level 6, House 11, Road 17, Banani C/A, Dhaka 1213, Bangladesh <span className="italic">[VALIDATE]</span></p>
        </div>
      </div>
    </footer>
  );
}
