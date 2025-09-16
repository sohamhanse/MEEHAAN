import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  // --- FIX: Updated Google Maps URL to open the Directions interface directly ---
  const destinationAddress = 'MEEHAAN ENTERPRISE, Gat No.1326, Unit-II, Shelarvasti, Ganesh Nagar, Chikhali, Pune, Maharashtra 411062';
  const encodedDestination = encodeURIComponent(destinationAddress);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/place/MEEHAAN+ENTERPRISE/@18.6905112,73.7989598,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b76e578df305:0xe7fd57d0ce5b5!8m2!3d18.6905112!4d73.7989598!16s%2Fg%2F11sv71mlp9?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D`;
  
  // Embed URL for visually displaying the map pin
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedDestination}&output=embed&z=16`;

  const contactInfo = [
    {
      icon: <FiMapPin className="h-6 w-6 text-primary" />,
      title: 'Our Address',
      details: ['Gat No.1326, Unit-II, Shelarvasti,', 'Ganesh Nagar, Chikhali, Dehu Road,', 'Pune, Maharashtra 411062'],
    },
    {
      icon: <FiMail className="h-6 w-6 text-primary" />,
      title: 'Email Us',
      details: ['info@meehaan.com', 'sales@meehaan.com'],
      links: ['mailto:info@meehaan.com', 'mailto:sales@meehaan.com'],
    },
    {
      icon: <FiPhone className="h-6 w-6 text-primary" />,
      title: 'Call Us',
      details: ['+91 99235 88450', '+91 94036 74126'],
      links: ['tel:+919923588450', 'tel:+919403674126'],
    },
    {
      icon: <FiClock className="h-6 w-6 text-primary" />,
      title: 'Business Hours',
      details: ['Mon - Sat: 9am - 7pm', 'Thursday & Sunday: Closed'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | MEEHAAN</title>
        <meta name="description" content="Get in touch with MEEHAAN. Find our address, phone number, and email, or send us a message directly through our contact form."/>
      </Helmet>
      <div className="bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gray-900 text-white">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="/images/Home/Contact_Us.jpg"
            alt="Contact background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </motion.p>
          </div>
        </section>

        {/* Contact Details Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
                >
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <div className="text-gray-600 dark:text-gray-400">
                    {item.details.map((detail, i) => (
                      item.links ? (
                        <a key={i} href={item.links[i]} className="block hover:text-primary dark:hover:text-secondary transition-colors">
                          {detail}
                        </a>
                      ) : (
                        <p key={i}>{detail}</p>
                      )
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Form and Map Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send a Message</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                <ContactForm />
              </motion.div>
              
              {/* Simplified Map Location */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:pt-28" 
              >
                <a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-2xl group">
                  <div className="relative">
                    <iframe
                      src={googleMapsEmbedUrl}
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MEEHAAN Location"
                      className="pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    ></iframe>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="bg-primary text-white px-4 py-2 rounded-md font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for Directions
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;