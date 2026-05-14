import React, { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const VerticalCTA = ({ vertical = 'industrial', isDark = false }) => {
  const verticals = {
    'oil-gas': {
      title: 'Oil & Gas Procurement',
      description: 'High-performance lubricants for refining, drilling, and petrochemical processing',
      ctaText: 'Explore Oil & Gas Solutions',
      ctaLink: '/solutions/oil-and-gas',
      whatsappMessage: 'Hi MEEHAAN, I need industrial oils for oil & gas applications. Can you provide details?',
      bgColor: isDark ? 'bg-[#1a3a3f]' : 'bg-blue-50',
      textColor: isDark ? 'text-blue-300' : 'text-blue-900',
      buttonColor: isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
    },
    'ev': {
      title: 'EV & Battery Assembly',
      description: 'Connectors, terminal blocks, and thermal management for battery pack manufacturing',
      ctaText: 'View EV Components',
      ctaLink: '/solutions/ev-battery',
      whatsappMessage: 'Hi MEEHAAN, we need battery connectors and FRP sheets for EV assembly. Send specifications.',
      bgColor: isDark ? 'bg-[#2a3a1f]' : 'bg-green-50',
      textColor: isDark ? 'text-green-300' : 'text-green-900',
      buttonColor: isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'
    },
    'industrial': {
      title: 'Industrial Manufacturing',
      description: 'Specialty oils, connectors, and lubricants for precision machinery',
      ctaText: 'Request Industrial Quote',
      ctaLink: '/solutions/industrial',
      whatsappMessage: 'Hi MEEHAAN, I need industrial lubricants and connectors for manufacturing. Please quote.',
      bgColor: isDark ? 'bg-[#3a2a1f]' : 'bg-orange-50',
      textColor: isDark ? 'text-orange-300' : 'text-orange-900',
      buttonColor: isDark ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-600 hover:bg-orange-700'
    },
    'wire-harness': {
      title: 'Wire Harness Manufacturing',
      description: 'Automotive connectors from Yazaki, TE Connectivity, and other OEM partners',
      ctaText: 'Explore Connector Options',
      ctaLink: '/solutions/industrial/connectors',
      whatsappMessage: 'Hi MEEHAAN, we need automotive connectors for wire harness manufacturing. Send catalog.',
      bgColor: isDark ? 'bg-[#2a2a3a]' : 'bg-purple-50',
      textColor: isDark ? 'text-purple-300' : 'text-purple-900',
      buttonColor: isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'
    }
  };

  const config = verticals[vertical] || verticals['industrial'];
  const whatsappLink = `https://wa.me/919923588450?text=${encodeURIComponent(config.whatsappMessage)}`;

  return (
    <div className={`${config.bgColor} rounded-lg p-6 md:p-8 border border-gray-200`}>
      <div className="max-w-2xl">
        <h3 className={`text-xl md:text-2xl font-bold ${config.textColor} mb-3 font-syne`}>
          {config.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {config.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={config.ctaLink}
            className={`${config.buttonColor} text-white px-5 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
          >
            {config.ctaText}
            <ArrowRight size={18} />
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Phone size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerticalCTA;
