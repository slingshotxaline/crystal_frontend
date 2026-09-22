'use client';

const TOKEN_KEY = 'cel_admin_token';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

/**
 * POST /api/auth/login — returns { token, user } on success.
 * Throws with a readable message on failure.
 */
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Login failed.');
  setToken(data.token);
  return data.user;
}

export function logout() {
  clearToken();
}

/**
 * GET /api/auth/me using the stored token. Returns null if not
 * authenticated instead of throwing, so callers can redirect quietly.
 */
export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}
