import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import { getIndustryBySlug } from "@/lib/content";
import IndustryTemplate from "@/components/IndustryTemplate";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.summary,
  };
}

export default async function IndustryDetailPage({ params }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return notFound();
  return <IndustryTemplate industry={industry} />;
}
