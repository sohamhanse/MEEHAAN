import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import batteryData from '../../data/batteryData';

const category = batteryData.categories[0];
const subcategories = category.subcategories;

const formatKey = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// Fields handled specially in the detail panel (skip in generic render)
const HANDLED_FIELDS = new Set(['id', 'name', 'images', 'image', 'description', 'tags']);

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Chip-style list for short string arrays
const ChipList = ({ items }) => (
  <div className="flex flex-wrap gap-[8px] mt-[12px]">
    {items.map((it, i) => (
      <span key={i} className="font-dm text-[12px] text-[#555] border border-[var(--border)] bg-[var(--warm-white)] px-[12px] py-[6px] rounded-full">
        {String(it)}
      </span>
    ))}
  </div>
);

// Bullet list for longer strings (advantages/limitations/applications descriptions)
const BulletList = ({ items }) => (
  <ul className="mt-[12px] space-y-[8px]">
    {items.map((it, i) => (
      <li key={i} className="font-dm text-[13px] text-[#555] leading-[1.6] pl-[18px] relative">
        <span className="absolute left-0 top-[8px] w-[6px] h-[6px] bg-[var(--orange)] rounded-full" />
        {String(it)}
      </li>
    ))}
  </ul>
);

// Key-value table for flat objects (also supports nested objects rendered inline)
const KeyValueTable = ({ obj }) => {
  const entries = Object.entries(obj);
  return (
    <div className="border border-[var(--border)] rounded-[4px] overflow-hidden mt-[12px]">
      {entries.map(([k, v], index) => {
        let displayValue;
        if (v === null || v === undefined) {
          displayValue = '—';
        } else if (Array.isArray(v)) {
          displayValue = v.every(i => !isPlainObject(i)) ? v.join(', ') : JSON.stringify(v);
        } else if (isPlainObject(v)) {
          displayValue = (
            <div className="space-y-1">
              {Object.entries(v).map(([sk, sv]) => (
                <div key={sk} className="flex gap-2">
                  <span className="font-mono text-[10px] text-[#AAA] shrink-0">{formatKey(sk)}:</span>
                  <span>{typeof sv === 'object' ? JSON.stringify(sv) : String(sv)}</span>
                </div>
              ))}
            </div>
          );
        } else {
          displayValue = String(v);
        }
        return (
          <div key={k} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--warm-white)]'} p-[10px_16px]`}>
            <div className="w-[40%] font-mono text-[11px] text-[#888] capitalize pr-2">{formatKey(k)}</div>
            <div className="w-[60%] font-dm text-[13px] text-[var(--black)] break-words">{displayValue}</div>
          </div>
        );
      })}
    </div>
  );
};

// Render a single top-level field as a section
const FieldSection = ({ fieldKey, value }) => {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value) && value.length === 0) return null;
  if (isPlainObject(value) && Object.keys(value).length === 0) return null;

  const title = formatKey(fieldKey);

  // Plain string/number → simple labeled paragraph
  if (typeof value === 'string' || typeof value === 'number') {
    return (
      <div className="mt-[24px]">
        <p className="font-mono text-[11px] text-[#888] tracking-[0.1em] uppercase">{title}</p>
        <p className="font-dm text-[14px] text-[#555] leading-[1.6] mt-2">{String(value)}</p>
      </div>
    );
  }

  // Array
  if (Array.isArray(value)) {
    const allPrimitive = value.every(i => typeof i === 'string' || typeof i === 'number');
    if (allPrimitive) {
      // Heuristic: long strings → bullet list; short → chips
      const avgLen = value.reduce((a, s) => a + String(s).length, 0) / value.length;
      return (
        <div className="mt-[24px]">
          <p className="font-mono text-[11px] text-[#888] tracking-[0.1em] uppercase">{title}</p>
          {avgLen > 40 ? <BulletList items={value} /> : <ChipList items={value} />}
        </div>
      );
    }
    // Array of objects → render each as a mini table
    return (
      <div className="mt-[24px]">
        <p className="font-mono text-[11px] text-[#888] tracking-[0.1em] uppercase">{title}</p>
        <div className="space-y-[12px] mt-[12px]">
          {value.map((item, i) => (
            <KeyValueTable key={i} obj={isPlainObject(item) ? item : { value: item }} />
          ))}
        </div>
      </div>
    );
  }

  // Object → key-value table (flat or nested)
  if (isPlainObject(value)) {
    return (
      <div className="mt-[24px]">
        <p className="font-mono text-[11px] text-[#888] tracking-[0.1em] uppercase">{title}</p>
        <KeyValueTable obj={value} />
      </div>
    );
  }

  return null;
};

const SubIcon = ({ id, active }) => {
  const color = active ? '#F5A623' : '#888';
  switch (id) {
    case 'epoxy-sheets':
    case 'epoxy-frp-sheets':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="5" width="16" height="3" fill={color}/>
          <rect x="2" y="10" width="20" height="3" fill={color}/>
          <rect x="6" y="15" width="12" height="3" fill={color}/>
        </svg>
      );
    case 'terminal-blocks':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="7" width="18" height="12" fill="transparent" stroke={color} strokeWidth="2"/>
          <line x1="9" y1="7" x2="9" y2="19" stroke={color} strokeWidth="2"/>
          <line x1="15" y1="7" x2="15" y2="19" stroke={color} strokeWidth="2"/>
          <circle cx="6" cy="5" r="1.5" fill={color}/>
          <circle cx="12" cy="5" r="1.5" fill={color}/>
          <circle cx="18" cy="5" r="1.5" fill={color}/>
        </svg>
      );
    case 'anderson-connectors':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="7" width="11" height="10" rx="1" fill="transparent" stroke={color} strokeWidth="2"/>
          <path d="M16 10H20V11H16V10Z" fill={color}/>
          <path d="M16 13H20V14H16V13Z" fill={color}/>
        </svg>
      );
    case 'pg-glands':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* hex nut body */}
          <path d="M7 5L15 5L19 9L19 15L15 19L7 19L3 15L3 9L7 5Z" stroke={color} strokeWidth="1.8" fill="transparent" strokeLinejoin="round"/>
          {/* threaded cable shank */}
          <line x1="19" y1="10.5" x2="22" y2="10.5" stroke={color} strokeWidth="1.4"/>
          <line x1="19" y1="13.5" x2="22" y2="13.5" stroke={color} strokeWidth="1.4"/>
          {/* cable hole */}
          <circle cx="11" cy="12" r="2.2" fill={color}/>
        </svg>
      );
    case 'degson-connectors':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" stroke={color} strokeWidth="2" fill="transparent"/>
          <path d="M13 7L9 13H13L11 17L15 11H11L13 7Z" fill={color}/>
        </svg>
      );
    default: return null;
  }
};

const BatteryMarketplace = () => {
  const { subcategoryId, productId } = useParams();
  const navigate = useNavigate();

  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSubs, setExpandedSubs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');

  // Mobile state check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync state with URL params
  useEffect(() => {
    if (subcategoryId) {
      const foundSub = subcategories.find(s => s.id === subcategoryId);
      if (foundSub) {
        setActiveSubcategory(foundSub);
        setExpandedSubs(prev => ({ ...prev, [foundSub.id]: true }));

        if (productId) {
          const p = foundSub.products.find(prod => prod.id === productId);
          setActiveProduct(p || null);
        } else {
          setActiveProduct(null);
        }
      } else {
        setActiveSubcategory(null);
        setActiveProduct(null);
      }
    } else {
      // No subcategory in URL — don't auto-select anything
      setActiveSubcategory(null);
      setActiveProduct(null);
    }
  }, [subcategoryId, productId]);

  const handleSubcategoryClick = (sub) => {
    setActiveSubcategory(sub);
    setActiveProduct(null);
    setSearchTerm('');
    setExpandedSubs(prev => ({ ...prev, [sub.id]: !prev[sub.id] }));
    navigate('/solutions/industrial/battery/' + sub.id);
  };

  const handleProductClick = (product, parentSub) => {
    const targetSub = parentSub || activeSubcategory;
    setActiveSubcategory(targetSub);
    setActiveProduct(product);
    setSelectedImageIndex(0);
    setExpandedSubs(prev => ({ ...prev, [targetSub.id]: true }));
    navigate('/solutions/industrial/battery/' + targetSub.id + '/' + product.id);
  };

  const handleCloseProduct = () => {
    setActiveProduct(null);
    navigate('/solutions/industrial/battery/' + activeSubcategory.id);
  };

  const filteredSidebarSubs = subcategories.filter(sub => 
    sub.name.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const filteredProducts = activeSubcategory?.products.filter(p => {
    const q = searchTerm.toLowerCase();
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      (p.also_known_as && p.also_known_as.some(t => t.toLowerCase().includes(q)))
    );
  }) || [];

  const totalProducts = subcategories.reduce((a, s) => a + (s.products?.length || 0), 0);

  const getGridTemplateColumns = () => {
    if (isMobile) return '1fr';
    if (activeProduct) return '260px 1fr 480px';
    return '260px 1fr';
  };

  return (
    <div className="bg-[var(--warm-white)] h-[100dvh] overflow-hidden pt-[64px] flex flex-col">
      {/* ── TOP HEADER BAR ── */}
      <div className="bg-white border-b border-[var(--border)] px-[20px] lg:px-[32px] h-[72px] flex items-center justify-between shrink-0">
        <div className="flex flex-col justify-center">
          <div className="font-mono text-[11px] text-[#888] flex items-center gap-2">
            <Link to="/solutions/industrial" className="text-[#888] hover:text-[var(--orange)] transition-colors">
              Industrial Solutions
            </Link>
            <span className="text-[#CCC]">/</span>
            <span className="text-[var(--black)] font-medium">Battery Accessories</span>
          </div>
          <div className="hidden md:flex items-baseline gap-3 mt-1">
            <h1 className="font-syne font-bold text-[22px] text-[var(--black)] leading-none">Battery Accessories</h1>
            <span className="font-dm text-[13px] text-[#888] leading-none">Select a category from the left to browse products</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-mono text-[11px] text-[#888]">{totalProducts} Products</span>
          <Link 
            to="/contact"
            className="bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[13px] px-[18px] py-[8px] rounded-[4px] hover:bg-[#e09600] transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      {/* ── MOBILE TABS (replaces sidebar on small screens) ── */}
      {isMobile && (
        <div className="bg-white border-b border-[var(--border)] overflow-x-auto whitespace-nowrap flex shrink-0">
          {subcategories.map(sub => {
            const isActive = activeSubcategory?.id === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub)}
                className={`font-dm text-[13px] px-[16px] py-[12px] border-b-2 transition-colors ${
                  isActive 
                  ? 'border-[var(--orange)] text-[var(--orange)]' 
                  : 'border-transparent text-[#888] hover:text-[var(--black)]'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      )}

      {/* ── THREE-COLUMN BODY ── */}
      <div 
        className="flex-1 w-full overflow-hidden"
        style={{
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: getGridTemplateColumns(),
          transition: 'grid-template-columns 350ms ease',
          height: 'calc(100vh - 136px)' // 100vh - 64px(nav) - 72px(header)
        }}
      >
        {/* ── LEFT SIDEBAR (Desktop Only) ── */}
        {!isMobile && (
          <div className="w-full h-full overflow-y-auto bg-white border-r border-[var(--border)] flex flex-col">
            <div className="p-[20px_20px_0]">
              <p className="font-mono text-[11px] text-[#888] tracking-[0.1em] uppercase">CATEGORIES</p>
            </div>
            
            <div className="p-[12px_16px]">
              <div className="relative">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-[12px] top-[11px] text-[#888]">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={sidebarSearch}
                  onChange={e => setSidebarSearch(e.target.value)}
                  className="w-full h-[36px] border border-[var(--border)] rounded-[4px] bg-[var(--warm-white)] pl-[32px] pr-[12px] font-dm text-[13px] text-[var(--black)] focus:outline-none focus:border-[var(--orange)] placeholder-[#888]"
                />
              </div>
            </div>

            <div className="p-[8px_0_24px] flex-1">
              {filteredSidebarSubs.map(sub => {
                const isActive = activeSubcategory?.id === sub.id;
                const isExpanded = expandedSubs[sub.id];

                return (
                  <div key={sub.id}>
                    {/* SUBCATEGORY ROW */}
                    <div 
                      onClick={() => handleSubcategoryClick(sub)}
                      className={`flex items-center justify-between p-[10px_20px] cursor-pointer transition-colors duration-150 border-l-[3px] ${
                        isActive 
                        ? 'bg-[#FFF8EC] border-[var(--orange)] pl-[17px]' 
                        : 'border-transparent hover:bg-[#F9F9F7] pl-[20px]'
                      }`}
                    >
                      <div className="flex items-center gap-[10px]">
                        <SubIcon id={sub.id} active={isActive} />
                        <span className={`font-dm text-[14px] ${isActive ? 'text-[var(--black)] font-medium' : 'text-[#555]'}`}>
                          {sub.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#888]">{sub.products?.length || 0}</span>
                        <svg 
                          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          className={`text-[#888] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>

                    {/* PRODUCT LIST (Expanded) */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="p-[4px_0_8px]">
                            {sub.products.map(p => {
                              const isProdActive = activeProduct?.id === p.id;
                              return (
                                <div
                                  key={p.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductClick(p, sub);
                                  }}
                                  className={`p-[8px_20px_8px_44px] cursor-pointer transition-colors duration-150 font-dm text-[13px] leading-[1.3] ${
                                    isProdActive
                                    ? 'bg-[var(--black)] text-white'
                                    : 'hover:bg-[#F5F5F0] text-[#555]'
                                  }`}
                                >
                                  {p.name}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CENTER PRODUCT LIST PANEL ── */}
        <div 
          className="w-full h-full overflow-y-auto bg-[var(--warm-white)] flex flex-col relative"
          style={{ display: isMobile && activeProduct ? 'none' : 'flex' }}
        >
          {/* Panel header */}
          <div className="sticky top-0 z-10 bg-white border-b border-[var(--border)] p-[20px] lg:p-[20px_32px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
            <div>
              <h2 className="font-syne font-semibold text-[18px] text-[var(--black)]">
                {activeSubcategory ? activeSubcategory.name : 'Select a category'}
              </h2>
              {activeSubcategory && (
                <p className="font-dm text-[13px] text-[#888] mt-1">
                  {filteredProducts.length} products
                </p>
              )}
            </div>

            {activeSubcategory && (
              <div className="relative w-full sm:w-[240px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-[12px] top-[11px] text-[#888]">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full h-[36px] border border-[var(--border)] rounded-[4px] bg-white pl-[36px] pr-[12px] font-dm text-[13px] text-[var(--black)] focus:outline-none focus:border-[var(--orange)]"
                />
              </div>
            )}
          </div>

          {/* Products List */}
          <div className="p-[20px] lg:p-[24px_32px] flex-1">
            {!activeSubcategory ? (
              <div className="flex flex-col items-center justify-center p-[80px_20px] text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8E8E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <p className="font-dm text-[16px] text-[#888] mt-4">Select a category to view products</p>
              </div>
            ) : filteredProducts.length === 0 && searchTerm ? (
              <div className="text-center p-[40px_20px]">
                <p className="font-dm text-[14px] text-[#888]">No products matching "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="font-dm text-[13px] text-[var(--orange)] mt-2 hover:underline"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              filteredProducts.map((p, index) => {
                const isProdActive = activeProduct?.id === p.id;
                // Get up to 3 quick specs: prefer `attributes`, else scan top-level primitives
                const getQuickSpecs = () => {
                  if (p.attributes && Object.keys(p.attributes).length) {
                    return Object.entries(p.attributes)
                      .filter(([_, v]) => typeof v === 'string' || typeof v === 'number')
                      .slice(0, 3);
                  }
                  const preferred = ['standard', 'color', 'machinability', 'also_known_as'];
                  const picks = [];
                  for (const key of preferred) {
                    if (p[key] == null) continue;
                    const val = Array.isArray(p[key]) ? p[key].slice(0, 2).join(', ') : p[key];
                    if (typeof val === 'string' || typeof val === 'number') picks.push([key, val]);
                    if (picks.length === 3) break;
                  }
                  return picks;
                };
                const productSpecs = getQuickSpecs();

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    onClick={() => handleProductClick(p)}
                    className={`block bg-white border rounded-[4px] mb-[12px] p-[20px] lg:p-[24px_28px] flex flex-col sm:flex-row sm:items-center gap-[24px] cursor-pointer transition-all duration-150 group ${
                      isProdActive 
                      ? 'border-[var(--orange)] border-l-[3px] bg-[#FFFCF5] -ml-[2px]' 
                      : 'border-[var(--border)] hover:border-[#D0D0C8] hover:bg-[#FDFDFB]'
                    }`}
                  >
                    {/* Placeholder Logic / Categorical SVG block */}
                    <div className="w-[80px] h-[80px] shrink-0 bg-[#F5F5F0] border border-[var(--border)] rounded-[4px] overflow-hidden flex items-center justify-center group-hover:border-[#D0D0C8] transition-colors">
                      {p.image || (p.images && p.images.length > 0) ? (
                        <img src={p.image || p.images[0]} alt={p.name} className="w-full h-full object-cover mix-blend-multiply" />
                      ) : (
                        <div className="opacity-30 flex items-center justify-center scale-150">
                          <SubIcon id={activeSubcategory.id} active={false} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-syne font-semibold text-[16px] text-[var(--black)] leading-[1.3] truncate">
                        {p.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {(p.tags || []).slice(0, 3).map(tag => (
                          <span key={tag} className="font-mono text-[10px] text-[#888] border border-[var(--border)] bg-[var(--warm-white)] px-[8px] py-[2px] rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="font-dm text-[13px] text-[#888] mt-2.5 leading-[1.5] line-clamp-2">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-[16px] mt-3">
                        {productSpecs.map(([k, v]) => (
                          <div key={k} className="flex flex-col">
                            <span className="font-mono text-[10px] text-[#AAA] capitalize">{formatKey(k)}</span>
                            <span className="font-dm font-medium text-[13px] text-[var(--black)]">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hidden sm:flex shrink-0 flex-col items-end justify-center w-[120px]">
                      <span className="font-dm font-medium text-[13px] text-[var(--orange)] flex items-center transition-transform duration-150 group-hover:translate-x-1">
                        View Details →
                      </span>
                      <span className="font-mono text-[10px] text-[#CCC] mt-2">
                        Click for full specs
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT PRODUCT DETAIL PANEL (Or Fullscreen Mobile Overlay) ── */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div 
              initial={isMobile ? { y: '100%', opacity: 0 } : { x: 480, opacity: 0 }}
              animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={isMobile ? { y: '100%', opacity: 0 } : { x: 480, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={
                isMobile 
                  ? "fixed inset-0 z-[100] bg-white overflow-y-auto flex flex-col"
                  : "w-full h-full bg-white border-l border-[var(--border)] flex flex-col shrink-0 overflow-y-auto"
              }
            >
              {/* PANEL HEADER */}
              <div className="bg-[var(--black)] p-[24px_28px] relative shrink-0">
                {isMobile ? (
                  <button 
                    onClick={handleCloseProduct}
                    className="mb-4 flex items-center gap-2 font-dm text-[14px] text-white hover:text-[var(--orange)]"
                  >
                    ← Back to products
                  </button>
                ) : (
                  <button 
                    onClick={handleCloseProduct}
                    className="absolute top-[20px] right-[20px] w-[32px] h-[32px] bg-[#2A2A2A] rounded-[4px] flex items-center justify-center font-dm text-[18px] text-[#888] hover:bg-[#333] hover:text-white transition-colors"
                  >
                    ×
                  </button>
                )}

                <div className="pr-[40px] md:pr-0">
                  {(activeProduct.tags || []).slice(0, 2).map(t => (
                    <span key={t} className="inline-block font-mono text-[10px] text-[#888] border border-[#333] bg-transparent px-[10px] py-[3px] rounded-full mr-1.5 mb-2">
                      {t}
                    </span>
                  ))}
                  <h2 className="font-syne font-bold text-[20px] text-white mt-1 leading-[1.2] pr-[10px]">
                    {activeProduct.name}
                  </h2>
                </div>
              </div>

              {/* PANEL BODY */}
              <div className="p-[28px] flex-1">
                {/* IMAGE GALLERY */}
                {activeProduct.images && activeProduct.images.length > 0 && (
                  <div className="mb-[28px]">
                    <div className="w-full h-[240px] bg-[#F5F5F0] rounded-[4px] border border-[var(--border)] overflow-hidden flex items-center justify-center">
                       <img src={activeProduct.images[selectedImageIndex] || activeProduct.images[0]} alt={activeProduct.name} className="w-full h-full object-contain mix-blend-multiply p-4" />
                    </div>
                    {activeProduct.images.length > 1 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
                         {activeProduct.images.map((img, i) => (
                           <div 
                             key={i} 
                             onClick={() => setSelectedImageIndex(i)}
                             className={`w-[60px] h-[60px] shrink-0 border rounded-[4px] overflow-hidden cursor-pointer bg-[#F5F5F0] transition-colors ${selectedImageIndex === i ? 'border-[var(--orange)]' : 'border-[var(--border)] hover:border-[#D0D0C8]'}`}
                           >
                              <img src={img} className="w-full h-full object-contain mix-blend-multiply p-1" />
                           </div>
                         ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Fallback to single image if multiple images not defined */}
                {!activeProduct.images && activeProduct.image && (
                  <div className="mb-[28px]">
                    <div className="w-full h-[240px] bg-[#F5F5F0] rounded-[4px] border border-[var(--border)] overflow-hidden flex items-center justify-center">
                       <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-full object-contain mix-blend-multiply p-4" />
                    </div>
                  </div>
                )}
                {activeProduct.description && (
                  <div>
                    <p className="font-mono text-[11px] text-[var(--orange)] tracking-[0.1em] uppercase">DESCRIPTION</p>
                    <p className="font-dm text-[14px] text-[#555] leading-[1.75] mt-2.5">
                      {activeProduct.description}
                    </p>
                  </div>
                )}

                {Object.entries(activeProduct)
                  .filter(([k]) => !HANDLED_FIELDS.has(k))
                  .map(([k, v]) => (
                    <FieldSection key={k} fieldKey={k} value={v} />
                  ))}
              </div>

              {/* PANEL FOOTER (Sticky) */}
              <div className="bg-white border-t border-[var(--border)] p-[20px_28px] shrink-0 sticky bottom-0">
                <Link 
                  to={`/contact?product=${activeProduct.id}&name=${encodeURIComponent(activeProduct.name)}`}
                  className="block w-full bg-[var(--orange)] text-[var(--black)] font-dm font-medium text-[14px] text-center p-[13px] rounded-[4px] hover:bg-[#e09600] transition-colors"
                >
                  Request a Quote
                </Link>

                <a 
                  href={`https://wa.me/919923588450?text=Hi,%20I%20need%20a%20quote%20for%20${encodeURIComponent(activeProduct.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full border-[1.5px] border-[var(--border)] bg-transparent text-[#555] font-dm text-[13px] p-[10px] rounded-[4px] flex items-center justify-center gap-2 hover:border-[#25D366] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M12.01 2.011a10 10 0 0 0-8.52 15.26L2 22l4.87-1.42A10 10 0 1 0 12.01 2.011zm5.17 11.45c-.28.84-1.28 1.48-2.12 1.63-.64.12-1.42.3-3.61-.59-2.73-1.1-4.49-3.92-4.63-4.11-.14-.2-1.12-1.51-1.12-2.88s.72-2.03.97-2.29c.25-.26.54-.33.72-.33.19 0 .37 0 .53.01.17.01.41-.06.63.48.23.54.73 1.79.8 1.93.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.32.37-.45.5-.15.15-.31.31-.13.62.18.31.81 1.35 1.76 2.19 1.22 1.09 2.25 1.43 2.56 1.58.3.15.48.12.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.13.08.77-.2 1.61z"/>
                  </svg>
                  WhatsApp Enquiry
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BatteryMarketplace;
