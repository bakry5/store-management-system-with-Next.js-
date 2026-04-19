import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AddProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    thumbnail: "https://cdn.dummyjson.com/public/qr-code.png", 
    category: 'General'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post("http://localhost:4000/products", product);
      alert("Product Added Successfully! 🚀");
      router.push('/products'); 
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Add New Product</h2>
        <p className="text-gray-500 mb-8">Fill the details to list a new item in your store.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. iPhone 15 Pro"
              onChange={(e) => setProduct({...product, title: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input 
                type="number" 
                required
                placeholder="999"
                onChange={(e) => setProduct({...product, price: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <input 
                type="text" 
                placeholder="Electronics"
                onChange={(e) => setProduct({...product, category: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea 
              rows="3"
              required
              placeholder="Describe your product..."
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 mt-4"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}