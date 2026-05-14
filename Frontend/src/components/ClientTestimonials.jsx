import React from 'react';
import { clientTestimonials, getFeaturedTestimonials } from '../data/clientTestimonials';

/**
 * ClientTestimonials Component
 * Displays featured client testimonials with metrics and ratings
 * Includes schema markup for SEO (Review + AggregateRating)
 */
export const ClientTestimonials = ({ limit = 3, vertical = null }) => {
  // Get testimonials: either featured or filtered by vertical
  const testimonials = vertical
    ? vertical === 'featured'
      ? getFeaturedTestimonials()
      : clientTestimonials.filter(t => t.vertical === vertical)
    : getFeaturedTestimonials();

  // Apply limit
  const displayedTestimonials = testimonials.slice(0, limit);

  // Generate Review schema for each testimonial
  const reviewSchema = displayedTestimonials.map(t => ({
    "@type": "Review",
    "@id": `https://www.meehaan.com/#review-${t.id}`,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": t.quote,
    "author": {
      "@type": "Organization",
      "name": t.company
    },
    "reviewee": {
      "@id": "https://www.meehaan.com/#organization"
    }
  }));

  // Generate AggregateRating schema
  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": displayedTestimonials.length,
    "reviewCount": displayedTestimonials.length,
    "bestRating": "5",
    "worstRating": "1"
  };

  return (
    <>
      {/* Schema markup - add to page head via Helmet or SEOHead */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            ...reviewSchema,
            {
              "@type": "Organization",
              "@id": "https://www.meehaan.com/#testimonials",
              "name": "MEEHAAN Enterprise - Client Testimonials",
              "aggregateRating": aggregateRating
            }
          ]
        })}
      </script>

      {/* Testimonials Grid */}
      <section className="py-16 px-6 lg:px-[80px] bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
              Trusted by Leading Manufacturers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how MEEHAAN's industrial solutions have improved operations for 500+ clients across manufacturing, heat treatment, and EV sectors.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                {/* Company Logo or Initials Fallback */}
                <div className="mb-6 h-12 flex items-center">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.company}
                      className="max-h-12 max-w-[150px] object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.company
                          .split(' ')
                          .slice(0, 2)
                          .map(word => word[0])
                          .join('')
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-slate-500 ml-2">{testimonial.rating}.0</span>
                </div>

                {/* Quote */}
                <blockquote className="text-slate-700 mb-6 leading-relaxed text-sm lg:text-base">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics (if available) */}
                {testimonial.metrics && Object.keys(testimonial.metrics).length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs font-semibold text-blue-900 mb-2 uppercase">Key Results</p>
                    <ul className="space-y-1 text-xs text-blue-800">
                      {Object.entries(testimonial.metrics)
                        .slice(0, 3) // Show top 3 metrics
                        .map(([key, value]) => (
                          <li key={key} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">✓</span>
                            <span>{value}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Author Info */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-slate-900 text-sm">{testimonial.author}</p>
                  <p className="text-slate-600 text-xs">{testimonial.company}</p>
                  <p className="text-slate-500 text-xs">{testimonial.industry}</p>
                  {testimonial.yearsAsClient && (
                    <p className="text-slate-500 text-xs mt-1">Client since {testimonial.yearsAsClient}</p>
                  )}
                </div>

                {/* Product/Service Tag */}
                {testimonial.productUsed && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Used</p>
                    <div className="flex flex-wrap gap-2">
                      {testimonial.productUsed.split(',').map((product, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded"
                        >
                          {product.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Ready to improve your operations?</p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientTestimonials;
