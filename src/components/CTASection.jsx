'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const QUICK_ACTIONS = [
  {
    label: 'Contact an Office',
    href: '/contact',
    icon: (
      <path
        d="M4 5h16v11H7l-3 3V5Z M8 9h8M8 12h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: 'Track a Shipment',
    href: '/tracking',
    icon: (
      <path
        d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  // {
  //   label: 'Partner with Crystal',
  //   href: '/partnership',
  //   icon: (
  //     <path
  //       d="M8 12h1.5l2 2 2-2H15 M6 8h4l2 2 2-2h4v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z"
  //       stroke="currentColor"
  //       strokeWidth="1.6"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       fill="none"
  //     />
  //   ),
  // },
];

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-crimson py-16 text-center text-white sm:py-20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-navy-900/15 blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      <div className="container-content relative">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl"
        >
          Share the cargo, route and timing.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-3 text-white/85"
        >
          We will tell you what we need to assess the next practical option.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          <Link
            href="/quote"
            className="focus-ring group relative mt-8 inline-flex overflow-hidden rounded-md bg-white px-8 py-3.5 text-sm font-bold text-crimson shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-crimson/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Request a Quote</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2"
        >
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.28 + i * 0.07, duration: 0.4 }}
            >
              <Link
                href={action.href}
                className="focus-ring group flex items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                  {action.icon}
                </svg>
                {action.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}