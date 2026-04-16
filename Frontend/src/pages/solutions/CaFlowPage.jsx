import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import SEOHead from '../../components/SEOHead';

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE = [0.23, 1, 0.32, 1];

// ─── Variants ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
};
const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: EASE },
  }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SectionLabel = ({ children, color = '#F5921E' }) => (
  <div className="flex items-center gap-3 mb-3">
    <div style={{ width: 24, height: 1, background: color }} />
    <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color }}>
      {children}
    </span>
  </div>
);

// ─── Stat with CountUp ────────────────────────────────────────────────────────
const StatItem = ({ value, suffix, label, color, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="text-center"
    >
      <div className="font-syne font-extrabold" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color, lineHeight: 1 }}>
        {inView ? <CountUp end={value} duration={2.0} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="font-dm text-[12px] mt-1.5 leading-[1.5]" style={{ color: '#888' }}>{label}</p>
    </motion.div>
  );
};

// ─── Feature Card with Hover Expand ──────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, example, accent = '#F5921E', index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1px solid ${hov ? accent + '45' : '#E8E8E4'}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 8,
        padding: '24px 20px',
        transition: 'border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? `0 10px 28px ${accent}12` : '0 2px 6px rgba(0,0,0,0.03)',
        cursor: 'default',
      }}
    >
      <motion.div
        animate={{ scale: hov ? 1.1 : 1 }}
        transition={{ duration: 0.2, ease: EASE }}
        style={{
          width: 40, height: 40, borderRadius: 8,
          background: accent + '10', border: `1px solid ${accent}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        {icon}
      </motion.div>
      <h3 className="font-syne font-semibold text-[#1A1A1A]" style={{ fontSize: 15 }}>{title}</h3>
      <p className="font-dm text-[13px] text-[#888] mt-2 leading-[1.65]">{desc}</p>
      <AnimatePresence>
        {hov && example && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden"
          >
            <div style={{ background: accent + '08', border: `1px solid ${accent}20`, borderRadius: 6, padding: '10px 12px' }}>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: accent }}>Example</p>
              <p className="font-dm text-[11px] leading-[1.6]" style={{ color: '#666' }}>{example}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Problem Item ─────────────────────────────────────────────────────────────
const ProblemItem = ({ text, index }) => (
  <motion.div
    variants={fadeLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={index}
    className="flex items-start gap-3 mb-4"
  >
    <div style={{ width: 22, height: 22, borderRadius: 5, background: '#FEF3C7', border: '1px solid #F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5">
        <path d="M12 9v4M12 17h.01" />
      </svg>
    </div>
    <p className="font-dm text-[14px] text-[#555] leading-[1.65]">{text}</p>
  </motion.div>
);

// ─── Process Step ─────────────────────────────────────────────────────────────
const ProcessStep = ({ num, title, desc, index }) => {
  const [hov, setHov] = useState(false);
  const active = index === 0;
  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      custom={index}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="flex gap-5 items-start"
    >
      <motion.div
        whileInView={{ scale: [0.7, 1.15, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: EASE }}
        style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: active ? '#F5921E' : hov ? 'rgba(245,146,30,0.14)' : 'rgba(245,146,30,0.07)',
          border: `2px solid ${active ? '#F5921E' : hov ? 'rgba(245,146,30,0.5)' : 'rgba(245,146,30,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          transition: 'background 220ms ease, border-color 220ms ease',
          boxShadow: active ? '0 0 0 6px rgba(245,146,30,0.1)' : 'none',
        }}
      >
        <span className="font-syne font-bold text-[13px]" style={{ color: active ? '#fff' : '#F5921E' }}>{num}</span>
      </motion.div>
      <div
        style={{
          flex: 1, background: hov ? '#fafafa' : '#fff',
          border: `1px solid ${hov ? '#F5921E30' : '#E8E8E4'}`,
          borderRadius: 8, padding: '20px 22px',
          transition: 'background 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
          boxShadow: hov ? '0 6px 20px rgba(245,146,30,0.07)' : 'none',
        }}
      >
        <h3 className="font-syne font-semibold text-[#1A1A1A] text-[15px] mb-1">{title}</h3>
        <p className="font-dm text-[13px] text-[#888] leading-[1.65]">{desc}</p>
      </div>
    </motion.div>
  );
};

// ─── Pricing Card ─────────────────────────────────────────────────────────────
const PricingCard = ({ plan, price, period, clients, features, highlighted, cta, roi, index }) => {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: highlighted ? '#F5921E' : '#fff',
        border: highlighted ? '2px solid #F5921E' : `1px solid ${hov ? '#E8E8E4' : '#E8E8E4'}`,
        borderRadius: 10,
        padding: '28px 24px',
        position: 'relative',
        transform: highlighted ? 'scale(1.03)' : hov ? 'translateY(-4px)' : 'none',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        boxShadow: hov && !highlighted ? '0 16px 40px rgba(0,0,0,0.08)' : highlighted ? '0 12px 36px rgba(245,146,30,0.3)' : 'none',
        cursor: 'default',
      }}
    >
      {highlighted && (
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
          background: '#1A1A1A', color: '#F5921E',
          fontFamily: 'DM Mono, monospace', fontSize: 10, fontWeight: 500,
          padding: '4px 14px', borderRadius: 100, letterSpacing: '0.1em',
          whiteSpace: 'nowrap', border: '1px solid rgba(245,146,30,0.3)',
        }}>
          MOST POPULAR
        </div>
      )}

      <p className="font-syne font-bold text-[12px]" style={{ color: highlighted ? 'rgba(255,255,255,0.65)' : '#888' }}>{plan}</p>
      <div className="flex items-end gap-1 mt-2 mb-1">
        <span className="font-mono text-[11px]" style={{ color: highlighted ? 'rgba(255,255,255,0.5)' : '#888', marginBottom: 5 }}>₹</span>
        <span className="font-syne font-extrabold" style={{ fontSize: 38, color: highlighted ? '#fff' : '#1A1A1A', lineHeight: 1 }}>
          {price === 'Custom' ? price : (inView ? <CountUp end={parseInt(price.replace(',', ''))} duration={1.8} separator="," /> : price)}
        </span>
        {price !== 'Custom' && (
          <span className="font-dm text-[12px]" style={{ color: highlighted ? 'rgba(255,255,255,0.5)' : '#888', marginBottom: 5 }}>/month</span>
        )}
      </div>
      <p className="font-dm text-[12px] mb-2" style={{ color: highlighted ? 'rgba(255,255,255,0.55)' : '#888' }}>
        Up to <strong style={{ color: highlighted ? 'rgba(255,255,255,0.9)' : '#1A1A1A' }}>{clients} clients</strong> · Billed monthly or annually
      </p>

      {roi && (
        <div style={{ background: highlighted ? 'rgba(255,255,255,0.12)' : 'rgba(245,146,30,0.06)', border: `1px solid ${highlighted ? 'rgba(255,255,255,0.2)' : 'rgba(245,146,30,0.2)'}`, borderRadius: 6, padding: '8px 12px', marginBottom: 16 }}>
          <p className="font-dm text-[11px] leading-[1.5]" style={{ color: highlighted ? 'rgba(255,255,255,0.75)' : '#777' }}>
            {roi}
          </p>
        </div>
      )}

      <ul className="space-y-0 mb-6">
        {features.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 + index * 0.1, ease: EASE }}
            className="flex items-center gap-2 py-[8px]"
            style={{ borderBottom: '1px solid ' + (highlighted ? 'rgba(255,255,255,0.1)' : '#F5F5F0') }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={highlighted ? 'rgba(255,255,255,0.8)' : '#F5921E'} strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-dm text-[13px]" style={{ color: highlighted ? 'rgba(255,255,255,0.85)' : '#555' }}>{f}</span>
          </motion.li>
        ))}
      </ul>

      <Link
        to="/contact?product=caflow"
        className="cursor-pointer"
        style={{
          display: 'block', textAlign: 'center',
          background: highlighted ? '#fff' : '#F5921E',
          color: highlighted ? '#F5921E' : '#fff',
          fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
          padding: '12px 0', borderRadius: 4,
          transition: 'transform 180ms ease, box-shadow 180ms ease',
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = highlighted ? '0 6px 20px rgba(0,0,0,0.15)' : '0 6px 20px rgba(245,146,30,0.3)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        {cta}
      </Link>
    </motion.div>
  );
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({ quote, name, firm, clients, index }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    custom={index}
    style={{
      background: '#fff',
      border: '1px solid #E8E8E4',
      borderRadius: 10,
      padding: '24px',
    }}
  >
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5921E">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
    <p className="font-dm text-[14px] text-[#444] leading-[1.75] mb-5">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245,146,30,0.1)', border: '1px solid rgba(245,146,30,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span className="font-syne font-bold text-[14px]" style={{ color: '#F5921E' }}>{name[0]}</span>
      </div>
      <div>
        <p className="font-syne font-semibold text-[13px] text-[#1A1A1A]">{name}</p>
        <p className="font-dm text-[11px] text-[#888]">{firm} · {clients}</p>
      </div>
    </div>
  </motion.div>
);

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      style={{ borderBottom: '1px solid #E8E8E4' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 cursor-pointer text-left"
        aria-expanded={open}
      >
        <span className="font-syne font-medium text-[#1A1A1A] text-[14px] pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="font-mono text-[20px] flex-shrink-0"
          style={{ color: '#F5921E', lineHeight: 1 }}
        >+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-dm text-[13px] text-[#777] leading-[1.75] pb-5 max-w-[640px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Animated Progress Bar ────────────────────────────────────────────────────
const ProgressBar = ({ label, value, color, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-dm text-[12px]" style={{ color: '#666' }}>{label}</span>
        <span className="font-syne font-bold text-[13px]" style={{ color }}>{value}</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 5 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? value : 0 }}
          transition={{ duration: 1.2, delay: index * 0.15, ease: EASE }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: 4 }}
        />
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
const CaFlowPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const problems = [
    'Manually texting 50+ clients every month to collect GST documents before GSTR-3B deadlines.',
    'Tracking 200+ compliance deadlines across GSTR-1, GSTR-3B, ITR, and TDS in error-prone spreadsheets.',
    'Chasing overdue fees via awkward personal calls — average outstanding across a 60-client practice exceeds ₹50,000.',
    'No central view of which clients are done, pending, or at risk before the 20th of each month.',
  ];

  const howItWorks = [
    { num: '01', title: 'Register & Connect in 20 Minutes', desc: 'Sign up, connect your WhatsApp Business number, and import your client list via manual entry or CSV upload. No IT setup. No integration calls.' },
    { num: '02', title: 'CaFlow Builds Your Compliance Calendar', desc: 'One filing cycle is created automatically per client, per month — GSTR-1, GSTR-3B, ITR, TDS — with correct due dates pre-loaded. Government extensions reflected within 24 hours.' },
    { num: '03', title: 'Clients Get WhatsApp Reminders — Automatically', desc: '7 days before each deadline, clients receive a structured WhatsApp message listing exactly which documents to send. Escalations fire at Day 3 and Day 1 if there\'s no response.' },
    { num: '04', title: 'Documents Arrive and Are Auto-Tagged', desc: 'Clients reply with files or type "DONE". Documents are linked to the correct filing cycle instantly. No hunting through WhatsApp chats. No manual filing.' },
    { num: '05', title: 'You Review, File, and Close the Cycle', desc: 'CA reviews from the dashboard, marks compliance as filed. All pending reminders for that cycle cancel automatically. The client receives a confirmation with filing reference number.' },
  ];

  const features = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5921E" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      title: 'WhatsApp-Native Client Flow',
      desc: 'Clients never log into any software. They interact only through WhatsApp — on their phone, in their language.',
      example: 'Ramesh from Patel Traders receives: "Hi Ramesh, your GSTR-3B for March is due on 20th April. Please share: (1) Sales register (2) Purchase invoices. Reply \'DONE\' when sent."',
      accent: '#F5921E',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B8A0" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
      title: 'India Compliance Calendar',
      desc: 'GSTR-1, GSTR-3B, ITR, TDS and quarterly filing types pre-loaded. Government deadline extensions reflected automatically.',
      example: 'When CBDT extends ITR deadline to 31st August, CaFlow reschedules all ITR reminders automatically. No manual update required.',
      accent: '#00B8A0',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
      title: 'Automated Escalation Logic',
      desc: 'If a client doesn\'t respond within 48 hours, CaFlow escalates automatically — referencing applicable late fees and penalties.',
      example: 'Day 5 escalation: "Sharma ji, GSTR-3B filing is in 3 days. Late filing attracts ₹50/day penalty under Section 47. Please send your documents today."',
      accent: '#F5A623',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5921E" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
      title: 'Live Compliance Dashboard',
      desc: 'Every client, every filing, every status — at a glance. Know exactly who is pending without opening a single spreadsheet.',
      example: 'Dashboard shows: 58/72 clients done for March GSTR-3B. 14 pending. 3 flagged as high-risk (no response in 5 days). Deadline: 6 days.',
      accent: '#F5921E',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B8A0" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
      title: 'Document Inbox — Auto-Tagged',
      desc: 'Documents clients send via WhatsApp are automatically saved and linked to the correct filing cycle.',
      example: 'Gupta Enterprises sends 3 files at 11 PM. CaFlow saves them as "GSTR-3B March 2026 — Gupta Enterprises" and marks their cycle as "Docs Received".',
      accent: '#00B8A0',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
      title: 'Fee Invoicing + Razorpay',
      desc: 'Send professional fee invoices via WhatsApp with embedded Razorpay payment links. Clients pay via UPI or net banking.',
      example: 'Invoice sent: "Dear Mehta ji, professional fees for ITR filing: ₹2,500. Pay here: [Razorpay link]. UPI / Cards / Net Banking accepted."',
      accent: '#F5A623',
    },
  ];

  const plans = [
    {
      plan: 'Starter',
      price: '999',
      clients: 30,
      roi: 'Saves ~20 hrs/month. ROI in the first week.',
      features: ['Up to 30 clients', 'All GST filing types', 'WhatsApp reminders + escalations', 'Document inbox', 'Compliance dashboard', '14-day free trial'],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      plan: 'Growth',
      price: '1,899',
      clients: 75,
      roi: '₹1,899/mo = 2 hours of admin salary. Saves 40+ hours.',
      features: ['Up to 75 clients', 'All filing types incl. TDS, Audit', 'WhatsApp reminders + escalations', 'Document inbox', 'Fee invoicing + Razorpay', 'Priority support', '14-day free trial'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      plan: 'Firm',
      price: 'Custom',
      clients: '75+',
      roi: 'Dedicated onboarding and SLA-backed support.',
      features: ['Unlimited clients', 'Multi-partner access', 'Custom filing types', 'API access', 'Dedicated onboarding call', 'SLA-backed support'],
      cta: 'Contact for Pricing',
      highlighted: false,
    },
  ];

  const testimonials = [
    {
      quote: 'Before CaFlow, I spent every Monday morning calling clients for GST documents. Now I check the dashboard at 9 AM and it\'s mostly done. The October ITR season was the first in 8 years where I didn\'t work past midnight.',
      name: 'CA Rajesh Sharma',
      firm: 'Sharma & Associates, Pune',
      clients: '68 clients',
    },
    {
      quote: 'My client response rate went from 60% to 97% in the first month. The escalation messages with penalty references actually work — clients take the deadlines seriously when they see a ₹50/day late fee mentioned.',
      name: 'CA Priya Nair',
      firm: 'Nair Tax Consultants, Chennai',
      clients: '52 clients',
    },
    {
      quote: 'We recovered ₹1.8 lakh in overdue fees in the first quarter using the Razorpay integration. Clients pay the same day they receive the WhatsApp link. No more awkward calls asking for fees.',
      name: 'CA Vikram Mehta',
      firm: 'Mehta & Partners, Mumbai',
      clients: '84 clients',
    },
  ];

  const faqs = [
    {
      q: 'Do my clients need to download an app or create an account?',
      a: 'No. Clients interact only through WhatsApp on their existing number. They receive a message, reply with their documents, and that\'s it. Zero new accounts, zero friction for your clients.',
    },
    {
      q: 'How does CaFlow handle government deadline extensions?',
      a: 'CaFlow\'s compliance calendar is maintained by our team and reflects any CBDT, GSTN, or MCA extension announcements within 24 hours. You don\'t need to track circulars or WhatsApp forwards for deadline news.',
    },
    {
      q: 'What filing types are supported?',
      a: 'GSTR-1, GSTR-3B, GSTR-9, GSTR-9C, ITR (all forms including ITR-3, ITR-4, ITR-6), TDS (24Q, 26Q, 27Q), advance tax, and ROC filings. Additional filing types are added based on member requests — typically within 2 weeks.',
    },
    {
      q: 'Is my client data safe?',
      a: 'CaFlow uses encrypted storage (AES-256) for all documents and client data. Access is role-controlled per staff member. No client data is shared with third parties. Documents are retained as per your preference and can be exported at any time.',
    },
    {
      q: 'Can I try before paying? Do I need a credit card?',
      a: '14-day free trial, no credit card required. Add your first 5 clients, connect your WhatsApp, and run through one full filing cycle with real clients before you commit to anything.',
    },
    {
      q: 'What if a client doesn\'t respond to any reminder?',
      a: 'CaFlow sends automated follow-ups at configurable intervals (Day 7, Day 3, Day 1 by default). Unresponsive clients are flagged on your dashboard. You can send a manual message from within CaFlow, or escalate via phone for truly critical cases — but this should be the exception, not the rule.',
    },
    {
      q: 'Can I send reminders from my own WhatsApp Business number?',
      a: 'Yes. All reminders go from your firm\'s WhatsApp Business number — not a generic CaFlow number. Your firm name, your number, your client relationship intact.',
    },
  ];

  return (
    <div className="bg-[#FAFAF8] min-h-screen" style={{ paddingTop: 64 }}>
      <SEOHead
        title="CaFlow — WhatsApp Compliance Automation for CA Firms | GST, ITR, TDS Reminders"
        description="CaFlow automates document collection, compliance deadline tracking, and fee recovery for CA firms in India. WhatsApp-native. GSTR-1, GSTR-3B, ITR, TDS. 14-day free trial, no credit card."
        keywords="CA firm software India, CA client management software, GST reminder automation India, WhatsApp automation CA firm, CaFlow, CA compliance software, document collection WhatsApp, fee recovery CA firm, ICAI software, chartered accountant software India"
        canonical="/solutions/digital/caflow"
      />

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: '#0d0d0d', minHeight: '82vh', display: 'flex', alignItems: 'center' }}
        aria-label="CaFlow Hero"
      >
        {/* Parallax glows */}
        <div aria-hidden="true" style={{ position: 'absolute', top: -100, left: -100, width: 560, height: 560, borderRadius: '50%', background: '#F5921E', filter: 'blur(190px)', opacity: 0.09, pointerEvents: 'none', transform: `translateY(${scrollY * 0.07}px)` }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -80, right: -60, width: 380, height: 380, borderRadius: '50%', background: '#00B8A0', filter: 'blur(150px)', opacity: 0.06, pointerEvents: 'none', transform: `translateY(${scrollY * -0.04}px)` }} />
        {/* Grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(rgba(245,146,30,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(245,146,30,0.04) 1px, transparent 1px)`,
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, #000 25%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, #000 25%, transparent 100%)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[80px] py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <motion.nav
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
                aria-label="Breadcrumb" className="font-mono text-[11px] mb-6" style={{ color: '#555' }}
              >
                <Link to="/" style={{ color: '#555' }} className="hover:text-[#F5921E] transition-colors">Home</Link>
                <span className="mx-1">/</span>
                <Link to="/solutions/digital" style={{ color: '#555' }} className="hover:text-[#F5921E] transition-colors">Digital</Link>
                <span className="mx-1">/</span>
                <span style={{ color: '#777' }}>CaFlow</span>
              </motion.nav>

              <motion.div
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={1}
                className="inline-flex items-center gap-2 mb-6"
                style={{ background: 'rgba(245,146,30,0.08)', border: '1px solid rgba(245,146,30,0.2)', borderRadius: 100, padding: '5px 14px' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5921E', display: 'inline-block' }} className="animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#F5921E' }}>by MEEHAAN Digital · Pune</span>
              </motion.div>

              <motion.h1
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={2}
                className="font-syne font-extrabold leading-[1.05] mb-5 tracking-tight"
                style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#EAEAEA' }}
              >
                End the reminder cycle.<br />
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: '#F5921E' }}>
                  Every client. Every deadline.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={3}
                className="font-dm text-[15px] leading-[1.8] mb-3"
                style={{ color: '#A0A0A0', maxWidth: 480 }}
              >
                <strong style={{ color: '#EAEAEA' }}>CaFlow</strong> is a WhatsApp-native compliance automation platform built specifically for CA firms managing 30–200 clients in India. Zero manual follow-ups. 100% compliance adherence. Purpose-built for ITR deadlines, GST cycles, and audit season.
              </motion.p>

              <motion.p
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={3.4}
                className="font-mono text-[10px] tracking-wider mb-7"
                style={{ color: '#F5921E' }}
              >
                GSTR-1 · GSTR-3B · ITR · TDS · FEE RECOVERY · ALL ON WHATSAPP
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={4}
                className="flex flex-wrap gap-3 mb-4"
              >
                <Link
                  to="/contact?product=caflow"
                  className="font-dm font-medium text-[13px] inline-block cursor-pointer"
                  style={{ background: '#F5921E', color: '#fff', padding: '13px 28px', borderRadius: 4, transition: 'transform 180ms ease, box-shadow 180ms ease' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,146,30,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Start Free 14-Day Trial
                </Link>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-dm font-medium text-[13px] cursor-pointer"
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#A0A0A0', padding: '12px 22px', borderRadius: 4, transition: 'border-color 200ms ease, color 200ms ease' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(245,146,30,0.4)'; e.currentTarget.style.color = '#F5921E'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#A0A0A0'; }}
                >
                  See How It Works ↓
                </button>
              </motion.div>

              <motion.p
                variants={fadeUp} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={4.5}
                className="font-dm text-[12px]" style={{ color: '#555' }}
              >
                No credit card required · Cancel anytime · Your clients never create an account
              </motion.p>
            </div>

            {/* RIGHT — Dashboard Mockup */}
            <motion.div
              variants={scaleIn} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={2}
              className="hidden lg:block"
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, overflow: 'hidden',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(245,146,30,0.05)',
                }}
              >
                {/* Window chrome */}
                <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                  <span className="font-mono text-[11px] ml-3" style={{ color: '#555' }}>CaFlow Dashboard — April 2026</span>
                </div>

                <div style={{ padding: '20px' }}>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: '#F5921E' }}>GSTR-3B · APRIL</p>
                      <p className="font-syne font-bold text-white text-[18px]">62 / 78 clients done</p>
                    </div>
                    <div style={{ background: 'rgba(0,184,160,0.12)', border: '1px solid rgba(0,184,160,0.2)', borderRadius: 6, padding: '6px 12px', textAlign: 'center' }}>
                      <p className="font-mono text-[10px]" style={{ color: '#00B8A0' }}>DEADLINE</p>
                      <p className="font-syne font-bold text-[15px] text-white">8 days left</p>
                    </div>
                  </div>

                  {/* Animated progress bar */}
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 6, marginBottom: 6 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={heroInView ? { width: '79%' } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.8, ease: EASE }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, #F5921E, #00B8A0)', borderRadius: 4 }}
                    />
                  </div>
                  <p className="font-dm text-[11px] mb-5" style={{ color: '#555' }}>79% complete · 16 pending · 3 escalated</p>

                  {/* Client list */}
                  {[
                    { name: 'Sharma & Associates', status: 'FILED', color: '#00B8A0' },
                    { name: 'Patel Traders India', status: 'DOCS RECEIVED', color: '#F5921E' },
                    { name: 'Verma Enterprises', status: 'REMINDER SENT', color: '#F5A623' },
                    { name: 'Gupta Infra Partners', status: 'ESCALATED', color: '#ef4444' },
                    { name: 'Mehta Consulting LLP', status: 'FILED', color: '#00B8A0' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-[10px]" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <span className="font-dm text-[13px]" style={{ color: '#999' }}>{c.name}</span>
                      <span
                        className="font-mono text-[9px] tracking-wider px-2 py-[3px] rounded"
                        style={{ background: c.color + '18', color: c.color }}
                      >
                        {c.status}
                      </span>
                    </div>
                  ))}

                  {/* WhatsApp activity */}
                  <div style={{ background: 'rgba(245,146,30,0.06)', border: '1px solid rgba(245,146,30,0.12)', borderRadius: 6, padding: '10px 12px', marginTop: 14 }}>
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: '#F5921E' }}>AUTO-SENT TODAY</p>
                    <p className="font-dm text-[12px]" style={{ color: '#888' }}>14 reminders · 3 escalations · 2 fee invoices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#E8E8E4] py-10 px-6 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={40} suffix="h+" label="Monthly hours saved per practice" color="#F5921E" index={0} />
          <StatItem value={97} suffix="%" label="Average client response rate" color="#00B8A0" index={1} />
          <StatItem value={14} suffix="-day" label="Free trial, no credit card needed" color="#F5921E" index={2} />
          <StatItem value={50} suffix="+" label="Clients manageable without extra headcount" color="#00B8A0" index={3} />
        </div>
      </section>

      {/* ─── PROBLEM ──────────────────────────────────────────────────────────── */}
      <section
        className="py-14 lg:py-20 px-6 lg:px-[80px] bg-white border-t border-[#E8E8E4]"
        aria-labelledby="problem-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionLabel color="#F5A623">The Problem</SectionLabel>
              <h2 id="problem-heading" className="font-syne font-bold text-[#1A1A1A] mb-8" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Every CA firm in India lives this loop. Every month.
              </h2>
              {problems.map((p, i) => <ProblemItem key={i} text={p} index={i} />)}
            </div>

            <div>
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  background: '#FFF8E7',
                  border: '1px solid rgba(245,166,35,0.2)',
                  borderLeft: '4px solid #F5A623',
                  borderRadius: 8,
                  padding: '28px 24px',
                  marginBottom: 16,
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: '#F5A623' }}>THE REAL COST — PER MONTH</p>
                {[
                  { label: 'Hours lost to follow-up calls', value: '15–20 hrs' },
                  { label: 'Average outstanding fees', value: '₹50K–₹2L' },
                  { label: 'CA firms using Excel for compliance', value: '~85%' },
                  { label: 'Deadlines missed per quarter', value: '3–5 avg' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center py-[14px]" style={{ borderBottom: i < 3 ? '1px solid rgba(245,166,35,0.12)' : 'none' }}>
                    <span className="font-dm text-[13px] text-[#777] max-w-[200px] leading-[1.5]">{s.label}</span>
                    <span className="font-syne font-bold text-[15px] text-[#1A1A1A] ml-4">{s.value}</span>
                  </div>
                ))}
              </motion.div>

              {/* Compliance progress bars */}
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                style={{ background: '#0d0d0d', borderRadius: 8, padding: '20px 22px' }}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: '#F5921E' }}>WITH CAFLOW — TYPICAL OUTCOMES</p>
                <div className="space-y-4">
                  <ProgressBar label="Client document submission rate" value="97%" color="#00B8A0" index={0} />
                  <ProgressBar label="On-time filing rate" value="100%" color="#F5921E" index={1} />
                  <ProgressBar label="Reduction in follow-up calls" value="92%" color="#00B8A0" index={2} />
                  <ProgressBar label="Fee collection improvement" value="85%" color="#F5A623" index={3} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-14 lg:py-20 px-6 lg:px-[80px]"
        aria-labelledby="hiw-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel color="#F5921E">How It Works</SectionLabel>
            <h2 id="hiw-heading" className="font-syne font-bold text-[#1A1A1A]" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              Five steps. Set up once. Runs every month.
            </h2>
            <p className="font-dm text-[14px] text-[#888] mt-3 max-w-[520px] leading-[1.7]">
              CaFlow handles the entire compliance follow-up cycle in the background. You review, file, and close — it does the rest.
            </p>
          </motion.div>

          <div className="relative">
            <div aria-hidden="true" className="hidden lg:block absolute left-[calc(44px/2)] top-10 bottom-10 w-px" style={{ background: 'linear-gradient(180deg, #F5921E60 0%, rgba(245,146,30,0.08) 100%)' }} />
            <div className="space-y-5">
              {howItWorks.map((step, i) => (
                <ProcessStep key={i} {...step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────────────────── */}
      <section
        className="bg-white py-14 lg:py-20 px-6 lg:px-[80px] border-t border-[#E8E8E4]"
        aria-labelledby="features-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <SectionLabel color="#F5921E">Features</SectionLabel>
            <h2 id="features-heading" className="font-syne font-bold text-[#1A1A1A]" style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
              Everything a CA firm needs. Nothing it doesn't.
            </h2>
            <p className="font-dm text-[13px] text-[#999] mt-2">Hover any card to see a real example.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => <FeatureCard key={i} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section
        className="py-14 lg:py-20 px-6 lg:px-[80px]"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <SectionLabel color="#F5921E">From CA Firms Using CaFlow</SectionLabel>
            <h2 id="testimonials-heading" className="font-syne font-bold text-[#1A1A1A]" style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
              What changes when the reminder cycle ends.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => <TestimonialCard key={i} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────────────────────── */}
      <section
        className="py-14 lg:py-20 px-6 lg:px-[80px] bg-white border-t border-[#E8E8E4]"
        aria-labelledby="pricing-heading"
        id="pricing"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
            <SectionLabel color="#F5921E">Pricing</SectionLabel>
            <h2 id="pricing-heading" className="font-syne font-bold text-[#1A1A1A]" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              Simple pricing. Start free.
            </h2>
            <p className="font-dm text-[14px] text-[#888] mt-3 max-w-[440px] mx-auto leading-[1.7]">
              14-day free trial on all plans. No credit card. Cancel anytime. Annual billing saves 25%.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start mt-4">
            {plans.map((p, i) => <PricingCard key={i} {...p} index={i} />)}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 text-center">
            <p className="font-dm text-[13px] text-[#888]">
              All plans include WhatsApp integration, compliance dashboard, document inbox, and escalation logic.{' '}
              <Link to="/contact?product=caflow" style={{ color: '#F5921E' }} className="hover:underline cursor-pointer">
                Questions? Talk to us.
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <section
        className="py-14 lg:py-20 px-6 lg:px-[80px]"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-[800px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <SectionLabel color="#F5921E">FAQ</SectionLabel>
            <h2 id="faq-heading" className="font-syne font-bold text-[#1A1A1A]" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
              Questions CA firms ask before switching.
            </h2>
          </motion.div>
          <div>
            {faqs.map((f, i) => <FAQItem key={i} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 px-6 lg:px-[80px] relative overflow-hidden"
        style={{ background: 'linear-gradient(158deg, #0f1117 0%, #1a1200 100%)' }}
        aria-label="CaFlow final CTA"
      >
        <div aria-hidden="true" style={{ position: 'absolute', top: -80, left: '30%', width: 500, height: 500, borderRadius: '50%', background: '#F5921E', filter: 'blur(180px)', opacity: 0.1, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, right: '10%', width: 300, height: 300, borderRadius: '50%', background: '#00B8A0', filter: 'blur(140px)', opacity: 0.06, pointerEvents: 'none' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="font-mono text-[10px] uppercase tracking-wider mb-5" style={{ color: '#F5921E' }}>START FREE — NO CREDIT CARD REQUIRED</p>
            <h2 className="font-syne font-extrabold text-white mb-4" style={{ fontSize: 'clamp(22px, 4vw, 42px)', lineHeight: 1.1 }}>
              It's the 1st of the month.<br />
              <span style={{ color: '#F5921E' }}>Your clients already got their reminder.</span>
            </h2>
            <p className="font-dm text-[14px] mb-3 max-w-[520px] mx-auto leading-[1.75]" style={{ color: '#777' }}>
              Add your 5 biggest clients today, connect your WhatsApp Business number, and send their first automated reminder. See how they respond — before the 20th ever becomes a problem again.
            </p>
            <p className="font-dm text-[13px] mb-8 max-w-[440px] mx-auto leading-[1.7]" style={{ color: '#555' }}>
              Setup takes 20 minutes. The first filing cycle runs without you.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <Link
                to="/contact?product=caflow"
                className="font-dm font-medium text-[14px] inline-block cursor-pointer"
                style={{ background: '#F5921E', color: '#fff', padding: '14px 32px', borderRadius: 4, transition: 'transform 180ms ease, box-shadow 180ms ease' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(245,146,30,0.45)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Start 14-Day Free Trial
              </Link>
              <Link
                to="/solutions/digital"
                className="font-dm font-medium text-[13px] inline-block cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888', padding: '13px 24px', borderRadius: 4, transition: 'border-color 200ms ease, color 200ms ease' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#ccc'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#888'; }}
              >
                ← Back to Digital Solutions
              </Link>
            </div>
            <p className="font-dm text-[12px]" style={{ color: '#444' }}>No credit card · No setup fees · Cancel anytime · Your clients never create an account</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaFlowPage;
