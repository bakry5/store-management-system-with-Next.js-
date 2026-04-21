import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiUser, 
  FiHeart,
  FiMenu, 
  FiX,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const navLinks = [
    { name: 'Home', path: '/', icon: FiHeart },
    { name: 'Products', path: '/products', icon: FiShoppingBag },
    { name: 'contact', path: '/contact', icon: FiUser },
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 } 
    }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-2xl"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            
            <Link href="/" className="group flex items-center gap-2">
              <motion.div 
                whileH={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25"
              >
                <span className="text-white font-black text-2xl">B</span>
              </motion.div>
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Bakry<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">.</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg
                      ${router.pathname === link.path 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                  >
                    <link.icon size={16} />
                    {link.name}
                  </motion.span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              <Link href="/cart">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl cursor-pointer border border-purple-500/30"
                >
                  <FiShoppingBag className="w-5 h-5 text-purple-300" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>

              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>

              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
              >
                <FiMenu size={24} className="text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <span className="text-2xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Bakry.</span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <FiX size={24} className="text-white" />
                </motion.button>
              </div>
              
              <div className="flex-1 py-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={link.path}>
                      <div 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-6 py-4 mx-4 rounded-xl transition-all
                          ${router.pathname === link.path 
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' 
                            : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      >
                        <link.icon size={22} />
                        <span className="font-semibold">{link.name}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 space-y-3">
                <Link href="/login">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 text-center font-semibold text-white/80 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 text-center font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}