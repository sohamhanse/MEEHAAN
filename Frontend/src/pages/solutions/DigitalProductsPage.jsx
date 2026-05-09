import { Link } from 'react-router-dom';
import { digitalPath, IS_DIGITAL_SITE, DIGITAL_SEO_BASE } from '../../utils/seo';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { DIGITAL_PRODUCTS } from '../../data/digitalProducts';

// ─── Palette ──────────────────────────────────────────────────────────────────
const INK = '#050805';
const INK_2 = '#0a100c';
const INK_3 = '#0e1510';
const LIME = '#D4F565';
const LIME_DEEP = '#C6E84F';
const FOREST = '#184D3A';
const FOREST_DEEP = '#0F3A2B';
const EASE = [0.23, 1, 0.32, 1];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE },
  }),
};

// ─── Category icon map ────────────────────────────────────────────────────────
const CategoryIcon = ({ category, color, size = 18 }) => {
  const s = { width: size, height: size };
  switch (category) {
    case 'Voice AI':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      );
    case 'Education AI':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'B2B Brokerage AI':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'Legal Tech':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'Field Operations':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'Marketing Tech':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'Call Centre AI':
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      );
    default:
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      );
  }
};

// ─── Product card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, index, featured }) => {
  const { slug, category, name, heroDesc, timeline, accentColor, industry } = product;

  if (featured) {
    return (
      <motion.article
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        custom={index}
        className="col-span-full"
        style={{
          background: INK_2,
          border: `1px solid ${accentColor}30`,
          borderTop: `2px solid ${accentColor}`,
          borderRadius: 16,
          padding: '36px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: -60, right: -60, width: 320, height: 320,
          borderRadius: '50%', background: accentColor, filter: 'blur(120px)', opacity: 0.07, pointerEvents: 'none',
        }} />

        <div className="relative flex flex-col lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: accentColor + '18', border: `1px solid ${accentColor}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CategoryIcon category={category} color={accentColor} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                  {category}
                </span>
                <div className="font-mono text-[10px]" style={{ color: '#444', marginTop: 2 }}>
                  {timeline}
                </div>
              </div>
              <span
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded ml-auto"
                style={{ background: accentColor + '14', color: accentColor, border: `1px solid ${accentColor}28` }}
              >
                Bundled System
              </span>
            </div>

            <h2 className="font-syne font-bold" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: '#F4F7F1', lineHeight: 1.1, maxWidth: 560 }}>
              {name}
            </h2>
            <p className="font-dm text-[14px] mt-4 leading-[1.75]" style={{ color: '#707570', maxWidth: 600 }}>
              {heroDesc}
            </p>
          </div>

          <div className="mt-6 lg:mt-0 lg:w-[260px] flex-shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: '#444' }}>
              Six coordinated agents
            </p>
            <div className="space-y-2">
              {product.agents.slice(0, 5).map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono text-[10px]" style={{ color: accentColor }}>{a.num}</span>
                  <span className="font-dm text-[12px]" style={{ color: '#888' }}>{a.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px]" style={{ color: accentColor }}>006</span>
                <span className="font-dm text-[12px] font-medium" style={{ color: accentColor }}>The Jarvis Layer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link
            to={digitalPath(`/products/${slug}`)}
            className="inline-flex items-center gap-2 font-dm font-medium text-[13px] group"
            style={{ color: accentColor }}
          >
            View full product
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
              <ArrowRight size={14} strokeWidth={2} />
            </span>
          </Link>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index % 4}
      style={{
        background: INK_2,
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: `2px solid ${accentColor}`,
        borderRadius: 14,
        padding: '24px 22px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ y: -4, borderColor: accentColor + '30', transition: { duration: 0.2 } }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 9,
        background: accentColor + '14', border: `1px solid ${accentColor}24`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        <CategoryIcon category={category} color={accentColor} size={16} />
      </div>

      <span className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: accentColor }}>
        {category}
      </span>
      <h2 className="font-syne font-semibold" style={{ fontSize: 17, color: '#E8ECE6', lineHeight: 1.2, marginBottom: 10 }}>
        {name}
      </h2>
      <p className="font-dm text-[12.5px] leading-[1.7]" style={{ color: '#666', flex: 1, marginBottom: 16 }}>
        {heroDesc}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="font-mono text-[10px]" style={{ color: '#3a3f3a' }}>{timeline}</span>
        <Link
          to={digitalPath(`/products/${slug}`)}
          className="inline-flex items-center gap-1 font-dm font-medium text-[12px] group"
          style={{ color: accentColor }}
        >
          View
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-[2px]">
            <ArrowRight size={12} strokeWidth={2} />
          </span>
        </Link>
      </div>
    </motion.article>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const DigitalProductsPage = () => {
  const regular = DIGITAL_PRODUCTS.filter((p) => !p.isFeatured);
  const featured = DIGITAL_PRODUCTS.find((p) => p.isFeatured);

  return (
    <div className="min-h-screen" style={{ background: INK, paddingTop: 64 }}>
      <SEOHead
        title="AI Products — Voice AI, Workflow Automation, Legal Tech & More"
        description="Nine specialised AI products built by MEEHAAN Digital. Voice AI, contact centre intelligence, legal recovery automation, field operations AI, and more. Deployed in under 14 days."
        keywords="AI products, voice AI agent, AI automation products, workflow automation software, legal tech AI, field operations AI, contact centre AI, AI SaaS"
        canonical={digitalPath('/products')}
        ogLocale="en_US"
        jsonLd={(() => {
          const base = IS_DIGITAL_SITE ? DIGITAL_SEO_BASE.baseUrl : 'https://www.meehaan.com/solutions/digital';
          const p = (slug) => `${base}/products${slug ? '/' + slug : ''}`;
          return {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': p(''),
              'name': 'AI Products — MEEHAAN Digital',
              'url': p(''),
              'description': 'Nine specialised AI systems built by MEEHAAN Digital. Deployed in under 14 days.',
              'breadcrumb': {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': IS_DIGITAL_SITE ? DIGITAL_SEO_BASE.baseUrl + '/' : 'https://www.meehaan.com/' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Digital Solutions', 'item': base },
                  { '@type': 'ListItem', 'position': 3, 'name': 'AI Products', 'item': p('') },
                ],
              },
            },
            {
              '@type': 'ItemList',
              'name': 'MEEHAAN Digital AI Products',
              'description': 'Nine specialised AI systems for franchise operators, brokers, legal teams, field services, and more.',
              'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'Voice Intake Concierge', 'url': p('voice-intake-concierge'), 'description': 'Always-on AI voice agent for franchise and multi-location businesses.' },
                { '@type': 'ListItem', 'position': 2, 'name': 'AI-Native LMS', 'url': p('ai-native-lms'), 'description': 'Adaptive learning and onboarding platform built natively on AI.' },
                { '@type': 'ListItem', 'position': 3, 'name': 'Legal Recovery AI', 'url': p('legal-recovery-ai'), 'description': 'AI platform for debt recovery and legal process workflow automation.' },
                { '@type': 'ListItem', 'position': 4, 'name': 'Facility Operations AI', 'url': p('facility-operations-ai'), 'description': 'AI intelligence layer for facility management and field service operators.' },
                { '@type': 'ListItem', 'position': 5, 'name': 'Contact Center Intelligence', 'url': p('contact-center-intelligence'), 'description': 'AI layer that surfaces full caller context the moment a call connects.' },
                { '@type': 'ListItem', 'position': 6, 'name': 'Horizontal AI Agents', 'url': p('horizontal-ai-agents'), 'description': 'Six coordinated AI agents sharing one context window across your entire business.' },
                { '@type': 'ListItem', 'position': 7, 'name': 'CaFlow', 'url': p('caflow-practice-management'), 'description': 'End-to-end practice management platform for accounting firms in the US and UAE — replacing TaxDome, Dext, and Karbon with one platform.' },
                { '@type': 'ListItem', 'position': 8, 'name': 'Website Builder AI', 'url': p('website-builder-ai'), 'description': 'Builds, continuously optimises, and grows websites automatically — design, copy, SEO, and AEO.' },
                { '@type': 'ListItem', 'position': 9, 'name': 'Exit Concierge', 'url': p('exit-concierge'), 'description': 'AI operations layer for business brokers — automates qualification, document collection, and buyer-seller matching.' },
              ],
            },
          ],
        };})()}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-[80px]"
        style={{ background: INK }}
        aria-labelledby="products-hero-heading"
      >
        {/* Background grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(212,245,101,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,245,101,0.03) 1px, transparent 1px)`,
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 75% 60% at 50% 30%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 30%, #000 20%, transparent 100%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${FOREST}40 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            variants={reveal} initial="hidden" animate="visible"
            aria-label="Breadcrumb"
            className="font-mono text-[11px] mb-8" style={{ color: '#555' }}
          >
            <Link to={digitalPath('/')} style={{ color: '#555' }} onMouseOver={e => e.currentTarget.style.color = LIME} onMouseOut={e => e.currentTarget.style.color = '#555'}>Digital</Link>
            <span className="mx-1">/</span>
            <span style={{ color: '#888' }}>AI Products</span>
          </motion.nav>

          <motion.div variants={reveal} initial="hidden" animate="visible" custom={1} className="inline-flex items-center gap-2 mb-8"
            style={{ background: 'rgba(212,245,101,0.06)', border: '1px solid rgba(212,245,101,0.22)', borderRadius: 999, padding: '6px 16px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: LIME, boxShadow: `0 0 10px ${LIME}` }} className="animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: LIME }}>9 AI products · live in 14 days</span>
          </motion.div>

          <motion.h1
            variants={reveal} initial="hidden" animate="visible" custom={2}
            id="products-hero-heading"
            className="font-syne font-extrabold"
            style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', color: '#F4F7F1', lineHeight: 1.07, maxWidth: 900, letterSpacing: '-0.02em' }}
          >
            AI products built for<br />
            <span style={{ color: LIME_DEEP, fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700 }}>
              operators who ship fast.
            </span>
          </motion.h1>

          <motion.p
            variants={reveal} initial="hidden" animate="visible" custom={3}
            className="font-dm mt-6"
            style={{ fontSize: 16, color: '#777', maxWidth: 600, lineHeight: 1.75 }}
          >
            Eight specialised AI systems — each scoped to a specific industry problem and deployable in under 14 days. No general-purpose tools. Purpose-built infrastructure.
          </motion.p>
        </div>
      </section>

      {/* ── PRODUCT GRID ──────────────────────────────────────────────────── */}
      <section
        className="py-12 lg:py-16 px-6 lg:px-[80px]"
        style={{ background: INK }}
        aria-label="Product listing"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {regular.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>

          {featured && (
            <ProductCard product={featured} index={regular.length} featured />
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20 px-6 lg:px-[80px]"
        style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        aria-label="Get started"
      >
        <div className="max-w-[720px] mx-auto text-center">
          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4"
            style={{ color: LIME }}
          >
            Ready to deploy
          </motion.p>
          <motion.h2
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="font-syne font-bold"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#F4F7F1', lineHeight: 1.1, marginBottom: 16 }}
          >
            Not sure which product fits your business?
          </motion.h2>
          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="font-dm text-[14px] leading-[1.75] mb-10"
            style={{ color: '#777' }}
          >
            Book a free 30-minute call. We'll identify the right AI layer for your workflow and give you a deployment plan within 48 hours.
          </motion.p>
          <motion.div
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link
              to="/contact?type=demo"
              className="font-dm font-medium inline-flex items-center gap-2 group"
              style={{
                background: FOREST, border: `1px solid ${FOREST}`, color: '#EAF9F1',
                padding: '14px 28px', borderRadius: 999, fontSize: 14,
                transition: 'background 220ms ease, box-shadow 220ms ease',
              }}
              onMouseOver={e => { e.currentTarget.style.background = FOREST_DEEP; e.currentTarget.style.boxShadow = `0 12px 32px ${FOREST}60`; }}
              onMouseOut={e => { e.currentTarget.style.background = FOREST; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Book a Call <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link
              to={digitalPath('/')}
              className="font-dm font-medium inline-flex items-center gap-2"
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.14)',
                color: '#A8B0A8', padding: '14px 22px', borderRadius: 999, fontSize: 14,
                transition: 'border-color 200ms ease, color 200ms ease',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = `${LIME}40`; e.currentTarget.style.color = LIME; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#A8B0A8'; }}
            >
              ← Back to Digital Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalProductsPage;
