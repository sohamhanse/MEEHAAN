import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useLoadingFetch from '../hooks/useLoadingFetch';

const ProductCategory = () => {
  const { category } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [brandsRef, brandsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Brand data with logo paths and optional external URLs - only used for connectors
  const connectorBrands = [
    {
      name: 'Yazaki',
      logo: '/images/Company_Logos/yazaki-logo-png_seeklogo-332871.png',
      url: 'https://www.yazaki-group.com/',
      description: 'Global supplier of automotive wiring harnesses and components'
    },
    {
      name: 'Sumitomo',
      logo: '/images/Company_Logos/sumitomo-logo-png_seeklogo-435383.png',
      url: 'https://www.sumitomo.gr.jp/english/',
      description: 'Leading manufacturer of electrical components and systems'
    },
    {
      name: 'Deutsch',
      logo: '/images/Company_Logos/Deutsch.png',
      url: 'https://www.te.com/usa-en/products/brands/deutsch.html',
      description: 'Specialists in high-performance connectors for harsh environments'
    },
    {
      name: 'BYD',
      logo: '/images/Company_Logos/byd-logo-png_seeklogo-496457.png',
      url: 'https://www.byd.com/en/',
      description: 'Innovative provider of automotive and energy storage solutions'
    },
    {
      name: 'Bosch',
      logo: '/images/Company_Logos/bosch-logo-png_seeklogo-272569.png',
      url: "https://www.bosch.in/",
      description: 'Quality manufacturer of industrial components'
    },
    {
      name: 'Elekta',
      logo: '/images/Company_Logos/elekta-logo-png_seeklogo-319884.png',
      url: 'https://www.elekta.com/',
      description: 'Global leader in precision radiation medicine'
    },
    {
      name: 'Lear Corporation',
      logo: '/images/Company_Logos/lear-corporation-logo-png_seeklogo-172073.png',
      url: 'https://www.lear.com/',
      description: 'Leading supplier of automotive seating and electrical systems'
    },
    {
      name: 'Siemens',
      logo: '/images/Company_Logos/siemens-logo-png_seeklogo-126288.png',
      url: 'https://www.siemens.com/',
      description: 'Global technology powerhouse focusing on electrification and automation'
    },
    {
      name: 'JST',
      logo: '/images/Company_Logos/jst-logo-FDB7749C32-seeklogo.com.png',
      url: 'https://www.jst.com/',
      description: 'Manufacturer of electrical connectors for various applications'
    },
    {
      name: 'TE Connectivity',
      logo: '/images/Company_Logos/te-connectivity-logo-png_seeklogo-434450.png',
      url: 'https://www.te.com/',
      description: 'Global industrial technology leader creating a safer, sustainable future'
    },
    {
      name: 'Molex',
      logo: '/images/Company_Logos/molex-logo-png_seeklogo-94217.png',
      url: 'https://www.molex.com/',
      description: 'Provider of electronic solutions focusing on innovation and quality'
    },
    {
      name: 'Lite-On',
      logo: '/images/Company_Logos/liteon-logo-png_seeklogo-84689.png',
      url: 'https://www.liteon.com/',
      description: 'Manufacturer of optoelectronics, information technology, and storage devices'
    },
    {
      name: 'JAE',
      logo: '/images/Company_Logos/japan-aviation-electronics-jae-logo-png_seeklogo-425315.png',
      url: 'https://www.jae.com/',
      description: 'Japan Aviation Electronics specializing in connectors and electronics'
    }
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  const filteredBrands = connectorBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // For testing purposes - keep mock data loading but don't display the products
  const fetchProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProducts = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}`,
          description: `High-quality ${category} for industrial applications with premium features and outstanding performance.`,
          image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
          brand: i % 3 === 0 ? 'Bosch' : i % 3 === 1 ? 'Amphenol' : 'TE Connectivity',
          price: `$${(Math.random() * 1000).toFixed(2)}`,
          category: category,
          featured: i < 2
        }));
        resolve(mockProducts);
      }, 1500);
    });
  };

  // We still load the products but don't display them
  const [products, error, isLoading, refetchProducts] = useLoadingFetch(
    fetchProducts,
    [category],
    1500
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Format category name
  const formatCategoryName = (cat) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/images/Trusted_Brand/c1.jpg"
            alt={`${formatCategoryName(category)} background`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {formatCategoryName(category)}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Explore our selection of premium {category} designed for superior performance and reliability
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands section - Only show for connectors category */}
      {category === 'connectors' && (
        <section ref={brandsRef} className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={brandsInView ? "visible" : "hidden"}
              className="mb-12 text-center"
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Trusted Connector Brands
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We are authorized dealers of top global brands, providing high-quality connector solutions
              </motion.p>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="max-w-md mx-auto mb-12"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-5 pl-12 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm dark:text-white"
                />
                <div className="absolute left-4 top-3.5">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Brand Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={brandsInView ? "visible" : "hidden"}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
            >
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="p-6 flex-grow flex items-center justify-center h-32">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-16 max-w-[80%] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{brand.name}</h3>
                    {brand.url ? (
                      <a
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1 mt-2 rounded-full bg-primary text-white text-xs font-medium transition-colors duration-300 hover:bg-primary-dark"
                      >
                        Website
                      </a>
                    ) : (
                      <Link
                        to={`/contact?brand=${brand.name}`}
                        className="inline-block px-3 py-1 mt-2 rounded-full bg-secondary text-white text-xs font-medium transition-colors duration-300 hover:bg-secondary-dark"
                      >
                        Info
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {filteredBrands.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-300 text-lg">No brands found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Information */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="/images/Trusted_Brand/C2.jpg"
                  alt="Product information"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Why Choose Our {formatCategoryName(category)}?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Quality</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        All our {category} are sourced from trusted manufacturers and undergo rigorous quality checks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Industry Standards</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Our {category} meet or exceed all relevant industry standards and specifications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Competitive Pricing</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        We offer the best value for premium {category} at competitive market rates.
                      </p>
                    </div>
                  </div>
                </div>
                <button className="mt-8 px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors duration-300">
                  Download Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategory; 