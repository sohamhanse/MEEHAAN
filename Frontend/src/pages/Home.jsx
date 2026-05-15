import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import SEOHead from '../components/SEOHead';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ShieldCheck, Boxes, Users, Clock4, ArrowRight, Zap, Globe2, MessageSquare, FileText, Truck, CheckCircle2 } from 'lucide-react';
import ClientTestimonials from '../components/ClientTestimonials';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin, DrawSVGPlugin);

const DashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '3px' }}>
    <rect x="3" y="7" width="10" height="2" fill="#FF6600" />
  </svg>
);

// col: 'left' | 'middle' | 'right'
const IndustryCard = ({ industry, col = 'left', gridCol, gridRow, delay = 0 }) => {
  const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const initX = col === 'left' ? -28 : col === 'right' ? 28 : 0;
  const initY = col === 'middle' ? 28 : 8;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, x: initX, y: initY },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      style={{ gridColumn: gridCol, gridRow, width: '100%' }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', marginBottom: '14px', width: '100%', aspectRatio: industry.aspectRatio, position: 'relative' }}>
        <img
          src={industry.image}
          alt={industry.name}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 450ms cubic-bezier(0.22,1,0.36,1)',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: '#FF6600', width: '0', transition: 'width 350ms ease' }}
          onMouseOver={e => { e.currentTarget.style.width = '100%'; }}
          onMouseOut={e => { e.currentTarget.style.width = '0'; }}
        />
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#050805', marginBottom: '12px', fontFamily: 'Syne, sans-serif' }}>
        {industry.name}
      </h3>

      {/* Bullet points */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {industry.points.map((point, i) => (
          <motion.div
            key={point}
            initial={{ opacity: 0, x: -8 }}
            animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.35, delay: delay + 0.16 + i * 0.06, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
          >
            <DashIcon />
            <span style={{ fontSize: '0.8rem', color: '#444444', lineHeight: '1.5' }}>{point}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const StepNum = ({ num, label, gridCol, gridRow }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{ gridColumn: gridCol, gridRow, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '12px' }}
    >
      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(88px, 10vw, 148px)', color: '#F5A623', opacity: 0.09, lineHeight: 1, userSelect: 'none' }}>
        {num}
      </span>
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '10px' }}>
        {label}
      </span>
    </motion.div>
  );
};


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
  const [industryRef, industryInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [brandsRef, brandsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const heroH1Ref = useRef(null);
  const heroBadgeTextRef = useRef(null);
  const heroLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(heroH1Ref.current, { type: 'words', mask: 'words' });
      gsap.from(split.words, { yPercent: 110, stagger: 0.06, duration: 0.9, ease: 'power3.out', delay: 0.3 });
      gsap.to(heroBadgeTextRef.current, {
        scrambleText: { text: 'Global Supply · 7+ Years · 500+ Clients', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·', revealDelay: 0.2, speed: 0.8 },
        duration: 1.8, delay: 0.5,
      });
      gsap.from(heroLineRef.current, { drawSVG: 0, duration: 1.2, ease: 'power2.inOut', delay: 1.0 });
    });
    return () => ctx.revert();
  }, []);

  const industries = [
    {
      name: 'Metal Works',
      image: '/images/Home/metal-working-fluids-and-oils-1000x1000.jpeg',
      aspectRatio: '1000/563',
      points: ['Metalworking fluids', 'Cutting coolants', 'Metal forming oils', 'Rust preventives'],
    },
    {
      name: 'Lithium-ion Battery Manufacturer',
      image: '/images/Home/Lithium-ion.jpg',
      aspectRatio: '770/470',
      points: ['Cell assembly lubricants', 'Busbar connectors', 'Battery terminal blocks', 'FRP & epoxy sheets'],
    },
    {
      name: 'Electric Vehicles',
      image: '/images/Home/ev_battery.jpg',
      aspectRatio: '1800/1013',
      points: ['Anderson connectors', 'Battery terminal blocks', 'EV wire harness', 'High-current connectors'],
    },
    {
      name: 'Wire Harness',
      image: '/images/Trusted_Brand/C2.jpg',
      aspectRatio: '470/445',
      points: ['Yazaki connectors', 'Sumitomo terminals', 'TE Connectivity', 'Sealed connector systems'],
    },
    {
      name: 'Generator Manufacturer',
      image: '/images/Home/Generatorjpg.jpg',
      aspectRatio: '1/1',
      points: ['Industrial lubricants', 'Cooling system fluids', 'Anti-rust coatings', 'Maintenance oils'],
    },
    {
      name: 'Heat Treatment',
      image: '/images/Products/Heat_Treatment/Vacuum_Quenching_Oils.jpg',
      points: ['Heat treatment salts', 'Quenching oils', 'Polymer quenchants', 'Carburizing chemicals'],
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

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.meehaan.com/#webpage",
        "url": "https://www.meehaan.com/",
        "name": "Industrial Lubricants, Connectors & Battery Accessories — MEEHAAN Enterprise",
        "isPartOf": { "@id": "https://www.meehaan.com/#website" },
        "about": { "@id": "https://www.meehaan.com/#organization" },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".hero-description"]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.meehaan.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What industrial oils does MEEHAAN Enterprise supply?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "MEEHAAN Enterprise supplies LUBO-branded industrial oils including heat treatment oils, metalworking fluids, cutting coolants, rust preventives, fire-resistant hydraulic fluids, die casting release agents, and industrial cleaners. Manufacturing capacity is 100–500 tons annually from our Pune facility."
            }
          },
          {
            "@type": "Question",
            "name": "Does MEEHAAN supply automotive connectors for EV manufacturers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. MEEHAAN is an authorized distributor for 13+ global connector brands including Yazaki, Sumitomo, TE Connectivity, Molex, and JST. We supply sealed connectors, high-current Anderson connectors, and OEM-grade connectors suitable for EV battery pack assembly and wire harness manufacturing."
            }
          },
          {
            "@type": "Question",
            "name": "Where is MEEHAAN Enterprise located and do they export internationally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "MEEHAAN Enterprise is headquartered at Gat No. 1326, Unit-II, Shelarvasti, Chikhali, Pune 411062, Maharashtra, India. We export to the United States, Germany, United Kingdom, and other markets with DDP (Delivered Duty Paid) and CIF logistics arrangements available."
            }
          },
          {
            "@type": "Question",
            "name": "What battery accessories does MEEHAAN supply for EV and solar applications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "MEEHAAN supplies FRP (Fiber Reinforced Plastic) insulation sheets, epoxy insulation materials, panel terminal blocks, Anderson high-current connectors, Degson energy storage connectors, and PG glands for EV battery pack assembly and solar energy applications. All products meet RoHS compliance and automotive-grade specifications."
            }
          },
          {
            "@type": "Question",
            "name": "How can I get a quote from MEEHAAN Enterprise?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can request a quote by visiting meehaan.com/contact, calling +91 99235 88450, or emailing sales@meehaan.com. MEEHAAN also responds via WhatsApp at the same number for faster B2B inquiries."
            }
          },
          {
            "@type": "Question",
            "name": "What certifications and compliance standards does MEEHAAN meet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "MEEHAAN's products meet ISO standards for industrial applications, RoHS compliance for electronic components, REACH compliance for EU markets, and OEM specifications for automotive Tier-1 suppliers. Technical Data Sheets (TDS) are available on request for all LUBO-branded oils."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead
        title="Industrial Lubricants, Connectors & Battery Accessories — MEEHAAN Enterprise"
        description="Oil manufacturer and B2B solution provider. 100-500 tons annual capacity. LUBO industrial lubricants, automotive connectors, battery accessories for oil & gas, EV, and industrial sectors. Pan-India delivery."
        canonical="/"
        jsonLd={pageSchema}
      />

      {/* ═══════════════════════════════ SECTION 1: HERO ═══════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center w-full relative overflow-hidden" style={{ borderTop: '3px solid var(--orange)', background: '#FFF8EE' }}>
        {/* Decorative elements */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'var(--orange)', opacity: 0.07 }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'var(--orange)', opacity: 0.04 }} />

        <motion.div
          initial={false}
          animate="visible"
          variants={fadeUp}
          className="max-w-[640px] text-center px-6 py-[140px] relative z-10"
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 border border-[#E8DFD4] rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span ref={heroBadgeTextRef} className="font-mono text-[10px] tracking-[0.1em] text-[#777] uppercase">Global Supply · 7+ Years · 500+ Clients</span>
          </div>

          <h1
            ref={heroH1Ref}
            className="font-serif font-bold italic text-nearBlack leading-[1.1] flex flex-col items-center"
            style={{ fontSize: 'clamp(26px, 4.5vw, 52px)' }}
          >
            <span className="whitespace-nowrap">Industrial Oil Manufacturer</span>
            <span className="whitespace-nowrap">&amp; Global B2B Solution Provider</span>
          </h1>

          <svg ref={heroLineRef} width="80" height="3" viewBox="0 0 80 3" className="mx-auto mt-6" aria-hidden="true">
            <line x1="0" y1="1.5" x2="80" y2="1.5" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <p className="font-dm text-[15px] text-[#666] mt-4 leading-[1.8] max-w-[480px] mx-auto">
            Precision-grade lubricants, automotive connectors, and battery components — sourced from global brands, delivered to manufacturers worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link
              to="/solutions/industrial"
              className="font-dm font-semibold text-[14px] px-[28px] py-[14px] rounded-[4px] inline-flex items-center gap-2 cursor-pointer"
              style={{ background: 'var(--orange)', color: '#050805', transition: 'transform 180ms ease, box-shadow 180ms ease' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(245,166,35,0.35)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              View Industrial Products <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="font-dm font-medium text-[14px] px-[28px] py-[14px] rounded-[4px] inline-flex items-center gap-2 cursor-pointer border border-[#D0C8BF] text-[#444] bg-white/70 hover:border-[#999] transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mini stat strip */}
          <div className="flex justify-center gap-6 mt-12 pt-10 border-t border-[#EAE3D9]">
            {[
              { value: '1000+', label: 'Products' },
              { value: '500+', label: 'Clients Served' },
              { value: '10+', label: 'Global Brands' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-syne font-extrabold text-[22px] text-nearBlack leading-none">{value}</p>
                <p className="font-mono text-[9px] tracking-[0.1em] text-[#999] uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════ SECTION 3: INDUSTRIES WE SERVE ═══════════════════════════ */}
      <section ref={industryRef} style={{ background: '#f5f4ef', padding: '2.5rem 2.5rem 0 2.5rem' }}>
        <div style={{ background: '#ffffff', padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px) clamp(64px, 10vw, 120px)' }}>

          {/* ── Desktop: full-width heading, then 2-col grid ── */}
          <div className="hidden md:block">

            {/* Heading — full width */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 24 }}
              animate={industryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className="font-mono uppercase mb-4"
                style={{ color: '#FF6600', fontSize: '0.75rem', letterSpacing: '0.08em' }}
                initial={{ opacity: 0 }}
                animate={industryInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                Industries We Serve
              </motion.p>
              <h2 className="font-syne max-w-2xl" style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 800, lineHeight: '120%', color: '#050805' }}>
                Built for the industries that build the world.
              </h2>
            </motion.div>

            {/* 3-col zigzag: left → right → middle → left → right → middle */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                columnGap: 'clamp(28px, 3vw, 48px)',
                rowGap: 'clamp(48px, 6vw, 80px)',
              }}
            >
              {/* Row 1 — card col 1 */}
              <IndustryCard industry={industries[0]} col="left"   gridCol={1} gridRow={1} delay={0} />
              <StepNum num="01" label="Metal Works"       gridCol={2} gridRow={1} />

              {/* Row 2 — card col 3 */}
              <StepNum num="02" label="Li-ion Battery Mfr." gridCol={2} gridRow={2} />
              <IndustryCard industry={industries[1]} col="right"  gridCol={3} gridRow={2} delay={0} />

              {/* Row 3 — card col 2 */}
              <StepNum num="03" label="Electric Vehicles" gridCol={1} gridRow={3} />
              <IndustryCard industry={industries[2]} col="middle" gridCol={2} gridRow={3} delay={0} />

              {/* Row 4 — card col 1 */}
              <IndustryCard industry={industries[3]} col="left"   gridCol={1} gridRow={4} delay={0} />
              <StepNum num="04" label="Wire Harness"      gridCol={2} gridRow={4} />

              {/* Row 5 — card col 3 */}
              <StepNum num="05" label="Generator Mfr."    gridCol={2} gridRow={5} />
              <IndustryCard industry={industries[4]} col="right"  gridCol={3} gridRow={5} delay={0} />

              {/* Row 6 — card col 2 */}
              <StepNum num="06" label="Heat Treatment"    gridCol={1} gridRow={6} />
              <IndustryCard industry={industries[5]} col="middle" gridCol={2} gridRow={6} delay={0} />
            </div>
          </div>

          {/* ── Mobile Swiper ── */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={industryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono uppercase mb-3" style={{ color: '#FF6600', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                Industries We Serve
              </p>
              <h2 className="font-syne mb-10" style={{ fontSize: 'clamp(1.6rem, 6vw, 2rem)', fontWeight: 800, lineHeight: '120%', color: '#050805' }}>
                Built for the industries that build the world.
              </h2>
            </motion.div>

            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1.08}
              style={{ paddingBottom: '52px', paddingRight: '16px' }}
            >
              {industries.map((industry) => (
                <SwiperSlide key={industry.name} style={{ height: 'auto' }}>
                  <IndustryCard industry={industry} col="middle" delay={0} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════ SECTION 4: WHY MEEHAAN ═══════════════════════════ */}
      <section ref={whyRef} className="bg-white py-[64px] px-6 lg:px-[48px] border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            className="mb-16"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--orange)] mb-4">WHY US</p>
            <h2 className="font-syne font-bold text-nearBlack text-4xl lg:text-[32px]">
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
              <Clock4 size={20} className="text-[var(--orange)] mb-4" />
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={7} duration={1.6} suffix="+" /> : '0+'}</p>
              <p className="font-syne font-semibold text-[15px] text-nearBlack mb-2">Years in Business</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Serving manufacturers since 2018 — with zero shortcuts</p>
            </div>

            <div className="lg:border-r border-[var(--border)] lg:px-[32px]">
              <Zap size={20} className="text-[var(--orange)] mb-4" />
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={2} duration={1.2} /> : '0'}</p>
              <p className="font-syne font-semibold text-[15px] text-nearBlack mb-2">Expert Divisions</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Industrial oils, connectors, and battery accessories — deep expertise across all three</p>
            </div>

            <div className="lg:border-r border-[var(--border)] lg:px-[32px]">
              <Boxes size={20} className="text-[var(--orange)] mb-4" />
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={1000} duration={2.0} suffix="+" separator="," /> : '0+'}</p>
              <p className="font-syne font-semibold text-[15px] text-nearBlack mb-2">Products in Catalogue</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Oils, connectors, battery accessories — all under one roof</p>
            </div>

            <div className="lg:pl-[32px]">
              <Users size={20} className="text-[var(--orange)] mb-4" />
              <p className="font-syne font-extrabold text-[40px] text-[var(--orange)] leading-none mb-2">{whyInView ? <CountUp end={500} duration={2.0} suffix="+" /> : '0+'}</p>
              <p className="font-syne font-semibold text-[15px] text-nearBlack mb-2">Clients Worldwide</p>
              <p className="font-dm text-[12px] text-[#888] leading-relaxed">Small job shops to large global OEMs — we scale with you</p>
            </div>
          </motion.div>

          {/* Quote Block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            custom={2}
            className="border border-[var(--border)] border-l-[4px] rounded-[4px] mt-[80px] py-[40px] px-6 lg:px-[48px]"
            style={{ borderLeftColor: 'var(--orange)' }}
          >
            <p className="font-syne italic font-bold text-nearBlack text-[24px] lg:text-[20px] leading-tight max-w-4xl">
              "We don't just supply products. We supply the expertise to use them right."
            </p>
            <p className="font-mono text-[13px] text-[#AAA] mt-6">
              — MEEHAAN Enterprise, Pune, Maharashtra
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 4B: HOW WE WORK ═══════════════════════════ */}
      <section className="bg-[#FAFAF8] py-[72px] lg:py-[104px] border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--orange)] mb-3 uppercase">How It Works</p>
              <h2 className="font-syne font-bold text-nearBlack" style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
                From Inquiry to Delivery
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-dm font-medium text-[13px] text-[var(--orange)] hover:underline shrink-0"
            >
              Start your inquiry <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Desktop connector line */}
            <div className="absolute hidden lg:block top-[21px] left-[calc(12.5%+26px)] right-[calc(12.5%+26px)] h-px bg-[#DDD]" />

            {[
              { step: '01', title: 'Send Inquiry', desc: 'Share your requirement via WhatsApp or our form. Product, quantity, and application — that\'s all we need.', Icon: MessageSquare },
              { step: '02', title: 'Technical Review', desc: 'Our team reviews your application and recommends the right product specifications for your process.', Icon: CheckCircle2 },
              { step: '03', title: 'Receive Quote', desc: 'Detailed pricing, MOQ, and lead time within 24 business hours. Transparent, no hidden charges.', Icon: FileText },
              { step: '04', title: 'Delivery', desc: 'Pan-India dispatch from Pune. Tracking provided, delivery to your manufacturing hub on schedule.', Icon: Truck },
            ].map(({ step, title, desc, Icon }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative px-8 py-10 border-b sm:border-b-0 sm:border-r border-[#E8E8E0] last:border-0 lg:border-r lg:last:border-r-0 group"
              >
                {/* Step circle */}
                <div className="relative z-10 w-[42px] h-[42px] rounded-full border-2 border-[var(--orange)] bg-white flex items-center justify-center mb-8 group-hover:bg-[var(--orange)] transition-colors duration-200">
                  <span className="font-mono text-[11px] font-bold text-[var(--orange)] group-hover:text-white transition-colors duration-200">{step}</span>
                </div>

                {/* Ghost number background */}
                <span className="absolute top-8 right-6 font-syne font-extrabold text-[80px] leading-none text-[#F5A623] opacity-[0.05] select-none pointer-events-none">{step}</span>

                <Icon size={26} className="text-[var(--orange)] mb-5" strokeWidth={1.5} />
                <h3 className="font-syne font-semibold text-[17px] text-nearBlack mb-3">{title}</h3>
                <p className="font-dm text-[13px] text-[#777] leading-[1.85]">{desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════ SECTION 5: TRUSTED BRANDS ═══════════════════════════ */}
      <section ref={brandsRef} className="bg-warmWhite py-[56px] lg:px-[48px] border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto text-center px-6 lg:px-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={brandsInView ? 'visible' : 'hidden'}
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-[#999] mb-4">OUR BRANDS</p>
            <h2 className="font-syne font-bold text-nearBlack text-4xl lg:text-[26px]">
              Authorized Partners
            </h2>
            <p className="font-dm text-[14px] text-[#888] mt-3">
              Official distributors for leading global manufacturers
            </p>
          </motion.div>
        </div>

        {/* Marquee Strip */}
        <div className="w-full overflow-hidden mt-[48px]">
          <div className="marquee-track flex items-center">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => {
              const brandNames = ['Savita', 'Condat', 'TE Connectivity', 'Molex', 'Aarna', 'Savsol'];
              const brandName = brandNames[i % brandNames.length];
              return (
                <img
                  key={i}
                  src={logo}
                  alt={`${brandName} - Authorized Distributor`}
                  className="mx-[28px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  style={{ height: '28px', width: '80px', objectFit: 'contain' }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SECTION 5B: INTERNATIONAL REACH ═══════════════════════════ */}
      <section className="py-[72px] lg:py-[104px] bg-[#F5F5F0] border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          >
            <div>
              <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] uppercase mb-3">Global Reach</p>
              <h2 className="font-syne font-bold text-nearBlack leading-[1.15]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                Export-Ready for<br className="hidden lg:block" /> Global Markets
              </h2>
            </div>
            <p className="font-dm text-[14px] text-[#666] max-w-[380px] leading-[1.75]">
              Expanding into US, European, and Asian markets with manufacturing-backed solutions and international compliance documentation.
            </p>
          </motion.div>

          {/* 3 region tiles — full-width, flush grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#DDDDD5]">
            {[
              {
                region: 'Europe',
                markets: ['Germany', 'UK', 'France', 'Benelux'],
                signal: 'CE & REACH Compliant',
                detail: 'Serving EU manufacturing & distribution sectors'
              },
              {
                region: 'North America',
                markets: ['USA', 'Canada'],
                signal: 'FDA-compatible Products',
                detail: 'US industrial and specialty lubricant requirements'
              },
              {
                region: 'Asia-Pacific',
                markets: ['Singapore', 'Thailand', 'India'],
                signal: 'ISO & Local Standards',
                detail: 'Pan-Asia manufacturing and battery supply chains'
              }
            ].map((market, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 lg:p-10 flex flex-col group hover:bg-[#FEFEFE] transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-[#FFF8EE] border border-[#F5A623]/20 flex items-center justify-center shrink-0">
                    <Globe2 size={16} className="text-[var(--orange)]" />
                  </div>
                  <h3 className="font-syne font-bold text-[22px] text-nearBlack">{market.region}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {market.markets.map((m, j) => (
                    <span key={j} className="font-dm text-[12px] bg-[#F5F5F0] text-[#555] px-3 py-[5px] rounded-[3px]">
                      {m}
                    </span>
                  ))}
                </div>

                <p className="font-dm text-[13px] text-[#888] leading-[1.7] flex-1">{market.detail}</p>

                <div className="mt-7 pt-5 border-t border-[#F0F0E8]">
                  <p className="font-mono text-[10px] text-[var(--orange)] tracking-[0.1em] uppercase">{market.signal}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Credentials proof bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            viewport={{ once: true }}
            className="mt-px grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#DDDDD5]"
          >
            {[
              { title: 'Manufacturing Credentials', desc: 'ISO certifications, oil & gas compliance, and facility audits for international contracts.' },
              { title: 'Export Documentation', desc: 'HS codes, commercial invoices, DDP/CIF logistics, and customs procedure support.' },
              { title: 'Compliance & Standards', desc: 'RoHS, REACH, CE marking, and regional certifications for key markets.' },
            ].map((cred, i) => (
              <div key={i} className="bg-white px-8 py-6 flex items-start gap-4">
                <div className="w-[3px] min-h-[40px] self-stretch bg-[var(--orange)] rounded-full shrink-0 mt-1" />
                <div>
                  <p className="font-syne font-semibold text-[14px] text-nearBlack">{cred.title}</p>
                  <p className="font-dm text-[12px] text-[#777] mt-1.5 leading-[1.65]">{cred.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════ CLIENT TESTIMONIALS ═══════════════════════════ */}
      <ClientTestimonials />

      {/* ═══════════════════════════ SECTION 6: CTA SPLIT ═══════════════════════════ */}
      <section ref={ctaRef} className="border-t border-[var(--border)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2"
        >
          {/* Left — forest panel for export */}
          <div className="bg-[#184D3A] p-12 lg:p-[56px_48px]">
            <p className="font-mono text-[11px] tracking-wide text-[#7AA89A] mb-3 uppercase">Export & Bulk Orders</p>
            <h3 className="font-syne font-bold text-white text-[22px] lg:text-[26px] leading-tight max-w-sm">
              Sourcing at scale? We supply globally.
            </h3>
            <p className="font-dm text-[14px] text-[#A0C4B8] mt-4 max-w-sm leading-[1.6]">
              From sample orders to 500-ton annual contracts. Export documentation and international logistics support included.
            </p>
            <a
              href="mailto:sales@meehaan.com"
              className="inline-flex items-center gap-2 text-white font-dm font-medium text-[14px] mt-8 border border-white/20 px-7 py-[14px] rounded-[4px] hover:bg-white/10 transition-colors"
            >
              Email Export Team <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — orange panel for domestic */}
          <div className="bg-[var(--orange)] p-12 lg:p-[56px_48px]">
            <p className="font-mono text-[11px] tracking-wide text-black/50 mb-3 uppercase">For Manufacturers & OEMs</p>
            <h3 className="font-syne font-bold text-nearBlack text-[22px] lg:text-[26px] leading-tight max-w-sm">
              Need industrial lubricants or connectors?
            </h3>
            <p className="font-dm text-[14px] text-black/65 mt-4 max-w-sm leading-[1.6]">
              Get a quote for LUBO oils, automotive connectors, or battery accessories. 24-hour response.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-nearBlack text-white font-dm font-medium text-[14px] px-7 py-[14px] rounded-[4px] mt-8 hover:bg-black transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
