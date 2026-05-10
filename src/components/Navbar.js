import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);

  const linkClass = (path) =>
    `border-b-2 py-1 text-sm font-medium transition-colors ${
      router.pathname === path
        ? 'border-brand text-ink'
        : 'border-transparent text-ink-soft hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="page flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
          Bakry<span className="ml-1 inline-block h-2.5 w-2.5 bg-brand align-baseline" aria-hidden="true" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.path} href={l.path} className={linkClass(l.path)}>
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-sm font-medium text-ink hover:underline underline-offset-4">
            Cart
            {cartCount > 0 && (
              <span className="ml-1.5 rounded bg-brand px-1.5 py-0.5 text-xs font-semibold tabular-nums">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-4 sm:flex">
            {session ? (
              <>
                <span className="text-sm text-ink-soft">{session.user.name?.split(' ')[0]}</span>
                <button onClick={() => signOut()} className="btn btn-outline btn-sm">
                  Log out
                </button>
              </>
            ) : (
              <button onClick={() => signIn()} className="btn btn-outline btn-sm">
                Log in
              </button>
            )}
          </div>

          <button
            className="p-1 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <nav className="page flex flex-col py-2" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                href={l.path}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-3 text-base ${
                  router.pathname === l.path ? 'font-semibold text-ink' : 'text-ink-soft'
                }`}
              >
                {l.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                session ? signOut() : signIn();
              }}
              className="py-3 text-left text-base font-medium"
            >
              {session ? 'Log out' : 'Log in'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
