import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const solutions = [
    { name: 'Industrial Oils (LUBO)', path: '/solutions/industrial/oils' },
    { name: 'Automotive Connectors', path: '/solutions/industrial/connectors' },
    { name: 'Battery Accessories', path: '/solutions/industrial/battery' },
    { name: 'All Products', path: '/solutions/industrial' },
  ];

  const industries = [
    { name: 'Oil & Gas Refining', path: '/solutions/industrial/oils' },
    { name: 'EV & Battery Manufacturing', path: '/solutions/industrial/battery' },
    { name: 'Wire Harness & Automotive', path: '/solutions/industrial/connectors' },
    { name: 'Heat Treatment', path: '/solutions/industrial/oils/heat-treatment' },
    { name: 'Precision Machining', path: '/solutions/industrial/oils/cutting-coolants' },
  ];

  const company = [
    { name: 'About MEEHAAN', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Get a Quote', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <footer aria-label="Site footer" className="w-full bg-[#FAFAF8] border-t border-[#E8E8E4]">

      {/* ── Top CTA strip ── */}
      <div className="border-b border-[#E8E8E4] bg-[#F2F2EF]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-syne font-semibold text-[16px] text-[#050805]">
            Ready to source smarter? Let's talk.
          </p>
          <div className="flex gap-3 shrink-0">
            <a
              href="mailto:sales@meehaan.com"
              className="font-dm font-medium text-[13px] text-[#050805] bg-[#F5A623] px-5 py-[10px] rounded-[4px] hover:bg-[#E09515] transition-colors"
            >
              Email Export Team
            </a>
            <Link
              to="/contact"
              className="font-dm font-medium text-[13px] text-[#050805] border border-[#E8E8E4] bg-white px-5 py-[10px] rounded-[4px] hover:border-[#050805] transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-[56px] pb-[48px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column — spans 4 */}
          <div className="sm:col-span-2 lg:col-span-4">

            {/* Logo */}
            <Link to="/" className="inline-block mb-5" aria-label="MEEHAAN Home">
              <img
                src="/meehaan_logo/MEEHAAN Logo Without Bg-01.png"
                alt="MEEHAAN Enterprise"
                style={{ height: '48px', width: 'auto' }}
              />
            </Link>

            <p className="font-mono text-[10px] tracking-[0.12em] text-[#888] uppercase mb-4">
              Industrial Precision · Global Supply
            </p>

            <p className="font-dm text-[13px] text-[#555] leading-[1.8] max-w-[300px]">
              Manufacturers of LUBO industrial oils and authorized distributors of Yazaki, Sumitomo, TE Connectivity, Molex, and 10+ global brands. Serving India's manufacturing sector since 2018.
            </p>

            {/* Contact details */}
            <address className="not-italic mt-7 space-y-[10px]">
              <a
                href="tel:+919923588450"
                className="flex items-center gap-3 font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#F5A623]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99235 88450
              </a>

              <a
                href="mailto:info@meehaan.com"
                className="flex items-center gap-3 font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#F5A623]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@meehaan.com
              </a>

              <a
                href="mailto:sales@meehaan.com"
                className="flex items-center gap-3 font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#F5A623]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                sales@meehaan.com
              </a>

              <div className="flex items-start gap-3 font-dm text-[13px] text-[#888]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-[2px] text-[#F5A623]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Gat No.1326, Unit-II, Shelarvasti,<br />Chikhali, Pune 411062, Maharashtra</span>
              </div>
            </address>

            {/* Cert badges */}
            <div className="mt-7 flex flex-wrap gap-2">
              {['ISO Certified', 'CE & REACH', 'Export Ready', 'Verified Supplier'].map(cert => (
                <span
                  key={cert}
                  className="font-mono text-[9px] uppercase tracking-[0.08em] border border-[#E8E8E4] text-[#888] px-[10px] py-[4px] rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* LUBO brand mark */}
            <div className="mt-7 flex items-center gap-3 pt-7 border-t border-[#E8E8E4]">
              <img
                src="/meehaan_logo/LUBO Logo Without Bg-01.png"
                alt="LUBO — MEEHAAN's industrial oil brand"
                style={{ height: '28px', width: 'auto', opacity: 0.6 }}
              />
              <span className="font-mono text-[10px] text-[#888] tracking-[0.06em] uppercase">Manufactured Brand</span>
            </div>
          </div>

          {/* Spacer — desktop only */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Solutions */}
          <nav aria-label="Solutions" className="lg:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#050805] font-semibold mb-5">Solutions</h3>
            <ul className="space-y-3">
              {solutions.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150 leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-label="Industries" className="lg:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#050805] font-semibold mb-5">Industries</h3>
            <ul className="space-y-3">
              {industries.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150 leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="lg:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#050805] font-semibold mb-5">Company</h3>
            <ul className="space-y-3">
              {company.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150 leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <div className="mt-8 pt-6 border-t border-[#E8E8E4]">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mb-3">Quick Inquiry</p>
              <a
                href="https://wa.me/919923588450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-dm text-[13px] text-[#555] hover:text-[#050805] transition-colors duration-150"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </nav>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#E8E8E4] bg-[#F2F2EF]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="font-mono text-[11px] text-[#888] text-center sm:text-left">
            © {year} MEEHAAN Enterprise Pvt. Ltd. · Pune, India · All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MEEHAAN on LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#E8E8E4] text-[#888] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors duration-150"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MEEHAAN on Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#E8E8E4] text-[#888] hover:border-[#E1306C] hover:text-[#E1306C] transition-colors duration-150"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919923588450"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MEEHAAN on WhatsApp"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#E8E8E4] text-[#888] hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-150"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
