import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import ServiceTemplate from "@/components/ServiceTemplate";

// Pre-render every service page at build time (static generation),
// per the brief's rendering rule for public service pages.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.subhead,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();
  return <ServiceTemplate service={service} />;
}
