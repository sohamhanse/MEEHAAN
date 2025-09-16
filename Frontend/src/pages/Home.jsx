import { useState, useEffect } from 'react';
import { motion, useScroll, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const Home = () => {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [clientsRef, clientsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const productCategories = [
    {
      title: 'Connectors',
      image: '/images/Home/connectors.jpg',
      description: 'High-quality automotive and industrial connectors for reliable connections',
      link: '/products/connectors',
    },
    {
      title: 'Industrial Oils',
      image: '/images/Home/Industrial_Lub.jpg',
      description: 'Premium industrial oils engineered for optimal performance',
      link: '/products/oils',
    },
  ];

  /*
  {
        title: 'Grease',
        image: '/images/Home/Industrial_Grease.jpg',
        description: 'Specialized grease solutions for machinery and automotive applications',
        link: '/products/grease',
      },
      {
        title: 'Sprays',
        image: '/images/Home/Industrial_Spray.png',
        description: 'Industrial sprays for maintenance, cleaning, and protection',
        link: '/products/sprays',
      },
  */

  const logos= [
    "/images/Company_Logos/Our_Costumers/Perfektion.jpg",
    "/images/Company_Logos/Our_Costumers/Cu_Built.jpg",
    "/images/Company_Logos/Our_Costumers/RFA.jpg",
    "/images/Company_Logos/Our_Costumers/Suyog_Auto_Casat.jpg",
    "/images/Company_Logos/Our_Costumers/Walter_Pack.jpg",
    "/images/Company_Logos/Our_Costumers/Sunil_Minda.jpg"
  ]

  const stats = [
    { name: 'Years of Experience', value: '7+' },
    { name: 'Products Available', value: '1000+' },
    { name: 'Clients Served', value: '500+' },
    { name: 'Countries', value: '3+' },
  ];

  const features = [
    'Premium quality industrial products',
    'Global sourcing capabilities',
    'Extensive industry knowledge',
    'Reliable logistics and delivery',
    'Competitive pricing',
    'Dedicated customer support',
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <img
            src="/images/Home/Header.png"
            alt="Industrial background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block">Precision. Performance.</span>
              <span className="text-secondary">Excellence.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
            >
              Your trusted trading partner for premium industrial oil and automotive connectors.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/products"
                className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300 border border-white/30"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Company Section */}
      <section 
        ref={aboutRef}
        className="py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-xl opacity-20 dark:opacity-40"></div>
              <img
                src="/images/Home/Home_About.jpg"
                alt="About MEEHAAN"
                className="relative rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-xl opacity-20 dark:opacity-40"></div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 mb-4 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Your Premier Trading Partner Since 2018
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                MEEHAAN is a leading trading company specializing in industrial oil and automotive connectors. With over 7 years of experience, we pride ourselves on delivering premium quality products and exceptional customer service.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="flex-shrink-0 w-5 h-5 mr-3 rounded-full bg-primary flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300 group"
              >
                Learn More About Us
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section
        ref={productsRef}
        className="py-24 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 mb-4 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
              Our Products
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Premium Quality Industrial Solutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our comprehensive range of high-quality industrial products designed for performance and reliability.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {productCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                  <Link
                    to={category.link}
                    className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors duration-300 group"
                  >
                    Explore Products
                    <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors duration-300"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-24 bg-primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4 text-secondary">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-300">{stat.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Logos / Testimonials */}
      <section 
        ref={clientsRef}
        className="py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={clientsInView ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-3 py-1 mb-4 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
              Our Clients
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're proud to partner with leading companies across industries worldwide.
            </p>
          </motion.div>

          {/* Client logos */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={clientsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20"
          >
            {logos.map((logo) => (
              <motion.div
                key={logo}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md"
              >
                <img
                  src= {logo}
                  alt={`Client logo ${logo}`}
                  className="max-h-12 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/95 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/Home/Supply_Chain.jpg"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Industrial Supply Chain?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
              Partner with MEEHAAN for premium quality products, competitive pricing, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary hover:bg-gray-100 font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us Today
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 border border-white/30"
              >
                Explore Our Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 