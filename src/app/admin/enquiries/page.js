"use client";

import { useEffect, useMemo, useState, Fragment } from "react";
import { listEnquiries, updateEnquiry } from "@/lib/adminApi";
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
  TypeBadge,
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

const TYPES = ["general", "partnership", "careers"];
const STATUSES = ["new", "in_review", "responded", "closed", "spam"];
const COLS = 6;

/* Expanded content. `stacked` = single column (phone / tablet cards). */
function EnquiryDetails({ enq, stacked, onReplied }) {
  return (
    <>
      <div className={stacked ? "space-y-4" : "grid gap-4 lg:grid-cols-5"}>
        <div className={stacked ? "" : "lg:col-span-2"}>
          <DetailCard title="Contact">
            <Field
              label="Email"
              value={enq.email}
              href={`mailto:${enq.email}`}
              wide
            />
            <Field
              label="Phone"
              value={enq.phone || "—"}
              href={enq.phone ? `tel:${enq.phone}` : undefined}
              wide
            />
            <Field label="Subject" value={enq.subject || "—"} wide />
            {enq.partnershipRegion && (
              <Field label="Region" value={enq.partnershipRegion} />
            )}
            {enq.partnershipType && (
              <Field label="Partnership type" value={enq.partnershipType} />
            )}
            {enq.resumeUrl && (
              <Field
                label="Resume"
                value="Open resume"
                href={enq.resumeUrl}
                wide
              />
            )}
          </DetailCard>
        </div>

        <div className={stacked ? "space-y-4" : "space-y-4 lg:col-span-3"}>
          <TextCard title="Message">{enq.message}</TextCard>

          {(enq.phone || enq.resumeUrl) && (
            <div className="flex flex-wrap gap-2">
              {enq.phone && (
                <ActionLink icon={icons.phone} href={`tel:${enq.phone}`}>
                  Call
                </ActionLink>
              )}
              {enq.resumeUrl && (
                <ActionLink icon={icons.file} href={enq.resumeUrl}>
                  View resume
                </ActionLink>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <ReplyBox
          kind="enquiry"
          item={enq}
          defaultSubject={`Re: ${enq.subject || `Enquiry ${enq.referenceCode}`}`}
          onReplied={onReplied}
        />
      </div>
    </>
  );
}

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [ready, setReady] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Read initial ?status= / ?type= filters, then allow the first fetch.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialStatus = params.get("status");
    const initialType = params.get("type");
    if (initialStatus) setStatusFilter(initialStatus);
    if (initialType) setTypeFilter(initialType);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let active = true;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ limit: "100" });
    if (typeFilter) params.set("type", typeFilter);
    if (statusFilter) params.set("status", statusFilter);
    listEnquiries(`?${params.toString()}`)
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
  }, [ready, typeFilter, statusFilter, reloadKey]);

  const reload = () => setReloadKey((k) => k + 1);

  const handleStatusChange = async (id, status) => {
    setItems((prev) =>
      prev.map((enq) => (enq._id === id ? { ...enq, status } : enq)),
    );
    try {
      await updateEnquiry(id, { status });
    } catch (err) {
      setError(err.message);
      reload();
    }
  };

  // After a dashboard reply, swap in the saved record (new reply + status)
  const handleReplied = (updated) =>
    setItems((prev) =>
      prev.map((enq) => (enq._id === updated._id ? updated : enq)),
    );

  // Client-side search across the loaded rows (up to 100).
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((enq) =>
      [
        enq.referenceCode,
        enq.fullName,
        enq.company,
        enq.email,
        enq.subject,
        enq.message,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term)),
    );
  }, [items, query]);

  const hasFilters = Boolean(typeFilter || statusFilter || query);
  const clearFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setQuery("");
  };

  const subtitle = loading
    ? "Loading enquiries…"
    : `${total} total${hasFilters ? ` · ${visible.length} shown` : ""}${
        total > items.length ? ` · showing the latest ${items.length}` : ""
      }`;

  const showEmpty = !loading && visible.length === 0;

  return (
    <div className="mx-auto w-full min-w-0 container">
      <PageHeader
        title="Enquiries"
        subtitle={subtitle}
        onRefresh={reload}
        loading={loading}
      />

      {/* Toolbar: search first on phones; type chips + search on one row on desktop */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search name, company, email…"
            className="lg:order-last"
          />
          <FilterChips
            label="Filter by type"
            options={TYPES}
            value={typeFilter}
            onChange={setTypeFilter}
            allLabel="All types"
          />
        </div>
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
            title="No enquiries found"
            text={
              hasFilters
                ? "Nothing matches your current filters. Try a different type or status, or clear the search."
                : "New enquiries from your website will show up here."
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
              visible.map((enq) => {
                const open = expandedId === enq._id;
                return (
                  <MobileCard key={enq._id} open={open}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate rounded-md bg-navy-100/60 px-2 py-1 font-mono text-xs text-navy-700">
                        {enq.referenceCode}
                      </span>
                      <span className="shrink-0 text-xs text-navy-400">
                        {formatDate(enq.createdAt)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Avatar name={enq.fullName} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-navy-900">
                          {enq.fullName}
                        </p>
                        {enq.company && (
                          <p className="truncate text-xs text-navy-400">
                            {enq.company}
                          </p>
                        )}
                      </div>
                      <TypeBadge type={enq.type} />
                    </div>

                    {enq.subject && (
                      <p className="mt-3 line-clamp-2 break-words text-sm text-navy-700">
                        {enq.subject}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-navy-100 pt-4">
                      <StatusSelect
                        label={`Status for ${enq.referenceCode}`}
                        value={enq.status}
                        options={STATUSES}
                        onChange={(s) => handleStatusChange(enq._id, s)}
                      />
                      <ExpandButton
                        open={open}
                        onClick={() => setExpandedId(open ? null : enq._id)}
                      />
                    </div>

                    {open && (
                      <div className="mt-4 rounded-xl bg-navy-100/30 p-3 sm:p-4">
                        <EnquiryDetails
                          enq={enq}
                          stacked
                          onReplied={handleReplied}
                        />
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
                    <th className="px-5 py-3.5 font-semibold">Type</th>
                    <th className="px-5 py-3.5 font-semibold">
                      Name / Company
                    </th>
                    <th className="px-5 py-3.5 font-semibold">Received</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <SkeletonRows cols={COLS} />
                  ) : (
                    visible.map((enq) => {
                      const open = expandedId === enq._id;
                      return (
                        <Fragment key={enq._id}>
                          <tr
                            className={`border-b border-navy-100 transition-colors last:border-0 ${
                              open ? "bg-navy-100/30" : "hover:bg-navy-100/20"
                            }`}
                          >
                            <td className="px-5 py-4">
                              <span className="rounded-md bg-navy-100/60 px-2 py-1 font-mono text-xs text-navy-700">
                                {enq.referenceCode}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <TypeBadge type={enq.type} />
                            </td>
                            <td className="max-w-[18rem] px-5 py-4">
                              <div className="flex items-center gap-3">
                                <Avatar name={enq.fullName} />
                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-navy-900">
                                    {enq.fullName}
                                  </p>
                                  {enq.company && (
                                    <p className="truncate text-xs text-navy-400">
                                      {enq.company}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 text-navy-500">
                              {formatDate(enq.createdAt)}
                            </td>
                            <td className="px-5 py-4">
                              <StatusSelect
                                label={`Status for ${enq.referenceCode}`}
                                value={enq.status}
                                options={STATUSES}
                                onChange={(s) => handleStatusChange(enq._id, s)}
                              />
                            </td>
                            <td className="px-5 py-4 text-right">
                              <ExpandButton
                                open={open}
                                onClick={() =>
                                  setExpandedId(open ? null : enq._id)
                                }
                              />
                            </td>
                          </tr>

                          {open && (
                            <tr className="border-b border-navy-100 bg-navy-100/30 last:border-0">
                              <td colSpan={COLS} className="px-5 pb-6 pt-2">
                                <EnquiryDetails
                                  enq={enq}
                                  onReplied={handleReplied}
                                />
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
