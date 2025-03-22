import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductCategory from './pages/ProductCategory';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/LoadingScreen';
import { useLoading } from './context/LoadingContext';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollToAnchor from './components/ScrollToAnchor';
import { useEffect } from 'react';

function App() {
  const { isLoading, forceLoadComplete } = useLoading();
  
  // Super emergency fallback - should never be needed
  useEffect(() => {
    console.log("App component mounted");
    
    // Extended timeout as absolute last resort
    const timer = setTimeout(() => {
      console.log("Emergency timeout in App component");
      forceLoadComplete();
    }, 8000); // Much longer than needed - just insurance
    
    return () => clearTimeout(timer);
  }, [forceLoadComplete]);
  
  return (
    <>
      {isLoading && <LoadingScreen />}
      <ScrollToTop />
      <ScrollToAnchor />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:category" element={<ProductCategory />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* Fallback WhatsApp button in case it doesn't render in Layout */}
      <WhatsAppButton />
    </>
  );
}

export default App;
