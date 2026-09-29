'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { HERO, PO_IMAGES } from './content';

const EASE = [0.22, 1, 0.36, 1];

// Five neutral cartons that settle into a loose dispatch group, then drift
// very slightly. Purely illustrative; replace with the approved photo when
// PO_IMAGES.hero is set.
const CARTONS = [
  { left: '2%', top: '34%', w: '28%', h: '24%', dur: 6.0, delay: 0.5 },
  { left: '34%', top: '10%', w: '32%', h: '32%', dur: 7.0, delay: 0.65 },
  { left: '70%', top: '26%', w: '26%', h: '22%', dur: 5.5, delay: 0.8 },
  { left: '28%', top: '54%', w: '32%', h: '26%', dur: 6.5, delay: 0.95 },
  { left: '64%', top: '54%', w: '32%', h: '28%', dur: 7.5, delay: 1.1 },
];

function CartonIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg" aria-hidden="true">
      {[18, 46, 78].map((left, i) => (
        <motion.span
          key={left}
          className="absolute top-[6%] h-[88%] w-px origin-top rotate-[14deg] bg-white/15"
          style={{ left: `${left}%` }}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: EASE }}
        />
      ))}
      {CARTONS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: c.left, top: c.top, width: c.w, height: c.h }}
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: c.delay, ease: EASE }}
        >
          <motion.div
            className="relative h-full w-full rounded-lg border border-white/25 bg-white/10"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          >
            <span className="absolute inset-x-[10%] top-[28%] h-px bg-white/40" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function POHero() {
  const reduce = useReducedMotion();
  const hasPhoto = Boolean(PO_IMAGES.hero);

  const line = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white py-20">
      {hasPhoto && (
        <>
          <Image
            src={PO_IMAGES.hero.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/85" aria-hidden="true" />
        </>
      )}

      <div className="container-content relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <motion.nav aria-label="Breadcrumb" {...line(0)} className="mb-8 text-sm text-navy-200">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="focus-ring rounded hover:text-white">Home</a></li>
              <li aria-hidden="true">/</li>
              {/* Point at /services only once that page exists and is approved */}
              <li><a href="/services" className="focus-ring rounded hover:text-white">Services</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">PO Management</li>
            </ol>
          </motion.nav>

          <motion.p {...line(0.1)} className="flex items-center gap-3 text-sm font-semibold text-navy-100">
            <span className="h-0.5 w-8 bg-crimson" aria-hidden="true" />
            {HERO.eyebrow}
          </motion.p>

          <motion.h1 {...line(0.2)} className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {HERO.title}
          </motion.h1>

          <motion.p {...line(0.35)} className="mt-6 max-w-xl text-lg text-navy-100">
            {HERO.intro}
          </motion.p>

          <motion.div {...line(0.5)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <motion.a
              href="#enquiry"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="focus-ring rounded-md bg-white px-6 py-3.5 text-sm font-bold text-navy-900 transition-colors hover:bg-navy-100"
            >
              {HERO.primaryCta}
            </motion.a>
            <a
              href="#process"
              className="focus-ring rounded text-sm font-semibold text-white underline decoration-crimson decoration-2 underline-offset-8 hover:decoration-white"
            >
              {HERO.secondaryCta}
            </a>
          </motion.div>
        </div>

        {!hasPhoto && <CartonIllustration />}
      </div>
    </section>
  );
}