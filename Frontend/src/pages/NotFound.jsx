import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <span className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">404</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300 text-lg"
          >
            <FiArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-100 dark:bg-primary-dark/20 rounded-full filter blur-3xl opacity-30 pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-100 dark:bg-secondary-dark/20 rounded-full filter blur-3xl opacity-30 pulse-subtle" style={{ animationDelay: '700ms' }} />
    </motion.div>
  );
};

export default NotFound; 