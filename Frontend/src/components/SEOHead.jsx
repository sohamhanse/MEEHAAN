import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_BASE, buildTitle, buildCanonical } from '../utils/seo';

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.svg',
  ogType = 'website',
  noIndex = false,
  jsonLd,
}) => {
  const fullTitle = buildTitle(title);
  const fullDescription = description || SEO_BASE.defaultDescription;
  const fullKeywords = keywords || SEO_BASE.defaultKeywords;
  const fullCanonical = canonical ? buildCanonical(canonical) : null;
  const absoluteOgImage = ogImage && ogImage.startsWith('http')
    ? ogImage
    : SEO_BASE.baseUrl + ogImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="MEEHAAN Enterprise" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_BASE.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_BASE.twitterHandle} />
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
