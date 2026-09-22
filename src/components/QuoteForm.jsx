'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { submitQuote } from '@/lib/api';

const MODES = [
  { value: 'air', label: 'Air Freight' },
  { value: 'ocean', label: 'Ocean Freight' },
  { value: 'multimodal', label: 'Multimodal' },
  { value: 'inland', label: 'Inland & Customs' },
  { value: 'project', label: 'Project Cargo' },
  { value: 'not_sure', label: "Not sure — advise me" },
];

const DIRECTIONS = [
  { value: 'export', label: 'Export (from Bangladesh)' },
  { value: 'import', label: 'Import (into Bangladesh)' },
  { value: 'domestic', label: 'Domestic' },
];

const fieldClass =
  'w-full rounded-md border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400/60 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy-800';
const errorClass = 'mt-1 text-xs font-medium text-crimson-700';

export default function QuoteForm({ source = 'general_quote', title = 'Request a Quote' }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [result, setResult] = useState(null); // { success, message, referenceCode }

  const onSubmit = async (data) => {
    setResult(null);
    try {
      const response = await submitQuote({
        ...data,
        pieces: data.pieces ? Number(data.pieces) : undefined,
        weight: data.weightValue ? { value: Number(data.weightValue), unit: data.weightUnit || 'kg' } : undefined,
        volume: data.volumeValue ? { value: Number(data.volumeValue), unit: data.volumeUnit || 'cbm' } : undefined,
        privacyConsent: String(!!data.privacyConsent),
        source,
      });
      setResult({ success: true, message: response.message, referenceCode: response.referenceCode });
      reset();
    } catch (err) {
      setResult({ success: false, message: err.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-navy-900">{title}</h2>
      <p className="mt-1.5 text-sm text-navy-400">
        Share the cargo, route and timing. We will tell you what we need to assess the next practical option.
      </p>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-5 overflow-hidden rounded-md border p-4 text-sm ${
              result.success ? 'border-moss/30 bg-moss/5 text-navy-800' : 'border-crimson/30 bg-crimson/5 text-navy-800'
            }`}
          >
            <p className="font-semibold">{result.message}</p>
            {result.referenceCode && (
              <p className="mt-1 text-navy-400">
                Reference: <span className="font-mono font-semibold text-navy-900">{result.referenceCode}</span>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6" noValidate>
        {/* Honeypot — hidden from real users, catches bots */}
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('honeypot')} />

        <fieldset className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="mode">Mode</label>
            <select id="mode" className={fieldClass} {...register('mode', { required: 'Please select a mode' })}>
              <option value="">Select mode</option>
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            {errors.mode && <p className={errorClass}>{errors.mode.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="direction">Direction</label>
            <select id="direction" className={fieldClass} {...register('direction', { required: 'Please select a direction' })}>
              <option value="">Select direction</option>
              {DIRECTIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            {errors.direction && <p className={errorClass}>{errors.direction.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="origin">Origin</label>
            <input id="origin" className={fieldClass} placeholder="e.g. Dhaka, Bangladesh" {...register('origin', { required: 'Origin is required' })} />
            {errors.origin && <p className={errorClass}>{errors.origin.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="destination">Destination</label>
            <input id="destination" className={fieldClass} placeholder="e.g. Rotterdam, Netherlands" {...register('destination', { required: 'Destination is required' })} />
            {errors.destination && <p className={errorClass}>{errors.destination.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="cargoType">Cargo Type</label>
            <input id="cargoType" className={fieldClass} placeholder="e.g. General cargo, GOH, oversized" {...register('cargoType')} />
          </div>

          <div>
            <label className={labelClass} htmlFor="commodity">Commodity</label>
            <input id="commodity" className={fieldClass} placeholder="e.g. Knitwear, machinery parts" {...register('commodity', { required: 'Commodity is required' })} />
            {errors.commodity && <p className={errorClass}>{errors.commodity.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="pieces">Pieces</label>
            <input id="pieces" type="number" min="0" className={fieldClass} placeholder="e.g. 40" {...register('pieces')} />
          </div>

          <div>
            <label className={labelClass} htmlFor="readyDate">Ready Date</label>
            <input id="readyDate" type="date" className={fieldClass} {...register('readyDate')} />
          </div>

          <div>
            <label className={labelClass} htmlFor="weightValue">Weight</label>
            <div className="flex gap-2">
              <input id="weightValue" type="number" min="0" step="0.01" className={fieldClass} placeholder="0.00" {...register('weightValue')} />
              <select className={`${fieldClass} w-24 shrink-0`} {...register('weightUnit')}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="volumeValue">Volume</label>
            <div className="flex gap-2">
              <input id="volumeValue" type="number" min="0" step="0.01" className={fieldClass} placeholder="0.00" {...register('volumeValue')} />
              <select className={`${fieldClass} w-24 shrink-0`} {...register('volumeUnit')}>
                <option value="cbm">cbm</option>
                <option value="cft">cft</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="dimensions">Dimensions</label>
            <input id="dimensions" className={fieldClass} placeholder="L x W x H (cm), per piece or total" {...register('dimensions')} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="deliveryRequirement">Delivery Requirement</label>
            <input id="deliveryRequirement" className={fieldClass} placeholder="e.g. Door delivery by 14 Nov, DC appointment required" {...register('deliveryRequirement')} />
          </div>
        </fieldset>

        <fieldset className="grid gap-5 border-t border-navy-100 pt-6 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="company">Company</label>
            <input id="company" className={fieldClass} {...register('company', { required: 'Company is required' })} />
            {errors.company && <p className={errorClass}>{errors.company.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="contactName">Contact Name</label>
            <input id="contactName" className={fieldClass} {...register('contactName', { required: 'Contact name is required' })} />
            {errors.contactName && <p className={errorClass}>{errors.contactName.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={fieldClass}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">Phone</label>
            <input id="phone" type="tel" className={fieldClass} {...register('phone')} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="notes">Notes</label>
            <textarea id="notes" rows={3} className={fieldClass} placeholder="Anything else Operations should know" {...register('notes')} />
          </div>
        </fieldset>

        <div className="flex items-start gap-3 border-t border-navy-100 pt-6">
          <input
            id="privacyConsent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-navy-300 text-crimson focus:ring-crimson"
            {...register('privacyConsent', { required: 'Please confirm you agree to the privacy notice' })}
          />
          <label htmlFor="privacyConsent" className="text-sm text-navy-500">
            I agree that Crystal Express may use these details to respond to my enquiry, in line with the{' '}
            <a href="/privacy" className="font-semibold text-navy-900 underline">privacy notice</a>.
          </label>
        </div>
        {errors.privacyConsent && <p className={errorClass}>{errors.privacyConsent.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring w-full rounded-md bg-crimson px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Quote Request'}
        </button>
      </form>
    </div>
  );
}
