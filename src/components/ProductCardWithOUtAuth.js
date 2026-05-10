import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

const ProductCardWithOUtAuth = ({ product }) => {
  const { data: session } = useSession();

  return (
    <article className="panel flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] border-b border-line bg-surface">
        <Image
          src={product.thumbnail || 'https://cdn.dummyjson.com/public/qr-code.png'}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-5"
        />
      </div>

      <div className="flex grow flex-col p-4">
        <p className="text-sm capitalize text-ink-soft">{product.category || 'Uncategorised'}</p>
        <h3 className="mt-1 line-clamp-1 font-display font-semibold">{product.title}</h3>
        <p className="mt-2 line-clamp-2 grow text-sm leading-relaxed text-ink-soft">
          {session ? product.description || 'No description yet.' : 'Sign in to read the full description.'}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-lg font-bold tabular-nums">${product.price}</span>
          {session ? (
            <Link href={`/products/${product._id}`} className="btn btn-outline btn-sm">
              View details
            </Link>
          ) : (
            <button onClick={() => signIn()} className="btn btn-primary btn-sm">
              Sign in to see more
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCardWithOUtAuth;
