import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FiChevronDown, 
  FiSearch, 
  FiFilter,
  FiX,
  FiRefreshCw,
  FiChevronRight
} from 'react-icons/fi';

const ProductOilDetail = ({ productData }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract data from props or use defaults
  const {
    title = "Product Details",
    description = "Explore our range of industrial products designed for optimal performance and reliability.",
    heroImage = "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    heroAlt = "Industrial oil products",
    metaDescription = "High-quality industrial oils and lubricants for various applications.",
    coverImage = null,
    keyFeatures = [],
    overviewSections = [],
    technicalSections = [],
    sections = [], // Keep this if it exists in your data structure
    applications = null,
    applicationSections = [],
    filterCategories = [],
    rangeFilters = [],
    products = [],
    filteredProducts: initialFilteredProducts = [], // Rename to avoid conflict
    specifications = null,
    faqs = []
  } = productData || {};

  // Set initial filtered products state from props
  useEffect(() => {
    if (initialFilteredProducts && initialFilteredProducts.length > 0) {
      setFilteredProducts(initialFilteredProducts);
    } else if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [initialFilteredProducts, products]);

  // Filter products based on search term and active filters
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    let filtered = [...products];
    
    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)))
      );
    }
    
    // Apply category filters
    if (Object.keys(activeFilters).length > 0) {
      filtered = filtered.filter(product => {
        // Check if product matches all active filter categories
        return Object.entries(activeFilters).every(([categoryId, selectedValues]) => {
          // Product must have filters property and the specific category
          if (!product.filters || !product.filters[categoryId]) return false;
          
          // Check if any of the selected values match the product's values for this category
          return selectedValues.some(value => 
            product.filters[categoryId].includes(value)
          );
        });
      });
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, activeFilters, products]);

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
  };

  // Process sections from the legacy format if needed
  const processedOverviewSections = sections && sections.length > 0 
    ? sections.filter(section => !section.category || section.category === 'overview')
    : overviewSections;
    
  const processedTechnicalSections = sections && sections.length > 0
    ? sections.filter(section => section.category === 'technical')
    : technicalSections;
    
  const processedApplicationSections = sections && sections.length > 0
    ? sections.filter(section => section.category === 'application')
    : applicationSections;

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Helmet>
        <title>MEEHAAN | {title}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      {/* Hero Section with Interactive Elements */}
      <section className="relative h-[70vh] overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="h-full w-full"
          >
            <img
              src={heroImage}
              alt={heroAlt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2070&auto=format&fit=crop";
              }}
            />
          </motion.div>
        </div>
        <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300 shadow-lg"
              >
                Request a Quote
              </Link>
              <a
                href="#product-finder"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 border border-white/30"
              >
                Find Your Product
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/70 flex flex-col items-center"
          >
            <span className="mb-2 text-sm font-medium">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-6 no-scrollbar">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('technical')}
              className={`whitespace-nowrap px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'technical' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Technical Specifications
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`whitespace-nowrap px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'applications' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Applications
            </button>
            <button 
              onClick={() => setActiveTab('product-finder')}
              className={`whitespace-nowrap px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'product-finder' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Product Finder
            </button>
            <button 
              onClick={() => setActiveTab('faq')}
              className={`whitespace-nowrap px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === 'faq' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Key Features with Infographics */}
      {activeTab === 'overview' && keyFeatures && keyFeatures.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800 relative z-10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    {feature.icon && (
                      <div className="mb-4 bg-primary/10 rounded-full p-4 text-primary">
                        {feature.icon}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Finder Tab Content */}
      {activeTab === 'product-finder' && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Finder</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find the perfect product for your specific application needs
              </p>
            </div>

            {/* Search and Filter Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-10">
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="productSearch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Search Products
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="productSearch"
                      id="productSearch"
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2"
                      placeholder="Search by name, property, or application..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 md:mb-0">
                    Filter Options
                  </h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowFilters(!showFilters)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1.5 h-4 w-4 transition-transform duration-300 ${showFilters ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={clearAllFilters}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <FiRefreshCw className="mr-2 h-5 w-5" />
                      Clear All Filters
                    </button>
                  </div>
                </div>

                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6"
                  >
                    {filterCategories && filterCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {category.name}
                        </h4>
                        <div className="space-y-1">
                          {category.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center">
                              <input
                                id={`filter-${categoryIndex}-${optionIndex}`}
                                name={`${category.id}-${option.value}`}
                                value={option.value}
                                type="checkbox"
                                checked={activeFilters[category.id]?.includes(option.value) || false}
                                onChange={(e) => {
                                  const newActiveFilters = { ...activeFilters };
                                  if (!newActiveFilters[category.id]) {
                                    newActiveFilters[category.id] = [];
                                  }
                                  
                                  if (e.target.checked) {
                                    newActiveFilters[category.id].push(option.value);
                                  } else {
                                    newActiveFilters[category.id] = newActiveFilters[category.id].filter(
                                      val => val !== option.value
                                    );
                                    if (newActiveFilters[category.id].length === 0) {
                                      delete newActiveFilters[category.id];
                                    }
                                  }
                                  
                                  setActiveFilters(newActiveFilters);
                                }}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                              />
                              <label
                                htmlFor={`filter-${categoryIndex}-${optionIndex}`}
                                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                              >
                                {option.label} {option.count && `(${option.count})`}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Range Filters (if applicable) */}
                    {rangeFilters && rangeFilters.map((filter, filterIndex) => (
                      <div key={filterIndex} className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {filter.name}
                        </h4>
                        <div className="px-2">
                          {/* Range Slider would go here - this is a placeholder */}
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 mb-1">
                            <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{filter.min} {filter.unit}</span>
                            <span>{filter.max} {filter.unit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Active Filters */}
                {Object.keys(activeFilters).length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Active Filters:
                    </span>
                    {Object.entries(activeFilters).map(([categoryId, values]) => 
                      values.map((value, valueIndex) => {
                        // Find the category name for display
                        const category = filterCategories.find(c => c.id === categoryId);
                        const option = category?.options.find(o => o.value === value);
                        
                        return (
                          <span 
                            key={`${categoryId}-${valueIndex}`}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {category?.name}: {option?.label || value}
                            <button 
                              type="button"
                              onClick={() => {
                                const newActiveFilters = { ...activeFilters };
                                newActiveFilters[categoryId] = newActiveFilters[categoryId].filter(
                                  val => val !== value
                                );
                                if (newActiveFilters[categoryId].length === 0) {
                                  delete newActiveFilters[categoryId];
                                }
                                setActiveFilters(newActiveFilters);
                              }}
                              className="ml-1 inline-flex text-primary hover:text-primary-dark focus:outline-none"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Products Display */}
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                </h3>
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>Relevance</option>
                    <option>Name A-Z</option>
                    <option>Name Z-A</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              {/* Product Cards */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                      {product.image && (
                        <div 
                          className="h-48 bg-gray-200 dark:bg-gray-700 relative"
                          style={{ overflow: 'hidden' }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                            }}
                          />
                          {product.badge && (
                            <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {product.name}
                        </h3>
                        {product.subtitle && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {product.subtitle}
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                          {product.description}
                        </p>
                        
                        {/* Key Properties */}
                        {product.properties && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {Object.entries(product.properties).slice(0, 4).map(([key, value], propIndex) => (
                              <div key={propIndex} className="text-sm">
                                <span className="text-gray-500 dark:text-gray-400">{key}: </span>
                                <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Tags */}
                        {product.tags && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-auto flex space-x-2">
                          <a 
                            href={product.detailLink || '#'} 
                            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            View Details
                          </a>
                          {product.dataSheet && (
                            <a 
                              href={product.dataSheet} 
                              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
              
              {/* Load More Button (if needed) */}
              {filteredProducts.length > 12 && (
                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Load More Products
                    <FiChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Comparison Feature (Optional) */}
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Compare Products
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Select products to compare their specifications side by side
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      Select a product to compare
                    </span>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      Select a product to compare
                    </span>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      Select a product to compare
                    </span>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      Select a product to compare
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    disabled
                  >
                    Compare Selected Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Overview Content with Collapsible Sections */}
      {activeTab === 'overview' && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Product Image (if available) */}
            {coverImage && (
              <div className="mb-16">
                <div className="md:flex items-center gap-12">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2"
                  >
                    <img 
                      src={coverImage} 
                      alt={title} 
                      className="rounded-lg shadow-2xl object-cover w-full h-auto"
                    />
                  </motion.div>
                  <div className="md:w-1/2 mt-8 md:mt-0">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
                    >
                      Premium Quality Solutions
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-lg text-gray-700 dark:text-gray-300 mb-6"
                    >
                      Our advanced industrial oils and lubricants are engineered to deliver exceptional performance in the most demanding environments, ensuring optimal equipment operation and extended service life.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                      >
                        Discuss Your Requirements
                        <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Collapsible Sections */}
            <div className="space-y-6">
              {processedOverviewSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(`overview-${index}`)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <FiChevronDown 
                      className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                        expandedSections[`overview-${index}`] ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Expandable Content */}
                  {(expandedSections[`overview-${index}`] || index === 0) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      {section.content && (
                        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
                          {typeof section.content === 'string' ? (
                            <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                          ) : (
                            section.content
                          )}
                        </div>
                      )}
                      
                      {section.items && (
                        <div className="mt-6">
                          {section.layout === 'grid' ? (
                            // Grid layout for items
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {section.items.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex}
                                  className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow duration-300"
                                >
                                  {item.title && (
                                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                                      {item.icon && <span className="mr-2">{item.icon}</span>}
                                      {item.title}
                                    </h4>
                                  )}
                                  {item.description && (
                                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                                      {item.description}
                                    </p>
                                  )}
                                  {item.points && (
                                    <ul className="space-y-1 list-disc pl-5">
                                      {item.points.map((point, pointIndex) => (
                                        <li key={pointIndex} className="text-gray-700 dark:text-gray-300">
                                          {point}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            // List layout for items
                            <ul className="space-y-4">
                              {section.items.map((item, itemIndex) => (
                                <li 
                                  key={itemIndex}
                                  className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border-l-4 border-primary"
                                >
                                  {item.title && (
                                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                      {item.title}
                                    </h4>
                                  )}
                                  {item.description && (
                                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                                      {item.description}
                                    </p>
                                  )}
                                  {item.points && (
                                    <ul className="space-y-1 list-disc pl-5">
                                      {item.points.map((point, pointIndex) => (
                                        <li key={pointIndex} className="text-gray-700 dark:text-gray-300">
                                          {point}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      
                      {/* Optional visual infographic (can be implemented if data is available) */}
                      {section.infographic && (
                        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                          <img 
                            src={section.infographic} 
                            alt={`${section.title} infographic`}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications Tab Content */}
      {activeTab === 'technical' && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technical Specifications</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Detailed technical information to help you select the right product for your application
              </p>
            </div>

            {/* Specifications Table */}
            {specifications && (
              <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                  Product Specifications
                </h3>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Property
                        </th>
                        {specifications.methods && (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Test Method
                          </th>
                        )}
                        {specifications.units && (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Unit
                          </th>
                        )}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {specifications.data.map((spec, index) => (
                        <tr 
                          key={index}
                          className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {spec.property}
                          </td>
                          {specifications.methods && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {spec.method}
                            </td>
                          )}
                          {specifications.units && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {spec.unit}
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {specifications.notes && (
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                    {specifications.notes}
                  </div>
                )}
              </div>
            )}

            {/* Technical Sections Content (collapsible) */}
            <div className="space-y-6">
              {processedTechnicalSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(`technical-${index}`)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <FiChevronDown 
                      className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                        expandedSections[`technical-${index}`] ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Expandable Content */}
                  {(expandedSections[`technical-${index}`] || index === 0) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      {section.content && (
                        <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
                          {typeof section.content === 'string' ? (
                            <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                          ) : (
                            section.content
                          )}
                        </div>
                      )}
                      
                      {/* Technical Data Cards */}
                      {section.items && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                          {section.items.map((item, itemIndex) => (
                            <div 
                              key={itemIndex}
                              className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
                            >
                              {item.title && (
                                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                  {item.title}
                                </h4>
                              )}
                              
                              {/* Technical Properties as a small table */}
                              {item.properties && (
                                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <tbody>
                                      {Object.entries(item.properties).map(([key, value], propIndex) => (
                                        <tr 
                                          key={propIndex}
                                          className={propIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}
                                        >
                                          <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {key}
                                          </td>
                                          <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                                            {value}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                              
                              {/* Standard text description */}
                              {item.description && !item.properties && (
                                <p className="text-gray-700 dark:text-gray-300">
                                  {item.description}
                                </p>
                              )}
                              
                              {/* Bullet points */}
                              {item.points && (
                                <ul className="mt-3 space-y-1 list-disc pl-5">
                                  {item.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="text-gray-700 dark:text-gray-300 text-sm">
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              
                              {/* Visual indicator for value metrics (like temperature range) */}
                              {item.range && (
                                <div className="mt-4">
                                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    <span>{item.range.min} {item.range.unit}</span>
                                    <span>{item.range.max} {item.range.unit}</span>
                                  </div>
                                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ 
                                        width: `${((item.range.value - item.range.min) / (item.range.max - item.range.min)) * 100}%` 
                                      }}
                                    ></div>
                                  </div>
                                  <div className="mt-1 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                                    {item.range.value} {item.range.unit}
                                  </div>
                                </div>
                              )}
                              
                              {/* Document downloads */}
                              {item.documents && (
                                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                                  {item.documents.map((doc, docIndex) => (
                                    <a 
                                      key={docIndex}
                                      href={doc.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center text-primary hover:text-primary-dark text-sm mt-2"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                      {doc.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Charts and Visual Data (placeholder for embedding charts) */}
                      {section.chart && (
                        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            {section.chart.title}
                          </h4>
                          <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            {/* Placeholder for chart - would be implemented with chart.js or similar */}
                            <div className="text-gray-400 dark:text-gray-500 text-center p-8">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              <p>Chart visualization would be displayed here</p>
                            </div>
                          </div>
                          {section.chart.description && (
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                              {section.chart.description}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Technical Resources */}
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Technical Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a 
                  href="#datasheets" 
                  className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white font-medium">Product Datasheets</span>
                </a>
                <a 
                  href="#msds" 
                  className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white font-medium">Safety Data Sheets</span>
                </a>
                <a 
                  href="#guides" 
                  className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-gray-900 dark:text-white font-medium">Application Guides</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Applications Tab Content */}
      {activeTab === 'applications' && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Applications & Industries</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore how our products are used across various industries and applications
              </p>
            </div>

            {/* Industry Applications Grid */}
            {applications && applications.industries && (
              <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                  Industry Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.industries.map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      {industry.image && (
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                          <img 
                            src={industry.image} 
                            alt={industry.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/800x450?text=Industry+Image';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {industry.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {industry.description}
                        </p>
                        {industry.benefits && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Benefits:</h5>
                            <ul className="space-y-1 list-disc pl-5">
                              {industry.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="text-gray-600 dark:text-gray-300 text-sm">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {industry.products && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recommended Products:</h5>
                            <div className="flex flex-wrap gap-2">
                              {industry.products.map((product, productIndex) => (
                                <span 
                                  key={productIndex}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                >
                                  {product}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {industry.link && (
                          <a 
                            href={industry.link} 
                            className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                          >
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies */}
            {applications && applications.caseStudies && (
              <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                  Case Studies
                </h3>
                <div className="space-y-8">
                  {applications.caseStudies.map((caseStudy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="md:flex">
                        {caseStudy.image && (
                          <div className="md:flex-shrink-0 md:w-1/3">
                            <img 
                              src={caseStudy.image} 
                              alt={caseStudy.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/600x400?text=Case+Study';
                              }}
                            />
                          </div>
                        )}
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mr-2">
                              {caseStudy.industry}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {caseStudy.location}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {caseStudy.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {caseStudy.summary}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Challenge</h5>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{caseStudy.challenge}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Solution</h5>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{caseStudy.solution}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Results</h5>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{caseStudy.results}</p>
                            </div>
                          </div>
                          
                          {caseStudy.metrics && (
                            <div className="flex flex-wrap gap-4 mb-4">
                              {Object.entries(caseStudy.metrics).map(([key, value], metricIndex) => (
                                <div key={metricIndex} className="text-center">
                                  <span className="block text-2xl font-bold text-primary">{value}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{key}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {caseStudy.link && (
                            <a 
                              href={caseStudy.link} 
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                              Read full case study
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Guides */}
            {processedApplicationSections && (
              <div className="space-y-6">
                {processedApplicationSections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(`application-${index}`)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      <FiChevronDown 
                        className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                          expandedSections[`application-${index}`] ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Expandable Content */}
                    {(expandedSections[`application-${index}`] || index === 0) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        {section.content && (
                          <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
                            {typeof section.content === 'string' ? (
                              <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                            ) : (
                              section.content
                            )}
                          </div>
                        )}
                        
                        {/* Application Items */}
                        {section.items && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            {section.items.map((item, itemIndex) => (
                              <div 
                                key={itemIndex}
                                className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start">
                                  {item.icon && (
                                    <div className="flex-shrink-0 mr-4">
                                      {item.icon}
                                    </div>
                                  )}
                                  <div>
                                    {item.title && (
                                      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                        {item.title}
                                      </h4>
                                    )}
                                    
                                    {item.description && (
                                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                                        {item.description}
                                      </p>
                                    )}
                                    
                                    {/* Process Steps */}
                                    {item.steps && (
                                      <div className="mt-4">
                                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                          Process:
                                        </h5>
                                        <ol className="space-y-2 ml-5 list-decimal">
                                          {item.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} className="text-gray-700 dark:text-gray-300 text-sm">
                                              {step}
                                            </li>
                                          ))}
                                        </ol>
                                      </div>
                                    )}
                                    
                                    {/* Tips */}
                                    {item.tips && (
                                      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600">
                                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                          Pro Tips:
                                        </h5>
                                        <ul className="space-y-1 ml-5 list-disc">
                                          {item.tips.map((tip, tipIndex) => (
                                            <li key={tipIndex} className="text-gray-700 dark:text-gray-300 text-sm">
                                              {tip}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {/* Recommended Products */}
                                    {item.products && (
                                      <div className="mt-4">
                                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                          Recommended Products:
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                          {item.products.map((product, productIndex) => (
                                            <span 
                                              key={productIndex}
                                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                            >
                                              {product}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Custom Application */}
            <div className="mt-16 bg-gradient-to-r from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-dark/30 rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-8 md:flex items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Need a Custom Solution?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our team of experts can help you find or develop the perfect product for your specific application requirements.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center md:justify-end">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'faq' && (
        <div className="mb-8">
          {/* FAQ content will be implemented separately */}
        </div>
      )}

      {/* Back to Products Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/products/oils"
          className="inline-flex items-center text-primary dark:text-primary-light hover:text-primary-dark group"
        >
          <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          Back to Industrial Oils
        </Link>
      </div>
    </div>
  );
};

export default ProductOilDetail; 