# Action Plan — www.meehaan.com

Prioritized by SEO impact × effort. Each item lists what, why, and an effort estimate.

Legend: **CRITICAL** = blocks indexing or causes penalties (fix now) · **HIGH** = significant ranking impact (1 week) · **MEDIUM** = optimization (1 month) · **LOW** = backlog.

---

## CRITICAL (fix this week)

### C1. Enable prerendering / SSR so every URL serves real HTML
- **Why:** Every one of your 23 sitemap URLs currently serves the same 4116-byte empty SPA shell. Googlebot renders eventually but slowly and imperfectly; Bing, ChatGPT, Perplexity, Twitter/LinkedIn previews see nothing. Nothing else in this plan matters until this is fixed.
- **What:** Since you're on Vercel + Vite + React, pick one:
  - Easiest: `vite-plugin-ssr` (now "Vike") — build-time prerender for static routes.
  - Alt: `react-snap` — prerenders at build time using Puppeteer.
  - Alt: migrate to Next.js (bigger lift; gives you ISR + API routes).
- **Verify:** `curl https://www.meehaan.com/about | grep -i "<h1"` should return a unique H1 per page, and `curl` of a random non-existent path should return HTTP **404**, not 200.
- **Effort:** 1–2 dev days for Vike setup; testing and deploy.

### C2. Replace Google Search Console verification placeholder
- **Why:** `<meta name="google-site-verification" content="VERIFICATION_CODE" />` is literal placeholder text. GSC is not verified. You have no visibility into Google's view of the site.
- **What:** In GSC → Add property → URL prefix `https://www.meehaan.com/` → copy the token → replace `VERIFICATION_CODE` in `index.html` → deploy → click Verify.
- **Effort:** 10 minutes.

### C3. Fix the broken Open Graph image
- **Why:** `https://www.meehaan.com/og-image.jpg` returns HTML content (4116 bytes, `text/type: text/html`). Any share on LinkedIn/X/WhatsApp shows a broken preview.
- **What:** Export a 1200×630 JPEG (<300 KB, text-readable at 600×315 thumbnail), place at `/public/og-image.jpg`, redeploy. Test with https://www.linkedin.com/post-inspector/ and https://cards-dev.twitter.com/validator.
- **Effort:** 30 minutes (design + commit).

### C4. Fix OG URL + add canonical tags
- **Why:** `og:url` is `https://meehaan.com` but your canonical host is `https://www.meehaan.com/`. No canonical tag on any page. Both create duplicate-signal risk.
- **What:**
  - Change `<meta property="og:url" content="https://www.meehaan.com/" />` (or make per-page).
  - Add `<link rel="canonical" href="{{page-absolute-url}}" />` to every page (trivial once prerendering from C1 is in).
- **Effort:** 30 minutes after C1.

### C5. Make non-www → www redirect permanent (301/308)
- **Why:** `https://meehaan.com/` currently 307-redirects to www. 307 is temporary; search engines may not fully consolidate link equity.
- **What:** In `vercel.json`:
  ```json
  { "redirects": [{ "source": "/(.*)", "has": [{ "type":"host","value":"meehaan.com" }], "destination": "https://www.meehaan.com/$1", "permanent": true }] }
  ```
- **Effort:** 10 minutes.

### C6. Stop non-existent paths from returning 200
- **Why:** `/admin/`, `/this-page-does-not-exist`, and any typo under `/solutions/...` all return HTTP 200 with the SPA shell. Google will mark these as Soft 404s.
- **What:** Ship a proper 404 route in the React app that sets HTTP 404 at prerender time (Vike: `throw render(404)`; react-snap: explicit 404.html). Optionally add a catch-all Vercel rewrite that returns true 404 for unknown paths outside the known route list.
- **Effort:** 2–4 hours (tied to C1).

---

## HIGH (1–2 weeks)

### H1. Unique `<title>` and meta description per page
- **Why:** All 23 URLs currently claim the same title/description. Google cannot disambiguate pages, and click-through is indistinguishable in SERP.
- **What:** Use `react-helmet-async` (or the Vike/Next head component) to set per-route `<title>` and `<meta name="description">`. Target templates:
  - `/solutions/industrial/oils/heat-treatment` → `"Heat Treatment Oils | MEEHAAN Industrial Lubricants, Pune"`
  - `/solutions/digital/ai` → `"AI Automation Services for Indian Manufacturers | MEEHAAN Digital"`
- **Effort:** 1 day for all 23 templates.

### H2. Expand schema coverage
- **Why:** You have Organization + LocalBusiness on the homepage but nothing on deeper pages. Rich results are page-specific.
- **What:**
  - Add `BreadcrumbList` to every nested page (derive from URL).
  - Add `Product` / `Service` schema on every `/solutions/.../{leaf}` page.
  - Add `WebSite` + `SearchAction` on homepage so Google can show a search box.
  - Fix `Organization.logo` — use a ≥112×112 raster/SVG that is readable at thumbnail size, not `favicon.svg`.
  - Fill `Organization.sameAs` with LinkedIn, IndiaMART, JustDial, Facebook URLs.
  - Add full street address + `geo` (lat/lng) to `LocalBusiness`.
  - Link Organization and LocalBusiness via shared `@id`.
- **Validate:** https://validator.schema.org/ and https://search.google.com/test/rich-results.
- **Effort:** 1 day.

### H3. Publish `llms.txt` at site root
- **Why:** ChatGPT, Perplexity, Claude, Bing Copilot increasingly drive B2B discovery. `llms.txt` is the fastest way to give them a cite-ready summary.
- **What:** Static file at `/public/llms.txt`:
  ```
  # MEEHAAN Enterprise
  > Pune-based supplier of industrial lubricants, automotive connectors,
  > battery accessories, and digital/AI services for Indian manufacturers.

  ## Industrial
  - /solutions/industrial/oils: LUBO-brand oils — heat treatment, fire-resistant, cutting coolants, metal forming, industrial cleaners, rust preventives, die casting
  - /solutions/industrial/battery: PG glands, Anderson/Degson connectors, epoxy sheets, terminal blocks

  ## Digital
  - /solutions/digital/software: custom industrial software
  - /solutions/digital/ai: AI automation
  - /solutions/digital/caflow: workflow product

  ## Contact
  - Phone: +91-9923588450 (sales, English/Hindi/Marathi)
  - Pune, Maharashtra, IN
  ```
- **Effort:** 30 minutes.

### H4. Declare AI-bot policy in robots.txt
- **Why:** Today you default-allow all AI crawlers. Set an explicit policy.
- **What:** Append to robots.txt (allow-all example shown):
  ```
  User-agent: GPTBot
  Allow: /
  User-agent: ClaudeBot
  Allow: /
  User-agent: PerplexityBot
  Allow: /
  User-agent: Google-Extended
  Allow: /
  User-agent: CCBot
  Allow: /
  ```
- **Effort:** 15 minutes.

### H5. Add security response headers
- **Why:** Missing `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP. Safer for users and a small trust signal.
- **What:** In `vercel.json`:
  ```json
  { "headers": [{ "source": "/(.*)", "headers": [
    { "key":"X-Content-Type-Options","value":"nosniff" },
    { "key":"Referrer-Policy","value":"strict-origin-when-cross-origin" },
    { "key":"Permissions-Policy","value":"geolocation=(), camera=(), microphone=()" },
    { "key":"X-Frame-Options","value":"SAMEORIGIN" }
  ]}]}
  ```
  Defer full CSP until you audit third-party scripts (GA4, Clarity, Fonts).
- **Effort:** 30 minutes.

### H6. Verify GA4 and Clarity IDs are real, not placeholders
- **Why:** The HTML source has comments `<!-- Replace G-28D0N4CCTW -->` suggesting they might be template defaults.
- **What:** Open GA4 (G-28D0N4CCTW) and Clarity (wchsu4xb4x) dashboards; confirm data is flowing. If not, rotate to your real IDs and remove the "Replace X with your..." comments.
- **Effort:** 10 minutes.

---

## MEDIUM (within 1 month)

### M1. Build per-category content depth
- **Why:** `/solutions/industrial/oils/heat-treatment` etc. will rank only if they have substantive content (product specs, use cases, datasheets, FAQs). Once prerendering lands, crawlers finally see this content — make sure it's worth indexing.
- **What:** Target 600–1200 words per leaf page: problem framing → product spec table → comparison → applications → FAQ → CTA. Add Product schema per item.
- **Effort:** 1–2 weeks content work.

### M2. Internal linking architecture
- **Why:** The URL tree is deep (`/solutions/industrial/oils/heat-treatment` is 4 segments). Hub-and-spoke internal links help flow equity.
- **What:** Add breadcrumbs, sibling-product cross-links ("Related oils"), and cross-division bridges ("Pair with our battery connectors").
- **Effort:** 2–3 days.

### M3. Add hreflang for Indian market
- **Why:** Your audience speaks English, Hindi, and Marathi per schema declaration. You currently serve only English.
- **What:** Either (a) commit to English-only and add `<html lang="en">` with `<link rel="alternate" hreflang="en-in" href="...">` + `hreflang="x-default"`, or (b) build `/hi/...` and `/mr/...` trees for key pages and hreflang-cluster them.
- **Effort:** 1 day (option a), 2–3 weeks (option b).

### M4. Build local citations
- **Why:** You're a Pune B2B wholesaler; most buyers discover you via IndiaMART, JustDial, Sulekha, TradeIndia. These are ranking signals + direct lead sources.
- **What:** Create or claim listings on IndiaMART, TradeIndia, ExportersIndia, JustDial, Sulekha, Google Business Profile. Keep NAP identical to what's in LocalBusiness schema.
- **Effort:** 1–2 days.

### M5. Performance tuning (post-prerender)
- **Why:** Your JS bundle is 643 KB uncompressed. Once pages prerender, LCP will be fine, but INP can still suffer from bundle size on low-end Android.
- **What:** Enable route-level code splitting in Vite, audit the 4 font families (drop Cormorant Garamond if unused in production), preload the hero image, move analytics to `defer`.
- **Effort:** 1 day.

### M6. Image optimization pipeline
- **Why:** Images in the React bundle likely aren't responsive or next-gen. Audit with Playwright once prerendering ships.
- **What:** Use Vite's `vite-imagetools` or `@unpic/react`, serve WebP/AVIF with `srcset`, lazy-load below the fold, fix CLS with aspect-ratio.
- **Effort:** 2 days.

### M7. Drop `<meta name="keywords">` and sitemap `priority`/`changefreq`
- **Why:** Both are ignored by Google. Not harmful, just noise.
- **What:** Remove from `index.html` and `sitemap.xml`.
- **Effort:** 10 minutes.

---

## LOW (backlog)

### L1. Twitter Card meta tags
`<meta name="twitter:card" content="summary_large_image" />` + image/title/description. Mirror OG.

### L2. Preload key fonts
Swap Google Fonts CDN for self-hosted WOFF2 and `<link rel="preload" as="font" crossorigin>`; saves a third-party round trip.

### L3. Schema: `FAQPage` on product pages once FAQ content exists.

### L4. `SoftwareApplication` schema for CAflow.

### L5. Backlink acquisition — guest posts on Indian manufacturing publications (IndianMachinist, etc.).

### L6. Consider consolidating `favicon.svg` logo reference in schema with a proper logo (≥112×112, on-brand wordmark).

---

## Implementation Roadmap

| Week | Tasks |
|---|---|
| **Week 1** | C1 (prerendering), C2 (GSC), C3 (OG image), C4 (canonical+og:url), C5 (301), C6 (404s) |
| **Week 2** | H1 (titles+meta), H2 (schema), H3 (llms.txt), H4 (AI bots), H5 (headers), H6 (analytics check) |
| **Weeks 3–6** | M1 (content depth), M2 (internal links), M3 (hreflang), M4 (citations), M5 (perf), M6 (images) |
| **Backlog** | L1–L6, continuous |

## Success Metrics (60–90 days after fixes)
- Pages indexed in GSC: target ≥ 20 / 23.
- Unique titles in `site:meehaan.com` SERP (no duplicates).
- Core Web Vitals (CrUX): LCP < 2.5s, INP < 200ms, CLS < 0.1 on 75th percentile mobile.
- Non-brand impressions in GSC: >0 (currently blocked by indexation).
- At least one AI-search citation for "industrial oils Pune" or similar query (test via ChatGPT, Perplexity).
- Social shares render a real OG preview on LinkedIn + X.
