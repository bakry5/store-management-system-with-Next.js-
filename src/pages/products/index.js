import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiPackage, FiTrash2, FiEdit } from 'react-icons/fi';
import ProductCard from "@/components/ProductCard";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ProductCardWithOUtAuth from '@/components/ProductCardWithOUtAuth';

export default function Products({ initialProducts }) {
  const {data:session}=useSession()
  const [products, setProducts] = useState(initialProducts);

  const handleDeletedItem = (id) => {
    const filtered = products.filter(p => p._id !== id);
    setProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Manage Products
            </h1>
            <p className="text-white/50 mt-2">Manage your product catalog</p>
          </div>
          
          {session? <Link href="/products/add">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2 shadow-lg"
            >
              <FiPlus size={20} />
              Add New Product
            </motion.button>
          </Link>:null}
        </motion.div>

        <AnimatePresence>
          {products.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
             {session? products.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard 
                    product={item} 
                    onDelete={handleDeletedItem} 
                  />
                </motion.div>
              )): products.slice(0,3).map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCardWithOUtAuth 
                    product={item} 
                    
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-full mb-6">
                <FiPackage size={48} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
              <p className="text-white/50 mb-6">Start adding some amazing products!</p>
              <Link href="/products/add">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2"
                >
                  <FiPlus size={20} />
                  Add Your First Product
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();

    return {
      props: { 
        initialProducts: JSON.parse(JSON.stringify(data)) || [] 
      },
      revalidate: 1
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { initialProducts: [] } };
  }
}