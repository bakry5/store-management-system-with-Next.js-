import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';

const facts = [
  { title: 'Shipping', text: 'Free on orders over $50. Below that, a flat $5.99.' },
  { title: 'Accounts', text: 'Sign in to read full descriptions and to add, edit or remove products.' },
  { title: 'Questions', text: 'Use the contact page and we will reply by email.' },
];

export default function Home({ latest }) {
  const { data: session } = useSession();

  return (
    <>
      <section className="page grid items-start gap-14 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="max-w-[14ch] font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Browse the shelves. Manage the stock.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Every product, price and category in one catalogue. Look around as a guest, or sign in to keep it up to date.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary px-6 py-3">
              Browse products
            </Link>
            {session ? (
              <Link href="/products/add" className="btn btn-outline px-6 py-3">
                Add a product
              </Link>
            ) : (
              <button onClick={() => signIn()} className="btn btn-outline px-6 py-3">
                Log in
              </button>
            )}
          </div>
        </div>

        {latest.length > 0 && (
          <div>
            <h2 className="font-display text-sm font-semibold">Latest additions</h2>
            <ul className="mt-3 border-t border-ink">
              {latest.map((p) => (
                <li key={p._id} className="border-b border-line">
                  <Link href={`/products/${p._id}`} className="group flex items-center gap-4 py-3">
                    <span className="relative h-14 w-14 shrink-0 border border-line bg-surface">
                      <Image
                        src={p.thumbnail || 'https://cdn.dummyjson.com/public/qr-code.png'}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </span>
                    <span className="min-w-0 grow">
                      <span className="block truncate font-medium group-hover:underline underline-offset-4">{p.title}</span>
                      <span className="block text-sm capitalize text-ink-soft">{p.category || 'Uncategorised'}</span>
                    </span>
                    <span className="font-display font-bold tabular-nums">${p.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="page">
        <dl className="grid divide-line border-t border-line sm:grid-cols-3 sm:divide-x">
          {facts.map((f) => (
            <div key={f.title} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="font-display font-semibold">{f.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

export async function getStaticProps() {
  try {
    await dbConnect();
    const docs = await Product.find({}).sort({ createdAt: -1 }).limit(4).lean();
    return { props: { latest: JSON.parse(JSON.stringify(docs)) }, revalidate: 10 };
  } catch (error) {
    console.error('Home data error:', error);
    return { props: { latest: [] }, revalidate: 10 };
  }
}
