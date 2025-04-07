import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiCheck } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiPhone className="h-7 w-7" />,
      title: 'Phone',
      details: ['+1 (234) 567-890', '+91 7620348035'],
      action: 'tel:+917620348035',
    },
    {
      icon: <FiMail className="h-7 w-7" />,
      title: 'Email',
      details: ['info@meehaan.com', 'sales@meehaan.com'],
      action: 'mailto:info@meehaan.com',
    },
    {
      icon: <FiMapPin className="h-7 w-7" />,
      title: 'Address',
      details: ['123 Industrial Park, Business District', 'City, State 12345, United States'],
      action: 'https://maps.google.com/?q=123+Industrial+Park+Business+District',
    },
  ];

  const inputClasses =
    'w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 outline-none transition-all duration-200';

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
            alt="Contact background"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Get in touch with our team for any inquiries, quotes, or support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                      <FiCheck className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className={inputClasses}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.action}
                      target={item.title === 'Address' ? '_blank' : undefined}
                      rel={item.title === 'Address' ? 'noopener noreferrer' : undefined}
                      className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <div className="mt-1 text-gray-600 dark:text-gray-300">
                          {item.details.map((detail, i) => (
                            <p key={i}>{detail}</p>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Business Hours</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                    <span className="font-medium text-gray-900 dark:text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                    <span className="font-medium text-gray-900 dark:text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                    <span className="font-medium text-gray-900 dark:text-white">Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Location</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Visit our office or warehouse for in-person consultations
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            {/* Placeholder for Google Maps - in production, replace with actual Google Maps iframe */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img
                src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                alt="Map location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary text-white px-6 py-3 rounded-full font-medium shadow-lg">
                  MEEHAAN Headquarters
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 