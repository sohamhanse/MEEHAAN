export const SEO_BASE = {
  siteName: 'MEEHAAN Enterprise',
  baseUrl: 'https://www.meehaan.com',
  defaultDescription: 'MEEHAAN Enterprise — Industrial lubricants, automotive connectors, battery accessories, and digital solutions for modern India.',
  defaultKeywords: 'industrial oils, lubricants, automotive connectors, battery accessories, LUBO oils, MEEHAAN, Pune, Maharashtra',
  twitterHandle: '@meehaan',
}

export const buildTitle = (pageTitle) =>
  pageTitle ? `${pageTitle} | MEEHAAN Enterprise` : 'MEEHAAN Enterprise — Industrial & Digital Solutions'

export const buildCanonical = (path) =>
  `${SEO_BASE.baseUrl}${path}`
