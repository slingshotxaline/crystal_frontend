'use client';

import { useState } from 'react';

function toFormState(fields, item) {
  const state = {};
  fields.forEach((f) => {
    const raw = item?.[f.key];
    if (f.type === 'list') {
      state[f.key] = Array.isArray(raw) ? raw.join('\n') : '';
    } else if (f.type === 'checkbox') {
      state[f.key] = !!raw;
    } else {
      state[f.key] = raw ?? '';
    }
  });
  return state;
}

function toPayload(fields, state) {
  const payload = {};
  fields.forEach((f) => {
    const value = state[f.key];
    if (f.type === 'list') {
      payload[f.key] = value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    } else if (f.type === 'number') {
      payload[f.key] = value === '' ? undefined : Number(value);
    } else {
      payload[f.key] = value;
    }
  });
  return payload;
}

export default function ResourceForm({ config, item, onCancel, onSubmit, submitting }) {
  const [state, setState] = useState(() => toFormState(config.fields, item));

  const handleChange = (key, value) => setState((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(toPayload(config.fields, state));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-900/50 p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">
            {item ? `Edit ${config.label.replace(/s$/, '')}` : `New ${config.label.replace(/s$/, '')}`}
          </h2>
          <button onClick={onCancel} className="focus-ring rounded p-1 text-navy-400 hover:text-navy-900" aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {config.fields.map((f) => (
            <div key={f.key}>
              {f.type === 'checkbox' ? (
                <label className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                  <input
                    type="checkbox"
                    checked={state[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.checked)}
                    className="h-4 w-4 rounded border-navy-300 text-crimson focus:ring-crimson"
                  />
                  {f.label}
                </label>
              ) : (
                <>
                  <label className="mb-1.5 block text-sm font-semibold text-navy-800">
                    {f.label}
                    {f.required && <span className="text-crimson"> *</span>}
                  </label>
                  {f.type === 'textarea' || f.type === 'list' ? (
                    <textarea
                      required={f.required}
                      rows={f.type === 'list' ? 4 : 3}
                      value={state[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      className="w-full rounded-md border border-navy-200 px-4 py-2.5 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      required={f.required}
                      value={state[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      className="w-full rounded-md border border-navy-200 px-4 py-2.5 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                    >
                      <option value="">Select…</option>
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === 'number' ? 'number' : 'text'}
                      required={f.required}
                      value={state[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      className="w-full rounded-md border border-navy-200 px-4 py-2.5 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
                    />
                  )}
                </>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 border-t border-navy-100 pt-5">
            <button
              type="button"
              onClick={onCancel}
              className="focus-ring rounded-md border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-700 hover:border-navy-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="focus-ring rounded-md bg-crimson px-5 py-2.5 text-sm font-bold text-white hover:bg-crimson-700 disabled:opacity-60"
            >
              {submitting ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
