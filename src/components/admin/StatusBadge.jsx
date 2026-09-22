const STYLES = {
  // quote / enquiry statuses
  new: 'bg-crimson/10 text-crimson-700',
  in_review: 'bg-amber-100 text-amber-800',
  quoted: 'bg-navy-100 text-navy-700',
  won: 'bg-moss/10 text-moss',
  lost: 'bg-navy-100 text-navy-400',
  responded: 'bg-moss/10 text-moss',
  closed: 'bg-navy-100 text-navy-400',
  spam: 'bg-navy-800 text-white',
  // editorial
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-moss/10 text-moss',
  rejected: 'bg-crimson/10 text-crimson-700',
  // booleans rendered as labels upstream
  true: 'bg-moss/10 text-moss',
  false: 'bg-navy-100 text-navy-400',
};

export default function StatusBadge({ value }) {
  const key = String(value);
  const style = STYLES[key] || 'bg-navy-100 text-navy-600';
  const label = key === 'true' ? 'Yes' : key === 'false' ? 'No' : key.replace(/_/g, ' ');

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${style}`}>
      {label}
    </span>
  );
}
