export const SEO_BASE = {
  siteName: 'MEEHAAN Enterprise',
  baseUrl: 'https://www.meehaan.com',
  defaultDescription: 'MEEHAAN Enterprise — Pune-based supplier of LUBO industrial lubricants, automotive connectors, and battery accessories for manufacturers worldwide.',
  defaultKeywords: 'industrial oils, lubricants, automotive connectors, battery accessories, MEEHAAN, Pune, manufacturing',
  twitterHandle: '@meehaan',
}

export const buildTitle = (pageTitle) =>
  pageTitle ? `${pageTitle} | MEEHAAN Enterprise` : 'MEEHAAN Enterprise — Industrial Solutions'

export const buildCanonical = (path) =>
  `${SEO_BASE.baseUrl}${path}`
