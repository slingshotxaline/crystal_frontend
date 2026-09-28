import Hero from "@/components/Hero";
import TaskSelector from "@/components/TaskSelector";
import TrustEvidence from "@/components/TrustEvidence";
import ServicesGrid from "@/components/ServicesGrid";
import RouteChoice from "@/components/RouteChoice";
import FashionJourney from "@/components/FashionJourney";
import Facilities from "@/components/Facilities";
import NetworkMap from "@/components/NetworkMap";
import IndustriesGrid from "@/components/IndustriesGrid";
import DigitalVisibility from "@/components/DigitalVisibility";
import CaseStudies from "@/components/CaseStudies";
import InsightsSection from "@/components/InsightsSection";
import CTASection from "@/components/CTASection";
import { getServices, getIndustries } from "@/lib/content";

export const metadata = {
  title: "Crystal Express Limited | Bangladesh Freight Forwarding",
  description:
    "The right route, managed from the first handover. Air, ocean, inland and specialist logistics coordination from Bangladesh origin.",
};

export default async function HomePage() {
  // Tries the CMS first, falls back to the static data files if the
  // backend isn't reachable (see lib/content.js).
  const [services, industries] = await Promise.all([
    getServices(),
    getIndustries(),
  ]);

  return (
    <>
      <Hero />
      {/* <TaskSelector /> */}
      <TrustEvidence />
      <ServicesGrid services={services} />
      <RouteChoice />
      <FashionJourney />
      <Facilities />
      <NetworkMap />
      <IndustriesGrid industries={industries} />
      {/* <DigitalVisibility /> */}
      {/* <CaseStudies /> */}
      <InsightsSection />
      <CTASection />
    </>
  );
}
