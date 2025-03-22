import { useState, useEffect, useCallback, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';

/**
 * Custom hook for data fetching with automatic loading screen
 * @param {Function} fetchFunction - The async function that fetches data
 * @param {Array} dependencies - Dependencies array to control when fetching happens
 * @param {number} loadingDuration - Minimum duration to show loading screen (ms)
 * @returns {Array} [data, error, isLoading, refetch]
 */
const useLoadingFetch = (
  fetchFunction,
  dependencies = [],
  loadingDuration = 1000
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showLoading } = useLoading();
  const isMounted = useRef(true);
  const hasCompletedInitialLoad = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Only show the loading screen if this isn't the initial page load
      // to avoid doubling up with the main loading screen
      if (hasCompletedInitialLoad.current) {
        showLoading(loadingDuration);
      }
      
      const result = await fetchFunction();
      
      if (isMounted.current) {
        setData(result);
        hasCompletedInitialLoad.current = true;
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err);
        console.error('Error fetching data:', err);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [fetchFunction, loadingDuration, showLoading]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // Function to manually refetch data
  const refetch = () => {
    fetchData();
  };

  return [data, error, isLoading, refetch];
};

export default useLoadingFetch; 