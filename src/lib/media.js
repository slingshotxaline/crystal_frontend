// Cloudinary images come back as full https URLs and pass through as they are.
// Static files ("/assets/...") are left untouched too.
// If you ever store relative "/uploads/..." paths again, set
// NEXT_PUBLIC_MEDIA_URL to the backend origin.
const BASE = (process.env.NEXT_PUBLIC_MEDIA_URL || "").replace(/\/$/, "");

export function mediaUrl(src) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/uploads/")) return `${BASE}${src}`;
  return src;
}

// True for CMS-uploaded files (exact URL, don't guess other extensions)
export function isUploaded(src) {
  return !!src && (src.startsWith("/uploads/") || /^https?:\/\//i.test(src));
}