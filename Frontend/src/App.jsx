import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

import { LoadingProvider, useLoading } from './context/LoadingContext';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import ScrollToAnchor from './components/ScrollToAnchor';
import PageWrapper from './components/PageWrapper';
import RedirectOils from './components/RedirectOils';
import usePageTracking from './hooks/usePageTracking';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductCategory from './pages/ProductCategory';
import ProductOils from './pages/ProductOils';
import ProductCategoryPage from './pages/ProductCategoryPage';
import BatteryMarketplace from './pages/battery/BatteryMarketplace';
import IndustrialLanding from './pages/solutions/IndustrialLanding';
import DigitalLanding from './pages/solutions/DigitalLanding';
import CaFlowPage from './pages/solutions/CaFlowPage';

const OIL_CATEGORIES = [
  'heat-treatment',
  'fire-resistant',
  'cutting-coolants',
  'metal-forming',
  'industrial-cleaners',
  'rust-preventives',
  'die-casting',
];

const BATTERY_SUBCATEGORIES = [
  'pg-glands',
  'anderson-connectors',
  'epoxy-sheets',
  'terminal-blocks',
  'degson-connectors',
];

function AppShell() {
  const { isLoading, forceLoadComplete } = useLoading();
  const location = useLocation();
  usePageTracking();

  useEffect(() => {
    const timer = setTimeout(() => forceLoadComplete(), 8000);
    return () => clearTimeout(timer);
  }, [forceLoadComplete]);

  const outletKey = location.pathname.startsWith('/solutions/industrial/battery')
    ? '/solutions/industrial/battery'
    : location.pathname;

  return (
    <>
      {isLoading && <LoadingScreen />}
      <ScrollToTop />
      <ScrollToAnchor />
      <AnimatePresence mode="wait">
        <div key={outletKey} style={{ display: 'contents' }}>
          <Outlet />
        </div>
      </AnimatePresence>
    </>
  );
}

function Root() {
  return (
    <HelmetProvider>
      <LoadingProvider>
        <LazyMotion features={domAnimation}>
          <Outlet />
        </LazyMotion>
      </LoadingProvider>
    </HelmetProvider>
  );
}

export const routes = [
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            element: <AppShell />,
            children: [
              { index: true, element: <PageWrapper><Home /></PageWrapper> },
              { path: 'about', element: <PageWrapper><About /></PageWrapper> },
              { path: 'contact', element: <PageWrapper><Contact /></PageWrapper> },

              { path: 'solutions/industrial', element: <PageWrapper><IndustrialLanding /></PageWrapper> },
              { path: 'solutions/industrial/oils', element: <PageWrapper><ProductOils /></PageWrapper> },
              {
                path: 'solutions/industrial/oils/:categoryId',
                element: <PageWrapper><ProductCategoryPage /></PageWrapper>,
                getStaticPaths: () => OIL_CATEGORIES.map(id => `solutions/industrial/oils/${id}`),
              },
              { path: 'solutions/industrial/connectors', element: <PageWrapper><ProductCategory /></PageWrapper> },
              { path: 'solutions/industrial/battery', element: <PageWrapper><BatteryMarketplace /></PageWrapper> },
              {
                path: 'solutions/industrial/battery/:subcategoryId',
                element: <PageWrapper><BatteryMarketplace /></PageWrapper>,
                getStaticPaths: () => BATTERY_SUBCATEGORIES.map(id => `solutions/industrial/battery/${id}`),
              },
              {
                path: 'solutions/industrial/battery/:subcategoryId/:productId',
                element: <PageWrapper><BatteryMarketplace /></PageWrapper>,
              },

              { path: 'solutions/digital', element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'solutions/digital/software', element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'solutions/digital/ai', element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'solutions/digital/caflow', element: <PageWrapper><CaFlowPage /></PageWrapper> },

              { path: 'products', element: <Navigate to="/solutions/industrial" replace /> },
              { path: 'products/oils', element: <Navigate to="/solutions/industrial/oils" replace /> },
              { path: 'products/oils/:categoryId', element: <RedirectOils /> },
              { path: 'products/connectors', element: <Navigate to="/solutions/industrial/connectors" replace /> },
              { path: 'products/:category', element: <Navigate to="/solutions/industrial/connectors" replace /> },

              { path: '*', element: <PageWrapper><NotFound /></PageWrapper> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
