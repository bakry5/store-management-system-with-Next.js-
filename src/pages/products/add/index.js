import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function AddProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    thumbnail: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/products', product);
      router.push('/products');
    } catch (error) {
      alert('Error adding product');
      setLoading(false);
    }
  };

  return (
    <div className="page max-w-2xl py-10 sm:py-14">
      <Link href="/products" className="btn-text">← All products</Link>
      <h1 className="h-page mt-6">New product</h1>
      <p className="mt-2 text-ink-soft">It appears in the catalogue as soon as you save.</p>

      <form onSubmit={handleSubmit} className="panel mt-8 space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input
            id="title"
            type="text"
            required
            className="field"
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="label">Price (USD)</label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              className="field tabular-nums"
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="category" className="label">Category</label>
            <input
              id="category"
              type="text"
              placeholder="e.g. beauty"
              className="field"
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            rows="4"
            className="field resize-y"
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" disabled={loading} className="btn btn-primary px-6">
            {loading ? 'Saving…' : 'Save product'}
          </button>
          <Link href="/products" className="btn-text">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
