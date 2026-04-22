import "@/styles/globals.css";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { store } from "@/redux/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsToaster from "@/components/NewsToaster";
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps:{ session, ...pageProps }}) {

  if (Component.getLayout){
    return Component.getLayout(<Component {...pageProps} />)
  }
  return (
     <SessionProvider session={session}>
    <Provider store={store}>
      <Navbar />
   <NewsToaster />
      <Component {...pageProps} />
      <Footer/>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Provider>
    </SessionProvider>
  );
}


