import { Outlet, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

const IS_DIGITAL_SITE = import.meta.env.VITE_SITE === 'digital';

import { LoadingProvider, useLoading } from './context/LoadingContext';
import Layout from './components/Layout';
import DigitalLayout from './components/DigitalLayout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import ScrollToAnchor from './components/ScrollToAnchor';
import PageWrapper from './components/PageWrapper';
import RedirectOils from './components/RedirectOils';
import usePageTracking from './hooks/usePageTracking';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import ProductCategory from './pages/ProductCategory';
import ProductOils from './pages/ProductOils';
import ProductCategoryPage from './pages/ProductCategoryPage';
import BatteryMarketplace from './pages/battery/BatteryMarketplace';
import IndustrialLanding from './pages/solutions/IndustrialLanding';
import DigitalLanding from './pages/solutions/DigitalLanding';
import CaFlowPage from './pages/solutions/CaFlowPage';
import DigitalProductsPage from './pages/solutions/DigitalProductsPage';
import DigitalProductPage from './pages/solutions/DigitalProductPage';
import ApplyPage from './pages/solutions/ApplyPage';

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

const DIGITAL_PRODUCTS_SLUGS = [
  'horizontal-ai-agents',
  'voice-intake-concierge',
  'contact-center-intelligence',
  'legal-recovery-ai',
  'facility-operations-ai',
  'ai-native-lms',
  'caflow-practice-management',
  'website-builder-ai',
  'exit-concierge',
];

function AppShell() {
  const { isLoading, forceLoadComplete } = useLoading();
  usePageTracking();

  useEffect(() => {
    forceLoadComplete();
  }, [forceLoadComplete]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <ScrollToTop />
      <ScrollToAnchor />
      <Outlet />
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

const digitalRoutes = [
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <DigitalLayout />,
        children: [
          {
            element: <AppShell />,
            children: [
              { index: true, element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'caflow', element: <PageWrapper><CaFlowPage /></PageWrapper> },
              { path: 'products', element: <PageWrapper><DigitalProductsPage /></PageWrapper> },
              {
                path: 'products/:slug',
                element: <PageWrapper><DigitalProductPage /></PageWrapper>,
                getStaticPaths: () => DIGITAL_PRODUCTS_SLUGS.map(slug => `products/${slug}`),
              },
              { path: 'apply', element: <PageWrapper><ApplyPage /></PageWrapper> },
              { path: '*', element: <PageWrapper><NotFound /></PageWrapper> },
            ],
          },
        ],
      },
    ],
  },
];

const mainRoutes = [
  {
    element: <Root />,
    children: [
      // ── Digital sub-site (own navbar, no main Layout) ────────────────────
      {
        path: 'solutions/digital',
        element: <DigitalLayout />,
        children: [
          {
            element: <AppShell />,
            children: [
              { index: true, element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'software', element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'ai', element: <PageWrapper><DigitalLanding /></PageWrapper> },
              { path: 'caflow', element: <PageWrapper><CaFlowPage /></PageWrapper> },
              { path: 'products', element: <PageWrapper><DigitalProductsPage /></PageWrapper> },
              {
                path: 'products/:slug',
                element: <PageWrapper><DigitalProductPage /></PageWrapper>,
                getStaticPaths: () => DIGITAL_PRODUCTS_SLUGS.map(slug => `solutions/digital/products/${slug}`),
              },
              { path: 'apply', element: <PageWrapper><ApplyPage /></PageWrapper> },
            ],
          },
        ],
      },

      // ── Main site (standard Layout with main Navbar) ──────────────────────
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
              { path: 'privacy-policy', element: <PageWrapper><PrivacyPolicy /></PageWrapper> },

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

export const routes = IS_DIGITAL_SITE ? digitalRoutes : mainRoutes;

export default routes;
