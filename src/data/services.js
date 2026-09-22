/**
 * Static service content used to render /services and /services/[slug]
 * while the CMS/backend integration is being wired up. Shape mirrors
 * the backend Service model so this file can be swapped for a fetch()
 * to /api/cms/services/public without changing the page components.
 */
export const services = [
  {
    slug: 'air-freight',
    title: 'Air Freight',
    icon: 'plane',
    heroTagline: 'Move urgent or high-value cargo by air',
    heroHeadline: 'Urgency, handled with a clear plan.',
    problemStatement:
      'Some cargo cannot wait for ocean transit, or needs handling ocean freight cannot provide.',
    solutionSummary:
      'Crystal assesses consolidation, direct uplift and special-handling options against your schedule and coordinates the agreed plan from Bangladesh origin.',
    whenToUse:
      'Choose air freight when delivery timing is fixed, cargo value is high, or the shipment needs special handling that ocean transit cannot support.',
    requiredShipmentInfo: ['Ready date', 'Weight and dimensions', 'Commodity and HS details', 'Destination airport or door address'],
    operatingSequence: [
      { title: 'Booking & Documentation', description: 'Confirm cargo readiness, documentation and the agreed gateway.' },
      { title: 'Airport Coordination', description: 'Cargo delivered to the airport warehouse ahead of the confirmed cut-off.' },
      { title: 'Uplift', description: 'Direct or consolidated uplift, aligned to schedule and capacity.' },
      { title: 'Destination Handover', description: 'Coordination with the destination partner through to final delivery.' },
    ],
    capabilities: ['Consolidation', 'Direct uplift', 'Special handling (valuable, perishable, DG-compliant cargo)'],
    benefits: ['Faster transit for time-critical cargo', 'Options matched to urgency and budget', 'Coordinated door or airport-to-airport handover'],
    evidence: ['Dedicated Dhaka air-freight warehouse', 'Less than 1 km from Airport Cargo Village'],
    relatedIndustries: ['fashion-retail', 'high-tech', 'healthcare'],
    relatedServices: ['multimodal-logistics', 'value-added-services'],
    faqs: [
      { question: 'Can Crystal guarantee a transit time?', answer: 'Transit times depend on schedule, capacity and operational conditions, so indicative times are confirmed per shipment once Operations reviews the booking.' },
      { question: 'What information do you need to quote?', answer: 'Ready date, weight and dimensions, commodity, and the destination address or airport.' },
    ],
  },
  {
    slug: 'ocean-freight',
    title: 'Ocean Freight',
    icon: 'ship',
    heroTagline: 'Plan FCL, LCL or buyer consolidation by ocean',
    heroHeadline: 'Container options matched to your shipment.',
    problemStatement:
      'Ocean shipments involve container decisions, multiple suppliers, and schedules that need to align with delivery windows.',
    solutionSummary:
      'Crystal matches container type and routing to shipment volume, timing and schedule, and coordinates the plan from origin to port-to-door delivery.',
    whenToUse:
      'Choose ocean freight for planned shipments where cost efficiency matters more than speed, including full-container and consolidated loads.',
    requiredShipmentInfo: ['Cargo volume and weight', 'FCL or LCL requirement', 'Origin factory or supplier locations', 'Ready date and delivery window'],
    operatingSequence: [
      { title: 'Booking & Space Allocation', description: 'Container type and sailing confirmed against the ready date.' },
      { title: 'Origin Consolidation', description: 'Cargo received, checked and built into the container at CFS.' },
      { title: 'Port Movement', description: 'Export customs clearance and vessel loading.' },
      { title: 'Destination Coordination', description: 'Discharge, inland movement and delivery coordination at destination.' },
    ],
    capabilities: ['FCL', 'LCL', 'Buyer consolidation', 'Port-to-door coordination'],
    benefits: ['Cost-efficient for planned volume', 'Consolidation options for multi-supplier orders', 'Full origin-to-destination documentation'],
    evidence: ['120,000 sq ft Chattogram CFS capability', '10 minutes driving distance to terminal', '24/7 operations and cargo support'],
    relatedIndustries: ['fashion-retail', 'fmcg', 'industrial'],
    relatedServices: ['container-freight-station', 'multimodal-logistics'],
    faqs: [
      { question: 'What is buyer consolidation?', answer: 'Cargo from multiple suppliers for one buyer is combined at origin into a single, efficient shipment.' },
      { question: 'Do you handle both FCL and LCL?', answer: 'Yes. The right option depends on your cargo volume, cost priorities and delivery schedule.' },
    ],
  },
  {
    slug: 'multimodal-logistics',
    title: 'Multimodal Logistics',
    icon: 'route',
    heroTagline: 'Combine modes when cost, time or capacity require another route',
    heroHeadline: 'One shipment can have more than one workable path.',
    problemStatement:
      'A single mode does not always fit every requirement — schedule, cost and capacity sometimes call for a combined route.',
    solutionSummary:
      'Crystal compares agreed priorities, confirms operational conditions, and coordinates the selected route across origin, transfer and destination partners.',
    whenToUse:
      'Choose multimodal routing when a single mode cannot meet the schedule, budget or capacity you need — for example sea-air for a cost-efficient faster option.',
    requiredShipmentInfo: ['Priority (cost, time or capacity)', 'Cargo details', 'Preferred gateways if known', 'Delivery deadline'],
    operatingSequence: [
      { title: 'Requirement Review', description: 'Priorities compared against operational conditions for each leg.' },
      { title: 'Route Confirmation', description: 'Gateway, transfer point and mode combination confirmed.' },
      { title: 'Coordinated Movement', description: 'Each leg tracked and handed over between partners.' },
      { title: 'Destination Delivery', description: 'Final leg coordination through to delivery.' },
    ],
    capabilities: ['Sea → Air', 'Air → Air', 'Land → Air', 'Sea → Sea', 'Sea → Land'],
    benefits: ['Flexible response to schedule or capacity constraints', 'Cost-efficient alternative to direct air freight', 'One coordinated plan across every leg'],
    evidence: ['Routing via regional air hubs, aligned to schedule, capacity and destination requirements'],
    relatedIndustries: ['fashion-retail', 'industrial', 'high-tech'],
    relatedServices: ['air-freight', 'ocean-freight'],
    faqs: [
      { question: 'Is a multimodal route always faster?', answer: 'Not always — the value depends on the combination. Sea-air, for example, is typically faster than ocean and more cost-efficient than direct air freight.' },
      { question: 'Do you publish fixed transit times for multimodal routes?', answer: 'No. Routing and transit times are shipment-specific and confirmed once Operations reviews the requirement.' },
    ],
  },
  {
    slug: 'inland-customs',
    title: 'Inland Transport & Customs',
    icon: 'truck',
    heroTagline: 'Coordinate factory pickup, customs and inland delivery',
    heroHeadline: 'First-mile to final-mile, kept aligned with the schedule.',
    problemStatement:
      'Cargo has to move reliably between factory, port or airport, and final destination — with customs clearance handled correctly at every step.',
    solutionSummary:
      'Crystal coordinates first-mile pickup, gateway handover and final-mile delivery, aligned with the agreed schedule and customs requirements.',
    whenToUse: 'Needed on every shipment that requires factory pickup, customs clearance, or inland delivery beyond the port or airport.',
    requiredShipmentInfo: ['Pickup and delivery addresses', 'Cargo type and packaging', 'Required delivery window', 'Customs documentation status'],
    operatingSequence: [
      { title: 'Pickup Scheduling', description: 'Factory or warehouse pickup arranged against the export plan.' },
      { title: 'Customs Documentation', description: 'Export or import declarations prepared and filed.' },
      { title: 'Gateway Handover', description: 'Cargo moved to or from the port, airport or CFS.' },
      { title: 'Final-Mile Delivery', description: 'Delivery to the agreed destination address.' },
    ],
    capabilities: ['Factory and warehouse pickup', 'Customs documentation and clearance', 'Port and airport gateway coordination'],
    benefits: ['Reduced handover risk between legs', 'Single point of coordination for customs and transport', 'Predictable first- and final-mile scheduling'],
    evidence: ['Dhaka and Chattogram operating teams'],
    relatedIndustries: ['fmcg', 'automotive', 'industrial'],
    relatedServices: ['ocean-freight', 'air-freight'],
    faqs: [
      { question: 'Can you handle customs clearance on both ends?', answer: 'Crystal manages Bangladesh-origin customs directly and coordinates destination clearance with the responsible partner.' },
    ],
  },
  {
    slug: 'project-logistics',
    title: 'Project Logistics',
    icon: 'crane',
    heroTagline: 'Plan oversized or complex cargo',
    heroHeadline: 'Non-standard cargo, planned end to end.',
    problemStatement:
      'Oversized, heavy-lift or non-standard cargo needs route surveys, equipment planning and permits before it can move safely.',
    solutionSummary:
      'Crystal captures the requirement, surveys the route, plans equipment and permits, and controls lift and transfer through to final delivery.',
    whenToUse: 'Use project logistics for cargo that does not fit standard container or air-freight handling — oversized, heavy, or requiring special equipment.',
    requiredShipmentInfo: ['Cargo dimensions and weight', 'Route constraints (bridges, roads, clearances)', 'Required permits', 'Delivery site conditions'],
    operatingSequence: [
      { title: 'Requirement Capture', description: 'Full cargo specification and delivery conditions gathered.' },
      { title: 'Route Survey', description: 'Physical route assessed for clearance and access constraints.' },
      { title: 'Equipment Planning', description: 'Lifting and transport equipment matched to the cargo.' },
      { title: 'Permits', description: 'Required permits secured for road, port or site access.' },
      { title: 'Lift & Transfer Control', description: 'Controlled lift and transfer operations at each handover.' },
      { title: 'Final Delivery', description: 'Cargo delivered and positioned at the agreed site.' },
    ],
    capabilities: ['Route survey', 'Equipment planning', 'Permit coordination', 'Lift and transfer control'],
    benefits: ['Reduced risk on non-standard moves', 'Coordinated permits and site access', 'A single accountable plan across every stage'],
    evidence: [],
    relatedIndustries: ['industrial', 'automotive'],
    relatedServices: ['inland-customs', 'ocean-freight'],
    faqs: [
      { question: 'Can you share a completed project example?', answer: 'Approved project case studies are published once scope accuracy and customer permission are confirmed.' },
    ],
  },
  {
    slug: 'fashion-goh',
    title: 'Fashion Logistics & GOH',
    icon: 'hanger',
    heroTagline: 'Manage fashion cargo / GOH',
    heroHeadline: 'A coordinated apparel journey from factory readiness to international delivery.',
    problemStatement:
      'Fashion cargo has seasonal deadlines, hanging-garment handling needs, and multi-factory consolidation requirements that standard freight processes do not cover.',
    solutionSummary:
      'Crystal connects supplier readiness, cargo preparation, hanging-garment handling, consolidation and export movement through one origin plan.',
    whenToUse: 'Use this service for apparel shipments involving GOH, buyer consolidation, or coordinated multi-factory readiness.',
    requiredShipmentInfo: ['Factory readiness dates', 'GOH or flat-pack requirement', 'Consolidation instructions', 'Seasonal delivery deadline'],
    operatingSequence: [
      { title: 'Raw Materials', description: 'Inbound materials and components tracked to production.' },
      { title: 'Factory Coordination', description: 'Production-ready handovers scheduled with each supplier.' },
      { title: 'Origin Consolidation', description: 'Cargo build and compliance checks at the consolidation point.' },
      { title: 'Export Movement', description: 'Air, ocean or multimodal movement to destination.' },
      { title: 'Destination Services', description: 'Discharge, inland movement and DC coordination.' },
      { title: 'Store Delivery', description: 'Final point-of-sale placement.' },
    ],
    capabilities: ['Garments on Hanger (GOH) handling', 'Buyer consolidation', 'Cargo preparation and compliance checks'],
    benefits: ['Seasonal deadlines protected end-to-end', 'Presentation-ready handling for hanging garments', 'One origin plan across multiple factories'],
    evidence: ['Dedicated Dhaka air-freight warehouse', 'Chattogram CFS for ocean consolidation'],
    relatedIndustries: ['fashion-retail'],
    relatedServices: ['warehousing', 'container-freight-station'],
    faqs: [
      { question: 'What is GOH?', answer: 'Garments on Hanger — apparel transported hanging rather than folded, to protect presentation quality for retail.' },
    ],
  },
  {
    slug: 'warehousing',
    title: 'Warehousing',
    icon: 'warehouse',
    heroTagline: 'Stage, consolidate or prepare cargo before movement',
    heroHeadline: 'Storage and handling built around the export decision.',
    problemStatement: 'Cargo often needs staging, consolidation or preparation before the next movement decision is made.',
    solutionSummary: 'Crystal provides storage and handling that supports a defined export or delivery decision, at facilities verified for location, space and security.',
    whenToUse: 'Use warehousing when cargo needs to be staged, consolidated or prepared ahead of export or delivery.',
    requiredShipmentInfo: ['Storage duration', 'Cargo type and handling needs', 'Expected next movement'],
    operatingSequence: [
      { title: 'Receiving', description: 'Cargo received, checked and logged.' },
      { title: 'Storage & Handling', description: 'Staged under agreed conditions.' },
      { title: 'Release', description: 'Released against the confirmed movement plan.' },
    ],
    capabilities: ['Staging', 'Consolidation support', 'Cargo preparation'],
    benefits: ['Flexibility ahead of the movement decision', 'Verified facility conditions', 'Coordinated release into the next leg'],
    evidence: ['25,000 sq ft dedicated Dhaka warehouse space'],
    relatedIndustries: ['fmcg', 'fashion-retail'],
    relatedServices: ['container-freight-station', 'fashion-goh'],
    faqs: [],
  },
  {
    slug: 'container-freight-station',
    title: 'Container Freight Station',
    icon: 'container',
    heroTagline: 'Build and consolidate export cargo at origin',
    heroHeadline: 'Chattogram receiving, segregation and container-build control.',
    problemStatement: 'Consolidated ocean shipments need controlled receiving, segregation and container-build before export.',
    solutionSummary: 'Crystal manages CFS receiving, segregation and container-build control at the Chattogram facility.',
    whenToUse: 'Used for LCL and buyer-consolidation ocean shipments requiring container build at origin.',
    requiredShipmentInfo: ['Supplier cargo readiness', 'Container build instructions', 'Ready date'],
    operatingSequence: [
      { title: 'Receiving', description: 'Cargo received and checked against documentation.' },
      { title: 'Segregation', description: 'Cargo segregated by shipment, buyer or destination.' },
      { title: 'Container Build', description: 'Loaded and secured under controlled conditions.' },
    ],
    capabilities: ['Cargo receiving', 'Segregation', 'Container-build control'],
    benefits: ['Controlled consolidation process', 'Reduced risk of mis-loading', 'Verified facility capability'],
    evidence: ['120,000 sq ft dedicated operational space', '24/7 operations and cargo support'],
    relatedIndustries: ['fashion-retail', 'fmcg'],
    relatedServices: ['ocean-freight', 'warehousing'],
    faqs: [],
  },
  {
    slug: 'value-added-services',
    title: 'Value Added Services',
    icon: 'tag',
    heroTagline: 'Prepare, inspect or label cargo before dispatch',
    heroHeadline: 'Modular tasks that prepare, protect and control cargo.',
    problemStatement: 'Some cargo needs extra preparation — inspection, labelling or repacking — before it is ready to move.',
    solutionSummary: 'Crystal offers modular value-added tasks that prepare, protect and control cargo ahead of dispatch.',
    whenToUse: 'Add value-added services when cargo needs inspection, labelling, or repacking before export.',
    requiredShipmentInfo: ['Task required (inspection, labelling, repacking)', 'Cargo condition', 'Deadline'],
    operatingSequence: [
      { title: 'Task Confirmation', description: 'Scope of the required task confirmed with the customer.' },
      { title: 'Execution', description: 'Task carried out under controlled facility conditions.' },
      { title: 'Handover', description: 'Cargo released back into the agreed movement plan.' },
    ],
    capabilities: ['Inspection', 'Labelling', 'Repacking'],
    benefits: ['Cargo dispatch-ready on schedule', 'Reduced risk of compliance issues at destination', 'Modular — add only what the shipment needs'],
    evidence: [],
    relatedIndustries: ['fmcg', 'fashion-retail', 'high-tech'],
    relatedServices: ['warehousing', 'fashion-goh'],
    faqs: [],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
