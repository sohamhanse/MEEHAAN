import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductCategorydetail from '../components/ProductCategorydetail';
import productCategoryData from '../data/productCategoryData';
import SEOHead from '../components/SEOHead';

const ProductCategoryPage = () => {
  const { categoryId } = useParams();

  // Check if the requested category exists in our data
  if (!productCategoryData[categoryId]) {
    // If the category doesn't exist, redirect to the products page
    return <Navigate to="/products/oils" replace />;
  }

  const categoryData = productCategoryData[categoryId];
  const seoTitle = `${categoryData.pageTitle} | LUBO Industrial Lubricants, Pune`;
  const seoDesc = categoryData.pageDescription
    || `${categoryData.pageTitle} from MEEHAAN — LUBO-branded industrial lubricants manufactured for Indian OEMs and manufacturers.`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        'name': categoryData.pageTitle,
        'description': seoDesc,
        'url': `https://www.meehaan.com/solutions/industrial/oils/${categoryId}`,
        'image': categoryData.heroImage ? `https://www.meehaan.com${categoryData.heroImage}` : 'https://www.meehaan.com/og-image.png',
        'brand': {
          '@type': 'Brand',
          'name': 'LUBO',
        },
        'manufacturer': {
          '@type': 'Organization',
          'name': 'MEEHAAN Enterprise',
          'url': 'https://www.meehaan.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Gat No.1326, Unit-II, Shelarvasti, Chikhali',
            'addressLocality': 'Pune',
            'addressRegion': 'Maharashtra',
            'postalCode': '411062',
            'addressCountry': 'IN',
          },
        },
        'areaServed': {
          '@type': 'Country',
          'name': 'IN',
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'url': `https://www.meehaan.com/contact`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.meehaan.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Industrial', 'item': 'https://www.meehaan.com/solutions/industrial' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Oils', 'item': 'https://www.meehaan.com/solutions/industrial/oils' },
          { '@type': 'ListItem', 'position': 4, 'name': categoryData.pageTitle, 'item': `https://www.meehaan.com/solutions/industrial/oils/${categoryId}` },
        ],
      },
    ],
  };

  return (
    <div className="pt-[64px]">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={`/solutions/industrial/oils/${categoryId}`}
        ogImage={categoryData.heroImage || '/og-image.png'}
        jsonLd={productSchema}
      />
      <ProductCategorydetail {...categoryData} />
    </div>
  );
};

export default ProductCategoryPage;
