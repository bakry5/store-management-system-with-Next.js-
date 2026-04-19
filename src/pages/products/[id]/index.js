import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);


  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-200 h-[400px] rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20">Product Not Found</div>;

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <button 
            onClick={() => router.back()} 
            className="text-sm font-bold text-gray-500 hover:text-blue-600 transition flex items-center gap-2"
          >
            ← Back to Gallery
          </button>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
      
          <div className="space-y-4">
            <div className="relative h-[500px] w-full bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 group">
              <Image 
                src={product.thumbnail} 
                alt={product.title} 
                fill 
                className="object-contain p-10 group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
         
            <div className="grid grid-cols-4 gap-4">
              {product.images?.slice(0, 4).map((img, index) => (
                <div key={index} className="relative h-24 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-blue-500 transition">
                  <Image src={img} alt="gallery" fill className="object-cover p-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2 block">
                {product.brand || 'Premium Collection'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.round(product.rating))}
                  <span className="text-gray-300">{"★".repeat(5 - Math.round(product.rating))}</span>
                </div>
                <span className="text-sm text-gray-400 font-medium">({product.rating} Customer Reviews)</span>
              </div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-black text-blue-600">${product.price}</span>
                <span className="text-gray-400 line-through text-lg mb-1">
                  ${Math.round(product.price * 1.2)}
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  SAVE {product.discountPercentage}%
                </span>
              </div>
              <p className="text-sm text-gray-400 italic">Tax included. Free shipping on orders over $100.</p>
            </div>

          
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-grow bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200">
                Add to Cart
              </button>
              <button className="bg-white border-2 border-gray-200 p-5 rounded-2xl hover:bg-gray-50 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

        
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
              <div>
                <h4 className="font-bold text-gray-900">Availability</h4>
                <p className="text-sm text-green-600 font-medium">{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Category</h4>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}