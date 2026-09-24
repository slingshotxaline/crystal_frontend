import Hero from '@/components/Hero';
import TaskSelector from '@/components/TaskSelector';
import TrustEvidence from '@/components/TrustEvidence';
import ServicesGrid from '@/components/ServicesGrid';
import RouteChoice from '@/components/RouteChoice';
import FashionJourney from '@/components/FashionJourney';
import Facilities from '@/components/Facilities';
import NetworkMap from '@/components/NetworkMap';
import IndustriesGrid from '@/components/IndustriesGrid';
import DigitalVisibility from '@/components/DigitalVisibility';
import CaseStudies from '@/components/CaseStudies';
import InsightsSection from '@/components/InsightsSection';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Crystal Express Limited | Bangladesh Freight Forwarding',
  description:
    'The right route, managed from the first handover. Air, ocean, inland and specialist logistics coordination from Bangladesh origin.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TaskSelector />
      <TrustEvidence />
      <ServicesGrid />
      <RouteChoice />
      <FashionJourney />
      <Facilities />
      <NetworkMap />
      <IndustriesGrid />
      <DigitalVisibility />
      {/* <CaseStudies /> */}
      <InsightsSection />
      <CTASection />
    </>
  );
}
