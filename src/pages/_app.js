import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

 
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
} 