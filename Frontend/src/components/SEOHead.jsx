import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_BASE, buildTitle, buildCanonical } from '../utils/seo';

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/favicon.svg',
  ogType = 'website',
  noIndex = false,
}) => {
  const fullTitle = buildTitle(title);
  const fullDescription = description || SEO_BASE.defaultDescription;
  const fullKeywords = keywords || SEO_BASE.defaultKeywords;
  const fullCanonical = canonical ? buildCanonical(canonical) : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {!noIndex && <meta name="robots" content="index,follow" />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={SEO_BASE.baseUrl + ogImage} />
      <meta property="og:site_name" content={SEO_BASE.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={SEO_BASE.baseUrl + ogImage} />
    </Helmet>
  );
};

export default SEOHead;
