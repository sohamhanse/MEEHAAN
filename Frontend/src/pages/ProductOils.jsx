import React, { useEffect } from 'react';
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

const ProductOils = () => {
  useEffect(() => {
    document.title = "MEEHAAN | Industrial Oils & Lubricants";
  }, []);

  // Define product categories with their descriptions (Do NOT change)
  const categories = [
    {
      id: 'heat-treatment',
      title: 'Heat Treatment',
      description: 'A comprehensive range of quenchants and heat-treating salts for all heat treatment processes, including steel, cast iron, and aluminium alloys.',
      link: '/solutions/industrial/oils/heat-treatment',
      fallbackImage: "/images/Products/Oil/Heat_Treatment.jpg"
    },
    {
      id: 'fire-resistant',
      title: 'Fire Resistant Hydraulic Fluids',
      description: 'An exhaustive range of fire-resistant hydraulic fluids designed for equipment operating near heat sources such as molten metal and open flames. These fluids ensure safe working conditions under extreme heat.',
      link: '/solutions/industrial/oils/fire-resistant',
      fallbackImage: "/images/Products/Oil/fire-resistant-hydraulic-fluids.jpg"
    },
    {
      id: 'cutting-coolants',
      title: 'Metal Cutting Coolants',
      description: 'Water-Soluble Metal Cutting Fluids & Neat Cutting Oils. An extensive range of water-dilutable coolants and neat cutting oils for precision machining and metalworking applications.',
      link: '/solutions/industrial/oils/cutting-coolants',
      fallbackImage: "/images/Products/Oil/Metal Cutting Coolants.jpg"
    },
    {
      id: 'metal-forming',
      title: 'Metal Forming & Wire Drawing',
      description: 'A wide range of products for metal forming operations and wire drawing lubricants, including neat oils, emulsions, synthetic products, and pastes.',
      link: '/solutions/industrial/oils/metal-forming',
      fallbackImage: "/images/Products/Oil/Metal Forming & Wire Drawing.jpg"
    },
    {
      id: 'industrial-cleaners',
      title: 'Industrial Cleaners',
      description: 'A broad range of industrial cleaners designed for effective component surface cleaning.',
      link: '/solutions/industrial/oils/industrial-cleaners',
      fallbackImage: "/images/Products/Oil/Industrial Cleaners.jpg"
    },
    {
      id: 'rust-preventives',
      title: 'Rust Preventives',
      description: 'A highly effective range of rust preventive solutions, available in oil, solvent, and water-based formulations, ensuring inter-operational protection and final packaging for all metals.',
      link: '/solutions/industrial/oils/rust-preventives',
      fallbackImage: "/images/Products/Oil/Rust_Preventive.jpg"
    },
    {
      id: 'die-casting',
      title: 'Die-Casting Lubricants',
      description: 'A comprehensive range of specialized products tailored to meet the needs of the die-casting industry.',
      link: '/solutions/industrial/oils/die-casting',
      fallbackImage: "/images/Products/Oil/Die-Casting Lubricants.jpg"
    },
    {
      id: 'hot-forging',
      title: 'Hot Forging Lubricants',
      description: 'A broad range of lubricants designed to provide maximum lubrication and release, even in the most demanding forging processes.',
      link: '/solutions/industrial/oils/hot-forging',
      fallbackImage: "/images/Products/Oil/Hot Forging Lubricants.jpg"
    },
    {
      id: 'rolling-coating',
      title: 'Rolling & Coating Oils',
      description: 'A wide range of specialized oils for the cold rolling of steel sheets.',
      link: '/solutions/industrial/oils/rolling-coating',
      fallbackImage: "/images/Products/Oil/Rolling & Coating Oils.jpg"
    },
    {
      id: 'industrial-lubricants',
      title: 'Industrial Lubricants',
      description: 'High-performance lubricants catering to a wide variety of industrial applications.',
      link: '/solutions/industrial/oils/industrial-lubricants',
      fallbackImage: "/images/Products/Oil/Industrial Lubricants.jpg"
    }
  ];

  const getCategoryLabel = (id) => {
    switch (id) {
      case 'heat-treatment':
      case 'fire-resistant':
      case 'die-casting':
        return 'Thermal & Fire';
      case 'cutting-coolants':
      case 'metal-forming':
      case 'hot-forging':
      case 'rolling-coating':
        return 'Metalworking';
      case 'industrial-cleaners':
      case 'rust-preventives':
        return 'Surface & Protection';
      default:
        return 'Industrial';
    }
  };

  return (
    <div className="bg-[var(--warm-white)] min-h-screen pt-[64px]">

      {/* ═══════════════════════════════ SECTION 1: HERO BANNER ═══════════════════════════════ */}
      <section className="bg-[var(--black)] w-full py-0 lg:h-[420px] flex flex-col lg:flex-row">

        {/* Left Column (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 lg:px-[80px] py-16 lg:py-0">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-mono text-[11px] text-[#555] tracking-[0.1em] uppercase"
          >
            MEEHAAN / INDUSTRIAL SOLUTIONS / OILS
          </motion.p>

          <motion.img
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            src="/meehaan_logo/LUBO Logo Without Bg-01.png"
            alt="LUBO"
            style={{ height: '44px', marginTop: '20px', width: 'max-content' }}
          />

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="font-syne font-bold text-white leading-[1.05] mt-5"
            style={{ fontSize: 'clamp(38px, 4vw, 52px)' }}
          >
            Industrial Oils &<br />Lubricants
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="font-dm text-[16px] text-[#888] max-w-[440px] mt-5 leading-[1.7]"
          >
            Specialized fluid solutions for heat treatment, metalworking, forming, and surface protection — formulated for India's manufacturing industry.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="flex flex-wrap items-center gap-2 mt-8 font-mono text-[12px] text-[#555]"
          >
            <span>10 Product Categories</span>
            <span className="text-[#333]">·</span>
            <span>50+ Formulations</span>
            <span className="text-[#333]">·</span>
            <span>LUBO Certified</span>
          </motion.div>
        </div>

        {/* Right Column (45%) */}
        <div className="w-full lg:w-[45%] p-6 lg:p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-2 w-full max-w-lg"
          >
            {[
              '/images/Products/Oil/Heat_Treatment.jpg',
              '/images/Products/Oil/Metal Cutting Coolants.jpg',
              '/images/Products/Oil/fire-resistant-hydraulic-fluids.jpg',
              '/images/Products/Oil/Rust_Preventive.jpg'
            ].map((src, i) => (
              <div key={i} className="relative h-[140px] lg:h-[180px] rounded-[4px] overflow-hidden">
                <img src={src} alt="Category preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 3: CATEGORY GRID ═══════════════════════════════ */}
      <section className="bg-[var(--warm-white)] py-16 lg:py-[80px] px-6 lg:px-[80px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[24px]">
            {categories.map((category, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');

              return (
                <motion.div
                  key={category.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={index % 3}
                >
                  <Link
                    to={category.link}
                    className="group block bg-white rounded-[8px] border border-[var(--border)] overflow-hidden transition-colors duration-200 hover:border-[var(--orange)] h-full flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="h-[200px] relative overflow-hidden bg-gray-100">
                      <img
                        src={category.fallbackImage}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                      />
                      {/* Number Badge */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <span className="font-mono text-[11px] text-white tracking-widest leading-none">
                          {numStr}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="font-mono text-[10px] text-[var(--orange)] tracking-[0.12em] uppercase mb-2">
                        {getCategoryLabel(category.id)}
                      </p>
                      <h3 className="font-syne font-semibold text-[20px] text-[var(--black)] leading-[1.2]">
                        {category.title}
                      </h3>
                      <p
                        className="font-dm text-[14px] text-[#888] leading-[1.6] mt-2.5"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {category.description}
                      </p>

                      <div className="mt-auto pt-5">
                        <div className="w-full h-[1px] bg-[#F0F0EC] mb-4" />
                        <div className="flex items-center justify-between">
                          <span className="font-dm font-medium text-[13px] text-[var(--orange)]">
                            View Products
                          </span>
                          <svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            className="text-[var(--orange)] transition-transform duration-200 group-hover:translate-x-1"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 4: LUBO BRAND CALLOUT ═══════════════════════════════ */}
      <section className="px-6 lg:px-[80px] pb-16 lg:pb-[80px] bg-[var(--warm-white)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[1400px] mx-auto bg-[var(--black)] rounded-[8px] p-8 lg:p-[64px] lg:px-[80px] flex flex-col lg:flex-row gap-12"
        >
          {/* Left Column (60%) */}
          <div className="w-full lg:w-[60%]">
            <img src="/meehaan_logo/LUBO Logo Without Bg-01.png" alt="LUBO" style={{ height: '40px' }} />
            <h2 className="font-syne font-bold text-white text-3xl lg:text-[36px] mt-5">
              Why LUBO?
            </h2>
            <p className="font-dm text-[16px] text-[#888] leading-[1.7] mt-4 max-w-[480px]">
              LUBO is MEEHAAN's specialized industrial oils brand — formulated with premium base oils and proprietary additive technology for consistent performance across heat treatment, metalworking, and surface protection applications.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {['Premium Base Oils', 'Proprietary Additives', 'Extended Bath Life', 'OEM Compatible'].map((pill) => (
                <div key={pill} className="font-mono text-[11px] text-[#555] border border-[#333] px-[14px] py-[6px] rounded-full">
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (40%) */}
          <div className="w-full lg:w-[40%] flex items-center lg:justify-end">
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <p className="font-syne font-bold text-[36px] text-[var(--orange)] leading-none mb-1">50+</p>
                <p className="font-dm text-[13px] text-[#666]">Formulations</p>
              </div>
              <div>
                <p className="font-syne font-bold text-[36px] text-[var(--orange)] leading-none mb-1">10</p>
                <p className="font-dm text-[13px] text-[#666]">Product Categories</p>
              </div>
              <div>
                <p className="font-syne font-bold text-[36px] text-[var(--orange)] leading-none mb-1">5+</p>
                <p className="font-dm text-[13px] text-[#666]">Years of R&D</p>
              </div>
              <div>
                <p className="font-syne font-bold text-[36px] text-[var(--orange)] leading-none mb-1">500+</p>
                <p className="font-dm text-[13px] text-[#666]">Clients Served</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════ SECTION 5: CTA SPLIT ═══════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-[var(--orange)] p-12 lg:p-[80px]"
        >
          <h3 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[36px] leading-tight max-w-sm">
            Need expert advice on oil selection?
          </h3>
          <Link
            to="/contact"
            className="inline-block bg-[var(--black)] text-white font-dm font-medium text-[14px] px-7 py-[14px] rounded-[4px] mt-8 hover:bg-black transition-colors"
          >
            Contact Technical Team
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="bg-[var(--black)] p-12 lg:p-[80px]"
        >
          <h3 className="font-syne font-bold text-white text-3xl lg:text-[36px] leading-tight max-w-sm">
            Request samples or a bulk quote
          </h3>
          <Link
            to="/contact"
            className="inline-block bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] px-7 py-[14px] rounded-[4px] mt-8 hover:bg-white transition-colors"
          >
            Get a Quote
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default ProductOils;