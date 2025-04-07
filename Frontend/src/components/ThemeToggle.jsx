import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

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
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none z-50"
    >
      <motion.div
        initial={false}
        animate={{ scale: [0.8, 1], opacity: [0.5, 1] }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <FiSun className="h-6 w-6 text-amber-500" />
        ) : (
          <FiMoon className="h-6 w-6 text-gray-700" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle; 