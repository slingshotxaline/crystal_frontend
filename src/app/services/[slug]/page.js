import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { getServiceBySlug } from '@/lib/content';
import ServiceTemplate from '@/components/ServiceTemplate';

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
  return <ServiceTemplate service={service} />;
}