import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({ title: '', price: '', description: '' });

 
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:4000/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/products/${id}`, product);
      alert("Product Updated Successfully! ✅");
      router.push('/products');
    } catch (error) {
      alert("Error updating product");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading Data...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 mb-8">Edit Product</h2>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
            <input 
              type="text" 
              value={product.title}
              onChange={(e) => setProduct({...product, title: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
            <input 
              type="number" 
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea 
              rows="4"
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="flex-grow bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
            >
              Update Product
            </button>
            <button 
              type="button"
              onClick={() => router.push('/products')}
              className="px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}