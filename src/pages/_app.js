// pages/_app.js
import "@/styles/globals.css"; // Import your global CSS
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import Footer from './Footer'; // Import the Footer component
import Navbar from './navbar'; // Import the Navbar component

function App({ Component, pageProps }) {
  const router = useRouter(); // Initialize useRouter
  const isLoginPage = router.pathname === '/'; // Check if the current route is the index page (login)

  return (
    <>
      {/* Render Navbar only if not on the login page */}
      {!isLoginPage && <Navbar />}
      <Component {...pageProps} />
      <Footer /> {/* Include the footer here */}
    </>
  );
}

export default App;