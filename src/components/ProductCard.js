import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { MdEdit, MdDelete, MdRemoveRedEye, MdShoppingCart } from "react-icons/md";

const ProductCard = ({ product, onDelete }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/${id}`);
        onDelete(id);
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full relative"
    >
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push(`/products/edit/${product._id}`)}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
          title="Edit Product"
        >
          <MdEdit size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(product._id)}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
          title="Delete Product"
        >
          <MdDelete size={16} />
        </motion.button>
      </div>

      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <Image
          src={product.thumbnail || "/placeholder.png"}
          alt={product.title}
          fill
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
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ${product.price}
          </span>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/products/${product._id}`)}
            className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <MdRemoveRedEye size={18} />
            View
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
          >
            <MdShoppingCart size={18} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;