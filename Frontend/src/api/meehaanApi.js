// API endpoints for MEEHAAN website
const BASE_URL = "https://api.meehaan.com/v1"; // Replace with actual API URL

// Utility function for API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    
    // For development, return mock data when API fails
    if (process.env.NODE_ENV === 'development') {
      return getMockData(endpoint);
    }
    
    throw error;
  }
}

// Mock data for development
function getMockData(endpoint) {
  // Products data
  if (endpoint.includes('/products')) {
    return {
      products: [
        {
          id: 1,
          name: 'Precision Safety Valve',
          category: 'Safety Valves',
          image: '/images/products/valve1.webp',
          description: 'High-performance safety valve for critical applications',
          features: [
            'Pressure rated up to 420 bar',
            'Temperature range: -40°C to 550°C',
            'ASME certified',
            'Quick response time'
          ]
        },
        {
          id: 2,
          name: 'Industrial Control Valve',
          category: 'Control Valves',
          image: '/images/products/valve2.webp',
          description: 'Reliable control valve for industrial processes',
          features: [
            'Precise flow control',
            'Corrosion-resistant materials',
            'Low maintenance design',
            'Digital control interface'
          ]
        },
        {
          id: 3,
          name: 'High-Performance Check Valve',
          category: 'Check Valves',
          image: '/images/products/valve3.webp',
          description: 'Dependable check valve for preventing backflow',
          features: [
            'Low pressure drop',
            'Silent operation',
            'Multiple mounting positions',
            'Extended service life'
          ]
        },
        {
          id: 4,
          name: 'Advanced Ball Valve',
          category: 'Ball Valves',
          image: '/images/products/valve4.webp',
          description: 'Premium ball valve for demanding applications',
          features: [
            'Full port design',
            'Anti-static features',
            'Fire-safe certification',
            'Double block and bleed capability'
          ]
        }
      ]
    };
  }
  
  // News data
  if (endpoint.includes('/news')) {
    return {
      news: [
        {
          id: 1,
          title: 'MEEHAAN Expands Manufacturing Capabilities',
          date: '2023-11-15',
          summary: 'New facility adds 50% production capacity for high-demand valve products.',
          image: '/images/news/factory.webp'
        },
        {
          id: 2,
          title: 'New R&D Center Opens in Tokyo',
          date: '2023-09-22',
          summary: 'Research facility will focus on next-generation valve technology.',
          image: '/images/news/research.webp'
        },
        {
          id: 3,
          title: 'MEEHAAN Achieves ISO 14001 Certification',
          date: '2023-08-10',
          summary: 'Certification recognizes our commitment to environmental management.',
          image: '/images/news/certification.webp'
        }
      ]
    };
  }
  
  // Careers data
  if (endpoint.includes('/careers')) {
    return {
      careers: [
        {
          id: 1,
          title: 'Mechanical Design Engineer',
          location: 'Mumbai, India',
          department: 'Engineering',
          type: 'Full-time'
        },
        {
          id: 2,
          title: 'Quality Assurance Specialist',
          location: 'Frankfurt, Germany',
          department: 'Manufacturing',
          type: 'Full-time'
        },
        {
          id: 3,
          title: 'Sales Manager - Industrial Valves',
          location: 'Dubai, UAE',
          department: 'Sales',
          type: 'Full-time'
        },
        {
          id: 4,
          title: 'Supply Chain Analyst',
          location: 'Chicago, USA',
          department: 'Operations',
          type: 'Full-time'
        }
      ]
    };
  }
  
  // Projects data
  if (endpoint.includes('/projects')) {
    return {
      projects: [
        {
          id: 1,
          title: 'Major Oil & Gas Pipeline Project',
          client: 'International Energy Corporation',
          location: 'Middle East',
          year: 2023,
          description: 'Supplied critical safety and control valves for a 1,200km pipeline project.'
        },
        {
          id: 2,
          title: 'Nuclear Power Plant Safety Systems',
          client: 'National Power Generation',
          location: 'Europe',
          year: 2022,
          description: 'Provided specialized safety valves meeting the highest nuclear industry standards.'
        },
        {
          id: 3,
          title: 'Petrochemical Plant Modernization',
          client: 'Global Chemicals Ltd',
          location: 'Asia',
          year: 2023,
          description: 'Comprehensive valve system upgrade improving efficiency and safety metrics.'
        }
      ]
    };
  }
  
  // Testimonials data
  if (endpoint.includes('/testimonials')) {
    return {
      testimonials: [
        {
          id: 1,
          name: 'John Smith',
          title: 'Chief Engineer',
          company: 'Global Energy Solutions',
          quote: "MEEHAAN valves have consistently outperformed competitors in our high-pressure applications. Their technical support is unmatched in the industry.",
          image: '/images/testimonials/person1.webp'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          title: 'Procurement Director',
          company: 'Pacific Manufacturing',
          quote: "We've reduced maintenance costs by 30% since standardizing on MEEHAAN products throughout our facilities.",
          image: '/images/testimonials/person2.webp'
        },
        {
          id: 3,
          name: 'David Chen',
          title: 'Operations Manager',
          company: 'Eastern Chemical Processing',
          quote: "The reliability of MEEHAAN valves has been crucial to maintaining our safety record and minimizing downtime.",
          image: '/images/testimonials/person3.webp'
        }
      ]
    };
  }
  
  // Default empty response
  return {};
}

// API service methods
const meehaanApi = {
  // Products
  getProducts: () => apiRequest('/products'),
  getProductById: (id) => apiRequest(`/products/${id}`),
  getProductsByCategory: (category) => apiRequest(`/products?category=${category}`),
  
  // Company info
  getCompanyInfo: () => apiRequest('/company'),
  getTeamMembers: () => apiRequest('/team'),
  
  // News and updates
  getNews: () => apiRequest('/news'),
  getNewsById: (id) => apiRequest(`/news/${id}`),
  
  // Career opportunities
  getCareers: () => apiRequest('/careers'),
  applyForPosition: (positionId, applicationData) => 
    apiRequest(`/careers/${positionId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData)
    }),
  
  // Projects and case studies
  getProjects: () => apiRequest('/projects'),
  getProjectById: (id) => apiRequest(`/projects/${id}`),
  
  // Testimonials
  getTestimonials: () => apiRequest('/testimonials'),
  
  // Contact
  submitContactForm: (formData) => 
    apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
};

export default meehaanApi; 