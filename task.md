# MEEHAAN Homepage Rebuild — Phase 2

## Config
- [x] [index.css](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/index.css) — full rewrite with hero-panel CSS, marquee, design tokens
- [x] [tailwind.config.js](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/tailwind.config.js) — updated colors + fonts

## Components
- [x] [Navbar.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Navbar.jsx) — mega dropdown with sub-labels, mobile overlay, larger logo
- [x] [Footer.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Footer.jsx) — 4-col dark footer with SVG icons, larger logo
- [x] [LoadingScreen.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/LoadingScreen.jsx) — minimal branded loader, larger logo, staggered dots
- [x] [WhatsAppButton.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/WhatsAppButton.jsx) — dark pill with green border, hover styling
- [x] [Layout.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Layout.jsx) — removed ALL dark mode classes globally

## Pages
- [x] [Home.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/Home.jsx) — hero panels, dual division, industries, why us, brands, CTA
- [x] [ComingSoon.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/ComingSoon.jsx) — new placeholder page
- [x] [App.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/App.jsx) — add new solution routes, keep all existing

## Cleanup
- [x] Remove `dark:` classes from About, NotFound, Products, ContactPage pages

---

# MEEHAAN Industrial Oils Redesign

## Pages
- [x] [ProductOils.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/ProductOils.jsx) — Redesigned hero banner, added sticky visual filter bar, replaced hover-overlay cards with precise grid cards, added full-width LUBO feature callout section.
- [x] [ProductCategoryPage.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/ProductCategoryPage.jsx) — Added 64px `padding-top` to account for the new fixed navbar.

## Components
- [x] [ProductCategorydetail.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/ProductCategorydetail.jsx) — Redesigned the entire prop-driven layout. 

---

# Automotive Connectors Redesign

## Pages
- [x] [ProductCategory.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/ProductCategory.jsx) — Redesigned the unified category page to properly handle the Connectors brands logic. 

---

# Battery Accessories (Marketplace Rewrite)

## Data & Routing
- [x] [src/data/batteryData.js](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/data/batteryData.js) — Overwrote placeholder JSON with client's active hierarchy. Fixed `images` linking natively.
- [x] [App.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/App.jsx) — Wired 3 nested routes under `/solutions/industrial/battery/*` mapped to a single [BatteryMarketplace](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/battery/BatteryMarketplace.jsx#52-601) component.
- [x] Deleted deprecated multi-page components (`BatteryLanding`, `BatterySubcategory`, `BatteryProduct`).

## Components
- [x] [BatteryMarketplace.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/battery/BatteryMarketplace.jsx) — Single comprehensive layout. Expanded Right detail panel to 480px. Built Auto-expansion logic.

---

# Phase 3 - Global 100% Zoom Downscaling 

*Multiply all explicit arbitrary tailwind sizing values by ~0.78.*

## Foundational
- [ ] [src/index.css](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/index.css) (Set html/body to 14px, enforce box-sizing)

## Global Components
- [ ] [src/components/Navbar.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Navbar.jsx)
- [ ] [src/components/Footer.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Footer.jsx)
- [ ] [src/components/WhatsAppButton.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/WhatsAppButton.jsx)
- [ ] [src/components/LoadingScreen.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/LoadingScreen.jsx)

## Pages
- [ ] [src/pages/Home.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/Home.jsx)
- [ ] [src/pages/ProductOils.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/ProductOils.jsx)
- [ ] [src/components/ProductCategorydetail.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/ProductCategorydetail.jsx)
- [ ] [src/pages/ProductCategory.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/ProductCategory.jsx)
- [ ] [src/pages/battery/BatteryMarketplace.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/battery/BatteryMarketplace.jsx)

## Verification
- [ ] `npm run build` — passed with zero errors
