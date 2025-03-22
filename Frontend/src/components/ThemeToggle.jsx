import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preferred theme
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
    
    // Set initial state
    setIsDarkMode(initialTheme === 'dark');
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <motion.button
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleDarkMode}
      className="relative w-10 h-10 flex items-center justify-center rounded-full focus:outline-none"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 45 : 0,
          scale: isDarkMode ? 0.8 : 1
        }}
        transition={{ duration: 0.3 }}
        className={`absolute transition-colors duration-300 ${
          isDarkMode ? 'opacity-0' : 'opacity-100 text-yellow-500'
        }`}
      >
        <SunIcon className="h-6 w-6" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 0 : -45,
          scale: isDarkMode ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        className={`absolute transition-colors duration-300 ${
          isDarkMode ? 'opacity-100 text-blue-400' : 'opacity-0'
        }`}
      >
        <MoonIcon className="h-6 w-6" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 