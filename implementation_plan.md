# MEEHAAN Homepage Rebuild

Rebuild the homepage and key components to match the new brand identity — two divisions (Industrial + Digital), editorial design, Syne/DM Sans typography, and a precise design system.

## Proposed Changes

### Configuration & Assets

#### [MODIFY] [index.html](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/index.html)
- Replace Inter font preconnects with **Syne**, **DM Sans**, **DM Mono** from Google Fonts
- Update meta description, title, and theme-color to match new brand

#### [MODIFY] [tailwind.config.js](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/tailwind.config.js)
- Add custom colors: `brandOrange`, `brandTeal`, `nearBlack`, `warmWhite`
- Add font families: `syne`, `dm`, `mono`
- Remove old `primary`/`secondary` palette and `darkMode: 'class'`

#### [MODIFY] [index.css](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/index.css)
- Replace Inter import with Syne + DM Sans + DM Mono
- Set body font to DM Sans, light mode only
- Add CSS custom properties for brand colors
- Add `@keyframes marquee` for trusted brands scroll
- Remove old loading animations, dark mode scrollbar styles, and unused utility classes

---

### Components

#### [MODIFY] [Navbar.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Navbar.jsx)
- Complete rewrite: white bg, 68px height, 1px bottom border
- MEEHAAN PNG logo (img tag, h-36px)
- Links: Home | Solutions (two-column mega dropdown) | About | Contact
- CTA: "Get in Touch" — `#1A1A1A` filled, 4px radius
- Mobile: hamburger → full-screen overlay
- Remove ThemeToggle import

#### [MODIFY] [Footer.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Footer.jsx)
- Complete rewrite: `#1A1A1A` bg, 4 columns
- Col 1: MEEHAAN logo, tagline, address, phone, email
- Col 2: Industrial Solutions links
- Col 3: Digital Solutions links
- Col 4: Company links
- Bottom bar: copyright + social SVG icons (LinkedIn, Instagram, WhatsApp)

#### [MODIFY] [LoadingScreen.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/LoadingScreen.jsx)
- Rewrite: `#1A1A1A` bg, MEEHAAN logo PNG centered (h-64px)
- Three animated dots (CSS pulse, brand orange) below logo
- Remove cycling text categories

#### [MODIFY] [WhatsAppButton.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/WhatsAppButton.jsx)
- Pill shape with "Chat on WhatsApp" text visible on desktop
- `#25D366` bg, bottom-right 24px from edges
- Remove pulsing ring animation, hover scale only

#### [MODIFY] [Layout.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/components/Layout.jsx)
- Remove `dark:bg-gray-900` class

---

### Pages

#### [MODIFY] [Home.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/Frontend/src/pages/Home.jsx)
Complete rewrite with 8 sections:
1. **Hero** — Dark bg, two-column, Syne headings, stat pills, split logo card
2. **Dual Division Showcase** — Two large cards (Industrial + Digital) with feature rows
3. **Industries We Serve** — Dark section, 3×2 grid of industry cards with SVG icons
4. **Why MEEHAAN** — 4 stat columns + full-width dark quote block
5. **Trusted Brands** — CSS marquee of grayscale brand logos
6. **CTA Split** — Two-column (orange + teal) CTA panels
7. *(Navbar and Footer are separate components, rendered via Layout)*

---

### Assets

- Copy uploaded logos to `public/images/`:
  - `MEEHAAN_Logo_Without_Bg-01.png`
  - `LUBO_Logo_Without_Bg-01.png`

## Verification Plan

### Automated
- Run `cd Frontend && npm run build` — must complete with zero errors

### Manual
- Open `npm run dev` in browser, verify all 8 homepage sections render correctly
- Check responsive behavior at mobile/tablet/desktop breakpoints
- Verify Solutions dropdown hover on desktop, click on mobile
- Verify marquee brand logo scroll animation
- Verify WhatsApp button pill style
