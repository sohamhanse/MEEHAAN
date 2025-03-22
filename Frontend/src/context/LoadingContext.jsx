import { createContext, useContext, useState, useEffect, useRef } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const timeoutRef = useRef(null);
  
  // Function to track loading progress - kept for compatibility
  const notifyLoadingProgress = (progress) => {
    // Just keep track of progress without making decisions
    setLoadingProgress(progress);
  };
  
  // Initial loading setup - exactly 4 seconds
  useEffect(() => {
    console.log("Loading screen initialized");
    
    // Fixed 4 second loading duration
    const LOADING_DURATION = 4000;
    
    // Clear any existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timer for exactly 4 seconds
    timeoutRef.current = setTimeout(() => {
      console.log("Loading screen completed after 4 seconds");
      setIsLoading(false);
    }, LOADING_DURATION);
    
    // Backup safety timeout - should never be needed
    const backupTimer = setTimeout(() => {
      if (isLoading) {
        console.log("Backup loading timeout triggered");
        setIsLoading(false);
      }
    }, LOADING_DURATION + 500);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(backupTimer);
    };
  }, []);
  
  // Force loading to complete - used by App as final fallback
  const forceLoadComplete = () => {
    console.log("Force loading complete triggered");
    setIsLoading(false);
  };
  
  const value = {
    isLoading,
    loadingMessage,
    loadingProgress,
    showLoading: () => {}, // No-op for compatibility
    forceLoadComplete,
    notifyLoadingProgress
  };
  
  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext; 