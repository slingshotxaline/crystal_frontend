/**
 * Industry content for /industries and /industries/[slug]. Used by
 * IndustryTemplate together with the matching heroes in
 * INDUSTRY_HEROES (see components/IndustryTemplate.jsx).
 *
 * considerations: plain strings, or objects
 *   { title, description?, icon? }
 * shown as cards in the "What Shapes the Route" section.
 *
 * sectionImages (optional): two photos for that same section, as
 *   [{ src, caption }, { src, caption }]
 * The extension in src is ignored (webp/jpg/jpeg/png/avif all work).
 * Without this field, /assets/Industries/considerations/{slug}-1 and
 * -2 are used. If a photo is missing, the industry's hero image
 * (see INDUSTRY_HEROES in IndustryTemplate.jsx) is shown instead.
 */
export const industries = [
  {
    slug: "fashion-retail",
    title: "Fashion & Retail",
    summary:
      "Supplier readiness, GOH, consolidation, presentation and seasonal deadlines",
    heroHeadline: "Seasonal deadlines, protected from factory to store.",
    considerations: [
      "Multi-factory supplier readiness and handover timing",
      "Garments on Hanger presentation requirements",
      "Buyer consolidation across multiple purchase orders",
      "Fixed seasonal delivery windows",
    ],
    sectionImages: [
      {
        src: "/assets/Industries/capabilities/fashion-retail-1.webp",
        caption: "Factory readiness",
      },
      {
        src: "/assets/Industries/capabilities/fashion-retail-2.jpg",
        caption: "Buyer consolidation",
      },
    ],
    relatedServices: ["fashion-goh", "ocean-freight", "warehousing"],
  },
  {
    slug: "fmcg",
    title: "FMCG",
    summary:
      "Replenishment timing, product condition, lot/date controls and distribution",
    heroHeadline: "Replenishment that keeps pace with the shelf.",
    considerations: [
      "Frequent, time-sensitive replenishment cycles",
      "Lot and date control through the supply chain",
      "Product condition monitoring in transit",
      "Distribution coordination to multiple destinations",
    ],
    sectionImages: [
      {
        src: "/assets/Industries/capabilities/fmcg1.jpg",
        caption: "Factory readiness",
      },
      {
        src: "/assets/Industries/capabilities/fmcg2.webp",
        caption: "Buyer consolidation",
      },
    ],
    relatedServices: ["ocean-freight", "inland-customs", "warehousing"],
  },
  {
    slug: "industrial",
    title: "Industrial & Manufacturing",
    summary: "Production continuity, non-standard cargo and site coordination",
    heroHeadline: "Production continuity, protected on the move.",
    considerations: [
      "Non-standard and oversized cargo handling",
      "Production-line dependency on on-time delivery",
      "Site access and delivery coordination",
      "Route and permit planning for heavy cargo",
    ],
    sectionImages: [
      {
        src: "/assets/Industries/capabilities/industrial1.jpg",
        caption: "Factory readiness",
      },
      {
        src: "/assets/Industries/capabilities/industrial2.jpg",
        caption: "Buyer consolidation",
      },
    ],
    relatedServices: ["project-logistics", "inland-customs", "ocean-freight"],
  },
  {
    slug: "automotive",
    title: "Automotive",
    summary: "Part identification, schedule discipline and line-stoppage risk",
    heroHeadline: "Parts that arrive exactly when the line needs them.",
    considerations: [
      "Precise part identification and traceability",
      "Zero tolerance for schedule slippage",
      "Line-stoppage risk management",
      "Coordinated inland delivery to plant",
    ],
    sectionImages: [
      {
        src: "/assets/Industries/capabilities/automotive11.jpeg",
        caption: "Factory readiness",
      },
      {
        src: "/assets/Industries/capabilities/automotive21.jpg",
        caption: "Buyer consolidation",
      },
    ],
    relatedServices: ["inland-customs", "air-freight", "multimodal-logistics"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary:
      "Documented handling, regulatory requirements and temperature conditions",
    heroHeadline: "Documented handling for sensitive cargo.",
    considerations: [
      "Regulatory documentation and compliance",
      "Temperature-condition awareness in transit",
      "Chain-of-custody documentation",
      "Time-critical movement options",
    ],
    sectionImages: [
      {
        src: "/assets/Industries/capabilities/healthcare111.jpg",
        caption: "Factory readiness",
      },
      {
        src: "/assets/Industries/capabilities/caphealthcare2.jpg",
        caption: "Buyer consolidation",
      },
      
    ],
    relatedServices: ["air-freight", "value-added-services"],
  },
  {
    slug: "high-tech",
    title: "High Tech",
    summary: "Security sensitivity, serial control and time-critical movement",
    heroHeadline: "Security and speed for high-value technology cargo.",
    considerations: [
      "Serial number control and chain of custody",
      "Security-sensitive handling and storage",
      "Time-critical movement options",
      "Insurance and value-declaration coordination",
    ],
    sectionImages: [
      {
        src: "/assets/Industries/capabilities/hightech1.jpg",
        caption: "Factory readiness",
      },
      {
        src: "/assets/Industries/capabilities/hightech2webp.webp",
        caption: "Buyer consolidation",
      },
    ],
    relatedServices: ["air-freight", "value-added-services", "warehousing"],
  },
];

export function getIndustryBySlug(slug) {
  return industries.find((i) => i.slug === slug) || null;
}
