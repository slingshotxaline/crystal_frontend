"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { submitQuote } from "@/lib/api";

const MODES = [
  {
    value: "air",
    label: "Air Freight",
    hint: "Fast, time-critical",
    icon: "M2 16l20-8-8 14-3-6-9 0z",
  },
  {
    value: "ocean",
    label: "Ocean Freight",
    hint: "FCL / LCL",
    icon: "M3 17l2 3h14l2-3H3zm2-2V9h6V5h2v4h6v6H5z",
  },
  {
    value: "multimodal",
    label: "Multimodal",
    hint: "Sea + air, rail, road",
    icon: "M4 6h16M4 12h16M4 18h16",
  },
  {
    value: "inland",
    label: "Inland & Customs",
    hint: "Trucking, clearance",
    icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  },
  {
    value: "project",
    label: "Project Cargo",
    hint: "Heavy / oversized",
    icon: "M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5",
  },
  {
    value: "not_sure",
    label: "Not sure",
    hint: "Advise me",
    icon: "M9 9a3 3 0 115 2c-1 1-2 1.5-2 3M12 18h.01",
  },
];

const DIRECTIONS = [
  { value: "export", label: "Export", hint: "From Bangladesh" },
  { value: "import", label: "Import", hint: "Into Bangladesh" },
  { value: "domestic", label: "Domestic", hint: "Within Bangladesh" },
];

const baseField =
  "block w-full rounded-lg border bg-white px-4 py-3 text-base text-navy-900 shadow-sm transition placeholder:text-navy-400/60 focus:outline-none focus:ring-2 sm:py-2.5 sm:text-sm";
const okField =
  "border-navy-200 hover:border-navy-300 focus:border-crimson focus:ring-crimson/25";
const badField =
  "border-crimson bg-crimson/5 focus:border-crimson focus:ring-crimson/25";
const fieldClass = (err) => `${baseField} ${err ? badField : okField}`;

function Field({ label, htmlFor, error, optional, className = "", children }) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-navy-800"
      >
        <span>{label}</span>
        {optional && (
          <span className="text-xs font-normal text-navy-400">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-crimson-700">
          {error.message}
        </p>
      )}
    </div>
  );
}

function Section({ step, title, subtitle, children }) {
  return (
    <section className="space-y-5">
      <header className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
          {step}
        </span>
        <div>
          <h3 className="text-base font-bold leading-tight text-navy-900">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-sm text-navy-400">{subtitle}</p>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}

function UnitInput({ id, unitName, units, register, placeholder = "0.00" }) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-navy-200 bg-white shadow-sm transition focus-within:border-crimson focus-within:ring-2 focus-within:ring-crimson/25 hover:border-navy-300">
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-navy-900 placeholder:text-navy-400/60 focus:outline-none sm:py-2.5 sm:text-sm"
        {...register(id)}
      />
      <select
        aria-label={`${id} unit`}
        className="shrink-0 border-l border-navy-200 bg-navy-50 px-3 text-base font-medium text-navy-700 focus:outline-none sm:text-sm"
        {...register(unitName)}
      >
        {units.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function QuoteForm({
  source = "general_quote",
  title = "Request a Quote",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: { weightUnit: "kg", volumeUnit: "cbm" } });
  const [result, setResult] = useState(null); // { success, message, referenceCode }

  const onSubmit = async (data) => {
    setResult(null);
    try {
      const response = await submitQuote({
        ...data,
        pieces: data.pieces ? Number(data.pieces) : undefined,
        weight: data.weightValue
          ? { value: Number(data.weightValue), unit: data.weightUnit || "kg" }
          : undefined,
        volume: data.volumeValue
          ? { value: Number(data.volumeValue), unit: data.volumeUnit || "cbm" }
          : undefined,
        privacyConsent: String(!!data.privacyConsent),
        source,
      });
      setResult({
        success: true,
        message: response.message,
        referenceCode: response.referenceCode,
      });
      reset();
    } catch (err) {
      setResult({
        success: false,
        message: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  // ---------- Success screen ----------
  if (result?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-xl shadow-navy-900/5 sm:p-12"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-moss/10 text-moss">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-bold text-navy-900">
          Request received
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-navy-500">
          {result.message}
        </p>
        {result.referenceCode && (
          <div className="mx-auto mt-6 inline-block rounded-lg border border-dashed border-navy-200 bg-navy-50 px-5 py-3">
            <p className="text-xs uppercase tracking-wide text-navy-400">
              Reference
            </p>
            <p className="font-mono text-lg font-bold text-navy-900">
              {result.referenceCode}
            </p>
          </div>
        )}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setResult(null)}
            className="rounded-lg border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-50"
          >
            Submit another request
          </button>
        </div>
      </motion.div>
    );
  }

  // ---------- Form ----------
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl shadow-navy-900/5">
      {/* Header */}
      <div className="border-b border-navy-100 bg-gradient-to-br from-navy-900 to-navy-800 px-5 py-6 text-white sm:px-8 sm:py-8">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <p className="mt-1.5 max-w-xl text-sm text-white/70">
          Share the cargo, route and timing. We will tell you what we need to
          assess the next practical option.
        </p>
      </div>

      <AnimatePresence>
        {result && !result.success && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="border-b border-crimson/20 bg-crimson/5 px-5 py-3 text-sm font-medium text-crimson-700 sm:px-8">
              {result.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-10 px-5 py-6 sm:px-8 sm:py-8"
      >
        {/* Honeypot — hidden from real users, catches bots */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register("honeypot")}
        />

        {/* 1. Service */}
        <Section
          step="1"
          title="What do you need?"
          subtitle="Pick the service and the direction of the shipment."
        >
          <div>
            <p className="mb-2 text-sm font-semibold text-navy-800">Mode</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {MODES.map((m) => (
                <div key={m.value}>
                  <input
                    id={`mode-${m.value}`}
                    type="radio"
                    value={m.value}
                    className="peer sr-only"
                    {...register("mode", { required: "Please select a mode" })}
                  />
                  <label
                    htmlFor={`mode-${m.value}`}
                    className="flex h-full cursor-pointer flex-col gap-1.5 rounded-xl border border-navy-200 bg-white p-3.5 transition hover:border-navy-300 hover:bg-navy-50/50 peer-checked:border-crimson peer-checked:bg-crimson/5 peer-checked:ring-1 peer-checked:ring-crimson peer-focus-visible:ring-2 peer-focus-visible:ring-crimson/40 sm:p-4"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-crimson"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={m.icon} />
                    </svg>
                    <span className="text-sm font-semibold leading-tight text-navy-900">
                      {m.label}
                    </span>
                    <span className="text-xs text-navy-400">{m.hint}</span>
                  </label>
                </div>
              ))}
            </div>
            {errors.mode && (
              <p
                role="alert"
                className="mt-2 text-xs font-medium text-crimson-700"
              >
                {errors.mode.message}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-navy-800">
              Direction
            </p>
            <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
              {DIRECTIONS.map((d) => (
                <div key={d.value}>
                  <input
                    id={`direction-${d.value}`}
                    type="radio"
                    value={d.value}
                    className="peer sr-only"
                    {...register("direction", {
                      required: "Please select a direction",
                    })}
                  />
                  <label
                    htmlFor={`direction-${d.value}`}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-navy-200 bg-white px-4 py-3 transition hover:border-navy-300 hover:bg-navy-50/50 peer-checked:border-crimson peer-checked:bg-crimson/5 peer-checked:ring-1 peer-checked:ring-crimson peer-focus-visible:ring-2 peer-focus-visible:ring-crimson/40 sm:flex-col sm:items-start sm:gap-0.5"
                  >
                    <span className="text-sm font-semibold text-navy-900">
                      {d.label}
                    </span>
                    <span className="text-xs text-navy-400">{d.hint}</span>
                  </label>
                </div>
              ))}
            </div>
            {errors.direction && (
              <p
                role="alert"
                className="mt-2 text-xs font-medium text-crimson-700"
              >
                {errors.direction.message}
              </p>
            )}
          </div>
        </Section>

        {/* 2. Route */}
        <Section step="2" title="Route & timing">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Origin" htmlFor="origin" error={errors.origin}>
              <input
                id="origin"
                autoComplete="off"
                className={fieldClass(errors.origin)}
                placeholder="e.g. Dhaka, Bangladesh"
                {...register("origin", { required: "Origin is required" })}
              />
            </Field>
            <Field
              label="Destination"
              htmlFor="destination"
              error={errors.destination}
            >
              <input
                id="destination"
                autoComplete="off"
                className={fieldClass(errors.destination)}
                placeholder="e.g. Rotterdam, Netherlands"
                {...register("destination", {
                  required: "Destination is required",
                })}
              />
            </Field>
            <Field label="Ready Date" htmlFor="readyDate" optional>
              <input
                id="readyDate"
                type="date"
                className={fieldClass()}
                {...register("readyDate")}
              />
            </Field>
            <Field
              label="Delivery Requirement"
              htmlFor="deliveryRequirement"
              optional
            >
              <input
                id="deliveryRequirement"
                className={fieldClass()}
                placeholder="e.g. Door delivery by 14 Nov"
                {...register("deliveryRequirement")}
              />
            </Field>
          </div>
        </Section>

        {/* 3. Cargo */}
        <Section
          step="3"
          title="Cargo details"
          subtitle="Approximate figures are fine if you don't have final numbers."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Commodity"
              htmlFor="commodity"
              error={errors.commodity}
            >
              <input
                id="commodity"
                className={fieldClass(errors.commodity)}
                placeholder="e.g. Knitwear, machinery parts"
                {...register("commodity", {
                  required: "Commodity is required",
                })}
              />
            </Field>
            <Field label="Cargo Type" htmlFor="cargoType" optional>
              <input
                id="cargoType"
                className={fieldClass()}
                placeholder="e.g. General cargo, GOH, oversized"
                {...register("cargoType")}
              />
            </Field>
            <Field label="Pieces" htmlFor="pieces" optional>
              <input
                id="pieces"
                type="number"
                inputMode="numeric"
                min="0"
                className={fieldClass()}
                placeholder="e.g. 40"
                {...register("pieces")}
              />
            </Field>
            <Field label="Dimensions" htmlFor="dimensions" optional>
              <input
                id="dimensions"
                className={fieldClass()}
                placeholder="L x W x H (cm), per piece or total"
                {...register("dimensions")}
              />
            </Field>
            <Field label="Weight" htmlFor="weightValue" optional>
              <UnitInput
                id="weightValue"
                unitName="weightUnit"
                units={["kg", "lb"]}
                register={register}
              />
            </Field>
            <Field label="Volume" htmlFor="volumeValue" optional>
              <UnitInput
                id="volumeValue"
                unitName="volumeUnit"
                units={["cbm", "cft"]}
                register={register}
              />
            </Field>
          </div>
        </Section>

        {/* 4. Contact */}
        <Section
          step="4"
          title="Your details"
          subtitle="So Operations knows who to get back to."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company" htmlFor="company" error={errors.company}>
              <input
                id="company"
                autoComplete="organization"
                className={fieldClass(errors.company)}
                {...register("company", { required: "Company is required" })}
              />
            </Field>
            <Field
              label="Contact Name"
              htmlFor="contactName"
              error={errors.contactName}
            >
              <input
                id="contactName"
                autoComplete="name"
                className={fieldClass(errors.contactName)}
                {...register("contactName", {
                  required: "Contact name is required",
                })}
              />
            </Field>
            <Field label="Email" htmlFor="email" error={errors.email}>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={fieldClass(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </Field>
            <Field label="Phone" htmlFor="phone" optional>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={fieldClass()}
                {...register("phone")}
              />
            </Field>
            <Field
              label="Notes"
              htmlFor="notes"
              optional
              className="sm:col-span-2"
            >
              <textarea
                id="notes"
                rows={3}
                className={`${fieldClass()} resize-y`}
                placeholder="Anything else Operations should know"
                {...register("notes")}
              />
            </Field>
          </div>
        </Section>

        {/* Consent + submit */}
        <div className="space-y-5 border-t border-navy-100 pt-6">
          <div>
            <div className="flex items-start gap-3">
              <input
                id="privacyConsent"
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-300 text-crimson focus:ring-2 focus:ring-crimson/40"
                {...register("privacyConsent", {
                  required: "Please confirm you agree to the privacy notice",
                })}
              />
              <label
                htmlFor="privacyConsent"
                className="text-sm leading-relaxed text-navy-500"
              >
                I agree that Crystal Express may use these details to respond to
                my enquiry, in line with the{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-navy-900 underline underline-offset-2 hover:text-crimson"
                >
                  privacy notice
                </a>
                .
              </label>
            </div>
            {errors.privacyConsent && (
              <p
                role="alert"
                className="mt-2 text-xs font-medium text-crimson-700"
              >
                {errors.privacyConsent.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-crimson px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-crimson/25 transition hover:bg-crimson-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
          >
            {isSubmitting && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="4"
                />
                <path
                  d="M22 12a10 10 0 00-10-10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {isSubmitting ? "Submitting…" : "Submit Quote Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
