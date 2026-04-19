
import { Geist } from "next/font/google";
import Link from "next/link";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} flex flex-col min-h-screen bg-white text-gray-900`}>
    


      <main className="grow">
     
        <section className="py-24 px-6 text-center bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Elevate Your <span className="text-blue-600">Digital Experience</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore our premium collection of products designed specifically for your needs. Quality and speed guaranteed.
            </p>   
            <div    className="flex flex-col sm:flex-row justify-center gap-5">
              <Link  href="/products" className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition shadow-xl">
                Shop Now
              </Link>
              <button className="bg-white text-gray-900 border border-gray-200 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

    
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg text-2xl">⚡</div>
              <h3 className="text-2xl font-bold">Fast Delivery</h3>
              <p className="text-gray-500">We ensure that your orders reach your doorstep in record time, anywhere in the world.</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg text-2xl">🔒</div>
              <h3 className="text-2xl font-bold">Secure Payment</h3>
              <p className="text-gray-500">Multiple secure payment gateways to keep your transactions safe and encrypted.</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg text-2xl">⭐</div>
              <h3 className="text-2xl font-bold">Premium Quality</h3>
              <p className="text-gray-500">Hand-picked products that meet the highest international standards of excellence.</p>
            </div>
          </div>
        </section>

      
        <section className="mb-24 px-6">
          <div className="max-w-6xl mx-auto bg-blue-600 rounded-[2rem] py-16 px-8 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-blue-100 text-lg mb-10">Join thousands of happy customers and get 10% off your first order.</p>
            <button className="bg-white text-blue-600 px-12 py-4 rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-2xl">
              Create Account
            </button>
          </div>
        </section>
      </main>

    </div>
  );
}