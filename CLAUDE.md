# MEEHAAN

## Stack
React 18 + Vite + React Router v6 · Tailwind + inline styles · Framer Motion + GSAP · Lucide React · react-helmet-async · Vercel SSG

## Key files
- `Frontend/src/App.jsx` — route tree, export `routes` array. Add all new routes here.
- `Frontend/src/data/digitalProducts.js` — 8 AI products. **Untracked** — git checkout won't restore it.
- `Frontend/src/pages/solutions/DigitalProductPage.jsx` — **Untracked**
- `Frontend/src/pages/solutions/DigitalProductsPage.jsx` — **Untracked**

## Business Model
- **Manufacturing**: Oil manufacturer (60%) — 100-500 tons annual capacity, LUBO-branded oils
- **Trading**: Battery accessories + automotive connectors (40%)
- **Primary Markets**: Oil & gas, EV/battery, industrial manufacturing sectors
- **Export Markets**: US, Europe (in development)
- **Target Verticals**: Oil & gas refining/petrochemicals, EV battery pack assemblers, wire harness manufacturers, precision machining

## Architecture notes
- GSAP plugins registered once at module level in DigitalProductPage.jsx: ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase
- FM handles scroll reveals + hover · GSAP handles hero entrance + stacking cards ScrollTrigger
- Stacking cards: CSS `position:sticky` viewport + GSAP scrub timeline. Outer div = `sections.length * 85vh`. Cards = `position:absolute inset-0`.
- Navbar height = 88px. Used in sticky `top` and ScrollTrigger `start`.
- Page padding: `px-6 lg:px-[80px]`

## Palette
INK `#050805` · LIME `#D4F565` · LIME_DEEP `#C6E84F` · FOREST `#184D3A`

## Fonts
Syne (headings) · DM Sans (body) · DM Mono (badges/overlines) · Cormorant Garamond (italic CTA accents)

## Preferences
- Short message = implement confidently, don't ask
- "revert" = restore file immediately, no questions
- No trailing summaries · No comments explaining what code does · No unnecessary abstractions
