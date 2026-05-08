export const SEO_BASE = {
  siteName: 'MEEHAAN Enterprise',
  baseUrl: 'https://www.meehaan.com',
  defaultDescription: 'MEEHAAN Enterprise — Pune-based supplier of LUBO industrial lubricants, automotive connectors, battery accessories, and AI-powered digital solutions for Indian manufacturers and global businesses.',
  defaultKeywords: 'industrial oils, lubricants, automotive connectors, battery accessories, AI automation agency, custom software development, MEEHAAN, Pune',
  twitterHandle: '@meehaan',
}

export const DIGITAL_SEO_BASE = {
  siteName: 'MEEHAAN Digital',
  baseUrl: 'https://digital.meehaan.com',
  defaultDescription: 'MEEHAAN Digital builds custom AI agents, workflow automation, and software for US and UK businesses. Fixed-price proposals in 48 hours. Live in under 14 days.',
  defaultKeywords: 'AI automation agency, custom AI agents, workflow automation, AI software development, business automation, MEEHAAN digital',
  twitterHandle: '@meehaan',
}

export const IS_DIGITAL_SITE = import.meta.env.VITE_SITE === 'digital';

export const digitalPath = (subpath = '/') => {
  const clean = subpath === '/' ? '' : (subpath.startsWith('/') ? subpath : `/${subpath}`);
  return IS_DIGITAL_SITE ? (clean || '/') : `/solutions/digital${clean}`;
};

export const buildTitle = (pageTitle) =>
  pageTitle ? `${pageTitle} | MEEHAAN Enterprise` : 'MEEHAAN Enterprise — Industrial & Digital Solutions'

export const buildCanonical = (path) =>
  `${SEO_BASE.baseUrl}${path}`
