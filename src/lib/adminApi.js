'use client';

import { getToken, clearToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Authenticated fetch wrapper for the admin dashboard. Attaches the
 * stored JWT, and clears it on a 401 so the next protected page load
 * redirects back to /admin/login instead of looping on a dead token.
 */
async function adminRequest(path, { method = 'GET', body } = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (res.status === 401) {
    clearToken();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || 'Request failed.');
    error.status = res.status;
    error.details = data.errors;
    throw error;
  }
  return data;
}

// ---- Quotes ----
export const listQuotes = (query = '') => adminRequest(`/quotes${query}`);
export const getQuote = (id) => adminRequest(`/quotes/${id}`);
export const updateQuote = (id, body) => adminRequest(`/quotes/${id}`, { method: 'PATCH', body });

// ---- Enquiries ----
export const listEnquiries = (query = '') => adminRequest(`/enquiries${query}`);
export const updateEnquiry = (id, body) => adminRequest(`/enquiries/${id}`, { method: 'PATCH', body });

// ---- Generic CMS resource CRUD ----
// resource: 'services' | 'industries' | 'locations' | 'case-studies' | 'insights' | 'jobs' | 'pages'
export const listResource = (resource, query = '') => adminRequest(`/cms/${resource}${query}`);
export const getResourceItem = (resource, id) => adminRequest(`/cms/${resource}/${id}`);
export const createResourceItem = (resource, body) => adminRequest(`/cms/${resource}`, { method: 'POST', body });
export const updateResourceItem = (resource, id, body) => adminRequest(`/cms/${resource}/${id}`, { method: 'PATCH', body });
export const deleteResourceItem = (resource, id) => adminRequest(`/cms/${resource}/${id}`, { method: 'DELETE' });
