import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="page grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">
            Bakry<span className="ml-1 inline-block h-2.5 w-2.5 bg-brand" aria-hidden="true" />
          </p>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-paper/70">
            A small store catalogue: browse products, keep a cart, and manage stock when signed in.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Pages</h2>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li><Link href="/" className="hover:text-paper hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:text-paper hover:underline">Products</Link></li>
            <li><Link href="/cart" className="hover:text-paper hover:underline">Cart</Link></li>
            <li><Link href="/contact" className="hover:text-paper hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Get in touch</h2>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li><a href="mailto:mohamed.medhat23000@gmail.com" className="hover:text-paper hover:underline">mohamed.medhat23000@gmail.com</a></li>
            <li><a href="tel:+201507882744" className="hover:text-paper hover:underline">+20 150 788 2744</a></li>
            <li>Mansoura, Egypt</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="page py-5 text-xs text-paper/50">© {year} Bakry</p>
      </div>
    </footer>
  );
}
