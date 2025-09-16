import React from "react";
import { m as motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FiCheckCircle,
  FiTarget,
  FiShield,
  FiUsers,
  FiHome,
  FiClock,
  FiGlobe,
  FiAward,
  FiSettings,
} from "react-icons/fi";

const About = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const values = [
    {
      title: "Quality",
      description:
        "We maintain the highest standards in all our products and services.",
      icon: <FiCheckCircle className="w-10 h-10" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "Innovation",
      description:
        "We continuously evolve and adapt to meet the changing needs of our industry.",
      icon: <FiTarget className="w-10 h-10" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "Trust",
      description:
        "We build lasting relationships with our clients through transparency and reliability.",
      icon: <FiShield className="w-10 h-10" />,
      color: "from-green-600 to-green-400",
    },
  ];

  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      bio: "With over 20 years in the industry, John brings unparalleled vision and leadership.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Jane Smith",
      role: "Technical Director",
      bio: "Jane oversees all technical operations and ensures the highest quality standards.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    },
    {
      name: "Mike Johnson",
      role: "Sales Manager",
      bio: "Mike leads our global sales operations with a customer-centric approach.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description:
        "MEEHAAN was established with a focus on supplying high-quality industrial oils, greases, and sprays.",
    },
    {
      year: "2019",
      title: "Entry into Automotive Sector",
      description:
        "Started dealing in automotive connectors, expanding our product range to serve the evolving needs of the automotive industry.",
    },
    {
      year: "2021",
      title: "Strengthening Supply Chain",
      description:
        "Built reliable partnerships with suppliers to ensure consistent quality and availability of automotive components.",
    },
    {
      year: "2022",
      title: "Customer-Centric Approach",
      description:
        "Focused on building trust with resellers and small manufacturers by offering tailored solutions and competitive pricing.",
    },
    {
      year: "2024",
      title: "Digital Presence & Outreach",
      description:
        "Enhanced our online presence and streamlined communications to better serve customers across India.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About MEEHAAN | Our Story, Mission & Values</title>
        <meta
          name="description"
          content="Learn about MEEHAAN's journey, our mission to deliver quality industrial solutions, and the core values that drive our success."
        />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative py-24 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')] mix-blend-overlay opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Story
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Your trusted partner in industrial valves and control systems,
                delivering excellence since 2018.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-30 pb-10">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Contact Us
                </Link>
                <Link
                  to="/products"
                  className="inline-block px-8 py-3 bg-transparent border border-white hover:bg-white/10 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  See Our Products
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto text-white dark:text-gray-900"
            >
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,224L60,218.7C120,213,240,203,360,202.7C480,203,600,213,720,213.3C840,213,960,203,1080,181.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our{" "}
                  <span className="text-primary dark:text-primary-light">
                    Mission
                  </span>
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  At MEEHAAN, we are committed to providing the highest quality
                  industrial valves and control systems to our clients
                  worldwide. Our mission is to drive innovation in the industry
                  while maintaining an unwavering commitment to quality,
                  reliability, and customer satisfaction.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We believe in building long-term partnerships with our
                  clients, understanding their unique needs, and delivering
                  solutions that exceed their expectations. Our team of experts
                  works tirelessly to ensure that every product that bears the
                  MEEHAAN name represents the pinnacle of quality and
                  performance.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gray-100 dark:bg-primary-dark/30 rounded-full filter blur-xl opacity-50"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gray-100 dark:bg-secondary-dark/30 rounded-full filter blur-xl opacity-50"></div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={
                    missionInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.9, opacity: 0 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  <img
                    src="/images/Home/Our_Mission.jpg"
                    alt="Our mission"
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our{" "}
                <span className="text-primary dark:text-primary-light">
                  Core Values
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                These principles guide everything we do at MEEHAAN, from product
                development to customer service.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`h-2 bg-gradient-to-r ${value.color}`}></div>
                  <div className="p-8">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 text-white`}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* History Timeline */}
        <section
          ref={historyRef}
          className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={historyInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our{" "}
                <span className="text-primary dark:text-primary-light">
                  Journey
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Key milestones in our history of growth and innovation.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700"></div>

              <motion.div
                initial="hidden"
                animate={historyInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="relative z-10"
              >
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    variants={fadeInUp}
                    className={`flex flex-col md:flex-row items-center mb-12 md:mb-24 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0
                          ? "md:text-left md:pl-12"
                          : "md:text-right md:pr-12"
                      }`}
                    >
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <span className="inline-block px-4 py-2 bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light rounded-full font-bold mb-4">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto md:mx-0 my-4 md:my-0">
                      <div className="w-6 h-6 bg-primary dark:bg-primary-light rounded-full shadow-lg"></div>
                    </div>

                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 bg-gradient-to-br from-primary/90 to-secondary/90 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Partner with MEEHAAN for innovative, reliable, and high-quality
                industrial solutions.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-primary hover:bg-gray-100 font-bold rounded-lg transition-colors"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
