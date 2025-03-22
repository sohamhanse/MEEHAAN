import React from 'react';
import ProductList from '../components/ProductList';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>MEEHAAN | Industrial Valves and Solutions</title>
        <meta name="description" content="Explore MEEHAAN's wide range of high-quality industrial valves and control solutions for critical applications." />
      </Helmet>
      
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-primary/90 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Precision-Engineered Valve Solutions
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover our comprehensive range of high-performance industrial valves and control systems, designed for reliability in the most demanding environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#products" 
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Products
              </a>
              <a 
                href="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main content */}
      <section id="products" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Product Line
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We design and manufacture a wide range of industrial valves that meet the highest standards of quality, reliability, and performance for critical applications worldwide.
            </motion.p>
          </div>
          
          {/* Product filters and listings */}
          <ProductList />
        </div>
      </section>
      
      {/* Technical support section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-primary dark:from-gray-800 dark:to-primary-dark rounded-2xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need Technical Support?
                </h2>
                <p className="text-gray-200 mb-6">
                  Our team of engineers is ready to assist you with product selection, technical specifications, and custom solutions for your specific application requirements.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white">24/7 Technical Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="text-white">Engineering Consultations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white">Detailed Documentation</span>
                  </div>
                </div>
                <button className="mt-8 bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                  Contact Technical Support
                </button>
              </div>
              <div className="md:w-1/2 bg-gray-100 dark:bg-gray-700 p-8 md:p-12 flex items-center justify-center">
                <img 
                  src="/images/technical-support.svg" 
                  alt="Technical Support" 
                  className="max-w-full h-auto max-h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom solutions CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Need a Custom Solution?
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We specialize in designing and manufacturing custom valve solutions for unique applications and challenging environments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="/custom-solutions" 
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-medium transition-colors inline-block"
            >
              Explore Custom Solutions
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage; 