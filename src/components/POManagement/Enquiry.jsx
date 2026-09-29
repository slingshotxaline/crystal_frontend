"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { submitEnquiry } from "@/lib/api";
import { ENQUIRY } from "./content";
import { Reveal } from "./ui";

const EASE = [0.22, 1, 0.36, 1];

// Same tokens as the shared EnquiryForm so the page feels native to the site.
// pl-10 leaves room for the leading icon.
const fieldClass =
  "w-full rounded-md border border-navy-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-900 placeholder:text-navy-400/60 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson";
const labelClass = "mb-1.5 block text-sm font-semibold text-navy-800";
const errorClass = "mt-1 text-xs font-medium text-crimson-700";

const REQUIRED = ["fullName", "company", "email", "message", "privacyConsent"];

/* ---------------------------- icons ---------------------------- */
function Ico({ d, size = 16, sw = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
const ICONS = {
  user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
  company:
    "M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 9h5a1 1 0 0 1 1 1v11M3 21h18M8 8h2M8 12h2M8 16h2",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  chat: "M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

/* --------------------- animated dark background ---------------------
 * Sits ON TOP of the section's own bg-navy-900, so the colour is unchanged. */
const ROUTES = [
  "M-20 560 C 240 260, 520 700, 800 360 S 1100 120, 1240 240",
  "M-20 160 C 260 420, 560 -40, 860 300 S 1120 560, 1240 460",
];

function EnquiryBackground() {
  const reduce = useReducedMotion();
  const loop = (duration, delay = 0) => ({
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut",
  });
  const mask = "radial-gradient(ellipse at center, black 30%, transparent 78%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* drifting grid, faded toward the edges */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
        animate={
          reduce ? undefined : { backgroundPosition: ["0px 0px", "48px 48px"] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* aurora blobs */}
      <motion.div
        className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-crimson/25 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 90, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }
        }
        transition={loop(18)}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-navy-800 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -80, 0], y: [0, -70, 0], scale: [1, 1.15, 1] }
        }
        transition={loop(22, 2)}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-crimson/15 blur-3xl"
        animate={
          reduce ? undefined : { x: [-50, 60, -50], opacity: [0.4, 1, 0.4] }
        }
        transition={loop(14, 1)}
      />

      {/* freight routes with travelling lights */}
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {ROUTES.map((d, i) => (
          <g key={i}>
            <motion.path
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 10"
              animate={reduce ? undefined : { strokeDashoffset: [0, -26] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            {!reduce && (
              <g className="text-crimson" fill="currentColor">
                <circle r="9" opacity="0.25">
                  <animateMotion
                    dur={`${11 + i * 3}s`}
                    repeatCount="indefinite"
                    path={d}
                    begin={`${i * 2}s`}
                  />
                </circle>
                <circle r="3.5">
                  <animateMotion
                    dur={`${11 + i * 3}s`}
                    repeatCount="indefinite"
                    path={d}
                    begin={`${i * 2}s`}
                  />
                </circle>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* rising specks (fixed positions so server and client markup match) */}
      {!reduce &&
        Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{
              left: `${(i * 41 + 6) % 96}%`,
              top: `${(i * 57 + 12) % 92}%`,
            }}
            animate={{ y: [0, -32, 0], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 5 + (i % 4),
              delay: (i % 7) * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}

/* ------------------------------ form ------------------------------ */
function Field({ id, label, icon, error, className, top = false, children }) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="group relative">
        <span
          className={`pointer-events-none absolute left-3.5 text-navy-400 transition-colors duration-300 group-focus-within:text-crimson ${
            top ? "top-3" : "top-1/2 -translate-y-1/2"
          }`}
        >
          <Ico d={ICONS[icon]} />
        </span>
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-crimson transition-transform duration-300 group-focus-within:scale-x-100"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={errorClass}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function POEnquiryForm() {
  const reduce = useReducedMotion();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [result, setResult] = useState(null);

  const filled = watch(REQUIRED).filter(Boolean).length;

  const onSubmit = async (data) => {
    setResult(null);
    // The shared API has no supplier-location or service fields, so both travel
    // in the subject and message body. Nothing is lost and no new fields are sent.
    const message = [
      "Service interest: PO Management",
      data.supplierLocations
        ? `Supplier countries / locations: ${data.supplierLocations}`
        : null,
      "",
      data.message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const response = await submitEnquiry({
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        honeypot: data.honeypot,
        subject: "PO Management enquiry",
        message,
        type: "general",
        privacyConsent: String(!!data.privacyConsent),
      });
      setResult({ success: true, referenceCode: response?.referenceCode });
      reset();
    } catch {
      setResult({ success: false });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-px shadow-2xl shadow-black/30">
      {/* light sweeping around the card edge */}
      <motion.span
        aria-hidden="true"
        className="absolute -inset-[150%]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.10) 65%, rgba(220,38,38,0.95) 85%, rgba(255,255,255,0.10) 100%)",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative rounded-[15px] bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold text-navy-800">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-crimson"
                  animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
              <span className="relative h-1.5 w-1.5 rounded-full bg-crimson" />
            </span>
            Service: PO Management
          </p>
          <p
            className="text-xs font-semibold tabular-nums text-navy-500"
            aria-live="polite"
          >
            {filled} of {REQUIRED.length} required
          </p>
        </div>

        {/* completion meter */}
        <div
          className="-mt-3 mb-6 h-1 overflow-hidden rounded-full bg-navy-100"
          aria-hidden="true"
        >
          <motion.span
            className="block h-full origin-left rounded-full bg-crimson"
            initial={false}
            animate={{ scaleX: filled / REQUIRED.length }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              role={result.success ? "status" : "alert"}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-5 overflow-hidden rounded-md border text-sm text-navy-800 ${
                result.success
                  ? "border-moss/30 bg-moss/5"
                  : "border-crimson/30 bg-crimson/5"
              }`}
            >
              <div className="flex items-start gap-3 p-4">
                {result.success && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0 text-moss"
                    aria-hidden="true"
                  >
                    <motion.circle
                      cx="12"
                      cy="12"
                      r="9"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.path
                      d="m8 12.5 3 3 5-6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    />
                  </svg>
                )}
                <div>
                  {result.success ? (
                    <>
                      <p className="font-semibold">{ENQUIRY.success}</p>
                      {result.referenceCode && (
                        <p className="mt-1 text-navy-400">
                          Reference:{" "}
                          <span className="font-mono font-semibold text-navy-900">
                            {result.referenceCode}
                          </span>
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-semibold">
                      {ENQUIRY.failure}{" "}
                      <a href="/contact" className="underline">
                        contact page
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            {...register("honeypot")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="po-fullName"
              label="Name *"
              icon="user"
              error={errors.fullName?.message}
            >
              <input
                id="po-fullName"
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                className={fieldClass}
                {...register("fullName", { required: "Name is required" })}
              />
            </Field>

            <Field
              id="po-company"
              label="Company *"
              icon="company"
              error={errors.company?.message}
            >
              <input
                id="po-company"
                autoComplete="organization"
                aria-invalid={!!errors.company}
                className={fieldClass}
                {...register("company", { required: "Company is required" })}
              />
            </Field>

            <Field
              id="po-email"
              label="Email *"
              icon="mail"
              error={errors.email?.message}
            >
              <input
                id="po-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={fieldClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </Field>

            <Field id="po-phone" label="Phone" icon="phone">
              <input
                id="po-phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                {...register("phone")}
              />
            </Field>
          </div>

          <Field
            id="po-locations"
            label="Supplier countries / locations"
            icon="pin"
          >
            <input
              id="po-locations"
              className={fieldClass}
              {...register("supplierLocations")}
            />
          </Field>

          <Field
            id="po-message"
            label="Your requirements *"
            icon="chat"
            top
            error={errors.message?.message}
          >
            <textarea
              id="po-message"
              rows={4}
              aria-invalid={!!errors.message}
              placeholder="What support do you need with your purchase orders?"
              className={fieldClass}
              {...register("message", {
                required: "Please tell us about your requirements",
              })}
            />
          </Field>

          <div className="flex items-start gap-3 border-t border-navy-100 pt-5">
            <input
              id="po-privacy"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-navy-300 text-crimson focus:ring-crimson"
              {...register("privacyConsent", {
                required: "Please confirm you agree to the privacy notice",
              })}
            />
            <label htmlFor="po-privacy" className="text-sm text-navy-500">
              I agree that Crystal Express may use these details to respond to
              my enquiry, in line with the{" "}
              <a
                href="/privacy"
                className="font-semibold text-navy-900 underline"
              >
                privacy notice
              </a>
              .
            </label>
          </div>
          {errors.privacyConsent && (
            <p className={errorClass}>{errors.privacyConsent.message}</p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={reduce || isSubmitting ? undefined : { y: -2 }}
            whileTap={reduce || isSubmitting ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="focus-ring group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-crimson px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-crimson/25 transition-colors hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[12rem]"
          >
            {!reduce && !isSubmitting && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["0%", "400%"] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut",
                }}
              />
            )}
            <span className="relative">
              {isSubmitting ? "Submitting…" : ENQUIRY.button}
            </span>
            {isSubmitting ? (
              <motion.span
                aria-hidden="true"
                className="relative h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                <Ico d={ICONS.arrow} />
              </span>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default function Enquiry() {
  const reduce = useReducedMotion();
  return (
    <section
      id={ENQUIRY.id}
      className="relative scroll-mt-20 overflow-hidden bg-navy-900 py-16 sm:py-24"
      aria-labelledby="enquiry-title"
    >
      <EnquiryBackground />

      <div className="container-content relative z-10 grid items-start gap-12 lg:grid-cols-[1fr,1.2fr]">
        <div className="text-white lg:sticky lg:top-28">
          {/* floating mail badge with an orbiting dashed ring */}
          <Reveal>
            <motion.span
              className="relative mb-6 inline-flex h-16 w-16 items-center justify-center"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-dashed border-crimson/60"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-crimson text-white shadow-lg shadow-crimson/30">
                <Ico d={ICONS.mail} size={22} />
              </span>
            </motion.span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 id="enquiry-title" className="text-3xl font-bold sm:text-4xl">
              {ENQUIRY.title}
            </h2>
            <motion.span
              aria-hidden="true"
              className="mt-4 block h-1 w-16 origin-left rounded-full bg-crimson"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            />
          </Reveal>

          <Reveal as="p" delay={0.14} className="mt-5 max-w-md text-navy-100">
            {ENQUIRY.body}
          </Reveal>

          <Reveal
            delay={0.24}
            className="mt-8 flex max-w-md gap-4 text-sm text-navy-200"
          >
            <motion.span
              className="mt-1 h-10 w-0.5 shrink-0 bg-crimson"
              aria-hidden="true"
              animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <p>{ENQUIRY.privacyNote}</p>
          </Reveal>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <POEnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}
