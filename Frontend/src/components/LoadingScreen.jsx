import { useState, useEffect, useRef } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

const LoadingScreen = () => {
  const loadingContext = useLoading();
  const notifyProgress = loadingContext.notifyLoadingProgress || (() => {});
  
  const [categoryIndex, setCategoryIndex] = useState(0);
  const isUnmounting = useRef(false);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // Product categories to cycle through
  const categories = [
    "Industrial Oils",
    "Automotive Connectors",
    "Greases",
    "Sprays"
  ];
  
  // Cycle through categories
  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex(prevIndex => (prevIndex + 1) % categories.length);
    }, 800); // Change every 800ms
    
    return () => clearInterval(interval);
  }, [categories.length]);
  
  // Progress animation - fixed 4000ms duration
  useEffect(() => {
    // Ensure we only set start time once
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
    
    const DURATION = 4000; // Exactly 4 seconds
    
    const updateProgress = () => {
      try {
        // Calculate elapsed time and progress percentage (not displayed)
        const elapsed = Date.now() - startTimeRef.current;
        const calculatedProgress = Math.min((elapsed / DURATION) * 100, 100);
        
        // Silently update progress for context tracking
        try {
          notifyProgress(calculatedProgress);
        } catch (e) {
          console.error("Error notifying progress:", e);
        }
        
        // Continue animation until we reach 100%
        if (calculatedProgress < 100 && !isUnmounting.current) {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      } catch (error) {
        console.error("Error in progress animation:", error);
      }
    };
    
    // Start the animation
    animationFrameRef.current = requestAnimationFrame(updateProgress);
    
    // Clean up on unmount
    return () => {
      isUnmounting.current = true;
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Emergency timeout as absolute fallback
  useEffect(() => {
    const forceTimeout = setTimeout(() => {
      if (!isUnmounting.current) {
        console.log('Force timeout triggered - emergency exit from loading screen');
        
        // Try to notify full progress
        try {
          notifyProgress(100);
        } catch (e) {
          console.error("Error in force completion:", e);
        }
        
        // Then hide after a small delay
        setTimeout(() => {
          const loadingElement = document.getElementById('loading-screen');
          if (loadingElement) {
            loadingElement.style.display = 'none';
          }
        }, 200);
      }
    }, 4500); // Just slightly longer than our animation
    
    return () => clearTimeout(forceTimeout);
  }, []);
  
  return (
    <motion.div 
      id="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-950 to-black z-[9999]"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(25,118,210,0.03),transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(255,160,0,0.03),transparent_60%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 safe-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4 text-center">
        {/* Logo/Brand presentation */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ 
              opacity: 1, 
              letterSpacing: "0.25em",
              transition: { delay: 0.3, duration: 1.5, ease: "easeOut" }
            }}
            className="text-4xl md:text-5xl font-thin tracking-widest text-white mb-4"
          >
            MEEHAAN
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, transition: { delay: 0.6, duration: 0.8 } }}
            className="mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"
          />
          
          {/* Cycling categories */}
          <div className="h-6 mb-16">
            <AnimatePresence mode="wait">
              <motion.p 
                key={categoryIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm tracking-widest text-white/60 uppercase"
              >
                {categories[categoryIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          {/* Simple pulsing dots for loading indication */}
          <div className="flex justify-center space-x-3 items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 safe-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 safe-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-amber-500 safe-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 