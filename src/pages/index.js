import { Geist } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiZap, FiShield, FiStar, FiArrowRight, FiTruck, FiCreditCard, FiAward } from "react-icons/fi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className={`${geistSans.className} flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white`}>
      <main className="grow">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="py-32 px-6 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6"
            >
              ✨ Welcome to the future
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Elevate Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Digital Experience</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore our premium collection of products designed specifically for your needs. Quality and speed guaranteed.
            </p>   
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  Shop Now <FiArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiTruck, title: "Fast Delivery", desc: "We ensure that your orders reach your doorstep in record time, anywhere in the world.", color: "from-purple-500 to-pink-500" },
              { icon: FiCreditCard, title: "Secure Payment", desc: "Multiple secure payment gateways to keep your transactions safe and encrypted.", color: "from-blue-500 to-cyan-500" },
              { icon: FiAward, title: "Premium Quality", desc: "Hand-picked products that meet the highest international standards of excellence.", color: "from-orange-500 to-red-500" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="text-white text-2xl" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24 px-6"
        >
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-[2rem] py-16 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6"
              >
                🎉 Limited Time Offer
              </motion.div>
              <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-purple-100 text-lg mb-10">Join thousands of happy customers and get 10% off your first order.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-12 py-4 rounded-full font-black uppercase tracking-wider hover:shadow-2xl transition-all duration-300"
              >
                Create Account
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}