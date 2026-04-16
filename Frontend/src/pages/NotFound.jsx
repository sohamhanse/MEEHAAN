import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const NotFound = () => {
  return (
    <div
      style={{
        background: '#0d0d0d',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Orange glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: '#F5921E',
          filter: 'blur(180px)',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />

      {/* Teal glow orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: '#00B8A0',
          filter: 'blur(140px)',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      {/* Grid texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(245,146,30,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,146,30,0.03) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Mono brand label */}
        <motion.p
          {...fadeUp(0)}
          className="font-mono"
          style={{
            color: '#F5921E',
            letterSpacing: '0.2em',
            fontSize: 11,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          MEEHAAN
        </motion.p>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-syne"
            style={{
              fontWeight: 800,
              color: '#F5921E',
              fontSize: 'clamp(80px, 15vw, 140px)',
              lineHeight: 1,
              display: 'block',
              marginBottom: 12,
            }}
          >
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-syne"
          style={{
            fontWeight: 700,
            color: '#EAEAEA',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Page not found.
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.25)}
          className="font-dm"
          style={{
            color: '#777',
            fontSize: 15,
            maxWidth: 400,
            margin: '0 auto 32px',
            lineHeight: 1.75,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Back to Home button */}
        <motion.div {...fadeUp(0.35)}>
          <Link
            to="/"
            className="font-dm"
            style={{
              background: '#F5921E',
              color: '#1A1A1A',
              fontWeight: 500,
              padding: '12px 28px',
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'transform 180ms ease, box-shadow 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,146,30,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Contact link */}
        <motion.div {...fadeUp(0.45)} style={{ marginTop: 20 }}>
          <Link
            to="/contact"
            className="font-dm"
            style={{
              fontSize: 13,
              color: '#555',
              textDecoration: 'none',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F5921E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#555';
            }}
          >
            Need help? Contact us →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
