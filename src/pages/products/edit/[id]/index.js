import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiImage, FiTag, FiAlignLeft } from 'react-icons/fi';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then(res => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch(err => {
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
      alert("Update failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
      />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
        <button onClick={() => router.push('/products')} className="text-purple-400">Back to Products</button>
      </div>
    </div>
  );

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
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-2">
            Edit Product
          </h1>
          <p className="text-white/40 mb-8">Update your product information</p>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiTag size={16} />
                Product Title
              </label>
              <input
                type="text"
                value={product.title}
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                onChange={e => setProduct({...product, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiTag size={16} />
                Price
              </label>
              <input
                type="number"
                value={product.price}
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                onChange={e => setProduct({...product, price: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiAlignLeft size={16} />
                Description
              </label>
              <textarea
                value={product.description}
                rows={5}
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition resize-none"
                onChange={e => setProduct({...product, description: e.target.value})}
                required
              />
            </div>

            <div>
             
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <FiSave size={18} />
              Update Changes
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}