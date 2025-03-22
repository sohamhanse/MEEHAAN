import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with a small delay to ensure content is rendered
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

export default ScrollToTop; 