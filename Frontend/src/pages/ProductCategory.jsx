import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useLoadingFetch from '../hooks/useLoadingFetch';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const ProductCategory = () => {
  const params = useParams();
  const category = params.category || 'connectors';
  
  const [brandsRef, brandsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [whyRef, whyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Brand data with logo paths and optional external URLs - only used for connectors
  const connectorBrands = [
    {
      name: 'Yazaki',
      logo: '/images/Company_Logos/yazaki-logo-png_seeklogo-332871.png',
      url: 'https://www.yazaki-group.com/',
      description: 'Global supplier of automotive wiring harnesses and components'
    },
    {
      name: 'Sumitomo',
      logo: '/images/Company_Logos/sumitomo-logo-png_seeklogo-435383.png',
      url: 'https://www.sumitomo.gr.jp/english/',
      description: 'Leading manufacturer of electrical components and systems'
    },
    {
      name: 'Deutsch',
      logo: '/images/Company_Logos/Deutsch.png',
      url: 'https://www.te.com/usa-en/products/brands/deutsch.html',
      description: 'Specialists in high-performance connectors for harsh environments'
    },
    {
      name: 'BYD',
      logo: '/images/Company_Logos/byd-logo-png_seeklogo-496457.png',
      url: 'https://www.byd.com/en/',
      description: 'Innovative provider of automotive and energy storage solutions'
    },
    {
      name: 'Bosch',
      logo: '/images/Company_Logos/bosch-logo-png_seeklogo-272569.png',
      url: "https://www.bosch.in/",
      description: 'Quality manufacturer of industrial components'
    },
    {
      name: 'Elekta',
      logo: '/images/Company_Logos/elekta-logo-png_seeklogo-319884.png',
      url: 'https://www.elekta.com/',
      description: 'Global leader in precision radiation medicine'
    },
    {
      name: 'Lear Corporation',
      logo: '/images/Company_Logos/lear-corporation-logo-png_seeklogo-172073.png',
      url: 'https://www.lear.com/',
      description: 'Leading supplier of automotive seating and electrical systems'
    },
    {
      name: 'Siemens',
      logo: '/images/Company_Logos/siemens-logo-png_seeklogo-126288.png',
      url: 'https://www.siemens.com/',
      description: 'Global technology powerhouse focusing on electrification and automation'
    },
    {
      name: 'JST',
      logo: '/images/Company_Logos/jst-logo-FDB7749C32-seeklogo.com.png',
      url: 'https://www.jst.com/',
      description: 'Manufacturer of electrical connectors for various applications'
    },
    {
      name: 'TE Connectivity',
      logo: '/images/Company_Logos/te-connectivity-logo-png_seeklogo-434450.png',
      url: 'https://www.te.com/',
      description: 'Global industrial technology leader creating a safer, sustainable future'
    },
    {
      name: 'Molex',
      logo: '/images/Company_Logos/molex-logo-png_seeklogo-94217.png',
      url: 'https://www.molex.com/',
      description: 'Provider of electronic solutions focusing on innovation and quality'
    },
    {
      name: 'Lite-On',
      logo: '/images/Company_Logos/liteon-logo-png_seeklogo-84689.png',
      url: 'https://www.liteon.com/',
      description: 'Manufacturer of optoelectronics, information technology, and storage devices'
    },
    {
      name: 'JAE',
      logo: '/images/Company_Logos/japan-aviation-electronics-jae-logo-png_seeklogo-425315.png',
      url: 'https://www.jae.com/',
      description: 'Japan Aviation Electronics specializing in connectors and electronics'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const filteredBrands = connectorBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keep existing mock fetch logic intact for hooks compatibility
  const fetchProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProducts = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: `${formatCategoryName(category)} ${i + 1}`,
          description: `High-quality ${category} for industrial applications with premium features and outstanding performance.`,
          image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
          brand: i % 3 === 0 ? 'Bosch' : i % 3 === 1 ? 'Amphenol' : 'TE Connectivity',
          price: `$${(Math.random() * 1000).toFixed(2)}`,
          category: category,
          featured: i < 2
        }));
        resolve(mockProducts);
      }, 1500);
    });
  };

  const [products, error, isLoading, refetchProducts] = useLoadingFetch(
    fetchProducts,
    [category],
    1500
  );

  // Format category name
  const formatCategoryName = (cat) => {
    if (!cat) return '';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  useEffect(() => {
    document.title = `${formatCategoryName(category)} | MEEHAAN`;
  }, [category]);

  return (
    <div className="bg-[var(--warm-white)] min-h-screen pt-[64px]">
      
      {/* ═══════════════════════════════ SECTION 1: HERO ═══════════════════════════════ */}
      <section className="relative h-[480px] bg-[var(--black)] overflow-hidden">
        <img
          src="/images/Trusted_Brand/c1.jpg"
          alt={`${formatCategoryName(category)} background`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2, filter: 'brightness(0.35)' }}
        />
        
        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-[80px] py-[64px] max-w-[1400px] mx-auto w-full">
          <Link 
            to="/solutions/industrial" 
            className="font-mono text-[11px] text-[#555] hover:text-[var(--orange)] transition-colors w-fit"
          >
            ← Industrial Solutions
          </Link>
          
          <motion.p 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-[11px] text-[var(--orange)] tracking-[0.12em] mt-4 uppercase"
          >
            MEEHAAN INDUSTRIAL
          </motion.p>
          
          <motion.h1 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-syne font-extrabold text-white text-[48px] lg:text-[60px] leading-[1.0] mt-3 whitespace-pre-line"
          >
            {category === 'connectors' ? "Automotive\nConnectors" : formatCategoryName(category)}
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-dm text-[17px] text-[#888] max-w-[520px] mt-4 leading-[1.65]"
          >
            {category === 'connectors' 
              ? "Authorized distributor for 13+ global connector brands. Sourced for automotive OEMs, wire harness manufacturers, and Tier-1 suppliers across India."
              : `Explore our selection of premium ${category} designed for superior performance and reliability.`
            }
          </motion.p>
          
          {category === 'connectors' && (
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex items-center gap-4 mt-7 font-mono text-[12px] text-[#555]"
            >
              <span>13+ Brands</span>
              <span className="text-[#333]">·</span>
              <span>OEM Certified</span>
              <span className="text-[#333]">·</span>
              <span>Pan-India Supply</span>
            </motion.div>
          )}
          
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link 
              to="/contact" 
              className="bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] px-6 py-3 rounded-[4px] hover:scale-[1.02] transition-transform"
            >
              Get a Quote
            </Link>
            <button 
              className="border border-[#444] text-[#888] font-dm font-medium text-[14px] px-6 py-3 rounded-[4px] bg-transparent hover:border-[#666] hover:text-[#aaa] transition-colors"
            >
              Download Brand Catalogue
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════ CONNECTORS EXCLUSIVE SECTIONS ════════════ */}
      {category === 'connectors' && (
        <>
          {/* ═══════════════════════════════ SECTION 2: BRAND COUNT BAR ═══════════════════════════════ */}
          <section className="bg-white border-b border-[var(--border)] sticky top-[64px] z-40">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-[80px] py-[20px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-dm text-[14px] text-[#888]">
                {searchTerm 
                  ? `Showing results for "${searchTerm}"` 
                  : `${filteredBrands.length} brands available`
                }
              </p>
              
              <div className="relative w-full sm:w-[280px]">
                <svg 
                  className="absolute left-[12px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-[40px] border border-[var(--border)] rounded-[4px] pl-[40px] pr-[16px] font-dm text-[14px] text-[var(--black)] focus:outline-none focus:border-[var(--orange)] transition-colors placeholder-[#888]"
                />
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════ SECTION 3: BRANDS GRID ═══════════════════════════════ */}
          <section ref={brandsRef} className="bg-[var(--warm-white)] py-[80px] px-6 lg:px-[80px]">
            <div className="max-w-[1400px] mx-auto">
              <div className="mb-[56px]">
                <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] uppercase mb-2">AUTHORIZED PARTNERS</p>
                <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[40px]">
                  Our Trusted Connector Brands
                </h2>
                <p className="font-dm text-[15px] text-[#888] mt-3 leading-[1.6] max-w-2xl">
                  Official distributor for leading global connector manufacturers. All products are genuine, certified, and available for bulk supply.
                </p>
              </div>

              {filteredBrands.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={brandsInView ? "visible" : "hidden"}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-[#E8E8E4] border border-[#E8E8E4] rounded-[8px] overflow-hidden"
                >
                  {filteredBrands.map((brand, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white p-6 lg:p-[32px_24px] flex flex-col items-center text-center transition-colors duration-200 hover:bg-[#FAFAF8] group"
                    >
                      <div className="h-[80px] flex items-center justify-center w-full">
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="max-h-[52px] max-w-[80%] object-contain filter grayscale opacity-55 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.innerHTML =
                              `<span style="font-family:Syne,sans-serif;font-size:13px;font-weight:600;color:#1A1A1A">${brand.name}</span>`;
                          }}
                        />
                      </div>
                      
                      <div className="w-full h-[1px] bg-[#F0F0EC] my-5" />
                      
                      <h3 className="font-syne font-medium text-[14px] text-[var(--black)] mb-3">
                        {brand.name}
                      </h3>
                      
                      {brand.url ? (
                        <a
                          href={brand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-dm text-[12px] text-[#888] border border-[var(--border)] px-[14px] py-[6px] rounded-full hover:border-[var(--orange)] hover:text-[var(--orange)] transition-all duration-150"
                        >
                          Visit Website →
                        </a>
                      ) : (
                        <Link
                          to={`/contact?brand=${brand.name}`}
                          className="font-dm text-[12px] text-[#888] border border-[var(--border)] px-[14px] py-[6px] rounded-full hover:border-[var(--orange)] hover:text-[var(--orange)] transition-all duration-150"
                        >
                          Enquire →
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="w-full py-[80px] text-center">
                  <p className="font-syne text-[20px] text-[#888] mb-4">
                    No brands found for "{searchTerm}"
                  </p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="font-dm text-[13px] text-[var(--orange)] hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════ SECTION 4: WHY THESE BRANDS ═══════════════════════════════ */}
          <section className="bg-white py-[80px] px-6 lg:px-[80px] border-t border-[var(--border)]">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-[64px]">
              
              {/* Left Column (50%) */}
              <div className="w-full lg:w-1/2">
                <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] uppercase mb-3">OUR SOURCING STANDARD</p>
                <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[36px] leading-[1.1]">
                  Only Genuine.<br />Only Certified.
                </h2>
                <p className="font-dm text-[15px] text-[#666] leading-[1.8] mt-5 max-w-[420px]">
                  Every connector we supply is sourced directly from authorized channels. We maintain strict quality checks and traceability for all brands in our portfolio — no grey market, no counterfeits.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    { t: "Authorized Distribution", d: "Direct channel partnerships with all listed brands" },
                    { t: "OEM Grade Quality", d: "Products meet automotive and industrial certifications" },
                    { t: "Bulk Supply Ready", d: "Consistent availability for production line requirements" },
                    { t: "Technical Support", d: "Application guidance for connector selection and fitment" }
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-[20px] h-[20px] bg-[var(--orange)] flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="11.66 3.5 5.25 10.5 2.33 7.5"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-syne font-medium text-[14px] text-[var(--black)]">{point.t}</h4>
                        <p className="font-dm text-[13px] text-[#888] mt-0.5">{point.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (50%) */}
              <div className="w-full lg:w-1/2">
                <div className="bg-[var(--warm-white)] border border-[var(--border)] rounded-[8px] p-8 lg:p-[40px]">
                  <h3 className="font-syne font-semibold text-[20px] text-[var(--black)] mb-6">
                    Brands We Carry
                  </h3>
                  
                  <div className="flex flex-col">
                    {connectorBrands.slice(0, 8).map((brand, i) => (
                      <div 
                        key={i} 
                        className="py-3 flex items-center justify-between border-b border-[#F0F0EC] last:border-0"
                      >
                        <span className="font-dm text-[14px] text-[var(--black)] font-medium">{brand.name}</span>
                        <span className="font-dm text-[12px] text-[#888] text-right truncate pl-4 max-w-[60%]">
                          {brand.description.length > 40 ? brand.description.substring(0, 40) + '...' : brand.description}
                        </span>
                      </div>
                    ))}
                  </div>

                  {connectorBrands.length > 8 && (
                    <p className="font-dm text-[13px] text-[var(--orange)] mt-4">
                      + {connectorBrands.length - 8} more brands available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════ SECTION 5: WHY CHOOSE ═══════════════════════════════ */}
      <section ref={whyRef} className="bg-[var(--black)] py-[80px] px-6 lg:px-[80px]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-[64px]">
          {/* Left Column */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            className="w-full lg:w-1/2"
          >
            <img
              src="/images/Trusted_Brand/C2.jpg"
              alt="Quality Connectors"
              className="w-full h-[300px] lg:h-[420px] object-cover rounded-[4px] border border-[#333]"
            />
          </motion.div>

          {/* Right Column */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            custom={1}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] uppercase mb-3">QUALITY ASSURANCE</p>
            <h2 className="font-syne font-bold text-white text-3xl lg:text-[36px] leading-[1.2]">
              {category === 'connectors' ? "Why Choose MEEHAAN for Connectors?" : `Why Choose Our ${formatCategoryName(category)}?`}
            </h2>

            <div className="mt-2 text-white">
              {[
                { title: "Premium Quality", desc: `All our ${category} are sourced from trusted manufacturers and undergo rigorous quality checks.` },
                { title: "Industry Standards", desc: `Our ${category} meet or exceed all relevant industry standards and specifications.` },
                { title: "Competitive Pricing", desc: `We offer the best value for premium ${category} at competitive market rates.` }
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-4 mt-8">
                  <span className="font-mono text-[13px] text-[var(--orange)] flex-shrink-0 pt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-syne font-medium text-[17px] text-white">
                      {point.title}
                    </h3>
                    <p className="font-dm text-[14px] text-[#666] leading-[1.65] mt-2">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-fit mt-10 px-6 py-3 bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] rounded-[4px] hover:bg-white transition-colors duration-300">
              Download Catalogue
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 6: BOTTOM CTA ═══════════════════════════════ */}
      <section className="bg-[var(--warm-white)] border-t border-[var(--border)] py-[80px] px-6 text-center">
        <motion.div
           variants={fadeUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="max-w-2xl mx-auto"
        >
          <h2 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[36px]">
            Looking for a specific connector?
          </h2>
          <p className="font-dm text-[16px] text-[#888] max-w-[480px] mx-auto mt-4 leading-[1.6]">
            Send us the part number, brand, and quantity. Our team will respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] px-8 py-3.5 rounded-[4px] hover:scale-[1.02] transition-transform"
            >
              Send Enquiry
            </Link>
            <Link 
              to="/solutions/industrial" 
              className="w-full sm:w-auto border border-[var(--border)] bg-white text-[#888] font-dm font-medium text-[14px] px-8 py-3.5 rounded-[4px] hover:border-[#ccc] hover:text-[#555] transition-colors"
            >
              View All Products
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ProductCategory;