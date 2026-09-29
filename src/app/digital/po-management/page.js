import Enquiry from "@/components/POManagement/Enquiry";
import Faq from "@/components/POManagement/Faq";
import { Overview, Scope } from "@/components/POManagement/Overview";
import POHero from "@/components/POManagement/POHero";
import { Value, Workflow } from "@/components/POManagement/Workflow";


export const metadata = {
  // `absolute` stops a layout-level title template from repeating the company name.
  title: { absolute: "PO Management | Crystal Express Limited" },
  description:
    "Explore purchase order coordination with Crystal Express Limited. Discuss supplier updates, cargo preparation and reporting needs for your sourcing operation.",
  // Relative canonical needs `metadataBase` in the root layout; swap for the
  // full URL on the final domain if it is not set.
  alternates: { canonical: "/services/po-management" },
};

export default function POManagementPage() {
  return (
    <>
      <POHero />
      <Overview />
      <Scope />
      <Workflow />
      <Value />
      <Faq />
      <Enquiry />
    </>
  );
}
