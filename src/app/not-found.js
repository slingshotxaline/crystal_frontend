import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-cream py-24 text-center">
      <div className="container-content">
        <p className="text-xs font-semibold uppercase tracking-widest text-crimson">404</p>
        <h1 className="mt-3 text-3xl font-bold text-navy-900">This page could not be found.</h1>
        <p className="mt-3 text-navy-400">It may have moved. Check the URL inventory and redirect map, or start again from the homepage.</p>
        <Link href="/" className="focus-ring mt-8 inline-flex rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800">
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}
