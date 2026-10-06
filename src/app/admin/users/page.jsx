"use client";

import { useCallback, useEffect, useState } from "react";
import {
  listUsers,
  createUser,
  updateUser,
  resetUserPassword,
  deleteUser,
} from "@/lib/adminApi";
import { getCurrentUser } from "@/lib/auth";

const ROLES = [
  { value: "admin", label: "Admin", hint: "Full control, including users" },
  { value: "editor", label: "Editor", hint: "Manage content" },
  { value: "viewer", label: "Viewer", hint: "Read-only dashboard" },
];

const inputCls =
  "w-full rounded-md border border-navy-100 px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-crimson";

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-navy-400 hover:text-navy-900"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CreateUserForm({ onDone }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createUser(form);
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className={inputCls}
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        className={inputCls}
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        required
      />
      <input
        className={inputCls}
        type="password"
        name="password"
        placeholder="Temporary password (min 8 characters)"
        value={form.password}
        onChange={onChange}
        minLength={8}
        autoComplete="new-password"
        required
      />
      <select
        className={inputCls}
        name="role"
        value={form.role}
        onChange={onChange}
      >
        {ROLES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label} — {r.hint}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-crimson">{error}</p>}
      <button
        disabled={saving}
        className="w-full rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-700 disabled:opacity-60"
      >
        {saving ? "Creating…" : "Create user"}
      </button>
    </form>
  );
}

function ResetPasswordForm({ user, onDone }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await resetUserPassword(user._id, password);
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="text-sm text-navy-400">
        Set a new password for{" "}
        <strong className="text-navy-900">{user.email}</strong>. They will be
        signed out everywhere.
      </p>
      <input
        className={inputCls}
        type="password"
        placeholder="New password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        autoComplete="new-password"
        required
      />
      {error && <p className="text-sm text-crimson">{error}</p>}
      <button
        disabled={saving}
        className="w-full rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-700 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Reset password"}
      </button>
    </form>
  );
}

/**
 * /admin/users — admin-only user and role management.
 */
export default function UsersPage() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // { type: 'create' } | { type: 'reset', user }

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await listUsers();
      setUsers(res.data);
    } catch (err) {
      setError(
        err.status === 403 ? "Only admins can manage users." : err.message,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser().then(setMe);
    load();
  }, [load]);

  async function patch(user, body) {
    setError("");
    try {
      await updateUser(user._id, body);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(user) {
    if (
      !window.confirm(
        `Delete ${user.name} (${user.email})? This cannot be undone.`,
      )
    )
      return;
    setError("");
    try {
      await deleteUser(user._id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const isSelf = (u) => me && String(me._id || me.id) === String(u._id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">
            Users &amp; roles
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            Create CMS users, assign roles and reset passwords.
          </p>
        </div>
        <button
          onClick={() => setModal({ type: "create" })}
          className="rounded-md bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-700"
        >
          New user
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-crimson">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-lg border border-navy-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-100 text-navy-900">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Last login</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-navy-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading &&
              users.map((u) => (
                <tr key={u._id} className="border-t border-navy-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy-900">
                      {u.name}{" "}
                      {isSelf(u) && (
                        <span className="text-xs text-navy-400">(you)</span>
                      )}
                    </div>
                    <div className="text-xs text-navy-400">{u.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      disabled={isSelf(u)}
                      onChange={(e) => patch(u, { role: e.target.value })}
                      className="rounded-md border border-navy-100 px-2 py-1 text-sm disabled:bg-cream-100"
                      aria-label={`Role for ${u.name}`}
                    >
                      {ROLES.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-navy-100 text-navy-800"
                      }`}
                    >
                      {u.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-navy-400">
                    {u.lastLoginAt
                      ? new Date(u.lastLoginAt).toLocaleString()
                      : "Never"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3 text-xs font-semibold">
                      <button
                        onClick={() => setModal({ type: "reset", user: u })}
                        className="text-navy-900 hover:text-crimson"
                      >
                        Reset password
                      </button>
                      {!isSelf(u) && (
                        <>
                          <button
                            onClick={() => patch(u, { isActive: !u.isActive })}
                            className="text-navy-900 hover:text-crimson"
                          >
                            {u.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => remove(u)}
                            className="text-crimson hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modal?.type === "create" && (
        <Modal title="New user" onClose={() => setModal(null)}>
          <CreateUserForm
            onDone={() => {
              setModal(null);
              load();
            }}
          />
        </Modal>
      )}
      {modal?.type === "reset" && (
        <Modal title="Reset password" onClose={() => setModal(null)}>
          <ResetPasswordForm user={modal.user} onDone={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}
