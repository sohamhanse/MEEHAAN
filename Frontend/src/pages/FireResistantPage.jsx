import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MdLocalFireDepartment, MdSecurity, MdStars, MdExpandMore, MdExpandLess } from 'react-icons/md';

const FireResistantPage = () => {
  const [expandedSeries, setExpandedSeries] = useState('HFC');

  const toggleExpand = (series) => {
    setExpandedSeries(expandedSeries === series ? '' : series);
  };

  const productSeries = [
    {
      id: 'HFC',
      title: 'Water-Glycol Fluids (HFC)',
      image: 'https://images.unsplash.com/photo-1617769355559-9117be05166a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Water-based fluids containing water, glycol, and additives that provide good fire resistance due to their high water content.',
      features: [
        'Excellent fire resistance properties',
        'Good low-temperature performance',
        'Typically 35-45% water content',
        'Compatible with most standard seals and paints'
      ],
      applications: [
        'Steel mills and foundries',
        'Die-casting machines',
        'Forging presses',
        'Areas with significant fire hazards'
      ]
    },
    {
      id: 'HFD',
      title: 'Synthetic Anhydrous Fluids (HFD)',
      image: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Water-free synthetic fluids based on phosphate esters or other synthetic compounds.',
      features: [
        'Excellent fire resistance and high-temperature stability',
        'Long service life and superior oxidation resistance',
        'Ideal for high-temperature applications',
        'Require special seal compatibility considerations'
      ],
      applications: [
        'Gas turbines',
        'Mining equipment',
        'Power generation systems',
        'Applications requiring maximum fire resistance and long service life'
      ]
    },
    {
      id: 'HFB',
      title: 'Water-in-Oil Emulsions (HFB)',
      image: 'https://images.unsplash.com/photo-1584727638110-71acd74a747b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Fine dispersions of water droplets in mineral oil, typically containing 40% water.',
      features: [
        'Moderate fire resistance',
        'Better lubrication properties than pure water-based fluids',
        'More economical option',
        'Require regular maintenance to maintain emulsion stability'
      ],
      applications: [
        'General industrial hydraulic systems',
        'Moderate fire-risk applications',
        'Cost-sensitive operations',
        'Where performance/economy balance is needed'
      ]
    },
    {
      id: 'HFA',
      title: 'High Water Content Fluids (HFA)',
      image: 'https://images.unsplash.com/photo-1583651682050-9a3cd11ea432?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Containing 80-98% water with additives for corrosion protection and lubrication.',
      features: [
        'Maximum fire resistance',
        'Limited to low-pressure systems',
        'Economical solution for specific applications',
        'Requires corrosion-resistant system components'
      ],
      applications: [
        'Mining hydraulic equipment',
        'Hot metal working operations',
        'Applications with extreme fire hazards',
        'Low-pressure hydraulic systems'
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <Helmet>
        <title>Fire Resistant Hydraulic Fluids | Mehaan</title>
        <meta name="description" content="Discover Mehaan's premium fire-resistant hydraulic fluids designed for high-risk environments where conventional oils pose ignition hazards." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-12 bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1578663533742-caa10aba3e75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Industrial hydraulic system in operation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Fire Resistant Hydraulic Fluids</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Advanced fire-resistant hydraulic fluids that offer exceptional protection against ignition while maintaining superior hydraulic performance.
            </p>
          </div>
        </div>
      </div>

      {/* About Fire Resistant Fluids Section - Full Width */}
      <div className="w-full bg-gray-50 dark:bg-gray-800 py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">About Fire Resistant Hydraulic Fluids</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/20 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-secondary/20 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1541984605461-59425fcdb3bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Industrial hydraulic system" 
                className="rounded-lg w-full h-auto object-cover shadow-xl"
              />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Fire-resistant hydraulic fluids are specialized formulations designed to minimize the risk of fire in hydraulic systems operating in high-risk environments. They provide a crucial safety element in industries where conventional mineral oil-based fluids could pose significant ignition hazards.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                While not fireproof, these fluids are engineered to resist ignition and minimize flame propagation under certain conditions. They feature higher auto-ignition temperatures than conventional mineral oils, reduced heat release rates when burning, and self-extinguishing properties when the ignition source is removed.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                MEHAAN offers several types of fire-resistant hydraulic fluids, each formulated to meet specific operational requirements while providing enhanced safety. Beyond fire resistance, these specialized fluids offer additional benefits including reduced risk of fire-related injuries and equipment damage, decreased downtime from fire incidents, and in many cases, improved environmental profiles.
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
              <h3 className="text-xl font-semibold mb-2">Superior Fire Resistance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Engineered to resist ignition and minimize flame propagation in high-temperature and high-pressure environments.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MdSecurity className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enhanced Safety Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reduces risk in operations near heat sources, open flames, or where hydraulic fluid leakage could contact hot surfaces.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MdStars className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Performance Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Maintains excellent hydraulic efficiency, component protection, and system cleanliness while providing fire resistance.
              </p>
            </div>
          </div>
        </div>

        {/* Product Range */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Fire Resistant Fluid Types</h2>
          
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
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {series.description}
                        </p>
                        
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

export default FireResistantPage; 