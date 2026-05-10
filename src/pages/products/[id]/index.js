import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default function ProductDetails({ product: initialProduct }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  const { id } = router.query;

  useEffect(() => {
    if (router.isFallback) return;
    if (id && !initialProduct) {
      setLoading(true);
      axios.get(`/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product", err);
          setLoading(false);
        });
    }
  }, [id, initialProduct, router.isFallback]);

  if (router.isFallback || loading) {
    return <p className="page py-16 text-ink-soft">Loading product…</p>;
  }

  if (!product) {
    return (
      <div className="page py-16">
        <h1 className="h-page">Product not found</h1>
        <p className="mt-2 text-ink-soft">It may have been removed.</p>
        <Link href="/products" className="btn btn-outline mt-6">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="page py-10 sm:py-14">
      <Link href="/products" className="btn-text">← All products</Link>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <div className="panel relative aspect-square w-full overflow-hidden">
          <Image
            src={product.thumbnail || "https://cdn.dummyjson.com/public/qr-code.png"}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>

        <div>
          <p className="text-sm capitalize text-ink-soft">{product.category || 'Uncategorised'}</p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-4 font-display text-3xl font-bold tabular-nums">${product.price}</p>

          <p className="mt-6 max-w-[60ch] leading-relaxed text-ink-soft">
            {product.description || 'No description yet.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="btn btn-primary px-6 py-3"
            >
              Add to cart
            </button>
            <Link href={`/products/edit/${product._id}`} className="btn btn-outline px-6 py-3">
              Edit
            </Link>
          </div>

          <p className="mt-6 border-t border-line pt-4 text-sm text-ink-soft">
            Free shipping on orders over $50.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    await dbConnect(); 
    const products = await Product.find({}, { _id: 1 }).lean(); 
    
    const paths = products.map((product) => ({
      params: { id: product._id.toString() },
    }));
    
    return {
      paths,
      fallback: 'blocking', 
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: 'blocking' };
  }
}
export async function getStaticProps(context) {
  try {
    const { params } = context;
    await dbConnect(); 
    
    const data = await Product.findById(params.id).lean();

    if (!data) {
      return { notFound: true };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(data)),
      },
      revalidate: 10, 
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
}