import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const IS_DIGITAL_SITE = process.env.VITE_SITE === 'digital';

const DIGITAL_BASE = 'https://digital.meehaan.com';
const DIGITAL_OG = `${DIGITAL_BASE}/og-image.svg`;

const digitalRouteMetadata = {
  '/': {
    title: 'MEEHAAN Digital — AI Automation Agency | Custom AI Agents & Workflow Automation',
    description: 'MEEHAAN Digital builds custom AI agents, workflow automation, and software for US and UK businesses. Fixed-price proposals in 48 hours. Live in under 14 days.',
    canonical: `${DIGITAL_BASE}/`,
    ogImage: DIGITAL_OG,
  },
  '/products': {
    title: 'AI Products — Voice AI, Workflow Automation, Legal Tech & More | MEEHAAN Digital',
    description: 'Nine specialised AI products built by MEEHAAN Digital. Voice AI, contact centre intelligence, legal recovery automation, field operations AI, and more. Deployed in under 14 days.',
    canonical: `${DIGITAL_BASE}/products`,
    ogImage: DIGITAL_OG,
  },
  '/caflow': {
    title: 'CaFlow — WhatsApp Compliance Automation for CA Firms (GST, ITR, TDS)',
    description: 'CaFlow automates document collection, compliance deadline tracking, and fee recovery for CA firms in India. WhatsApp-native. GSTR-1, GSTR-3B, ITR, TDS. 14-day free trial.',
    canonical: `${DIGITAL_BASE}/caflow`,
    ogImage: DIGITAL_OG,
  },
  '/apply': {
    title: 'Apply — MEEHAAN Digital Partner Program',
    description: 'Apply to the MEEHAAN Digital partner program. Tell us about yourself and we will be in touch within 2 business days.',
    canonical: `${DIGITAL_BASE}/apply`,
    ogImage: DIGITAL_OG,
  },
  '/products/horizontal-ai-agents': {
    title: 'Horizontal AI Agents — Six Coordinated AI Agents for Your Business | MEEHAAN Digital',
    description: 'Six coordinated AI agents sharing one unified context window. Covers sales, marketing, operations, collections, vendor management, and orchestration. Live in under 14 days.',
    canonical: `${DIGITAL_BASE}/products/horizontal-ai-agents`,
    ogImage: DIGITAL_OG,
  },
  '/products/voice-intake-concierge': {
    title: 'Voice Intake Concierge — AI Voice Agent for Franchise & Multi-Location Businesses',
    description: 'Always-on AI voice agent for franchise and multi-location businesses. Answers every inbound call, qualifies leads, handles intake, and routes complex cases — 24/7.',
    canonical: `${DIGITAL_BASE}/products/voice-intake-concierge`,
    ogImage: DIGITAL_OG,
  },
  '/products/contact-center-intelligence': {
    title: 'Contact Center Intelligence — AI Layer for Live Call Centre Operations | MEEHAAN Digital',
    description: 'AI layer deployed inside live call centre operations. Surfaces full caller context — account history, prior interactions, open issues — the moment a call connects.',
    canonical: `${DIGITAL_BASE}/products/contact-center-intelligence`,
    ogImage: DIGITAL_OG,
  },
  '/products/legal-recovery-ai': {
    title: 'Legal Recovery AI — Automated Debt Negotiation & Legal Process Management',
    description: 'Automates debt negotiation workflows and legal process management. The AI agent contacts debtors, presents terms, handles objections, and produces compliant documentation.',
    canonical: `${DIGITAL_BASE}/products/legal-recovery-ai`,
    ogImage: DIGITAL_OG,
  },
  '/products/facility-operations-ai': {
    title: 'Facility Operations AI — Conversational AI for Field Technicians | MEEHAAN Digital',
    description: 'Gives field technicians conversational access to full property history and service records. Handles inbound client queries and service scheduling without a human dispatcher.',
    canonical: `${DIGITAL_BASE}/products/facility-operations-ai`,
    ogImage: DIGITAL_OG,
  },
  '/products/ai-native-lms': {
    title: 'AI-Native LMS — Adaptive Learning & Onboarding Platform | MEEHAAN Digital',
    description: 'Adaptive learning and onboarding platform built natively on AI. Personalised learning paths, adaptive content sequencing, and AI-driven reinforcement loops.',
    canonical: `${DIGITAL_BASE}/products/ai-native-lms`,
    ogImage: DIGITAL_OG,
  },
  '/products/caflow-practice-management': {
    title: 'CaFlow Practice Management — AI Platform for Accounting Firms (US & UAE)',
    description: 'End-to-end practice management for accounting firms. Replaces TaxDome, Dext, and Karbon. Automates document collection, compliance deadlines, and fee recovery.',
    canonical: `${DIGITAL_BASE}/products/caflow-practice-management`,
    ogImage: DIGITAL_OG,
  },
  '/products/website-builder-ai': {
    title: 'Website Builder AI — Automated Website Design, SEO & Growth | MEEHAAN Digital',
    description: 'Builds, continuously optimises, and grows websites automatically. Handles design, copy, SEO, and AEO — and keeps improving post-launch without operator involvement.',
    canonical: `${DIGITAL_BASE}/products/website-builder-ai`,
    ogImage: DIGITAL_OG,
  },
  '/products/exit-concierge': {
    title: 'Exit Concierge — AI Operations Layer for Business Brokers & M&A Advisors',
    description: 'AI operations layer for business brokers and M&A advisors. Automates prospect qualification, document collection, buyer-seller matching, and communication sequencing.',
    canonical: `${DIGITAL_BASE}/products/exit-concierge`,
    ogImage: DIGITAL_OG,
  },
};

const digitalFileMapping = {
  'index.html': '/',
  'products.html': '/products',
  'caflow.html': '/caflow',
  'apply.html': '/apply',
  'products/horizontal-ai-agents.html': '/products/horizontal-ai-agents',
  'products/voice-intake-concierge.html': '/products/voice-intake-concierge',
  'products/contact-center-intelligence.html': '/products/contact-center-intelligence',
  'products/legal-recovery-ai.html': '/products/legal-recovery-ai',
  'products/facility-operations-ai.html': '/products/facility-operations-ai',
  'products/ai-native-lms.html': '/products/ai-native-lms',
  'products/caflow-practice-management.html': '/products/caflow-practice-management',
  'products/website-builder-ai.html': '/products/website-builder-ai',
  'products/exit-concierge.html': '/products/exit-concierge',
};

// SEO metadata for each route
const routeMetadata = {
  '/': {
    title: 'Industrial Lubricants, Connectors & Digital Solutions — Pune, India | MEEHAAN',
    description: 'MEEHAAN supplies LUBO industrial lubricants, automotive connectors, battery accessories, and digital/AI solutions to Indian manufacturers and OEMs. Pune-based B2B enterprise.',
    canonical: 'https://www.meehaan.com/',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/about': {
    title: 'About MEEHAAN — Industrial Lubricants, Connectors & Digital Solutions',
    description: 'Founded in 2018, MEEHAAN is a Pune-based B2B supplier of industrial lubricants (LUBO brand), connectors, battery accessories, and digital automation.',
    canonical: 'https://www.meehaan.com/about',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/contact': {
    title: 'Contact MEEHAAN — Sales Enquiries, Quotes & Support',
    description: 'Reach MEEHAAN for quotes, product enquiries, or technical support. Phone: +91-9923588450 (WhatsApp). Email: sales@meehaan.com. Pune, Maharashtra.',
    canonical: 'https://www.meehaan.com/contact',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial': {
    title: 'Industrial Division — LUBO Oils, Connectors, Battery Accessories | MEEHAAN',
    description: 'MEEHAAN industrial division: LUBO brand hydraulic oils, cutting coolants, fire-resistant fluids, automotive connectors (Yazaki, TE, Molex), and battery accessories.',
    canonical: 'https://www.meehaan.com/solutions/industrial',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils': {
    title: 'Industrial Lubricants — LUBO Hydraulic & Specialty Oils | MEEHAAN',
    description: 'LUBO industrial lubricants: heat-treatment oils, cutting coolants, fire-resistant fluids, metal-forming oils, rust preventives, die-casting agents, and industrial cleaners.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/connectors': {
    title: 'Automotive & Industrial Connectors — Yazaki, TE Connectivity, Molex | MEEHAAN',
    description: 'MEEHAAN supplies automotive and industrial connectors from Yazaki, TE Connectivity, Molex, and other major OEMs for Indian manufacturers.',
    canonical: 'https://www.meehaan.com/solutions/industrial/connectors',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/battery': {
    title: 'Battery Accessories — Cable Glands, Connectors, Terminal Blocks | MEEHAAN',
    description: 'MEEHAAN battery accessories: PG cable glands, Anderson connectors, epoxy sheets, DIN terminal blocks, Degson pluggable terminals for energy storage & industrial applications.',
    canonical: 'https://www.meehaan.com/solutions/industrial/battery',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/digital': {
    title: 'Digital Division — Custom Software & AI Automation | MEEHAAN',
    description: 'MEEHAAN digital division: custom industrial software development, AI automation for CRM, WhatsApp, workflows, finance, and compliance (CaFlow for CA firms).',
    canonical: 'https://www.meehaan.com/solutions/digital',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/digital/software': {
    title: 'Custom Industrial Software Development | MEEHAAN',
    description: 'MEEHAAN develops custom business software for manufacturing, supply chain, ERP integration, and digital transformation for Indian enterprises.',
    canonical: 'https://www.meehaan.com/solutions/digital/software',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/digital/ai': {
    title: 'AI Automation Services — CRM, WhatsApp, Workflow, Finance | MEEHAAN',
    description: 'MEEHAAN AI automation: CRM workflows, WhatsApp business automation, invoice processing, financial automation, and intelligent document handling.',
    canonical: 'https://www.meehaan.com/solutions/digital/ai',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/digital/caflow': {
    title: 'CaFlow — WhatsApp Compliance Automation for CA Firms | MEEHAAN',
    description: 'CaFlow: WhatsApp-based GST, ITR, TDS, and compliance automation platform for Chartered Accountants and tax professionals in India.',
    canonical: 'https://www.meehaan.com/solutions/digital/caflow',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/heat-treatment': {
    title: 'LUBOQUENCH — Heat-Treatment & Quenching Oils | MEEHAAN',
    description: 'LUBOQUENCH heat-treatment oils for precision quenching and hardening in automotive, tool, and heavy-duty manufacturing.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/heat-treatment',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/fire-resistant': {
    title: 'Fire-Resistant Hydraulic Fluids | MEEHAAN',
    description: 'Fire-resistant hydraulic fluids for equipment near heat sources, grinding wheels, metalworking, and high-temperature industrial applications.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/fire-resistant',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/cutting-coolants': {
    title: 'Metalworking Cutting Coolants & Fluids | MEEHAAN',
    description: 'Premium cutting coolants and metalworking fluids for CNC machining, turning, milling, and grinding operations.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/cutting-coolants',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/metal-forming': {
    title: 'Metal Forming Oils & Drawing Lubricants | MEEHAAN',
    description: 'Metal forming and drawing lubricants for deep drawing, stamping, bending, and forming operations in heavy manufacturing.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/metal-forming',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/industrial-cleaners': {
    title: 'Industrial Cleaners & Degreasers | MEEHAAN',
    description: 'Industrial cleaners and degreasers for parts cleaning, equipment maintenance, and pre-treatment in manufacturing facilities.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/industrial-cleaners',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/rust-preventives': {
    title: 'Rust Preventives — Short & Long-Term Storage Protection | MEEHAAN',
    description: 'Rust preventives and corrosion inhibitors for short- and long-term storage of manufactured components and finished goods.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/rust-preventives',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/oils/die-casting': {
    title: 'Die-Casting Lubricants & Release Agents | MEEHAAN',
    description: 'Die-casting lubricants and mold release agents for aluminum, zinc, and magnesium die-casting operations.',
    canonical: 'https://www.meehaan.com/solutions/industrial/oils/die-casting',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/battery/pg-glands': {
    title: 'PG Cable Glands (PG7–PG48) — Polyamide Connectors | MEEHAAN',
    description: 'PG-series polyamide cable glands (PG7 to PG48) for battery enclosures, junction boxes, and industrial control panels.',
    canonical: 'https://www.meehaan.com/solutions/industrial/battery/pg-glands',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/battery/anderson-connectors': {
    title: 'Anderson-Style DC Battery Connectors — High-Current | MEEHAAN',
    description: 'Anderson-style high-current DC battery connectors for energy storage systems, EV charging, and industrial power distribution.',
    canonical: 'https://www.meehaan.com/solutions/industrial/battery/anderson-connectors',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/battery/epoxy-sheets': {
    title: 'FR-4 & G-10 Epoxy Insulation Sheets | MEEHAAN',
    description: 'FR-4 and G-10 epoxy insulation sheets for PCB substrates, battery enclosures, and electrical insulation in industrial applications.',
    canonical: 'https://www.meehaan.com/solutions/industrial/battery/epoxy-sheets',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/battery/terminal-blocks': {
    title: 'DIN-Rail & PCB Terminal Blocks | MEEHAAN',
    description: 'DIN-rail mounted and PCB terminal blocks for power distribution, control circuits, and industrial electrical interconnection.',
    canonical: 'https://www.meehaan.com/solutions/industrial/battery/terminal-blocks',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
  '/solutions/industrial/battery/degson-connectors': {
    title: 'Degson Pluggable Terminals & PCB Connectors | MEEHAAN',
    description: 'Degson pluggable terminals and PCB connectors for modular battery systems, industrial control, and energy management.',
    canonical: 'https://www.meehaan.com/solutions/industrial/battery/degson-connectors',
    ogImage: 'https://www.meehaan.com/og-image.svg',
  },
};

// File mapping: actual dist paths -> route
const fileMapping = {
  'index.html': '/',
  'about.html': '/about',
  'contact.html': '/contact',
  'solutions/industrial.html': '/solutions/industrial',
  'solutions/industrial/oils.html': '/solutions/industrial/oils',
  'solutions/industrial/connectors.html': '/solutions/industrial/connectors',
  'solutions/industrial/battery.html': '/solutions/industrial/battery',
  'solutions/digital.html': '/solutions/digital',
  'solutions/digital/software.html': '/solutions/digital/software',
  'solutions/digital/ai.html': '/solutions/digital/ai',
  'solutions/digital/caflow.html': '/solutions/digital/caflow',
  'solutions/industrial/oils/heat-treatment.html': '/solutions/industrial/oils/heat-treatment',
  'solutions/industrial/oils/fire-resistant.html': '/solutions/industrial/oils/fire-resistant',
  'solutions/industrial/oils/cutting-coolants.html': '/solutions/industrial/oils/cutting-coolants',
  'solutions/industrial/oils/metal-forming.html': '/solutions/industrial/oils/metal-forming',
  'solutions/industrial/oils/industrial-cleaners.html': '/solutions/industrial/oils/industrial-cleaners',
  'solutions/industrial/oils/rust-preventives.html': '/solutions/industrial/oils/rust-preventives',
  'solutions/industrial/oils/die-casting.html': '/solutions/industrial/oils/die-casting',
  'solutions/industrial/battery/pg-glands.html': '/solutions/industrial/battery/pg-glands',
  'solutions/industrial/battery/anderson-connectors.html': '/solutions/industrial/battery/anderson-connectors',
  'solutions/industrial/battery/epoxy-sheets.html': '/solutions/industrial/battery/epoxy-sheets',
  'solutions/industrial/battery/terminal-blocks.html': '/solutions/industrial/battery/terminal-blocks',
  'solutions/industrial/battery/degson-connectors.html': '/solutions/industrial/battery/degson-connectors',
};

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function injectMetadata(htmlFilePath, metadata) {
  let html = fs.readFileSync(htmlFilePath, 'utf-8');

  const { title, description, canonical, ogImage } = metadata;

  // Find the closing </head> tag
  const headClosingIndex = html.indexOf('</head>');
  if (headClosingIndex === -1) {
    console.warn(`No </head> found in ${htmlFilePath}`);
    return;
  }

  // Remove old meta tags to prevent duplicates
  const metaRemovalPatterns = [
    /<title>[^<]*<\/title>/g,
    /<meta\s+name="description"[^>]*>/g,
    /<link\s+rel="canonical"[^>]*>/g,
    /<meta\s+property="og:[^"]*"[^>]*>/g,
    /<meta\s+name="twitter:[^"]*"[^>]*>/g,
  ];

  let cleanedHtml = html;
  metaRemovalPatterns.forEach(pattern => {
    cleanedHtml = cleanedHtml.replace(pattern, '');
  });

  // Build the metadata tags (escaped for HTML)
  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(description);
  const metaTags = [
    `<title>${escapedTitle}</title>`,
    `<meta name="description" content="${escapedDesc}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${escapedTitle}">`,
    `<meta property="og:description" content="${escapedDesc}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapedTitle}">`,
    `<meta name="twitter:description" content="${escapedDesc}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
  ].join('\n    ');

  // Find the insertion point before </head>
  const insertPoint = cleanedHtml.lastIndexOf('</head>');
  if (insertPoint === -1) {
    console.warn(`Could not find </head> in ${htmlFilePath}`);
    return;
  }

  // Insert new metadata before </head>
  const finalHtml = cleanedHtml.slice(0, insertPoint) +
    '    ' + metaTags + '\n  ' +
    cleanedHtml.slice(insertPoint);

  fs.writeFileSync(htmlFilePath, finalHtml, 'utf-8');
}

const activeMapping = IS_DIGITAL_SITE ? digitalFileMapping : fileMapping;
const activeMetadata = IS_DIGITAL_SITE ? digitalRouteMetadata : routeMetadata;

// Process all files
Object.entries(activeMapping).forEach(([distPath, route]) => {
  const fullPath = path.join(distDir, distPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠ File not found: ${distPath}`);
    return;
  }

  if (activeMetadata[route]) {
    injectMetadata(fullPath, activeMetadata[route]);
    console.log(`✓ Injected metadata for ${route}`);
  } else {
    console.warn(`⚠ No metadata found for route ${route}`);
  }
});

console.log('\n✓ SEO metadata injection complete');
