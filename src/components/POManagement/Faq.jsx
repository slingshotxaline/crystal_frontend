"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FAQ } from "./content";
import { SectionHeading, Stagger, StaggerItem } from "./ui";

export default function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="faq-title">
      <div className="container-content max-w-3xl">
        <SectionHeading title={FAQ.title} />

        <Stagger className="mt-8 space-y-3" stagger={0.08}>
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `po-faq-btn-${i}`;
            const panelId = `po-faq-panel-${i}`;
            return (
              <StaggerItem
                key={item.q}
                className="rounded-xl border border-navy-100 bg-white"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-semibold text-navy-900"
                  >
                    {item.q}
                    <motion.span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center text-xl leading-none text-crimson"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                    >
                      +
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-navy-500">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
