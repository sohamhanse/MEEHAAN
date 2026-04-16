import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

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

const Home = () => {
  const [divisionRef, divisionInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [industryRef, industryInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [brandsRef, brandsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const heroPanels = [
    {
      img: '/images/Products/Oil/Heat_Treatment.jpg',
      accent: 'var(--orange)',
      label: 'LUBO Brand',
      title: 'Industrial Oils',
      desc: 'Heat treatment, metalworking, cutting fluids, rust preventives and more — LUBO certified.',
      cta: 'Explore Oils →',
      link: '/solutions/industrial/oils',
      logo: '/meehaan_logo/LUBO Logo Without Bg-01.png',
    },
    {
      img: '/images/Trusted_Brand/C2.jpg',
      accent: 'var(--orange)',
      label: 'MEEHAAN Industrial',
      title: 'Automotive Connectors',
      desc: 'Authorized dealer for Yazaki, Sumitomo, TE Connectivity, Molex and 10+ global brands.',
      cta: 'Explore Connectors →',
      link: '/solutions/industrial/connectors',
    },
    {
      img: '/images/Home/connectors.jpg',
      accent: 'var(--orange)',
      label: 'MEEHAAN Industrial',
      title: 'Battery Accessories',
      desc: 'FRP & epoxy sheets, terminal blocks, connector assemblies for EV and solar applications.',
      cta: 'Explore Battery →',
      link: '/solutions/industrial/battery',
    },
    {
      img: '/images/Home/Home_About.jpg',
      accent: 'var(--teal)',
      label: 'MEEHAAN Digital',
      title: 'Software & AI',
      desc: 'Custom software development and AI automation for modern business operations.',
      cta: 'Explore Digital →',
      link: '/solutions/digital',
      ctaColor: 'var(--teal)',
    },
  ];

  const industries = [
    {
      name: 'Electric Vehicles',
      desc: 'Connectors, oils & battery accessories for EV supply chains',
      accent: 'var(--orange)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      name: 'Solar Energy',
      desc: 'Industrial lubricants and wiring systems for solar installations',
      accent: 'var(--orange)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      name: 'Automotive OEMs',
      desc: 'Certified connector brands and metalworking fluids for production lines',
      accent: 'var(--orange)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      name: 'Manufacturing',
      desc: 'Complete metalworking, forming and heat treatment fluid solutions',
      accent: 'var(--orange)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16z" />
        </svg>
      ),
    },
    {
      name: 'Die Casting & Forging',
      desc: 'Specialized release agents and quenching oils — LUBO certified',
      accent: 'var(--orange)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
        </svg>
      ),
    },
    {
      name: 'Digital Businesses',
      desc: 'Custom software and AI automation for scaling operations',
      accent: 'var(--teal)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  ];

  const brandLogos = [
    '/images/Trusted_Brand/Savita.jpg',
    '/images/Trusted_Brand/Condat.jpg',
    '/images/Trusted_Brand/TE.jpg',
    '/images/Trusted_Brand/Molex.jpg',
    '/images/Trusted_Brand/Aarna.jpg',
    '/images/Trusted_Brand/Savsol.jpg',
  ];

  return (
    <div className="bg-warmWhite min-h-screen">
      
      {/* ═══════════════════════════════ SECTION 1: HERO ═══════════════════════════════ */}
      <section className="bg-nearBlack min-h-screen flex flex-col lg:flex-row w-full overflow-hidden">
        
        {/* Left Side (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 lg:pl-[48px] lg:pr-12 py-[100px] lg:py-[40px] pt-[120px] lg:pt-[40px] relative z-10">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.12em] text-[#6B6B6B] mb-8 uppercase"
          >
            EST. 2018 · PUNE, INDIA
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="font-syne font-extrabold text-white leading-[1.05]"
            style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
          >
            Industrial<br />Precision.
            <div className="text-[var(--orange)] mt-2 lg:mt-0">
              Digital<br />Intelligence.
            </div>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="font-dm text-[14px] text-[#A0A0A0] max-w-[420px] mt-6"
          >
            Two focused divisions. One trusted partner for manufacturers, OEMs, and businesses scaling in modern India.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap gap-3 mt-9"
          >
            <Link
              to="/solutions/industrial"
              className="font-dm font-medium text-[14px] px-[20px] py-[10px] rounded-[4px] inline-block cursor-pointer"
              style={{ background: 'var(--orange)', color: 'var(--black)', transition: 'transform 180ms ease, box-shadow 180ms ease' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(245,146,30,0.35)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Explore Industrial
            </Link>
            <Link
              to="/solutions/digital"
              className="font-dm font-medium text-[14px] px-[20px] py-[10px] rounded-[4px] inline-block cursor-pointer"
              style={{ background: 'transparent', border: '1.5px solid var(--teal)', color: 'var(--teal)', transition: 'transform 180ms ease, box-shadow 180ms ease' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,184,160,0.25)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Explore Digital
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="flex items-center gap-2 mt-10 font-mono text-[11px] text-[#555]"
          >
            <span>7+ Years</span>
            <span className="text-[#333]">·</span>
            <span>500+ Clients</span>
            <span className="text-[#333]">·</span>
            <span>1000+ Products</span>
          </motion.div>
        </div>

        {/* Right Side (55%) - Hero Panels */}
        <div className="w-full lg:w-[55%] flex flex-col lg:flex-row h-auto lg:h-screen">
          {heroPanels.map((panel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + (idx * 0.1) }}
              className="hero-panel h-[280px] lg:h-full relative group"
            >
              <img src={panel.img} alt={panel.title} />
              <div className="panel-accent" style={{ backgroundColor: panel.accent }} />
              
              {/* Optional LUBO Overlay Logo */}
              {panel.logo && (
                <img
                  src={panel.logo}
                  alt="LUBO"
                  style={{ height: '22px', width: 'auto', objectFit: 'contain', opacity: 0.7, position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}
                />
              )}

              <div className="panel-content">
                <span className="panel-label">{panel.label}</span>
                <h3 className="font-syne panel-title">{panel.title}</h3>
                
                {/* Desktop uses CSS hover transitions from index.css */}
                <p className="panel-desc hidden lg:block">{panel.desc}</p>
                <Link
                  to={panel.link}
                  className="panel-cta hidden lg:flex"
                  style={{ color: panel.ctaColor || 'var(--orange)' }}
                >
                  {panel.cta}
                </Link>
                
                {/* Mobile always visible */}
                <p className="font-dm text-[14px] text-white/75 mt-2 lg:hidden max-w-[260px] line-height-[1.6]">
                  {panel.desc}
                </p>
                <Link
                  to={panel.link}
                  className="flex lg:hidden items-center gap-1 mt-4 font-dm text-[12px] font-medium"
                  style={{ color: panel.ctaColor || 'var(--orange)' }}
                >
                  {panel.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 2: DUAL DIVISION SHOWCASE ═══════════════════════════ */}
      <section ref={divisionRef} className="bg-warmWhite py-[64px] px-6 lg:px-[48px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={divisionInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--orange)] mb-4">OUR DIVISIONS</p>
            <h2 className="font-syne font-bold text-[var(--black)] text-4xl lg:text-[32px]">
              Two Disciplines. One Company.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[var(--border)] border border-[var(--border)]">
            
            {/* Industrial Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={divisionInView ? 'visible' : 'hidden'}
              custom={1}
              className="bg-white p-7 lg:p-[32px_28px] border-l-[4px] border-[var(--orange)]"
            >
              <img src="/meehaan_logo/LUBO Logo Without Bg-01.png" alt="LUBO" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
              <p className="font-mono text-[10px] text-[#6B6B6B] mt-3">MEEHAAN Industrial Division</p>
              
              <h3 className="font-syne font-bold text-[var(--black)] text-[20px] mt-7">
                Industrial Solutions
              </h3>
              <p className="font-dm text-[14px] text-[#555] leading-[1.7] mt-4 max-w-lg">
                Premium lubricants (LUBO brand), automotive connectors, and battery accessories — engineered for manufacturing floors, OEMs, and EV supply chains.
              </p>
              
              <div className="w-full h-[1px] bg-[var(--border)] my-7" />

              <div className="space-y-4">
                {[
                  { title: 'Industrial Oils (LUBO)', desc: 'Heat treatment, metalworking, cutting coolants, rust preventives' },
                  { title: 'Automotive Connectors', desc: 'Yazaki, Sumitomo, TE Connectivity, Molex and 10+ brands' },
                  { title: 'Battery Accessories', desc: 'FRP sheets, terminal blocks, connector assemblies for EV' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-[var(--orange)] mt-[8px] flex-shrink-0" />
                    <div>
                      <p className="font-dm font-medium text-[13px] text-[var(--black)]">{item.title}</p>
                      <p className="font-dm text-[13px] text-[#888]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/solutions/industrial" className="inline-block mt-8 font-dm font-medium text-[14px] text-[var(--orange)] hover:underline">
                View Industrial Products →
              </Link>
            </motion.div>

            {/* Digital Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={divisionInView ? 'visible' : 'hidden'}
              custom={2}
              className="bg-white p-7 lg:p-[32px_28px] border-l-[4px] border-[var(--teal)]"
            >
              <img src="/meehaan_logo/MEEHAAN Logo Without Bg-01.png" alt="MEEHAAN" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
              <p className="font-mono text-[10px] text-[#6B6B6B] mt-3">MEEHAAN Digital Division</p>
              
              <h3 className="font-syne font-bold text-[var(--black)] text-[20px] mt-7">
                Digital Solutions
              </h3>
              <p className="font-dm text-[14px] text-[#555] leading-[1.7] mt-4 max-w-lg">
                Custom software and AI-powered automation for businesses ready to scale. Built by practitioners who understand industrial and commercial operations.
              </p>
              
              <div className="w-full h-[1px] bg-[var(--border)] my-7" />

              <div className="space-y-4">
                {[
                  { title: 'Software Development', desc: 'CRMs, dashboards, web apps, APIs, portals' },
                  { title: 'AI Automation', desc: 'Chatbots, WhatsApp automation, lead management pipelines' },
                  { title: 'Workflow Systems', desc: 'End-to-end business process automation and integration' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-[var(--teal)] mt-[8px] flex-shrink-0" />
                    <div>
                      <p className="font-dm font-medium text-[13px] text-[var(--black)]">{item.title}</p>
                      <p className="font-dm text-[13px] text-[#888]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/solutions/digital" className="inline-block mt-8 font-dm font-medium text-[14px] text-[var(--teal)] hover:underline">
                View Digital Services →
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 3: INDUSTRIES WE SERVE ═══════════════════════════ */}
      <section ref={industryRef} className="bg-nearBlack py-[64px] px-6 lg:px-[48px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={industryInView ? 'visible' : 'hidden'}
            className="mb-16"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[#555] mb-4">
              INDUSTRIES
            </p>
            <h2 className="font-syne font-bold text-white text-4xl lg:text-[32px] max-w-2xl">
              Built for Modern India's Growth Sectors
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#2E2E2E]">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                variants={fadeUp}
                initial="hidden"
                animate={industryInView ? 'visible' : 'hidden'}
                custom={i}
                className="bg-[#222] p-8 rounded-none transition-colors duration-200 border border-transparent"
                style={{ 
                  borderRadius: i === 0 ? '8px 0 0 0' : i === 2 ? '0 8px 0 0' : i === 3 ? '0 0 0 8px' : i === 5 ? '0 0 8px 0' : 0 
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = industry.accent; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
              >
                <div style={{ color: industry.accent }} className="mb-4">
                  {industry.icon}
                </div>
                <h3 className="font-syne font-medium text-white text-[17px] mb-2">{industry.name}</h3>
                <p className="font-dm text-[14px] text-[#666] leading-[1.6]">
                  {industry.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 4: WHY MEEHAAN ═══════════════════════════ */}
      <section ref={whyRef} className="bg-warmWhite py-[64px] px-6 lg:px-[48px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            className="mb-16"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--orange)] mb-4">WHY US</p>
            <h2 className="font-syne font-bold text-[var(--black)] text-4xl lg:text-[32px]">
              The MEEHAAN Difference
            </h2>
          </motion.div>

          {/* 4 Columns */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12"
          >
            <div className="lg:border-r border-[var(--border)] lg:pr-[32px]">
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={7} duration={1.6} suffix="+" /> : '0+'}</p>
              <p className="font-syne font-semibold text-[15px] text-[var(--black)] mb-2">Years of Trust</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Operating since 2018 across industrial and digital sectors</p>
            </div>

            <div className="lg:border-r border-[var(--border)] lg:px-[32px]">
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={2} duration={1.2} /> : '0'}</p>
              <p className="font-syne font-semibold text-[15px] text-[var(--black)] mb-2">Focused Divisions</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Industrial supply and digital solutions — no scattered services</p>
            </div>

            <div className="lg:border-r border-[var(--border)] lg:px-[32px]">
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={1000} duration={2.0} suffix="+" separator="," /> : '0+'}</p>
              <p className="font-syne font-semibold text-[15px] text-[var(--black)] mb-2">Products Available</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Spanning oils, connectors, battery accessories and more</p>
            </div>

            <div className="lg:pl-[32px]">
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={500} duration={2.0} suffix="+" /> : '0+'}</p>
              <p className="font-syne font-semibold text-[15px] text-[var(--black)] mb-2">Clients Served</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">From small manufacturers to large-scale OEMs across India</p>
            </div>
          </motion.div>

          {/* Quote Block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            custom={2}
            className="bg-nearBlack rounded-[4px] mt-[80px] py-[40px] px-6 lg:px-[48px]"
          >
            <p className="font-syne italic font-bold text-white text-[24px] lg:text-[20px] leading-tight max-w-4xl">
              "We don't just supply products. We supply the expertise to use them right."
            </p>
            <p className="font-mono text-[13px] text-[#555] mt-6">
              — MEEHAAN Enterprise, Pune, Maharashtra
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 5: TRUSTED BRANDS ═══════════════════════════ */}
      <section ref={brandsRef} className="bg-white py-[56px] lg:px-[48px]">
        <div className="max-w-[1400px] mx-auto text-center px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={brandsInView ? 'visible' : 'hidden'}
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[#888] mb-4">OUR BRANDS</p>
            <h2 className="font-syne font-bold text-[var(--black)] text-4xl lg:text-[26px]">
              Authorized Partners
            </h2>
            <p className="font-dm text-[14px] text-[#888] mt-3">
              Official distributors for leading global and Indian manufacturers
            </p>
          </motion.div>
        </div>

        {/* Marquee Strip */}
        <div className="w-full overflow-hidden mt-[48px]">
          <div className="marquee-track flex items-center">
            {/* Duplicated for loop */}
            {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Partner Brand"
                className="mx-[28px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                style={{ height: '28px', objectFit: 'contain' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 6: CTA SPLIT ═══════════════════════════ */}
      <section ref={ctaRef} className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="bg-[var(--orange)] p-12 lg:p-[56px_48px]"
        >
          <p className="font-mono text-[11px] tracking-wide text-black/50 mb-3 uppercase">
            For Manufacturers & OEMs
          </p>
          <h3 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[26px] leading-tight max-w-sm">
            Need industrial lubricants or connectors?
          </h3>
          <p className="font-dm text-[14px] text-black/65 mt-4 max-w-sm line-height-[1.6]">
            Get a quote for LUBO oils, automotive connectors, or battery accessories.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--black)] text-white font-dm font-medium text-[14px] px-7 py-[14px] rounded-[4px] mt-8 hover:bg-black transition-colors"
          >
            Get a Quote
          </Link>
        </motion.div>

        {/* Right CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          custom={1}
          className="bg-[var(--teal)] p-12 lg:p-[56px_48px]"
        >
          <p className="font-mono text-[11px] tracking-wide text-black/40 mb-3 uppercase">
            For Businesses
          </p>
          <h3 className="font-syne font-bold text-[var(--black)] text-3xl lg:text-[26px] leading-tight max-w-sm">
            Ready to automate your operations?
          </h3>
          <p className="font-dm text-[14px] text-black/60 mt-4 max-w-sm line-height-[1.6]">
            Schedule a free consultation for software or AI automation services.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--black)] text-white font-dm font-medium text-[14px] px-7 py-[14px] rounded-[4px] mt-8 hover:bg-black transition-colors"
          >
            Book a Demo
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;