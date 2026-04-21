import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '@/redux/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiTruck, FiShield } from 'react-icons/fi';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm p-12 rounded-3xl mb-8 border border-white/10"
        >
          <span className="text-8xl">🛒</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4"
        >
          Your cart is empty
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 max-w-sm mb-10 text-lg"
        >
          Looks like you haven't added anything to your cart yet. Start exploring our latest products!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/products">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              <FiShoppingBag size={20} />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Your Bag
                </h1>
                <p className="text-white/40 mt-1">{cartItems.length} items</p>
              </div>
              <button 
                onClick={() => dispatch(clearCart())}
                className="text-white/40 hover:text-red-400 text-sm font-semibold transition-colors flex items-center gap-1"
              >
                <FiTrash2 size={14} />
                Clear all
              </button>
            </motion.div>

            <AnimatePresence>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl overflow-hidden">
                        <Image 
                          src={item.thumbnail} 
                          alt={item.title} 
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-lg font-bold text-white hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-purple-400 font-bold text-lg mt-1">${item.price}</p>
                      </div>

                      <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                        <button 
                          onClick={() => dispatch(decrementQuantity(item._id))}
                          className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="font-bold text-white min-w-[30px] text-center">{item.qty}</span>
                        <button 
                          onClick={() => dispatch(incrementQuantity(item._id))}
                          className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg hover:bg-green-500/20 hover:text-green-400 transition-all"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      <div className="font-black text-white text-xl min-w-[80px] text-right">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>

                      <button 
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="p-2 text-white/30 hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          <div className="lg:w-[380px]">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 sticky top-32"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : "text-white/60"}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 50 && (
                  <div className="text-xs text-purple-400 text-center pt-2">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold text-white/80">Total</span>
                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
              >
                Checkout <FiArrowRight size={18} />
              </motion.button>

              <div className="mt-6 flex justify-center gap-4 text-xs text-white/30">
                <div className="flex items-center gap-1">
                  <FiTruck size={12} />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiShield size={12} />
                  <span>Secure Payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}