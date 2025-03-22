import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import meehaanApi from '../api/meehaanApi';
import { motion } from 'framer-motion';

const ProductList = ({ category = null, limit = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(category || 'All');
  
  // Categories for filtering
  const categories = [
    'All',
    'Safety Valves',
    'Control Valves',
    'Check Valves',
    'Ball Valves',
    'Others'
  ];
  
  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Fetch all products or by category
        let data;
        if (category && category !== 'All') {
          data = await meehaanApi.getProductsByCategory(category);
        } else {
          data = await meehaanApi.getProducts();
        }
        
        // Limit results if specified
        const filteredProducts = limit ? data.products.slice(0, limit) : data.products;
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [category, limit]);
  
  // Handle category filter change
  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };
  
  // Filter products by active category
  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.category === activeFilter);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(limit || 4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-52 bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-5">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Error message
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-200 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Category filter - only show if not restricted by parent */}
      {!category && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeFilter === cat 
                  ? 'bg-primary text-white dark:bg-primary-light dark:text-gray-900' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      
      {/* Products grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
            No products found in this category.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductList; 