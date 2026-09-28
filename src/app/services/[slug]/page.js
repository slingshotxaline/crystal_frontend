import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { getServiceBySlug } from "@/lib/content";
import ServiceTemplate from "@/components/ServiceTemplate";

// Supported hero image formats, tried in this order.
const EXTS = ["jpg", "jpeg", "png", "webp", "avif"];
const DEFAULT_BASE = "/images/services/default-hero";

function fileExists(src) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/**
 * Builds the list of image URLs to try for a service's hero.
 * The extension is ignored: "/assets/Services/air-cargo.jpg" and
 * "air-cargo.webp" both work. Order:
 *   1. service image in any supported format
 *   2. default-hero in any supported format
 * If the server can see the public folder, only files that really
 * exist are returned. Otherwise every candidate is returned and the
 * browser tries them one by one.
 */
function getHeroSources(slug) {
  const staticService = services.find((s) => s.slug === slug);
  const base = staticService?.heroImage
    ? staticService.heroImage.replace(/\.[a-z0-9]+$/i, "")
    : `/images/services/${slug}-hero`;

  const all = [
    ...EXTS.map((e) => `${base}.${e}`),
    ...EXTS.map((e) => `${DEFAULT_BASE}.${e}`),
  ];
  const found = all.filter(fileExists);
  return found.length ? found : all;
}

// Pre-render every service page at build time (static generation),
// per the brief's rendering rule for public service pages. Uses the
// static file (not the API) so the build doesn't depend on the
// backend being reachable; the actual content per page still comes
// from the CMS when available (see lib/content.js).
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.subhead,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return notFound();
  return (
    <ServiceTemplate service={service} heroSources={getHeroSources(slug)} />
  );
}
