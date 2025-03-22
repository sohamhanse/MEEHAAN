import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const productCategories = [
    {
      title: 'Connectors',
      image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      description: 'High-quality automotive and industrial connectors for various applications',
      link: '/products/connectors',
    },
    {
      title: 'Industrial Oils',
      image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      description: 'Premium industrial oils engineered for optimal performance',
      link: '/products/oils',
    },
    {
      title: 'Grease',
      image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      description: 'Specialized grease solutions for machinery and automotive applications',
      link: '/products/grease',
    },
    {
      title: 'Sprays',
      image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
      description: 'Industrial sprays for maintenance, cleaning, and protection',
      link: '/products/sprays',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
            alt="Industrial background"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of high-quality industrial products designed for performance and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section ref={ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Product Categories
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse our selection of premium industrial products tailored to meet your specific needs
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {productCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                <Link
                  to={category.link}
                  className="inline-block px-6 py-2 rounded-full bg-secondary text-white font-medium transition-colors duration-300 hover:bg-secondary-dark"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Products</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our best-selling products chosen for their exceptional quality and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <img
                    src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                    alt={`Featured product ${item}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Premium Product {item}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    High-quality industrial solution for your business needs
                  </p>
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300">
                    Request Quote
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Trusted Brands</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We partner with the world's leading manufacturers to provide the highest quality products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((brand) => (
              <motion.div
                key={brand}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <img
                  src={`https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg`}
                  alt={`Brand ${brand}`}
                  className="h-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products; 