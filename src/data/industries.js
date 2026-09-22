export const industries = [
  {
    slug: 'fashion-retail',
    title: 'Fashion & Retail',
    summary: 'Supplier readiness, GOH, consolidation, presentation and seasonal deadlines',
    heroHeadline: 'Seasonal deadlines, protected from factory to store.',
    considerations: [
      'Multi-factory supplier readiness and handover timing',
      'Garments on Hanger presentation requirements',
      'Buyer consolidation across multiple purchase orders',
      'Fixed seasonal delivery windows',
    ],
    relatedServices: ['fashion-goh', 'ocean-freight', 'warehousing'],
  },
  {
    slug: 'fmcg',
    title: 'FMCG',
    summary: 'Replenishment timing, product condition, lot/date controls and distribution',
    heroHeadline: 'Replenishment that keeps pace with the shelf.',
    considerations: [
      'Frequent, time-sensitive replenishment cycles',
      'Lot and date control through the supply chain',
      'Product condition monitoring in transit',
      'Distribution coordination to multiple destinations',
    ],
    relatedServices: ['ocean-freight', 'inland-customs', 'container-freight-station'],
  },
  {
    slug: 'industrial',
    title: 'Industrial & Manufacturing',
    summary: 'Production continuity, non-standard cargo and site coordination',
    heroHeadline: 'Production continuity, protected on the move.',
    considerations: [
      'Non-standard and oversized cargo handling',
      'Production-line dependency on on-time delivery',
      'Site access and delivery coordination',
      'Route and permit planning for heavy cargo',
    ],
    relatedServices: ['project-logistics', 'inland-customs', 'ocean-freight'],
  },
  {
    slug: 'automotive',
    title: 'Automotive',
    summary: 'Part identification, schedule discipline and line-stoppage risk',
    heroHeadline: 'Parts that arrive exactly when the line needs them.',
    considerations: [
      'Precise part identification and traceability',
      'Zero tolerance for schedule slippage',
      'Line-stoppage risk management',
      'Coordinated inland delivery to plant',
    ],
    relatedServices: ['inland-customs', 'air-freight', 'multimodal-logistics'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    summary: 'Documented handling, regulatory requirements and temperature conditions',
    heroHeadline: 'Documented handling for sensitive cargo.',
    considerations: [
      'Regulatory documentation and compliance',
      'Temperature-condition awareness in transit',
      'Chain-of-custody documentation',
      'Time-critical movement options',
    ],
    relatedServices: ['air-freight', 'value-added-services'],
  },
  {
    slug: 'high-tech',
    title: 'High Tech',
    summary: 'Security sensitivity, serial control and time-critical movement',
    heroHeadline: 'Security and speed for high-value technology cargo.',
    considerations: [
      'Serial number control and chain of custody',
      'Security-sensitive handling and storage',
      'Time-critical movement options',
      'Insurance and value-declaration coordination',
    ],
    relatedServices: ['air-freight', 'value-added-services', 'warehousing'],
  },
];

export function getIndustryBySlug(slug) {
  return industries.find((i) => i.slug === slug) || null;
}
