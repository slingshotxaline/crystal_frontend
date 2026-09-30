import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";
import { getServices } from "@/lib/content";

export const metadata = {
  title: "Services",
  description:
    "Air, ocean, multimodal, inland, project, fashion, warehousing and CFS services from Crystal Express.",
};

export default async function ServicesOverviewPage() {
  const services = await getServices();

  return (
    <>
      <section
        className="relative bg-navy-900 bg-cover bg-center py-16 text-white sm:py-40"
        style={{
          backgroundImage: 'url("/assets/Services/serviceOverview2.webp")',
        }}
      >
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-navy-900/85" />

        <div className="container-content relative z-10">
          <p className="text-sm text-navy-100/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            / <span className="text-navy-100">Services</span>
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-crimson">
            Services
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Choose the movement. Connect the handovers.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Start with the cargo, timing and delivery requirement. We will
            identify the services needed to support the agreed route.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="focus-ring rounded-md bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-700"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="focus-ring rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
      <ServicesGrid services={services} />
    </>
  );
}
