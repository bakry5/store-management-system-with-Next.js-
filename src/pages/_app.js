import "@/styles/globals.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { store } from "@/redux/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsToaster from "@/components/NewsToaster";
import { SessionProvider } from "next-auth/react";

const head = Archivo({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["600", "700", "800"],
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const fontClasses = `${head.variable} ${body.variable} font-sans`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.getLayout) {
    return <div className={fontClasses}>{Component.getLayout(<Component {...pageProps} />)}</div>;
  }
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className={`${fontClasses} flex min-h-screen flex-col`}>
          <Navbar />
          <NewsToaster />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </Provider>
    </SessionProvider>
  );
}
