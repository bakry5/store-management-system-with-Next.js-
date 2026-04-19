export default function Contact() {
  return (
    <div className="bg-white text-gray-900">
      <section className="py-16 px-6 bg-slate-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Have a question or feedback? We'd love to hear from you. 
          Fill out the form below and our team will get back to you shortly.
        </p>
      </section>

 
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
      
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Sales</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                Send Message
              </button>
            </form>
          </div>

         
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ways to reach us</h2>
              <p className="text-gray-500 leading-relaxed">
                We are committed to providing our customers with the best possible service. 
                Our support team is available Monday through Friday.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <span className="text-3xl">📍</span>
                <div>
                  <h4 className="font-bold text-lg">Location</h4>
                  <p className="text-gray-500">123 Business Street, Mansoura, Egypt</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <span className="text-3xl">📞</span>
                <div>
                  <h4 className="font-bold text-lg">Phone</h4>
                  <p className="text-gray-500">+20 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <span className="text-3xl">✉️</span>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-gray-500">hello@brand.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}