import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { MdRemoveRedEye, MdLockOpen } from "react-icons/md"; 
import { useSession, signIn } from "next-auth/react";

const ProductCardWithOUtAuth = ({ product }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full relative"
    >
    
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <Image
          src={product.thumbnail || "https://cdn.dummyjson.com/public/qr-code.png"}
          alt={product.title}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
          {product.category || 'Premium'}
        </span>

        <h3 className="text-lg font-bold text-white hover:text-purple-400 transition-colors line-clamp-1 mb-2">
          {product.title}
        </h3>

       
        <p className="text-white/50 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
          {session 
            ? (product.description || 'No description available') 
            : 'Login to unlock full product specifications and exclusive details.'}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ${product.price}
          </span>
        </div>

   
        <div className="flex">
          {session ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/products/${product._id}`)}
              className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <MdRemoveRedEye size={18} />
              View Details
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn()}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <MdLockOpen size={18} />
              Login to see more
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardWithOUtAuth;