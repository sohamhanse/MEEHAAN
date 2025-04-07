import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ProductOils = () => {
  // Define product categories with their descriptions
  const categories = [
    {
      id: 'heat-treatment',
      title: 'Heat Treatment',
      description: 'A comprehensive range of quenchants and heat-treating salts for all heat treatment processes, including steel, cast iron, and aluminium alloys.',
      link: '/products/oils/heat-treatment',
      fallbackImage: "/images/Products/Oil/Heat_Treatment.jpg"
    },
    {
      id: 'fire-resistant',
      title: 'Fire Resistant Hydraulic Fluids',
      description: 'An exhaustive range of fire-resistant hydraulic fluids designed for equipment operating near heat sources such as molten metal and open flames. These fluids ensure safe working conditions under extreme heat.',
      link: '/products/oils/fire-resistant',
      fallbackImage: "/images/Products/Oil/fire-resistant-hydraulic-fluids.jpg"
    },
    {
      id: 'cutting-coolants',
      title: 'Metal Cutting Coolants',
      description: 'Water-Soluble Metal Cutting Fluids & Neat Cutting Oils. An extensive range of water-dilutable coolants and neat cutting oils for precision machining and metalworking applications.',
      link: '/products/oils/cutting-coolants',
      fallbackImage: "/images/Products/Oil/Metal Cutting Coolants.jpg"
    },
    {
      id: 'metal-forming',
      title: 'Metal Forming & Wire Drawing',
      description: 'A wide range of products for metal forming operations and wire drawing lubricants, including neat oils, emulsions, synthetic products, and pastes.',
      link: '/products/oils/metal-forming',
      fallbackImage: "/images/Products/Oil/Metal Forming & Wire Drawing.jpg"
    },
    {
      id: 'industrial-cleaners',
      title: 'Industrial Cleaners',
      description: 'A broad range of industrial cleaners designed for effective component surface cleaning.',
      link: '/products/oils/industrial-cleaners',
      fallbackImage: "/images/Products/Oil/Industrial Cleaners.jpg"
    },
    {
      id: 'rust-preventives',
      title: 'Rust Preventives',
      description: 'A highly effective range of rust preventive solutions, available in oil, solvent, and water-based formulations, ensuring inter-operational protection and final packaging for all metals.',
      link: '/products/oils/rust-preventives',
      fallbackImage: "/images/Products/Oil/Rust Preventives.jpg"
    },
    {
      id: 'die-casting',
      title: 'Die-Casting Lubricants',
      description: 'A comprehensive range of specialized products tailored to meet the needs of the die-casting industry.',
      link: '/products/oils/die-casting',
      fallbackImage: "/images/Products/Oil/Die-Casting Lubricants.jpg"
    },
    {
      id: 'hot-forging',
      title: 'Hot Forging Lubricants',
      description: 'A broad range of lubricants designed to provide maximum lubrication and release, even in the most demanding forging processes.',
      link: '/products/oils/hot-forging',
      fallbackImage: "/images/Products/Oil/Hot Forging Lubricants.jpg"
    },
    {
      id: 'rolling-coating',
      title: 'Rolling & Coating Oils',
      description: 'A wide range of specialized oils for the cold rolling of steel sheets.',
      link: '/products/oils/rolling-coating',
      fallbackImage: "/images/Products/Oil/Rolling & Coating Oils.jpg"
    },
    {
      id: 'industrial-lubricants',
      title: 'Industrial Lubricants',
      description: 'High-performance lubricants catering to a wide variety of industrial applications.',
      link: '/products/oils/industrial-lubricants',
      fallbackImage: "/images/Products/Oil/Industrial Lubricants.jpg"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Helmet>
        <title>MEEHAAN | Industrial Oils & Lubricants</title>
        <meta name="description" content="MEEHAAN's comprehensive range of industrial oils and lubricants for various applications including heat treatment, metal forming, die casting and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="/images/Products/Oil/Oil-Product-Banner.jpg"
            alt="Industrial Oils"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2070&auto=format&fit=crop";
            }}
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            Comprehensive range of specialized lubricants for industrial applications
          </motion.p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Specialized Industrial Lubricants</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              MEEHAAN's industrial oils and lubricants are formulated with premium base oils and advanced additive technology to provide exceptional performance and protection for various specialized industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Industry Solutions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Explore our comprehensive range of specialized industrial oils and lubricants designed for various applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-[480px]"
              >
                {/* Image Container - Even taller image */}
                <div className="h-96 relative overflow-hidden">
                  <img 
                    src={category.fallbackImage} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Semi-transparent overlay that appears on hover with a nice fade-in effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{category.title}</h3>
                    <p className="text-white/90 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {category.description}
                    </p>
                    <Link 
                      to={category.link} 
                      className="inline-flex items-center bg-primary text-white hover:bg-white hover:text-primary px-5 py-2.5 rounded-md font-medium transition-colors duration-300 text-sm w-fit mx-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
                    >
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Card Lower Section with hover hint */}
                <div className="p-6 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300 text-lg font-semibold">{category.title}</span>
                  <span className="text-primary dark:text-primary-light group-hover:rotate-180 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-4"
              >
                Need Expert Advice?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-white/90 max-w-2xl"
              >
                Our technical team is ready to help you select the right industrial oils for your specific applications.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-auto"
            >
              <Link 
                to="/contact" 
                className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOils; 