import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// This component handles scrolling to anchor links (#section-id)
// This is especially useful for handling anchor links when navigating between pages
function ScrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef('');

  // Listen for hash changes
  useEffect(() => {
    const hash = location.hash;
    
    // If there's a hash and it's changed from the last one
    if (hash && hash !== lastHash.current) {
      lastHash.current = hash;
      
      // Wait for DOM update
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return null;
}

export default ScrollToAnchor; 