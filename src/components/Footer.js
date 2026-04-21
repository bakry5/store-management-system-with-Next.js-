import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiGithub,
  FiSend,
  FiHeart
} from 'react-icons/fi';

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">B</span>
              </div>
              <span className="text-xl font-black tracking-tighter">
                Bakry<span className="text-purple-400">.</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Premium quality products delivered with speed and security.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-purple-500 hover:text-white transition-all">
                <FiFacebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-purple-500 hover:text-white transition-all">
                <FiTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-purple-500 hover:text-white transition-all">
                <FiInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-purple-500 hover:text-white transition-all">
                <FiGithub size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-sm font-semibold mb-4 text-purple-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-white/40 text-sm hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-sm font-semibold mb-4 text-purple-400 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {['FAQ', 'Privacy Policy', 'Terms of Service', 'Returns'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                    className="text-white/40 text-sm hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-sm font-semibold mb-4 text-purple-400 uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <FiMail className="text-purple-400" size={16} />
                <span>info@bakry.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <FiPhone className="text-purple-400" size={16} />
                <span>+20 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <FiMapPin className="text-purple-400" size={16} />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 rounded-lg"
              >
                <FiSend size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © {currentYear} Bakry. All rights reserved.
            </p>
            <p className="text-white/30 text-xs flex items-center gap-1">
              Made with <FiHeart size={10} className="text-pink-500" /> in Egypt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;