import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to apply the theme
  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    setIsDarkMode(isDark);
  };

  // Set initial theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  // Function to toggle the theme
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full transition-colors duration-300 text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-900"
    >
      <motion.div
        key={isDarkMode ? 'moon' : 'sun'}
        initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {isDarkMode ? (
          <FiSun className="h-5 w-5 text-amber-500" />
        ) : (
          <FiMoon className="h-5 w-5 text-primary" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;