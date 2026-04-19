import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();


  const isActive = (path) => router.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">B</span>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
            Bakry<span className="text-blue-600">.</span>
          </span>
        </Link>

    
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
          <li>
            <Link href="/" className={`${isActive('/') ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition`}>
              HOME
            </Link>
          </li>
          <li>
            <Link href="/products" className={`${isActive('/products') ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition`}>
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`${isActive('/contact') ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition`}>
              CONTACT
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition">
            Login
          </Link>
          <Link href="/register">
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 active:scale-95">
              Sign Up
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;