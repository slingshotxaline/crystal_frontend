import {
  services as staticServices,
  getServiceBySlug as getStaticServiceBySlug,
} from "@/data/services";
import {
  industries as staticIndustries,
  getIndustryBySlug as getStaticIndustryBySlug,
} from "@/data/industries";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const REVALIDATE_SECONDS = 3600; // ISR: re-check the CMS at most once an hour

/**
 * Server-only fetch helpers for public content. Cached with Next's
 * `next.revalidate` (rather than `no-store`) so these pages remain
 * statically generated / incrementally regenerated, not forced fully
 * dynamic, per the brief's rendering rule for public pages. Any
 * failure (backend down, Mongo empty, network error) resolves to
 * `null` rather than throwing, so callers can fall back to the static
 * data files and the site keeps working without the backend running.
 */
async function fetchPublicList(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.items) && data.items.length > 0
      ? data.items
      : null;
  } catch {
    return null;
  }
}

async function fetchPublicItem(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.item || null;
  } catch {
    return null;
  }
}

export async function getServices() {
  return (await fetchPublicList("/cms/services/public")) || staticServices;
}

export async function getServiceBySlug(slug) {
  return (
    (await fetchPublicItem(`/cms/services/public/${slug}`)) ||
    getStaticServiceBySlug(slug)
  );
}

export async function getIndustries() {
  return (await fetchPublicList("/cms/industries/public")) || staticIndustries;
}

export async function getIndustryBySlug(slug) {
  return (
    (await fetchPublicItem(`/cms/industries/public/${slug}`)) ||
    getStaticIndustryBySlug(slug)
  );
}
