const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Thin fetch wrapper for the Express/MongoDB backend. Every form on the
 * site posts through here so validation, spam protection and email
 * routing stay server-side (see backend/src/routes).
 */
async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: method === 'GET' ? 'no-store' : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = res.status;
    error.details = data.errors;
    throw error;
  }

  return data;
}

export const submitQuote = (payload) => request('/quotes', { method: 'POST', body: payload });
export const submitEnquiry = (payload) => request('/enquiries', { method: 'POST', body: payload });

export const fetchPublicServices = () => request('/cms/services/public');
export const fetchPublicIndustries = () => request('/cms/industries/public');
export const fetchPublicCaseStudies = () => request('/cms/case-studies/public');
export const fetchPublicInsights = () => request('/cms/insights/public');
export const fetchPublicLocations = () => request('/cms/locations/public');
