import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clientTestimonials, getFeaturedTestimonials } from '../data/clientTestimonials';

export const ClientTestimonials = ({ limit = 3, vertical = null }) => {
  const testimonials = vertical
    ? vertical === 'featured'
      ? getFeaturedTestimonials()
      : clientTestimonials.filter(t => t.vertical === vertical)
    : getFeaturedTestimonials();

  const displayedTestimonials = testimonials.slice(0, limit);

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
    "author": { "@type": "Organization", "name": t.company },
    "reviewee": { "@id": "https://www.meehaan.com/#organization" }
  }));

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            ...reviewSchema,
            {
              "@type": "Organization",
              "@id": "https://www.meehaan.com/#testimonials",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": displayedTestimonials.length,
                "reviewCount": displayedTestimonials.length,
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          ]
        })}
      </script>

      <section className="py-[72px] lg:py-[104px] bg-[#F8FAFC] border-t border-[#E8E8E4]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#F5A623] mb-3 uppercase">Client Results</p>
              <h2 className="font-syne font-bold text-[#050805] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                Trusted by India's<br />Leading Manufacturers
              </h2>
            </div>
            <p className="font-dm text-[14px] text-[#888] max-w-[320px] leading-[1.75]">
              500+ clients across oil & gas, automotive, and EV sectors trust MEEHAAN for consistent supply.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[#E8E8E4]">
            {displayedTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-white p-9 lg:p-10 flex flex-col group hover:bg-[#FAFAF8] transition-colors duration-200"
              >
                {/* Company identity */}
                <div className="flex items-start gap-3 mb-7">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.company}
                      className="h-8 w-auto object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-[#050805] rounded-[4px] flex items-center justify-center shrink-0">
                      <span className="font-syne font-bold text-[11px] text-white">
                        {testimonial.company.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-syne font-semibold text-[13px] text-[#050805] leading-tight truncate">{testimonial.company}</p>
                    <p className="font-mono text-[10px] text-[#888] tracking-[0.05em] mt-1">{testimonial.industry}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-[3px] mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 20 20" fill="#F5A623">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-dm text-[13.5px] text-[#555] leading-[1.85] flex-1 mb-7 relative pl-5 border-l-2 border-[#E8E8E4] group-hover:border-[#F5A623] transition-colors duration-300">
                  {testimonial.quote.length > 240
                    ? testimonial.quote.slice(0, 240) + '...'
                    : testimonial.quote}
                </blockquote>

                {/* Key metrics */}
                {testimonial.metrics && Object.keys(testimonial.metrics).length > 0 && (
                  <div className="border-t border-[#E8E8E4] pt-5 mb-5">
                    <p className="font-mono text-[10px] text-[#F5A623] tracking-[0.1em] uppercase mb-3">Key Results</p>
                    <div className="flex flex-col gap-2">
                      {Object.entries(testimonial.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#F5A623] shrink-0" />
                          <span className="font-dm text-[12px] text-[#555]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author footer */}
                <div className="flex items-center justify-between border-t border-[#E8E8E4] pt-5">
                  <div>
                    <p className="font-syne font-medium text-[12px] text-[#555]">{testimonial.author}</p>
                    {testimonial.yearsAsClient && (
                      <p className="font-mono text-[10px] text-[#888] mt-1">Client {testimonial.yearsAsClient}+ years</p>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-[#888] uppercase tracking-[0.06em] border border-[#E8E8E4] px-2 py-1 rounded-full">
                    {testimonial.useCase?.split('/')[0]?.trim() || testimonial.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E8E8E4]">
            <p className="font-dm text-[13px] text-[#888]">
              500+ manufacturers trust MEEHAAN for consistent supply and technical support
            </p>
            <Link
              to="/contact"
              className="font-dm font-medium text-[13px] text-[#050805] bg-[#F5A623] px-[24px] py-[10px] rounded-[4px] whitespace-nowrap hover:bg-[#E09515] transition-colors duration-200 cursor-pointer"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientTestimonials;
