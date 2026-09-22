'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

const MOBILE_LINKS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Quote Requests', href: '/admin/quotes' },
  { label: 'Enquiries', href: '/admin/enquiries' },
  { label: 'Services', href: '/admin/services' },
  { label: 'Industries', href: '/admin/industries' },
  { label: 'Case Studies', href: '/admin/case-studies' },
  { label: 'Insights', href: '/admin/insights' },
  { label: 'Careers / Jobs', href: '/admin/jobs' },
];

export default function AdminTopbar({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy-100 bg-white px-4 sm:px-6">
      <button
        className="focus-ring rounded p-2 text-navy-900 lg:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle admin menu"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      <p className="text-sm font-semibold text-navy-400 lg:hidden">Crystal Admin</p>

      <div className="ml-auto flex items-center gap-4">
        {user && (
          <div className="text-right">
            <p className="text-sm font-semibold text-navy-900">{user.name}</p>
            <p className="text-xs capitalize text-navy-400">{user.role}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="focus-ring rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-crimson hover:text-crimson"
        >
          Log out
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 top-16 z-40 w-full border-b border-navy-100 bg-white p-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-semibold ${
                  pathname === link.href ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
