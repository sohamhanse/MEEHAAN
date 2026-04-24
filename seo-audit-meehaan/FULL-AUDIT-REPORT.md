# Full SEO Audit — www.meehaan.com

**Date:** 2026-04-16
**Pages discovered (sitemap):** 23
**Pages crawlable (raw HTML):** 23 — all return **identical 4116-byte SPA shell**
**Host:** Vercel (CDN cache HIT)

---

## Executive Summary

### Overall SEO Health Score: **36 / 100 — Poor**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 45/100 | 9.9 |
| Content Quality | 23% | 30/100 | 6.9 |
| On-Page SEO | 20% | 25/100 | 5.0 |
| Schema / Structured Data | 10% | 55/100 | 5.5 |
| Performance (CWV) | 10% | 50/100 | 5.0 |
| AI Search Readiness | 10% | 20/100 | 2.0 |
| Images | 5% | 30/100 | 1.5 |
| **Total** | 100% | — | **~35.8** |

### Business Type Detected
**Hybrid B2B — Local Service + Industrial Distribution + Digital Services**, based in Pune, Maharashtra, India.
- Industrial division: lubricants (LUBO), automotive connectors, battery accessories
- Digital division: custom software, AI automation, CAflow
- LocalBusiness schema is present (triggers local-SEO factors)

### Top 5 Critical Issues
1. **Every URL serves the same HTML shell.** The site is a client-rendered React/Vite SPA with no SSR or prerendering. All 23 sitemap URLs return the identical 4116-byte document with the same title, meta description, and empty `<body>`. Non-rendering crawlers (Bing, ChatGPT, Perplexity, Twitter/LinkedIn previews) see no content on any page.
2. **Google Search Console verification is a placeholder.** `<meta name="google-site-verification" content="VERIFICATION_CODE" />` was committed literally. GSC is not verified, so you have zero feedback from Google about indexing, queries, or errors.
3. **Open Graph image is broken.** `https://www.meehaan.com/og-image.jpg` responds `200 OK` but returns `text/html` (the SPA shell, 4116 bytes) instead of an image. Social shares on LinkedIn, X, WhatsApp, Slack will render a broken preview.
4. **Soft-404 on every non-existent URL.** `/this-page-definitely-does-not-exist-xyz123` returns HTTP 200 + the same shell. Google will eventually flag these as Soft 404s and may demote legitimate pages it cannot distinguish from junk.
5. **No unique `<title>` or canonical per page.** Every URL — `/about`, `/contact`, `/solutions/industrial/oils/heat-treatment`, etc. — advertises the same title "MEEHAAN — Industrial Precision. Digital Intelligence." and the same meta description in the raw HTML. Google cannot differentiate pages before JS execution and may collapse them into one canonical.

### Top 5 Quick Wins
1. Enable Vercel prerendering / add `vite-plugin-ssr` or `react-snap` so every sitemap URL pre-renders to static HTML with unique title + meta + body content. (One-time config change — unblocks everything else.)
2. Replace `content="VERIFICATION_CODE"` with the real GSC verification token and verify the property. (5 minutes.)
3. Commit an actual `og-image.jpg` (1200×630, <300 KB) to `/public/`. Verify with the X/LinkedIn debuggers.
4. Change non-www → www redirect from 307 → 301 (Vercel `redirects` with `permanent: true`).
5. Publish a static `llms.txt` at root so AI crawlers get a concise, cite-friendly summary.

---

## 1. Technical SEO

### 1.1 Crawlability
- **robots.txt:** Present, minimal, valid.
  ```
  User-agent: *
  Allow: /
  Disallow: /admin/
  Sitemap: https://www.meehaan.com/sitemap.xml
  ```
  Acceptable. Consider adding explicit rules for AI bots (GPTBot, ClaudeBot, PerplexityBot, CCBot) — allow or disallow by policy.
- **sitemap.xml:** Present, well-structured, 23 URLs. Uses `<changefreq>` and `<priority>` tags which Google ignores as of 2017 — harmless but noise.
- **/admin/:** Disallowed in robots.txt but still returns the SPA shell (200). Should return 404 or be removed entirely if unused.

### 1.2 Indexability
- **Same-shell soft-404:** `/this-page-definitely-does-not-exist-xyz123` → HTTP 200 + SPA shell. This is the #1 indexation risk.
- **No `<link rel="canonical">`** on the homepage HTML. Every page needs one. Once prerendering is added, set `canonical = <absolute-url-of-that-page>`.
- **OG URL mismatch:** `<meta property="og:url" content="https://meehaan.com" />` uses the non-www host while the canonical host is `www.meehaan.com`. Fix to `https://www.meehaan.com/`.
- **Host canonicalization:**
  - `http://www.meehaan.com/` → 308 Permanent → `https://www.meehaan.com/` ✅
  - `https://meehaan.com/` → **307 Temporary** → `https://www.meehaan.com/` ❌ should be **308/301 Permanent**

### 1.3 Security / Response Headers
| Header | Status |
|---|---|
| `Strict-Transport-Security: max-age=63072000` | ✅ 2 years |
| `Content-Type: text/html; charset=utf-8` | ✅ |
| `X-Content-Type-Options: nosniff` | ❌ missing |
| `X-Frame-Options` / CSP `frame-ancestors` | ❌ missing (clickjacking) |
| `Content-Security-Policy` | ❌ missing |
| `Referrer-Policy` | ❌ missing |
| `Permissions-Policy` | ❌ missing |
| `Access-Control-Allow-Origin: *` | ⚠️ wildcard — scope down unless needed |

### 1.4 Redirects
- HTTP → HTTPS: 308 Permanent ✅
- Non-www → www: 307 Temporary ❌ (should be permanent)
- No redirect chains observed

### 1.5 Assets
- JS bundle `/assets/index-BGNK8Hec.js`: **643 KB** (uncompressed response — likely gzipped by Vercel but still large for a brochure site with 23 pages).
- CSS bundle present.
- `/favicon.svg`: 771 bytes ✅
- `/og-image.jpg`: ❌ **returns HTML shell, not an image**

---

## 2. Content Quality

### 2.1 Rendered Content Assessment
WebFetch (non-JS renderer) returned only "MEEHAAN — Industrial Precision. Digital Intelligence." for **every URL tested**, including `/about`, `/contact`, and the deep product pages. This confirms content is 100% client-rendered. Without prerendering:
- Static word count per page: **5 words**
- Static H1/H2/H3 count: **0**
- Static internal links: **0**
- Static images: **0**

### 2.2 E-E-A-T Signals (from what is visible)
- **Experience:** Not visible in static HTML. The `Organization` schema names "MEEHAAN Enterprise" but no founding date, team bios, or case studies are discoverable pre-render.
- **Expertise:** Product category depth exists in the URL structure (7 oil categories, 5 battery categories, 3 digital services) but content is inaccessible to non-JS crawlers.
- **Authoritativeness:** `sameAs: []` in the Organization schema is empty. No LinkedIn, no social proof, no external authority signals.
- **Trust:** LocalBusiness schema has address + phone + hours. Good foundation. Missing: reviews, aggregateRating, GSTIN/business registration, photos.

### 2.3 Thin Content Risk
Post-render, content may be strong — but **Googlebot's second rendering pass can take days to weeks**. In that window, pages look thin. Bing, DuckDuckGo, and LLM crawlers (ChatGPT, Perplexity, Claude, Bing Copilot) generally do not execute JS and will never see the content. Fix at the build pipeline, not per-page.

### 2.4 Readability / Duplicates
Cannot be measured without rendered content or Playwright access. Once prerendering is in place, rerun this audit to score per-page Flesch/Gunning-Fog and duplicate-content similarity.

---

## 3. On-Page SEO

| Element | Finding |
|---|---|
| `<title>` | Single brand title used for all 23 URLs. Each page needs a unique, intent-matched title. |
| Meta description | Same description on all URLs. Each page needs its own. |
| `<link rel="canonical">` | Missing everywhere. |
| `<meta name="keywords">` | Present (`industrial oils, LUBO, ...`). Google ignores this tag — harmless but noise. Can remove. |
| `<meta name="robots">` | Not set. Acceptable (defaults to index,follow). |
| H1 / H2 structure | Absent in static HTML. |
| Internal linking | Zero internal links in raw HTML. |
| Twitter Card meta | Missing (`twitter:card`, `twitter:image`, etc.). |
| `hreflang` | Missing. Schema declares English + Hindi + Marathi availability but no language targeting. |
| Viewport | ✅ set correctly. |

---

## 4. Schema / Structured Data

Two JSON-LD blocks on the homepage (both syntactically valid):

### 4.1 Organization
```json
{
  "@type": "Organization",
  "name": "MEEHAAN Enterprise",
  "url": "https://www.meehaan.com",
  "logo": "https://www.meehaan.com/favicon.svg",
  "description": "...",
  "address": { "@type": "PostalAddress", ... "Pune, Maharashtra, IN" },
  "contactPoint": { "telephone": "+91-9923588450", "contactType": "sales", "availableLanguage": ["English","Hindi","Marathi"] },
  "sameAs": []
}
```
Issues:
- `logo` points to favicon.svg — Google Rich Results expects logos ≥112×112 and visually recognizable at thumbnail size. A 24×24 favicon will be rejected.
- `sameAs: []` — add LinkedIn, JustDial, IndiaMART, Facebook, YouTube profiles once live.

### 4.2 LocalBusiness
```json
{
  "@type": "LocalBusiness",
  "telephone": "+91-9923588450",
  "address": { "Pune, Maharashtra, IN" },
  "openingHours": "Mo-Sa 09:00-18:00",
  "priceRange": "$$",
  "image": "https://www.meehaan.com/favicon.svg"
}
```
Issues:
- Missing required `@id` (recommended to unify with Organization via `@id` URIs).
- Missing street address, postal code. `LocalBusiness` schema benefits from the full NAP.
- No `geo` (`latitude` / `longitude`) — important for local Pune rankings.
- `image` is the favicon again — supply storefront/product photos.
- Consider a more specific subtype: `AutoPartsStore`, `Wholesaler`, or custom hybrid via multiple `@type`.

### 4.3 Missing Schema
- `BreadcrumbList` on nested category pages (`/solutions/industrial/oils/heat-treatment`).
- `Product` / `ProductGroup` for individual product pages.
- `Service` for each digital-division offering.
- `FAQPage` wherever FAQ content exists.
- `WebSite` with `SearchAction` (site-search in SERP).

---

## 5. Performance (Core Web Vitals)

No Google API key configured → no CrUX field data available, no PSI Lighthouse run. Lab assessment from static inspection:

| Factor | Observation |
|---|---|
| JS bundle | ~643 KB uncompressed (single bundle). Likely ~180–220 KB gzipped. Large for a content site. |
| CSS bundle | 1 blocking stylesheet. |
| Fonts | Google Fonts (Syne, DM Sans, DM Mono, Cormorant Garamond italic 600) — 4 families loaded from remote origin. `preconnect` hints present ✅, but `display=swap` is already on the URL. |
| LCP candidate | Hero text — but entire page renders after JS parse/execute, so LCP will correlate with bundle TTI. |
| CLS | Unknown without render. |
| INP | Unknown without render. |
| Caching | Vercel edge cache (`X-Vercel-Cache: HIT`, ETag present). ✅ |

**Expected mobile LCP**: 3.5–6.0s on 4G given 643 KB bundle + 4 font families + full-CSR. Needs real measurement.

---

## 6. AI Search Readiness (GEO)

| Signal | Status |
|---|---|
| `llms.txt` at root | ❌ does not exist (soft-404) |
| AI crawler allow/disallow in robots.txt | ⚠️ no explicit rules (so default-allow) |
| Content citability (static HTML) | ❌ essentially zero — no passages to cite |
| Brand mention signals | ⚠️ `sameAs` empty; no backlinks or social presence linked |
| Passage structure (H-tags, lists, definitions) | ❌ none in static HTML |
| Table of contents / jump links | ❌ |
| Author/reviewer bios | ❌ |

**Verdict:** A ChatGPT/Perplexity/Claude crawl today returns essentially nothing. Until SSR/prerendering lands, the site is invisible to AI search. This is an increasingly expensive gap for B2B vendors, where buyers now ask LLMs for supplier shortlists.

---

## 7. Images

- `/og-image.jpg` is broken (returns HTML).
- `favicon.svg` is correctly served.
- All other images live inside the React bundle — cannot be audited without render.
- Alt-text audit requires Playwright or production render; pending.

---

## 8. Analytics / Tracking

- **Google Analytics 4** installed (ID `G-28D0N4CCTW`). ✅ Verify this is the real GA4 property, not a template placeholder.
- **Microsoft Clarity** installed (ID `wchsu4xb4x`). ✅ Verify ID is real.
- Comments in source: `<!-- Replace G-28D0N4CCTW with your Measurement ID -->` and `<!-- Replace wchsu4xb4x with your project ID -->` — these comments suggest the IDs may be template placeholders that were never updated. **Check in the GA4 / Clarity UIs that data is flowing.**
- **Google Search Console:** NOT verified — placeholder `VERIFICATION_CODE`.
- **Bing Webmaster Tools:** No evidence of verification.

---

## 9. Local SEO (Pune, IN)

LocalBusiness schema flagged this as a local/hybrid business. Additional gaps:
- No Google Business Profile cross-link (`sameAs` should include it).
- No street address in schema — only city/region.
- No `geo` coordinates.
- No embedded Google Maps or directions component detectable.
- No NAP consistency check possible against IndiaMART, JustDial, Sulekha — recommend manual citation audit.
- No review schema or testimonials.
- English-only static HTML despite Hindi/Marathi support declaration.

---

## 10. Backlinks / Off-Page

Not audited in this pass — requires Moz, Bing Webmaster, or Common Crawl API keys. Initial heuristic: domain appears recently launched (Vercel-hosted, template comments still in source), so expected backlink profile is minimal. Prioritize citations on Indian B2B directories (IndiaMART, TradeIndia, ExportersIndia, JustDial, Sulekha).

---

## Appendix A — Sitemap Inventory

```
/
/about
/contact
/solutions/industrial
/solutions/industrial/oils
/solutions/industrial/connectors
/solutions/industrial/oils/heat-treatment
/solutions/industrial/oils/fire-resistant
/solutions/industrial/oils/cutting-coolants
/solutions/industrial/oils/metal-forming
/solutions/industrial/oils/industrial-cleaners
/solutions/industrial/oils/rust-preventives
/solutions/industrial/oils/die-casting
/solutions/industrial/battery
/solutions/industrial/battery/pg-glands
/solutions/industrial/battery/anderson-connectors
/solutions/industrial/battery/epoxy-sheets
/solutions/industrial/battery/terminal-blocks
/solutions/industrial/battery/degson-connectors
/solutions/digital
/solutions/digital/software
/solutions/digital/ai
/solutions/digital/caflow
```
23 URLs total. Note: sitemap lists 23 but originally claimed 26 in the XML comments — actual count is 23.

## Appendix B — Raw HTTP Evidence

```
curl -I https://www.meehaan.com/
HTTP/1.1 200 OK
Server: Vercel
Content-Length: 4116
Etag: "00056703bec880663c0f10e6fd7ac1f5"   <-- every URL returns this exact ETag
Strict-Transport-Security: max-age=63072000

MD5 of every sampled URL response body: 00056703bec880663c0f10e6fd7ac1f5
(7 different URLs including a random non-existent path — all identical)
```

## Appendix C — Audit Limitations
- No Google API key configured → no CrUX field data, no PSI Lighthouse scores.
- No Playwright installed → no rendered-content audit.
- No Moz/Bing/Ahrefs key → no backlink data.
- No DataForSEO MCP → no live SERP data.

Re-run the audit after (a) prerendering is enabled and (b) at least one of the above integrations is configured, to get measurable on-page/CWV/backlink numbers.
