import Image from "next/image";

export const metadata = {
  title: "About Crystal Express",
  description:
    "Founding story, operating model, leadership, group ecosystem, affiliations and careers at Crystal Express Limited.",
};

const timeline = [
  {
    label: "2002",
    title: "Founded in Bangladesh",
    desc: "Crystal Express Ltd. begins operations with a focus on reliable international freight forwarding.",
  },
  {
    label: "Network",
    title: "Stronger global reach",
    desc: "Trusted agent and carrier relationships extend service across international markets.",
  },
  {
    label: "Services",
    title: "More ways to move",
    desc: "Air, ocean, inland, GOH, project cargo, warehousing and CFS capabilities develop.",
  },
  {
    label: "Facilities",
    title: "Greater cargo control",
    desc: "Chattogram CFS capacity and value-added handling strengthen origin execution.",
  },
  {
    label: "Today",
    title: "Visible and responsive",
    desc: "Digital reporting, disciplined compliance and responsive communication support every shipment.",
  },
];

const companyFacts = [
  "Established in 1997 [VALIDATE]",
  "Dhaka head office and Chattogram branch [VALIDATE names/addresses]",
  "130+ professionals [VALIDATE headcount]",
  "Regional presence across selected Asian markets [VALIDATE model by country]",
  "T.O.P.S., JCtrans and WCA affiliations [VALIDATE status]",
];

const approach = [
  "Understand the cargo and delivery requirement before proposing a route.",
  "Confirm responsibility at each handover.",
  "Communicate changes while there is still time to act.",
  "Use facilities and specialist handling where they add control.",
  "Keep operating claims accurate by location.",
];

const leadership = [
  {
    initials: "MA",
    name: "MD Abrarul Alam",
    title: "Managing Director & Group CEO",
    desc: "Sets strategic direction for Crystal Express Ltd. and the wider group. [VALIDATE title/scope]",
  },
  {
    initials: "MS",
    name: "Mohammad Sams E Tabriz",
    title: "Deputy Managing Director",
    desc: "[VALIDATE title and reporting line]",
  },
  {
    initials: "AH",
    name: "Abdul Halim",
    title: "Chief Financial Officer",
    desc: "[VALIDATE entity of employment]",
  },
  {
    initials: "RH",
    name: "Rashedul Hoque Chowdhury",
    title: "Regional Manager",
    desc: "[VALIDATE market remit]",
  },
  {
    initials: "GM",
    name: "Golam Mostafa Arnab",
    title: "Head of Sales",
    desc: "[VALIDATE scope]",
  },
  {
    initials: "TA",
    name: "Tayef Al Sakib",
    title: "Head of Business Development",
    desc: "[VALIDATE scope]",
  },
  {
    initials: "FK",
    name: "Fatin Khandoker",
    title: "Senior Manager, Planning & Business Development",
    desc: "[VALIDATE scope]",
  },
];

const groupEntities = [
  {
    name: "Crystal Express Ltd.",
    tag: "THIS COMPANY",
    desc: "The Bangladesh-based international freight-forwarding platform within the wider group.",
  },
  {
    name: "EUR Logistics Services Ltd.",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Integrated logistics and supply-chain capability [VALIDATE exact name and scope].",
  },
  {
    name: "PT EUR Logistiks Servises",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Indonesia country operation [VALIDATE spelling, legal name and scope].",
  },
  {
    name: "EXG Project Logistics",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Project cargo and complex movements [VALIDATE legal name and relationship].",
  },
  {
    name: "Soul Aviation Limited",
    tag: "GROUP ENTITY — VALIDATE SCOPE",
    desc: "Cargo charter and freighter solutions [VALIDATE scope and contracting model].",
  },
];

const cargoSecurity = [
  {
    name: "TAPA",
    desc: "TAPA compliant [VALIDATE audit status and permitted wording]",
  },
  {
    name: "CTPAT",
    desc: "CTPAT aligned [VALIDATE alignment vs. certification]",
  },
  {
    name: "FCPA",
    desc: "FCPA compliance statement [VALIDATE approved wording]",
  },
];

const logisticsNetwork = [
  {
    name: "T.O.P.S.",
    desc: "T.O.P.S. member [VALIDATE current status and logo permission]",
  },
  {
    name: "JCtrans",
    desc: "JCtrans member [VALIDATE current status and logo permission]",
  },
  {
    name: "WCA World",
    desc: "WCA member [VALIDATE current status and logo permission]",
  },
];

const careerValues = [
  "Ownership of the next action",
  "Accurate and timely communication",
  "Respect for procedures and compliance",
  "Practical problem solving",
  "Collaboration across functions and markets",
  "Willingness to learn freight operations",
];

const sectionNav = [
  { href: "#our-role", label: "Our Role" },
  { href: "#our-story", label: "Our Story" },
  { href: "#our-approach", label: "Our Approach" },
  { href: "#leadership", label: "Leadership" },
  { href: "#group-ecosystem", label: "Group Ecosystem" },
  { href: "#affiliations", label: "Affiliations" },
  { href: "#careers", label: "Careers" },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-40">
        <Image
          src="/assets/About/aboutbanner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay keeps the text readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/30" />

        <div className="container-content relative z-10">
          <p className="text-xs text-navy-100/60">Home / About</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            About Crystal Express
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Built in Bangladesh for cargo moving beyond it.
          </h1>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Crystal Express coordinates international freight from Bangladesh
            through local teams, service specialists and approved connections in
            key markets.
          </p>
          <button className="mt-6 rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
            Talk to Our Team
          </button>
        </div>
      </section>

      {/* IN-PAGE SECTION NAV */}
      <nav className="sticky top-0 z-10 border-b border-navy-100 bg-white/95 backdrop-blur">
        <div className="container-content flex flex-wrap gap-x-6 gap-y-2 py-3 text-sm">
          {sectionNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-navy-400 hover:text-crimson"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* OUR ROLE / OUR STORY + TIMELINE + SIDEBAR FACTS */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div id="our-role">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                Our Role
              </p>
              <p className="mt-3 max-w-2xl text-navy-700">
                We bring the shipment requirement, origin activity, route
                decision and partner coordination into one operating
                conversation. Customers know who is managing the next action and
                what information is needed.
              </p>
            </div>

            <div id="our-story" className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                Our Story
              </p>
              <p className="mt-3 max-w-2xl text-navy-700">
                Crystal Express began operations in Bangladesh in 2002
                [VALIDATE]. Since then, the business has developed air, ocean,
                inland, fashion, project, warehousing and CFS capabilities
                [VALIDATE scope], supported by international forwarding
                relationships.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                {timeline.map((step) => (
                  <div
                    key={step.label}
                    className="border-t border-navy-100 pt-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-crimson">
                      {step.label}
                    </p>
                    <span className="mt-2 block h-3 w-3 rounded-full border-2 border-navy-900" />
                    <h3 className="mt-3 font-bold text-navy-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="our-approach" className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
                Our Approach
              </p>
              <div className="mt-4 divide-y divide-navy-100">
                {approach.map((line) => (
                  <p key={line} className="py-4 text-navy-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="h-fit rounded-lg border border-navy-100 bg-white p-6 lg:sticky lg:top-20">
            <h2 className="font-bold text-navy-900">Company facts</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {companyFacts.map((fact) => (
                <li key={fact} className="flex gap-2 text-navy-400">
                  <span className="text-crimson">✓</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3">
              <a
                href="#leadership"
                className="block rounded-md border border-navy-900 py-3 text-center text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
              >
                Meet Leadership
              </a>
              <a
                href="#group-ecosystem"
                className="block rounded-md border border-navy-900 py-3 text-center text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
              >
                Group Ecosystem
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section
        id="leadership"
        className="bg-navy-900 py-16 text-white sm:py-20"
      >
        <div className="container-content">
          {/* <p className="text-xs text-navy-100/60">Home / About / Leadership</p> */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            Leadership
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Clear responsibility starts with accountable people.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Our leaders connect commercial commitments with operating decisions
            across freight, facilities and customer service.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <div
              key={person.name}
              className="rounded-lg border border-navy-100 bg-white"
            >
              <div className="flex aspect-square items-center justify-center bg-navy-50 text-2xl font-bold text-navy-300">
                {person.initials}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy-900">{person.name}</h3>
                <p className="text-sm font-semibold text-crimson">
                  {person.title}
                </p>
                <p className="mt-2 text-sm text-navy-400">{person.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROUP ECOSYSTEM */}
      <section
        id="group-ecosystem"
        className="bg-navy-900 py-16 text-white sm:py-20"
      >
        <div className="container-content">
          {/* <p className="text-xs text-navy-100/60">
            Home / About / Group Ecosystem
          </p> */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            Group Ecosystem
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Bring in specialist capability when the requirement needs it.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Crystal operates within a wider group of logistics businesses. Where
            appropriate, we can introduce the relevant group team and define
            which entity will contract, operate and communicate.
          </p>
        </div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content grid gap-4 sm:grid-cols-2">
          {groupEntities.map((entity) => (
            <div
              key={entity.name}
              className="rounded-lg border border-navy-100 bg-white p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-navy-900">{entity.name}</h3>
                <span className="rounded bg-navy-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy-400">
                  {entity.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-navy-400">{entity.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AFFILIATIONS & COMPLIANCE */}
      <section
        id="affiliations"
        className="bg-navy-900 py-16 text-white sm:py-20"
      >
        <div className="container-content">
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-crimson">
            Affiliations &amp; Compliance
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Trust depends on accurate standards and responsibilities.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            We publish a membership, compliance statement or logo only when the
            relevant entity, scope, status and permission are confirmed.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-content">
          <p className="text-xs font-semibold uppercase tracking-widest text-crimson">
            Cargo Security &amp; Ethics
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cargoSecurity.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-navy-100 bg-white p-5"
              >
                <h3 className="font-bold text-navy-900">{item.name}</h3>
                <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-xs font-semibold uppercase tracking-widest text-crimson">
            Logistics Network
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {logisticsNetwork.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-navy-100 bg-white p-5"
              >
                <h3 className="font-bold text-navy-900">{item.name}</h3>
                <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <button className="mt-8 rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
            Request Credential Information
          </button>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-content">
          {/* <p className="text-xs text-navy-100/60">Home / About / Careers</p> */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-crimson">
            Careers
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Build your logistics career close to the operation.
          </h2>
          <p className="mt-4 max-w-2xl text-navy-100/80">
            Work with teams coordinating cargo, customers, facilities, documents
            and international partners across a changing freight environment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
              View Open Roles
            </button>
            <button className="rounded-md border border-white px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-navy-900">
              Submit Your Profile
            </button>
          </div>
        </div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">
              What We Value
            </p>
            <div className="mt-4 divide-y divide-navy-100">
              {careerValues.map((value) => (
                <p key={value} className="py-4 text-navy-700">
                  {value}
                </p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-navy-100 bg-white p-6">
            <h2 className="font-bold text-navy-900">Open roles</h2>
            <p className="mt-3 text-sm text-navy-400">
              No current openings are published. You may submit your profile for
              future consideration.
            </p>
            <button className="mt-4 w-full rounded-md bg-crimson px-5 py-3 text-sm font-semibold text-white hover:bg-crimson/90">
              Submit Your Profile
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
