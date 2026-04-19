import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";


const ProductCard = ({ product, onDelete }) => {
  const router = useRouter();

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:4000/products/${id}`);
        onDelete(id); 
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full relative">
      
      
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={() => router.push(`/products/edit/${product.id}`)}
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition"
          title="Edit Product"
        >
<MdEdit />
        </button>
        
        <button 
          onClick={() => handleDelete(product.id)}
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-red-600 hover:bg-red-600 hover:text-white transition"
          title="Delete Product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="relative h-48 w-full bg-gray-50">
        <Image src={product.thumbnail || "/placeholder.png"} alt={product.title} fill className="object-contain p-4" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 line-clamp-1 mb-2">{product.title}</h3>
        <p className="text-2xl font-black text-blue-600 mt-auto">${product.price}</p>
        
        <div className="grid grid-cols-1 mt-4 gap-2">
          <button 
            onClick={() => router.push(`/products/${product.id}`)}
            className="w-full py-2 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-black transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;