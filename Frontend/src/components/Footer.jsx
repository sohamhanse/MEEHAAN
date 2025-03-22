import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ];

  const productCategories = [
    { name: 'Connectors', path: '/products/connectors' },
    { name: 'Industrial Oils', path: '/products/oils' },
    { name: 'Grease', path: '/products/grease' },
    { name: 'Sprays', path: '/products/sprays' },
  ];

  return (
    <footer ref={ref} className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white opacity-10"
          >
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {/* Company Info */}
            <motion.div variants={fadeIn}>
              <div className="mb-5">
                <Link to="/" className="text-3xl font-bold text-white">
                  MEEHAAN
                </Link>
              </div>
              <p className="text-gray-400 mb-6">
                Premium industrial oil and automotive connector trading solutions, 
                delivering quality and excellence since 2008.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${social.name}`}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Products */}
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Products
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
              </h3>
              <ul className="space-y-3">
                {productCategories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={category.path}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    123 Industrial Park, Business District<br />
                    City, State 12345<br />
                    United States
                  </span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors duration-300">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="tel:+917620348035" className="text-gray-400 hover:text-white transition-colors duration-300">
                    +91 7620348035
                  </a>
                </li>
                <li className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="mailto:info@meehaan.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                    info@meehaan.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MEEHAAN. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">
                Designed with <span className="text-primary">♥</span> for premium industrial solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 