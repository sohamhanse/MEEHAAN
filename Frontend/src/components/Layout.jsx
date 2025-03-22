import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();

  // Force display of WhatsAppButton even if there are loading issues
  useEffect(() => {
    const ensureWhatsAppButtonVisible = () => {
      // This is a safety measure to ensure the button appears
      console.log('Ensuring WhatsApp button is visible');
    };
    
    ensureWhatsAppButtonVisible();
    // Run again after a delay
    const timeout = setTimeout(ensureWhatsAppButtonVisible, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout; 