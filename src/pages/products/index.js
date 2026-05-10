import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import ProductCard from '@/components/ProductCard';
import ProductCardWithOUtAuth from '@/components/ProductCardWithOUtAuth';
import SearchBar from '@/components/SearchBar';
import Product from '@/models/Product';
import dbConnect from '@/lib/mongodb';

export default function Products({ initialProducts }) {
  const { data: session } = useSession();
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleDeletedItem = (id) => {
    const remaining = products.filter((p) => p._id !== id);
    setProducts(remaining);
    setFilteredProducts(remaining);
  };

  const guestLimit = 3;

  return (
    <div className="page py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="h-page">Products</h1>
          <p className="mt-2 text-ink-soft">
            {session
              ? `${filteredProducts.length} of ${products.length} shown`
              : `${products.length} in the catalogue`}
          </p>
        </div>
        {session && (
          <Link href="/products/add" className="btn btn-primary self-start sm:self-auto">
            Add product
          </Link>
        )}
      </div>

      {session && (
        <div className="mt-8">
          <SearchBar
            data={products}
            onFilter={setFilteredProducts}
            placeholder="Search by name, description or category"
            searchKeys={['title', 'description', 'category']}
          />
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="mt-12 border border-dashed border-line px-6 py-16 text-center">
          <h2 className="font-display text-xl font-semibold">
            {products.length === 0 ? 'No products yet' : 'Nothing matches that search'}
          </h2>
          <p className="mx-auto mt-2 max-w-[44ch] text-ink-soft">
            {products.length === 0
              ? 'Add the first product to start the catalogue.'
              : 'Try a different name or category.'}
          </p>
          {session && products.length === 0 && (
            <Link href="/products/add" className="btn btn-primary mt-6">
              Add product
            </Link>
          )}
        </div>
      ) : session ? (
        <ul className="mt-6 border-t border-ink">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} product={item} onDelete={handleDeletedItem} />
          ))}
        </ul>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.slice(0, guestLimit).map((item) => (
              <ProductCardWithOUtAuth key={item._id} product={item} />
            ))}
          </div>
          {products.length > guestLimit && (
            <p className="mt-8 text-sm text-ink-soft">
              Showing {guestLimit} of {products.length} products.{' '}
              <button onClick={() => signIn()} className="font-medium text-ink underline underline-offset-4">
                Sign in
              </button>{' '}
              to see the full catalogue.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
   
    await dbConnect();
    
   
    const products = await Product.find({}).lean();

    return {
      props: { 
        
        initialProducts: JSON.parse(JSON.stringify(products)) || [] 
      },
     
      revalidate: 1 
    };
  } catch (error) {
    console.error("Database error:", error);
    return { props: { initialProducts: [] } };
  }
}
