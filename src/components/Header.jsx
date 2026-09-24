'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  {
    label: 'Services',
    href: '/services',
    // Two-column mega menu: [leftColumn, rightColumn]
    columns: [
      [
        { label: 'Services Overview', desc: 'Browse by cargo need', href: '/services' },
        { label: 'Air Freight', desc: 'Time-critical export & import uplift', href: '/services/air-freight' },
        { label: 'Ocean Freight', desc: 'FCL, LCL & buyer consolidation', href: '/services/ocean-freight' },
        { label: 'Multimodal Logistics', desc: 'Sea-air, air-sea and alternative routings', href: '/services/multimodal-logistics' },
        { label: 'Inland Transport & Customs', desc: 'Pickup, linehaul, delivery and clearance', href: '/services/inland-customs' },
        { label: 'Project Logistics', desc: 'Oversized, heavy and complex cargo', href: '/services/project-logistics' },
      ],
      [
        // Was "Fashion Logistics & GOH" — renamed per content review.
        { label: 'Contract Logistics', desc: 'Garments on hanger and consolidation', href: '/services/fashion-goh' },
        // Merged: Warehousing + Container Freight Station -> one page.
        { label: 'Warehousing & Container', desc: 'Storage, staging, receiving, and consolidation', href: '/services/warehousing' },
        // Was "Value Added Services"
        { label: 'Value Added Service & GOH', desc: 'Inspection, packing & quality control, GOH handling', href: '/services/value-added-services' },
      ],
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Fashion & Retail', href: '/industries/fashion-retail' },
      { label: 'FMCG', href: '/industries/fmcg' },
      { label: 'Industrial & Manufacturing', href: '/industries/industrial' },
      { label: 'Automotive', href: '/industries/automotive' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'High Tech', href: '/industries/high-tech' },
    ],
  },
  // { label: 'Network', href: '/network' },
  { label: 'Digital', href: '/digital' },
  { label: 'Insights', href: '/insights' },
  { label: 'About Crystal', href: '/about' },
];

// Flattened version of NAV used for the mobile drawer, so the two-column
// Services mega menu on desktop still renders as one simple list on mobile.
const MOBILE_NAV = NAV.map((item) => ({
  ...item,
  children: item.columns ? item.columns.flat() : item.children,
}));

function NavItem({ item }) {
  const [open, setOpen] = useState(false);

  if (!item.children && !item.columns) {
    return (
      <Link
        href={item.href}
        className="focus-ring rounded px-1 py-2 text-sm font-medium text-navy-900 hover:text-crimson"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="focus-ring flex items-center gap-1 rounded px-1 py-2 text-sm font-medium text-navy-900 hover:text-crimson"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <svg viewBox="0 0 12 8" className={`h-2 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 top-full z-40 rounded-lg border border-navy-100 bg-white py-3 shadow-lg ${
              item.columns ? 'w-[560px] px-3' : 'w-64 py-2'
            }`}
          >
            {item.columns ? (
              <div className="grid grid-cols-2 gap-1">
                {item.columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-0.5">
                    {column.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-md px-3 py-2 hover:bg-cream-100"
                      >
                        <span className="block text-sm font-semibold text-navy-900">{child.label}</span>
                        {child.desc && (
                          <span className="mt-0.5 block text-xs text-navy-400">{child.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-navy-800 hover:bg-cream-100 hover:text-crimson"
                >
                  {child.label}
                </Link>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="container-content flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-crimson text-xs font-bold text-crimson">
            EL
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-navy-900">
              CRYSTAL EXPRESS
            </span>
            {/* <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy-400">
              Freight Forwarding &middot; Bangladesh
            </span> */}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* <Link href="/tracking" className="focus-ring rounded px-1 text-sm font-semibold text-navy-900 hover:text-crimson">
            Track Shipment
          </Link> */}
          <Link
            href="/contact"
            className="focus-ring rounded-md border border-navy-900 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
          >
            Contact
          </Link>
          <Link
            href="/quote"
            className="focus-ring rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-700"
          >
            Request a Quote
          </Link>
        </div>

        <button
          className="focus-ring rounded p-2 text-navy-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-navy-100 bg-white lg:hidden"
          >
            <div className="container-content flex flex-col gap-1 py-4">
              {MOBILE_NAV.map((item) => (
                <div key={item.label}>
                  <Link href={item.href} className="block py-2 text-sm font-semibold text-navy-900" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-navy-100 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-1.5 text-sm text-navy-400"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-navy-100 pt-3">
                <Link href="/tracking" className="rounded-md border border-navy-900 px-4 py-2 text-center text-sm font-semibold text-navy-900">
                  Track Shipment
                </Link>
                <Link href="/quote" className="rounded-md bg-crimson px-4 py-2 text-center text-sm font-semibold text-white">
                  Request a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}