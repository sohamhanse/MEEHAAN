import { Link } from 'react-router-dom';

const Footer = () => {
  const industrialLinks = [
    { name: 'Industrial Oils (LUBO)', path: '/solutions/industrial/oils' },
    { name: 'Automotive Connectors', path: '/solutions/industrial/connectors' },
    { name: 'Battery Accessories', path: '/solutions/industrial/battery' },
  ];

  const digitalLinks = [
    { name: 'Software Development', path: '/solutions/digital/software' },
    { name: 'AI Automation', path: '/solutions/digital/ai' },
  ];

  const companyLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <footer className="w-full" style={{ backgroundColor: 'var(--black)', borderTop: '1px solid #2A2A2A', paddingTop: '48px', paddingBottom: '28px', paddingLeft: '48px', paddingRight: '48px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12" style={{ gap: '32px' }}>
          
          {/* Brand Column (30% approx ~ col-span-4) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center" style={{ gap: '8px' }}>
              <img
                src="/meehaan_logo/MEEHAAN Logo Without Bg-01.png"
                alt="MEEHAAN"
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              />
              <span className="font-syne font-bold text-[var(--black)] text-[16px] tracking-wide">
                MEEHAAN
              </span>
            </Link>
            <p className="font-dm text-[13px] mt-4" style={{ color: '#666', lineHeight: 1.7 }}>
              Industrial Precision. Digital Intelligence.
            </p>
            
            <div className="mt-6 space-y-1">
              <p className="flex items-start gap-2 font-dm text-[12px]" style={{ color: '#555', lineHeight: '2' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Gat No.1326, Unit-II, Shelarvasti, Chikhali, Pune 411062</span>
              </p>
              <p className="flex items-center gap-2 font-dm text-[12px]" style={{ color: '#555', lineHeight: '2' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+919923588450" className="hover:text-white transition-colors duration-150 transform hover:translate-x-1 w-max block">+91 99235 88450</a>
              </p>
              <p className="flex items-center gap-2 font-dm text-[12px]" style={{ color: '#555', lineHeight: '2' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:info@meehaan.com" className="hover:text-white transition-colors duration-150 transform hover:translate-x-1 w-max block">info@meehaan.com</a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-1"></div>

          {/* Industrial Solutions */}
          <div className="lg:col-span-2 mt-4 lg:mt-0">
            <h3 className="font-syne font-mono text-[11px] uppercase tracking-[0.1em] mb-4" style={{ color: '#444' }}>
              Industrial Solutions
            </h3>
            <ul className="space-y-0">
              {industrialLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm text-[13px] hover:text-white transition-colors duration-150 block"
                    style={{ color: '#555', lineHeight: '2.4' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Digital Solutions */}
          <div className="lg:col-span-3 mt-4 lg:mt-0">
            <h3 className="font-syne font-mono text-[11px] uppercase tracking-[0.1em] mb-4" style={{ color: '#444' }}>
              Digital Solutions
            </h3>
            <ul className="space-y-0">
              {digitalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm text-[13px] hover:text-white transition-colors duration-150 block w-max"
                    style={{ color: '#555', lineHeight: '2.4' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 mt-4 lg:mt-0">
            <h3 className="font-syne font-mono text-[11px] uppercase tracking-[0.1em] mb-4" style={{ color: '#444' }}>
              Company
            </h3>
            <ul className="space-y-0">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm text-[13px] hover:text-white transition-colors duration-150 block w-max"
                    style={{ color: '#555', lineHeight: '2.4' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6" style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid #2A2A2A' }}>
          <p className="font-mono text-[12px]" style={{ color: '#444' }}>
            © {new Date().getFullYear()} MEEHAAN Enterprise. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex items-center justify-center rounded-full transition-colors duration-150"
              style={{ width: '36px', height: '36px', border: '1px solid #333' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#333'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#555] group-hover:text-[var(--orange)] transition-colors duration-150">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group flex items-center justify-center rounded-full transition-colors duration-150"
              style={{ width: '36px', height: '36px', border: '1px solid #333' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#333'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#555] group-hover:text-[var(--orange)] transition-colors duration-150">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a
              href="https://wa.me/919923588450"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group flex items-center justify-center rounded-full transition-colors duration-150"
              style={{ width: '36px', height: '36px', border: '1px solid #333' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#333'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#555] group-hover:text-[var(--orange)] transition-colors duration-150">
                 <path d="M11.42 21.8c-1.3-.01-2.58-.33-3.75-.92l-.27-.14-3.9 1.02 1.05-3.8-.16-.25c-2.31-3.6-1.57-8.39 1.76-11.17a8.55 8.55 0 0 1 11.4 0c1.71 1.43 2.65 3.52 2.65 5.76A8.51 8.51 0 0 1 16.5 21a8.4 8.4 0 0 1-5.08 1.01h.02l-.02-.21zM5.53 17.5l.48.28c1.65.98 3.54 1.5 5.48 1.5 5.56 0 10.08-4.52 10.08-10.08S17.05 4.12 11.5 4.12C5.94 4.12 1.42 8.64 1.42 14.2c0 2 .53 3.96 1.55 5.62l.3.49-1.2 4.36 4.46-1.17z"></path>
                 <path d="M15.42 13.9c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.62.14-.18.28-.7 .88-.86 1.06-.16.18-.32.21-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.28-.02-.43.12-.56.12-.12.27-.32.41-.48.14-.16.18-.28.27-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.48-.62-.48h-.53c-.18 0-.48.07-.72.34-.25.28-.93.91-.93 2.22 0 1.31.95 2.58 1.09 2.76.14.18 1.88 2.87 4.55 4.02 2.01.87 2.37.88 2.8.84.42-.04 1.35-.55 1.54-1.08.19-.53.19-.98.14-1.08-.06-.09-.23-.14-.5-.28z"></path>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;