"use client";

import { useState } from "react";
import { changeMyPassword } from "@/lib/adminApi";
import { setToken } from "@/lib/auth";

/**
 * /admin/account — any logged-in user can change their own password.
 */
export default function AccountPage() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState(null); // { type: 'ok' | 'error', text }
  const [saving, setSaving] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (form.next.length < 8) {
      return setStatus({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
    }
    if (form.next !== form.confirm) {
      return setStatus({ type: "error", text: "New passwords do not match." });
    }

    setSaving(true);
    try {
      const data = await changeMyPassword(form.current, form.next);
      // Old token is invalidated server-side; store the fresh one.
      if (data.token) setToken(data.token);
      setForm({ current: "", next: "", confirm: "" });
      setStatus({ type: "ok", text: "Password updated." });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  const input =
    "w-full rounded-md border border-navy-100 px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-crimson";

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold text-navy-900">My account</h1>
      <p className="mt-1 text-sm text-navy-400">Change your login password.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-navy-900">
          Current password
          <input
            type="password"
            name="current"
            value={form.current}
            onChange={onChange}
            autoComplete="current-password"
            required
            className={`mt-1 ${input}`}
          />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          New password
          <input
            type="password"
            name="next"
            value={form.next}
            onChange={onChange}
            autoComplete="new-password"
            minLength={8}
            required
            className={`mt-1 ${input}`}
          />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Confirm new password
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            autoComplete="new-password"
            minLength={8}
            required
            className={`mt-1 ${input}`}
          />
        </label>

        {status && (
          <p
            role="status"
            className={`text-sm ${status.type === "ok" ? "text-green-700" : "text-crimson"}`}
          >
            {status.text}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
