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

  return (
    <div className="pt-[64px]">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={`/solutions/industrial/oils/${categoryId}`}
        ogImage={categoryData.heroImage || '/og-image.svg'}
      />
      <ProductCategorydetail {...categoryData} />
    </div>
  );
};

export default ProductCategoryPage;
