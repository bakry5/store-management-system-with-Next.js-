import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
   
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        
   
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to manage your account</p>
        </div>

 
        <form onSubmit={handleLogin} className="space-y-6">
       
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 cursor-pointer">Remember me</label>
          </div>

        
          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all transform hover:scale-[1.02] shadow-lg shadow-gray-200"
          >
            Sign In
          </button>

      
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Register now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}