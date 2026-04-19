import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-blue-600 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link href="/">
        <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
          Back to Home
        </button>
      </Link>
    </div>
  );
}


Custom404.getLayout = (page) => page;