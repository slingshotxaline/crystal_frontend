"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MILESTONES = ["Received", "Cleared", "In Transit", "Delivered"];
const ACTIVE_UP_TO = 2; // index of the last completed milestone in this illustrative demo

const TOOLS = [
  {
    title: "Shipment Tracking & Milestones",
    desc: "Shipment status and activity updates across the planned journey.",
    image: {
      src: "/assets/Home/Digital/digital1.jpg",
      alt: "Container ship at sea carrying tracked cargo",
    },
    preview: {
      kind: "rows",
      rows: [
        { label: "CE-10234", status: "In Transit", tone: "crimson" },
        { label: "CE-10221", status: "Cleared", tone: "moss" },
        { label: "CE-10198", status: "Received", tone: "navy" },
      ],
    },
  },
  {
    title: "Delay & Exception Alerts",
    desc: "Responsive exception communication helps teams act before disruption escalates.",
    image: {
      src: "/assets/Home/Digital/digital2.jpeg",
      alt: "Customs inspection of shipping containers at a port",
    },
    preview: {
      kind: "alerts",
      rows: [
        { label: "Customs hold — action required", tone: "amber" },
        { label: "Documentation exception resolved", tone: "moss" },
      ],
    },
  },
  {
    title: "Customer Shipment Access",
    desc: "Accessible status, history and key shipment references.",
    image: {
      src: "/assets/Home/Digital/tool3.jpg",
      alt: "Person checking shipment status on a tablet in a warehouse",
    },
    preview: {
      kind: "access",
      reference: "CE-10234",
      updated: "Last updated 2 hours ago",
    },
  },
  {
    title: "Documents & Reporting",
    desc: "Digital shipping documents, invoices and statements.",
    image: {
      src: "/assets/Home/Digital/tool4.jpg",
      alt: "Shipping documents and bill of lading on a desk",
    },
    preview: {
      kind: "docs",
      rows: [
        "Commercial Invoice.pdf",
        "Packing List.pdf",
        "Bill of Lading.pdf",
      ],
    },
  },
];

const TONE_DOT = {
  crimson: "bg-crimson",
  moss: "bg-moss",
  navy: "bg-navy-300",
  amber: "bg-amber-400",
};
const TONE_TEXT = {
  crimson: "text-crimson",
  moss: "text-moss",
  navy: "text-navy-300",
  amber: "text-amber-300",
};

function ToolPreview({ tool }) {
  const { preview } = tool;

  if (preview.kind === "rows") {
    return (
      <div className="space-y-2">
        {preview.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2"
          >
            <span className="font-mono text-xs text-navy-100/80">
              {row.label}
            </span>
            <span
              className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                TONE_TEXT[row.tone]
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[row.tone]}`}
              />
              {row.status}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (preview.kind === "alerts") {
    return (
      <div className="space-y-2">
        {preview.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2.5"
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                TONE_DOT[row.tone]
              }`}
            />
            <span className="text-xs text-navy-100/80">{row.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (preview.kind === "access") {
    return (
      <div className="rounded-md bg-white/5 p-4">
        <p className="font-mono text-sm text-white">{preview.reference}</p>
        <p className="mt-1 text-[11px] text-navy-100/60">{preview.updated}</p>
        <span className="mt-3 inline-flex rounded-md bg-crimson px-3 py-1.5 text-[11px] font-semibold text-white">
          View status
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {preview.rows.map((doc) => (
        <div
          key={doc}
          className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
          <span className="text-xs text-navy-100/80">{doc}</span>
        </div>
      ))}
    </div>
  );
}

export default function DigitalVisibility() {
  const [activeTool, setActiveTool] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const fillFraction = ACTIVE_UP_TO / (MILESTONES.length - 1);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-crimson/5 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl sm:h-72 sm:w-72" />
      </div>

      <div className="container-content relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-navy-400"
        >
          Digital Visibility
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl"
        >
          See the milestone. Know the next action.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 max-w-xl text-navy-400"
        >
          Shipment information is useful when it helps a team prepare, respond
          or escalate. We connect agreed status, documents and exception
          communication to the operating plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-xl bg-navy-900 p-6 text-white sm:p-8"
        >
          {/* Port photo background with navy overlay for text legibility */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/assets/Home/Digital/digital-bg.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/85 to-navy-900" />
          </div>

          {/* Ambient scan grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold">Crystal Operations Control</h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-moss">
              <span className="relative flex h-2 w-2">
                {!prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
              </span>
              Prototype interface &mdash; pending integration
            </span>
          </div>

          {/* Milestone tracker */}
          <div className="relative mt-10 flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
            <motion.div
              className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-crimson"
              style={{ transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: fillFraction }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            />
            {!prefersReducedMotion && (
              <motion.span
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-crimson shadow-[0_0_10px_2px_rgba(220,36,48,0.6)]"
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: `${fillFraction * 100}%`, opacity: [0, 1, 1] }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              />
            )}
            {MILESTONES.map((m, i) => {
              const isDone = i <= ACTIVE_UP_TO;
              const isCurrent = i === ACTIVE_UP_TO;
              return (
                <div
                  key={m}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: 0.15 + i * 0.12,
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                    }}
                    className="relative flex items-center justify-center"
                  >
                    {isCurrent && !prefersReducedMotion && (
                      <motion.span
                        className="absolute h-3 w-3 rounded-full bg-crimson"
                        animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                    <span
                      className={`relative h-3 w-3 rounded-full border-2 ${
                        isDone
                          ? "border-crimson bg-crimson"
                          : "border-white/40 bg-navy-900"
                      }`}
                    />
                  </motion.span>
                  <span className="text-xs text-navy-100/80">{m}</span>
                </div>
              );
            })}
          </div>

          {/* Tool tabs + preview */}
          <div className="relative mt-10">
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool, i) => {
                const isActive = activeTool === i;
                return (
                  <button
                    key={tool.title}
                    onClick={() => setActiveTool(i)}
                    className={`focus-ring relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-navy-100/70 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="digital-visibility-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-crimson"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {tool.title}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-6 rounded-lg border border-white/10 bg-navy-900/60 p-5 backdrop-blur-sm sm:grid-cols-2 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={TOOLS[activeTool].title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Tool photo */}
                  {TOOLS[activeTool].image && (
                    <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-md border border-white/10">
                      <Image
                        src={TOOLS[activeTool].image.src}
                        alt={TOOLS[activeTool].image.alt}
                        fill
                        sizes="(min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
                    </div>
                  )}

                  <h4 className="font-semibold">{TOOLS[activeTool].title}</h4>
                  <p className="mt-1.5 text-sm text-navy-100/70">
                    {TOOLS[activeTool].desc}
                  </p>
                  <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-wide text-amber-300">
                    Prototype UI
                  </span>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`preview-${TOOLS[activeTool].title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <ToolPreview tool={TOOLS[activeTool]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/digital"
            className="focus-ring group mt-6 inline-flex items-center gap-2 rounded-md border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors duration-300 hover:bg-navy-900 hover:text-white"
          >
            Explore Available Digital Tools
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
