import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const ComingSoon = () => {
  return (
    <div
      style={{
        background: '#0d0d0d',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 64,
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
        {/* Animated logo */}
        <motion.img
          src="/meehaan_logo/MEEHAAN Logo Without Bg-01.png"
          alt="MEEHAAN"
          style={{
            height: 44,
            filter: 'brightness(0) invert(1)',
            opacity: 0.8,
            display: 'block',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Divider */}
        <div
          style={{
            width: 32,
            height: 1,
            background: '#333',
            margin: '20px auto',
          }}
        />

        {/* Mono label */}
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono"
          style={{
            color: '#F5921E',
            letterSpacing: '0.25em',
            fontSize: 11,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          COMING SOON
        </motion.p>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-syne"
          style={{
            fontWeight: 800,
            color: '#EAEAEA',
            fontSize: 'clamp(28px, 5vw, 52px)',
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Under Construction.
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.3)}
          className="font-dm"
          style={{
            color: '#777',
            fontSize: 15,
            maxWidth: 420,
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          This section is being prepared. We're building something worth the wait.
        </motion.p>

        {/* Animated 3-dot pulse loader */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 32,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#F5921E',
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Back to Home ghost button */}
        <motion.div {...fadeUp(0.4)} style={{ marginTop: 32 }}>
          <Link
            to="/"
            className="font-dm"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#888',
              padding: '11px 26px',
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              fontSize: 14,
              transition: 'color 180ms ease, border-color 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00B8A0';
              e.currentTarget.style.borderColor = '#00B8A0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#888';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
