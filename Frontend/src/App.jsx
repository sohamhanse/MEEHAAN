import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ProductCategory from './pages/ProductCategory';
import ProductOils from './pages/ProductOils';
import ProductCategoryPage from './pages/ProductCategoryPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/LoadingScreen';
import { useLoading } from './context/LoadingContext';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollToAnchor from './components/ScrollToAnchor';
import { useEffect } from 'react';
import usePageTracking from './hooks/usePageTracking';

import BatteryMarketplace from './pages/battery/BatteryMarketplace';
import IndustrialLanding from './pages/solutions/IndustrialLanding';
import DigitalLanding from './pages/solutions/DigitalLanding';
import CaFlowPage from './pages/solutions/CaFlowPage';
import RedirectOils from './components/RedirectOils';
import PageWrapper from './components/PageWrapper';

function App() {
  const { isLoading, forceLoadComplete } = useLoading();
  const location = useLocation();
  usePageTracking();

  // Super emergency fallback - should never be needed
  useEffect(() => {
    const timer = setTimeout(() => {
      forceLoadComplete();
    }, 8000);
    return () => clearTimeout(timer);
  }, [forceLoadComplete]);
  
  return (
    <>
      {isLoading && <LoadingScreen />}
      <ScrollToTop />
      <ScrollToAnchor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname.startsWith('/solutions/industrial/battery') ? '/solutions/industrial/battery' : location.pathname}>
          <Route path="/" element={<Layout />}>
            {/* HOME */}
            <Route index element={<PageWrapper><Home /></PageWrapper>} />

            {/* ABOUT & CONTACT */}
            <Route path="about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />

            {/* SOLUTIONS - INDUSTRIAL */}
            <Route path="solutions/industrial" element={<PageWrapper><IndustrialLanding /></PageWrapper>} />
            <Route path="solutions/industrial/oils" element={<PageWrapper><ProductOils /></PageWrapper>} />
            <Route path="solutions/industrial/oils/:categoryId" element={<PageWrapper><ProductCategoryPage /></PageWrapper>} />
            <Route path="solutions/industrial/connectors" element={<PageWrapper><ProductCategory /></PageWrapper>} />
            <Route path="solutions/industrial/battery" element={<PageWrapper><BatteryMarketplace /></PageWrapper>} />
            <Route path="solutions/industrial/battery/:subcategoryId" element={<PageWrapper><BatteryMarketplace /></PageWrapper>} />
            <Route path="solutions/industrial/battery/:subcategoryId/:productId" element={<PageWrapper><BatteryMarketplace /></PageWrapper>} />

            {/* SOLUTIONS - DIGITAL */}
            <Route path="solutions/digital" element={<PageWrapper><DigitalLanding /></PageWrapper>} />
            <Route path="solutions/digital/software" element={<PageWrapper><DigitalLanding /></PageWrapper>} />
            <Route path="solutions/digital/ai" element={<PageWrapper><DigitalLanding /></PageWrapper>} />
            <Route path="solutions/digital/caflow" element={<PageWrapper><CaFlowPage /></PageWrapper>} />

            {/* LEGACY REDIRECTS — keep old URLs working */}
            <Route path="products" element={<Navigate to="/solutions/industrial" replace />} />
            <Route path="products/oils" element={<Navigate to="/solutions/industrial/oils" replace />} />
            <Route path="products/oils/:categoryId" element={<RedirectOils />} />
            <Route path="products/connectors" element={<Navigate to="/solutions/industrial/connectors" replace />} />
            {/* Some old URLs might be just /products/:category */}
            <Route path="products/:category" element={<Navigate to="/solutions/industrial/connectors" replace />} />

            {/* 404 */}
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Route>
        </Routes>
      </AnimatePresence>
      <WhatsAppButton />
    </>
  );
}

export default App;
