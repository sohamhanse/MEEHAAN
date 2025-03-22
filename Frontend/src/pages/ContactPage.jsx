import React from 'react';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact MEEHAAN | Get in Touch</title>
        <meta name="description" content="Contact MEEHAAN for inquiries about our industrial valve solutions, technical support, or partnership opportunities." />
      </Helmet>
      
      {/* Hero section */}
      <section className="bg-gradient-to-r from-gray-900 to-primary/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              Have questions about our products or services? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </motion.div>
            </div>
            
            {/* Contact information */}
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Company headquarters */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Headquarters
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary dark:text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          MEEHAAN Industries Ltd. <br />
                          123 Industrial Park Road, <br />
                          Mumbai, Maharashtra, <br />
                          India - 400001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact options */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Contact Options
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-5">
                    {/* Phone */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary dark:text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                        <p className="text-gray-700 dark:text-gray-300">+91 22 1234 5678</p>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary dark:text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <a href="mailto:info@meehaan.com" className="hover:underline">info@meehaan.com</a>
                        </p>
                      </div>
                    </div>
                    
                    {/* Sales */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary dark:text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900 dark:text-white">Sales Inquiries</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <a href="mailto:sales@meehaan.com" className="hover:underline">sales@meehaan.com</a>
                        </p>
                      </div>
                    </div>
                    
                    {/* Technical Support */}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary dark:text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900 dark:text-white">Technical Support</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <a href="mailto:support@meehaan.com" className="hover:underline">support@meehaan.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Business Hours
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Monday - Friday:</span>
                        <span className="text-gray-900 dark:text-white">9:00 AM - 6:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Saturday:</span>
                        <span className="text-gray-900 dark:text-white">10:00 AM - 2:00 PM IST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Sunday:</span>
                        <span className="text-gray-900 dark:text-white">Closed</span>
                      </div>
                      <div className="pt-3 text-sm text-gray-600 dark:text-gray-400">
                        <p>* Technical support is available 24/7 for emergency situations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Locations
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find MEEHAAN facilities and offices around the world.
            </p>
          </motion.div>
          
          <motion.div
            className="aspect-video w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Placeholder for map - in production, replace with an actual map component */}
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                Interactive Map Loading...
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Global presence */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Global Presence
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              MEEHAAN has a strong presence across multiple countries, serving customers worldwide.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* India */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">India</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Headquarters & Manufacturing</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Industrial Park Road, <br />
                  Mumbai, Maharashtra, <br />
                  India - 400001 <br />
                  Phone: +91 22 1234 5678
                </p>
              </div>
            </motion.div>
            
            {/* USA */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">United States</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Sales & Distribution Center</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  456 Commerce Drive, <br />
                  Houston, TX, <br />
                  USA - 77001 <br />
                  Phone: +1 713 987 6543
                </p>
              </div>
            </motion.div>
            
            {/* Germany */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Germany</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Manufacturing & R&D</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  789 Industriestrasse, <br />
                  Frankfurt, <br />
                  Germany - 60313 <br />
                  Phone: +49 69 9876 5432
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 