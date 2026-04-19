import { useState } from 'react';
import ProductCard from "@/components/ProductCard";
import Link from 'next/link';

export default function Products({initialProducts }) {


  
  const [products, setProducts] = useState(initialProducts);

  const handleDeletedItem = (id) => {
    const filtered = products.filter(p => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div className="container mx-auto px-6 py-12">
     <div className='flex justify-between items-center '>
       <h1 className="text-4xl font-black mb-10">Manage Products</h1>
      <Link href="/products/add">
    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
      <span>+</span> Add New Product
    </button>
  </Link>
     </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard 
            key={item.id} 
            product={item} 
            onDelete={handleDeletedItem} 
          />
        ))}
      </div>
  
    </div>
  );
 
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:4000/products");
    const data = await res.json();
    return {
      props: { initialProducts: data || [] },
      revalidate: 1,
    };
  } catch (error) {
    return { props: { initialProducts: [] } };
  }
}