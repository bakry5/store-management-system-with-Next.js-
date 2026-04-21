import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("User Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mb-4 mx-auto"
            >
              <FiUserPlus size={28} className="text-purple-400" />
            </motion.div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-white/40 mt-2">Join us and start shopping today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiUser size={14} />
                Username
              </label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                placeholder="bakry_dev"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiMail size={14} />
                Email Address
              </label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                placeholder="name@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiLock size={14} />
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition pr-12"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-purple-400 transition"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                <FiLock size={14} />
                Confirm Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition pr-12"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-purple-400 transition"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 mt-6"
            >
              <FiUserPlus size={18} />
              Create Account
            </motion.button>

            <p className="text-center text-sm text-white/40 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-400 font-bold hover:text-purple-300 transition">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}