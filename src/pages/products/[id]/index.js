import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingBag, FiHeart, FiTruck, FiRefreshCw, FiStar } from 'react-icons/fi';
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
        .then(res => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching product", err);
          setLoading(false);
        });
    }
  }, [id, initialProduct, router.isFallback]);

  if (router.isFallback || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found!</h2>
          <Link href="/products">
            <button className="text-purple-400 hover:text-purple-300">Back to Shop</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        <Link href="/products">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 font-semibold"
          >
            <FiArrowLeft size={20} />
            Back to Shop
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 w-full"
          >
            <div className="relative h-[400px] md:h-[500px] w-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl overflow-hidden border border-white/10">
              <Image 
                src={product.thumbnail || "https://cdn.dummyjson.com/public/qr-code.png"} 
                alt={product.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6"
          >
            <div className="space-y-3">
              <span className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-4 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wider border border-purple-500/30">
                {product.category || 'Premium Product'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <span className="text-green-400 font-semibold bg-green-500/10 px-3 py-1 rounded-lg text-sm border border-green-500/20">
                  In Stock
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white/40 text-sm ml-2">(128 reviews)</span>
              </div>
            </div>

            <p className="text-lg text-white/60 leading-relaxed">
              {product.description}
            </p>

            <div className="flex gap-3 gap-y-4 flex-wrap pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <FiTruck size={18} />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <FiRefreshCw size={18} />
                <span>30-Day Returns</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => dispatch(addToCart(product))}
                className="flex-grow bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-3"
              >
                <FiShoppingBag size={20} />
                Add to Cart — ${product.price}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-white/5 border border-white/10 text-white/60 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
              >
                <FiHeart size={22} />
              </motion.button>
            </div>
          </motion.div>
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