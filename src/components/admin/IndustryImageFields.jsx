"use client";

import { useEffect, useState } from "react";
import { mediaUrl } from "@/lib/media";

const SLOTS = [
  {
    key: "listImage",
    label: "List image",
    hint: "Row thumbnail on /industries and the home list (landscape, ~800×450)",
  },
  {
    key: "heroImage",
    label: "Hero image",
    hint: "Banner at the top of the industry page (wide, ~1600×900)",
  },
  {
    key: "sectionImage1",
    label: "Section photo 1",
    hint: "“What Shapes the Route”, first photo",
    caption: 0,
  },
  {
    key: "sectionImage2",
    label: "Section photo 2",
    hint: "“What Shapes the Route”, second photo",
    caption: 1,
  },
];

// Current saved URL for a slot, from the industry document
function savedUrl(industry, key) {
  if (!industry) return "";
  if (key === "listImage") return industry.listImage;
  if (key === "heroImage") return industry.heroImage;
  const idx = key === "sectionImage1" ? 0 : 1;
  return industry.sectionImages?.[idx]?.src || "";
}

/**
 * Props:
 *  - service: not used here; the prop is called `industry`
 *  - industry: existing industry doc (omit when creating a new one)
 *  - onChange({ files, removeImages, sectionCaptions })
 * Build the request with buildIndustryFormData() below.
 */
export default function IndustryImageFields({ industry, onChange }) {
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [removed, setRemoved] = useState([]);
  const [captions, setCaptions] = useState([
    industry?.sectionImages?.[0]?.caption || "",
    industry?.sectionImages?.[1]?.caption || "",
  ]);

  useEffect(() => {
    onChange?.({ files, removeImages: removed, sectionCaptions: captions });
  }, [files, removed, captions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => Object.values(previews).forEach((u) => URL.revokeObjectURL(u)),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  function pick(key, file) {
    if (!file) return;
    if (previews[key]) URL.revokeObjectURL(previews[key]);
    setFiles((f) => ({ ...f, [key]: file }));
    setPreviews((p) => ({ ...p, [key]: URL.createObjectURL(file) }));
    setRemoved((r) => r.filter((k) => k !== key));
  }

  function clearPick(key) {
    if (previews[key]) URL.revokeObjectURL(previews[key]);
    setFiles(({ [key]: _, ...rest }) => rest);
    setPreviews(({ [key]: _, ...rest }) => rest);
  }

  function revert(key) {
    clearPick(key);
    setRemoved((r) => (r.includes(key) ? r : [...r, key]));
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-navy-900">Images</h3>
        <p className="mt-1 text-xs text-navy-400">
          Leave a slot empty to keep the default image from the site. Upload to
          replace it; “Use default” removes your upload.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SLOTS.map((slot) => {
          const saved = savedUrl(industry, slot.key);
          const isRemoved = removed.includes(slot.key);
          const shown =
            previews[slot.key] || (!isRemoved && saved ? mediaUrl(saved) : "");

          return (
            <div
              key={slot.key}
              className="rounded-lg border border-navy-100 bg-white p-4"
            >
              <p className="text-sm font-semibold text-navy-900">{slot.label}</p>
              <p className="text-xs text-navy-400">{slot.hint}</p>

              <div className="mt-3 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md bg-navy-100">
                {shown ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shown} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="px-3 text-center text-xs text-navy-400">
                    Using default image
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-md bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800">
                  {shown ? "Replace" : "Upload"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    onChange={(e) => pick(slot.key, e.target.files?.[0])}
                  />
                </label>

                {previews[slot.key] && (
                  <button
                    type="button"
                    onClick={() => clearPick(slot.key)}
                    className="rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-800 hover:border-navy-400"
                  >
                    Cancel
                  </button>
                )}

                {saved && !isRemoved && !previews[slot.key] && (
                  <button
                    type="button"
                    onClick={() => revert(slot.key)}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:border-red-400"
                  >
                    Use default
                  </button>
                )}
              </div>

              {slot.caption !== undefined && (
                <input
                  type="text"
                  value={captions[slot.caption]}
                  onChange={(e) =>
                    setCaptions((c) =>
                      c.map((v, i) => (i === slot.caption ? e.target.value : v)),
                    )
                  }
                  placeholder="Caption (optional)"
                  className="mt-3 w-full rounded-md border border-navy-200 px-3 py-1.5 text-sm"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Builds the multipart body the backend expects.
 * `fields` = your normal industry form values (title, slug, ...).
 * `images` = the object emitted by IndustryImageFields' onChange.
 * Don't set a Content-Type header; adminApi.js handles that for FormData.
 */
export function buildIndustryFormData(fields, images = {}) {
  const fd = new FormData();
  fd.append(
    "data",
    JSON.stringify({
      ...fields,
      removeImages: images.removeImages || [],
      sectionCaptions: images.sectionCaptions || [],
    }),
  );
  Object.entries(images.files || {}).forEach(([key, file]) => fd.append(key, file));
  return fd;
}