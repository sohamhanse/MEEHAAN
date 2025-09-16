import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
} from 'react-icons/fi';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const socialLinks = [
    { name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  const productCategories = [
    { name: 'Connectors', path: '/products/connectors' },
    { name: 'Industrial Oils', path: '/products/oils' },
    { name: 'Grease Solutions', path: '/products/grease' },
    { name: 'Industrial Sprays', path: '/products/sprays' },
  ];

  return (
    <footer ref={ref} className="bg-gray-900 text-gray-300">
      <div className="relative overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")` }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {/* Company Info */}
            <motion.div variants={fadeIn} className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link to="/" className="text-3xl font-bold text-white mb-4 block">
                MEEHAAN
              </Link>
              <p className="text-gray-400 mb-6">
                Your trusted partner for premium industrial oils and automotive connectors since 2018.
              </p>
              <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="p-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
                >
                  <FiArrowRight className="h-5 w-5" />
                </button>
              </form>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-white transition-colors flex items-center group">
                      <FiArrowRight className="h-4 w-4 mr-2 text-primary transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Products */}
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-bold text-white mb-6">Products</h3>
              <ul className="space-y-3">
                {productCategories.map((category) => (
                  <li key={category.name}>
                    <Link to={category.path} className="hover:text-white transition-colors flex items-center group">
                      <FiArrowRight className="h-4 w-4 mr-2 text-primary transition-transform group-hover:translate-x-1" />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeIn}>
              <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiMapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>
                    Gat No.1326, Unit-II, Shelarvasti, Ganesh Nagar, Chikhali, Dehu Road, Pune, Maharashtra 411062
                  </span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="tel:+919923588450" className="hover:text-white transition-colors">
                    +91 9923588450
                  </a>
                </li>
                <li className="flex items-center">
                  <FiMail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="mailto:info@meehaan.com" className="hover:text-white transition-colors">
                    info@meehaan.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Copyright & Socials */}
      <div className="bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MEEHAAN. All Rights Reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.name}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;