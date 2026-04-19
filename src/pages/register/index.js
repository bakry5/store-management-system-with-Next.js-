import { useState } from 'react';

export default function Register() {
 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
   
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us and start shopping today</p>
        </div>

    
        <form onSubmit={handleSubmit} className="space-y-5">
          
     
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="bakry_dev"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

        
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="name@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

        
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

    
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

        
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-100"
          >
            Create Account
          </button>

       
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}