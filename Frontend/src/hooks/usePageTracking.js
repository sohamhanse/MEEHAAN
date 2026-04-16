import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Sends a page_view event to GA4 on every route change.
 * SPA navigations don't trigger a full page load, so GA4 misses them
 * without this manual push.
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
};

export default usePageTracking;
