import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { digitalPath, IS_DIGITAL_SITE } from '../utils/seo';

const INK = '#050805';
const LIME = '#D4F565';
const FOREST = '#184D3A';
const FOREST_DEEP = '#0F3A2B';

const EASE = [0.23, 1, 0.32, 1];

const DigitalNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: digitalPath('/') },
    { label: 'Products', to: digitalPath('/products') },
    { label: 'Contact Us', to: digitalPath('/apply') },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 50,
        background: scrolled ? 'rgba(5,8,5,0.92)' : INK,
        borderBottom: scrolled ? '1px solid rgba(212,245,101,0.12)' : '1px solid rgba(255,255,255,0.05)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 32px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to={digitalPath('/')}
          style={{ textDecoration: 'none' }}
        >
          <span
            className="font-syne font-extrabold tracking-tight"
            style={{ fontSize: 20, color: '#F4F7F1', letterSpacing: '-0.02em' }}
          >
            MEEHAAN
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === digitalPath('/')}
              style={({ isActive }) => ({
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? LIME : 'rgba(255,255,255,0.55)',
                padding: '8px 16px',
                borderRadius: 999,
                textDecoration: 'none',
                transition: 'color 180ms ease, background 180ms ease',
                background: isActive ? `${LIME}10` : 'transparent',
              })}
              onMouseOver={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
              onMouseOut={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
            >
              {link.label}
            </NavLink>
          ))}

          <a
            href="https://cal.com/soham-hanse-yeivxo/30min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: 12,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              color: INK,
              background: LIME,
              padding: '9px 20px',
              borderRadius: 999,
              textDecoration: 'none',
              transition: 'opacity 180ms ease, transform 180ms ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseOver={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
          >
            Book a Call
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.svg key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              background: INK,
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 28px',
              borderTop: `1px solid rgba(212,245,101,0.12)`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06, ease: EASE }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.85)',
                      textDecoration: 'none',
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.18, ease: EASE }}
              style={{ marginTop: 40 }}
            >
              <a
                href="https://cal.com/soham-hanse-yeivxo/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: LIME,
                  color: INK,
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: '16px 28px',
                  borderRadius: 999,
                  textDecoration: 'none',
                }}
              >
                Book a Free Call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.div>

            {/* Bottom label */}
            <div style={{ marginTop: 'auto', paddingTop: 32 }}>
              <p
                className="font-mono text-[12px] uppercase tracking-[0.18em]"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                MEEHAAN
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DigitalNavbar;
