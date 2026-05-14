export const clientTestimonials = [
  {
    id: 1,
    company: "US AUTOCONTROLS PRIVATE LIMITED",
    location: "India",
    industry: "CNC Job Work / Precision Machining",
    role: "Director",
    quote: "Before working with MEEHAAN, we were facing high tooling costs, inconsistent machining quality, and frequent coolant replacement in our CNC job work operations. After switching to their cutting oils and metalworking fluids, our tool life improved by nearly 30%, coolant consumption reduced significantly, and machine downtime became much lower. We also noticed better surface finish quality and faster production turnaround, which directly improved our delivery timelines for clients.",
    author: "Director",
    imageUrl: null, // Logo not available - will show "UA" badge instead
    metrics: {
      toolLifeImprovement: "30%",
      coolantConsumptionReduction: "Significant",
      machineDowntime: "Much lower",
      quality: "Better surface finish",
      turnaround: "Faster production cycles"
    },
    productUsed: "Cutting oils, Metalworking fluids",
    yearsAsClient: "2+",
    rating: 5,
    ratingCount: 1,
    featured: true,
    useCase: "CNC Machining / Job Work"
  },
  {
    id: 2,
    company: "Bharat Gears Ltd.",
    location: "India",
    industry: "Heat Treatment / Automotive Components",
    role: "Plant Head",
    quote: "Our heat treatment plant was struggling with quenching inconsistency, higher rejection rates, and increased oil replacement costs. MEEHAAN helped us optimize the entire process with the right heat treatment oils and technical guidance. The result was lower component distortion, improved hardness consistency, reduced rejection during inspection, and better furnace efficiency. This helped us reduce operational cost while improving overall product quality for automotive and industrial customers.",
    author: "Plant Head",
    imageUrl: "/images/clients/bharat-gears-logo.svg", // Add company logo
    metrics: {
      rejectionRate: "Reduced during inspection",
      distortion: "Lower component distortion",
      hardnessConsistency: "Improved",
      furnaceEfficiency: "Better",
      operationalCost: "Reduced"
    },
    productUsed: "Heat treatment oils",
    yearsAsClient: "2+",
    rating: 5,
    ratingCount: 1,
    featured: true,
    useCase: "Heat Treatment / Hardening",
    oilGasFriendly: true // Can use for O&G landing (heat treatment for O&G equipment)
  },
  {
    id: 3,
    company: "NEURON ENERGY PVT LTD",
    location: "India",
    industry: "Lithium-Ion Battery Manufacturing",
    role: "Global Supply Chain Manager",
    quote: "In lithium-ion battery manufacturing, production delays and connector failures can affect the entire assembly line. MEEHAAN supplied reliable battery connectors and industrial solutions that improved assembly stability and reduced interruptions during production. We experienced smoother production flow, fewer maintenance-related stoppages, and faster dispatch cycles. Their support team also helped us reduce procurement lead time by ensuring consistent product availability during high-demand periods.",
    author: "Global Supply Chain Manager",
    imageUrl: "/images/clients/neuron-energy-logo.svg", // Add company logo
    metrics: {
      assemblyStability: "Improved",
      productionInterruptions: "Reduced",
      maintenanceStoppages: "Fewer",
      dispatchCycles: "Faster",
      procurementLeadTime: "Reduced"
    },
    productUsed: "Battery connectors, Industrial solutions",
    yearsAsClient: "2+",
    rating: 5,
    ratingCount: 1,
    featured: true,
    useCase: "EV / Battery Manufacturing",
    evFriendly: true // Feature on EV/Battery landing page
  }
];

/**
 * Helper function to get featured testimonials (for homepage/contact page)
 */
export const getFeaturedTestimonials = () => {
  return clientTestimonials.filter(t => t.featured);
};

/**
 * Helper function to get testimonials by industry/vertical
 */
export const getTestimonialsByVertical = (vertical) => {
  const verticalMap = {
    'heat-treatment': (t) => t.useCase === 'Heat Treatment / Hardening',
    'ev-battery': (t) => t.evFriendly || t.useCase === 'EV / Battery Manufacturing',
    'oil-gas': (t) => t.oilGasFriendly,
    'machining': (t) => t.useCase === 'CNC Machining / Job Work'
  };

  const filter = verticalMap[vertical];
  return filter ? clientTestimonials.filter(filter) : [];
};
