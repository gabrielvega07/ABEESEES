// src/components/Layout.js
import { useRouter } from 'next/router';
import Navbar from './navbar'; // Import your Navbar component

const Layout = ({ children }) => {
  const router = useRouter();
  
  // Check if the current route is the login page
  const isLoginPage = router.pathname === '/index';

  return (
    <div>
      {/* Render Navbar only if not on the login page */}
      {!isLoginPage && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;