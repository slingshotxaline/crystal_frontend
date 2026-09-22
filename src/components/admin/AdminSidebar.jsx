'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { section: 'Overview', items: [{ label: 'Dashboard', href: '/admin' }] },
  {
    section: 'Inbox',
    items: [
      { label: 'Quote Requests', href: '/admin/quotes' },
      { label: 'Enquiries', href: '/admin/enquiries' },
    ],
  },
  {
    section: 'Content',
    items: [
      { label: 'Services', href: '/admin/services' },
      { label: 'Industries', href: '/admin/industries' },
      { label: 'Case Studies', href: '/admin/case-studies' },
      { label: 'Insights', href: '/admin/insights' },
      { label: 'Careers / Jobs', href: '/admin/jobs' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-white lg:block">
      <div className="flex h-16 items-center gap-2.5 border-b border-navy-100 px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-crimson text-[10px] font-bold text-crimson">
          EL
        </span>
        <span className="text-sm font-extrabold tracking-tight text-navy-900">Crystal Admin</span>
      </div>

      <nav className="space-y-6 px-4 py-6">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-navy-300">{group.section}</p>
            <div className="mt-2 space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`focus-ring block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      active ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-cream-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
