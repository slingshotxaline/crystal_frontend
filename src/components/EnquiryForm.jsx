'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { submitEnquiry } from '@/lib/api';

const fieldClass =
  'w-full rounded-md border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400/60 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy-800';
const errorClass = 'mt-1 text-xs font-medium text-crimson-700';

/**
 * type: 'general' | 'partnership' | 'careers'
 */
export default function EnquiryForm({ type = 'general', title = 'Contact an Office', jobId = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    setResult(null);
    try {
      const response = await submitEnquiry({
        ...data,
        type,
        jobId: jobId || undefined,
        privacyConsent: String(!!data.privacyConsent),
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('honeypot')} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="fullName">Name</label>
            <input id="fullName" className={fieldClass} {...register('fullName', { required: 'Name is required' })} />
            {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="company">Company</label>
            <input id="company" className={fieldClass} {...register('company')} />
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
        </div>

        {type === 'partnership' && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="partnershipRegion">Region</label>
              <input id="partnershipRegion" className={fieldClass} placeholder="e.g. Southeast Asia" {...register('partnershipRegion')} />
            </div>
            <div>
              <label className={labelClass} htmlFor="partnershipType">Partnership Type</label>
              <select id="partnershipType" className={fieldClass} {...register('partnershipType')}>
                <option value="">Select type</option>
                <option value="overseas_agent">Overseas Agent</option>
                <option value="joint_venture">Joint Venture</option>
                <option value="network_membership">Network Membership</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {type === 'careers' && (
          <div>
            <label className={labelClass} htmlFor="resumeUrl">Resume / CV link</label>
            <input id="resumeUrl" className={fieldClass} placeholder="Link to your CV (Drive, Dropbox, etc.)" {...register('resumeUrl')} />
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="subject">Subject</label>
          <input id="subject" className={fieldClass} {...register('subject')} />
        </div>

        <div>
          <label className={labelClass} htmlFor="message">Message</label>
          <textarea id="message" rows={4} className={fieldClass} {...register('message', { required: 'Message is required' })} />
          {errors.message && <p className={errorClass}>{errors.message.message}</p>}
        </div>

        <div className="flex items-start gap-3 border-t border-navy-100 pt-5">
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
          className="focus-ring w-full rounded-md bg-navy-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? 'Submitting…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
