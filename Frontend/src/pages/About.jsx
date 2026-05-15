import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { FiCheckCircle, FiTarget, FiShield } from 'react-icons/fi';
import CountUp from 'react-countup';
import ClientTestimonials from '../components/ClientTestimonials';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin, DrawSVGPlugin);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const About = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [diffRef, diffInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [numbersRef, numbersInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [divisionsRef, divisionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [journeyRef, journeyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const heroH1Ref = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroDividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(heroH1Ref.current, { type: 'words', mask: 'words' });
      gsap.from(split.words, { yPercent: 110, stagger: 0.06, duration: 0.9, ease: 'power3.out', delay: 0.3 });
      gsap.to(heroBadgeRef.current, {
        scrambleText: { text: 'EST. 2018 · PUNE, MAHARASHTRA', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·.', revealDelay: 0.1, speed: 0.9 },
        duration: 1.5, delay: 0.2,
      });
      gsap.from(heroDividerRef.current, { drawSVG: 0, duration: 0.8, ease: 'power2.out', delay: 1.1 });
    });
    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: 2018, title: "Company Founded", description: "Started operations as an authorized distributor for industrial lubricants in Pune, Maharashtra." },
    { year: 2019, title: "Automotive Connectors", description: "Expanded product portfolio to include automotive connectors, serving Tier 1 and Tier 2 suppliers." },
    { year: 2021, title: "Operations Scaled", description: "Achieved a milestone of 100+ active industrial clients. Commenced operations in multiple cities." },
    { year: 2023, title: "Battery Materials", description: "Launched the Battery Accessories division specifically aimed at India's growing EV manufacturing sector." },
    { year: 2025, title: "Export Expansion", description: "Established export channels to European and US markets. Began serving international B2B clients with compliant documentation, HS codes, and global logistics support." },
  ];

  return (
    <div className="bg-white min-h-screen pt-[64px]">
      <SEOHead
        title="About MEEHAAN Enterprise — Industrial Solutions"
        description="MEEHAAN manufactures industrial oils since 2018 with 500+ clients across oil & gas, automotive, and EV sectors. ISO-certified, medium-scale production in Pune, India. Export-ready for Europe and US markets."
        canonical="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              "@id": "https://www.meehaan.com/about",
              "url": "https://www.meehaan.com/about",
              "name": "About MEEHAAN Enterprise",
              "description": "Founded in 2018, MEEHAAN Enterprise supplies industrial lubricants, automotive connectors, and battery accessories worldwide.",
              "isPartOf": { "@id": "https://www.meehaan.com/#website" },
              "about": { "@id": "https://www.meehaan.com/#organization" },
              "dateModified": new Date().toISOString().split('T')[0],
              "breadcrumb": { "@id": "https://www.meehaan.com/about#breadcrumb" }
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://www.meehaan.com/about#breadcrumb",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.meehaan.com/" },
                { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.meehaan.com/about" }
              ]
            }
          ]
        }}
      />

      {/* SECTION 1 — HERO */}
      <section ref={heroRef} className="relative bg-[#050805] min-h-[480px] overflow-hidden">
        {/* Full-bleed background image on the right */}
        <div className="absolute right-0 top-0 w-[100%] lg:w-[55%] h-full">
          <img
            src="/images/Home/Home_About.jpg"
            alt="MEEHAAN Foundation"
            fetchpriority="high"
            loading="eager"
            className="w-full h-full object-cover opacity-[0.18] filter brightness-[0.5]"
          />
          {/* Gradient overlay to fade it securely out towards the left */}
          <div className="absolute left-0 top-0 w-[60%] h-full bg-gradient-to-r from-[#050805] to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 py-12 lg:px-[80px] lg:py-[80px] max-w-[620px]">
          <p className="font-mono text-[11px] text-[#64748B] m-0">Home / About Us</p>

          <div ref={heroBadgeRef} className="mt-6 inline-block border font-mono text-[10px] text-[#F5A623] border-[#F5A623]/25 bg-[#F5A623]/[0.06] px-[14px] py-[4px] rounded-full">
            EST. 2018 · PUNE, MAHARASHTRA
          </div>

          <h1 ref={heroH1Ref} className="font-syne font-extrabold text-[32px] lg:text-[52px] text-white leading-none mt-5">
            Built on Trust.<br />
            Driven by Precision.
          </h1>

          <svg ref={heroDividerRef} width="48" height="3" viewBox="0 0 48 3" className="my-6" aria-hidden="true">
            <line x1="0" y1="1.5" x2="48" y2="1.5" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <p className="font-dm text-[15px] text-[#94A3B8] max-w-[480px] leading-[1.8]">
            MEEHAAN Enterprise was founded with a single belief — that manufacturers deserve a supplier who understands their floor, their deadlines, and their standards. Seven years on, that belief drives everything we do.
          </p>

          <div className="mt-10 inline-flex flex-row gap-0">
            <div className="pr-[28px] pl-0 flex flex-col justify-center h-[48px] border-r border-white/10">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={2018} duration={1.8} separator="" /> : '—'}</span>
              <span className="font-mono text-[10px] text-[#64748B] mt-[5px]">Founded</span>
            </div>
            <div className="px-[28px] flex flex-col justify-center h-[48px] border-r border-white/10">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={7} duration={1.4} suffix="+" /> : '0+'}</span>
              <span className="font-mono text-[10px] text-[#64748B] mt-[5px]">Years Active</span>
            </div>
            <div className="px-[28px] flex flex-col justify-center h-[48px] border-r border-white/10">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={500} duration={1.8} suffix="+" /> : '0+'}</span>
              <span className="font-mono text-[10px] text-[#64748B] mt-[5px]">Clients Served</span>
            </div>
            <div className="px-[28px] flex flex-col justify-center h-[48px]">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={2} duration={1.2} /> : '0'}</span>
              <span className="font-mono text-[10px] text-[#64748B] mt-[5px]">Product Divisions</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE MEEHAAN STORY */}
      <section ref={storyRef} className="bg-white py-14 lg:py-24 px-6 lg:px-[80px]">
        <motion.div 
          className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-[80px] items-start"
          variants={fadeUp}
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
        >
          {/* LEFT (48%) */}
          <div className="w-full lg:w-[48%] lg:sticky lg:top-[80px]">
            <p className="font-mono text-[11px] text-[#F5A623]">OUR STORY</p>
            <h2 className="font-syne font-bold text-[36px] text-[#050805] mt-3 leading-[1.15]">
              From a Vision to<br />a Trusted Brand
            </h2>
            <div className="w-[36px] h-[2px] bg-[#F5A623] my-5"></div>
            
            <img 
              src="/images/Home/Home_About.jpg" 
              alt="Our Story" 
              className="w-full h-[280px] object-cover rounded-[4px] border border-[#E8E8E4] mt-7"
            />
            {/* Floating quote block outside the image directly beneath it visually */}
            <div className="bg-[#184D3A] p-5 lg:px-6 lg:py-5 rounded-[4px] -mt-[1px] border-l-[3px] border-[#F5A623] relative w-11/12 lg:w-4/5">
              <p className="font-dm italic text-[13px] text-[#A0C4B8] leading-[1.6]">
                "Precision in supply is as important as precision in manufacturing."
              </p>
              <p className="font-mono text-[11px] text-[#7AA89A] mt-[10px]">— MEEHAAN Philosophy</p>
            </div>
          </div>

          {/* RIGHT (52%) */}
          <div className="w-full lg:w-[52%]">
            <div className="pb-8 mb-8 border-b border-[#F0F0EC]">
              <div className="inline-block border border-opacity-[0.2] border-[#F5A623] font-mono text-[11px] text-[#F5A623] px-[10px] py-[3px] rounded-full">
                2018 — THE BEGINNING
              </div>
              <h3 className="font-syne font-semibold text-[18px] text-[#050805] mt-3">
                Manufacturing Industrial Oils
              </h3>
              <p className="font-dm text-[14px] text-[#666] leading-[1.8] mt-3">
                MEEHAAN Enterprise was established in 2018 in Pune, Maharashtra, as a manufacturing operation for industrial lubricants. With medium-scale production capacity (100-500 tons annually), we manufacture LUBO-brand industrial oils and specialty fluids for India's manufacturing sector. Operating from Pune's industrial belt, our facility serves heat treatment plants, die casting units, metalworking facilities, and oil & gas applications with ISO-certified products.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-[#666]">
                <li className="flex items-start gap-2"><span className="text-[#F5A623] mt-0.5">✓</span> <span>ISO-certified manufacturing facility in Pune</span></li>
                <li className="flex items-start gap-2"><span className="text-[#F5A623] mt-0.5">✓</span> <span>100-500 tons annual production capacity</span></li>
                <li className="flex items-start gap-2"><span className="text-[#F5A623] mt-0.5">✓</span> <span>Oil & gas industry compliance certifications</span></li>
                <li className="flex items-start gap-2"><span className="text-[#F5A623] mt-0.5">✓</span> <span>Quality control across all product lines</span></li>
              </ul>
            </div>

            <div className="pb-8 mb-8 border-b border-[#F0F0EC]">
              <div className="inline-block border border-opacity-[0.2] border-[#F5A623] font-mono text-[11px] text-[#F5A623] px-[10px] py-[3px] rounded-full">
                2019 — EXPANDING THE PORTFOLIO
              </div>
              <h3 className="font-syne font-semibold text-[18px] text-[#050805] mt-3">
                Adding Automotive Connectors
              </h3>
              <p className="font-dm text-[14px] text-[#666] leading-[1.8] mt-3">
                Recognizing the explosive growth of India's automotive and EV sector, MEEHAAN entered the connector distribution business in 2019. We forged authorized partnerships with global leaders including Yazaki, Sumitomo, TE Connectivity, Molex, JST, and eight other premier brands — bringing OEM-grade components directly to wire harness manufacturers and Tier-1 suppliers across the country.
              </p>
            </div>

            <div className="pb-8 mb-8 border-b border-[#F0F0EC]">
              <div className="inline-block border border-opacity-[0.2] border-[#F5A623] font-mono text-[11px] text-[#F5A623] px-[10px] py-[3px] rounded-full">
                2021–2023 — STRENGTHENING & SCALING
              </div>
              <h3 className="font-syne font-semibold text-[18px] text-[#050805] mt-3">
                Battery Accessories & Pan-India Reach
              </h3>
              <p className="font-dm text-[14px] text-[#666] leading-[1.8] mt-3">
                As India's EV and solar industries gained momentum, MEEHAAN added a dedicated Battery Accessories division — supplying FRP insulation sheets, panel terminal blocks, Anderson connectors, and Degson energy storage connectors to battery pack assemblers and solar installers. Simultaneously, we expanded our logistics network to reliably serve clients from Mumbai to Chennai, Bangalore to Delhi NCR.
              </p>
            </div>

          </div>
        </motion.div>
      </section>

      {/* SECTION 3 — WHAT MAKES US DIFFERENT */}
      <section ref={diffRef} className="bg-[#FAFAF8] py-14 lg:py-24 px-6 lg:px-[80px]">
        <motion.div 
          className="max-w-[600px] mx-auto text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          animate={diffInView ? "visible" : "hidden"}
        >
          <p className="font-mono text-[11px] text-[#888]">THE MEEHAAN DIFFERENCE</p>
          <h2 className="font-syne font-bold text-[36px] text-[#050805] mt-2 leading-[1.2]">
            Not Just a Supplier.<br />A Partner Who Understands Your Industry.
          </h2>
          <p className="font-dm text-[14px] text-[#888] mt-4 leading-[1.7]">
            Most suppliers ship products. MEEHAAN provides application expertise, certified sourcing, and the kind of support that keeps your production line running.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#E8E8E4] border border-[#E8E8E4] rounded-[8px] overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          animate={diffInView ? "visible" : "hidden"}
        >
          {/* Blocks */}
          {[
            { n: '01', t: 'Authorized Sourcing Only', d: 'Every product comes from verified, authorized channels. No grey market. No substitutes. Guaranteed genuine.' },
            { n: '02', t: 'Application Expertise', d: 'Our team understands industrial processes — we don\'t just sell products, we help you select the right one for your specific application and operating conditions.' },
            { n: '03', t: 'Pan-India Logistics', d: 'Reliable supply to all major manufacturing hubs — Pune, Mumbai, Chennai, Bangalore, Delhi NCR, Surat, Coimbatore and more.' },
            { n: '04', t: '24-Hour Quote Response', d: 'Send us a requirement and receive a detailed quote within 24 business hours. For urgent needs, our WhatsApp line gets you a faster response.' },
            { n: '05', t: 'Multiple Product Categories', d: 'Oils, connectors, and battery accessories — each category managed with deep technical expertise and dedicated sourcing teams.' },
            { n: '06', t: 'Long-Term Relationships', d: 'Over 500 clients have stayed with MEEHAAN long-term. We earn that trust through consistent quality, honest communication, and reliable delivery.' }
          ].map((b, i) => (
            <div key={i} className="bg-white p-8 lg:px-7 lg:py-8 block group w-full h-full hover:bg-[#FAFAF8] transition-colors">
              <span className="font-mono text-[13px] text-[#F5A623]">{b.n}</span>
              <h3 className="font-syne font-semibold text-[16px] text-[#050805] mt-4">{b.t}</h3>
              <div className="divider w-[28px] h-[2px] bg-[#E8E8E4] my-[14px] transition-colors duration-300 group-hover:bg-[#F5A623]"></div>
              <p className="font-dm text-[13px] text-[#888] leading-[1.65]">
                {b.d}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4 — BY THE NUMBERS */}
      <section ref={numbersRef} className="bg-[#F8FAFC] py-12 lg:py-20 border-t border-[#E8E8E4]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-10"
            variants={fadeUp}
            initial="hidden"
            animate={numbersInView ? "visible" : "hidden"}
          >
            {[
              { n: '7+', l: 'Years of Operation', d: 'Continuously serving India\'s manufacturing sector since 2018' },
              { n: '500+', l: 'Clients Served', d: 'From small workshops to large OEMs and Tier-1 suppliers' },
              { n: '13+', l: 'Connector Brands', d: 'Authorized distributor for global connector manufacturers' },
              { n: '2', l: 'Business Divisions', d: 'Industrial Oils, Connectors, and Battery Accessories' }
            ].map((stat, i) => (
              <div key={i} className={`text-center px-4 lg:px-10 ${i % 2 === 0 ? 'border-r border-[#E8E8E4] lg:border-r' : ''} ${i === 1 ? 'lg:border-r border-[#E8E8E4]' : ''} ${i === 3 ? 'border-r-0' : ''}`}>
                <div className="font-syne font-extrabold text-[52px] text-[#F5A623] leading-none">{stat.n}</div>
                <div className="font-syne font-medium text-[15px] text-[#050805] mt-3">{stat.l}</div>
                <div className="font-dm text-[13px] text-[#888] mt-2 leading-[1.5]">{stat.d}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-[72px] pt-[56px] border-t border-[#E8E8E4] text-center px-6"
            variants={fadeUp}
            initial="hidden"
            animate={numbersInView ? "visible" : "hidden"}
          >
            <p className="font-dm italic text-[20px] text-[#555] max-w-[680px] mx-auto leading-[1.7]">
              "We started with one product category and one city. Seven years later, we serve hundreds of clients across India with multiple product divisions. The constants have always been the same — genuine products, honest pricing, and people who pick up the phone."
            </p>
            <p className="font-mono text-[12px] text-[#888] mt-5">— MEEHAAN Enterprise, Pune, Maharashtra</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — OUR TWO DIVISIONS */}
      <section ref={divisionsRef} className="bg-[#FAFAF8] py-14 lg:py-20 border-t border-[#E8E8E4] px-6 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[11px] text-[#888]">WHAT WE DO</p>
          <h2 className="font-syne font-bold text-[32px] text-[#050805] mt-2">
            Two Divisions, One Partner
          </h2>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10"
            variants={fadeUp}
            initial="hidden"
            animate={divisionsInView ? "visible" : "hidden"}
          >
            {/* Division 1 — Manufacturing */}
            <div className="bg-white border border-[#E8E8E4] border-t-[3px] border-t-[#F5A623] rounded-[4px] p-8 lg:p-[32px_28px] hover:-translate-y-[2px] hover:border-[#F5A623] transition-all duration-200">
              <img src="/meehaan_logo/LUBO Logo Without Bg-01.png" alt="LUBO brand" className="h-[24px] mb-5 object-contain" />
              <h3 className="font-syne font-semibold text-[20px] text-[#050805]">Manufacturing — Industrial Oils</h3>
              <p className="font-dm text-[14px] text-[#888] mt-[10px] leading-[1.7]">
                In-house LUBO-brand oil manufacturing with 100–500 tons annual capacity. Heat treatment, metalworking, and specialty fluids for oil & gas, automotive, and industrial sectors.
              </p>
              <div className="mt-5">
                {[
                  "100–500 tons annual production capacity",
                  "LUBO brand — 10+ oil categories",
                  "ISO-certified facility in Pune, Maharashtra"
                ].map((row, i) => (
                  <div key={i} className="flex gap-[10px] items-center py-2 border-b border-[#F5F5F0]">
                    <div className="w-[6px] h-[6px] bg-[#F5A623] rounded-sm" />
                    <span className="font-dm text-[13px] text-[#555]">{row}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/solutions/industrial/oils" className="font-dm font-medium text-[13px] text-[#F5A623] hover:underline">
                  Explore Industrial Oils →
                </Link>
              </div>
            </div>

            {/* Division 2 — Trading */}
            <div className="bg-white border border-[#E8E8E4] border-t-[3px] border-t-[#184D3A] rounded-[4px] p-8 lg:p-[32px_28px] hover:-translate-y-[2px] hover:border-[#184D3A] transition-all duration-200">
              <div className="h-[24px] mb-5 flex items-center">
                <span className="font-mono text-[10px] tracking-[0.12em] text-[#888] uppercase border border-[#E8E8E4] px-[10px] py-[3px] rounded-full">Authorized Distribution</span>
              </div>
              <h3 className="font-syne font-semibold text-[20px] text-[#050805]">Trading — Connectors & Battery</h3>
              <p className="font-dm text-[14px] text-[#888] mt-[10px] leading-[1.7]">
                Authorized distributor for 13+ global connector brands and specialist battery accessories for EV and solar manufacturing supply chains.
              </p>
              <div className="mt-5">
                {[
                  "Automotive Connectors — Yazaki, Sumitomo, TE, Molex & more",
                  "Battery Accessories — Anderson, Degson, FRP, Terminal blocks",
                  "Pan-India delivery from Pune logistics hub"
                ].map((row, i) => (
                  <div key={i} className="flex gap-[10px] items-center py-2 border-b border-[#F5F5F0]">
                    <div className="w-[6px] h-[6px] bg-[#184D3A] rounded-sm" />
                    <span className="font-dm text-[13px] text-[#555]">{row}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <Link to="/solutions/industrial/connectors" className="font-dm font-medium text-[13px] text-[#184D3A] hover:underline">
                  Connectors →
                </Link>
                <Link to="/solutions/industrial/battery" className="font-dm font-medium text-[13px] text-[#184D3A] hover:underline">
                  Battery Accessories →
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — CORE VALUES */}
      <section ref={valuesRef} className="bg-white py-14 lg:py-20 border-t border-[#E8E8E4] px-6 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[11px] text-[#F5A623]">OUR VALUES</p>
          <h2 className="font-syne font-bold text-[32px] text-[#050805] mt-2">What We Stand For</h2>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[#E8E8E4] border border-[#E8E8E4] rounded-[8px] overflow-hidden mt-10"
            variants={fadeUp}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {/* Value 1 */}
            <div className="bg-white p-8 lg:p-[32px_28px] border-t-[3px] border-t-[#F5A623]">
               <div className="w-[40px] h-[40px] bg-[#FFFBF0] border border-[#FFE4A8] rounded-[4px] flex items-center justify-center">
                 <FiCheckCircle className="text-[#F5A623]" size={20} />
               </div>
               <h3 className="font-syne font-semibold text-[17px] text-[#050805] mt-[20px]">Uncompromising Quality</h3>
               <div className="w-[28px] h-[2px] bg-[#F5A623] my-[14px]"></div>
               <p className="font-dm text-[13px] text-[#888] leading-[1.7]">
                  We source only genuine, certified products from authorized channels. If we can't guarantee authenticity, we don't supply it.
               </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 lg:p-[32px_28px] border-t-[3px] border-t-[#184D3A]">
               <div className="w-[40px] h-[40px] bg-[#EEF5F1] border border-[#C8DDD5] rounded-[4px] flex items-center justify-center">
                 <FiShield className="text-[#184D3A]" size={20} />
               </div>
               <h3 className="font-syne font-semibold text-[17px] text-[#050805] mt-[20px]">Reliable, Every Time</h3>
               <div className="w-[28px] h-[2px] bg-[#184D3A] my-[14px]"></div>
               <p className="font-dm text-[13px] text-[#888] leading-[1.7]">
                  We show up — with the right product, at the right time, at the right price. Reliability isn't a promise, it's our operating standard.
               </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 lg:p-[32px_28px] border-t-[3px] border-t-[#F5A623]">
               <div className="w-[40px] h-[40px] bg-[#FFFBF0] border border-[#FFE4A8] rounded-[4px] flex items-center justify-center">
                 <FiTarget className="text-[#F5A623]" size={20} />
               </div>
               <h3 className="font-syne font-semibold text-[17px] text-[#050805] mt-[20px]">Partnership Mindset</h3>
               <div className="w-[28px] h-[2px] bg-[#F5A623] my-[14px]"></div>
               <p className="font-dm text-[13px] text-[#888] leading-[1.7]">
                 We invest in understanding your business — your processes, your volumes, your deadlines. Long-term relationships are more valuable to us than one-time transactions.
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 — JOURNEY TIMELINE */}
      <section ref={journeyRef} className="bg-[#FAFAF8] py-14 lg:py-20 border-t border-[#E8E8E4] px-6 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <p className="font-mono text-[11px] text-[#888]">OUR JOURNEY</p>
          <h2 className="font-syne font-bold text-[32px] text-[#050805] mt-2">Seven Years of Growth</h2>

          <div className="relative mt-14 pt-[4px]">
             {/* Center Line */}
             <div className="absolute top-0 bottom-0 left-[16px] lg:left-[50%] w-[1px] bg-[#E8E8E4]"></div>
             
             {milestones.map((ms, idx) => {
               const isEven = idx % 2 === 0;
               return (
                 <motion.div 
                   key={idx}
                   initial={{ x: isEven ? 32 : -32, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: idx * 0.1 }}
                   className={`flex flex-col lg:flex-row mb-[48px] relative w-full ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} pl-[48px] lg:pl-0`}
                 >
                   {/* Center Dot */}
                   <div className="absolute left-[16px] lg:left-[50%] top-[4px] w-[14px] h-[14px] bg-white border-[2px] border-[#F5A623] rounded-full -translate-x-[6.5px] lg:-translate-x-1/2"></div>
                   
                   <div className={`w-[100%] lg:w-[45%] ${isEven ? 'lg:pr-[48px] lg:text-right' : 'lg:pl-[48px] lg:text-left'}`}>
                     <div className="font-mono text-[12px] font-medium text-[#F5A623] bg-[#F5A623]/[0.07] border border-[#F5A623]/20 px-[12px] py-[4px] rounded-full inline-block">
                       {ms.year}
                     </div>
                     <h3 className="font-syne font-semibold text-[16px] text-[#050805] mt-3">
                       {ms.title}
                     </h3>
                     <p className="font-dm text-[13px] text-[#777] mt-2 leading-[1.65]">
                       {ms.description}
                     </p>
                   </div>
                   
                   {/* Spacer for the other side */}
                   <div className="hidden lg:block w-[45%]"></div>
                 </motion.div>
               );
             })}
          </div>
        </div>
      </section>

      {/* SECTION 7B — EXPORT CAPABILITY */}
      <section className="bg-white py-[72px] lg:py-[104px] border-t border-[#E8E8E4]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Header — asymmetric 2-col */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="font-mono text-[11px] text-[#F5A623] tracking-[0.14em] uppercase mb-3">Global Reach</p>
              <h2 className="font-syne font-bold text-[#050805] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                Export-Ready Supplier for<br />International Markets
              </h2>
            </div>
            <p className="font-dm text-[14px] text-[#888] max-w-[360px] leading-[1.75]">
              Established export capabilities with manufacturing-backed solutions actively expanding into US, European, and global markets.
            </p>
          </div>

          {/* Cards — flush grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E8E8E4]">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                label: 'Manufacturing Credentials',
                desc: 'ISO certifications, oil & gas compliance, and facility audits that support international contracts and buyer due diligence.',
                tag: 'ISO · CE · REACH'
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
                label: 'Logistics & Documentation',
                desc: 'Full experience with international shipping, HS codes, customs clearance, and DDP/CIF trade terms for seamless delivery.',
                tag: 'DDP · CIF · EXW'
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                label: 'Compliance & Standards',
                desc: 'RoHS, REACH, and regional certifications ensure products meet regulatory requirements across international markets.',
                tag: 'RoHS · REACH · CE'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 lg:p-10 group hover:bg-[#FAFAF8] transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-[#FFFBF0] border border-[#FFE4A8] rounded-[4px] flex items-center justify-center text-[#F5A623] mb-6">
                  {item.icon}
                </div>
                <h3 className="font-syne font-semibold text-[16px] text-[#050805] mb-3 leading-snug">{item.label}</h3>
                <p className="font-dm text-[13px] text-[#888] leading-[1.75] mb-6">{item.desc}</p>
                <span className="font-mono text-[10px] tracking-[0.08em] text-[#F5A623] bg-[#F5A623]/[0.07] border border-[#F5A623]/20 px-[10px] py-[4px] rounded-full">
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Proof bar */}
          <div className="mt-10 pt-8 border-t border-[#E8E8E4] grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: 'US & EU', l: 'Export Markets' },
              { n: 'DDP/CIF', l: 'Trade Terms Supported' },
              { n: 'ISO', l: 'Certified Facility' },
              { n: '24 hrs', l: 'Export Quote Turnaround' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-syne font-bold text-[22px] text-[#050805] leading-none">{s.n}</span>
                <span className="font-mono text-[10px] text-[#888] mt-2 tracking-[0.05em]">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — TEAM & LEADERSHIP */}
      <section className="py-[72px] lg:py-[104px] bg-[#FAFAF8] border-t border-[#E8E8E4]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Header — asymmetric 2-col */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="font-mono text-[11px] text-[#F5A623] tracking-[0.14em] uppercase mb-3">Leadership</p>
              <h2 className="font-syne font-bold text-[#050805] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                The Team Behind<br />Every Delivery
              </h2>
            </div>
            <p className="font-dm text-[14px] text-[#888] max-w-[360px] leading-[1.75]">
              Industry veterans with deep expertise in manufacturing, supply chain, and technical applications.
            </p>
          </div>

          {/* Cards — flush grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E8E8E4]">
            {[
              {
                initials: 'ML',
                name: 'Manufacturing Lead',
                role: 'Oil Production & Quality Control',
                bio: 'Oversees manufacturing operations, ISO compliance, and product quality for LUBO-brand oils at 100–500 tons annual capacity.',
                expertise: ['Oil Manufacturing', 'ISO Standards', 'Quality Assurance'],
                years: '12'
              },
              {
                initials: 'TS',
                name: 'Technical Specialist',
                role: 'Applications & Specifications',
                bio: 'Provides technical guidance on lubrication and connector specifications for oil & gas, automotive, and EV battery sectors.',
                expertise: ['Lubrication Engineering', 'Connector Specs', 'EV Standards'],
                years: '9'
              },
              {
                initials: 'SM',
                name: 'Supply Chain Manager',
                role: 'Logistics & Distribution',
                bio: 'Manages export documentation, international shipping, and supply chain operations for US, European, and Asia-Pacific markets.',
                expertise: ['Export Compliance', 'Logistics', 'International Trade'],
                years: '11'
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 lg:p-10 flex flex-col group hover:bg-[#FAFAF8] transition-colors duration-200"
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 bg-[#050805] rounded-[4px] flex items-center justify-center shrink-0">
                    <span className="font-syne font-bold text-[13px] text-white">{member.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-syne font-semibold text-[15px] text-[#050805] leading-tight">{member.name}</h3>
                    <p className="font-mono text-[10px] text-[#F5A623] tracking-[0.08em] uppercase mt-[3px]">{member.role}</p>
                  </div>
                </div>

                {/* Years badge */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] text-[#888] border border-[#E8E8E4] px-[10px] py-[4px] rounded-full">
                    {member.years}+ yrs experience
                  </span>
                </div>

                <p className="font-dm text-[13px] text-[#888] leading-[1.75] flex-1 mb-7">{member.bio}</p>

                {/* Divider */}
                <div className="border-t border-[#E8E8E4] pt-5">
                  <div className="flex flex-wrap gap-[6px]">
                    {member.expertise.map((skill, j) => (
                      <span key={j} className="font-mono text-[10px] bg-[#F5F5F0] border border-[#E8E8E4] text-[#555] px-[10px] py-[4px] rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <ClientTestimonials />

      {/* SECTION 9 — FINAL CTA */}
      <section ref={ctaRef} className="bg-[#F5A623] py-[44px] lg:py-[72px] px-6 lg:px-[80px]">
         <motion.div 
           className="max-w-[1100px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-[24px]"
           variants={fadeUp}
           initial="hidden"
           animate={ctaInView ? "visible" : "hidden"}
         >
           <div className="text-center lg:text-left">
             <h2 className="font-syne font-bold text-[28px] text-[#050805]">Ready to partner with MEEHAAN?</h2>
             <p className="font-dm text-[14px] text-black/60 mt-[10px]">
               At any industrial scale, let's start with a conversation.
             </p>
           </div>
           
           <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
             <Link
               to="/contact"
               className="bg-[#184D3A] text-white font-dm font-medium text-[13px] py-[12px] px-[28px] rounded-[4px] text-center transition-opacity hover:opacity-90"
             >
               Contact Us
             </Link>
             <Link
               to="/solutions/industrial"
               className="bg-transparent border-[1.5px] border-[#050805]/20 text-[#050805] font-dm font-medium text-[13px] py-[12px] px-[28px] rounded-[4px] text-center transition-colors hover:bg-[#050805]/5"
             >
               Explore Products
             </Link>
           </div>
         </motion.div>
      </section>
    </div>
  );
};

export default About;
