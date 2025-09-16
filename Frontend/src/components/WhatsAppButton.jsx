import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';

const WhatsAppButton = () => {
  // The phone number should be in international format without '+' or spaces
  const phoneNumber = '919270212124'; // Updated to an Indian number
  const message = encodeURIComponent('Hi! I am interested in MEEHAAN products. Can you help me?');
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-green-700 hover:shadow-green-900/20 transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        boxShadow: '0 0 20px rgba(0, 200, 0, 0.3)',
      }}
    >
      <div className="relative flex items-center">
        <FaWhatsapp className="text-3xl sm:text-4xl" />
        <div className="hidden md:block overflow-hidden whitespace-nowrap">
           <span className="ml-2 font-medium">Chat Now</span>
        </div>
      </div>
      
      {/* Pulsing effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3], 
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
        style={{ zIndex: -1 }}
      />
    </motion.a>
  );
};

export default WhatsAppButton;

