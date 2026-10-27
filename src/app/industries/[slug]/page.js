import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import { getIndustryBySlug } from "@/lib/content";
import IndustryTemplate from "@/components/IndustryTemplate";

// Re-generate the static page at most once a minute, so content and
// images changed in the dashboard show up without a new build.
export const revalidate = 60;

// Industries created later in the dashboard aren't in this list; they
// are rendered on first visit and then cached.
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
