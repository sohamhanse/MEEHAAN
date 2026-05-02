import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Phone, FileText, Wrench, Zap, ArrowRight, Check, Send } from 'lucide-react';
import { DIGITAL_PRODUCTS } from '../../data/digitalProducts';
import { CASE_STUDIES } from '../../data/caseStudies';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase);
CustomEase.create('expo.custom', '0.16, 1, 0.3, 1');
import {
  SiWhatsapp, SiGmail, SiGooglesheets, SiGooglecalendar, SiRazorpay, SiStripe,
  SiShopify, SiSlack, SiNotion, SiZapier, SiAirtable, SiHubspot, SiSalesforce,
  SiGoogledrive, SiZoho, SiTelegram, SiMeta, SiInstagram, SiLinkedin,
} from 'react-icons/si';
import { FaFileExcel, FaMicrosoft } from 'react-icons/fa';

// ─── Palette (inspired by theaiautomationagency.ai) ──────────────────────────
const INK = '#050805';
const INK_2 = '#0a100c';
const INK_3 = '#0e1510';
const LIME = '#D4F565';        // tilted highlight
const LIME_DEEP = '#C6E84F';
const FOREST = '#184D3A';      // green CTA
const FOREST_DEEP = '#0F3A2B';
const ORANGE = '#F5921E';
const TEAL = '#00B8A0';

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

// ─── Tilted Lime Highlight (signature element) ───────────────────────────────
const TiltedHighlight = ({ children, rotate = -2, delay = 0.25 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.85, rotate: rotate - 6 }}
    animate={{ opacity: 1, scale: 1, rotate }}
    transition={{ duration: 0.65, delay, ease: EASE }}
    style={{
      display: 'inline-block',
      background: LIME,
      color: FOREST_DEEP,
      padding: '0 18px',
      borderRadius: 6,
      lineHeight: 1.06,
      boxShadow: `0 12px 40px ${LIME}33, inset 0 -4px 0 rgba(0,0,0,0.06)`,
      fontFamily: 'Syne, sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.01em',
    }}
  >
    {children}
  </motion.span>
);

// ─── Ambient Particles (hero bg) ──────────────────────────────────────────────
const Particles = ({ count = 14 }) => {
  const items = React.useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 4 + Math.random() * 10,
        delay: Math.random() * 4,
        dur: 6 + Math.random() * 6,
      })),
    [count]
  );
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.d,
            height: p.d,
            borderRadius: '50%',
            background: LIME,
            opacity: 0.18,
            filter: 'blur(1px)',
          }}
          animate={{ y: [0, -18, 0], opacity: [0.08, 0.28, 0.08] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// ─── Marquee logos (trust row) ───────────────────────────────────────────────
const TRUST_ITEMS = [
  'FINTECH', 'LOGISTICS', 'PROFESSIONAL SERVICES', 'B2B SOFTWARE',
  'FIELD SALES', 'SAAS STARTUPS', 'E-COMMERCE', 'OPERATIONS TEAMS',
];
const MarqueeStrip = () => (
  <div className="overflow-hidden py-5 border-y" style={{ background: INK_2, borderColor: 'rgba(212,245,101,0.08)' }}>
    <div className="marquee-track">
      {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((t, i) => (
        <span key={i} className="font-mono mx-8 whitespace-nowrap" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(212,245,101,0.55)' }}>
          ◆ {t}
        </span>
      ))}
    </div>
  </div>
);

// ─── Section Label ───────────────────────────────────────────────────────────
const SectionLabel = ({ children, color = LIME }) => (
  <div className="flex items-center gap-3 mb-3">
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} className="animate-pulse" />
    <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color }}>{children}</span>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}40, transparent)`, maxWidth: 120 }} />
  </div>
);

// ─── Pill Badge (hero) ───────────────────────────────────────────────────────
const PillBadge = ({ children, textRef }) => (
  <div
    className="inline-flex items-center gap-2"
    style={{
      background: 'rgba(212,245,101,0.06)',
      border: '1px solid rgba(212,245,101,0.22)',
      borderRadius: 999,
      padding: '6px 18px',
    }}
  >
    <span style={{ width: 7, height: 7, borderRadius: '50%', background: LIME, boxShadow: `0 0 12px ${LIME}` }} className="animate-pulse" />
    <span ref={textRef} className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: LIME }}>{children}</span>
  </div>
);

// ─── Rounded Forest CTA Button ───────────────────────────────────────────────
const CAL_URL = 'https://cal.com/soham-hanse-yeivxo/30min?overlayCalendar=true';

const ForestCTA = ({ to, children, variant = 'primary' }) => {
  const [hov, setHov] = useState(false);
  const isPrimary = variant === 'primary';
  const isExternal = to.startsWith('http');
  const sharedStyle = {
    background: isPrimary ? (hov ? FOREST_DEEP : FOREST) : 'transparent',
    border: isPrimary ? `1px solid ${FOREST}` : '1px solid rgba(255,255,255,0.14)',
    color: isPrimary ? '#EAF9F1' : hov ? LIME : '#A8B0A8',
    padding: isPrimary ? '15px 28px' : '14px 22px',
    borderRadius: 999,
    fontSize: 14,
    textDecoration: 'none',
    transition: 'background 220ms ease, color 220ms ease, border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease',
    transform: hov ? 'translateY(-2px)' : 'none',
    boxShadow: hov && isPrimary ? `0 12px 32px ${FOREST}60` : 'none',
  };
  const inner = (
    <>
      {children}
      <motion.span animate={{ x: hov ? 4 : 0 }} transition={{ duration: 0.2 }}>
        <ArrowRight size={16} strokeWidth={2} />
      </motion.span>
    </>
  );
  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        className="font-dm font-medium inline-flex items-center gap-2 group"
        style={sharedStyle}
      >{inner}</a>
    );
  }
  return (
    <Link to={to} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="font-dm font-medium inline-flex items-center gap-2 group"
      style={sharedStyle}
    >{inner}</Link>
  );
};

// ─── Service Card ────────────────────────────────────────────────────────────
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
        background: hov ? INK_3 : INK_2,
        border: `1px solid ${hov ? accentColor + '45' : 'rgba(255,255,255,0.06)'}`,
        borderTop: `2px solid ${accentColor}`,
        borderRadius: 14, padding: '28px 24px',
        transition: 'border-color 240ms ease, background 240ms ease, transform 240ms ease, box-shadow 240ms ease',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? `0 18px 50px ${accentColor}22` : '0 2px 16px rgba(0,0,0,0.3)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle corner glow on hover */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%',
          background: accentColor, filter: 'blur(60px)', opacity: 0.12, pointerEvents: 'none',
        }}
      />
      <div style={{
        width: 46, height: 46, borderRadius: 10,
        background: hov ? accentColor + '22' : accentColor + '14',
        border: `1px solid ${accentColor}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 240ms ease',
        position: 'relative',
      }}>
        {icon}
      </div>
      <h3 className="font-syne font-semibold mt-5" style={{ fontSize: 18, color: '#E8ECE6' }}>{title}</h3>
      <p className="font-dm text-[13px] mt-2 leading-[1.65]" style={{ color: '#707570' }}>{desc}</p>
      <ul className="mt-5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 py-[9px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Check size={12} color={accentColor} strokeWidth={2.5} />
            <span className="font-dm text-[13px]" style={{ color: '#8a908a' }}>{item}</span>
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

// ─── How It Works — horizontal accordion ─────────────────────────────────────
const HOW_STEPS = [
  {
    num: '01',
    tag: '30 min · free',
    label: 'Discovery Call',
    sub: 'A 30-minute call to understand your workflow, constraints, and non-negotiables.',
    bg: '#0a100c',
    accent: TEAL,
    textColor: '#E8ECE8',
    descColor: '#6a7a6a',
    dotBg: 'rgba(0,184,160,0.04)',
  },
  {
    num: '02',
    tag: 'fixed scope',
    label: 'Proposal in 48h',
    sub: 'Detailed scope, fixed timeline, transparent pricing. No hidden costs, no surprises.',
    bg: '#0f1812',
    accent: ORANGE,
    textColor: '#E8ECE8',
    descColor: '#6a7a6a',
    dotBg: 'rgba(245,146,30,0.04)',
  },
  {
    num: '03',
    tag: 'weekly demos',
    label: 'Build & Iterate',
    sub: 'Weekly demos. Your feedback shapes every sprint. Quality every step.',
    bg: FOREST,
    accent: LIME,
    textColor: '#E8F4EC',
    descColor: '#7aaa86',
    dotBg: 'rgba(212,245,101,0.06)',
  },
  {
    num: '04',
    tag: 'day-one support',
    label: 'Deploy & Support',
    sub: 'Live launch with team training and ongoing maintenance from day one.',
    bg: LIME,
    accent: FOREST_DEEP,
    textColor: '#050805',
    descColor: '#2a4a32',
    dotBg: 'rgba(5,8,5,0.06)',
  },
];

const HowItWorksAccordion = () => {
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref}>
      {/* Desktop accordion */}
      <div className="hidden lg:flex gap-3" style={{ height: 400 }}>
        {HOW_STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.1, ease: EASE }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: hovered === i ? 3 : 1,
              backgroundColor: s.bg,
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'default',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'flex 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
              border: `1px solid ${s.accent}18`,
            }}
          >
            {/* Dot pattern */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              backgroundImage: `radial-gradient(circle, ${s.dotBg} 1.2px, transparent 1.2px)`,
              backgroundSize: '18px 18px',
              pointerEvents: 'none',
            }} />

            {/* Top glow on hover */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${s.accent}88, transparent)`,
              opacity: hovered === i ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="font-mono font-bold" style={{ fontSize: 38, color: s.accent, opacity: 0.22, lineHeight: 1, marginBottom: 20 }}>
                {s.num}
              </p>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 rounded"
                style={{
                  background: s.accent + '18',
                  color: s.accent,
                  border: `1px solid ${s.accent}30`,
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.tag}
              </span>
              <h3
                className="font-syne font-bold mt-4"
                style={{
                  color: s.textColor,
                  fontSize: hovered === i ? 18 : 14,
                  lineHeight: 1.2,
                  whiteSpace: hovered === i ? 'normal' : 'nowrap',
                  overflow: 'hidden',
                  transition: 'font-size 0.3s ease',
                }}
              >
                {s.label}
              </h3>
              <div style={{
                maxHeight: hovered === i ? '100px' : '0px',
                opacity: hovered === i ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.38s ease, opacity 0.3s ease',
              }}>
                <p className="font-dm text-[13px] leading-[1.65] mt-3" style={{ color: s.descColor }}>
                  {s.sub}
                </p>
              </div>
            </div>

            <p
              className="font-mono text-[9px] uppercase tracking-[0.1em]"
              style={{ color: s.accent, opacity: 0.7, position: 'relative', zIndex: 1 }}
            >
              Step {s.num}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex flex-col gap-3 lg:hidden">
        {HOW_STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.06 + i * 0.1, ease: EASE }}
            style={{
              backgroundColor: s.bg,
              borderRadius: 14,
              padding: '24px 20px',
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${s.accent}18`,
            }}
          >
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              backgroundImage: `radial-gradient(circle, ${s.dotBg} 1.2px, transparent 1.2px)`,
              backgroundSize: '18px 18px', pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="font-mono font-bold" style={{ fontSize: 28, color: s.accent, opacity: 0.22, lineHeight: 1, marginBottom: 14 }}>{s.num}</p>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 rounded" style={{ background: s.accent + '18', color: s.accent, border: `1px solid ${s.accent}30` }}>
                {s.tag}
              </span>
              <h3 className="font-syne font-bold text-[15px] mt-3" style={{ color: s.textColor, lineHeight: 1.2 }}>{s.label}</h3>
              <p className="font-dm text-[13px] leading-[1.65] mt-2" style={{ color: s.descColor }}>{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Integrations Section (Lindy-style, cream background) ────────────────────
const CREAM = '#FAF7EE';
const CREAM_2 = '#F3EEDF';
const INK_TEXT = '#0B2A24';
const GOLD = '#A9853E';

// 7 cols × 4 rows = 28 tiles, single null at col 3 for rows 1 & 2 (center)
const INTEGRATION_TILES = [
  // Row 0
  { Icon: SiGmail, color: '#EA4335', name: 'Gmail' },
  { Icon: SiSlack, color: '#4A154B', name: 'Slack' },
  { Icon: SiGooglesheets, color: '#0F9D58', name: 'Sheets' },
  { Icon: FaMicrosoft, color: '#0078D4', name: 'Microsoft' },
  { Icon: SiHubspot, color: '#FF7A59', name: 'HubSpot' },
  { Icon: SiShopify, color: '#95BF47', name: 'Shopify' },
  { Icon: SiStripe, color: '#635BFF', name: 'Stripe' },
  // Row 1 — null at col 3 (index 10)
  { Icon: SiLinkedin, color: '#0A66C2', name: 'LinkedIn' },
  { Icon: SiNotion, color: '#000000', name: 'Notion' },
  { Icon: SiWhatsapp, color: '#25D366', name: 'WhatsApp' },
  null,
  { Icon: SiRazorpay, color: '#3395FF', name: 'Razorpay' },
  { Icon: SiGooglecalendar, color: '#4285F4', name: 'Calendar' },
  { Icon: SiZoho, color: '#C8202F', name: 'Zoho' },
  // Row 2 — null at col 3 (index 17)
  { Icon: SiAirtable, color: '#FFBF00', name: 'Airtable' },
  { Icon: SiZapier, color: '#FF4F00', name: 'Zapier' },
  { Icon: FaFileExcel, color: '#217346', name: 'Excel' },
  null,
  { Icon: SiSalesforce, color: '#00A1E0', name: 'Salesforce' },
  { Icon: SiGoogledrive, color: '#4285F4', name: 'Drive' },
  { Icon: SiTelegram, color: '#26A5E4', name: 'Telegram' },
  // Row 3
  { Icon: SiInstagram, color: '#E4405F', name: 'Instagram' },
  { Icon: SiMeta, color: '#0866FF', name: 'Meta' },
  { Icon: SiHubspot, color: '#FF7A59', name: 'HubSpot' },
  { Icon: SiLinkedin, color: '#0A66C2', name: 'LinkedIn' },
  { Icon: SiNotion, color: '#000000', name: 'Notion' },
  { Icon: SiSlack, color: '#4A154B', name: 'Slack' },
  { Icon: SiGmail, color: '#EA4335', name: 'Gmail' },
];

const IntegrationTile = ({ Icon, color, name, index }) => {
  // Staggered, pseudo-random twinkle cycle
  const entranceDelay = (index * 0.04);
  const twinkleDelay = ((index * 37) % 100) / 12; // spread 0–8s
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: entranceDelay, ease: EASE }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'default',
      }}
      title={name}
      aria-label={name}
    >
      <motion.div
        animate={{
          opacity: [1, 0.15, 1],
          scale: [1, 0.82, 1],
          filter: [
            'grayscale(0%) brightness(1)',
            'grayscale(100%) brightness(0.35)',
            'grayscale(0%) brightness(1)',
          ],
        }}
        transition={{
          duration: 2.4,
          delay: twinkleDelay,
          repeat: Infinity,
          repeatDelay: 4.5,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon
          size={30}
          color={color}
          style={{
            transition: 'transform 240ms ease, filter 240ms ease',
            transform: hov ? 'scale(1.14)' : 'scale(1)',
            filter: hov ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.18))' : 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const IntegrationsSection = () => {
  return (
    <section
      className="py-20 lg:py-28 px-6 lg:px-[80px] relative overflow-hidden"
      style={{ background: CREAM, borderTop: `1px solid ${CREAM_2}` }}
      aria-labelledby="integrations-heading"
    >
      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: GOLD }}>
            INTEGRATIONS
          </p>
          <h2
            id="integrations-heading"
            className="font-syne font-bold mx-auto"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: INK_TEXT, lineHeight: 1.05, maxWidth: 820, letterSpacing: '-0.02em' }}
          >
            Connects with all your <br />favorite apps.
          </h2>
          <p className="font-dm mt-6 mx-auto" style={{ fontSize: 17, color: '#4A5954', maxWidth: 620, lineHeight: 1.55 }}>
            With hundreds of integrations, MEEHAAN can read your WhatsApp, cross-reference your calendar, and draft a proposal in Gmail — all without you asking.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="relative" style={{ maxWidth: 980, margin: '0 auto' }}>
          {/* Thin grid lines */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
            {[1, 2, 3].map(r => (
              <div key={`h${r}`} style={{ position: 'absolute', left: 0, right: 0, top: `${(r / 4) * 100}%`, height: 1, background: 'rgba(169,133,62,0.14)' }} />
            ))}
            {[1, 2, 3, 4, 5, 6].map(c => (
              <div key={`v${c}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(c / 7) * 100}%`, width: 1, background: 'rgba(169,133,62,0.14)' }} />
            ))}
          </div>

          {/* Soft edge fade (cream mask on top, bottom, sides) */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
            background: `radial-gradient(ellipse 82% 110% at 50% 50%, transparent 28%, ${CREAM} 82%)`,
          }} />

          {/* The grid */}
          <div
            className="grid relative"
            style={{ gridTemplateColumns: 'repeat(7, 1fr)', zIndex: 2 }}
          >
            {INTEGRATION_TILES.map((tile, i) =>
              tile === null ? (
                <div key={i} style={{ aspectRatio: '1 / 1' }} />
              ) : (
                <IntegrationTile key={i} {...tile} index={i} />
              )
            )}

            {/* Center MEEHAAN avatar — placed as a grid item spanning col 4, rows 2-3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              style={{
                gridColumn: '4 / 5',
                gridRow: '2 / 4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 5,
              }}
            >
              {/* Thin highlight line behind avatar (like Lindy) */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: '50%', left: '-240px', right: '-240px', height: 1,
                background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
                transform: 'translateY(-0.5px)',
              }} />

              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 110, height: 110, borderRadius: '50%',
                  background: CREAM_2,
                  border: `1px solid rgba(169,133,62,0.22)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 18px 60px rgba(11,42,36,0.08), inset 0 -3px 10px rgba(169,133,62,0.06)`,
                  position: 'relative',
                }}
              >
                {/* MEEHAAN face-mark */}
                <svg width="52" height="32" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 16 L13 4 L22 16" stroke={INK_TEXT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 16 L39 4 L48 16" stroke={INK_TEXT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 23 Q26 30 34 23" stroke={INK_TEXT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Why Us Row ───────────────────────────────────────────────────────────────
const WhyRow = ({ them, us, index }) => (
  <motion.div
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={index * 0.5}
    className="grid grid-cols-1 md:grid-cols-2 gap-2"
  >
    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </div>
      <span className="font-dm text-[13px] leading-[1.65]" style={{ color: '#8a8a8a' }}>{them}</span>
    </div>
    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(212,245,101,0.05)', border: '1px solid rgba(212,245,101,0.18)' }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(212,245,101,0.15)', border: `1px solid ${LIME}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <Check size={10} color={LIME} strokeWidth={3} />
      </div>
      <span className="font-dm text-[13px] leading-[1.65]" style={{ color: '#D6DCD2' }}>{us}</span>
    </div>
  </motion.div>
);

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.4}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 cursor-pointer text-left"
        aria-expanded={open}
      >
        <span className="font-syne font-medium pr-4" style={{ color: '#E0E4DE', fontSize: 15 }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="font-mono text-[22px] flex-shrink-0"
          style={{ color: LIME, lineHeight: 1 }}
        >+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-dm text-[13.5px] leading-[1.8] pb-5 max-w-[700px]" style={{ color: '#888' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const DigitalLanding = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // GSAP hero refs
  const heroLine1Ref = useRef(null);
  const heroLine3Ref = useRef(null);
  const pillTextRef = useRef(null);
  const svgPath1Ref = useRef(null);
  const svgPath2Ref = useRef(null);

  const { scrollY } = useScroll();
  const glowY1 = useTransform(scrollY, [0, 500], [0, -80]);
  const glowY2 = useTransform(scrollY, [0, 500], [0, 50]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // GSAP hero entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // DrawSVG — decorative circuit traces animate in
      if (svgPath1Ref.current) {
        gsap.fromTo(svgPath1Ref.current,
          { drawSVG: '0% 0%' },
          { drawSVG: '0% 100%', duration: 2.8, delay: 0.1, ease: 'power2.inOut' }
        );
      }
      if (svgPath2Ref.current) {
        gsap.fromTo(svgPath2Ref.current,
          { drawSVG: '100% 100%' },
          { drawSVG: '0% 100%', duration: 2.4, delay: 0.4, ease: 'power2.inOut' }
        );
      }

      // ScrambleText on pill
      if (pillTextRef.current) {
        gsap.to(pillTextRef.current, {
          duration: 1.6,
          delay: 0.1,
          scrambleText: {
            text: 'AI SYSTEMS · DEPLOYED IN DAYS',
            chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01·',
            revealDelay: 0.35,
            speed: 0.55,
          },
        });
      }

      // SplitText — hero line 1 (words sweep up)
      if (heroLine1Ref.current) {
        const split1 = SplitText.create(heroLine1Ref.current, { type: 'words' });
        gsap.from(split1.words, {
          opacity: 0,
          y: 52,
          rotationX: -18,
          transformOrigin: '0% 50% -30px',
          stagger: 0.08,
          duration: 1.0,
          delay: 0.18,
          ease: 'expo.custom',
        });
      }

      // SplitText — hero line 3 (words slide in slightly later)
      if (heroLine3Ref.current) {
        const split3 = SplitText.create(heroLine3Ref.current, { type: 'words' });
        gsap.from(split3.words, {
          opacity: 0,
          y: 36,
          stagger: 0.07,
          duration: 0.85,
          delay: 0.58,
          ease: 'expo.custom',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // ── Data ──────────────────────────────────────────────────────────────────
  const services = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
      title: 'Custom Software Development',
      desc: 'Web apps, CRMs, portals, and APIs engineered from scratch — scoped precisely to your operational requirements.',
      items: ['Custom web applications', 'CRM & ERP systems', 'Business dashboards', 'REST APIs & integrations', 'E-commerce platforms'],
      accentColor: TEAL,
      cta: 'Get a proposal',
      ctaHref: '/contact?service=software',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      title: 'Workflow Automation Systems',
      desc: 'Systematic automation pipelines that eliminate repetitive manual tasks — running reliably, 24/7, without human intervention.',
      items: ['WhatsApp business automation', 'Lead management pipelines', 'Document & invoice processing', 'Sales & operations workflows', 'Notification & reminder engines'],
      accentColor: ORANGE,
      cta: 'Book a demo',
      ctaHref: '/contact?service=ai',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={LIME_DEEP} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
      title: 'SaaS Product Development',
      desc: 'Purpose-built SaaS products engineered for your specific industry workflows — from MVP validation to scaling.',
      items: ['Product strategy & scoping', 'MVP in 6–10 weeks', 'API-first architecture', 'Compliance & regulatory tools', 'PLG onboarding flows'],
      accentColor: LIME_DEEP,
      cta: 'Start a project',
      ctaHref: '/contact?service=saas',
    },
  ];

  const useCases = [
    { type: 'AUTOMATION', label: 'WhatsApp Lead Bot', desc: 'Auto-qualify leads, send product catalogues, and route sales enquiries — without a single manual message.' },
    { type: 'SOFTWARE', label: 'Dealer Portal', desc: 'Custom web portal for managing orders, inventory, and pricing across your entire distributor network.' },
    { type: 'AUTOMATION', label: 'Invoice Automation', desc: 'Extract data from invoices, update records, and trigger payment workflows — zero manual input required.' },
    { type: 'SOFTWARE', label: 'Field Sales CRM', desc: 'Mobile-first CRM for tracking visits, follow-ups, and daily targets for your on-ground sales team.' },
    { type: 'AUTOMATION', label: 'Compliance Follow-ups', desc: 'Automated reminder engine for regulatory cycles — escalations, document capture, and full audit trails.' },
    { type: 'SOFTWARE', label: 'Operations Dashboard', desc: 'Live visibility into manufacturing, inventory, and dispatch — replacing spreadsheets and fragmented messaging.' },
  ];

  const whyRows = [
    { them: 'Generic template solutions forced onto your workflow', us: 'Scoped precisely to how your team actually works today' },
    { them: '3–6 month timelines with ballooning scope', us: 'Proposals in 48 hours, delivery measured in weeks' },
    { them: 'Hourly billing with no cost visibility', us: 'Fixed pricing, fixed scope, no hidden costs' },
    { them: 'Hand-off and disappear after launch', us: 'Day-one support, training, and ongoing maintenance' },
    { them: 'Agencies that over-promise and disappear post-launch', us: 'Ongoing support, training, and iteration from day one' },
  ];

  const faqs = [
    { q: 'What does a typical engagement look like?', a: 'Every engagement starts with a free 30-minute discovery call. Within 48 hours, you get a detailed proposal with scope, timeline, and fixed pricing. If you proceed, we build in weekly sprints with demos every Friday, so you always know exactly where things stand.' },
    { q: 'How long does a typical project take?', a: 'Workflow automation systems ship in 2–4 weeks. Custom software MVPs ship in 6–10 weeks. Large multi-role portals and SaaS platforms take 10–16 weeks depending on scope. We always commit to a fixed date upfront.' },
    { q: 'Do you work with businesses remotely?', a: 'Yes. We work entirely remote — every engagement runs over async communication, Zoom calls, and weekly demos. Clients across the US, UK, and Europe get the same process: proposal in 48 hours, weekly sprint demos, and a fixed delivery date from day one.' },
    { q: 'What tech stack do you build on?', a: 'React, Next.js, Node, Python, PostgreSQL, Supabase, AWS/GCP, and more. We choose the stack based on what your business needs — maintainability, performance, cost — not what\'s trendy. Every codebase is documented and fully handed over.' },
    { q: 'Do you offer post-launch support?', a: 'Yes. Every engagement includes 30 days of free post-launch support. After that, maintenance plans start at a transparent monthly rate covering bug fixes, minor enhancements, and priority response times.' },
    { q: 'Can I see work you\'ve shipped before?', a: 'During the discovery call we walk you through live case studies from clients in professional services, logistics, and B2B software. Reference calls with existing clients are available on request after the first proposal.' },
  ];

  const typeColor = (t) => t === 'AUTOMATION' ? ORANGE : TEAL;

  return (
    <div className="min-h-screen" style={{ background: INK, paddingTop: 64 }}>
      <SEOHead
        title="AI Automation Agency — Custom AI Agents, Workflow Automation & Software"
        description="MEEHAAN Digital builds custom AI agents, workflow automation, and software for US and UK businesses. Fixed-price proposals in 48 hours. Live in under 14 days."
        keywords="AI automation agency, custom AI agents, workflow automation, AI software development, business automation, AI products, SaaS development, MEEHAAN digital"
        canonical="/solutions/digital"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': 'https://www.meehaan.com/solutions/digital',
              'name': 'AI Automation Agency — MEEHAAN Digital',
              'description': 'MEEHAAN Digital builds custom AI agents, workflow automation, and software for US and UK businesses. Fixed-price proposals in 48 hours. Live in under 14 days.',
              'url': 'https://www.meehaan.com/solutions/digital',
              'isPartOf': { '@id': 'https://www.meehaan.com/#website' },
              'breadcrumb': {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.meehaan.com/' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Digital Solutions', 'item': 'https://www.meehaan.com/solutions/digital' },
                ],
              },
            },
            {
              '@type': 'Service',
              '@id': 'https://www.meehaan.com/solutions/digital#service',
              'name': 'AI Product Development & Workflow Automation',
              'provider': { '@id': 'https://www.meehaan.com/#organization' },
              'serviceType': 'AI Automation',
              'description': 'Custom AI agents, workflow automation systems, and software products built for US and UK businesses. Every engagement starts with a free discovery call and a fixed-price proposal within 48 hours.',
              'areaServed': [
                { '@type': 'Country', 'name': 'United States' },
                { '@type': 'Country', 'name': 'United Kingdom' },
              ],
              'hasOfferCatalog': {
                '@type': 'OfferCatalog',
                'name': 'AI Products',
                'itemListElement': [
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Voice Intake Concierge' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Horizontal AI Agents' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Contact Center Intelligence' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Legal Recovery AI' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Facility Operations AI' } },
                  { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Website Builder AI' } },
                ],
              },
            },
            {
              '@type': 'HowTo',
              'name': 'How MEEHAAN Digital Works',
              'description': 'Four steps from first conversation to live deployment.',
              'totalTime': 'P14D',
              'step': [
                { '@type': 'HowToStep', 'position': 1, 'name': 'Discovery Call', 'text': 'A free 30-minute call to understand your workflow, your business, and where AI fits. No pitch — just clarity.' },
                { '@type': 'HowToStep', 'position': 2, 'name': 'Proposal in 48 Hours', 'text': 'A fixed-scope, fixed-price proposal delivered within 48 hours. Exact deliverables, exact timeline, exact cost.' },
                { '@type': 'HowToStep', 'position': 3, 'name': 'Build & Iterate', 'text': 'Weekly sprints with a demo every Friday. You see progress continuously — no black-box development.' },
                { '@type': 'HowToStep', 'position': 4, 'name': 'Deploy & Support', 'text': 'Your product goes live with 30 days of included post-launch support and full handover documentation.' },
              ],
            },
            {
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': 'What does a typical AI automation engagement look like?',
                  'acceptedAnswer': { '@type': 'Answer', 'text': 'Every engagement starts with a free 30-minute discovery call. Within 48 hours you receive a fixed-price proposal with exact scope, timeline, and cost. If you proceed, we build in weekly sprints with demos every Friday so you always know where things stand.' },
                },
                {
                  '@type': 'Question',
                  'name': 'How long does it take to deploy an AI product?',
                  'acceptedAnswer': { '@type': 'Answer', 'text': 'Most AI automation systems are live in 2 to 4 weeks. Custom software MVPs ship in 6 to 10 weeks. Full SaaS platforms take 10 to 16 weeks depending on scope. Every project has a fixed delivery date committed upfront.' },
                },
                {
                  '@type': 'Question',
                  'name': 'Do you work with businesses in the US and UK?',
                  'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Every engagement runs fully remote — async communication, video calls, and weekly demos. Clients in the US, UK, and Europe get the same process: proposal in 48 hours, weekly sprint demos, and a fixed delivery date from day one.' },
                },
                {
                  '@type': 'Question',
                  'name': 'What technology stack does MEEHAAN Digital build on?',
                  'acceptedAnswer': { '@type': 'Answer', 'text': 'React, Next.js, Node.js, Python, PostgreSQL, Supabase, AWS, and GCP depending on what the project needs. Every codebase is fully documented and handed over at the end of the engagement.' },
                },
                {
                  '@type': 'Question',
                  'name': 'Is there support after launch?',
                  'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Every engagement includes 30 days of free post-launch support. After that, maintenance plans covering bug fixes, minor enhancements, and priority response are available at a transparent monthly rate.' },
                },
                {
                  '@type': 'Question',
                  'name': 'What is the pricing model?',
                  'acceptedAnswer': { '@type': 'Answer', 'text': 'Fixed-price per project. No hourly billing, no surprise invoices. The proposal sets the exact price and scope before any work begins. If we miss the committed deadline, you receive a full refund — no questions asked.' },
                },
              ],
            },
          ],
        }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: INK, minHeight: '92vh', display: 'flex', alignItems: 'center' }}
        aria-label="Digital Solutions Hero"
      >
        {/* Radial green glow */}
        <motion.div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 1100, height: 1100, transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${FOREST}44 0%, ${INK} 58%)`,
          pointerEvents: 'none',
          y: glowY1,
        }} />
        {/* Grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(212,245,101,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(212,245,101,0.035) 1px, transparent 1px)`,
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, #000 20%, transparent 100%)',
        }} />
        {/* Secondary glows */}
        <motion.div aria-hidden="true" style={{ position: 'absolute', top: -80, left: -120, width: 500, height: 500, borderRadius: '50%', background: LIME, filter: 'blur(170px)', opacity: 0.07, pointerEvents: 'none', y: glowY1 }} />
        <motion.div aria-hidden="true" style={{ position: 'absolute', bottom: -60, right: -80, width: 380, height: 380, borderRadius: '50%', background: ORANGE, filter: 'blur(140px)', opacity: 0.05, pointerEvents: 'none', y: glowY2 }} />

        {/* DrawSVG — animated circuit traces */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
          <path
            ref={svgPath1Ref}
            d="M -60 420 C 120 340 280 380 480 310 S 720 240 960 290 S 1200 350 1460 290"
            fill="none"
            stroke={LIME}
            strokeWidth="1.2"
            strokeOpacity="0.22"
          />
          <path
            ref={svgPath2Ref}
            d="M 1460 160 C 1240 200 1080 150 880 185 S 600 230 400 185 S 200 130 -60 165"
            fill="none"
            stroke={TEAL}
            strokeWidth="1"
            strokeOpacity="0.16"
          />
        </svg>

        <Particles count={14} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[80px] py-20 text-center">
          {/* Breadcrumb */}
          <motion.nav
            variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            aria-label="Breadcrumb" className="font-mono text-[11px] mb-8" style={{ color: '#555' }}
          >
            <span style={{ color: '#888' }}>Digital Solutions</span>
          </motion.nav>

          {/* Pill — ScrambleText via ref */}
          <motion.div variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={1} className="inline-block mb-8">
            <PillBadge textRef={pillTextRef}>AI SYSTEMS · DEPLOYED IN DAYS</PillBadge>
          </motion.div>

          {/* Headline with tilted highlight */}
          <h1
            className="font-syne font-extrabold leading-[1.05] mb-7 tracking-tight mx-auto"
            style={{ fontSize: 'clamp(36px, 6.2vw, 80px)', color: '#F4F7F1', maxWidth: 1050 }}
          >
            {/* GSAP SplitText animates these spans — keep them simple */}
            <span ref={heroLine1Ref} className="block" style={{ display: 'block' }}>
              Your business, automated.
            </span>
            <span className="block mt-2" style={{ transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.1}px)`, transition: 'transform 400ms ease-out' }}>
              <TiltedHighlight rotate={-2.5} delay={0.35}>Scope. Ship. Scale.</TiltedHighlight>
            </span>
            <span ref={heroLine3Ref} className="block mt-2" style={{ display: 'block' }}>
              First system live in 14 days.
            </span>
          </h1>

          {/* Underlined subhead */}
          <motion.p
            variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={3}
            className="font-syne font-semibold mb-10 mx-auto"
            style={{
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              color: '#EAEFE6',
              maxWidth: 660,
              textDecoration: 'underline',
              textUnderlineOffset: 7,
              textDecorationThickness: 1,
              textDecorationColor: 'rgba(212,245,101,0.5)',
            }}
          >
            Not a six-month agency project. A working AI system — scoped precisely, built fast, shipped on time.
          </motion.p>

          {/* CTA */}
          <motion.div variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={4} className="flex flex-wrap gap-3 justify-center items-center mb-6">
            <ForestCTA to={CAL_URL}>Book a Free Call</ForestCTA>
            <button
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-dm font-medium cursor-pointer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.14)',
                color: '#A8B0A8',
                padding: '14px 22px',
                borderRadius: 999,
                fontSize: 14,
                transition: 'border-color 200ms ease, color 200ms ease',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(212,245,101,0.4)'; e.currentTarget.style.color = LIME; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#A8B0A8'; }}
            >
              How it works ↓
            </button>
          </motion.div>

          {/* Avatar + guarantee */}
          <motion.div
            variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={5}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `linear-gradient(135deg, ${FOREST}, ${FOREST_DEEP})`,
                border: `2px solid ${LIME}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="font-syne font-bold" style={{ color: LIME, fontSize: 13 }}>M</span>
              </div>
              <motion.div
                animate={{ y: [-2, 2, -2], rotate: [0, 8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: -6, right: -8, color: LIME }}
              >
                <Send size={14} strokeWidth={2} />
              </motion.div>
            </div>
            <p className="font-dm text-[12.5px]" style={{ color: '#B0B7AF' }}>
              Money-back guarantee<span style={{ color: LIME }}>*</span> · Proposals in 48h
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── OUR PROCESS ──────────────────────────────────────────────────── */}
      <section id="process" className="py-16 lg:py-24 px-6 lg:px-[80px] relative overflow-hidden" style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="process-heading">
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, borderRadius: '50%', background: FOREST, filter: 'blur(180px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div className="max-w-[1200px] mx-auto relative">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 max-w-[640px]">
            <SectionLabel color={LIME}>How it works</SectionLabel>
            <h2 id="process-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', color: '#F4F7F1', lineHeight: 1.08 }}>
              From <TiltedHighlight rotate={-1.5} delay={0.1}>first call</TiltedHighlight> to live system — in weeks, not a quarter.
            </h2>
            <p className="font-dm text-[14.5px] mt-5 leading-[1.8]" style={{ color: '#777', maxWidth: 520 }}>
              Four steps. One fixed price. Zero scope creep. Your system is running before most agencies finish their discovery phase.
            </p>
          </motion.div>
          <HowItWorksAccordion />

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="mt-10">
            <ForestCTA to={CAL_URL}>Book your free discovery call</ForestCTA>
          </motion.div>
        </div>
      </section>

      {/* ── AI PRODUCTS ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="products-heading"
        style={{
          position: 'relative',
          background: '#060D08',
          borderTop: `1px solid ${LIME}22`,
          borderBottom: `1px solid ${LIME}22`,
          overflow: 'hidden',
        }}
      >
        {/* Top lime glow bar */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${LIME}80 30%, ${LIME} 50%, ${LIME}80 70%, transparent 100%)`,
        }} />

        {/* Ghost "08" ambient text */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Syne, sans-serif', fontWeight: 900,
          fontSize: 'clamp(280px, 35vw, 520px)',
          color: LIME, opacity: 0.018,
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-0.06em', whiteSpace: 'nowrap',
        }}>08</div>

        {/* Dot-grid overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, ${LIME}18 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        }} />

        {/* Product names ticker */}
        <div style={{ overflow: 'hidden', borderBottom: `1px solid ${LIME}12`, background: `${LIME}05` }}>
          <div className="marquee-track py-3">
            {[...DIGITAL_PRODUCTS, ...DIGITAL_PRODUCTS, ...DIGITAL_PRODUCTS].map((p, i) => (
              <span key={i} className="font-mono mx-10 whitespace-nowrap" style={{ fontSize: 10, letterSpacing: '0.15em', color: `${LIME}55` }}>
                ◈ {p.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="py-16 lg:py-24 px-6 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <SectionLabel color={LIME}>AI products</SectionLabel>
              <h2 id="products-heading" className="font-syne font-extrabold" style={{ fontSize: 'clamp(28px, 3.8vw, 52px)', color: '#F4F7F1', lineHeight: 1.06, maxWidth: 680 }}>
                Eight AI systems.{' '}
                <span style={{ color: LIME }}>Each solving</span>{' '}
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: '#E0E4DE' }}>
                  one specific problem.
                </span>
              </h2>
              <p className="font-dm text-[13.5px] mt-4 leading-[1.75]" style={{ color: '#666', maxWidth: 480 }}>
                Not a platform. Not a suite. Eight focused systems — each built for one industry, one workflow, one outcome.
              </p>
            </div>
            <Link
              to="/solutions/digital/products"
              className="font-dm font-medium text-[13px] inline-flex items-center gap-2 flex-shrink-0 group"
              style={{
                color: '#060D08',
                background: LIME,
                padding: '11px 22px',
                borderRadius: 999,
                fontWeight: 600,
                transition: 'opacity 180ms ease, transform 180ms ease',
              }}
              onMouseOver={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
            >
              Explore all 8 systems
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </motion.div>

          {/* 4-col grid of first 4 products + featured last */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {DIGITAL_PRODUCTS.filter(p => !p.isFeatured).map((product, i) => (
              <motion.article
                key={product.slug}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.18 } }}
                style={{
                  background: 'rgba(5,8,5,0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderTop: `2px solid ${product.accentColor}`,
                  borderRadius: 14,
                  padding: '22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 4px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  transition: 'box-shadow 200ms ease',
                }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.16em] mb-3"
                  style={{ color: product.accentColor }}
                >
                  {product.category}
                </span>
                <h3 className="font-syne font-semibold" style={{ fontSize: 14, color: '#E8EDE6', lineHeight: 1.3, marginBottom: 8, flex: 1 }}>
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="font-mono text-[9px]" style={{ color: '#3a3f3a' }}>{product.timeline}</span>
                  <Link
                    to={`/solutions/digital/products/${product.slug}`}
                    className="font-dm font-medium text-[11px] inline-flex items-center gap-1 group"
                    style={{ color: product.accentColor }}
                    aria-label={`View ${product.name}`}
                  >
                    View
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-[2px]">
                      <ArrowRight size={11} strokeWidth={2} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Featured: Horizontal AI Agents — full width */}
          {DIGITAL_PRODUCTS.filter(p => p.isFeatured).map((product) => (
            <motion.article
              key={product.slug}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                background: `linear-gradient(135deg, rgba(5,8,5,0.95) 0%, rgba(${product.accentColor === LIME ? '180,220,60' : '0,184,160'},0.04) 100%)`,
                border: `1px solid ${product.accentColor}30`,
                borderTop: `2px solid ${product.accentColor}`,
                borderRadius: 14,
                padding: '32px 30px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 0 60px ${product.accentColor}10, 0 8px 32px rgba(0,0,0,0.4)`,
              }}
            >
              <div aria-hidden="true" style={{
                position: 'absolute', top: -40, right: -40, width: 300, height: 300,
                borderRadius: '50%', background: product.accentColor, filter: 'blur(100px)', opacity: 0.07, pointerEvents: 'none',
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: -20, left: '40%', width: 200, height: 200,
                borderRadius: '50%', background: product.accentColor, filter: 'blur(80px)', opacity: 0.04, pointerEvents: 'none',
              }} />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-1 rounded"
                      style={{ background: product.accentColor + '14', color: product.accentColor, border: `1px solid ${product.accentColor}28` }}
                    >
                      {product.category}
                    </span>
                    <span className="font-mono text-[9px]" style={{
                      background: `${LIME}18`, color: LIME,
                      border: `1px solid ${LIME}28`, borderRadius: 4,
                      padding: '2px 8px', letterSpacing: '0.12em',
                    }}>FEATURED</span>
                    <span className="font-mono text-[10px]" style={{ color: '#3a3f3a' }}>· {product.timeline}</span>
                  </div>
                  <h3 className="font-syne font-bold" style={{ fontSize: 'clamp(17px, 2.2vw, 24px)', color: '#F4F7F1', lineHeight: 1.15, marginBottom: 8 }}>
                    {product.name}
                  </h3>
                  <p className="font-dm text-[13px] leading-[1.7]" style={{ color: '#666', maxWidth: 580 }}>
                    {product.heroDesc}
                  </p>
                </div>
                <Link
                  to={`/solutions/digital/products/${product.slug}`}
                  className="font-dm font-medium text-[13px] inline-flex items-center gap-2 flex-shrink-0 group"
                  style={{ color: product.accentColor }}
                >
                  Explore system
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        </div>
      </section>

      {/* ── INTEGRATIONS (Lindy-style) ───────────────────────────────────── */}
      <IntegrationsSection />

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-[80px] relative overflow-hidden" style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="compare-heading">
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -120, left: -80, width: 420, height: 420, borderRadius: '50%', background: LIME, filter: 'blur(180px)', opacity: 0.06, pointerEvents: 'none' }} />
        <div className="max-w-[1100px] mx-auto relative">

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: LIME }}>
              07 / Why us vs an in-house hire
            </p>
            <h2 id="compare-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(26px, 3.8vw, 48px)', color: '#F4F7F1', lineHeight: 1.08, maxWidth: 800 }}>
              AI Product Partner vs.{' '}
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: LIME_DEEP }}>
                Hiring an In-House AI Team
              </span>
            </h2>
          </motion.div>

          {/* Table */}
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th className="text-left py-4 pr-6 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: '#3a403a', width: '28%', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    Factor
                  </th>
                  <th className="text-left py-4 px-6 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: LIME, borderBottom: `1px solid ${LIME}30`, width: '36%' }}>
                    <span className="flex items-center gap-2">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: LIME, display: 'inline-block' }} />
                      MEEHAAN Digital
                    </span>
                  </th>
                  <th className="text-left py-4 pl-6 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: '#666', borderBottom: '1px solid rgba(255,255,255,0.07)', width: '36%' }}>
                    <span className="flex items-center gap-2">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#444', display: 'inline-block' }} />
                      In-House Team
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor: 'Time to first system', us: '14 Days', them: '9–18 months' },
                  { factor: 'Annual Cost', us: '$60K–$180K', them: '$600K–$1M+' },
                  { factor: 'Team size accessed', us: '5–15 specialists', them: '1–4 hires' },
                  { factor: 'Cross-industry experience', us: 'Immediate', them: 'Starts at zero' },
                  { factor: 'Flexibility', us: 'Adjust monthly', them: 'Locked in' },
                  { factor: 'Risk if it fails', us: 'Low — exit contract', them: 'High — severance + lost time' },
                  { factor: 'Ownership of systems', us: 'You own everything', them: 'Full internal ownership' },
                  { factor: 'Best stage', us: 'Growth-stage, pre-$50M', them: 'Post PMF, enterprise scale' },
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.5}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <td className="py-4 pr-6 font-dm text-[13px]" style={{ color: '#888' }}>
                      {row.factor}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="font-dm font-medium text-[13px] inline-flex items-center gap-2"
                        style={{ color: '#E8EDE6' }}
                      >
                        <Check size={13} color={LIME} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        {row.us}
                      </span>
                    </td>
                    <td className="py-4 pl-6 font-dm text-[13px]" style={{ color: '#555' }}>
                      {row.them}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-[80px]" style={{ background: INK, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="faq-heading">
        <div className="max-w-[840px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <SectionLabel color={LIME}>FAQ</SectionLabel>
            <h2 id="faq-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(22px, 3vw, 34px)', color: '#F4F7F1', lineHeight: 1.1 }}>
              Answers before <br />
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: LIME_DEEP }}>
                you ask.
              </span>
            </h2>
          </motion.div>
          <div>
            {faqs.map((f, i) => <FAQItem key={i} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-[80px] relative overflow-hidden" style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="case-studies-heading">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="mb-16">
            <h2 id="case-studies-heading" className="font-syne font-bold text-[32px] lg:text-[40px] text-white mb-4 leading-tight">
              Client Success Stories
            </h2>
            <p className="font-dm text-[15px] text-[#999] max-w-[600px]">
              Real results from real clients. See how we've transformed businesses with AI automation.
            </p>
          </motion.div>

          <div className="space-y-12">
            {CASE_STUDIES.map((study, i) => (
              <motion.div
                key={study.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
                custom={i * 0.1}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Text first on odd indices, last on even */}
                {i % 2 === 0 ? (
                  <>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full" style={{ background: LIME_DEEP }} />
                        <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider">Case Study {i + 1}</span>
                      </div>
                      <h3 className="font-syne font-bold text-[24px] text-white mb-3 leading-tight">
                        {study.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="font-dm text-[13px] text-[#666]">{study.client}</span>
                        <span className="w-1 h-1 rounded-full bg-[#666]" />
                        <span className="font-dm text-[13px] text-[#666]">{study.industry}</span>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div>
                          <p className="font-mono text-[11px] text-[#888] uppercase tracking-wider mb-2">Problem</p>
                          <p className="font-dm text-[14px] text-[#ccc] leading-relaxed">{study.problem}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[11px] text-[#888] uppercase tracking-wider mb-2">Solution</p>
                          <p className="font-dm text-[14px] text-[#ccc] leading-relaxed">{study.solution}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#333]">
                        {study.results.map((result, idx) => (
                          <div key={idx}>
                            <p className="font-syne font-bold text-[18px] text-white">{result.split(':')[0]}</p>
                            <p className="font-dm text-[12px] text-[#999] mt-1">{result.split(':')[1]?.trim()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#0a1510] rounded-lg p-8 border border-[#333] lg:order-last">
                      <blockquote className="font-dm text-[15px] text-[#ccc] italic mb-6 leading-relaxed">
                        "{study.testimonial}"
                      </blockquote>
                      <p className="font-mono text-[12px] text-[#666]">Delivered in {study.timeline}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-[#0a1510] rounded-lg p-8 border border-[#333]">
                      <blockquote className="font-dm text-[15px] text-[#ccc] italic mb-6 leading-relaxed">
                        "{study.testimonial}"
                      </blockquote>
                      <p className="font-mono text-[12px] text-[#666]">Delivered in {study.timeline}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full" style={{ background: LIME_DEEP }} />
                        <span className="font-mono text-[11px] text-[#999] uppercase tracking-wider">Case Study {i + 1}</span>
                      </div>
                      <h3 className="font-syne font-bold text-[24px] text-white mb-3 leading-tight">
                        {study.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="font-dm text-[13px] text-[#666]">{study.client}</span>
                        <span className="w-1 h-1 rounded-full bg-[#666]" />
                        <span className="font-dm text-[13px] text-[#666]">{study.industry}</span>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div>
                          <p className="font-mono text-[11px] text-[#888] uppercase tracking-wider mb-2">Problem</p>
                          <p className="font-dm text-[14px] text-[#ccc] leading-relaxed">{study.problem}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[11px] text-[#888] uppercase tracking-wider mb-2">Solution</p>
                          <p className="font-dm text-[14px] text-[#ccc] leading-relaxed">{study.solution}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#333]">
                        {study.results.map((result, idx) => (
                          <div key={idx}>
                            <p className="font-syne font-bold text-[18px] text-white">{result.split(':')[0]}</p>
                            <p className="font-dm text-[12px] text-[#999] mt-1">{result.split(':')[1]?.trim()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-[80px] relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${INK} 0%, ${INK_3} 100%)`, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        aria-label="Final call to action"
      >
        {/* Large radial green glow */}
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 900, height: 900, transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${FOREST}55 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
        <Particles count={10} />

        <div className="relative z-10 max-w-[1040px] mx-auto text-center">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="inline-block mb-8">
            <PillBadge>First system live in 14 days</PillBadge>
          </motion.div>

          <motion.h2
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="font-syne font-extrabold mx-auto mb-6"
            style={{ fontSize: 'clamp(28px, 5vw, 58px)', color: '#F4F7F1', lineHeight: 1.08, maxWidth: 900 }}
          >
            Your first AI system, <br />
            <TiltedHighlight rotate={-2} delay={0.2}>live in 14 days.</TiltedHighlight>
          </motion.h2>

          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="font-dm mb-10 mx-auto"
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: '#9BA89E',
              maxWidth: 520,
              lineHeight: 1.65,
            }}
          >
            Tell us one process you want automated. We scope it, build it, and ship it — with a fixed price and a fixed deadline. No retainers. No surprises.
          </motion.p>

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} className="flex flex-wrap gap-3 justify-center">
            <ForestCTA to={CAL_URL}>Book a free call</ForestCTA>
            <ForestCTA to="/solutions/digital/products" variant="ghost">See what we've built</ForestCTA>
          </motion.div>

          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
            className="font-dm text-[12px] mt-8" style={{ color: '#5f6760' }}
          >
            <span style={{ color: LIME }}>*</span> Fixed scope. Fixed price. Full refund if we miss the deadline — no questions asked.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default DigitalLanding;
