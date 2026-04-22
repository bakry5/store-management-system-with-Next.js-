import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiImage, FiTag, FiAlignLeft, FiPackage, FiDollarSign } from 'react-icons/fi';

export default function AddProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: '', 
    price: '', 
    description: '', 
    category: '',
    thumbnail: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/products', product);
      router.push('/products');
    } catch (error) {
      alert("Error adding product");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/products')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft size={20} />
          Back to Products
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mb-4">
              <FiPackage size={32} className="text-purple-400" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Create New Product
            </h1>
            <p className="text-white/40 mt-2">Add a new product to your catalog</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
          

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiTag size={16} />
                Product Title
              </label>
              <input 
                type="text" 
                required 
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition" 
                placeholder="Enter product title"
                onChange={e => setProduct({...product, title: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                  <FiDollarSign size={16} />
                  Price
                </label>
                <input 
                  type="number" 
                  required 
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition" 
                  placeholder="0.00"
                  onChange={e => setProduct({...product, price: e.target.value})} 
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                  <FiTag size={16} />
                  Category
                </label>
                <input 
                  type="text" 
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition" 
                  placeholder="e.g., Electronics, Clothing"
                  onChange={e => setProduct({...product, category: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiAlignLeft size={16} />
                Description
              </label>
              <textarea 
                rows="4" 
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition resize-none" 
                placeholder="Describe your product..."
                onChange={e => setProduct({...product, description: e.target.value})}
              ></textarea>
            </div>

       

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave size={18} />
                  Save Product
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}