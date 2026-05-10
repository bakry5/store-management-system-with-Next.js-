import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, product);
      router.push('/products');
    } catch (error) {
      alert('Update failed');
    }
  };

  if (loading) return <p className="page py-16 text-ink-soft">Loading product…</p>;

  if (!product) {
    return (
      <div className="page py-16">
        <h1 className="h-page">Product not found</h1>
        <Link href="/products" className="btn btn-outline mt-6">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="page max-w-2xl py-10 sm:py-14">
      <Link href="/products" className="btn-text">← All products</Link>
      <h1 className="h-page mt-6">Edit product</h1>
      <p className="mt-2 text-ink-soft">{product.title}</p>

      <form onSubmit={handleUpdate} className="panel mt-8 space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input
            id="title"
            type="text"
            required
            value={product.title}
            className="field"
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="price" className="label">Price (USD)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            required
            value={product.price}
            className="field tabular-nums sm:max-w-48"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            rows={5}
            required
            value={product.description}
            className="field resize-y"
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="btn btn-primary px-6">Save changes</button>
          <Link href="/products" className="btn-text">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
