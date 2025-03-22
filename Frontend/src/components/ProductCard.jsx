import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Product card component for displaying valve products
const ProductCard = ({ product, index }) => {
  const { id, name, category, image, description } = product;
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg dark:shadow-gray-900/30"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative h-52 overflow-hidden">
        {/* Placeholder if image is not available */}
        {!image ? (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-lg font-medium">
              Product Image
            </span>
          </div>
        ) : (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center transform transition-transform hover:scale-105"
          />
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-100">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/products/${id}`}
            className="text-sm font-medium text-primary dark:text-primary-light hover:underline flex items-center gap-1"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <button 
            className="text-gray-400 hover:text-primary dark:hover:text-primary-light"
            aria-label="Add to favorites"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 