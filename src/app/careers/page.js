import EnquiryForm from '@/components/EnquiryForm';

export const metadata = {
  title: 'Careers at Crystal Express',
  description: 'Open roles at Crystal Express Limited, Bangladesh.',
};

// Placeholder — CMS-managed Job records (backend/src/models/Job.js)
// will replace this list once the careers workflow is connected.
const OPEN_ROLES = [
  { title: 'Operations Executive — Air Freight', location: 'Dhaka', type: 'Full-time' },
  { title: 'CFS Coordinator', location: 'Chattogram', type: 'Full-time' },
  { title: 'Customer Service Executive', location: 'Dhaka', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Careers</p>
        <h1 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
          What Crystal does, and how to join.
        </h1>
        <p className="mt-4 max-w-xl text-navy-400">
          Roles below are illustrative pending confirmation from HR. Once the careers workflow is live, this list
          is served from the CMS.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,1.3fr]">
          <div className="space-y-4">
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="rounded-lg border border-navy-100 bg-white p-5">
                <h3 className="font-bold text-navy-900">{role.title}</h3>
                <p className="mt-1 text-sm text-navy-400">{role.location} &middot; {role.type}</p>
              </div>
            ))}
          </div>

          <EnquiryForm type="careers" title="Apply / Ask About Careers" />
        </div>
      </div>
    </section>
  );
}
