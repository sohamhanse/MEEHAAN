import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_BASE, buildTitle, buildCanonical } from '../utils/seo';

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = '/og-image.svg',
  ogType = 'website',
  noIndex = false,
  jsonLd,
}) => {
  const fullTitle = buildTitle(title);
  const fullDescription = description || SEO_BASE.defaultDescription;
  const fullCanonical = canonical ? buildCanonical(canonical) : null;
  const absoluteOgImage = ogImage && ogImage.startsWith('http')
    ? ogImage
    : SEO_BASE.baseUrl + ogImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:site_name" content={SEO_BASE.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
