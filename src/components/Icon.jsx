const paths = {
  plane: 'M2 16l20-7-20-7v6l14 1-14 1v6z',
  ship: 'M3 18l2-7h14l2 7M6 11V6h5l3 5M4 21c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0 3.5-1 5 0',
  route: 'M5 19c3 0 3-14 6-14s3 14 6 14 3-6 6-6M5 19h.01',
  truck: 'M2 8h11v8H2zM13 11h4l3 3v2h-7zM6 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  crane: 'M4 20V6l14 4M4 6l16-2v4M9 20V11M14 20l2-6',
  hanger: 'M12 3a2 2 0 10-2 2c0 .5.3.9.7 1.2L12 8l-9 6v2h18v-2l-9-6 1.3-1.8c.4-.3.7-.7.7-1.2a2 2 0 00-1-1.7z',
  warehouse: 'M3 21V10l9-6 9 6v11H3zM9 21v-6h6v6',
  container: 'M3 8h18v10H3zM3 12h18M8 8v10M13 8v10',
  tag: 'M20 12l-8 8-9-9V3h8l9 9z M6.5 6.5h.01',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  check: 'M20 6L9 17l-5-5',
  pin: 'M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
};

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6 }) {
  const d = paths[name] || paths.route;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
