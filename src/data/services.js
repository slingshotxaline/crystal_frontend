/**
 * Service content for /services and /services/[slug]. Shape mirrors
 * the backend Service model (see backend/src/models/Service.js) plus
 * the fields the new detail-page template needs: controls (the "what
 * this helps you control" tags), capabilities, supportSteps (the
 * 5-step "how we support the shipment" list), proofNote, faqs, and
 * related services/industries as {label, slug} pairs.
 *
 * Renames per latest content review:
 * - "Fashion Logistics & GOH" -> "Contract Logistics" (slug kept as
 *   'fashion-goh' so existing nav/links don't break)
 * - "Value Added Services" -> "Value Added Service & GOH" (slug kept
 *   as 'value-added-services')
 * - "Warehousing" + "Container Freight Station" merged into one page,
 *   "Warehousing & Container" (slug kept as 'warehousing'; the old
 *   'container-freight-station' slug is retired)
 */
export const services = [
  {
    slug: "air-freight",
    icon: "plane",
    title: "Air Freight",
    category: "AIR FREIGHT",
    tagline: "Move urgent or high-value cargo by air",
    cardDescription:
      "Consolidation, direct uplift and special-handling options matched to urgency.",
    headline: "When time matters, keep the options open.",
    subhead:
      "We coordinate direct and consolidation options around cargo readiness, uplift availability and the required delivery window.",
    primaryCta: "Request an Air Freight Quote",
    secondaryCta: "Discuss Urgent Cargo",
    controls: [
      "Uplift choice",
      "Cut-off readiness",
      "Special handling",
      "Customs activity",
      "Handover timing",
    ],
    capabilities: [
      "Export and import air freight",
      "Consolidation and direct uplift",
      "Priority and urgent cargo coordination",
      "Airport-to-airport and door options",
      "Oversized, sensitive or controlled cargo, subject to acceptance",
      "Milestone and exception communication [VALIDATE system functions]",
    ],
    supportSteps: [
      "Confirm cargo details, dimensions, readiness and delivery requirement.",
      "Review route, uplift, handling and customs conditions.",
      "Agree the option, cut-offs, documentation and responsibilities.",
      "Coordinate origin handling, uplift and onward handover.",
      "Report milestones, exceptions and delivery status.",
    ],
    proofNote:
      "Approved airline relationships, volume evidence or a case example will be published only after validation.",
    faqs: [
      {
        question: "What information is needed for an air-freight quote?",
        answer:
          "Cargo dimensions and weight, readiness date, commodity, and the origin/destination airports or door addresses.",
      },
      {
        question: "Can Crystal arrange consolidation and direct uplift?",
        answer:
          "Yes — both options are assessed against your schedule, cost priorities and cargo characteristics before a route is confirmed.",
      },
      {
        question: "How are chargeable weight and dimensions used?",
        answer:
          "Airlines charge on whichever is greater of actual and volumetric weight; we confirm this calculation as part of every quote.",
      },
      {
        question: "Which cargo needs airline pre-approval?",
        answer:
          "Oversized, sensitive, high-value or otherwise controlled cargo typically requires airline acceptance before booking.",
      },
      {
        question: "Can Crystal coordinate pickup, customs and final delivery?",
        answer:
          "Yes — first-mile pickup, customs clearance and final-mile delivery can all be coordinated alongside the air-freight movement.",
      },
    ],
    relatedServices: [
      { label: "Multimodal Logistics", slug: "multimodal-logistics" },
      { label: "Inland Transport & Customs", slug: "inland-customs" },
    ],
    relatedIndustries: [
      { label: "High Tech", slug: "high-tech" },
      { label: "Healthcare", slug: "healthcare" },
    ],
  },

  {
    slug: "ocean-freight",
    icon: "ship",
    title: "Ocean Freight",
    category: "OCEAN FREIGHT",
    tagline: "Plan FCL, LCL or buyer consolidation by ocean",
    cardDescription:
      "Container options matched to shipment volume, timing and schedule.",
    headline: "Plan the container around the cargo, schedule and handovers.",
    subhead:
      "We coordinate FCL, LCL and consolidation options with origin activity, documentation and onward delivery requirements.",
    primaryCta: "Request an Ocean Quote",
    secondaryCta: "Discuss Buyer Consolidation",
    controls: [
      "Container choice",
      "Supplier readiness",
      "Cargo build",
      "Sailing options",
      "Documents",
      "Port or inland handovers",
    ],
    capabilities: [
      "FCL and LCL",
      "Export and import coordination",
      "Buyer and multi-supplier consolidation",
      "Carrier and routing options",
      "Port-to-port and door options",
      "Documentation and customs coordination",
      "Special equipment, subject to carrier acceptance",
    ],
    supportSteps: [
      "Collect purchase-order, supplier and cargo details.",
      "Plan consolidation, container or LCL movement.",
      "Confirm receiving cut-offs, booking, documentation and loading plan.",
      "Coordinate CFS, port, sailing and partner handovers.",
      "Communicate milestones, changes and arrival information.",
    ],
    proofNote:
      "Approved CFS facts, carrier connections and one consolidation case will be published where available.",
    faqs: [
      {
        question: "When should a shipper use FCL instead of LCL?",
        answer:
          "FCL suits volume that fills or nearly fills a container; LCL is more cost-efficient for smaller volumes moved alongside other shippers’ cargo.",
      },
      {
        question: "How does buyer consolidation work?",
        answer:
          "Cargo from multiple suppliers for one buyer is received, checked and built into a single shipment at origin.",
      },
      {
        question: "What documents are required before cargo receiving?",
        answer:
          "Commercial invoice, packing list and booking confirmation are typically required before cargo is accepted at the CFS.",
      },
      {
        question: "Can Crystal arrange special equipment?",
        answer:
          "Yes, subject to carrier acceptance — this is confirmed per shipment once the cargo specification is reviewed.",
      },
      {
        question: "How are sailing changes communicated?",
        answer:
          "Any change to the booked sailing is communicated as soon as it is confirmed, along with the revised schedule.",
      },
    ],
    relatedServices: [
      { label: "Multimodal Logistics", slug: "multimodal-logistics" },
      { label: "Warehousing & Container", slug: "warehousing" },
    ],
    relatedIndustries: [
      { label: "Fashion & Retail", slug: "fashion-retail" },
      { label: "FMCG", slug: "fmcg" },
    ],
  },

  {
    slug: "multimodal-logistics",
    icon: "route",
    title: "Multimodal Logistics",
    category: "MULTIMODAL LOGISTICS",
    tagline: "Combine modes when cost, time or capacity require another route",
    cardDescription:
      "Sea-air, air-sea and other combinations shaped around the shipment.",
    headline: "When the obvious route does not fit, redesign the journey.",
    subhead:
      "We assess transfer gateways and mode combinations against the shipment’s timing, cost, capacity and handling constraints.",
    primaryCta: "Compare Route Options",
    secondaryCta: "Send Shipment Details",
    controls: [
      "Speed vs cost trade-off",
      "Gateway feasibility",
      "Transfer risk",
      "Acceptance",
      "End-to-end responsibility",
    ],
    capabilities: [
      "Sea-air and air-sea",
      "Air-air and land-air alternatives",
      "Sea-sea and sea-land options",
      "Gateway and transfer coordination",
      "Through-document planning where available [VALIDATE]",
      "Exception and milestone management",
    ],
    supportSteps: [
      "Define the required arrival date and cost constraint.",
      "Review feasible modes, gateways, schedules and cargo acceptance.",
      "Compare the practical options and responsibilities.",
      "Confirm bookings, transfer controls and documents.",
      "Manage the route and communicate deviations.",
    ],
    proofNote:
      "Route diagrams and indicative transits are published only after operations validates the lane, conditions and wording.",
    faqs: [
      {
        question: "What is sea-air freight?",
        answer:
          "An ocean leg from origin to a regional hub, followed by an air leg onward — typically faster than ocean and more cost-efficient than direct air.",
      },
      {
        question: "When can multimodal reduce cost versus direct air?",
        answer:
          "When part of the journey can move by ocean or land without breaching the required delivery date, lowering the overall cost.",
      },
      {
        question: "Are transit times guaranteed?",
        answer:
          "No — transit times are shipment-specific and depend on schedule, capacity and operational conditions at the time of booking.",
      },
      {
        question: "Who manages the transfer between modes?",
        answer:
          "Crystal coordinates the gateway handover directly, keeping one point of accountability across both legs.",
      },
      {
        question: "Which cargo may not be suitable for a multimodal route?",
        answer:
          "Cargo with very narrow delivery windows or handling requirements that a transfer point cannot support may need a direct routing instead.",
      },
    ],
    relatedServices: [
      { label: "Air Freight", slug: "air-freight" },
      { label: "Ocean Freight", slug: "ocean-freight" },
    ],
    relatedIndustries: [
      { label: "Industrial & Manufacturing", slug: "industrial" },
      { label: "Automotive", slug: "automotive" },
    ],
  },

  {
    slug: "inland-customs",
    icon: "truck",
    title: "Inland Transport & Customs",
    category: "INLAND AND CUSTOMS",
    tagline: "Coordinate factory pickup, customs and inland delivery",
    cardDescription:
      "First-mile, gateway and final-mile movement kept aligned with the schedule.",
    headline: "Keep the cargo and documents moving together.",
    subhead:
      "We coordinate domestic movement and customs-related activity around the confirmed international schedule and cargo requirements.",
    primaryCta: "Discuss Inland and Customs Support",
    secondaryCta: "Request a Quote",
    controls: [
      "Pickup readiness",
      "Vehicle suitability",
      "Documentation",
      "Gateway timing",
      "Clearance dependencies",
      "Final delivery",
    ],
    capabilities: [
      "Factory and supplier pickup",
      "Airport, port and CFS transfers",
      "Scheduled or dedicated movement",
      "First-mile and final-mile delivery",
      "Documentation coordination",
      "Customs support through appropriately authorised parties [VALIDATE]",
      "Milestone communication",
    ],
    supportSteps: [
      "Confirm cargo, vehicle, route and gateway requirements.",
      "Review document and customs dependencies.",
      "Agree pickup cut-off, security and escalation contacts.",
      "Coordinate movement, submission, assessment and release.",
      "Complete the planned delivery and close the milestone record.",
    ],
    proofNote:
      "Crystal is not described as a licensed customs broker unless the entity and licence are confirmed by legal.",
    faqs: [
      {
        question: "Can Crystal collect cargo from factories outside Dhaka?",
        answer:
          "Pickup coverage is confirmed per shipment based on the factory location and required vehicle type.",
      },
      {
        question: "What vehicle information is required?",
        answer:
          "Cargo weight, dimensions and packaging type, so the right vehicle size and configuration can be arranged.",
      },
      {
        question: "Which documents are needed for customs?",
        answer:
          "Requirements vary by cargo and destination; the responsible team confirms the exact document set once the shipment is scoped.",
      },
      {
        question: "Does Crystal act directly or coordinate authorised brokers?",
        answer:
          "This depends on the licensing arrangement in place, confirmed by legal before being described publicly.",
      },
      {
        question: "Can inland transport be combined with air or ocean freight?",
        answer:
          "Yes — inland movement is typically coordinated as part of the same origin-to-destination plan.",
      },
    ],
    relatedServices: [
      { label: "Air Freight", slug: "air-freight" },
      { label: "Ocean Freight", slug: "ocean-freight" },
    ],
    relatedIndustries: [
      { label: "Automotive", slug: "automotive" },
      { label: "Industrial & Manufacturing", slug: "industrial" },
    ],
  },

  {
    slug: "project-logistics",
    icon: "crane",
    title: "Project Logistics",
    category: "PROJECT LOGISTICS",
    tagline: "Plan oversized or complex cargo",
    cardDescription:
      "Route survey, equipment, permits and lift control for non-standard cargo.",
    headline: "Complex cargo starts with a complete requirement.",
    subhead:
      "Share the drawings, dimensions, weights, lifting points, site conditions and timing. Our team will assess what must be engineered and confirmed before movement.",
    primaryCta: "Submit Project Details",
    secondaryCta: "Speak to a Project Specialist",
    controls: [
      "Route feasibility",
      "Equipment",
      "Permits",
      "Lifting and securing",
      "Transfer points",
      "Site readiness",
      "Documented responsibility",
    ],
    capabilities: [
      "Oversized and heavy cargo",
      "Breakbulk and special equipment, subject to carrier acceptance",
      "Route and site assessment",
      "Packing, crating, lifting and securing coordination",
      "Multimodal and infrastructure logistics",
      "Permit and escort coordination through approved providers",
      "Project milestone and exception reporting",
    ],
    supportSteps: [
      "Collect technical cargo and site data.",
      "Assess route, equipment, permits, risks and interfaces.",
      "Prepare the operating method, commercial basis and responsibility matrix.",
      "Confirm suppliers, bookings, permits and readiness.",
      "Execute, monitor and document the agreed movement.",
    ],
    proofNote:
      "Original project imagery and an approved method summary are used; engineering sign-off is never implied unless the qualified party is named.",
    faqs: [
      {
        question: "What information is needed for a project quotation?",
        answer:
          "Drawings, dimensions, weights, lifting points, site conditions and the required delivery timing.",
      },
      {
        question: "Can Crystal arrange flat rack, open top or breakbulk?",
        answer:
          "Yes, subject to carrier acceptance and confirmation against the specific cargo profile.",
      },
      {
        question: "Who completes route surveys and method statements?",
        answer:
          "These are prepared by the project team, or by approved specialist providers where the cargo requires it.",
      },
      {
        question: "How are lifting and securing responsibilities agreed?",
        answer:
          "Documented in the operating method and responsibility matrix before movement begins.",
      },
      {
        question: "Can project cargo combine ocean, air and road?",
        answer:
          "Yes — project moves are frequently multimodal, coordinated as one plan across every leg.",
      },
    ],
    relatedServices: [
      { label: "Multimodal Logistics", slug: "multimodal-logistics" },
      { label: "Inland Transport & Customs", slug: "inland-customs" },
    ],
    relatedIndustries: [
      { label: "Industrial & Manufacturing", slug: "industrial" },
      { label: "Automotive", slug: "automotive" },
    ],
  },

  {
    // Renamed from "Fashion Logistics & GOH" -> "Contract Logistics".
    // Slug kept as 'fashion-goh' so existing nav links keep working.
    slug: "fashion-goh",
    icon: "hanger",
    title: "Contract Logistics",
    category: "CONTRACT LOGISTICS",
    tagline: "Manage fashion cargo / GOH",
    cardDescription:
      "A coordinated apparel journey from factory readiness to export movement.",
    headline: "Prepare every order for the way it needs to travel.",
    subhead:
      "We connect supplier readiness, cargo preparation, hanging-garment handling, consolidation and export movement through one origin plan.",
    primaryCta: "Discuss Contract Logistics",
    secondaryCta: "Request a GOH Quote",
    controls: [
      "Purchase-order visibility",
      "Supplier handovers",
      "Presentation quality",
      "Consolidation",
      "Cut-offs",
      "Destination readiness",
    ],
    capabilities: [
      "Factory and supplier coordination",
      "Garments on hanger by air and ocean [VALIDATE equipment and lanes]",
      "Buyer and purchase-order consolidation",
      "Sorting, labelling, barcoding and packing [VALIDATE facility scope]",
      "Quality and condition checks [VALIDATE responsibility]",
      "Air, ocean and multimodal export planning",
      "Milestone and exception reporting",
    ],
    supportSteps: [
      "Confirm purchase orders, cargo format and delivery priorities.",
      "Plan supplier receiving, preparation, consolidation and export route.",
      "Agree cut-offs, quality responsibilities, packing and documentation.",
      "Coordinate cargo through facility and gateway handovers.",
      "Provide agreed milestones, documents and exception updates.",
    ],
    proofNote:
      "A visual process is built using approved facility images and one customer-approved case, once available.",
    faqs: [
      {
        question: "What is garments on hanger logistics?",
        answer:
          "Apparel transported hanging rather than folded, to protect presentation quality for retail.",
      },
      {
        question: "Can GOH move by both air and ocean?",
        answer:
          "Yes, subject to equipment and lane availability, confirmed once validated.",
      },
      {
        question: "How does buyer consolidation work?",
        answer:
          "Cargo from multiple suppliers against one buyer’s purchase orders is combined into a single, efficient shipment.",
      },
      {
        question: "Which value-added services are available?",
        answer:
          "Sorting, labelling, barcoding, packing and quality checks can be added — see Value Added Service & GOH.",
      },
      {
        question: "How are supplier delays and exceptions communicated?",
        answer:
          "Agreed milestones, documents and exception updates are provided as the shipment progresses.",
      },
    ],
    relatedServices: [
      { label: "Ocean Freight", slug: "ocean-freight" },
      { label: "Value Added Service & GOH", slug: "value-added-services" },
    ],
    relatedIndustries: [{ label: "Fashion & Retail", slug: "fashion-retail" }],
  },

  {
    // Renamed from "Value Added Services" -> "Value Added Service & GOH".
    // Slug kept as 'value-added-services'.
    slug: "value-added-services",
    icon: "tag",
    title: "Value Added Service & GOH",
    category: "VALUE ADDED SERVICE & GOH",
    tagline: "Prepare, inspect or label cargo before dispatch",
    cardDescription: "Inspection, packing & quality control, GOH handling.",
    headline: "Prepare the cargo for the next requirement.",
    subhead:
      "Select only the tasks the product, buyer or route needs. Scope, responsibility, acceptance criteria and facility availability must be confirmed before work begins.",
    primaryCta: "Define the Required Tasks",
    secondaryCta: "Request a Quote",
    controls: [
      "Work instructions",
      "Quality responsibility",
      "Traceability",
      "Materials",
      "Facility suitability",
      "Release criteria",
    ],
    capabilities: [
      "Cargo inspection and condition checks [VALIDATE responsibility]",
      "Labelling and barcoding",
      "Pick and pack",
      "Garments on hanger handling",
      "Inventory records [VALIDATE functionality]",
      "Packaging and crating",
      "Temperature-related handling [VALIDATE facility equipment and monitoring]",
      "Customs documentation coordination",
    ],
    supportSteps: [
      "Receive the buyer product and handling specification.",
      "Confirm facility capability, responsibility, materials and acceptance criteria.",
      "Issue approved work instructions and control samples where relevant.",
      "Complete, record and check the agreed tasks.",
      "Release cargo to the next freight or delivery milestone.",
    ],
    proofNote:
      "Regulated quality testing or cold-chain claims are avoided unless the accredited party, equipment and process are approved.",
    faqs: [
      {
        question: "Which services are available at each facility?",
        answer:
          "This varies by site and is confirmed per facility before a task is scoped.",
      },
      {
        question: "Who approves work instructions and samples?",
        answer:
          "The buyer or their nominated representative approves work instructions and any control samples before tasks begin.",
      },
      {
        question: "Can Crystal provide labels and packing materials?",
        answer:
          "Yes, subject to specification and facility availability, confirmed as part of scoping the task.",
      },
      {
        question: "What inspection records are available?",
        answer:
          "Records are provided according to the agreed acceptance criteria for the task.",
      },
      {
        question: "Can value-added services be combined with consolidation?",
        answer:
          "Yes — these tasks are frequently combined with buyer consolidation or GOH handling in one origin plan.",
      },
    ],
    relatedServices: [
      { label: "Contract Logistics", slug: "fashion-goh" },
      { label: "Warehousing & Container", slug: "warehousing" },
    ],
    relatedIndustries: [
      { label: "Healthcare", slug: "healthcare" },
      { label: "FMCG", slug: "fmcg" },
    ],
  },

  {
    // Merged: "Warehousing" + "Container Freight Station" -> one page.
    // Slug kept as 'warehousing'; 'container-freight-station' retired.
    slug: "warehousing",
    icon: "warehouse",
    title: "Warehousing & Container",
    category: "WAREHOUSING & CONTAINER",
    tagline: "Stage, consolidate or build export cargo at origin",
    cardDescription: "Storage, staging, receiving, and consolidation.",
    headline:
      "Storage, staging and container build — planned as one requirement.",
    subhead:
      "Warehouse activity and container-freight-station work should support a defined cargo decision — consolidation, export readiness, order preparation, container build or onward delivery.",
    primaryCta: "Discuss a Warehouse or CFS Requirement",
    secondaryCta: "Request Facility Details",
    controls: [
      "Space & capacity",
      "Receiving & segregation",
      "Container build plan",
      "Cut-offs & buyer segregation",
      "Inventory & dwell time",
      "Security",
      "Port or dispatch transfer",
    ],
    capabilities: [
      "Short-term storage and staging",
      "Receiving and cargo segregation",
      "Consolidation and deconsolidation",
      "LCL buyer and supplier consolidation, container-build control",
      "Pick, pack, labelling and barcoding [VALIDATE]",
      "Inventory records and reporting [VALIDATE system]",
      "Packaging, crating and special handling [VALIDATE]",
      "Quality control and value-added handling [VALIDATE]",
      "Container loading and port transfer coordination",
      "Round-the-clock support [VALIDATE hours]",
    ],
    supportSteps: [
      "Define cargo, volume, duration and required storage or CFS tasks.",
      "Confirm facility suitability, responsibility, security and commercial basis.",
      "Agree receiving cut-offs, segregation rules and inventory or build controls.",
      "Perform approved handling, consolidation or container-build activity and maintain records.",
      "Release cargo against the agreed transport plan or coordinate port transfer.",
    ],
    proofNote:
      "The Dhaka warehouse and Chattogram CFS figures — including area, proximity, capacity and lead time — are published only after operations revalidates each figure.",
    faqs: [
      {
        question: "What cargo can the facility accept?",
        answer:
          "Acceptance depends on cargo type, packaging and volume, confirmed against current facility capacity.",
      },
      {
        question: "Is storage available for air and ocean cargo?",
        answer:
          "Yes — both the Dhaka warehouse and Chattogram CFS support cargo moving by either mode.",
      },
      {
        question: "Can cargo be segregated by buyer or purchase order?",
        answer:
          "Yes — segregation rules are agreed as part of the receiving and consolidation plan.",
      },
      {
        question: "Which inventory reports are available?",
        answer:
          "Available reporting depends on the system in use at the time, confirmed before storage begins.",
      },
      {
        question: "Can Crystal label, pack or crate cargo?",
        answer:
          "Yes, subject to facility scope and validation of the specific task requested.",
      },
      {
        question: "Which inspections and value-added services are available?",
        answer:
          "See Value Added Service & GOH for the current list of tasks that can be added.",
      },
      {
        question: "How is cargo transferred to the terminal?",
        answer:
          "Port transfer is coordinated directly from the CFS once the container build and documentation are complete.",
      },
    ],
    relatedServices: [
      { label: "Ocean Freight", slug: "ocean-freight" },
      { label: "Value Added Service & GOH", slug: "value-added-services" },
    ],
    relatedIndustries: [
      { label: "FMCG", slug: "fmcg" },
      { label: "Fashion & Retail", slug: "fashion-retail" },
      { label: "Healthcare", slug: "healthcare" },
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
