export const SEO_BASE = {
  siteName: 'MEEHAAN Enterprise',
  baseUrl: 'https://www.meehaan.com',
  defaultDescription: 'MEEHAAN Enterprise — Industrial lubricants, automotive connectors, battery accessories, and AI-powered digital solutions for businesses in the US, UK, and globally.',
  defaultKeywords: 'industrial oils, lubricants, automotive connectors, battery accessories, AI automation agency, custom software development, MEEHAAN',
  twitterHandle: '@meehaan',
}

export const buildTitle = (pageTitle) =>
  pageTitle ? `${pageTitle} | MEEHAAN Enterprise` : 'MEEHAAN Enterprise — Industrial & Digital Solutions'

export const buildCanonical = (path) =>
  `${SEO_BASE.baseUrl}${path}`
