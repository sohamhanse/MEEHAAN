import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MdExpandMore, MdExpandLess, MdLocalFireDepartment, MdWaterDrop, MdSecurity, MdStars } from 'react-icons/md';

// Map of icon names to actual icon components
const iconMap = {
  MdLocalFireDepartment: MdLocalFireDepartment,
  MdWaterDrop: MdWaterDrop,
  MdSecurity: MdSecurity,
  MdStars: MdStars
};

const ProductCategoryPage = ({ 
  pageTitle, 
  pageDescription, 
  heroImage, 
  heroAlt, 
  aboutTitle, 
  aboutContent, 
  aboutImage, 
  keyFeatures, 
  productSeries,
  productRangeTitle = "Product Range" 
}) => {
  const [expandedSeries, setExpandedSeries] = useState(productSeries?.[0]?.id || '');

  const toggleExpand = (series) => {
    setExpandedSeries(expandedSeries === series ? '' : series);
  };

  // Function to render the icon component based on the icon name
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-12 w-12 text-primary mb-4" /> : null;
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <Helmet>
        <title>{pageTitle} | Mehaan</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-12 bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </div>
        </div>
      </div>

      {/* About Section - Full Width */}
      <div className="w-full bg-gray-50 dark:bg-gray-800 py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">{aboutTitle}</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/20 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-secondary/20 -z-10"></div>
              <img 
                src={aboutImage} 
                alt={pageTitle} 
                className="rounded-lg w-full h-auto object-cover shadow-xl"
              />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              {typeof aboutContent === 'string' ? (
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {aboutContent}
                </p>
              ) : (
                aboutContent.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Key Features</h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${keyFeatures.length === 5 ? 'md:grid-rows-3' : 'md:grid-rows-2'}`}>
            {keyFeatures.map((feature, index) => {
              // Determine the class based on feature count and index
              let positionClass = "";
              
              if (keyFeatures.length === 4 && index === 3) {
                // If 4 features, center the 4th one in the middle
                positionClass = "md:col-start-2 md:col-span-1 md:row-start-2";
              } else if (keyFeatures.length === 5) {
                if (index === 2) {
                  // Middle feature centered in the second row
                  positionClass = "md:col-start-2 md:col-span-1 md:row-start-2";
                } else if (index === 3) {
                  // 4th feature on the left of the third row
                  positionClass = "md:col-start-1 md:col-span-1 md:row-start-3";
                } else if (index === 4) {
                  // 5th feature on the right of the third row
                  positionClass = "md:col-start-3 md:col-span-1 md:row-start-3";
                }
              }
              
              return (
                <div 
                  key={index} 
                  className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-t-4 border-primary ${positionClass}`}
                >
                  <h3 className="text-xl font-bold mb-3 text-primary dark:text-primary-light">
                    {feature.title}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-light mb-4 rounded-full"></div>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Range */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{productRangeTitle}</h2>
          
          <div className="space-y-4">
            {productSeries.map((series) => (
              <div key={series.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div 
                  className={`flex items-center justify-between p-4 cursor-pointer ${
                    expandedSeries === series.id 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                  onClick={() => toggleExpand(series.id)}
                >
                  <h3 className="text-xl font-semibold">{series.title}</h3>
                  {expandedSeries === series.id ? (
                    <MdExpandLess className="h-6 w-6" />
                  ) : (
                    <MdExpandMore className="h-6 w-6" />
                  )}
                </div>
                
                {expandedSeries === series.id && (
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={series.image} 
                          alt={series.title} 
                          className="rounded-lg object-cover w-full h-48"
                        />
                      </div>
                      <div className="md:w-3/4">
                        {series.description && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {series.description}
                          </p>
                        )}
                        
                        {series.features && series.applications && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-primary dark:text-primary-light mb-2">
                                Key Features
                              </h4>
                              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-2">
                                {series.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-primary dark:text-primary-light mb-2">
                                Applications
                              </h4>
                              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-2">
                                {series.applications.map((application, index) => (
                                  <li key={index}>{application}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        
                        {series.products && (
                          <ul className="space-y-4">
                            {series.products.map((product, index) => (
                              <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                                <h4 className="font-semibold text-primary dark:text-primary-light mb-1">
                                  {product.name}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {product.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Need More Information?</h2>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            Contact our technical team for detailed product information and application guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-md shadow-md transition duration-300"
            >
              Contact Us
            </Link>
            <Link 
              to="/products/oils" 
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-md transition duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage; 