import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.meehaan.com';
const OUTPUT_DIR = path.join(__dirname, '../public');
const SITEMAP_FILE = path.join(OUTPUT_DIR, 'sitemap.xml');

// Route definitions matching App.jsx
const OIL_CATEGORIES = [
  'heat-treatment',
  'fire-resistant',
  'cutting-coolants',
  'metal-forming',
  'industrial-cleaners',
  'rust-preventives',
  'die-casting',
];

const BATTERY_SUBCATEGORIES = [
  'pg-glands',
  'anderson-connectors',
  'epoxy-sheets',
  'terminal-blocks',
  'degson-connectors',
];

// Static routes
const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/solutions/industrial', priority: 0.9, changefreq: 'monthly' },
  { path: '/solutions/industrial/oils', priority: 0.85, changefreq: 'weekly' },
  { path: '/solutions/industrial/connectors', priority: 0.85, changefreq: 'weekly' },
  { path: '/solutions/industrial/battery', priority: 0.85, changefreq: 'weekly' },
];

// Dynamic routes - Oil categories
const oilCategoryRoutes = OIL_CATEGORIES.map(cat => ({
  path: `/solutions/industrial/oils/${cat}`,
  priority: 0.7,
  changefreq: 'monthly',
}));

// Dynamic routes - Battery subcategories
const batterySubcategoryRoutes = BATTERY_SUBCATEGORIES.map(subcat => ({
  path: `/solutions/industrial/battery/${subcat}`,
  priority: 0.7,
  changefreq: 'monthly',
}));

// Combine all routes
const allRoutes = [
  ...staticRoutes,
  ...oilCategoryRoutes,
  ...batterySubcategoryRoutes,
];

// Generate sitemap XML
function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
}

// Write sitemap
function writeSitemap() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const sitemapContent = generateSitemap(allRoutes);
    fs.writeFileSync(SITEMAP_FILE, sitemapContent, 'utf-8');

    console.log(`✓ Sitemap generated successfully!`);
    console.log(`  File: ${SITEMAP_FILE}`);
    console.log(`  Total URLs: ${allRoutes.length}`);
    console.log(`  Static routes: ${staticRoutes.length}`);
    console.log(`  Oil categories: ${oilCategoryRoutes.length}`);
    console.log(`  Battery subcategories: ${batterySubcategoryRoutes.length}`);
  } catch (error) {
    console.error('✗ Error generating sitemap:', error);
    process.exit(1);
  }
}

writeSitemap();
