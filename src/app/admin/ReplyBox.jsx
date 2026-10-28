"use client";

import { useState } from "react";
import { replyToQuote, replyToEnquiry } from "@/lib/adminApi";
import { formatDate } from "@/app/admin/AdminUI";

/**
 * Reply form shown inside an expanded quote / enquiry.
 * Props:
 *  - kind: 'quote' | 'enquiry'
 *  - item: the quote / enquiry document (uses _id, email, replies)
 *  - defaultSubject: prefilled subject line
 *  - onReplied(updatedItem): called with the saved record after a send
 */
export default function ReplyBox({ kind, item, defaultSubject, onReplied }) {
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const send = kind === "quote" ? replyToQuote : replyToEnquiry;
  const replies = item.replies || [];

  async function handleSend(e) {
    e.preventDefault();
    if (!message.trim() || sending) return;

    setSending(true);
    setError(null);
    setNotice(null);
    try {
      const res = await send(item._id, { subject, message });
      onReplied?.(res.item);
      setMessage("");
      setNotice(`Reply sent to ${item.email}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-4 sm:p-5">
      <h4 className="text-sm font-bold text-navy-900">Reply to sender</h4>
      <p className="mt-1 break-words text-xs text-navy-400">
        To: <span className="font-semibold text-navy-700">{item.email}</span>.
        Sent from the Crystal Express contact mailbox; the customer&apos;s
        answer arrives in that mailbox.
      </p>

      <form onSubmit={handleSend} className="mt-4 space-y-3">
        <div>
          <label
            className="mb-1 block text-xs font-semibold text-navy-700"
            htmlFor={`reply-subject-${item._id}`}
          >
            Subject
          </label>
          <input
            id={`reply-subject-${item._id}`}
            type="text"
            value={subject}
            maxLength={200}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-xs font-semibold text-navy-700"
            htmlFor={`reply-message-${item._id}`}
          >
            Message
          </label>
          <textarea
            id={`reply-message-${item._id}`}
            rows={6}
            value={message}
            maxLength={5000}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your reply…"
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson"
          />
        </div>

        {error && (
          <p className="rounded-md border border-crimson/30 bg-crimson/5 px-3 py-2 text-sm text-crimson-700">
            {error}
          </p>
        )}
        {notice && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {notice}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-navy-400">{message.length}/5000</span>
          <button
            type="submit"
            disabled={sending || !message.trim()}
            className="focus-ring rounded-md bg-crimson px-5 py-2 text-sm font-bold text-white hover:bg-crimson-700 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send reply"}
          </button>
        </div>
      </form>

      {replies.length > 0 && (
        <div className="mt-5 border-t border-navy-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Sent replies ({replies.length})
          </p>
          <ul className="mt-3 space-y-3">
            {[...replies].reverse().map((r) => (
              <li key={r._id} className="rounded-lg bg-navy-100/30 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-navy-400">
                  <span className="font-semibold text-navy-700">
                    {r.sentByName || "Team"}
                  </span>
                  <span>{formatDate(r.sentAt)}</span>
                </div>
                {r.subject && (
                  <p className="mt-1 break-words text-xs text-navy-500">
                    {r.subject}
                  </p>
                )}
                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-navy-800">
                  {r.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
