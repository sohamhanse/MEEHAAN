import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../../components/SEOHead';
import { Check, ArrowRight, Loader } from 'lucide-react';

const INK    = '#050805';
const INK_2  = '#0a100c';
const LIME   = '#D4F565';
const LIME_DEEP = '#C6E84F';
const FOREST = '#184D3A';
const FOREST_DEEP = '#0F3A2B';

const EASE = [0.23, 1, 0.32, 1];

const SUBMIT_URL = '/api/apply';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE },
  }),
};

const inputBase = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '14px 18px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 14,
  color: '#E8ECE6',
  outline: 'none',
  transition: 'border-color 200ms ease, background 200ms ease, box-shadow 200ms ease',
};

const inputFocus = {
  borderColor: `${LIME}60`,
  background: 'rgba(212,245,101,0.04)',
  boxShadow: `0 0 0 3px ${LIME}14`,
};

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        htmlFor={name}
        style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: focused ? LIME : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', transition: 'color 200ms ease' }}
      >
        {label}{required && <span style={{ color: LIME, marginLeft: 4 }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputBase, ...(focused ? inputFocus : {}), caretColor: LIME }}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
      />
    </div>
  );
};

const TextareaField = ({ label, name, value, onChange, placeholder, required, rows = 4 }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label
        htmlFor={name}
        style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: focused ? LIME : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', transition: 'color 200ms ease' }}
      >
        {label}{required && <span style={{ color: LIME, marginLeft: 4 }}>*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputBase, resize: 'vertical', minHeight: rows * 24, ...(focused ? inputFocus : {}), caretColor: LIME }}
      />
    </div>
  );
};

const RadioGroup = ({ label, name, value, onChange, options, required }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
      {label}{required && <span style={{ color: LIME, marginLeft: 4 }}>*</span>}
    </span>
    <div style={{ display: 'flex', gap: 12 }}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 999,
              border: `1px solid ${selected ? LIME + '60' : 'rgba(255,255,255,0.1)'}`,
              background: selected ? `${LIME}10` : 'rgba(255,255,255,0.03)',
              cursor: 'pointer',
              transition: 'border-color 200ms ease, background 200ms ease',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={onChange}
              required={required}
              style={{ display: 'none' }}
            />
            <span style={{
              width: 16, height: 16, borderRadius: '50%',
              border: `2px solid ${selected ? LIME : 'rgba(255,255,255,0.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 200ms ease',
              flexShrink: 0,
            }}>
              {selected && <span style={{ width: 7, height: 7, borderRadius: '50%', background: LIME }} />}
            </span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: selected ? LIME : 'rgba(255,255,255,0.6)', transition: 'color 200ms ease' }}>
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  </div>
);

const SuccessScreen = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: EASE }}
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '80px 32px', gap: 24,
    }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: 72, height: 72, borderRadius: '50%',
        background: `${LIME}18`, border: `2px solid ${LIME}50`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Check size={30} color={LIME} strokeWidth={2.5} />
    </motion.div>
    <div>
      <h3 className="font-syne font-bold" style={{ fontSize: 26, color: '#F4F7F1', marginBottom: 12 }}>
        Application received.
      </h3>
      <p className="font-dm" style={{ fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 420 }}>
        We review every application personally. Expect a response within 2 business days.
      </p>
    </div>
    <div style={{ marginTop: 8, padding: '12px 24px', borderRadius: 999, background: `${LIME}10`, border: `1px solid ${LIME}25` }}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: LIME }}>
        Next — check your email
      </p>
    </div>
  </motion.div>
);

const ApplyPage = () => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    industry: '',
    workStyle: '',
    motivation: '',
    readyToBegin: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          industry: form.industry,
          workStyle: form.workStyle,
          motivation: form.motivation,
          readyToBegin: form.readyToBegin,
        }),
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: INK, minHeight: '100vh', paddingTop: 64 }}>
      <SEOHead
        title="Apply — MEEHAAN Digital Partner Program"
        description="Apply to the MEEHAAN Digital partner program. Tell us about yourself and we'll be in touch within 2 business days."
        canonical="/solutions/digital/apply"
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section
        ref={headerRef}
        style={{ background: INK_2, borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '72px 32px 64px' }}
      >
        {/* Ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 64, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${FOREST}44 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p
            variants={reveal} initial="hidden" animate={headerInView ? 'visible' : 'hidden'}
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: LIME, marginBottom: 20 }}
          >
            Partner Program
          </motion.p>

          <motion.h1
            variants={reveal} initial="hidden" animate={headerInView ? 'visible' : 'hidden'} custom={1}
            className="font-syne font-extrabold"
            style={{ fontSize: 'clamp(32px, 5vw, 58px)', color: '#F4F7F1', lineHeight: 1.06, letterSpacing: '-0.02em', marginBottom: 20 }}
          >
            Let's build something
            <br />
            <span style={{ color: LIME }}>together.</span>
          </motion.h1>

          <motion.p
            variants={reveal} initial="hidden" animate={headerInView ? 'visible' : 'hidden'} custom={2}
            className="font-dm"
            style={{ fontSize: 16, color: '#777', lineHeight: 1.7, maxWidth: 540 }}
          >
            Fill out the form below and we'll review your application personally. Every submission gets a real response.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            variants={reveal} initial="hidden" animate={headerInView ? 'visible' : 'hidden'} custom={3}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32 }}
          >
            {['Response within 48h', 'No spam, ever', 'Reviewed personally'].map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-[0.14em]"
                style={{ background: `${LIME}10`, border: `1px solid ${LIME}22`, color: LIME, padding: '6px 14px', borderRadius: 999 }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 32px 96px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <SuccessScreen key="success" />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
                noValidate
              >
                {/* Row 1: Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  <InputField
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                  />
                </div>

                {/* Row 2: Phone */}
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                />

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Row 3: Industry */}
                <InputField
                  label="What industry do you work in?"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Fintech, Logistics, Professional Services, SaaS…"
                  required
                />

                {/* Row 4: Work style */}
                <TextareaField
                  label="How do you currently work with businesses?"
                  name="workStyle"
                  value={form.workStyle}
                  onChange={handleChange}
                  placeholder="e.g. I run a consulting firm, I advise early-stage startups, I manage a sales team…"
                  required
                  rows={3}
                />

                {/* Row 5: Motivation */}
                <TextareaField
                  label="What draws you to this program?"
                  name="motivation"
                  value={form.motivation}
                  onChange={handleChange}
                  placeholder="Describe the problem you're trying to solve or the opportunity you see…"
                  required
                  rows={5}
                />

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Row 6: Ready to begin */}
                <RadioGroup
                  label="Are you ready to begin within the next 30 days?"
                  name="readyToBegin"
                  value={form.readyToBegin}
                  onChange={handleChange}
                  options={[
                    { label: 'Yes', value: 'Yes' },
                    { label: 'No', value: 'No' },
                  ]}
                  required
                />

                {/* Error */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="font-dm text-[13px]"
                      style={{ color: '#f87171', padding: '12px 16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8 }}
                    >
                      Something went wrong. Please try again or email us directly.
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div style={{ paddingTop: 8 }}>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      background: status === 'submitting' ? FOREST_DEEP : FOREST,
                      border: `1px solid ${FOREST}`,
                      color: '#EAF9F1',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      padding: '16px 32px',
                      borderRadius: 999,
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      opacity: status === 'submitting' ? 0.8 : 1,
                      transition: 'background 220ms ease, transform 220ms ease, box-shadow 220ms ease',
                    }}
                    onMouseOver={e => { if (status !== 'submitting') { e.currentTarget.style.background = FOREST_DEEP; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${FOREST}60`; }}}
                    onMouseOut={e => { e.currentTarget.style.background = FOREST; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader size={16} strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }} />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={16} strokeWidth={2} />
                      </>
                    )}
                  </button>

                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] mt-4" style={{ color: 'rgba(255,255,255,0.22)' }}>
                    We review every application personally · No spam
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ApplyPage;
