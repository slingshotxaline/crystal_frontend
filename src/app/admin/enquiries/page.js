'use client';

import { useEffect, useState, Fragment } from 'react';
import { listEnquiries, updateEnquiry } from '@/lib/adminApi';

const TYPES = ['general', 'partnership', 'careers'];
const STATUSES = ['new', 'in_review', 'responded', 'closed', 'spam'];

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialStatus = params.get('status');
    const initialType = params.get('type');
    if (initialStatus) setStatusFilter(initialStatus);
    if (initialType) setTypeFilter(initialType);
  }, []);

  const load = () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ limit: '100' });
    if (typeFilter) params.set('type', typeFilter);
    if (statusFilter) params.set('status', statusFilter);
    listEnquiries(`?${params.toString()}`)
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [typeFilter, statusFilter]);

  const handleStatusChange = async (id, status) => {
    setItems((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
    try {
      await updateEnquiry(id, { status });
    } catch (err) {
      setError(err.message);
      load();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Enquiries</h1>
          <p className="mt-1 text-sm text-navy-400">{total} total</p>
        </div>
        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-md border border-navy-200 px-4 py-2 text-sm focus:border-crimson focus:outline-none"
          >
            <option value="">All types</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-navy-200 px-4 py-2 text-sm focus:border-crimson focus:outline-none"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="mt-4 rounded-md border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-700">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-100 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-navy-400">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-navy-400">No enquiries match this filter.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-100 bg-cream-100 text-xs uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Name / Company</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <Fragment key={e._id}>
                  <tr className="border-b border-navy-100 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-navy-500">{e.referenceCode}</td>
                    <td className="px-4 py-3 capitalize text-navy-800">{e.type}</td>
                    <td className="px-4 py-3 text-navy-800">{e.fullName}{e.company ? ` · ${e.company}` : ''}</td>
                    <td className="px-4 py-3 text-navy-400">{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                        className="rounded-md border border-navy-200 bg-white px-2 py-1 text-xs focus:border-crimson focus:outline-none"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setExpandedId(expandedId === e._id ? null : e._id)}
                        className="focus-ring rounded-md border border-navy-200 px-3 py-1 text-xs font-semibold text-navy-700 hover:border-crimson hover:text-crimson"
                      >
                        {expandedId === e._id ? 'Hide' : 'Details'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === e._id && (
                    <tr className="border-b border-navy-100 bg-cream-100/60 last:border-0">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          <Field label="Email" value={e.email} />
                          <Field label="Phone" value={e.phone || '—'} />
                          <Field label="Subject" value={e.subject || '—'} />
                          {e.partnershipRegion && <Field label="Region" value={e.partnershipRegion} />}
                          {e.partnershipType && <Field label="Partnership Type" value={e.partnershipType} />}
                          {e.resumeUrl && <Field label="Resume" value={e.resumeUrl} />}
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Message</p>
                          <p className="mt-1 text-sm text-navy-700">{e.message}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</p>
      <p className="mt-0.5 break-words text-sm text-navy-800">{value}</p>
    </div>
  );
}
