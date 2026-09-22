'use client';

import { useEffect, useState, Fragment } from 'react';
import { listQuotes, updateQuote } from '@/lib/adminApi';
import StatusBadge from '@/components/admin/StatusBadge';

const STATUSES = ['new', 'in_review', 'quoted', 'won', 'lost', 'spam'];

export default function AdminQuotesPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Pick up an initial ?status= filter from the URL without pulling in
  // useSearchParams (which would require a Suspense boundary here).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get('status');
    if (initial) setStatusFilter(initial);
  }, []);

  const load = () => {
    setLoading(true);
    setError(null);
    const query = statusFilter ? `?status=${statusFilter}&limit=100` : '?limit=100';
    listQuotes(query)
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [statusFilter]);

  const handleStatusChange = async (id, status) => {
    setItems((prev) => prev.map((q) => (q._id === id ? { ...q, status } : q)));
    try {
      await updateQuote(id, { status });
    } catch (err) {
      setError(err.message);
      load();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Quote Requests</h1>
          <p className="mt-1 text-sm text-navy-400">{total} total</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-navy-200 px-4 py-2 text-sm focus:border-crimson focus:outline-none"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {error && <p className="mt-4 rounded-md border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-700">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-100 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-navy-400">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-navy-400">No quote requests match this filter.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-100 bg-cream-100 text-xs uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((q) => (
                <Fragment key={q._id}>
                  <tr className="border-b border-navy-100 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-navy-500">{q.referenceCode}</td>
                    <td className="px-4 py-3 text-navy-800">
                      <span className="font-semibold">{q.mode}</span> · {q.origin} → {q.destination}
                    </td>
                    <td className="px-4 py-3 text-navy-800">{q.company}</td>
                    <td className="px-4 py-3 text-navy-400">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q._id, e.target.value)}
                        className="rounded-md border border-navy-200 bg-white px-2 py-1 text-xs focus:border-crimson focus:outline-none"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setExpandedId(expandedId === q._id ? null : q._id)}
                        className="focus-ring rounded-md border border-navy-200 px-3 py-1 text-xs font-semibold text-navy-700 hover:border-crimson hover:text-crimson"
                      >
                        {expandedId === q._id ? 'Hide' : 'Details'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === q._id && (
                    <tr className="border-b border-navy-100 bg-cream-100/60 last:border-0">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          <Field label="Direction" value={q.direction} />
                          <Field label="Commodity" value={q.commodity} />
                          <Field label="Pieces" value={q.pieces} />
                          <Field label="Weight" value={q.weight?.value ? `${q.weight.value} ${q.weight.unit}` : '—'} />
                          <Field label="Volume" value={q.volume?.value ? `${q.volume.value} ${q.volume.unit}` : '—'} />
                          <Field label="Dimensions" value={q.dimensions || '—'} />
                          <Field label="Ready Date" value={q.readyDate ? new Date(q.readyDate).toLocaleDateString() : '—'} />
                          <Field label="Delivery Requirement" value={q.deliveryRequirement || '—'} />
                          <Field label="Contact" value={q.contactName} />
                          <Field label="Email" value={q.email} />
                          <Field label="Phone" value={q.phone || '—'} />
                          <Field label="Source" value={q.source} />
                        </div>
                        {q.notes && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Notes</p>
                            <p className="mt-1 text-sm text-navy-700">{q.notes}</p>
                          </div>
                        )}
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
      <p className="mt-0.5 text-sm text-navy-800">{value ?? '—'}</p>
    </div>
  );
}
