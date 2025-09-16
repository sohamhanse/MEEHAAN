import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  // Determine if the navbar should be transparent
  const isTransparent = !isScrolled && location.pathname === '/';

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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
      ],
    },
    { name: 'Contact', path: '/contact' },
  ];

  // Common class strings for links to improve readability
  const navLinkClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`;
  const transparentLinkClasses = `text-gray-200 hover:text-white`;
  const solidLinkClasses = `text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`;
  const activeLinkClasses = `text-primary dark:text-secondary font-bold`;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-5'
          : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-md py-3 border-b border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-primary dark:text-white'
              }`}
            >
              MEEHAAN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      className={`${navLinkClasses} ${
                        isTransparent ? transparentLinkClasses : solidLinkClasses
                      } flex items-center gap-1`}
                    >
                      {item.name}
                      <FiChevronDown className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10"
                        >
                          <div className="py-2">
                            {item.items.map((subItem) => (
                              <NavLink
                                key={subItem.name}
                                to={subItem.path}
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-sm transition-colors ${
                                    isActive
                                      ? 'text-primary dark:text-secondary bg-primary/5 dark:bg-secondary/10'
                                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`
                                }
                              >
                                {subItem.name}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${navLinkClasses} ${
                        isTransparent ? transparentLinkClasses : solidLinkClasses
                      } ${isActive && !isTransparent ? activeLinkClasses : ''}`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
            <div className="flex items-center space-x-4 pl-4">
              <ThemeToggle />
              <Link
                to="/contact"
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-px ${
                  isTransparent
                    ? 'bg-secondary text-white hover:bg-secondary-dark'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-5 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {!item.dropdown ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block py-2 text-base font-medium transition-colors ${
                          isActive
                            ? 'text-primary dark:text-secondary'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                        `block py-2 text-base font-medium transition-colors ${
                          isActive
                            ? 'text-primary dark:text-secondary'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
                        }`
                      }
                      >
                        {item.name}
                      </NavLink>
                    </>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="block w-full py-3 bg-primary text-white text-center rounded-lg hover:bg-primary-dark font-semibold"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;