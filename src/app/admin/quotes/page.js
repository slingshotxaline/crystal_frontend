"use client";

import { useEffect, useMemo, useState, Fragment } from "react";
import { listQuotes, updateQuote } from "@/lib/adminApi";
import {
  PageHeader,
  SearchInput,
  FilterChips,
  ErrorBanner,
  EmptyState,
  SkeletonRows,
  SkeletonCards,
  MobileCard,
  StatusSelect,
  Avatar,
  ExpandButton,
  Field,
  DetailCard,
  TextCard,
  ActionLink,
  icons,
  formatDate,
} from "@/app/admin/AdminUI";
import ReplyBox from "@/app/admin/ReplyBox";

const STATUSES = ["new", "in_review", "quoted", "won", "lost", "spam"];
const COLS = 6;

/* Expanded content. `stacked` = single column (phone / tablet cards). */
function QuoteDetails({ q, stacked, onReplied }) {
  return (
    <>
      <div className={stacked ? "space-y-4" : "grid gap-4 lg:grid-cols-5"}>
        <div className={stacked ? "" : "lg:col-span-3"}>
          <DetailCard title="Shipment">
            <Field label="Direction" value={q.direction} />
            <Field label="Pieces" value={q.pieces} />
            <Field label="Commodity" value={q.commodity} wide />
            <Field
              label="Weight"
              value={
                q.weight?.value ? `${q.weight.value} ${q.weight.unit}` : "—"
              }
            />
            <Field
              label="Volume"
              value={
                q.volume?.value ? `${q.volume.value} ${q.volume.unit}` : "—"
              }
            />
            <Field label="Dimensions" value={q.dimensions || "—"} />
            <Field
              label="Ready date"
              value={q.readyDate ? formatDate(q.readyDate) : "—"}
            />
            <Field
              label="Delivery requirement"
              value={q.deliveryRequirement || "—"}
              wide
            />
          </DetailCard>
        </div>

        <div className={stacked ? "space-y-4" : "space-y-4 lg:col-span-2"}>
          <DetailCard title="Contact">
            <Field label="Name" value={q.contactName} />
            <Field label="Source" value={q.source} />
            <Field
              label="Email"
              value={q.email}
              href={`mailto:${q.email}`}
              wide
            />
            <Field
              label="Phone"
              value={q.phone || "—"}
              href={q.phone ? `tel:${q.phone}` : undefined}
              wide
            />
          </DetailCard>

          {q.phone && (
            <div className="flex flex-wrap gap-2">
              <ActionLink icon={icons.phone} href={`tel:${q.phone}`}>
                Call
              </ActionLink>
            </div>
          )}
        </div>
      </div>

      {q.notes && (
        <div className="mt-4">
          <TextCard title="Notes">{q.notes}</TextCard>
        </div>
      )}

      <div className="mt-4">
        <ReplyBox
          kind="quote"
          item={q}
          defaultSubject={`Re: Quote request ${q.referenceCode}`}
          onReplied={onReplied}
        />
      </div>
    </>
  );
}

export default function AdminQuotesPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [ready, setReady] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Pick up an initial ?status= filter from the URL without pulling in
  // useSearchParams (which would require a Suspense boundary here).
  // `ready` stops the first fetch from firing before the filter is known.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("status");
    if (initial) setStatusFilter(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let active = true;
    setLoading(true);
    setError(null);
    const q = statusFilter ? `?status=${statusFilter}&limit=100` : "?limit=100";
    listQuotes(q)
      .then((res) => {
        if (!active) return;
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [ready, statusFilter, reloadKey]);

  const reload = () => setReloadKey((k) => k + 1);

  const handleStatusChange = async (id, status) => {
    setItems((prev) => prev.map((q) => (q._id === id ? { ...q, status } : q)));
    try {
      await updateQuote(id, { status });
    } catch (err) {
      setError(err.message);
      reload();
    }
  };

  // After a dashboard reply, swap in the saved record (new reply + status)
  const handleReplied = (updated) =>
    setItems((prev) => prev.map((q) => (q._id === updated._id ? updated : q)));

  // Client-side search across the loaded rows (up to 100).
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((q) =>
      [
        q.referenceCode,
        q.company,
        q.contactName,
        q.email,
        q.origin,
        q.destination,
        q.mode,
        q.commodity,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term)),
    );
  }, [items, query]);

  const hasFilters = Boolean(statusFilter || query);
  const clearFilters = () => {
    setStatusFilter("");
    setQuery("");
  };

  const subtitle = loading
    ? "Loading requests…"
    : `${total} total${hasFilters ? ` · ${visible.length} shown` : ""}${
        total > items.length ? ` · showing the latest ${items.length}` : ""
      }`;

  const showEmpty = !loading && visible.length === 0;

  return (
    <div className="mx-auto w-full min-w-0 container">
      <PageHeader
        title="Quote Requests"
        subtitle={subtitle}
        onRefresh={reload}
        loading={loading}
      />

      {/* Toolbar: search first on phones, chips first on desktop */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search reference, company, route…"
          className="lg:order-last"
        />
        <FilterChips
          label="Filter by status"
          options={STATUSES}
          value={statusFilter}
          onChange={setStatusFilter}
          allLabel="All statuses"
        />
      </div>

      <ErrorBanner message={error} onRetry={reload} />

      {showEmpty ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
          <EmptyState
            title="No quote requests found"
            text={
              hasFilters
                ? "Nothing matches your current filters. Try a different status or clear the search."
                : "New quote requests from your website will show up here."
            }
            actionLabel={hasFilters ? "Clear filters" : undefined}
            onAction={clearFilters}
          />
        </div>
      ) : (
        <>
          {/* ============ Phones & tablets: cards (1 column, 2 on sm+) ============ */}
          <div className="mt-6 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:hidden">
            {loading ? (
              <SkeletonCards />
            ) : (
              visible.map((q) => {
                const open = expandedId === q._id;
                return (
                  <MobileCard key={q._id} open={open}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate rounded-md bg-navy-100/60 px-2 py-1 font-mono text-xs text-navy-700">
                        {q.referenceCode}
                      </span>
                      <span className="shrink-0 text-xs text-navy-400">
                        {formatDate(q.createdAt)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                      <span className="inline-flex rounded-md bg-navy-900 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                        {q.mode}
                      </span>
                      <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 break-words font-semibold text-navy-900">
                        {q.origin}
                        <span className="text-navy-400">
                          {icons.arrowRight}
                        </span>
                        {q.destination}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Avatar name={q.company || q.contactName} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-navy-900">
                          {q.company}
                        </p>
                        <p className="truncate text-xs text-navy-400">
                          {q.contactName}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-navy-100 pt-4">
                      <StatusSelect
                        label={`Status for ${q.referenceCode}`}
                        value={q.status}
                        options={STATUSES}
                        onChange={(s) => handleStatusChange(q._id, s)}
                      />
                      <ExpandButton
                        open={open}
                        onClick={() => setExpandedId(open ? null : q._id)}
                      />
                    </div>

                    {open && (
                      <div className="mt-4 rounded-xl bg-navy-100/30 p-3 sm:p-4">
                        <QuoteDetails q={q} stacked onReplied={handleReplied} />
                      </div>
                    )}
                  </MobileCard>
                );
              })
            )}
          </div>

          {/* ============ Desktop (xl+): table ============ */}
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm xl:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-navy-100 bg-navy-100/30 text-[11px] uppercase tracking-wider text-navy-400">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Reference</th>
                    <th className="px-5 py-3.5 font-semibold">Route</th>
                    <th className="px-5 py-3.5 font-semibold">Company</th>
                    <th className="px-5 py-3.5 font-semibold">Received</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <SkeletonRows cols={COLS} />
                  ) : (
                    visible.map((q) => {
                      const open = expandedId === q._id;
                      return (
                        <Fragment key={q._id}>
                          <tr
                            className={`border-b border-navy-100 transition-colors last:border-0 ${
                              open ? "bg-navy-100/30" : "hover:bg-navy-100/20"
                            }`}
                          >
                            <td className="px-5 py-4">
                              <span className="rounded-md bg-navy-100/60 px-2 py-1 font-mono text-xs text-navy-700">
                                {q.referenceCode}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-md bg-navy-900 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                                {q.mode}
                              </span>
                              <p className="mt-1.5 flex items-center gap-1.5 font-medium text-navy-900">
                                {q.origin}
                                <span className="text-navy-400">
                                  {icons.arrowRight}
                                </span>
                                {q.destination}
                              </p>
                            </td>
                            <td className="max-w-[16rem] px-5 py-4">
                              <div className="flex items-center gap-3">
                                <Avatar name={q.company || q.contactName} />
                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-navy-900">
                                    {q.company}
                                  </p>
                                  <p className="truncate text-xs text-navy-400">
                                    {q.contactName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 text-navy-500">
                              {formatDate(q.createdAt)}
                            </td>
                            <td className="px-5 py-4">
                              <StatusSelect
                                label={`Status for ${q.referenceCode}`}
                                value={q.status}
                                options={STATUSES}
                                onChange={(s) => handleStatusChange(q._id, s)}
                              />
                            </td>
                            <td className="px-5 py-4 text-right">
                              <ExpandButton
                                open={open}
                                onClick={() =>
                                  setExpandedId(open ? null : q._id)
                                }
                              />
                            </td>
                          </tr>

                          {open && (
                            <tr className="border-b border-navy-100 bg-navy-100/30 last:border-0">
                              <td colSpan={COLS} className="px-5 pb-6 pt-2">
                                <QuoteDetails q={q} onReplied={handleReplied} />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
