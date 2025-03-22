import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { 
      name: 'Products', 
      path: '/products',
      dropdown: true,
      items: [
        { name: 'All Products', path: '/products' },
        { name: 'Connectors', path: '/products/connectors' },
        { name: 'Industrial Oils', path: '/products/oils' },
        { name: 'Grease', path: '/products/grease' },
        { name: 'Sprays', path: '/products/sprays' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
            >
              <span className={`text-2xl font-bold ${isScrolled || location.pathname !== '/' ? 'text-primary dark:text-white' : 'text-white'}`}>
                MEEHAAN
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 ${
                        isScrolled || location.pathname !== '/' 
                          ? 'nav-link' 
                          : 'text-white hover:text-white/80'
                      }`}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 min-w-[200px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 z-50"
                          onMouseEnter={() => setIsProductsOpen(true)}
                          onMouseLeave={() => setIsProductsOpen(false)}
                        >
                          <div className="py-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={
                      isScrolled || location.pathname !== '/' 
                        ? 'nav-link' 
                        : 'text-white hover:text-white/80 transition-colors duration-300'
                    }
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                to="/contact" 
                className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
                  isScrolled || location.pathname !== '/' 
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-white text-primary hover:bg-white/90'
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled || location.pathname !== '/' 
                  ? 'text-gray-700 dark:text-gray-300' 
                  : 'text-white'
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-5 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-300"
                      >
                        <span>{item.name}</span>
                        <ChevronDownIcon 
                          className={`h-5 w-5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {isProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-2 space-y-2"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link 
                  to="/contact" 
                  className="block w-full py-3 bg-primary text-white text-center rounded-lg hover:bg-primary-dark transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 