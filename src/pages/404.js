import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiHelpCircle } from 'react-icons/fi';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tighter">
          404
        </h1>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-4xl md:text-5xl"
        >
          😕
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-6">Page Not Found</h2>
        <p className="text-white/50 mt-3 max-w-md leading-relaxed">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mt-10"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center gap-2"
          >
            <FiHome size={18} />
            Back to Home
          </motion.button>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20"
        >
          <FiArrowLeft size={18} />
          Go Back
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex gap-2 text-white/30 text-sm"
      >
        <FiHelpCircle size={14} />
        <span>Need help? </span>
        <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition">
          Contact Support
        </Link>
      </motion.div>
    </div>
  );
}

Custom404.getLayout = (page) => page;