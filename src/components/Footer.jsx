import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Air Freight", href: "/services/air-freight" },
      { label: "Ocean Freight", href: "/services/ocean-freight" },
      { label: "Multimodal Logistics", href: "/services/multimodal-logistics" },
      { label: "Inland Transport & Customs", href: "/services/inland-customs" },
      { label: "Project Logistics", href: "/services/project-logistics" },
      { label: "Contract Logistics", href: "/services/fashion-goh" },
      {
        label: "Warehousing & CFS",
        href: "/services/warehousing",
      },

      {
        label: "Value Added Service & GOH",
        href: "/services/value-added-services",
      },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Fashion & Retail", href: "/industries/fashion-retail" },
      { label: "FMCG", href: "/industries/fmcg" },
      { label: "Industrial & Manufacturing", href: "/industries/industrial" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "High Tech", href: "/industries/high-tech" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Crystal Express", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Group Ecosystem", href: "/about#group-ecosystem" },
      { label: "Affiliations & Compliance", href: "/about#affiliations" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Request a Quote", href: "/quote" },
      { label: "Track Shipment", href: "/tracking" },
      { label: "Contact an Office", href: "/contact" },
      { label: "Partner with Crystal", href: "/partnership" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-content grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="focus-ring flex items-center rounded"
            aria-label="Crystal Express home"
          >
            <Image
              src="/assets/logo/Crystal_Express_Logo white.svg"
              alt="Crystal Express"
              width={100}
              height={100}
              priority
              className="h-16 w-full"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/80">
            Crystal Express Ltd. connects Bangladesh to global markets through
            coordinated air, ocean, inland and specialist logistics solutions.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-ring rounded text-sm text-navy-100/75 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-3 py-5 text-xs text-navy-100/60 lg:flex-row lg:items-center lg:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Crystal Express Ltd. All rights
            reserved.
          </p>
          <p className="lg:text-center">
            Rangs Paramount Square, Level 6, House 11, Road 17, Banani C/A,
            Dhaka 1213, Bangladesh <span className="italic">[VALIDATE]</span>
          </p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://www.a-linebrands.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              A-Line Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
