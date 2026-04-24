import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

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

// Process all files
Object.entries(fileMapping).forEach(([distPath, route]) => {
  const fullPath = path.join(distDir, distPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠ File not found: ${distPath}`);
    return;
  }

  if (routeMetadata[route]) {
    injectMetadata(fullPath, routeMetadata[route]);
    console.log(`✓ Injected metadata for ${route}`);
  } else {
    console.warn(`⚠ No metadata found for route ${route}`);
  }
});

console.log('\n✓ SEO metadata injection complete');
