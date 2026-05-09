import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { getProductBySlug, DIGITAL_PRODUCTS } from '../../data/digitalProducts';
import { digitalPath, IS_DIGITAL_SITE, DIGITAL_SEO_BASE } from '../../utils/seo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase);
CustomEase.create('expo.custom', '0.16, 1, 0.3, 1');

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
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  }),
};

// ─── Section number badge ─────────────────────────────────────────────────────
const NumBadge = ({ num, color }) => (
  <div
    className="font-mono font-bold flex-shrink-0"
    style={{
      fontSize: 11, letterSpacing: '0.1em', color,
      background: color + '14', border: `1px solid ${color}28`,
      borderRadius: 6, padding: '4px 10px',
      alignSelf: 'flex-start',
    }}
  >
    {num}
  </div>
);

// ─── Challenge / Approach / Result / Takeaway section ────────────────────────
const ContentSection = ({ section, accentColor, index }) => {
  const isEven = index % 2 === 0;
  const tagColors = {
    Challenge: '#EF4444',
    Approach: accentColor,
    Result: LIME_DEEP,
    Takeaway: '#888',
  };
  const tagColor = tagColors[section.tag] || accentColor;
  const numRef = useRef(null);

  // ScrambleText the section number when the card enters viewport
  useEffect(() => {
    if (!numRef.current) return;
    const el = numRef.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.to(el, {
          duration: 0.65, delay: 0.1,
          scrambleText: { text: section.num, chars: '0123456789', speed: 1.3 },
        });
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [section.num]);

  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={index * 0.3}
      className="relative group"
      whileHover={{ x: 3, transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } }}
      style={{
        background: isEven ? INK_2 : INK_3,
        borderLeft: `3px solid ${tagColor}`,
        borderRadius: '0 12px 12px 0',
        padding: '32px 28px',
        overflow: 'hidden',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 20px rgba(0,0,0,0.25)`,
        transition: 'box-shadow 250ms ease',
      }}
    >
      {/* Large ghost number */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -16, right: 14,
        fontFamily: 'Syne, sans-serif', fontWeight: 900,
        fontSize: 'clamp(100px, 14vw, 160px)',
        lineHeight: 1,
        color: tagColor,
        opacity: 0.04,
        userSelect: 'none',
        letterSpacing: '-0.05em',
        pointerEvents: 'none',
      }}>
        {section.num}
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="font-mono font-bold flex-shrink-0"
            style={{
              fontSize: 11, letterSpacing: '0.1em', color: tagColor,
              background: tagColor + '14', border: `1px solid ${tagColor}28`,
              borderRadius: 6, padding: '4px 10px', alignSelf: 'flex-start',
            }}
          >
            <span ref={numRef}>{section.num}</span>
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: tagColor }}
          >
            {section.tag}
          </span>
        </div>

        <h3
          className="font-syne font-bold"
          style={{
            fontSize: 'clamp(17px, 2vw, 22px)',
            color: '#E8ECE6',
            lineHeight: 1.25,
            maxWidth: 680,
            marginBottom: 16,
          }}
        >
          {section.heading}
        </h3>

        <p
          className="font-dm leading-[1.8]"
          style={{ fontSize: 14, color: '#707570', maxWidth: 680 }}
        >
          {section.body}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Agent card (for Horizontal AI Agents) ───────────────────────────────────
const AgentCard = ({ agent, accentColor, index }) => (
  <motion.div
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    custom={index * 0.1}
    style={{
      background: agent.isSpecial ? accentColor + '0e' : INK_2,
      border: `1px solid ${agent.isSpecial ? accentColor + '35' : 'rgba(255,255,255,0.06)'}`,
      borderTop: `2px solid ${accentColor}`,
      borderRadius: 12,
      padding: '22px 20px',
    }}
    whileHover={{ y: -3, transition: { duration: 0.18 } }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="font-mono text-[11px] font-bold" style={{ color: accentColor }}>
        {agent.num}
      </span>
      {agent.isSpecial && (
        <span
          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded"
          style={{ background: accentColor + '20', color: accentColor, border: `1px solid ${accentColor}30` }}
        >
          Orchestration
        </span>
      )}
    </div>
    <h4 className="font-syne font-semibold mb-2" style={{ fontSize: 15, color: '#E0E4DE' }}>
      {agent.name}
    </h4>
    <p className="font-dm text-[12.5px] leading-[1.65] mb-4" style={{ color: '#666' }}>
      {agent.desc}
    </p>
    <div className="flex items-start gap-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Check size={11} color={accentColor} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
      <span className="font-dm text-[12px]" style={{ color: accentColor + 'cc' }}>
        {agent.output}
      </span>
    </div>
  </motion.div>
);

// ─── Related product pill ─────────────────────────────────────────────────────
const RelatedPill = ({ product }) => (
  <Link
    to={digitalPath(`/products/${product.slug}`)}
    className="inline-flex items-center gap-2 font-dm text-[12px] group"
    style={{
      background: INK_2, border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 999, padding: '8px 16px',
      color: '#888',
      transition: 'border-color 200ms ease, color 200ms ease',
    }}
    onMouseOver={e => { e.currentTarget.style.borderColor = product.accentColor + '40'; e.currentTarget.style.color = product.accentColor; }}
    onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#888'; }}
  >
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: product.accentColor, flexShrink: 0 }} />
    {product.name}
    <ArrowRight size={11} strokeWidth={2} />
  </Link>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const DigitalProductPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) return <Navigate to={digitalPath('/products')} replace />;

  const {
    category, industry, timeline, accentColor,
    name, heroDesc, sections, agents, differentiators, isFeatured,
  } = product;

  const related = DIGITAL_PRODUCTS
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  const heroNameRef     = useRef(null);
  const heroCategoryRef = useRef(null);
  const heroLineRef     = useRef(null);
  const stackRef        = useRef(null);
  const cardRefs        = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, sections.length);

    const ctx = gsap.context(() => {
      // SplitText: product name words sweep up with perspective
      if (heroNameRef.current) {
        const split = SplitText.create(heroNameRef.current, { type: 'words' });
        gsap.from(split.words, {
          opacity: 0, y: 72, rotationX: 24,
          transformOrigin: '50% 0%',
          stagger: 0.05, duration: 0.9, delay: 0.28,
          ease: 'expo.custom',
        });
      }

      // ScrambleText: category badge resolves from noise
      if (heroCategoryRef.current) {
        gsap.to(heroCategoryRef.current, {
          duration: 1.3, delay: 0.1,
          scrambleText: {
            text: heroCategoryRef.current.textContent,
            chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·/-',
            revealDelay: 0.4,
            speed: 0.85,
          },
        });
      }

      // DrawSVG: accent line expands outward from center
      if (heroLineRef.current) {
        gsap.fromTo(heroLineRef.current,
          { drawSVG: '50% 50%' },
          { drawSVG: '0% 100%', duration: 1.6, delay: 0.45, ease: 'power3.inOut' }
        );
      }

      // ── Stacking cards ScrollTrigger ─────────────────────────────────────
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length > 1 && stackRef.current) {
        // Cards 1+ start hidden below
        gsap.set(cards.slice(1), { yPercent: 105 });

        const total = cards.length;
        const seg   = 1 / (total - 1); // fraction of timeline per transition

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackRef.current,
            start: 'top top+=88',
            end: 'bottom bottom',
            scrub: 0.7,
          },
        });

        cards.forEach((card, i) => {
          if (i === total - 1) return;
          const at = i * seg;

          // Next card slides up from below
          tl.to(cards[i + 1], {
            yPercent: 0,
            duration: seg * 0.6,
            ease: 'power3.out',
          }, at + seg * 0.15);

          // Current card scales down and dims into the stack
          tl.to(card, {
            scale: 0.94 - i * 0.015,
            yPercent: -(3 + i * 1.5),
            opacity: 0.55,
            filter: 'brightness(0.6)',
            duration: seg * 0.5,
            ease: 'power2.inOut',
          }, at + seg * 0.35);
        });
      }
    });
    return () => ctx.revert();
  }, [slug]);

  const dBase = IS_DIGITAL_SITE ? DIGITAL_SEO_BASE.baseUrl : 'https://www.meehaan.com/solutions/digital';
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        'name': name,
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'description': heroDesc,
        'url': `${dBase}/products/${slug}`,
        'provider': {
          '@type': 'Organization',
          'name': 'MEEHAAN Enterprise',
          'url': 'https://www.meehaan.com',
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'description': 'Fixed-price per project. Free 30-minute discovery call. Proposal delivered within 48 hours.',
          'availability': 'https://schema.org/OnlineOnly',
          'url': `${dBase}/apply`,
        },
        'featureList': sections.map((s) => s.heading),
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': IS_DIGITAL_SITE ? DIGITAL_SEO_BASE.baseUrl + '/' : 'https://www.meehaan.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Digital Solutions', 'item': dBase },
          { '@type': 'ListItem', 'position': 3, 'name': 'AI Products', 'item': `${dBase}/products` },
          { '@type': 'ListItem', 'position': 4, 'name': name, 'item': `${dBase}/products/${slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        'mainEntity': sections.map((s) => ({
          '@type': 'Question',
          'name': s.heading,
          'acceptedAnswer': { '@type': 'Answer', 'text': s.body },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: INK, paddingTop: 64 }}>
      <SEOHead
        title={`${name} — AI Product by MEEHAAN Digital`}
        description={heroDesc.slice(0, 155)}
        keywords={`${name.toLowerCase()}, ${category.toLowerCase()}, AI automation, ${industry.toLowerCase()}, MEEHAAN digital`}
        canonical={digitalPath(`/products/${slug}`)}
        ogLocale="en_US"
        jsonLd={productJsonLd}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 lg:px-[80px] pt-16 pb-20"
        style={{ background: INK }}
        aria-labelledby="product-hero-heading"
      >
        {/* Ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: -80, left: '40%', transform: 'translateX(-50%)',
          width: 700, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}22 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
        {/* Grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${accentColor}06 1px, transparent 1px), linear-gradient(90deg, ${accentColor}06 1px, transparent 1px)`,
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%, #000 20%, transparent 100%)',
        }} />

        <div className="relative max-w-[1000px] mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            variants={reveal} initial="hidden" animate="visible"
            aria-label="Breadcrumb"
            className="font-mono text-[11px] mb-8" style={{ color: '#555' }}
          >
            <Link to={digitalPath('/')} style={{ color: '#555' }} onMouseOver={e => e.currentTarget.style.color = LIME} onMouseOut={e => e.currentTarget.style.color = '#555'}>Digital</Link>
            <span className="mx-1">/</span>
            <Link to={digitalPath('/products')} style={{ color: '#555' }} onMouseOver={e => e.currentTarget.style.color = LIME} onMouseOut={e => e.currentTarget.style.color = '#555'}>Products</Link>
            <span className="mx-1">/</span>
            <span style={{ color: '#888' }}>{name}</span>
          </motion.nav>

          {/* Badges */}
          <motion.div variants={reveal} initial="hidden" animate="visible" custom={1} className="flex flex-wrap items-center gap-2 mb-8">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em] px-3 py-1 rounded"
              style={{ background: accentColor + '18', color: accentColor, border: `1px solid ${accentColor}30` }}
            >
              <span ref={heroCategoryRef}>{category}</span>
            </span>
            <span className="font-mono text-[10px]" style={{ color: '#444' }}>·</span>
            <span className="font-mono text-[10px]" style={{ color: '#555' }}>{industry}</span>
            <span className="font-mono text-[10px]" style={{ color: '#444' }}>·</span>
            <span className="font-mono text-[10px]" style={{ color: '#555' }}>{timeline}</span>
          </motion.div>

          {/* Product name — GSAP SplitText handles entrance */}
          <h1
            ref={heroNameRef}
            id="product-hero-heading"
            className="font-syne font-extrabold"
            style={{
              fontSize: 'clamp(30px, 5.5vw, 62px)',
              color: '#F4F7F1',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              maxWidth: 820,
              marginBottom: 24,
              perspective: '800px',
            }}
          >
            {name}
          </h1>

          {/* Description */}
          <motion.p
            variants={reveal} initial="hidden" animate="visible" custom={3}
            className="font-dm leading-[1.8]"
            style={{ fontSize: 16, color: '#8a908a', maxWidth: 680, marginBottom: 32 }}
          >
            {heroDesc}
          </motion.p>

          {/* CTA */}
          <motion.div variants={reveal} initial="hidden" animate="visible" custom={4} className="flex flex-wrap gap-3 items-center">
            <a
              href="https://cal.com/soham-hanse-yeivxo/30min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm font-medium inline-flex items-center gap-2 group"
              style={{
                background: FOREST, border: `1px solid ${FOREST}`, color: '#EAF9F1',
                padding: '13px 26px', borderRadius: 999, fontSize: 14,
                transition: 'background 200ms ease, box-shadow 200ms ease',
                textDecoration: 'none',
              }}
              onMouseOver={e => { e.currentTarget.style.background = FOREST_DEEP; e.currentTarget.style.boxShadow = `0 10px 28px ${FOREST}55`; }}
              onMouseOut={e => { e.currentTarget.style.background = FOREST; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Deploy this product <ArrowRight size={15} strokeWidth={2} />
            </a>
            <Link
              to={digitalPath('/products')}
              className="font-dm font-medium text-[13px]"
              style={{ color: '#555', transition: 'color 180ms ease' }}
              onMouseOver={e => e.currentTarget.style.color = LIME}
              onMouseOut={e => e.currentTarget.style.color = '#555'}
            >
              ← All products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER — DrawSVG line expanding from center ──────────────────── */}
      <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden' }}>
        <svg width="100%" height="2" preserveAspectRatio="none" viewBox="0 0 1000 2" style={{ display: 'block' }}>
          <path
            ref={heroLineRef}
            d="M0,1 L1000,1"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* ── STACKING CARDS (01–04) ───────────────────────────────────────── */}
      <section
        aria-label="Product details"
        style={{ background: INK }}
      >
        {/* Scroll container — height = sections × scroll-per-card */}
        <div
          ref={stackRef}
          className="px-6 lg:px-[80px]"
          style={{ height: `${sections.length * 85}vh`, position: 'relative' }}
        >
          {/* Sticky viewport window — cards live inside here */}
          <div style={{
            position: 'sticky',
            top: 88,
            height: 'calc(100vh - 108px)',
            overflow: 'hidden',
            maxWidth: 860,
            margin: '0 auto',
          }}>
            {sections.map((section, i) => {
              const tagColors = {
                Challenge: '#EF4444',
                Approach: accentColor,
                Result: LIME_DEEP,
                Takeaway: '#6b7280',
              };
              const tagColor = tagColors[section.tag] || accentColor;
              return (
                <div
                  key={section.num}
                  ref={el => { cardRefs.current[i] = el; }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: i % 2 === 0 ? INK_2 : INK_3,
                    border: `1px solid ${tagColor}1e`,
                    borderLeft: `3px solid ${tagColor}`,
                    borderRadius: '0 18px 18px 0',
                    padding: 'clamp(28px, 4vh, 44px) clamp(24px, 3vw, 40px)',
                    transformOrigin: 'top center',
                    zIndex: i + 1,
                    overflow: 'hidden',
                    boxShadow: `0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  {/* Ghost number */}
                  <div aria-hidden="true" style={{
                    position: 'absolute', top: -20, right: 10,
                    fontFamily: 'Syne, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(120px, 17vw, 200px)',
                    color: tagColor, opacity: 0.045,
                    lineHeight: 1, letterSpacing: '-0.05em',
                    userSelect: 'none', pointerEvents: 'none',
                  }}>{section.num}</div>

                  <div className="relative h-full flex flex-col">
                    {/* Tag row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="font-mono font-bold flex-shrink-0"
                        style={{
                          fontSize: 11, color: tagColor,
                          background: tagColor + '14', border: `1px solid ${tagColor}28`,
                          borderRadius: 6, padding: '4px 10px',
                        }}>
                        {section.num}
                      </div>
                      <div style={{ width: 24, height: 1, background: tagColor + '50' }} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: tagColor + 'cc' }}>
                        {section.tag}
                      </span>
                    </div>

                    {/* Heading */}
                    <h3 className="font-syne font-bold"
                      style={{
                        fontSize: 'clamp(17px, 2.2vw, 26px)',
                        color: '#EEF2EC',
                        lineHeight: 1.22,
                        maxWidth: 680,
                        marginBottom: 'clamp(14px, 2vh, 20px)',
                        letterSpacing: '-0.01em',
                      }}>
                      {section.heading}
                    </h3>

                    {/* Body */}
                    <p className="font-dm leading-[1.85]"
                      style={{ fontSize: 14, color: '#5a605a', maxWidth: 660 }}>
                      {section.body}
                    </p>

                    {/* Progress dots */}
                    <div className="flex items-center gap-2 mt-auto pt-5">
                      {sections.map((_, j) => (
                        <div key={j} style={{
                          width: j === i ? 22 : 5,
                          height: 3,
                          borderRadius: 99,
                          background: j === i ? tagColor : tagColor + '28',
                        }} />
                      ))}
                      <span className="font-mono text-[10px] ml-2" style={{ color: tagColor + '66' }}>
                        {i + 1} / {sections.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AGENTS SECTION (only for Horizontal AI Agents) ───────────────── */}
      {agents && (
        <section
          className="py-14 lg:py-20 px-6 lg:px-[80px]"
          style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }}
          aria-labelledby="agents-heading"
        >
          <div className="max-w-[1100px] mx-auto">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor }} className="animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                  What's included
                </span>
              </div>
              <h2
                id="agents-heading"
                className="font-syne font-bold"
                style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#F4F7F1', lineHeight: 1.1 }}
              >
                Six coordinated agents. One unified system.
              </h2>
              <p className="font-dm text-[14px] mt-3 leading-[1.75]" style={{ color: '#666', maxWidth: 600 }}>
                The agents do not run in isolation. They share a unified context window, so every department has full awareness of what every other department knows.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent, i) => (
                <AgentCard
                  key={agent.num}
                  agent={agent}
                  accentColor={accentColor}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DIFFERENTIATORS (only for Horizontal AI Agents) ──────────────── */}
      {differentiators && (
        <section
          className="py-14 lg:py-20 px-6 lg:px-[80px]"
          style={{ background: INK, borderTop: '1px solid rgba(255,255,255,0.05)' }}
          aria-labelledby="diff-heading"
        >
          <div className="max-w-[900px] mx-auto">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor }} className="animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                  The difference
                </span>
              </div>
              <h2
                id="diff-heading"
                className="font-syne font-bold"
                style={{ fontSize: 'clamp(20px, 2.8vw, 30px)', color: '#F4F7F1', lineHeight: 1.1 }}
              >
                We don't build lead gen campaigns. We build infrastructure.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((d, i) => (
                <motion.div
                  key={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.15}
                  style={{
                    background: INK_2, border: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: `3px solid ${accentColor}`,
                    borderRadius: '0 10px 10px 0',
                    padding: '20px 18px',
                  }}
                >
                  <h3 className="font-syne font-semibold mb-2" style={{ fontSize: 15, color: '#E0E4DE' }}>
                    {d.label}
                  </h3>
                  <p className="font-dm text-[13px] leading-[1.65]" style={{ color: '#666' }}>
                    {d.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
      <section
        className="py-12 lg:py-16 px-6 lg:px-[80px]"
        style={{ background: INK_2, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        aria-labelledby="related-heading"
      >
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: '#555' }}>
                More products
              </p>
              <h2 id="related-heading" className="font-syne font-semibold" style={{ fontSize: 18, color: '#C0C7BC' }}>
                Explore what else we've built.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {related.map((p) => (
                <RelatedPill key={p.slug} product={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20 px-6 lg:px-[80px] relative overflow-hidden"
        style={{ background: INK, borderTop: '1px solid rgba(255,255,255,0.05)' }}
        aria-label="Deploy call to action"
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 700, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${FOREST}44 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div className="relative max-w-[720px] mx-auto text-center">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="inline-flex items-center gap-2 mb-8"
            style={{ background: 'rgba(212,245,101,0.06)', border: '1px solid rgba(212,245,101,0.22)', borderRadius: 999, padding: '6px 16px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: LIME, boxShadow: `0 0 10px ${LIME}` }} className="animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: LIME }}>
              Deploy in 14 days
            </span>
          </motion.div>

          <motion.h2
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="font-syne font-extrabold mb-5"
            style={{ fontSize: 'clamp(24px, 4vw, 44px)', color: '#F4F7F1', lineHeight: 1.1 }}
          >
            Ready to deploy{' '}
            <span style={{ color: LIME_DEEP, fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700 }}>
              {name}
            </span>
            ?
          </motion.h2>

          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="font-dm text-[14px] leading-[1.75] mb-10"
            style={{ color: '#777' }}
          >
            Book a free 30-minute discovery call. We'll confirm the scope, provide a fixed-price proposal within 48 hours, and have you live in under 14 days.
          </motion.p>

          <motion.div
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a
              href="https://cal.com/soham-hanse-yeivxo/30min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm font-medium inline-flex items-center gap-2"
              style={{
                background: FOREST, border: `1px solid ${FOREST}`, color: '#EAF9F1',
                padding: '14px 28px', borderRadius: 999, fontSize: 14,
                transition: 'background 220ms ease, box-shadow 220ms ease',
                textDecoration: 'none',
              }}
              onMouseOver={e => { e.currentTarget.style.background = FOREST_DEEP; e.currentTarget.style.boxShadow = `0 12px 32px ${FOREST}60`; }}
              onMouseOut={e => { e.currentTarget.style.background = FOREST; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Book a Call <ArrowRight size={16} strokeWidth={2} />
            </a>
            <Link
              to={digitalPath('/products')}
              className="font-dm font-medium inline-flex items-center gap-2"
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.14)',
                color: '#A8B0A8', padding: '14px 22px', borderRadius: 999, fontSize: 14,
                transition: 'border-color 200ms ease, color 200ms ease',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = `${LIME}40`; e.currentTarget.style.color = LIME; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#A8B0A8'; }}
            >
              ← All AI Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalProductPage;
