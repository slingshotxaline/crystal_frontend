"use client";

import { useState } from "react";

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* cancelled */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
    >
      {copied ? (
        <>
          <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m2.5 6.5 2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Link copied
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 13V3m0 0L6 7m4-4 4 4M4 11v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}