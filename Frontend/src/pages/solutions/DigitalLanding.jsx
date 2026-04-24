import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import {
  Phone, FileText, Wrench, Zap, Check, X, Star, ChevronDown,
  Database, TrendingUp, MessageSquare, Users, Target, Settings, Brain,
  Globe, AtSign, ShieldCheck, Rocket, BarChart3, Mail,
} from 'lucide-react';

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

const TEAL = '#00B8A0';
const ORANGE = '#F5921E';

// ─── Shared atoms ─────────────────────────────────────────────────────────────
const Tag = ({ children, color = TEAL }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color }}>{children}</span>
);

const SectionLabel = ({ children, color = TEAL }) => (
  <div className="flex items-center gap-3 mb-3">
    <div style={{ width: 24, height: 1, background: color }} />
    <Tag color={color}>{children}</Tag>
  </div>
);

const PrimaryBtn = ({ to, children, onClick }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className="font-dm font-medium text-[13px] inline-flex items-center gap-2 cursor-pointer"
    style={{ background: TEAL, color: '#0A0A0A', padding: '12px 26px', borderRadius: 4, transition: 'transform 160ms ease, box-shadow 200ms ease' }}
    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,184,160,0.35)`; }}
    onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    {children}
  </Link>
);

const GhostBtn = ({ to, children, onClick }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className="font-dm font-medium text-[13px] inline-block cursor-pointer"
    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: '#888', padding: '11px 22px', borderRadius: 4, transition: 'border-color 200ms ease, color 200ms ease' }}
    onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#ccc'; }}
    onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#888'; }}
  >
    {children}
  </Link>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const glowY1 = useTransform(scrollY, [0, 500], [0, -80]);
  const glowY2 = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0d0d0d', minHeight: '86vh', display: 'flex', alignItems: 'center' }}
      aria-label="Hero"
    >
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(0,184,160,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,160,0.05) 1px, transparent 1px)`,
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
      }} />
      <motion.div aria-hidden="true" style={{ position: 'absolute', top: -80, left: -120, width: 500, height: 500, borderRadius: '50%', background: TEAL, filter: 'blur(160px)', opacity: 0.1, pointerEvents: 'none', y: glowY1 }} />
      <motion.div aria-hidden="true" style={{ position: 'absolute', bottom: -60, right: -80, width: 380, height: 380, borderRadius: '50%', background: ORANGE, filter: 'blur(140px)', opacity: 0.08, pointerEvents: 'none', y: glowY2 }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[80px] py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              className="inline-flex items-center gap-2 mb-6"
              style={{ background: 'rgba(0,184,160,0.08)', border: '1px solid rgba(0,184,160,0.2)', borderRadius: 100, padding: '5px 14px' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL, display: 'inline-block' }} className="animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: TEAL }}>MEEHAAN · The AI Automation Agency</span>
            </motion.div>

            <motion.h1 variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              className="font-syne font-extrabold leading-[1.04] mb-5 tracking-tight"
              style={{ fontSize: 'clamp(34px, 5.2vw, 62px)', color: '#EAEAEA' }}
            >
              Done-for-you AI.<br />
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: ORANGE }}>
                Plan. Build. Deploy.
              </span>{' '}
              <span style={{ color: TEAL }}>In just 90 days.</span>
            </motion.h1>

            <motion.p variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              className="font-dm text-[15px] leading-[1.75] mb-8"
              style={{ color: '#A0A0A0', maxWidth: 520 }}
            >
              We tell you exactly what to automate, which systems to use, and why they work — then we build and deploy everything for you. Proposals in 48 hours.
            </motion.p>

            <motion.div variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4} className="flex flex-wrap gap-3 mb-8">
              <PrimaryBtn to="/contact?type=demo">Book a Free Call →</PrimaryBtn>
              <GhostBtn to="#systems" onClick={(e) => { e.preventDefault(); document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' }); }}>
                See AI Systems ↓
              </GhostBtn>
            </motion.div>

            <motion.div variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={5}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider"
              style={{ color: '#666' }}
            >
              <ShieldCheck size={14} color={TEAL} />
              <span>30-day money-back guarantee · No lock-in contracts</span>
            </motion.div>
          </div>

          {/* RIGHT — dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div style={{
              background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12,
              overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}>
              <div style={{ background: '#0f0f0f', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
                <span className="font-mono text-[10px] ml-3" style={{ color: '#555' }}>meehaan.ai/dashboard</span>
              </div>
              <div style={{ padding: '20px 18px' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: '#666' }}>Live Automation</p>
                    <p className="font-syne font-bold text-[18px]" style={{ color: '#EAEAEA' }}>Lead Pipeline</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,184,160,0.12)', border: `1px solid ${TEAL}30` }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL }} className="animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: TEAL }}>Running</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{ l: 'Captured', v: '1,284', c: TEAL }, { l: 'Qualified', v: '612', c: ORANGE }, { l: 'Closed', v: '₹12.4L', c: TEAL }].map((k, i) => (
                    <div key={i} style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6, padding: '10px 12px' }}>
                      <p className="font-mono text-[9px] uppercase" style={{ color: '#555' }}>{k.l}</p>
                      <p className="font-syne font-bold text-[15px] mt-1" style={{ color: k.c }}>{k.v}</p>
                    </div>
                  ))}
                </div>
                {[
                  { t: 'WhatsApp → CRM sync', s: '1.2s', c: TEAL },
                  { t: 'Invoice auto-parser', s: '842ms', c: ORANGE },
                  { t: 'Compliance reminder', s: '320ms', c: TEAL },
                  { t: 'Lead qualifier (GPT-4)', s: '2.1s', c: ORANGE },
                ].map((r, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <div className="flex items-center gap-2">
                      <Check size={12} color={r.c} />
                      <span className="font-dm text-[12px]" style={{ color: '#C0C0C0' }}>{r.t}</span>
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: r.c }}>{r.s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Main Features ────────────────────────────────────────────────────────────
const MainFeatures = () => (
  <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="max-w-[1200px] mx-auto">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
        <SectionLabel>The Agency</SectionLabel>
        <h2 className="font-syne font-bold max-w-[720px]" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
          An AI automation partner — not a <span style={{ color: TEAL }}>tool reseller</span>.
        </h2>
        <p className="font-dm text-[14px] mt-4 leading-[1.75] max-w-[620px]" style={{ color: '#888' }}>
          We diagnose where your team bleeds hours, design systems that handle that work end-to-end, and deploy them with training and support. You get outcomes — not another subscription to manage.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Brain, color: TEAL, t: 'We pick the systems', d: 'Every tool choice is justified — why this CRM, why this LLM, why this integration. No vendor kickbacks.' },
          { icon: Wrench, color: ORANGE, t: 'We build the pipes', d: 'Custom integrations between your CRM, WhatsApp, accounting, ERP, spreadsheets — reliable, monitored, maintained.' },
          { icon: Rocket, color: TEAL, t: 'We deploy and train', d: 'Your team is onboarded on day one. Documentation, dashboards, and a direct line to our engineers — included.' },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.article key={i}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              style={{
                background: '#141414', border: '1px solid rgba(255,255,255,0.07)',
                borderTop: `2px solid ${f.color}`, borderRadius: 8, padding: '28px 24px',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 8, background: f.color + '14', border: `1px solid ${f.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={f.color} strokeWidth={1.8} />
              </div>
              <h3 className="font-syne font-semibold mt-5" style={{ fontSize: 17, color: '#DCDCDC' }}>{f.t}</h3>
              <p className="font-dm text-[13px] mt-2 leading-[1.65]" style={{ color: '#777' }}>{f.d}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Results stat ─────────────────────────────────────────────────────────────
const Results = () => (
  <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel color={ORANGE}>Results</SectionLabel>
          <h2 className="font-syne font-bold" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            We know the systems that <span style={{ color: ORANGE }}>actually get results</span>.
          </h2>
          <p className="font-dm text-[14px] mt-4 leading-[1.75] max-w-[500px]" style={{ color: '#888' }}>
            Across CA firms, distributors, manufacturers, and B2B SaaS clients — we've deployed automations that recovered thousands of admin hours and moved real revenue.
          </p>
        </motion.div>
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-3">
          {[
            { v: '₹45Cr+', l: 'Combined client revenue influenced', c: TEAL },
            { v: '120K+', l: 'Admin hours saved annually', c: ORANGE },
            { v: '48hrs', l: 'From call to proposal', c: TEAL },
            { v: '90 days', l: 'Average plan-to-deploy', c: ORANGE },
          ].map((m, i) => (
            <div key={i} style={{ background: '#141414', border: `1px solid ${m.c}20`, borderRadius: 8, padding: '22px 20px' }}>
              <div className="font-syne font-bold" style={{ fontSize: 28, color: m.c }}>{m.v}</div>
              <div className="font-dm text-[12px] mt-2" style={{ color: '#888' }}>{m.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── AI Trap ──────────────────────────────────────────────────────────────────
const AITrap = () => (
  <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="max-w-[1100px] mx-auto">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
        <SectionLabel>The AI Trap</SectionLabel>
        <h2 className="font-syne font-bold inline-block" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
          Don't fall into the <span style={{ color: '#ef4444' }}>AI trap</span>.
        </h2>
        <p className="font-dm text-[14px] mt-4 leading-[1.75] max-w-[620px] mx-auto" style={{ color: '#888' }}>
          Most "AI" projects die in month three — the team bought a dozen tools, wired none of them together, and nobody owns the output.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { bad: 'ChatGPT subscription for everyone, no workflow plan', good: 'Purpose-built AI agents wired into your actual tools' },
          { bad: 'Pilots that never move past a Google Sheet demo', good: 'Production systems with monitoring, SLAs, and owners' },
          { bad: 'Three tools that half-integrate via copy-paste', good: 'One unified pipeline — CRM, WhatsApp, billing, compliance' },
          { bad: 'Team fights the tool instead of using it', good: 'Day-one training, docs, and a direct line to our engineers' },
        ].map((r, i) => (
          <motion.div key={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <X size={10} color="#ef4444" strokeWidth={3} />
              </div>
              <span className="font-dm text-[12px] leading-[1.6]" style={{ color: '#888' }}>{r.bad}</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(0,184,160,0.05)', border: `1px solid ${TEAL}25` }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,184,160,0.15)', border: `1px solid ${TEAL}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <Check size={10} color={TEAL} strokeWidth={3} />
              </div>
              <span className="font-dm text-[12px] leading-[1.6]" style={{ color: '#C0C0C0' }}>{r.good}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Hands-off systems ────────────────────────────────────────────────────────
const HandsOff = () => (
  <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionLabel>Hands-off Systems</SectionLabel>
          <h2 className="font-syne font-bold" style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            We build <span style={{ color: TEAL }}>hands-off</span> AI systems for you.
          </h2>
          <p className="font-dm text-[14px] mt-4 leading-[1.75] max-w-[500px]" style={{ color: '#888' }}>
            Once deployed, your team doesn't have to babysit the automation. It runs. It logs. It alerts the right person when something needs a human. That's the whole point.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Monitored pipelines with Slack/WhatsApp alerts',
              'Human-in-the-loop for anything ambiguous',
              'Weekly performance reports for the first 90 days',
              'Ongoing retainer available after launch',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div style={{ width: 5, height: 5, background: TEAL, borderRadius: 1 }} />
                <span className="font-dm text-[13px]" style={{ color: '#C0C0C0' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '24px 22px' }}>
            <p className="font-mono text-[10px] uppercase tracking-wider mb-5" style={{ color: '#555' }}>90-day timeline</p>
            {[
              { day: 'W·1', color: ORANGE, title: 'Discovery & scope', desc: 'We map every workflow, identify the 3 highest-ROI automations.', last: false },
              { day: 'W·2', color: TEAL, title: 'Proposal signed', desc: 'Fixed scope, fixed timeline, transparent pricing. 48hr turnaround.', last: false },
              { day: 'W·5', color: TEAL, title: 'First system live', desc: 'Weekly demos. Your feedback shapes every sprint.', last: false },
              { day: 'W·10', color: ORANGE, title: 'Full pipeline deployed', desc: 'Training complete. Monitoring in place. Your team is onboarded.', last: false },
              { day: '✓', color: '#22c55e', title: 'Hands-off operation', desc: 'Runs on its own. We stay on retainer if you want ongoing support.', last: true },
            ].map((step, i) => (
              <motion.div key={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5} className="flex gap-4">
                <div className="flex flex-col items-center" style={{ minWidth: 44 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: step.color + '18', border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 12px ${step.color}30` }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontWeight: 700, fontSize: 9, color: step.color }}>{step.day}</span>
                  </div>
                  {!step.last && <div style={{ width: 1, flex: 1, minHeight: 28, marginTop: 4, background: `linear-gradient(${step.color}40, transparent)` }} />}
                </div>
                <div className="pb-6">
                  <div className="font-syne font-semibold text-[14px]" style={{ color: '#E0E0E0' }}>{step.title}</div>
                  <div className="font-dm text-[12px] mt-1 leading-[1.65]" style={{ color: '#777' }}>{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Partner logos ────────────────────────────────────────────────────────────
const Partners = () => {
  const partners = ['HubSpot', 'Salesforce', 'Zapier', 'Zoho', 'OpenAI', 'Make', 'n8n', 'WhatsApp', 'Anthropic', 'Pipedrive', 'Notion', 'Slack'];
  return (
    <section className="py-12 lg:py-16 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-mono text-[10px] uppercase tracking-widest text-center mb-8" style={{ color: '#555' }}
        >
          Leading AI & automation platforms we build with
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4">
          {partners.map((p, i) => (
            <motion.div key={i}
              variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 6}
              className="flex items-center justify-center py-4 px-3 rounded-md"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 200ms ease' }}
              whileHover={{ borderColor: 'rgba(0,184,160,0.3)' }}
            >
              <span className="font-syne font-semibold text-[14px]" style={{ color: '#888' }}>{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Top AI Systems ───────────────────────────────────────────────────────────
const TopSystems = () => {
  const systems = [
    { icon: Database, color: TEAL, t: 'CRM & Sales Automation', d: 'WhatsApp-native CRMs, lead scoring agents, follow-up sequences that never miss.', tags: ['Zoho', 'HubSpot', 'Custom'] },
    { icon: BarChart3, color: ORANGE, t: 'Financial Automation', d: 'Invoice parsing, reconciliation, compliance reminders, GST/ITR workflows.', tags: ['CaFlow', 'Zoho Books', 'Tally'] },
    { icon: Settings, color: TEAL, t: 'Workflow Automation', d: 'End-to-end pipelines across your existing stack — no copy-paste, no manual handoffs.', tags: ['Make', 'n8n', 'Zapier'] },
    { icon: TrendingUp, color: ORANGE, t: 'Marketing Automation', d: 'Lead nurturing, segmentation, content distribution, and attribution tracking.', tags: ['Email', 'WhatsApp', 'SEO'] },
    { icon: MessageSquare, color: TEAL, t: 'AI Chatbots & Agents', d: 'GPT-4 / Claude agents with your data and tools — customer support, sales, internal ops.', tags: ['GPT-4', 'Claude', 'RAG'] },
    { icon: Users, color: ORANGE, t: 'HR & Ops Automation', d: 'Onboarding, payroll prep, leave management, and performance tracking — automated.', tags: ['Payroll', 'Docs', 'HRIS'] },
    { icon: Target, color: TEAL, t: 'Business Process Intelligence', d: 'Custom dashboards that pull from every system — live ops visibility, not monthly reports.', tags: ['Dashboards', 'BI', 'Alerts'] },
  ];
  return (
    <section id="systems" className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <SectionLabel>Top AI Systems</SectionLabel>
          <h2 className="font-syne font-bold max-w-[720px]" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            Seven systems that <span style={{ color: TEAL }}>quietly run</span> your business.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article key={i}
                variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: '#141414', border: '1px solid rgba(255,255,255,0.07)',
                  borderTop: `2px solid ${s.color}`, borderRadius: 8, padding: '28px 24px',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 8, background: s.color + '14', border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={s.color} strokeWidth={1.8} />
                </div>
                <h3 className="font-syne font-semibold mt-5" style={{ fontSize: 16, color: '#DCDCDC' }}>{s.t}</h3>
                <p className="font-dm text-[13px] mt-2 leading-[1.65]" style={{ color: '#777' }}>{s.d}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {s.tags.map((tag, j) => (
                    <span key={j} className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded" style={{ background: s.color + '10', color: s.color, border: `1px solid ${s.color}20` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── 100+ Use Cases ───────────────────────────────────────────────────────────
const UseCases = () => {
  const cases = [
    'WhatsApp lead bot', 'Invoice auto-parser', 'GST reminder engine', 'Dealer portal', 'Field sales CRM',
    'Quote generator', 'AI customer support', 'Email triage agent', 'Compliance tracker', 'Meeting notes → CRM',
    'Inventory sync', 'Shipping dashboard', 'Payment follow-ups', 'Support ticket router', 'Onboarding flows',
    'Document extraction', 'Lead scoring', 'Sales forecasting', 'Churn alerts', 'Review monitor',
    'Social content agent', 'SEO content engine', 'Product catalog sync', 'Order confirmation bot', 'Refund automation',
    'Payroll prep', 'Leave management', 'Feedback analyzer', 'Call transcription', 'Demo scheduler',
  ];
  return (
    <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
          <SectionLabel color={ORANGE}>Use Cases</SectionLabel>
          <h2 className="font-syne font-bold inline-block" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            100+ ways to use AI <span style={{ color: ORANGE }}>in your business</span>.
          </h2>
          <p className="font-dm text-[14px] mt-4 leading-[1.75] max-w-[560px] mx-auto" style={{ color: '#888' }}>
            A sampling of what we've deployed. If it's a repetitive workflow, there's a system for it.
          </p>
        </motion.div>
        <div className="flex flex-wrap gap-2 justify-center">
          {cases.map((c, i) => (
            <motion.span key={i}
              variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={(i % 8) * 0.3}
              className="font-dm text-[12px] px-3.5 py-2 rounded-full"
              style={{
                background: i % 3 === 0 ? `${TEAL}10` : i % 3 === 1 ? `${ORANGE}10` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${i % 3 === 0 ? TEAL + '25' : i % 3 === 1 ? ORANGE + '25' : 'rgba(255,255,255,0.08)'}`,
                color: i % 3 === 0 ? TEAL : i % 3 === 1 ? ORANGE : '#999',
              }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <div className="text-center mt-10">
          <PrimaryBtn to="/contact?type=demo">Talk to us about yours →</PrimaryBtn>
        </div>
      </div>
    </section>
  );
};

// ─── Pricing ──────────────────────────────────────────────────────────────────
const Pricing = () => {
  const tiers = [
    {
      name: '90-Day Fast-Track',
      price: '₹6,50,000',
      sub: 'One-time · Full deployment',
      desc: 'End-to-end build of your first AI automation pipeline — scoped, built, and deployed in 90 days.',
      features: [
        'Up to 3 integrated systems',
        'Custom AI agents & workflows',
        'Team training + documentation',
        '30-day post-launch support',
        'Source code ownership',
      ],
      color: TEAL, featured: false,
    },
    {
      name: 'Retainer',
      price: '₹1,25,000',
      sub: 'Per month · Ongoing partnership',
      desc: 'For teams that want a dedicated AI automation partner — continuous builds, iteration, and support.',
      features: [
        'Dedicated automation engineer',
        '40 engineering hours / month',
        'Unlimited system monitoring',
        'Weekly optimization reviews',
        'Priority response (4hr SLA)',
        'New automations every sprint',
      ],
      color: ORANGE, featured: true,
    },
    {
      name: 'Support & Maintenance',
      price: '₹35,000',
      sub: 'Per month · Post-launch care',
      desc: 'For clients with live systems who just want them kept humming — monitoring, fixes, and minor tweaks.',
      features: [
        '24/7 uptime monitoring',
        'Bug fixes & patches',
        '10 support hours / month',
        'Quarterly health reviews',
        'Priority bug response',
      ],
      color: TEAL, featured: false,
    },
  ];
  return (
    <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-syne font-bold inline-block" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            Simple, flexible pricing. Short-term or long-term.
          </h2>
          <p className="font-dm text-[14px] mt-4 leading-[1.75] max-w-[520px] mx-auto" style={{ color: '#888' }}>
            No surprise invoices. No hidden retainers. Pick the engagement shape that fits.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((t, i) => (
            <motion.div key={i}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              style={{
                background: t.featured ? '#181818' : '#141414',
                border: `1px solid ${t.featured ? t.color + '50' : 'rgba(255,255,255,0.07)'}`,
                borderTop: `3px solid ${t.color}`, borderRadius: 8, padding: '32px 28px',
                position: 'relative',
                boxShadow: t.featured ? `0 20px 40px ${t.color}15` : 'none',
              }}
            >
              {t.featured && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider" style={{ background: t.color, color: '#0A0A0A', fontWeight: 600 }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-syne font-bold text-[18px]" style={{ color: '#EAEAEA' }}>{t.name}</h3>
              <div className="mt-4 mb-2">
                <span className="font-syne font-extrabold" style={{ fontSize: 32, color: t.color }}>{t.price}</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#666' }}>{t.sub}</p>
              <p className="font-dm text-[13px] mt-4 leading-[1.6]" style={{ color: '#888' }}>{t.desc}</p>
              <ul className="mt-6 space-y-2.5 mb-8">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check size={14} color={t.color} strokeWidth={2.5} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span className="font-dm text-[13px]" style={{ color: '#C0C0C0' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact?type=demo" className="font-dm font-medium text-[13px] inline-block w-full text-center cursor-pointer"
                style={{
                  background: t.featured ? t.color : 'transparent',
                  color: t.featured ? '#0A0A0A' : t.color,
                  border: `1px solid ${t.color}`,
                  padding: '11px 22px', borderRadius: 4,
                  transition: 'background 200ms ease, color 200ms ease',
                }}
              >
                Get Started →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const quotes = [
    { name: 'Rajesh Mehta', role: 'Managing Partner, CA Firm — Pune', q: 'CaFlow recovered 40+ hours a week for our admin team. Our compliance submission rate hit 100% for the first time in seven years.', r: 5 },
    { name: 'Priya Shah', role: 'Head of Sales, B2B Distributor', q: 'The WhatsApp lead bot alone qualified 600+ leads in its first month. We went from drowning in enquiries to a clean, sorted pipeline.', r: 5 },
    { name: 'Arvind Kumar', role: 'Director, Automotive Manufacturer', q: 'MEEHAAN replaced our Excel + WhatsApp-group operations with a proper dashboard. I can finally see what\'s happening in the plant in real time.', r: 5 },
    { name: 'Sneha Iyer', role: 'COO, SaaS Startup', q: '48-hour proposal, 9-week delivery. They picked the right tools, wired them up, trained my team, and left us with a system we actually own.', r: 5 },
    { name: 'Vikram Reddy', role: 'Finance Controller', q: 'Invoice parsing used to take two people a full day each week. Now it runs overnight and my team reviews exceptions in an hour.', r: 5 },
    { name: 'Anjali Desai', role: 'Marketing Lead', q: 'Their content automation pipeline ships 3x the output with better SEO performance. The ROI conversation ended after month two.', r: 5 },
  ];
  const [idx, setIdx] = useState(0);
  return (
    <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
          <SectionLabel color={ORANGE}>Testimonials</SectionLabel>
          <h2 className="font-syne font-bold inline-block" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            Don't just take our word for it.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quotes.map((t, i) => (
            <motion.article key={i}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '24px 22px' }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.r }).map((_, j) => (
                  <Star key={j} size={14} fill={ORANGE} color={ORANGE} />
                ))}
              </div>
              <p className="font-dm text-[13px] leading-[1.7] mb-5" style={{ color: '#C0C0C0' }}>"{t.q}"</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${TEAL}, ${ORANGE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="font-syne font-bold text-[13px]" style={{ color: '#0A0A0A' }}>{t.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="font-syne font-semibold text-[13px]" style={{ color: '#DCDCDC' }}>{t.name}</div>
                  <div className="font-dm text-[11px]" style={{ color: '#666' }}>{t.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: 'How fast can you deliver a working system?', a: 'First automations go live in 3–5 weeks. Full pipelines deploy in 90 days. You\'ll see weekly demos from week two.' },
    { q: 'What if I don\'t know exactly what to automate?', a: 'That\'s the whole first week. We shadow your team, map workflows, and come back with a ranked list of the highest-ROI automations.' },
    { q: 'Do I own the code and systems?', a: 'Yes. Everything we build is yours. Source code, configs, documentation — all handed over at launch. No vendor lock-in.' },
    { q: 'Which AI models do you use?', a: 'Whatever fits — GPT-4, Claude, Gemini, open-source (Llama, Mistral). We pick based on cost, latency, and accuracy for your specific task.' },
    { q: 'Can you work with my existing tools?', a: 'Almost always yes. We build on top of Zoho, HubSpot, Salesforce, Tally, SAP, custom apps — whatever your team already uses.' },
    { q: 'What\'s your pricing model?', a: 'Three options: fixed-price 90-day builds, monthly retainers for ongoing partnership, or lightweight support plans. No surprise invoices.' },
    { q: 'What if the automation breaks?', a: 'Every deployment includes monitoring, alerting, and a retainer option. If it breaks, we\'re on it — usually before you notice.' },
    { q: 'Do you sign NDAs?', a: 'Standard. Send yours or use ours. We\'ve worked under strict NDA with CA firms, manufacturers, and publicly listed companies.' },
  ];
  return (
    <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[880px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-syne font-bold inline-block" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            Frequently asked questions.
          </h2>
        </motion.div>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <motion.div key={i}
              variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.3}
              style={{ background: '#141414', border: `1px solid ${open === i ? TEAL + '30' : 'rgba(255,255,255,0.07)'}`, borderRadius: 8, overflow: 'hidden', transition: 'border-color 200ms ease' }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                style={{ background: 'transparent', border: 'none' }}
              >
                <span className="font-syne font-semibold text-[14px]" style={{ color: '#DCDCDC' }}>{f.q}</span>
                <ChevronDown size={16} color={open === i ? TEAL : '#666'} style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease', flexShrink: 0 }} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 pb-4 pt-0">
                      <p className="font-dm text-[13px] leading-[1.7]" style={{ color: '#999' }}>{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Team ─────────────────────────────────────────────────────────────────────
const Team = () => {
  const team = [
    { name: 'Soham Hanse', role: 'Head, Digital Division', bio: 'Builds AI automation systems for CA firms, distributors, and B2B operators. Based in Pune.', socials: [{ icon: Globe }, { icon: AtSign }, { icon: Mail }] },
    { name: 'MEEHAAN Engineering', role: 'Build Team', bio: 'Full-stack engineers, AI specialists, and integration experts — available as an extension of your team.', socials: [{ icon: Globe }, { icon: Mail }] },
  ];
  return (
    <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1000px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
          <SectionLabel color={ORANGE}>The Team</SectionLabel>
          <h2 className="font-syne font-bold inline-block" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', color: '#EAEAEA', lineHeight: 1.15 }}>
            The <span style={{ color: ORANGE }}>expert team</span> by your side.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.map((m, i) => (
            <motion.div key={i}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '28px 24px', display: 'flex', gap: 18, alignItems: 'flex-start' }}
            >
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${TEAL}, ${ORANGE})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-syne font-bold text-[18px]" style={{ color: '#0A0A0A' }}>{m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-syne font-bold text-[16px]" style={{ color: '#EAEAEA' }}>{m.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: TEAL }}>{m.role}</p>
                <p className="font-dm text-[13px] leading-[1.7] mt-3" style={{ color: '#888' }}>{m.bio}</p>
                <div className="flex gap-2 mt-4">
                  {m.socials.map((s, j) => {
                    const Icon = s.icon;
                    return (
                      <span key={j} style={{ width: 30, height: 30, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Icon size={13} color="#888" />
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Insights / Blog ──────────────────────────────────────────────────────────
const Insights = () => {
  const posts = [
    { tag: 'AI Strategy', title: 'Why most AI pilots die in month three', date: 'April 2026', read: '6 min' },
    { tag: 'Automation', title: 'WhatsApp as a production-grade CRM surface', date: 'March 2026', read: '8 min' },
    { tag: 'Case Study', title: 'How CaFlow hit 100% compliance submission', date: 'March 2026', read: '5 min' },
    { tag: 'Engineering', title: 'Choosing between GPT-4, Claude, and open-source', date: 'February 2026', read: '9 min' },
  ];
  return (
    <section className="py-14 lg:py-20 px-6 lg:px-[80px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <SectionLabel>Insights</SectionLabel>
            <h2 className="font-syne font-bold" style={{ fontSize: 'clamp(24px, 3.4vw, 36px)', color: '#EAEAEA', lineHeight: 1.15 }}>
              Latest posts and updates.
            </h2>
          </div>
          <Link to="/about" className="font-dm font-medium text-[13px]" style={{ color: TEAL }}>View all →</Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((p, i) => (
            <motion.article key={i}
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.3}
              whileHover={{ y: -4 }}
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}
            >
              <div style={{ height: 120, background: `linear-gradient(135deg, ${i % 2 === 0 ? TEAL : ORANGE}22, ${i % 2 === 0 ? ORANGE : TEAL}15)`, borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }} />
              </div>
              <div style={{ padding: '18px 18px 20px' }}>
                <Tag color={i % 2 === 0 ? TEAL : ORANGE}>{p.tag}</Tag>
                <h3 className="font-syne font-semibold mt-2" style={{ fontSize: 15, color: '#DCDCDC', lineHeight: 1.3 }}>{p.title}</h3>
                <div className="flex items-center gap-2 mt-3 font-mono text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Final CTA ────────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section className="relative overflow-hidden py-16 lg:py-24 px-6 lg:px-[80px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: TEAL, filter: 'blur(200px)', opacity: 0.08, pointerEvents: 'none' }} />
    <div aria-hidden="true" style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: ORANGE, filter: 'blur(160px)', opacity: 0.07, pointerEvents: 'none' }} />

    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="relative max-w-[900px] mx-auto text-center"
    >
      <h2 className="font-syne font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: '#EAEAEA', lineHeight: 1.1 }}>
        The future belongs to those who{' '}
        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, color: ORANGE }}>automate</span>{' '}
        <span style={{ color: TEAL }}>today</span>.
      </h2>
      <p className="font-dm text-[15px] mt-6 leading-[1.75] max-w-[560px] mx-auto" style={{ color: '#999' }}>
        Free 30-minute consultation. Proposal in 48 hours. No commitment.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <PrimaryBtn to="/contact?type=demo">Book a Free Call →</PrimaryBtn>
        <GhostBtn to="/solutions/digital/caflow">See CaFlow →</GhostBtn>
      </div>
    </motion.div>
  </section>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const DIGITAL_VARIANTS = {
  '/solutions/digital/software': {
    title: 'Custom Industrial Software Development for Indian Manufacturers',
    description: 'MEEHAAN Digital builds custom software for Indian manufacturers — ERP extensions, production dashboards, inventory systems, and internal tools. Pune-based team, nationwide delivery.',
    canonical: '/solutions/digital/software',
  },
  '/solutions/digital/ai': {
    title: 'AI Automation Services for Indian Manufacturers — MEEHAAN Digital',
    description: 'Done-for-you AI automation for CRM, WhatsApp, workflow, finance, and marketing. Proposal in 48 hours, deploy in 90 days. From MEEHAAN Digital, Pune.',
    canonical: '/solutions/digital/ai',
  },
  '/solutions/digital': {
    title: 'Digital Solutions — Custom Software & AI Automation for Industry',
    description: "MEEHAAN Digital: custom software development and AI automation built for Indian manufacturers, distributors, and service businesses. Plan, build, deploy in 90 days.",
    canonical: '/solutions/digital',
  },
};

const DigitalLanding = () => {
  const location = useLocation();
  const variant = DIGITAL_VARIANTS[location.pathname] || DIGITAL_VARIANTS['/solutions/digital'];
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', paddingTop: 64 }}>
      <SEOHead
        title={variant.title}
        description={variant.description}
        canonical={variant.canonical}
      />

      <Hero />
      <MainFeatures />
      <Results />
      <AITrap />
      <HandsOff />
      <Partners />
      <TopSystems />
      <UseCases />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Team />
      <Insights />
      <FinalCTA />
    </div>
  );
};

export default DigitalLanding;
