import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  // Default false so SSG-rendered HTML shows real content immediately.
  // Client and server agree on initial value, so no hydration mismatch.
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  const notifyLoadingProgress = (progress) => {
    setLoadingProgress(progress);
  };
  
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