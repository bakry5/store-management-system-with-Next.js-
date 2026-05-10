import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="page flex min-h-screen flex-col justify-center py-16">
      <p className="font-display text-7xl font-extrabold tracking-tight sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">This page doesn't exist</h1>
      <p className="mt-2 max-w-[44ch] text-ink-soft">
        The link may be old, or the product may have been removed.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary px-6 py-3">Go home</Link>
        <Link href="/products" className="btn btn-outline px-6 py-3">Browse products</Link>
      </div>
    </div>
  );
}

Custom404.getLayout = (page) => page;
