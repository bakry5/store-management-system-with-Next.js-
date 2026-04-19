import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
    
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">B</span>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
            Bakry<span className="text-blue-600">.</span>
          </span>
        </Link>

     
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-600 transition">Products</Link></li>
            <li><Link href="/about" className="hover:text-blue-600 transition">About Us</Link></li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/contact" className="hover:text-blue-600 transition">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-blue-600 transition">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-600">Email: info@example.com</p>
          <p className="text-sm text-gray-600 mt-2">Phone: +20 123 456 789</p>
          <div className="flex gap-4 mt-4 text-gray-400">
          
          </div>
        </div>

      </div>

      <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;