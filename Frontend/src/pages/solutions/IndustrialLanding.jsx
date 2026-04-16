import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import SEOHead from '../../components/SEOHead';

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── SectionLabel Helper ────────────────────────────────────────────────── */
const SectionLabel = ({ text, light = false }) => (
  <div className="flex items-center gap-3 mb-1">
    <div
      className="h-[1px] w-8 flex-shrink-0"
      style={{ background: light ? '#444' : '#D0D0C8' }}
    />
    <span
      className="font-mono text-[10px] tracking-widest uppercase"
      style={{ color: light ? '#555' : '#888' }}
    >
      {text}
    </span>
  </div>
);

/* ─── Component ──────────────────────────────────────────────────────────── */
const IndustrialLanding = () => {
  /* Parallax */
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Hero stats CountUp trigger */
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  /* Why section CountUp trigger */
  const whyStatsRef = useRef(null);
  const whyStatsInView = useInView(whyStatsRef, { once: true, margin: '-60px' });

  /* Division card hover */
  const [activeCard, setActiveCard] = useState(null);

  /* Industry cell hover */
  const [activeIndustry, setActiveIndustry] = useState(null);

  const divisionCards = [
    {
      logo: '/meehaan_logo/LUBO Logo Without Bg-01.png',
      logoAlt: 'LUBO Industrial Oils — MEEHAAN Brand',
      brand: 'LUBO BRAND',
      title: 'Industrial Oils',
      desc: 'Heat treatment, metalworking, cutting fluids, rust preventives — 10 categories.',
      stat: '10',
      statLabel: 'Categories',
      link: '/solutions/industrial/oils',
      linkLabel: 'Explore Oils',
      accentTop: '#F5921E',
      shadowColor: 'rgba(245,146,30,0.18)',
      linkColor: '#F5921E',
    },
    {
      logo: '/meehaan_logo/MEEHAAN Logo Without Bg-01.png',
      logoAlt: 'MEEHAAN Enterprise Logo',
      brand: 'MEEHAAN INDUSTRIAL',
      title: 'Automotive Connectors',
      desc: 'Yazaki, Sumitomo, TE Connectivity, Molex and 10+ global brands.',
      stat: '13+',
      statLabel: 'Brands',
      link: '/solutions/industrial/connectors',
      linkLabel: 'Explore Connectors',
      accentTop: '#1A1A1A',
      shadowColor: 'rgba(26,26,26,0.14)',
      linkColor: '#1A1A1A',
    },
    {
      logo: '/meehaan_logo/MEEHAAN Logo Without Bg-01.png',
      logoAlt: 'MEEHAAN Enterprise Logo',
      brand: 'MEEHAAN INDUSTRIAL',
      title: 'Battery Accessories',
      desc: 'FRP sheets, terminal blocks, Anderson and Degson connectors for EV & solar.',
      stat: '4',
      statLabel: 'Categories',
      link: '/solutions/industrial/battery',
      linkLabel: 'Explore Battery',
      accentTop: '#F5921E',
      shadowColor: 'rgba(245,146,30,0.18)',
      linkColor: '#F5921E',
    },
  ];

  const industries = [
    {
      title: 'Automotive OEMs',
      desc: 'Connectors and metalworking fluids for production lines',
      icon: (
        <>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
    },
    {
      title: 'Electric Vehicles',
      desc: 'Battery accessories and connectors for EV packs',
      icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    },
    {
      title: 'Die Casting & Forging',
      desc: 'LUBO quenching oils and release agents',
      icon: <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />,
    },
    {
      title: 'Solar Energy',
      desc: 'Connectors and lubricants for solar installations',
      icon: (
        <>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </>
      ),
    },
    {
      title: 'Wire Harness',
      desc: 'Terminals, connector assemblies, FRP insulation',
      icon: (
        <>
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </>
      ),
    },
    {
      title: 'General Manufacturing',
      desc: 'Complete metalworking fluid solutions',
      icon: <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16z" />,
    },
  ];

  const whyPoints = [
    { title: 'Authorized Distribution', desc: 'Direct partnerships with all listed brands and manufacturers' },
    { title: 'Pan-India Supply', desc: 'Reliable logistics to manufacturing hubs across India' },
    { title: 'Technical Guidance', desc: 'Application support for product selection and usage' },
    { title: 'Bulk Order Ready', desc: 'Consistent availability for production line requirements' },
  ];

  const brandLogos = [
    '/images/Trusted_Brand/TE.jpg',
    '/images/Trusted_Brand/Molex.jpg',
    '/images/Trusted_Brand/Savita.jpg',
    '/images/Trusted_Brand/Condat.jpg',
    '/images/Trusted_Brand/Aarna.jpg',
    '/images/Trusted_Brand/Savsol.jpg',
  ];

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-[64px]">
      <SEOHead
        title="Industrial Solutions — Oils, Connectors & Battery Accessories"
        description="MEEHAAN Industrial Solutions: LUBO certified industrial oils, automotive connectors from 13+ global brands, and battery accessories for EV and solar applications. Based in Pune, India."
        keywords="industrial oils, LUBO oils, automotive connectors, battery accessories, EV components, Pune, Maharashtra, MEEHAAN industrial"
        canonical="/solutions/industrial"
      />

      {/* ═══════════════════════════════ SECTION 1: HERO ═══════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#1A1A1A',
          minHeight: '76vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Parallax grid texture */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Orange glow blob */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            bottom: -60,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: '#F5921E',
            filter: 'blur(160px)',
            opacity: 0.07,
          }}
        />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[80px] py-10 lg:py-16">
          {/* Breadcrumb */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-mono text-[11px] text-[#555]"
          >
            <Link to="/" className="hover:text-[#F5921E] transition-colors">Home</Link>
            {' '}/ Industrial Solutions
          </motion.div>

          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="font-mono text-[10px] border px-[12px] py-[3px] rounded-full mt-4 inline-block tracking-wider uppercase"
            style={{ color: '#F5921E', borderColor: 'rgba(245,146,30,0.3)' }}
          >
            MEEHAAN Industrial Division
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="font-syne font-extrabold text-white mt-4"
            style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
          >
            Industrial Supply Chain{' '}
            <em
              className="not-italic"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                color: '#F5921E',
              }}
            >
              for Modern India.
            </em>
          </motion.h1>

          {/* Subline */}
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="font-syne font-normal mt-2 text-[16px] lg:text-[20px]"
            style={{ color: '#888' }}
          >
            Lubricants · Connectors · Battery Accessories
          </motion.h2>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="font-dm text-[14px] max-w-[540px] mt-4 leading-[1.7]"
            style={{ color: '#777' }}
          >
            Complete industrial supply for manufacturers, OEMs, and EV supply chains across India. Three focused product divisions, one authorized distributor.
          </motion.p>

          {/* Stats row with CountUp */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={5}
            className="flex flex-wrap items-center gap-4 lg:gap-6 mt-8"
          >
            {[
              { end: 3, suffix: '', label: 'Product Divisions', duration: 1.5 },
              { end: 13, suffix: '+', label: 'Connector Brands', duration: 1.5 },
              { end: 10, suffix: '', label: 'Oil Categories', duration: 1.5 },
              { end: 500, suffix: '+', label: 'Clients Served', duration: 1.8 },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="w-[1px] h-[36px] self-center" style={{ background: '#2A2A2A' }} />
                )}
                <motion.div
                  variants={fadeUp}
                  custom={i}
                  className="flex flex-col"
                >
                  <span
                    className="font-syne font-bold text-[20px] leading-none"
                    style={{ color: '#F5921E' }}
                  >
                    {statsInView ? (
                      <CountUp end={stat.end} duration={stat.duration} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </span>
                  <span className="font-mono text-[10px] mt-1" style={{ color: '#555' }}>
                    {stat.label}
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 2: THREE DIVISION CARDS ═══════════════════════════════ */}
      <section className="py-10 lg:py-16 px-6 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionLabel text="OUR PRODUCTS" />
            <h2
              className="font-syne font-bold text-[28px] lg:text-[32px] mt-2"
              style={{ color: '#1A1A1A' }}
            >
              Three Product Divisions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
            {divisionCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i + 1}
                onHoverStart={() => setActiveCard(i)}
                onHoverEnd={() => setActiveCard(null)}
                className="bg-white rounded-[4px] p-6 lg:p-7 flex flex-col h-full cursor-pointer"
                style={{
                  border: `1px solid #E8E8E4`,
                  borderTop: `3px solid ${card.accentTop}`,
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                  transform: activeCard === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: activeCard === i ? `0 8px 32px ${card.shadowColor}` : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <img
                  src={card.logo}
                  alt={card.logoAlt}
                  className="h-[28px] object-contain object-left mb-1 w-auto self-start"
                  style={{
                    transition: 'transform 200ms ease',
                    transform: activeCard === i ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <p className="font-mono text-[10px] text-[#888] mt-3 uppercase tracking-wider">
                  {card.brand}
                </p>
                <h3
                  className="font-syne font-semibold text-[18px] mt-2"
                  style={{ color: '#1A1A1A' }}
                >
                  {card.title}
                </h3>
                <p className="font-dm text-[13px] text-[#888] mt-2.5 leading-[1.6]">
                  {card.desc}
                </p>

                <div className="flex items-center mt-4">
                  <span
                    className="font-syne font-bold text-[28px] leading-none"
                    style={{ color: '#F5921E' }}
                  >
                    {card.stat}
                  </span>
                  <span className="font-mono text-[10px] text-[#888] ml-2 mt-1">
                    {card.statLabel}
                  </span>
                </div>

                <div className="mt-auto pt-5">
                  <Link
                    to={card.link}
                    className="font-dm font-medium text-[13px] block group transition-colors"
                    style={{ color: card.linkColor }}
                  >
                    {card.linkLabel}{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 3: KEY INDUSTRIES ═══════════════════════════════ */}
      <section
        className="py-10 lg:py-16 px-6 lg:px-[80px]"
        style={{ background: '#fff', borderTop: '1px solid #E8E8E4' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionLabel text="INDUSTRIES SERVED" />
            <h2
              className="font-syne font-bold text-[28px] mt-2"
              style={{ color: '#1A1A1A' }}
            >
              Who We Supply To
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] rounded-[4px] overflow-hidden mt-10"
            style={{ background: '#E8E8E4', border: '1px solid #E8E8E4' }}
          >
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i % 3}
                onHoverStart={() => setActiveIndustry(i)}
                onHoverEnd={() => setActiveIndustry(null)}
                className="p-5 lg:p-6"
                style={{
                  background: activeIndustry === i ? '#FAFAF8' : '#fff',
                  transition: 'background 180ms ease',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  style={{
                    stroke: activeIndustry === i ? '#F5921E' : '#F5921E',
                    transition: 'stroke 180ms ease, transform 180ms ease',
                    transform: activeIndustry === i ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {industry.icon}
                </svg>
                <h3
                  className="font-syne font-medium text-[14px] mt-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {industry.title}
                </h3>
                <p className="font-dm text-[12px] text-[#888] mt-1.5 leading-[1.5]">
                  {industry.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 4: WHY MEEHAAN ═══════════════════════════════ */}
      <section
        className="py-10 lg:py-16 px-6 lg:px-[80px]"
        style={{ background: '#1A1A1A' }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:w-[55%]">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <SectionLabel text="WHY CHOOSE US" light />
              <h2 className="font-syne font-bold text-[28px] text-white mt-3">
                Your Industrial Supply Partner Since 2018
              </h2>
              <p className="font-dm text-[14px] mt-4 leading-[1.8] max-w-lg" style={{ color: '#777' }}>
                MEEHAAN sources only from authorized manufacturers and certified distributors. Every product is genuine, every delivery is reliable.
              </p>
            </motion.div>

            <div className="mt-7 flex flex-col gap-4">
              {whyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  className="flex gap-3 items-start"
                >
                  <div
                    className="flex-shrink-0 mt-[2px]"
                    style={{ width: 4, height: 20, background: '#F5921E' }}
                  />
                  <div>
                    <h3 className="font-syne font-medium text-[13px] text-white">{point.title}</h3>
                    <p className="font-dm text-[12px] mt-[3px]" style={{ color: '#666' }}>
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:w-[45%] flex flex-col justify-center gap-4">
            {/* Certifications card */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
              className="rounded-[4px] p-5 lg:p-6"
              style={{ background: '#222', border: '1px solid #2E2E2E' }}
            >
              <p
                className="font-mono text-[10px] tracking-wider"
                style={{ color: '#F5921E' }}
              >
                CERTIFICATIONS
              </p>
              <p className="font-dm text-[13px] mt-2 leading-[1.7]" style={{ color: '#777' }}>
                All connector brands are OEM certified. LUBO oils meet international standards for industrial applications.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['ISO Certified', 'OEM Approved', 'RoHS Compliant'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono text-[10px] px-2.5 py-[3px] rounded-full"
                    style={{ color: '#555', border: '1px solid #333' }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Response time card */}
            <motion.div
              ref={whyStatsRef}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={2}
              className="rounded-[4px] p-5 lg:p-6"
              style={{ background: '#222', border: '1px solid #2E2E2E' }}
            >
              <p className="font-mono text-[10px] tracking-wider" style={{ color: '#888' }}>
                RESPONSE TIME
              </p>
              <p
                className="font-syne font-bold text-[36px] leading-none mt-2"
                style={{ color: '#F5921E' }}
              >
                {whyStatsInView ? (
                  <CountUp end={24} duration={1.8} suffix="hrs" />
                ) : (
                  '0hrs'
                )}
              </p>
              <p className="font-dm text-[13px] mt-2" style={{ color: '#666' }}>
                Average response to quote requests
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 5: BRANDS MARQUEE ═══════════════════════════════ */}
      <section
        className="py-8 lg:py-12 px-6 lg:px-[80px] overflow-hidden"
        style={{ background: '#FAFAF8', borderTop: '1px solid #E8E8E4' }}
      >
        <p className="font-mono text-[11px] text-[#888] tracking-wider text-center lg:text-left max-w-[1200px] mx-auto mb-6 lg:mb-8">
          FEATURED CONNECTOR BRANDS
        </p>
        <div className="w-full relative max-w-[1400px] mx-auto">
          <div
            className="flex w-fit items-center overflow-x-hidden"
            aria-hidden="true"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {[...brandLogos, ...brandLogos].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Partner Brand Logo MEEHAAN Industrial"
                className="mx-6 lg:mx-[32px] h-[28px] object-contain pointer-events-none"
                style={{ filter: 'grayscale(0.6)', transition: 'filter 300ms ease' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(0.6)')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SECTION 6: CTA ═══════════════════════════════ */}
      <section
        className="py-8 lg:py-10 px-6 lg:px-[80px]"
        style={{ background: '#F5921E' }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-syne font-bold text-[22px]" style={{ color: '#1A1A1A' }}>
              Ready to place an order or get a quote?
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }} transition={{ duration: 0.18 }}>
              <Link
                to="/contact"
                className="font-dm font-medium text-[13px] px-6 py-2.5 rounded-[4px] inline-block"
                style={{ background: '#1A1A1A', color: '#fff', transition: 'box-shadow 200ms ease' }}
              >
                Contact Us
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                boxShadow: '0 0 20px rgba(0,184,160,0.45)',
                borderColor: '#00B8A0',
              }}
              transition={{ duration: 0.18 }}
              style={{ borderRadius: 4 }}
            >
              <a
                href="https://wa.me/919923588450?text=Hi%2C%20I%27m%20interested%20in%20MEEHAAN%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm font-medium text-[13px] px-6 py-2.5 rounded-[4px] inline-block"
                style={{
                  background: 'transparent',
                  border: '1.5px solid #1A1A1A',
                  color: '#1A1A1A',
                  transition: 'border-color 200ms ease',
                }}
              >
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'MEEHAAN Enterprise',
        'url': 'https://www.meehaan.com',
        'logo': 'https://www.meehaan.com/meehaan-logo.png',
        'description': 'Industrial lubricants, connectors, and digital solutions',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Gat No.1326, Unit-II, Shelarvasti, Ganesh Nagar, Chikhali',
          'addressLocality': 'Pune',
          'addressRegion': 'Maharashtra',
          'postalCode': '411062',
          'addressCountry': 'IN',
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-9923588450',
          'contactType': 'sales',
          'availableLanguage': ['English', 'Hindi', 'Marathi'],
        },
      })}</script>
    </div>
  );
};

export default IndustrialLanding;
