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
  // Skip loading screen if already shown this session
  const alreadySeen = typeof window !== 'undefined'
    && sessionStorage.getItem('meehaan_loading_seen') === 'true';

  const [isLoading, setIsLoading] = useState(!alreadySeen);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const timeoutRef = useRef(null);

  // Function to track loading progress - kept for compatibility
  const notifyLoadingProgress = (progress) => {
    setLoadingProgress(progress);
  };

  // Safety timeout — LoadingScreen calls forceLoadComplete when done,
  // but if something goes wrong this fires after 5s.
  useEffect(() => {
    if (alreadySeen) return; // nothing to time out

    const backupTimer = setTimeout(() => {
      sessionStorage.setItem('meehaan_loading_seen', 'true');
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(backupTimer);
  }, [alreadySeen]);
  
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