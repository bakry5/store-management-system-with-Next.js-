import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

const ProductCard = ({ product, onDelete }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product? This cannot be undone.')) {
      try {
        await axios.delete(`/api/products/${id}`);
        onDelete(id);
      } catch (error) {
        console.error('Delete Error:', error);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <li className="grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-3 border-b border-line py-4 sm:grid-cols-[64px_1fr_auto_auto]">
      <Link href={`/products/${product._id}`} className="relative h-16 w-16 border border-line bg-surface">
        <Image
          src={product.thumbnail || 'https://cdn.dummyjson.com/public/qr-code.png'}
          alt={product.title}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </Link>

      <div className="min-w-0">
        <Link href={`/products/${product._id}`} className="block truncate font-medium hover:underline underline-offset-4">
          {product.title}
        </Link>
        <p className="mt-0.5 text-sm capitalize text-ink-soft">{product.category || 'Uncategorised'}</p>
      </div>

      <p className="font-display text-lg font-bold tabular-nums sm:text-right">${product.price}</p>

      <div className="col-span-2 flex items-center gap-4 sm:col-span-1 sm:justify-end">
        <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary btn-sm">
          Add to cart
        </button>
        <button onClick={() => router.push(`/products/edit/${product._id}`)} className="btn-text">
          Edit
        </button>
        <button onClick={() => handleDelete(product._id)} className="btn-text-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
