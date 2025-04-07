import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MdLocalFireDepartment, MdWaterDrop, MdSecurity, MdExpandMore, MdExpandLess } from 'react-icons/md';

const HeatTreatmentPage = () => {
  const [expandedSeries, setExpandedSeries] = useState('HIQUENCH');

  const toggleExpand = (series) => {
    setExpandedSeries(expandedSeries === series ? '' : series);
  };

  const productSeries = [
    {
      id: 'HIQUENCH',
      title: 'HIQUENCH Series of Cold Quenching Oils',
      image: 'https://images.unsplash.com/photo-1603575258692-da742e2229e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      products: [
        {
          name: 'NORMAL SPEED OILS',
          description: 'for tool steels and general applications such as semi-finished products and forged pieces, principally of alloy steels.'
        },
        {
          name: 'MEDIUM SPEED OILS',
          description: 'most preferred oil of heat treaters particularly for alloy, tool and die-steel grades because of its low viscosity and long tank life.'
        },
        {
          name: 'MEDIUM FAST SPEED OILS',
          description: 'for alloy steels, fasteners, carburised parts with good evaporation stability, suitable for use in open and sealed quench furnaces.'
        },
        {
          name: 'FAST SPEED OILS',
          description: 'for lean alloy steels, heavy section parts, plain carbon steel, bearing steels and carburising grades of steels, having high evaporation stability and rapid breakdown of vapour blanket for high cooling capacity.'
        },
        {
          name: 'ULTRA FAST SPEED OILS',
          description: 'for special steel grades and end use applications with high evaporation stability.'
        },
        {
          name: 'WATER WASHABLE QUENCHING OILS',
          description: 'containing advanced additive packages with water wash-off characteristics.'
        },
        {
          name: 'SPECIALTY QUENCHING OILS',
          description: 'customised to suit specific performance parameters.'
        }
      ]
    },
    {
      id: 'HIQUENCH-MT',
      title: 'HIQUENCH MT Series – Hot Quenching Oils',
      image: 'https://images.unsplash.com/photo-1624397630702-659c236ad34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      products: [
        {
          name: 'MARQUENCHING OILS',
          description: 'High-performance hot quenching with excellent aging stability. Ensures good hardening efficiency, distortion control, and long service life. Suitable for both sealed quench furnaces and open tank applications.'
        },
        {
          name: 'MARTEMPERING OILS',
          description: 'Designed for oil tempering of parts. Provides good aging stability across various application temperatures.'
        },
        {
          name: 'SPECIALTY OILS',
          description: 'Customized to meet advanced and sophisticated application requirements.'
        }
      ]
    },
    {
      id: 'HIQUENCH-P',
      title: 'HIQUENCH P Series – Polymer Quenchants',
      image: 'https://images.unsplash.com/photo-1606594120440-33533399b6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      products: [
        {
          name: 'POLYMER QUENCHANTS',
          description: 'Developed with selected polymers for extended service life. Used in induction/flame hardening, tank quenching, and aluminum sheet treatment.'
        },
        {
          name: 'INVERSE SOLUBILITY TYPE POLYMER QUENCHANTS',
          description: 'Ideal for quenching forgings of low-alloy and plain carbon steels, steel castings, and carburized parts. Used in the hardening of hand tools, high-pressure cylinders, and seamless tubes.'
        },
        {
          name: 'UP-CONCENTRATION TYPE POLYMER QUENCHANTS',
          description: 'Applied in quenching open die-forged components like turbine shafts, seamless rolled rings, valve bodies, and die steels.'
        }
      ]
    },
    {
      id: 'HICARB',
      title: 'HICARB Series – Carburizing Chemicals',
      image: 'https://images.unsplash.com/photo-1517656718131-ce102c5fe32c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      products: [
        {
          name: 'CARBURIZING FLUIDS',
          description: 'Free of hazardous chemicals, ensuring high-performance carburizing.'
        },
        {
          name: 'CARBURIZING (CYANIDE) SALTS',
          description: 'Provides high stability and consistent results.'
        },
        {
          name: 'CARBURIZING (NON-CYANIDE) SALTS',
          description: 'Maintains a neutral start-up condition, allowing cyanide addition as needed.'
        }
      ]
    },
    {
      id: 'HISALT',
      title: 'HISALT Series – Heat Treatment Salts',
      image: 'https://images.unsplash.com/photo-1603575258818-7f6fa3c110f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      products: [
        {
          name: 'NEUTRAL HARDENING SALTS',
          description: 'Used for pre-heating, austenizing, and quenching high-speed steels.'
        },
        {
          name: 'AUSTEMPERING SALTS',
          description: 'Designed for tempering and drawing various steels, including spring steels.'
        },
        {
          name: 'WATER ADDITIVE SALTS',
          description: 'Ensures accelerated quenching for maximum hardness in plain carbon steels.'
        },
        {
          name: 'BLACKENING SALTS',
          description: 'Provides surface finishing after heat treatment.'
        },
        {
          name: 'BLUEING SALTS',
          description: 'Enhances aesthetics for tools, band saws, and hack saws.'
        },
        {
          name: 'SALT BATH COVER',
          description: 'Prevents oxidation in salt baths at high temperatures.'
        },
        {
          name: 'SALT BATH RECTIFIER',
          description: 'Prevents surface decarburization and maintains bath purity.'
        }
      ]
    },
    {
      id: 'VACUQUENCH',
      title: 'VACUQUENCH Series – Vacuum Quenching Oils',
      image: 'https://images.unsplash.com/photo-1589486417815-4757a421d266?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      products: [
        {
          name: 'VACUUM QUENCHING OILS',
          description: 'High resistance to vaporization with low gas absorption capacity. Rapid de-gassing capability ensures spotlessly clean surfaces. Designed for superior performance in vacuum quenching applications.'
        }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <Helmet>
        <title>Heat Treatment Oils | Mehaan</title>
        <meta name="description" content="Discover Mehaan's premium range of heat treatment oils designed for consistent metallurgical properties, reduced distortion, and extended bath life." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-12 bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/Products/Oil/Heat_Treatment.jpg"
            alt="Heat treatment process in metallurgical factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Heat Treatment Oils</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Advanced quenching oils and processing fluids engineered for optimal heat treatment performance across a wide range of applications.
            </p>
          </div>
        </div>
      </div>

      {/* About Quenching Oil Section - Full Width */}
      <div className="w-full bg-gray-50 dark:bg-gray-800 py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">About Heat Treatment & Quenching Oils</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/20 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-secondary/20 -z-10"></div>
              <img 
                src="/images/Products/Oil/Heat_Treatment.jpg" 
                alt="Metal heat treatment process" 
                className="rounded-lg w-full h-auto object-cover shadow-xl"
              />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Heat treatment quenching oils are specialized fluids designed to rapidly or controllably cool heated metal components to achieve desired metallurgical properties. The cooling rate during quenching is critical in determining the final hardness, strength, and other mechanical properties of the metal.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Our quenching oils are formulated with premium base oils and advanced additives, providing superior performance across a wide range of applications. The diverse range of quenching speeds – from normal to ultra-fast – allows precise control over the cooling process to achieve optimal results for different metal types and component geometries.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                MEHAAN's heat treatment oils offer numerous advantages over water or generic oils, including consistent hardening results, minimized cracking and distortion, longer service life, and better control of cooling rates for different metals and component sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MdLocalFireDepartment className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Precise Cooling Control</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Engineered cooling curves for predictable and consistent metallurgical properties across various component sizes.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MdWaterDrop className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Superior Oxidation Stability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Formulated with premium base oils and advanced additives to ensure extended bath life and reduced maintenance costs.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MdSecurity className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Minimized Distortion</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Precisely controlled quenching speed to minimize component distortion and reduce post-treatment operations.
              </p>
            </div>
          </div>
        </div>

        {/* Product Range */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Product Range</h2>
          
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

export default HeatTreatmentPage; 