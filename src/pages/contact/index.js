import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageCircle } from 'react-icons/fi';

export default function Contact() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="py-20 px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-purple-300 text-sm mb-6"
        >
          📬 Get in Touch
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          Have a question or feedback? We'd love to hear from you.
          Fill out the form below and our team will get back to you shortly.
        </p>
      </motion.section>

      <section className="py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-semibold text-purple-300 mb-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-semibold text-purple-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-purple-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-purple-300 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition">
                  <option className="bg-slate-900">General Inquiry</option>
                  <option className="bg-slate-900">Support</option>
                  <option className="bg-slate-900">Sales</option>
                </select>
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-semibold text-purple-300 mb-2">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition resize-none"
                ></textarea>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={fadeUp}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
              >
                <FiSend size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col justify-center space-y-10"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4">
                Ways to reach us
              </h2>
              <p className="text-white/50 leading-relaxed">
                We are committed to providing our customers with the best possible service.
                Our support team is available Monday through Friday.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-5 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <FiMapPin className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Location</h4>
                  <p className="text-white/40">123 Business Street, Mansoura, Egypt</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-5 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <FiPhone className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Phone</h4>
                  <p className="text-white/40">+201507882744</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-5 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <FiMail className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Email</h4>
                  <p className="text-white/40">mohamed.medhat23000@gmail.com</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}