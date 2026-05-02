export const CASE_STUDIES = [
  {
    id: 1,
    title: "Franchise Operations Streamlined with Voice AI",
    client: "Multi-Location Franchise Network",
    industry: "Franchise Operations / Hospitality",
    problem: "Multi-location franchise was losing 30-40% of inbound leads because calls went unanswered after hours and on weekends. No single platform could coordinate call handling across all locations.",
    solution: "Deployed Voice Intake Concierge across all 12 franchise locations simultaneously. Calls are now answered 24/7 with AI voice that qualifies leads, handles intake, and routes to appropriate managers.",
    results: [
      "Zero missed calls across all locations",
      "Lead capture increased by 35%",
      "No new headcount required",
      "First response time: < 2 seconds"
    ],
    testimonial: "We went from losing leads to capturing every single call. The AI sounds like a trained staff member, and it never misses a shift.",
    timeline: "14 days from discovery to full deployment"
  },
  {
    id: 2,
    title: "Accounting Firm Consolidated Tool Stack with CaFlow",
    client: "Mid-Sized US CPA Firm",
    industry: "Professional Services / Accounting",
    problem: "Firm was managing 100 clients across four disconnected tools (TaxDome, Dext, SmartVault, QuickBooks). Document collection was manual, deadline tracking was scattered, and data had to be moved between systems by hand.",
    solution: "Replaced entire fragmented stack with CaFlow. Documents now arrive via structured email sequences, compliance deadlines are tracked centrally, and data flows directly into QuickBooks.",
    results: [
      "Reduced tool stack from 4 to 1 (savings: $150+/user/month)",
      "Document collection time cut by 50%",
      "Zero manual data entry between systems",
      "Grew client base to 140 without adding staff"
    ],
    testimonial: "CaFlow replaced a year-long pain point with a single platform. Tax season is no longer a scramble.",
    timeline: "21 days to full implementation"
  },
  {
    id: 3,
    title: "E-Commerce Platform Launched in 7 Days",
    client: "Direct-to-Consumer Wellness Brand",
    industry: "E-Commerce / Retail",
    problem: "Brand needed a professional website in 2-3 weeks due to a market opportunity. Traditional web development was quoting 4-6 months and $40K.",
    solution: "Used Website Builder AI to generate a fully coded, fully styled e-commerce site from brand guidelines and product catalog. Site was deployed, SEO-configured, and payment processing was live in 7 days.",
    results: [
      "Launched in 7 days (vs. traditional 4-6 months)",
      "Cost 80% less than traditional web development",
      "Site already optimized for search and mobile",
      "Iteration takes hours instead of sprints"
    ],
    testimonial: "We captured a market window we thought we'd missed. The AI built something we could iterate on immediately.",
    timeline: "7 days from brief to production"
  }
];

export function getCaseStudyById(id) {
  return CASE_STUDIES.find((cs) => cs.id === id) || null;
}

export function getAllCaseStudies() {
  return CASE_STUDIES;
}
