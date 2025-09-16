import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductCategorydetail from '../components/ProductCategorydetail';
import productCategoryData from '../data/productCategoryData';

const ProductCategoryPage = () => {
  const { categoryId } = useParams();
  
  // Check if the requested category exists in our data
  if (!productCategoryData[categoryId]) {
    // If the category doesn't exist, redirect to the products page
    return <Navigate to="/products/oils" replace />;
  }
  
  // Get the data for this category
  const categoryData = productCategoryData[categoryId];
  
  return <ProductCategorydetail {...categoryData} />;
};

export default ProductCategoryPage; 