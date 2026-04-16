import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Phone, FileText, Wrench, Zap } from 'lucide-react';

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE = [0.23, 1, 0.32, 1];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
  }),
};

// ─── Process Panel (Hero right side — Our Process) ────────────────────────────
const PROCESS_STEPS = [
  {
    icon: Phone,
    label: 'Discovery Call',
    sub: 'We understand your workflow, constraints, and non-negotiables.',
    color: '#00B8A0',
    tag: '30 min · Free',
  },
  {
    icon: FileText,
    label: 'Proposal in 48h',
    sub: 'Detailed scope, fixed timeline, transparent pricing. No hidden costs.',
    color: '#F5921E',
    tag: 'Detailed scope',
  },
  {
    icon: Wrench,
    label: 'Build & Iterate',
    sub: 'Weekly demos. Your feedback shapes every sprint.',
    color: '#00B8A0',
    tag: 'Weekly demos',
  },
  {
    icon: Zap,
    label: 'Deploy & Support',
    sub: 'Live launch with team training and ongoing maintenance from day one.',
    color: '#F5921E',
    tag: 'Day one support',
  },
];

// Animated travelling dot along the connector line
const TravelDot = ({ inView, delay, color }) => (
  <motion.div
    aria-hidden="true"
    style={{
      position: 'absolute', left: 19, top: 0,
      width: 6, height: 6, borderRadius: '50%',
      background: color, boxShadow: `0 0 8px ${color}`,
      zIndex: 5,
    }}
    initial={{ y: 0, opacity: 0 }}
    animate={inView ? { y: [0, 330], opacity: [0, 1, 1, 0] } : {}}
    transition={{ duration: 3.0, delay, repeat: Infinity, ease: 'linear', repeatDelay: 1.4 }}
  />
);

const ProcessPanel = ({ inView }) => (
  <motion.div
    className="hidden lg:block"
    initial={{ opacity: 0, x: 24 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
  >
    {/* Header label */}
    <p className="font-mono text-[10px] uppercase tracking-widest mb-5" style={{ color: '#444' }}>
      Our Process
    </p>

    <div style={{ position: 'relative' }}>
      {/* Vertical connector line */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 22, top: 20, bottom: 20,
          width: 1,
          background: 'linear-gradient(180deg, #00B8A0 0%, #F5921E 50%, #00B8A0 100%)',
          opacity: 0.22,
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
      />

      {/* Travelling dots */}
      {inView && (
        <>
          <TravelDot inView={inView} delay={1.6} color="#00B8A0" />
          <TravelDot inView={inView} delay={3.8} color="#F5921E" />
        </>
      )}

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PROCESS_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === PROCESS_STEPS.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.12, ease: EASE }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingBottom: isLast ? 0 : 22 }}
            >
              {/* Icon node */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: step.color + '14',
                    border: `1.5px solid ${step.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 2,
                    cursor: 'default',
                  }}
                >
                  <Icon size={18} color={step.color} strokeWidth={1.8} />
                </motion.div>
                {/* Subtle halo — animate on mount */}
                <motion.div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    border: `1px solid ${step.color}`,
                    opacity: 0,
                  }}
                  animate={inView ? { opacity: [0, 0.25, 0], scale: [0.9, 1.3, 1.3] } : {}}
                  transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: 'easeOut' }}
                />
              </div>

              {/* Text */}
              <div style={{ paddingTop: 2, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span className="font-syne font-semibold" style={{ fontSize: 13, color: '#DCDCDC', lineHeight: 1.3 }}>
                    {step.label}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: step.color, background: step.color + '12',
                      border: `1px solid ${step.color}28`,
                      borderRadius: 4, padding: '2px 7px',
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
                <p className="font-dm" style={{ fontSize: 12, color: '#777', marginTop: 3, lineHeight: 1.55 }}>
                  {step.sub}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* CTA link at bottom */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
      style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <Link
        to="/contact?type=demo"
        className="font-dm font-medium inline-flex items-center gap-1.5 group"
        style={{ fontSize: 12, color: '#F5921E' }}
      >
        Book a free call — get a proposal in 48h
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-[4px]">→</span>
      </Link>
    </motion.div>
  </motion.div>
);

// ─── Supporting sub-components ────────────────────────────────────────────────
const Tag = ({ children, color = '#00B8A0' }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color }}>{children}</span>
);

const SectionLabel = ({ children, color = '#00B8A0' }) => (
  <div className="flex items-center gap-3 mb-3">
    <div style={{ width: 24, height: 1, background: color }} />
    <Tag color={color}>{children}</Tag>
  </div>
);


const CapCard = ({ icon, title, desc, items, accentColor, cta, ctaHref, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={index}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: hov ? '#181818' : '#141414',
        border: `1px solid ${hov ? accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
        borderTop: `2px solid ${accentColor}`,
        borderRadius: 8, padding: '28px 24px',
        transition: 'border-color 240ms ease, background 240ms ease, transform 240ms ease, box-shadow 240ms ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 12px 32px ${accentColor}20` : '0 2px 16px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        background: hov ? accentColor + '22' : accentColor + '12',
        border: `1px solid ${accentColor}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 240ms ease',
      }}>
        {icon}
      </div>
      <h3 className="font-syne font-semibold mt-5" style={{ fontSize: 17, color: '#DCDCDC' }}>{title}</h3>
      <p className="font-dm text-[13px] mt-2 leading-[1.65]" style={{ color: '#666' }}>{desc}</p>
      <ul className="mt-5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 py-[9px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 5, height: 5, background: accentColor, borderRadius: 1, flexShrink: 0 }} />
            <span className="font-dm text-[13px]" style={{ color: '#777' }}>{item}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <div className="mt-5">
          <Link to={ctaHref} className="font-dm font-medium text-[13px] inline-flex items-center gap-1 group" style={{ color: accentColor }}>
            {cta}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </Link>
        </div>
      )}
    </motion.article>
  );
};

const CompareRow = ({ before, after, index }) => (
  <motion.div
    variants={reveal} initial="hidden" whileInView="visible"
    viewport={{ once: true }} custom={index * 0.5}
    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
  >
    <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </div>
      <span className="font-dm text-[12px] leading-[1.6]" style={{ color: '#888' }}>{before}</span>
    </div>
    <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(0,184,160,0.05)', border: '1px solid rgba(0,184,160,0.15)' }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,184,160,0.15)', border: '1px solid rgba(0,184,160,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#00B8A0" strokeWidth="3.5"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <span className="font-dm text-[12px] leading-[1.6]" style={{ color: '#C0C0C0' }}>{after}</span>
    </div>
  </motion.div>
);

const WorkflowStep = ({ day, title, desc, badge, isLast, index, color }) => (
  <motion.div
    variants={reveal} initial="hidden" whileInView="visible"
    viewport={{ once: true }} custom={index * 0.6}
    className="flex gap-4"
  >
    <div className="flex flex-col items-center" style={{ minWidth: 44 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: color + '18', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 12px ${color}30` }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontWeight: 700, fontSize: 9, color }}>{day}</span>
      </div>
      {!isLast && <div style={{ width: 1, flex: 1, minHeight: 28, marginTop: 4, background: `linear-gradient(${color}40, transparent)` }} />}
    </div>
    <div className="pb-6">
      <div className="font-syne font-semibold text-[14px]" style={{ color: '#E0E0E0' }}>{title}</div>
      <div className="font-dm text-[12px] mt-1 leading-[1.65]" style={{ color: '#777' }}>{desc}</div>
      {badge && (
        <div className="mt-2 inline-block font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded" style={{ background: color + '15', color, border: `1px solid ${color}30` }}>
          {badge}
        </div>
      )}
    </div>
  </motion.div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const DigitalLanding = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [caflowTab, setCaflowTab] = useState('compare');

  const { scrollY } = useScroll();
  const glowY1 = useTransform(scrollY, [0, 500], [0, -80]);
  const glowY2 = useTransform(scrollY, [0, 500], [0, 50]);

  // ── Data ──────────────────────────────────────────────────────────────────
  const services = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B8A0" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
      title: 'Custom Software Development',
      desc: 'Web applications, CRM systems, portals, and APIs engineered from scratch — scoped precisely to your operational requirements.',
      items: ['Custom Web Applications', 'CRM & ERP Systems', 'Business Dashboards', 'REST APIs & Integrations', 'E-commerce Platforms'],
      accentColor: '#00B8A0', cta: 'Get a Proposal', ctaHref: '/contact?service=software',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5921E" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      title: 'Workflow Automation Systems',
      desc: 'Systematic automation pipelines that eliminate repetitive manual tasks — running reliably, 24/7, without human intervention.',
      items: ['WhatsApp Business Automation', 'Lead Management Pipelines', 'Compliance Follow-up Systems', 'Workflow Automation', 'Data Processing & Reporting'],
      accentColor: '#F5921E', cta: 'Book a Demo', ctaHref: '/contact?service=ai',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B8A0" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
      title: 'SaaS Product Development',
      desc: 'Purpose-built SaaS products for specific industries. CaFlow — our CA firm compliance platform — is one example of what we build.',
      items: ['Product Strategy & Scoping', 'MVP in 6–10 Weeks', 'WhatsApp-native Products', 'India-specific Compliance Tools', 'PLG Onboarding Flows'],
      accentColor: '#00B8A0', cta: 'Learn more →', ctaHref: '/solutions/digital/caflow',
    },
  ];

  const useCases = [
    { type: 'AI', label: 'WhatsApp Lead Bot', desc: 'Auto-qualify leads, send product catalogues, and route sales enquiries — without a single manual message.' },
    { type: 'SOFTWARE', label: 'Dealer Portal', desc: 'Custom web portal for managing orders, inventory, and pricing across your entire distributor network.' },
    { type: 'AI', label: 'Invoice Automation', desc: 'Extract data from invoices, update records, and trigger payment workflows — zero manual input required.' },
    { type: 'SOFTWARE', label: 'Field Sales CRM', desc: 'Mobile-first CRM for tracking visits, follow-ups, and daily targets for your on-ground sales team.' },
    { type: 'SAAS', label: 'CaFlow — CA Automation', desc: 'WhatsApp-native SaaS for Indian CA firms — compliance reminders, document collection, and fee management.' },
    { type: 'SOFTWARE', label: 'Operations Dashboard', desc: 'Live visibility into manufacturing, inventory, and dispatch — replacing Excel and WhatsApp group chaos.' },
  ];

  const compareData = [
    { before: '15–20 hours/week chasing clients for compliance documents manually', after: 'Automated WhatsApp reminders sent on schedule — zero manual effort' },
    { before: 'Calls, texts, emails tracked in spreadsheets and group chats', after: 'Centralised dashboard — every client\'s compliance status in real-time' },
    { before: 'Clients miss ITR, GST, TDS deadlines — penalties compound', after: 'Zero missed deadlines across your entire client base' },
    { before: 'Admin team overwhelmed during audit season and GST cycles', after: 'Admin team focuses on high-value work, not follow-up calls' },
    { before: 'No visibility into pending, submitted, or overdue filings', after: 'Full compliance pipeline visible — filed, pending, overdue — at a glance' },
  ];

  const workflowSteps = [
    { day: 'D·0', color: '#F5921E', isLast: false, title: 'Client Onboarded', desc: 'Client added to CaFlow. Compliance calendar auto-populated — ITR, GST, TDS, and Audit deadlines mapped automatically.', badge: 'Onboarding < 5 minutes' },
    { day: 'D·1', color: '#00B8A0', isLast: false, title: 'First Reminder Dispatched', desc: 'WhatsApp message sent with the document checklist and deadline context. No action required from your team.', badge: 'Delivered via WhatsApp' },
    { day: 'D·3', color: '#00B8A0', isLast: false, title: 'Contextual Follow-up Sent', desc: 'If no response, a follow-up with the specific compliance deadline and late-fee implications is sent automatically.', badge: 'Late fee warning included' },
    { day: 'D·5', color: '#F5921E', isLast: false, title: 'Escalation Notice Issued', desc: 'Final notice dispatched with your firm\'s digital signature. Response rate at this stage: near 100%.', badge: 'CA-signed escalation' },
    { day: '✓', color: '#22c55e', isLast: true, title: 'Compliance Filed. Case Closed.', desc: 'Your team reviews documents, signs, and files. Zero chasing. 100% submission rate across all clients.', badge: '100% submission rate' },
  ];

  const typeColor = (t) => t === 'AI' ? '#F5921E' : '#00B8A0';

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', paddingTop: 64 }}>
      <SEOHead
        title="Digital Solutions — Custom Software, Workflow Automation & SaaS Development"
        description="MEEHAAN Digital builds custom software, systematic automation, and purpose-built SaaS for Indian businesses. Proposals in 48 hours. Delivery in weeks."
        keywords="custom software development Pune, workflow automation India, WhatsApp automation, CRM software India, SaaS development, business automation, MEEHAAN digital, CA software India"
        canonical="/solutions/digital"
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: '#0d0d0d', minHeight: '80vh', display: 'flex', alignItems: 'center' }}
        aria-label="Digital Solutions Hero"
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(0,184,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,160,0.04) 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
        }} />
        <motion.div aria-hidden="true" style={{ position: 'absolute', top: -80, left: -120, width: 500, height: 500, borderRadius: '50%', background: '#00B8A0', filter: 'blur(160px)', opacity: 0.09, pointerEvents: 'none', y: glowY1 }} />
        <motion.div aria-hidden="true" style={{ position: 'absolute', bottom: -60, right: -80, width: 380, height: 380, borderRadius: '50%', background: '#F5921E', filter: 'blur(140px)', opacity: 0.07, pointerEvents: 'none', y: glowY2 }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[80px] py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <div>
              <motion.nav variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} aria-label="Breadcrumb" className="font-mono text-[11px] mb-6" style={{ color: '#555' }}>
                <Link to="/" className="hover:text-[#00B8A0] transition-colors" style={{ color: '#555' }}>Home</Link>
                <span className="mx-1">/</span>
                <span style={{ color: '#777' }}>Digital Solutions</span>
              </motion.nav>

              <motion.div variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={1}
                className="inline-flex items-center gap-2 mb-6"
                style={{ background: 'rgba(0,184,160,0.08)', border: '1px solid rgba(0,184,160,0.2)', borderRadius: 100, padding: '5px 14px' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00B8A0', display: 'inline-block' }} className="animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#00B8A0' }}>MEEHAAN Digital Division</span>
              </motion.div>

              <motion.h1 variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={2}
                className="font-syne font-extrabold leading-[1.05] mb-5 tracking-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#EAEAEA' }}
              >
                Engineered for<br />
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: '#F5921E' }}>
                  Indian business workflows.
                </span>
              </motion.h1>

              <motion.p variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={3}
                className="font-dm text-[15px] leading-[1.75] mb-8"
                style={{ color: '#A0A0A0', maxWidth: 460 }}
              >
                Custom software, systematic automation, and purpose-built SaaS — designed around your operations, not the other way around. Proposals in 48 hours.
              </motion.p>

              <motion.div variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={4} className="flex flex-wrap gap-3">
                <Link to="/contact?type=demo"
                  className="font-dm font-medium text-[13px] inline-block cursor-pointer"
                  style={{ background: '#F5921E', color: '#1A1A1A', padding: '12px 26px', borderRadius: 4, transition: 'transform 160ms ease, box-shadow 200ms ease' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,146,30,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Book a Free Call
                </Link>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-dm font-medium text-[13px] cursor-pointer"
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: '#888', padding: '11px 22px', borderRadius: 4, transition: 'border-color 200ms ease, color 200ms ease' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#ccc'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#888'; }}
                >
                  View Services ↓
                </button>
              </motion.div>
            </div>

            {/* RIGHT — animated process */}
            <ProcessPanel inView={heroInView} />
          </div>
        </div>
      </section>

      {/* ── 2. CAFLOW SPOTLIGHT ──────────────────────────────────────────── */}
      <section
        id="caflow"
        className="relative overflow-hidden py-14 lg:py-20 px-6 lg:px-[80px]"
        style={{ background: '#111' }}
        aria-labelledby="caflow-heading"
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(245,146,30,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,146,30,0.03) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: '#F5921E', filter: 'blur(180px)', opacity: 0.06, pointerEvents: 'none' }} />

        <div className="relative max-w-[1200px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-3">
            <SectionLabel color="#F5921E">Featured Product</SectionLabel>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
              <h2 id="caflow-heading" className="font-syne font-bold mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#EAEAEA', lineHeight: 1.1 }}>
                CaFlow — End the<br /><span style={{ color: '#F5921E' }}>reminder cycle.</span>
              </h2>
              <p className="font-dm text-[14px] leading-[1.8]" style={{ color: '#888', maxWidth: 440 }}>
                CA firms spend <span style={{ color: '#F5921E', fontWeight: 500 }}>15–20 hours per week</span> manually chasing clients for compliance documents. CaFlow automates every touchpoint — from client onboarding to compliance filing — via WhatsApp.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {['ITR deadlines', 'GST cycles', 'TDS filing', 'Audit season'].map((tag, i) => (
                  <span key={i} className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: 'rgba(245,146,30,0.1)', border: '1px solid rgba(245,146,30,0.2)', color: '#F5921E' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '₹1,297 / month', sub: 'Less than 2 hrs of admin salary', color: '#F5921E' },
                  { label: '40+ hours saved', sub: 'Per month per CA firm', color: '#00B8A0' },
                  { label: '14-day free trial', sub: 'No credit card required', color: '#F5921E' },
                  { label: '100% coverage', sub: 'Every client, every deadline', color: '#00B8A0' },
                ].map((m, i) => (
                  <motion.div key={i} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.color}20`, borderRadius: 8, padding: '16px 18px', cursor: 'default' }}
                  >
                    <div className="font-syne font-bold text-[15px]" style={{ color: m.color }}>{m.label}</div>
                    <div className="font-dm text-[11px] mt-1" style={{ color: '#666' }}>{m.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tab switcher */}
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="mb-6">
            <div className="inline-flex gap-1 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[{ key: 'compare', label: 'Before / After' }, { key: 'workflow', label: 'How It Works' }].map(tab => (
                <button key={tab.key} onClick={() => setCaflowTab(tab.key)} className="font-dm text-[13px] cursor-pointer"
                  style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: caflowTab === tab.key ? '#F5921E' : 'transparent', color: caflowTab === tab.key ? '#1A1A1A' : '#666', fontWeight: caflowTab === tab.key ? 600 : 400, transition: 'all 220ms ease' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {caflowTab === 'compare' && (
              <motion.div key="compare" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: EASE }}>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'rgba(239,68,68,0.7)' }}>Without CaFlow</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'rgba(0,184,160,0.7)' }}>With CaFlow</div>
                </div>
                <div className="space-y-2">
                  {compareData.map((row, i) => <CompareRow key={i} {...row} index={i} />)}
                </div>
              </motion.div>
            )}
            {caflowTab === 'workflow' && (
              <motion.div key="workflow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: EASE }} className="max-w-[600px]">
                <p className="font-mono text-[10px] uppercase tracking-wider mb-6" style={{ color: '#555' }}>
                  Automated compliance workflow — zero manual steps from your team
                </p>
                {workflowSteps.map((step, i) => <WorkflowStep key={i} {...step} index={i} />)}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 pt-8 flex flex-wrap gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link to="/solutions/digital/caflow"
              className="font-dm font-medium text-[13px] inline-block cursor-pointer"
              style={{ background: '#F5921E', color: '#1A1A1A', padding: '12px 26px', borderRadius: 4, transition: 'transform 160ms ease, box-shadow 200ms ease' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,146,30,0.35)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Explore CaFlow →
            </Link>
            <Link to="/contact?type=demo&product=caflow"
              className="font-dm font-medium text-[13px] inline-block cursor-pointer"
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: '#888', padding: '11px 22px', borderRadius: 4, transition: 'border-color 200ms ease, color 200ms ease' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#ccc'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#888'; }}
            >
              Book a Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 3. SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }} aria-labelledby="services-heading">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <SectionLabel>Our Services</SectionLabel>
            <h2 id="services-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#EAEAEA' }}>
              Three ways we help your business scale.
            </h2>
            <p className="font-dm text-[14px] mt-3 leading-[1.7] max-w-[500px]" style={{ color: '#666' }}>
              No off-the-shelf software. No generic solutions. Every engagement is scoped and built specifically for your operational context.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s, i) => <CapCard key={i} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── 4. USE CASES ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }} aria-labelledby="usecases-heading">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <SectionLabel color="#555">Built for these scenarios</SectionLabel>
            <h2 id="usecases-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: '#EAEAEA' }}>What we've already built.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-[8px]" style={{ border: '1px solid rgba(255,255,255,0.06)', gap: 1, background: 'rgba(255,255,255,0.04)' }}>
            {useCases.map((uc, i) => (
              <motion.div key={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}
                className="p-6 cursor-default" style={{ background: '#141414', transition: 'background 180ms ease' }}
                onMouseOver={e => e.currentTarget.style.background = '#1a1a1a'}
                onMouseOut={e => e.currentTarget.style.background = '#141414'}
              >
                <Tag color={typeColor(uc.type)}>{uc.type}</Tag>
                <h3 className="font-syne font-semibold text-[15px] mt-2" style={{ color: '#DCDCDC' }}>{uc.label}</h3>
                <p className="font-dm text-[12px] mt-1.5 leading-[1.6]" style={{ color: '#666' }}>{uc.desc}</p>
                {uc.type === 'SAAS' && (
                  <Link to="/solutions/digital/caflow" className="font-dm text-[12px] mt-3 inline-block" style={{ color: '#00B8A0' }}>Learn more →</Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 px-6 lg:px-[80px]" style={{ background: '#F5921E' }} aria-label="Contact call to action">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-syne font-bold text-[#1A1A1A]" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}>Let's build something together.</h2>
            <p className="font-dm text-[14px] text-[rgba(0,0,0,0.6)] mt-2">Free 30-minute consultation · Proposal within 48 hours · No commitment.</p>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="flex flex-wrap gap-3">
            <Link to="/contact?type=demo"
              className="font-dm font-medium text-[13px] inline-block cursor-pointer"
              style={{ background: '#1A1A1A', color: '#fff', padding: '12px 28px', borderRadius: 4, transition: 'transform 160ms ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              Book a Call
            </Link>
            <Link to="/solutions/digital/caflow"
              className="font-dm font-medium text-[13px] inline-block cursor-pointer"
              style={{ background: 'rgba(0,0,0,0.1)', color: '#1A1A1A', padding: '12px 24px', borderRadius: 4, transition: 'background 200ms ease' }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.18)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
            >
              See CaFlow →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalLanding;
