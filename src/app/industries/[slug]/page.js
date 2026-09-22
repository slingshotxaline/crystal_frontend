import { notFound } from 'next/navigation';
import { industries, getIndustryBySlug } from '@/data/industries';
import IndustryTemplate from '@/components/IndustryTemplate';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.summary,
  };
}

export default function IndustryDetailPage({ params }) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return notFound();
  return <IndustryTemplate industry={industry} />;
}
