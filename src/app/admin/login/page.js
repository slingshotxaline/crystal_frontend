'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-crimson text-xs font-bold text-crimson">
          EL
        </span>
        <h1 className="mt-5 text-xl font-bold text-navy-900">Crystal Express Admin</h1>
        <p className="mt-1 text-sm text-navy-400">Sign in to manage quotes, enquiries and site content.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-800">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-navy-200 px-4 py-2.5 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy-800">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-navy-200 px-4 py-2.5 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
            />
          </div>

          {error && <p className="text-sm font-medium text-crimson-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full rounded-md bg-crimson px-6 py-3 text-sm font-bold text-white hover:bg-crimson-700 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-xs text-navy-400">
          No account yet? Run <code className="rounded bg-cream-100 px-1.5 py-0.5">npm run seed</code> in{' '}
          <code className="rounded bg-cream-100 px-1.5 py-0.5">/backend</code> to create the first admin user.
        </p>
      </div>
    </div>
  );
}
