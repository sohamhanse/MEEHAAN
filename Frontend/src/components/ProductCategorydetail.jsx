import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ProductCategorydetail = ({ 
  pageTitle, 
  pageDescription, 
  heroImage, 
  heroAlt, 
  aboutTitle, 
  aboutContent, 
  aboutImage, 
  keyFeatures, 
  productSeries,
  productRangeTitle = "Product Range" 
}) => {
  const [expandedSeries, setExpandedSeries] = useState(productSeries?.[0]?.id || '');

  useEffect(() => {
    document.title = `${pageTitle} | MEEHAAN`;
  }, [pageTitle]);

  const toggleExpand = (series) => {
    setExpandedSeries(expandedSeries === series ? '' : series);
  };

  return (
    <div className="bg-[var(--warm-white)] min-h-screen">
      
      {/* ═══════════════════════════════ SECTION 1: HERO ═══════════════════════════════ */}
      <section className="relative h-[480px] bg-[var(--black)] overflow-hidden">
        {/* Background Image */}
        <img
          src={heroImage}
          alt={heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25, filter: 'brightness(0.4)' }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-[80px] pb-[64px] max-w-[1400px] mx-auto w-full">
          <Link 
            to="/solutions/industrial/oils" 
            className="font-mono text-[11px] text-[#555] hover:text-[var(--orange)] transition-colors w-fit"
          >
            ← All Industrial Oils
          </Link>
          
          <img 
            src="/meehaan_logo/LUBO Logo Without Bg-01.png" 
            alt="LUBO" 
            style={{ height: '32px', marginTop: '12px', opacity: 0.9, width: 'max-content' }} 
          />
          
          <motion.h1 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-syne font-bold text-white text-4xl lg:text-[56px] leading-[1.05] mt-4"
          >
            {pageTitle}
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-dm text-[17px] text-[#888] max-w-[560px] mt-4 leading-[1.65]"
          >
            {pageDescription}
          </motion.p>
          
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Link 
              to="/contact" 
              className="bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] px-6 py-3 rounded-[4px] hover:scale-[1.02] transition-transform"
            >
              Request Quote
            </Link>
            <button 
              className="border border-[#444] text-[#888] font-dm font-medium text-[14px] px-6 py-3 rounded-[4px] bg-transparent hover:border-[#666] hover:text-[#aaa] transition-colors"
            >
              Download Catalogue
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 2: ABOUT STRIP ═══════════════════════════════ */}
      <section className="bg-white py-16 lg:py-[80px] px-6 lg:px-[80px]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center">
          {/* Left: Image */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-[45%] mb-8 lg:mb-0"
          >
            <img 
              src={aboutImage} 
              alt={aboutTitle} 
              className="w-full h-[300px] lg:h-[400px] object-cover rounded-[8px] border border-[var(--border)]"
            />
          </motion.div>
          
          {/* Right: Content */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="w-full lg:w-[55%] lg:pl-[64px]"
          >
            <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.12em] uppercase">
              ABOUT THIS RANGE
            </p>
            <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[36px] mt-3">
              {aboutTitle}
            </h2>
            
            <div className="mt-5 space-y-4">
              {typeof aboutContent === 'string' ? (
                <p className="font-dm text-[16px] text-[#555] leading-[1.8]">
                  {aboutContent}
                </p>
              ) : (
                aboutContent.map((paragraph, index) => (
                  <p key={index} className="font-dm text-[16px] text-[#555] leading-[1.8] mb-4">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 3: KEY FEATURES ═══════════════════════════════ */}
      <section className="bg-[var(--warm-white)] py-16 lg:py-[80px] px-6 lg:px-[80px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] uppercase mb-2">KEY FEATURES</p>
            <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[40px]">
              What Sets This Range Apart
            </h2>
          </motion.div>

          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#E8E8E4] grid gap-[1px]"
            style={{
              gridTemplateColumns: keyFeatures.length === 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
            }}
          >
            {keyFeatures.map((feature, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              
              // Handle special 5-item layout mapping logic
              let colSpanClass = 'col-span-1 lg:col-span-1';
              if (keyFeatures.length === 5 && index > 2) {
                // If 5 items, we want items 4 and 5 to center in a 3-col grid, requiring flex or custom spans
                // Since grid is rigid, let's just let it naturally flow, or center the last two.
                // Given the prompt allowed exact existing logic adaptation, standard flow is fine
                // but we can adjust to make it look decent.
              }

              return (
                <div 
                  key={index}
                  className={`bg-white p-8 lg:px-[36px] lg:py-[40px] flex flex-col ${colSpanClass}`}
                >
                  <span className="font-mono text-[13px] text-[var(--orange)]">
                    {numStr}
                  </span>
                  <h3 className="font-syne font-semibold text-[20px] text-[var(--black)] mt-4">
                    {feature.title}
                  </h3>
                  <div className="w-[32px] h-[2px] bg-[var(--orange)] my-4" />
                  <p className="font-dm text-[15px] text-[#666] leading-[1.7]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 4: PRODUCT RANGE ═══════════════════════════════ */}
      <section className="bg-white py-16 lg:py-[80px] px-6 lg:px-[80px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="font-mono text-[11px] text-[#888] tracking-[0.1em] uppercase mb-2">PRODUCT RANGE</p>
            <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[40px]">
              {productRangeTitle}
            </h2>
          </motion.div>

          <div className="w-full border-t border-[var(--border)]">
            {productSeries.map((series, index) => {
              const isOpen = expandedSeries === series.id;
              const numStr = (index + 1).toString().padStart(2, '0');

              return (
                <div key={series.id} className="border-b border-[var(--border)]">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleExpand(series.id)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <div className="flex items-center">
                      <span className="font-mono text-[11px] text-[var(--orange)]">{numStr}</span>
                      <h3 
                        className="font-syne font-semibold text-[22px] ml-5 transition-colors duration-200"
                        style={{ color: isOpen ? 'var(--orange)' : 'var(--black)' }}
                      >
                        {series.title}
                      </h3>
                    </div>
                    
                    <span 
                      className="font-syne text-[24px] ml-4 flex-shrink-0 transition-colors duration-200"
                      style={{ color: isOpen ? 'var(--black)' : '#888' }}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 flex flex-col md:flex-row">
                        
                        {/* Image Column */}
                        {series.image && (
                          <div className="w-full md:w-[25%] md:min-w-[200px] mb-6 md:mb-0">
                            <img 
                              src={series.image} 
                              alt={series.title} 
                              className="w-full h-[220px] object-cover rounded-[4px] border border-[var(--border)]"
                            />
                          </div>
                        )}

                        {/* Content Column */}
                        <div className={`w-full ${series.image ? 'md:w-[75%] md:pl-10' : 'w-full'}`}>
                          
                          {series.description && (
                            <p className="font-dm text-[15px] text-[#555] leading-[1.75] mb-6">
                              {series.description}
                            </p>
                          )}
                          
                          {series.features && series.applications && (
                            <div className="flex flex-col sm:flex-row gap-8">
                              <div className="flex-1">
                                <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] mb-3">
                                  KEY FEATURES
                                </p>
                                <ul>
                                  {series.features.map((feature, i) => (
                                    <li key={i} className="font-dm text-[14px] text-[#555] py-2 border-b border-[#F5F5F0]">
                                      <span className="inline-block w-[5px] h-[5px] bg-[var(--orange)] mr-2.5 align-middle" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex-1">
                                <p className="font-mono text-[11px] text-[var(--black)] tracking-[0.1em] mb-3">
                                  APPLICATIONS
                                </p>
                                <ul>
                                  {series.applications.map((app, i) => (
                                    <li key={i} className="font-dm text-[14px] text-[#555] py-2 border-b border-[#F5F5F0]">
                                      <span className="inline-block w-[5px] h-[5px] bg-[var(--black)] mr-2.5 align-middle" />
                                      {app}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                          
                          {series.products && (
                            <div>
                              {series.products.map((product, i) => (
                                <div key={i} className="py-5 border-b border-[#F5F5F0] last:border-0">
                                  <h4 className="font-syne font-medium text-[16px] text-[var(--black)]">
                                    {product.name}
                                  </h4>
                                  <p className="font-dm text-[14px] text-[#888] leading-[1.6] mt-1.5">
                                    {product.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 5: BOTTOM CTA ═══════════════════════════════ */}
      <section className="bg-[var(--warm-white)] py-16 lg:py-[80px] px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[36px]">
            Need More Information?
          </h2>
          <p className="font-dm text-[16px] text-[#888] mt-4 leading-[1.6]">
            Contact our technical team for detailed product information, TDS sheets, and application guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] px-8 py-3.5 rounded-[4px] hover:scale-[1.02] transition-transform"
            >
              Contact Us
            </Link>
            <Link 
              to="/solutions/industrial/oils" 
              className="w-full sm:w-auto bg-white border border-[var(--border)] text-[#888] font-dm font-medium text-[14px] px-8 py-3.5 rounded-[4px] hover:border-[#ccc] hover:text-[#555] transition-colors"
            >
              Back to Industrial Oils
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ProductCategorydetail;