import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { FiCheckCircle, FiTarget, FiShield } from 'react-icons/fi';
import CountUp from 'react-countup';

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

  const milestones = [
    { year: 2018, title: "Company Founded", description: "Started operations as an authorized distributor for industrial lubricants in Pune, Maharashtra." },
    { year: 2019, title: "Automotive Connectors", description: "Expanded product portfolio to include automotive connectors, serving Tier 1 and Tier 2 suppliers." },
    { year: 2021, title: "Operations Scaled", description: "Achieved a milestone of 100+ active industrial clients. Commenced operations in multiple cities." },
    { year: 2023, title: "Battery Materials", description: "Launched the Battery Accessories division specifically aimed at India\'s growing EV manufacturing sector." },
    { year: 2024, title: "Digital Division", description: "Launched MEEHAAN Digital, expanding into software development and AI automation for industrial clients." },
  ];

  return (
    <div className="bg-white min-h-screen pt-[64px]">
      <SEOHead
        title="About Us | MEEHAAN Enterprise"
        description="Learn about MEEHAAN Enterprise. From our founding in 2018 to becoming a trusted partner for industrial products and digital solutions across India."
        keywords="about MEEHAAN, industrial supplier Pune, connector distributor India, LUBO oils, MEEHAAN history"
        canonicalUrl="/about"
      />

      {/* SECTION 1 — HERO */}
      <section ref={heroRef} className="relative bg-[#1A1A1A] min-h-[480px] overflow-hidden">
        {/* Full-bleed background image on the right */}
        <div className="absolute right-0 top-0 w-[100%] lg:w-[55%] h-full">
          <img 
            src="/images/Home/Home_About.jpg" 
            alt="MEEHAAN Foundation" 
            className="w-full h-full object-cover opacity-[0.15] filter brightness-[0.4]"
          />
          {/* Gradient overlay to fade it securely out towards the left */}
          <div className="absolute left-0 top-0 w-[60%] h-full bg-gradient-to-r from-[#1A1A1A] to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 py-12 lg:px-[80px] lg:py-[80px] max-w-[620px]">
          <p className="font-mono text-[11px] text-[#555] m-0">Home / About Us</p>
          
          <div className="mt-6 inline-block border font-mono text-[10px] text-[#F5A623] border-[#F5A623]/25 bg-[#F5A623]/[0.06] px-[14px] py-[4px] rounded-full">
            EST. 2018 · PUNE, MAHARASHTRA
          </div>

          <h1 className="font-syne font-extrabold text-[32px] lg:text-[52px] text-white leading-none mt-5">
            Built on Trust.<br />
            Driven by Precision.
          </h1>

          <div className="w-[48px] h-[3px] bg-[#F5A623] my-6"></div>

          <p className="font-dm text-[15px] text-[#999] max-w-[480px] leading-[1.8]">
            MEEHAAN Enterprise was founded with a single belief — that manufacturers deserve a supplier who understands their floor, their deadlines, and their standards. Seven years on, that belief drives everything we do.
          </p>

          <div className="mt-10 inline-flex flex-row gap-0">
            <div className="pr-[28px] pl-0 flex flex-col justify-center h-[48px] border-r border-[#2A2A2A]">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={2018} duration={1.8} separator="" /> : '—'}</span>
              <span className="font-mono text-[10px] text-[#555] mt-[5px]">Founded</span>
            </div>
            <div className="px-[28px] flex flex-col justify-center h-[48px] border-r border-[#2A2A2A]">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={7} duration={1.4} suffix="+" /> : '0+'}</span>
              <span className="font-mono text-[10px] text-[#555] mt-[5px]">Years Active</span>
            </div>
            <div className="px-[28px] flex flex-col justify-center h-[48px] border-r border-[#2A2A2A]">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={500} duration={1.8} suffix="+" /> : '0+'}</span>
              <span className="font-mono text-[10px] text-[#555] mt-[5px]">Clients Served</span>
            </div>
            <div className="px-[28px] flex flex-col justify-center h-[48px]">
              <span className="font-syne font-bold text-[26px] text-[#F5A623] leading-none">{heroInView ? <CountUp end={3} duration={1.2} /> : '0'}</span>
              <span className="font-mono text-[10px] text-[#555] mt-[5px]">Product Divisions</span>
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
            <h2 className="font-syne font-bold text-[36px] text-[#1A1A1A] mt-3 leading-[1.15]">
              From a Vision to<br />a Trusted Brand
            </h2>
            <div className="w-[36px] h-[2px] bg-[#F5A623] my-5"></div>
            
            <img 
              src="/images/Home/Home_About.jpg" 
              alt="Our Story" 
              className="w-full h-[280px] object-cover rounded-[4px] border border-[#E8E8E4] mt-7"
            />
            {/* Floating quote block outside the image directly beneath it visually */}
            <div className="bg-[#1A1A1A] p-5 lg:px-6 lg:py-5 rounded-[4px] -mt-[1px] border-l-[3px] border-[#F5A623] relative w-11/12 lg:w-4/5">
              <p className="font-dm italic text-[13px] text-[#888] leading-[1.6]">
                "Precision in supply is as important as precision in manufacturing."
              </p>
              <p className="font-mono text-[11px] text-[#555] mt-[10px]">— MEEHAAN Philosophy</p>
            </div>
          </div>

          {/* RIGHT (52%) */}
          <div className="w-full lg:w-[52%]">
            <div className="pb-8 mb-8 border-b border-[#F0F0EC]">
              <div className="inline-block border border-opacity-[0.2] border-[#F5A623] font-mono text-[11px] text-[#F5A623] px-[10px] py-[3px] rounded-full">
                2018 — THE BEGINNING
              </div>
              <h3 className="font-syne font-semibold text-[18px] text-[#1A1A1A] mt-3">
                Starting with Industrial Oils
              </h3>
              <p className="font-dm text-[14px] text-[#666] leading-[1.8] mt-3">
                MEEHAAN Enterprise was established in 2018 in Pune, Maharashtra, with a focused mandate — to supply high-quality industrial lubricants to India's growing manufacturing sector. Operating from the heart of Pune's industrial belt, we began by partnering with LUBO, a premium industrial oils brand, to serve heat treatment plants, die casting units, and metalworking facilities.
              </p>
            </div>

            <div className="pb-8 mb-8 border-b border-[#F0F0EC]">
              <div className="inline-block border border-opacity-[0.2] border-[#F5A623] font-mono text-[11px] text-[#F5A623] px-[10px] py-[3px] rounded-full">
                2019 — EXPANDING THE PORTFOLIO
              </div>
              <h3 className="font-syne font-semibold text-[18px] text-[#1A1A1A] mt-3">
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
              <h3 className="font-syne font-semibold text-[18px] text-[#1A1A1A] mt-3">
                Battery Accessories & Pan-India Reach
              </h3>
              <p className="font-dm text-[14px] text-[#666] leading-[1.8] mt-3">
                As India's EV and solar industries gained momentum, MEEHAAN added a dedicated Battery Accessories division — supplying FRP insulation sheets, panel terminal blocks, Anderson connectors, and Degson energy storage connectors to battery pack assemblers and solar installers. Simultaneously, we expanded our logistics network to reliably serve clients from Mumbai to Chennai, Bangalore to Delhi NCR.
              </p>
            </div>

            <div className="pb-0">
              <div className="inline-block border border-opacity-[0.2] border-[#F5A623] font-mono text-[11px] text-[#F5A623] px-[10px] py-[3px] rounded-full">
                2024 — DIGITAL DIVISION
              </div>
              <h3 className="font-syne font-semibold text-[18px] text-[#1A1A1A] mt-3">
                Launching MEEHAAN Digital Solutions
              </h3>
              <p className="font-dm text-[14px] text-[#666] leading-[1.8] mt-3">
                In 2024, MEEHAAN launched its Digital Solutions division — offering custom software development and AI automation to businesses ready to scale. Drawn from our deep experience in industrial operations, our digital tools are practical, deployment-ready, and built for the way Indian businesses actually work.
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
          <h2 className="font-syne font-bold text-[36px] text-[#1A1A1A] mt-2 leading-[1.2]">
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
            { n: '05', t: 'Two Focused Divisions', d: 'Industrial supply and digital solutions — run as separate focused operations, not as add-ons. You get dedicated expertise for each.' },
            { n: '06', t: 'Long-Term Relationships', d: 'Over 500 clients have stayed with MEEHAAN long-term. We earn that trust through consistent quality, honest communication, and reliable delivery.' }
          ].map((b, i) => (
            <div key={i} className="bg-white p-8 lg:px-7 lg:py-8 block group w-full h-full hover:bg-[#FAFAF8] transition-colors">
              <span className="font-mono text-[13px] text-[#F5A623]">{b.n}</span>
              <h3 className="font-syne font-semibold text-[16px] text-[#1A1A1A] mt-4">{b.t}</h3>
              <div className="divider w-[28px] h-[2px] bg-[#E8E8E4] my-[14px] transition-colors duration-300 group-hover:bg-[#F5A623]"></div>
              <p className="font-dm text-[13px] text-[#888] leading-[1.65]">
                {b.d}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4 — BY THE NUMBERS */}
      <section ref={numbersRef} className="bg-[#1A1A1A] py-12 lg:py-20">
        <div className="max-w-[1100px] mx-auto">
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
              { n: '3', l: 'Business Divisions', d: 'Industrial Oils, Connectors, Battery Accessories, and Digital' }
            ].map((stat, i) => (
              <div key={i} className={`text-center px-4 lg:px-10 ${i % 2 === 0 ? 'border-r border-[#2A2A2A] lg:border-r' : ''} ${i === 1 ? 'lg:border-r border-[#2A2A2A]' : ''} ${i === 3 ? 'border-r-0' : ''}`}>
                <div className="font-syne font-extrabold text-[52px] text-[#F5A623] leading-none">{stat.n}</div>
                <div className="font-syne font-medium text-[15px] text-white mt-3">{stat.l}</div>
                <div className="font-dm text-[13px] text-[#666] mt-2 leading-[1.5]">{stat.d}</div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-[72px] pt-[56px] border-t border-[#2A2A2A] text-center px-6"
            variants={fadeUp}
            initial="hidden"
            animate={numbersInView ? "visible" : "hidden"}
          >
            <p className="font-dm italic text-[20px] text-[#777] max-w-[680px] mx-auto leading-[1.7]">
              "We started with one product category and one city. Seven years later, we serve hundreds of clients across India with three product divisions and a growing digital arm. The constants have always been the same — genuine products, honest pricing, and people who pick up the phone."
            </p>
            <p className="font-mono text-[12px] text-[#444] mt-5">— MEEHAAN Enterprise, Pune, Maharashtra</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — OUR TWO DIVISIONS */}
      <section ref={divisionsRef} className="bg-[#FAFAF8] py-14 lg:py-20 border-t border-[#E8E8E4] px-6 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[11px] text-[#888]">WHAT WE DO</p>
          <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A] mt-2">
            Two Divisions, One Partner
          </h2>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10"
            variants={fadeUp}
            initial="hidden"
            animate={divisionsInView ? "visible" : "hidden"}
          >
            {/* Industrial */}
            <div className="bg-white border border-[#E8E8E4] border-t-[3px] border-t-[#F5A623] rounded-[4px] p-8 lg:p-[32px_28px] hover:-translate-y-[2px] hover:border-[#F5A623] transition-all duration-200">
              <img src="/meehaan_logo/LUBO Logo Without Bg-01.png" alt="LUBO" className="h-[24px] mb-5 object-contain" />
              <h3 className="font-syne font-semibold text-[20px] text-[#1A1A1A]">Industrial Solutions</h3>
              <p className="font-dm text-[14px] text-[#888] mt-[10px] leading-[1.7]">
                Industrial oils under the LUBO brand, automotive connectors from 13+ global manufacturers, and battery accessories for EV and solar applications.
              </p>
              
              <div className="mt-5">
                {[
                  "LUBO Industrial Oils — 10 product categories",
                  "Automotive Connectors — Yazaki, Sumitomo, TE & more",
                  "Battery Accessories — FRP sheets, terminals, connectors"
                ].map((row, i) => (
                  <div key={i} className="flex gap-[10px] items-center py-2 border-b border-[#F5F5F0]">
                    <div className="w-[6px] h-[6px] bg-[#F5A623] rounded-sm"></div>
                    <span className="font-dm text-[13px] text-[#555]">{row}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/solutions/industrial" className="font-dm font-medium text-[13px] text-[#F5A623] hover:underline">
                  Explore Industrial Solutions →
                </Link>
              </div>
            </div>

            {/* Digital */}
            <div className="bg-white border border-[#E8E8E4] border-t-[3px] border-t-[#00B8A0] rounded-[4px] p-8 lg:p-[32px_28px] hover:-translate-y-[2px] hover:border-[#00B8A0] transition-all duration-200">
              <img src="/meehaan_logo/MEEHAAN Logo Without Bg-01.png" alt="MEEHAAN" className="h-[28px] mb-5 object-contain" />
              <h3 className="font-syne font-semibold text-[20px] text-[#1A1A1A]">Digital Solutions</h3>
              <p className="font-dm text-[14px] text-[#888] mt-[10px] leading-[1.7]">
                Custom software development and AI automation tools built for businesses ready to operate smarter and scale faster.
              </p>
              
              <div className="mt-5">
                {[
                  "Software Development — CRMs, dashboards, web apps, APIs",
                  "AI Automation — WhatsApp bots, lead pipelines, workflows",
                  "Workflow Systems — End-to-end business process automation"
                ].map((row, i) => (
                  <div key={i} className="flex gap-[10px] items-center py-2 border-b border-[#F5F5F0]">
                    <div className="w-[6px] h-[6px] bg-[#00B8A0] rounded-sm"></div>
                    <span className="font-dm text-[13px] text-[#555]">{row}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/solutions/digital" className="font-dm font-medium text-[13px] text-[#00B8A0] hover:underline">
                  Explore Digital Solutions →
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
          <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A] mt-2">What We Stand For</h2>

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
               <h3 className="font-syne font-semibold text-[17px] text-[#1A1A1A] mt-[20px]">Uncompromising Quality</h3>
               <div className="w-[28px] h-[2px] bg-[#F5A623] my-[14px]"></div>
               <p className="font-dm text-[13px] text-[#888] leading-[1.7]">
                  We source only genuine, certified products from authorized channels. If we can't guarantee authenticity, we don't supply it.
               </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 lg:p-[32px_28px] border-t-[3px] border-t-[#1A1A1A]">
               <div className="w-[40px] h-[40px] bg-[#F5F5F0] border border-[#E8E8E4] rounded-[4px] flex items-center justify-center">
                 <FiShield className="text-[#1A1A1A]" size={20} />
               </div>
               <h3 className="font-syne font-semibold text-[17px] text-[#1A1A1A] mt-[20px]">Reliable, Every Time</h3>
               <div className="w-[28px] h-[2px] bg-[#1A1A1A] my-[14px]"></div>
               <p className="font-dm text-[13px] text-[#888] leading-[1.7]">
                  We show up — with the right product, at the right time, at the right price. Reliability isn't a promise, it's our operating standard.
               </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 lg:p-[32px_28px] border-t-[3px] border-t-[#F5A623]">
               <div className="w-[40px] h-[40px] bg-[#FFFBF0] border border-[#FFE4A8] rounded-[4px] flex items-center justify-center">
                 <FiTarget className="text-[#F5A623]" size={20} />
               </div>
               <h3 className="font-syne font-semibold text-[17px] text-[#1A1A1A] mt-[20px]">Partnership Mindset</h3>
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
          <h2 className="font-syne font-bold text-[32px] text-[#1A1A1A] mt-2">Seven Years of Growth</h2>

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
                     <h3 className="font-syne font-semibold text-[16px] text-[#1A1A1A] mt-3">
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

      {/* SECTION 8 — FINAL CTA */}
      <section ref={ctaRef} className="bg-[#F5A623] py-[44px] lg:py-[72px] px-6 lg:px-[80px]">
         <motion.div 
           className="max-w-[1100px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-[24px]"
           variants={fadeUp}
           initial="hidden"
           animate={ctaInView ? "visible" : "hidden"}
         >
           <div className="text-center lg:text-left">
             <h2 className="font-syne font-bold text-[28px] text-[#1A1A1A]">Ready to partner with MEEHAAN?</h2>
             <p className="font-dm text-[14px] text-black/60 mt-[10px]">
               At any scale, industrial or digital — let's start with a conversation.
             </p>
           </div>
           
           <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
             <Link 
               to="/contact"
               className="bg-[#1A1A1A] text-white font-dm font-medium text-[13px] py-[12px] px-[28px] rounded-[4px] text-center transition-opacity hover:opacity-90"
             >
               Contact Us
             </Link>
             <Link 
               to="/solutions/industrial"
               className="bg-transparent border-[1.5px] border-black/20 text-[#1A1A1A] font-dm font-medium text-[13px] py-[12px] px-[28px] rounded-[4px] text-center transition-colors hover:bg-black/5"
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
