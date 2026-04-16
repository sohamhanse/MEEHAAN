import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsMobileSolutionsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const industrialLinks = [
    { name: 'Industrial Oils (LUBO)', sub: 'LUBO brand — metalworking & heat treatment', path: '/solutions/industrial/oils' },
    { name: 'Automotive Connectors', sub: 'Yazaki, Sumitomo, TE & 10+ brands', path: '/solutions/industrial/connectors' },
    { name: 'Battery Accessories', sub: 'FRP sheets, terminal blocks, assemblies', path: '/solutions/industrial/battery' },
  ];

  const digitalLinks = [
    { name: 'Software Development', sub: 'CRMs, dashboards, web apps & APIs', path: '/solutions/digital/software' },
    { name: 'AI Automation', sub: 'WhatsApp bots, lead pipelines, workflows', path: '/solutions/digital/ai' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsSolutionsOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
  };

  const linkStyle = "px-4 py-2 font-dm text-[13px] font-medium text-[var(--black)] hover:text-[var(--orange)] transition-colors duration-150 flex items-center";
  const mobileLinkStyle = "block py-3 font-syne text-[16px] font-bold border-b border-[var(--border)] transition-colors hover:text-[var(--orange)] text-[var(--black)]";

  return (
    <header
      className="fixed w-full z-50 bg-white"
      style={{
        height: '56px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center h-full" style={{ gap: '10px' }}>
            <img
              src="/meehaan_logo/MEEHAAN Logo Without Bg-01.png"
              alt="MEEHAAN"
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full">
            <NavLink to="/" className={linkStyle}>
              Home
            </NavLink>

            {/* Solutions Dropdown */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button className={`${linkStyle} cursor-pointer`}>
                Solutions
              </button>

              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 bg-white rounded-[8px] z-[100] mt-2 p-[24px]"
                    style={{
                      minWidth: '560px',
                      border: '1px solid #E8E8E4',
                      boxShadow: 'none',
                    }}
                  >
                    <div className="grid grid-cols-2 gap-0">
                      {/* Industrial Column */}
                      <div className="pr-[24px] border-r border-[#F0F0EC]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-4">
                          INDUSTRIAL
                        </p>
                        <div className="">
                          {industrialLinks.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              className="block p-[10px_12px] rounded-[4px] mb-1 border-l-2 border-transparent transition-all duration-150 hover:bg-[#FFFBF0] hover:border-l-[#F5A623] no-underline"
                            >
                              <span className="font-syne font-medium text-[14px] text-[#1A1A1A] block">{link.name}</span>
                              <span className="font-dm text-[12px] text-[#888] mt-[2px] block">{link.sub}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      {/* Digital Column */}
                      <div className="pl-[24px]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-4">
                          DIGITAL
                        </p>
                        <div className="">
                          {digitalLinks.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              className="block p-[10px_12px] rounded-[4px] mb-1 border-l-2 border-transparent transition-all duration-150 hover:bg-[#F0FDFB] hover:border-l-[#00B8A0] no-underline"
                            >
                              <span className="font-syne font-medium text-[14px] text-[#1A1A1A] block">{link.name}</span>
                              <span className="font-dm text-[12px] text-[#888] mt-[2px] block">{link.sub}</span>
                            </Link>
                          ))}
                        </div>
                        <Link to="/solutions/digital" className="block font-mono text-[11px] text-[#00B8A0] mt-4 px-[12px] hover:underline">
                          View All Digital →
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-2 border-t border-[#F0F0EC] mt-[16px] pt-[16px] flex flex-row justify-between">
                      <span className="font-mono text-[10px] text-[#888]">MEEHAAN ENTERPRISE · PUNE, INDIA</span>
                      <Link to="/solutions/industrial" className="font-mono text-[10px] text-[#F5A623] hover:underline">
                        View All Solutions →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/about" className={linkStyle}>
              About
            </NavLink>

            <NavLink to="/contact" className={linkStyle}>
              Contact
            </NavLink>

            <Link
              to="/contact"
              className="ml-6 flex items-center justify-center font-dm font-medium text-[13px] rounded-[4px] bg-[var(--black)] text-white transition-colors duration-150"
              style={{ padding: '8px 16px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--black)'}
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-[24px] h-[24px]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[64px] bg-white z-50 md:hidden overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-2">
              <NavLink to="/" className={mobileLinkStyle} onClick={() => setIsOpen(false)}>
                Home
              </NavLink>

              {/* Solutions Accordion */}
              <div className="border-b border-[var(--border)]">
                <button
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                  className="flex items-center justify-between w-full py-3 font-syne text-[18px] font-bold text-[var(--black)]"
                >
                  <span>Solutions</span>
                  <svg 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                <AnimatePresence>
                  {isMobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden static transform-none w-full border-none rounded-none pl-4 border-l-2 border-[#E8E8E4] mt-2 mb-2"
                    >
                      <div className="pb-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-4 mt-2">
                          INDUSTRIAL
                        </p>
                        {industrialLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block mb-4 pl-0 border-none"
                          >
                            <span className="font-syne text-[14px] font-bold text-[var(--black)] block mb-1">{link.name}</span>
                            <span className="font-dm text-[12px] text-[#888] block">{link.sub}</span>
                          </Link>
                        ))}

                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-4 mt-6">
                          DIGITAL
                        </p>
                        {digitalLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block mb-4 pl-0 border-none"
                          >
                            <span className="font-syne text-[14px] font-bold text-[var(--black)] block mb-1">{link.name}</span>
                            <span className="font-dm text-[12px] text-[#888] block">{link.sub}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/about" className={mobileLinkStyle} onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" className={mobileLinkStyle} onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>

              <div className="pt-8">
                <Link
                  to="/contact"
                  className="block w-full text-center font-dm font-medium text-[14px] rounded-[4px] bg-[var(--black)] text-white py-4 active:bg-[#333]"
                  onClick={() => setIsOpen(false)}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
