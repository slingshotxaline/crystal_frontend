'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listQuotes, listEnquiries } from '@/lib/adminApi';

export default function AdminHomePage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      listQuotes('?status=new&limit=1'),
      listQuotes('?limit=1'),
      listEnquiries('?status=new&limit=1'),
      listEnquiries('?limit=1'),
    ])
      .then(([newQuotes, allQuotes, newEnquiries, allEnquiries]) => {
        if (!active) return;
        setStats({
          newQuotes: newQuotes.total,
          allQuotes: allQuotes.total,
          newEnquiries: newEnquiries.total,
          allEnquiries: allEnquiries.total,
        });
      })
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    { label: 'New Quote Requests', value: stats?.newQuotes, href: '/admin/quotes?status=new', accent: true },
    { label: 'Total Quote Requests', value: stats?.allQuotes, href: '/admin/quotes' },
    { label: 'New Enquiries', value: stats?.newEnquiries, href: '/admin/enquiries?status=new', accent: true },
    { label: 'Total Enquiries', value: stats?.allEnquiries, href: '/admin/enquiries' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-400">A quick look at what needs attention today.</p>

      {error && (
        <p className="mt-6 rounded-md border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-700">
          Couldn&rsquo;t load stats: {error}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="focus-ring rounded-lg border border-navy-100 bg-white p-5 hover:border-crimson"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{card.label}</p>
            <p className={`mt-2 text-3xl font-extrabold ${card.accent ? 'text-crimson' : 'text-navy-900'}`}>
              {card.value ?? '—'}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Manage Services', href: '/admin/services' },
          { label: 'Manage Industries', href: '/admin/industries' },
          { label: 'Manage Case Studies', href: '/admin/case-studies' },
          { label: 'Manage Insights', href: '/admin/insights' },
          { label: 'Manage Careers / Jobs', href: '/admin/jobs' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="focus-ring rounded-lg border border-navy-100 bg-white p-5 text-sm font-semibold text-navy-800 hover:border-crimson hover:text-crimson"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
