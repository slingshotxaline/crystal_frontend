'use client';

import { useEffect, useState } from 'react';
import {
  listResource,
  createResourceItem,
  updateResourceItem,
  deleteResourceItem,
} from '@/lib/adminApi';
import { ADMIN_RESOURCES } from '@/data/adminResources';
import ResourceForm from './ResourceForm';
import StatusBadge from './StatusBadge';

export default function ResourceManager({ resourceKey }) {
  const config = ADMIN_RESOURCES[resourceKey];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // object | 'new' | null
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    listResource(config.apiPath, '?limit=200')
      .then((res) => setItems(res.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [resourceKey]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingItem && editingItem !== 'new') {
        await updateResourceItem(config.apiPath, editingItem._id, payload);
      } else {
        await createResourceItem(config.apiPath, payload);
      }
      setEditingItem(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title || item.name}"? This can't be undone.`)) return;
    try {
      await deleteResourceItem(config.apiPath, item._id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{config.label}</h1>
          <p className="mt-1 text-sm text-navy-400">{items.length} items</p>
        </div>
        <button
          onClick={() => setEditingItem('new')}
          className="focus-ring rounded-md bg-crimson px-5 py-2.5 text-sm font-bold text-white hover:bg-crimson-700"
        >
          + New {config.label.replace(/s$/, '')}
        </button>
      </div>

      {error && <p className="mt-4 rounded-md border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-700">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-100 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-navy-400">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-navy-400">Nothing here yet. Create the first one.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-100 bg-cream-100 text-xs uppercase tracking-wide text-navy-400">
              <tr>
                {config.columns.map((col) => (
                  <th key={col.key} className="px-4 py-3">{col.label}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-navy-100 last:border-0">
                  {config.columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-navy-800">
                      {typeof item[col.key] === 'boolean' ? (
                        <StatusBadge value={item[col.key]} />
                      ) : (
                        item[col.key] || '—'
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="focus-ring rounded-md border border-navy-200 px-3 py-1 text-xs font-semibold text-navy-700 hover:border-crimson hover:text-crimson"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="focus-ring rounded-md border border-navy-200 px-3 py-1 text-xs font-semibold text-navy-700 hover:border-crimson hover:text-crimson"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingItem && (
        <ResourceForm
          config={config}
          item={editingItem === 'new' ? null : editingItem}
          onCancel={() => setEditingItem(null)}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
}
