import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const destinationAddress = 'MEEHAAN ENTERPRISE, Gat No.1326, Unit-II, Shelarvasti, Ganesh Nagar, Chikhali, Pune, Maharashtra 411062';
  const encodedDestination = encodeURIComponent(destinationAddress);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/place/MEEHAAN+ENTERPRISE/@18.6905112,73.7989598,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b76e578df305:0xe7fd57d0ce5b5!8m2!3d18.6905112!4d73.7989598!16s%2Fg%2F11sv71mlp9?entry=ttu&g_ep=EgoyMDI1MDkxNC4wIKXMDSoASAFQAw%3D%3D`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedDestination}&output=embed&z=16`;

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: 'Our Address',
      details: ['Gat No.1326, Unit-II, Shelarvasti,', 'Ganesh Nagar, Chikhali, Dehu Road,', 'Pune, Maharashtra 411062'],
    },
    {
      icon: <FiMail />,
      title: 'Email Us',
      details: ['info@meehaan.com', 'sales@meehaan.com'],
      links: ['mailto:info@meehaan.com', 'mailto:sales@meehaan.com'],
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      details: ['+91 99235 88450', '+91 94036 74126'],
      links: ['tel:+919923588450', 'tel:+919403674126'],
    },
    {
      icon: <FiClock />,
      title: 'Business Hours',
      details: ['Mon - Sat: 9am - 7pm', 'Thursday & Sunday: Closed'],
    },
  ];

  const quickOptions = [
    "Industrial Oils Quote",
    "Connector Enquiry",
    "Battery Accessories",
    "Digital Solutions"
  ];

  const faqs = [
    { q: "What products does MEEHAAN supply?", a: "MEEHAAN supplies industrial lubricants under the LUBO brand (heat treatment oils, metalworking fluids, rust preventives), automotive connectors from brands like Yazaki, TE Connectivity, and Molex, and battery accessories including FRP sheets, terminal blocks, and Anderson/Degson connectors." },
    { q: "What is the minimum order quantity?", a: "Minimum order quantities vary by product category. For industrial oils, MOQ typically starts at 20 litres. For connectors and battery accessories, it depends on the specific SKU. Please contact us with your requirement for accurate MOQ information." },
    { q: "Do you supply outside Maharashtra?", a: "Yes, MEEHAAN supplies pan-India. We have established logistics partnerships to deliver to all major manufacturing hubs including Pune, Mumbai, Chennai, Bangalore, Delhi NCR, and more." },
    { q: "How quickly can I get a quote?", a: "We respond to all quote requests within 24 hours on business days. For urgent requirements, WhatsApp us directly at +91 99235 88450 for a faster response." },
    { q: "Do you offer digital solutions for non-industrial businesses?", a: "Yes, MEEHAAN's Digital Solutions division works with all types of businesses — not just industrial. We build custom software, CRM systems, and AI automation tools for companies looking to improve their operations." }
  ];

  const handleQuickOption = (opt) => {
    setSelectedSubject(opt);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen pt-[64px]">
      <SEOHead
        title="Contact MEEHAAN — Get a Quote or Book a Demo"
        description="Contact MEEHAAN Enterprise for industrial product quotes, connector sourcing, oil specifications, or digital solution consultations. Based in Pune, Maharashtra. Response within 24 hours."
        keywords="contact MEEHAAN, get quote industrial products, MEEHAAN Pune contact, industrial oils quote, connector enquiry"
        canonical="/contact"
      />

      {/* ═══════════════════════════════ SECTION 1: HEADER ═══════════════════════════════ */}
      <section className="bg-[#1A1A1A] py-[36px] lg:py-[56px] px-6 lg:px-[80px] min-h-[200px] flex items-center w-full">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row gap-6 md:gap-0">
          
          <div className="w-full md:w-[35%]">
             <p className="font-mono text-[11px] text-[#555]">GET IN TOUCH</p>
             <h1 className="font-syne font-extrabold text-[#FFF] mt-3 leading-none" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>Contact Us</h1>
             <p className="font-dm text-[14px] text-[#777] mt-3 max-w-[280px]">
               We respond to all enquiries within 24 hours.
             </p>
          </div>

          <div className="w-full md:w-[30%] md:border-l border-[#2A2A2A] pt-4 md:pt-0 md:pl-[40px]">
             <p className="font-mono text-[10px] text-[#555]">RESPONSE TIME</p>
             <p className="font-syne font-bold text-[32px] text-[#F5A623] leading-none mt-1">24hrs</p>
             <p className="font-dm text-[12px] text-[#666] mt-1.5">Mon–Sat, 9am to 7pm</p>
          </div>

          <div className="w-full md:w-[35%] md:border-l border-[#2A2A2A] pt-4 md:pt-0 md:pl-[40px]">
             <p className="font-mono text-[10px] text-[#555]">LOCATION</p>
             <p className="font-syne font-semibold text-[16px] text-[#FFF] mt-1.5">Pune, Maharashtra</p>
             <p className="font-dm text-[12px] text-[#666] mt-1 leading-[1.6]">Chikhali, Dehu Road</p>
             <p className="font-dm text-[12px] text-[#F5A623] mt-2">+91 99235 88450</p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 2: CONTACT CARDS ═══════════════════════════════ */}
      <section className="bg-[#FAFAF8] py-[32px] lg:py-[48px] px-6 lg:px-[80px] border-b border-[#E8E8E4]">
        <div className="max-w-[1200px] mx-auto">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#E8E8E4] border border-[#E8E8E4] rounded-[8px] overflow-hidden">
             {contactInfo.map((item, idx) => (
                <div key={idx} className="bg-white p-[24px_20px] transition-all duration-150 border-t-[2px] border-transparent hover:border-t-[#F5A623] group">
                   <div className="w-[36px] h-[36px] bg-[#FAFAF8] border border-[#E8E8E4] rounded-[4px] flex items-center justify-center text-[#F5A623] text-[16px]">
                     {item.icon}
                   </div>
                   <h3 className="font-syne font-mono text-[11px] text-[#888] tracking-[0.1em] mt-[14px] uppercase">{item.title}</h3>
                   <div className="mt-2">
                     {item.details.map((detail, i) => (
                       item.links ? (
                         <a key={i} href={item.links[i]} className="block font-dm text-[13px] text-[#555] leading-[1.8] hover:text-[#F5A623] transition-colors">
                           {detail}
                         </a>
                       ) : (
                         <p key={i} className="font-dm text-[13px] text-[#555] leading-[1.8]">{detail}</p>
                       )
                     ))}
                   </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 3: FORM & MAP ═══════════════════════════════ */}
      <section id="contact-form" className="bg-white py-[40px] lg:py-[72px] px-6 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[64px]">
           
           {/* LEFT - FORM */}
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full lg:w-[55%]">
              <div>
                <p className="font-mono text-[11px] text-[#F5A623] uppercase tracking-wider">SEND A MESSAGE</p>
                <h2 className="font-syne font-bold text-[28px] text-[#1A1A1A] mt-2 leading-tight">Tell Us What You Need</h2>
                <p className="font-dm text-[13px] text-[#888] mt-2">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>
              
              <div className="mt-[28px]">
                <ContactForm initialSubject={selectedSubject} />
              </div>
           </motion.div>

           {/* RIGHT - MAP & INFO */}
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full lg:w-[45%]">
               <div className="border border-[#E8E8E4] rounded-[4px] overflow-hidden h-[300px]">
                 <a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <iframe
                      src={googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MEEHAAN Location"
                      className="pointer-events-none"
                    ></iframe>
                 </a>
               </div>

               <div className="mt-[24px]">
                 <div className="flex gap-[12px] p-[14px_0] border-b border-[#F0F0EC]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" className="mt-[2px] shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <div>
                       <p className="font-mono text-[11px] text-[#888]">BUSINESS HOURS</p>
                       <p className="font-dm text-[13px] text-[#555] mt-1">Mon–Sat: 9am – 7pm</p>
                       <p className="font-dm text-[13px] text-[#555]">Thursday & Sunday: Closed</p>
                    </div>
                 </div>

                 <div className="flex gap-[12px] p-[14px_0] border-b border-[#F0F0EC] items-center justify-between">
                    <div className="flex gap-[12px]">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" className="shrink-0"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                       <div>
                          <p className="font-mono text-[11px] text-[#888]">WHATSAPP</p>
                          <a href="https://wa.me/919923588450" className="block font-dm text-[13px] text-[#555] hover:text-[#F5A623] transition-colors mt-[2px]">+91 99235 88450</a>
                       </div>
                    </div>
                    <a href="https://wa.me/919923588450" className="font-mono text-[10px] bg-[#F0FDF4] text-[#25D366] border border-[#BBF7D0] px-[10px] py-[3px] rounded-full hover:bg-[#DCFCE7] transition-colors shrink-0">
                      Chat Now →
                    </a>
                 </div>

                 <div className="flex gap-[12px] p-[14px_0] border-b border-[#F0F0EC]">
                    <FiMail className="w-[16px] h-[16px] text-[#F5A623] mt-[2px] shrink-0" />
                    <div>
                       <p className="font-mono text-[11px] text-[#888]">EMAIL</p>
                       <p className="font-dm text-[13px] text-[#555] mt-1">info@meehaan.com</p>
                       <p className="font-dm text-[13px] text-[#555]">sales@meehaan.com</p>
                    </div>
                 </div>
               </div>

               <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-[4px] p-[16px] mt-[20px]">
                 <p className="font-mono text-[11px] text-[#888] mb-[12px]">COMMON ENQUIRIES</p>
                 <div className="grid grid-cols-2 gap-[8px]">
                   {quickOptions.map(opt => (
                     <button
                       key={opt}
                       onClick={() => handleQuickOption(opt)}
                       className="text-left bg-white border border-[#E8E8E4] rounded-[4px] px-[12px] py-[8px] font-dm text-[12px] text-[#555] hover:border-[#F5A623] hover:text-[#F5A623] hover:bg-[#FFFBF0] transition-colors"
                     >
                       {opt}
                     </button>
                   ))}
                 </div>
               </div>
           </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 4: LOCATION DETAIL ═══════════════════════════════ */}
      <section className="bg-[#FAFAF8] py-[40px] lg:py-[64px] px-6 lg:px-[80px] border-t border-[#E8E8E4]">
         <div className="max-w-[1200px] mx-auto">
            <p className="font-mono text-[11px] text-[#888]">OUR LOCATION</p>
            <h2 className="font-syne font-bold text-[28px] text-[#1A1A1A] mt-2">Find Us</h2>

            <div className="bg-white border border-[#E8E8E4] rounded-[4px] p-[28px_32px] mt-6 max-w-[640px] flex gap-[32px] items-start">
               <FiMapPin className="text-[#F5A623] w-[20px] h-[20px] shrink-0 mt-[3px] hidden sm:block" />
               <div>
                 <h3 className="font-syne font-semibold text-[16px] text-[#1A1A1A]">MEEHAAN Enterprise</h3>
                 <p className="font-mono text-[10px] text-[#F5A623] mt-[6px]">REGISTERED OFFICE</p>
                 <div className="font-dm text-[13px] text-[#666] mt-3 leading-[1.9]">
                    <p>Gat No.1326, Unit-II, Shelarvasti,</p>
                    <p>Ganesh Nagar, Chikhali, Dehu Road,</p>
                    <p>Pune, Maharashtra — 411062</p>
                 </div>
                 
                 <div className="flex gap-[8px] mt-[16px] flex-wrap">
                    <span className="font-mono text-[10px] text-[#888] border border-[#E8E8E4] px-[10px] py-[3px] rounded-full">Near Chikhali Railway Station</span>
                    <span className="font-mono text-[10px] text-[#888] border border-[#E8E8E4] px-[10px] py-[3px] rounded-full">Dehu Road</span>
                 </div>

                 <a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="block font-dm text-[13px] text-[#F5A623] mt-[16px] hover:underline">
                   Get Directions →
                 </a>
               </div>
            </div>
         </div>
      </section>

      {/* ═══════════════════════════════ SECTION 5: FAQ ═══════════════════════════════ */}
      <section className="bg-white py-[40px] lg:py-[64px] px-6 lg:px-[80px] border-t border-[#E8E8E4]">
         <div className="max-w-[800px] mx-auto">
            <p className="font-mono text-[11px] text-[#F5A623]">FAQ</p>
            <h2 className="font-syne font-bold text-[28px] text-[#1A1A1A] mt-2">Common Questions</h2>

            <div className="mt-[32px]">
               {faqs.map((faq, i) => {
                 const isOpen = openFaq === i;
                 return (
                   <div key={i} className={`border-b border-[#E8E8E4] ${i === faqs.length - 1 ? 'border-b-0' : ''}`}>
                     <button
                       onClick={() => setOpenFaq(isOpen ? null : i)}
                       className={`w-full text-left py-[18px] flex justify-between items-center transition-colors ${isOpen ? 'text-[#F5A623]' : 'text-[#1A1A1A] hover:text-[#F5A623]'}`}
                     >
                       <h3 className="font-syne font-medium text-[14px] pr-4">{faq.q}</h3>
                       <span className={`font-dm text-[20px] shrink-0 leading-none ${isOpen ? 'text-[#F5A623]' : 'text-[#888]'}`}>
                         {isOpen ? '−' : '+'}
                       </span>
                     </button>
                     <AnimatePresence>
                       {isOpen && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.2 }}
                           className="overflow-hidden"
                         >
                           <p className="font-dm text-[13px] text-[#888] pb-[18px] leading-[1.75]">
                             {faq.a}
                           </p>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 )
               })}
            </div>
         </div>
      </section>

    </div>
  );
};

export default Contact;