import { services } from '@/data/services';
import { industries } from '@/data/industries';

const BASE_URL = 'https://www.crystalexpress.example';

export default function sitemap() {
  const staticRoutes = [
    '', 'about', 'services', 'industries', 'network', 'digital',
    'insights', 'case-studies', 'contact', 'quote', 'partnership', 'careers', 'tracking',
  ].map((path) => ({
    url: `${BASE_URL}/${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const industryRoutes = industries.map((i) => ({
    url: `${BASE_URL}/industries/${i.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes];
}
