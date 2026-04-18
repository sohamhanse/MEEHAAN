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
  'CA FIRMS', 'LUBRICANTS', 'INDUSTRIAL DISTRIBUTORS', 'B2B MANUFACTURING',
  'FIELD SALES', 'SAAS STARTUPS', 'D2C BRANDS', 'COMPLIANCE TEAMS',
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
const PillBadge = ({ children }) => (
  <div
    className="inline-flex items-center gap-2"
    style={{
      background: 'rgba(212,245,101,0.06)',
      border: '1px solid rgba(212,245,101,0.22)',
      borderRadius: 999,
      padding: '6px 16px',
    }}
  >
    <span style={{ width: 7, height: 7, borderRadius: '50%', background: LIME, boxShadow: `0 0 10px ${LIME}` }} className="animate-pulse" />
    <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: LIME }}>{children}</span>
  </div>
);

// ─── Rounded Forest CTA Button ───────────────────────────────────────────────
const ForestCTA = ({ to, children, variant = 'primary' }) => {
  const [hov, setHov] = useState(false);
  const isPrimary = variant === 'primary';
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="font-dm font-medium inline-flex items-center gap-2 group"
      style={{
        background: isPrimary ? (hov ? FOREST_DEEP : FOREST) : 'transparent',
        border: isPrimary ? `1px solid ${FOREST}` : '1px solid rgba(255,255,255,0.14)',
        color: isPrimary ? '#EAF9F1' : hov ? LIME : '#A8B0A8',
        padding: isPrimary ? '15px 28px' : '14px 22px',
        borderRadius: 999,
        fontSize: 14,
        transition: 'background 220ms ease, color 220ms ease, border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov && isPrimary ? `0 12px 32px ${FOREST}60` : 'none',
      }}
    >
      {children}
      <motion.span animate={{ x: hov ? 4 : 0 }} transition={{ duration: 0.2 }}>
        <ArrowRight size={16} strokeWidth={2} />
      </motion.span>
    </Link>
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

// ─── Process Step (new section — was hero panel) ─────────────────────────────
const PROCESS_STEPS = [
  { icon: Phone, label: 'Discovery Call', sub: 'A 30-minute call to understand your workflow, constraints, and non-negotiables.', color: TEAL, tag: '30 min · free' },
  { icon: FileText, label: 'Proposal in 48h', sub: 'Detailed scope, fixed timeline, transparent pricing. No hidden costs, no surprises.', color: ORANGE, tag: 'fixed scope' },
  { icon: Wrench, label: 'Build & Iterate', sub: 'Weekly demos. Your feedback shapes every sprint. Quality every step.', color: TEAL, tag: 'weekly demos' },
  { icon: Zap, label: 'Deploy & Support', sub: 'Live launch with team training and ongoing maintenance from day one.', color: ORANGE, tag: 'day-one support' },
];

const ProcessTimeline = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {PROCESS_STEPS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: EASE }}
            whileHover={{ y: -4 }}
            style={{
              background: INK_2,
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14,
              padding: '22px 20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Step number */}
            <span className="font-mono" style={{ position: 'absolute', top: 14, right: 16, color: 'rgba(255,255,255,0.15)', fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
              0{i + 1}
            </span>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: s.color + '15', border: `1.5px solid ${s.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
            }}>
              <Icon size={18} color={s.color} strokeWidth={1.8} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded" style={{ background: s.color + '12', color: s.color, border: `1px solid ${s.color}28` }}>
              {s.tag}
            </span>
            <h3 className="font-syne font-semibold mt-3" style={{ fontSize: 15, color: '#E0E4DE' }}>{s.label}</h3>
            <p className="font-dm text-[12.5px] mt-2 leading-[1.65]" style={{ color: '#777' }}>{s.sub}</p>
          </motion.div>
        );
      })}
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
      desc: 'Purpose-built SaaS products engineered for specific Indian industry workflows — from MVP validation to scaling.',
      items: ['Product strategy & scoping', 'MVP in 6–10 weeks', 'WhatsApp-native products', 'India-specific compliance tools', 'PLG onboarding flows'],
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
    { type: 'AUTOMATION', label: 'Compliance Follow-ups', desc: 'WhatsApp-first reminder engine for GST, ITR, TDS cycles — escalations, document capture, and audit trails.' },
    { type: 'SOFTWARE', label: 'Operations Dashboard', desc: 'Live visibility into manufacturing, inventory, and dispatch — replacing Excel and WhatsApp group chaos.' },
  ];

  const whyRows = [
    { them: 'Generic template solutions forced onto your workflow', us: 'Scoped precisely to how your team actually works today' },
    { them: '3–6 month timelines with ballooning scope', us: 'Proposals in 48 hours, delivery measured in weeks' },
    { them: 'Hourly billing with no cost visibility', us: 'Fixed pricing, fixed scope, no hidden costs' },
    { them: 'Hand-off and disappear after launch', us: 'Day-one support, training, and ongoing maintenance' },
    { them: 'Agencies that have never seen an Indian GST cycle', us: 'Built for Indian workflows — WhatsApp, UPI, regional context' },
  ];

  const faqs = [
    { q: 'What does a typical engagement look like?', a: 'Every engagement starts with a free 30-minute discovery call. Within 48 hours, you get a detailed proposal with scope, timeline, and fixed pricing. If you proceed, we build in weekly sprints with demos every Friday, so you always know exactly where things stand.' },
    { q: 'How long does a typical project take?', a: 'Workflow automation systems ship in 2–4 weeks. Custom software MVPs ship in 6–10 weeks. Large multi-role portals and SaaS platforms take 10–16 weeks depending on scope. We always commit to a fixed date upfront.' },
    { q: 'Do you work with businesses outside Pune?', a: 'Yes. The majority of our clients are across India — Mumbai, Bangalore, Chennai, Delhi, Ahmedabad, Hyderabad, and tier-2 cities. Everything runs over Zoom calls and weekly demos. In-person kickoffs are available for Maharashtra-based clients if needed.' },
    { q: 'What tech stack do you build on?', a: 'React, Next.js, Node, Python, PostgreSQL, Supabase, AWS/GCP, WhatsApp Cloud API, Razorpay, and more. We choose the stack based on what your business needs — maintainability, performance, cost — not what\'s trendy.' },
    { q: 'Do you offer post-launch support?', a: 'Yes. Every engagement includes 30 days of free post-launch support. After that, maintenance plans start at a transparent monthly rate covering bug fixes, minor enhancements, and priority response times.' },
    { q: 'Can I see work you\'ve shipped before?', a: 'During the discovery call we walk you through live case studies from CA firms, industrial distributors, and B2B manufacturers. Reference calls with existing clients are available on request after the first proposal.' },
  ];

  const typeColor = (t) => t === 'AUTOMATION' ? ORANGE : TEAL;

  return (
    <div className="min-h-screen" style={{ background: INK, paddingTop: 64 }}>
      <SEOHead
        title="Digital Solutions — Custom Software, Workflow Automation & SaaS Development"
        description="MEEHAAN Digital builds custom software, systematic automation, and purpose-built SaaS for Indian businesses. Proposals in 48 hours. Delivery in weeks."
        keywords="custom software development Pune, workflow automation India, WhatsApp automation, CRM software India, SaaS development, business automation, MEEHAAN digital"
        canonical="/solutions/digital"
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

        <Particles count={14} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[80px] py-20 text-center">
          {/* Breadcrumb */}
          <motion.nav
            variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            aria-label="Breadcrumb" className="font-mono text-[11px] mb-8" style={{ color: '#555' }}
          >
            <Link to="/" className="transition-colors" style={{ color: '#555' }} onMouseOver={e => e.currentTarget.style.color = LIME} onMouseOut={e => e.currentTarget.style.color = '#555'}>Home</Link>
            <span className="mx-1">/</span>
            <span style={{ color: '#888' }}>Digital Solutions</span>
          </motion.nav>

          {/* Pill */}
          <motion.div variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={1} className="inline-block mb-8">
            <PillBadge>Done-for-you software builds</PillBadge>
          </motion.div>

          {/* Headline with tilted highlight */}
          <motion.h1
            className="font-syne font-extrabold leading-[1.05] mb-7 tracking-tight mx-auto"
            style={{ fontSize: 'clamp(36px, 6.2vw, 80px)', color: '#F4F7F1', maxWidth: 1050 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="block"
            >
              Software built for you.
            </motion.span>
            <span className="block mt-2" style={{ transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.1}px)`, transition: 'transform 400ms ease-out' }}>
              <TiltedHighlight rotate={-2.5} delay={0.35}>Scope. Ship. Scale.</TiltedHighlight>
            </span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="block mt-2"
            >
              In as little as 48 hours.
            </motion.span>
          </motion.h1>

          {/* Underlined subhead */}
          <motion.p
            variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={3}
            className="font-syne font-semibold mb-10 mx-auto"
            style={{
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              color: '#EAEFE6',
              maxWidth: 640,
              textDecoration: 'underline',
              textUnderlineOffset: 6,
              textDecorationThickness: 1,
              textDecorationColor: 'rgba(212,245,101,0.55)',
            }}
          >
            Fixed scope. Fixed timeline. Live in your business within weeks.
          </motion.p>

          {/* CTA */}
          <motion.div variants={reveal} initial="hidden" animate={heroInView ? 'visible' : 'hidden'} custom={4} className="flex flex-wrap gap-3 justify-center items-center mb-6">
            <ForestCTA to="/contact?type=demo">Book a Call</ForestCTA>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
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
              Explore services ↓
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

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 lg:py-24 px-6 lg:px-[80px]" style={{ background: INK, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="services-heading">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel>What we build</SectionLabel>
            <h2 id="services-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(26px, 3.4vw, 42px)', color: '#F4F7F1', lineHeight: 1.1 }}>
              Three ways to ship faster <br />
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: LIME_DEEP }}>
                than your competition.
              </span>
            </h2>
            <p className="font-dm text-[14.5px] mt-4 leading-[1.75] max-w-[560px]" style={{ color: '#888' }}>
              No off-the-shelf software. No generic solutions. Every engagement is scoped and built specifically for how your team actually operates.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s, i) => <CapCard key={i} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-[80px] relative overflow-hidden" style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="process-heading">
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, borderRadius: '50%', background: FOREST, filter: 'blur(180px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div className="max-w-[1200px] mx-auto relative">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 max-w-[620px]">
            <SectionLabel color={LIME}>Our process</SectionLabel>
            <h2 id="process-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', color: '#F4F7F1', lineHeight: 1.1 }}>
              From <TiltedHighlight rotate={-1.5} delay={0.1}>first call</TiltedHighlight> to production — in weeks, not months.
            </h2>
            <p className="font-dm text-[14px] mt-4 leading-[1.75]" style={{ color: '#888' }}>
              Four checkpoints. Predictable outcomes. Your build in production before most agencies send their first proposal.
            </p>
          </motion.div>
          <ProcessTimeline />

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="mt-10">
            <ForestCTA to="/contact?type=demo">Start with a free call</ForestCTA>
          </motion.div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-[80px]" style={{ background: INK, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="usecases-heading">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <SectionLabel color="#6a6f66">Built for these scenarios</SectionLabel>
            <h2 id="usecases-heading" className="font-syne font-bold" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#F4F7F1' }}>What we've already shipped.</h2>
          </motion.div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.06)', gap: 1, background: 'rgba(255,255,255,0.04)' }}
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}
                whileHover={{ background: INK_3 }}
                className="p-7 cursor-default"
                style={{ background: INK_2, transition: 'background 180ms ease' }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: typeColor(uc.type) }}>◆ {uc.type}</span>
                <h3 className="font-syne font-semibold text-[16px] mt-2" style={{ color: '#E8ECE6' }}>{uc.label}</h3>
                <p className="font-dm text-[12.5px] mt-2 leading-[1.65]" style={{ color: '#777' }}>{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS (Lindy-style) ───────────────────────────────────── */}
      <IntegrationsSection />

      {/* ── WHY MEEHAAN DIGITAL ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-6 lg:px-[80px] relative overflow-hidden" style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }} aria-labelledby="why-heading">
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -120, left: -80, width: 420, height: 420, borderRadius: '50%', background: LIME, filter: 'blur(180px)', opacity: 0.06, pointerEvents: 'none' }} />
        <div className="max-w-[1040px] mx-auto relative">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 text-center">
            <SectionLabel color={LIME}>Why teams choose us</SectionLabel>
            <h2 id="why-heading" className="font-syne font-bold mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', color: '#F4F7F1', lineHeight: 1.15, maxWidth: 720 }}>
              Most agencies sell hours. We ship{' '}
              <TiltedHighlight rotate={-1.5} delay={0.15}>outcomes.</TiltedHighlight>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(239,68,68,0.7)' }}>◆ Generic agencies</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: LIME }}>◆ MEEHAAN Digital</div>
          </div>
          <div className="space-y-2">
            {whyRows.map((row, i) => <WhyRow key={i} {...row} index={i} />)}
          </div>
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
            <PillBadge>Ready when you are</PillBadge>
          </motion.div>

          <motion.h2
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="font-syne font-extrabold mx-auto mb-6"
            style={{ fontSize: 'clamp(28px, 5vw, 58px)', color: '#F4F7F1', lineHeight: 1.08, maxWidth: 900 }}
          >
            Your next build, <br />
            <TiltedHighlight rotate={-2} delay={0.2}>live in 48 days.</TiltedHighlight>
          </motion.h2>

          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="font-syne font-semibold mb-10 mx-auto"
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: '#D8DED4',
              maxWidth: 560,
              textDecoration: 'underline',
              textUnderlineOffset: 6,
              textDecorationThickness: 1,
              textDecorationColor: 'rgba(212,245,101,0.5)',
            }}
          >
            Start with a free 30-minute call. Get a proposal in 48 hours.
          </motion.p>

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} className="flex flex-wrap gap-3 justify-center">
            <ForestCTA to="/contact?type=demo">Book a Call</ForestCTA>
            <ForestCTA to="/contact?type=enquiry" variant="ghost">Send an enquiry</ForestCTA>
          </motion.div>

          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
            className="font-dm text-[12px] mt-8" style={{ color: '#5f6760' }}
          >
            <span style={{ color: LIME }}>*</span> Money-back guarantee on initial scope delivery. No hidden costs. Cancel any time during discovery.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default DigitalLanding;
