import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../components/SEOHead';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const PrivacyPolicy = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly, such as name, email, phone number, and company details when you contact us, request quotes, or use our services. We also collect automatically through cookies and analytics about your device type, browser, IP address, and pages visited."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use collected information to provide and improve our services, respond to inquiries, send service-related updates, and process transactions. We do not sell your personal data to third parties. We share information only with service providers who assist in our operations under strict confidentiality."
    },
    {
      title: "3. Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data transmitted through our site is encrypted using SSL/TLS technology."
    },
    {
      title: "4. Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may opt out of marketing communications at any time. For residents of the EU, GDPR provides additional rights including the right to data portability and erasure."
    },
    {
      title: "5. Cookies and Tracking",
      content: "We use cookies to enhance user experience and analyze site traffic. You can control cookie preferences through your browser settings. We use Google Analytics and Microsoft Clarity for analytics, which may set their own cookies."
    },
    {
      title: "6. Third-Party Links",
      content: "Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information."
    },
    {
      title: "7. Data Retention",
      content: "We retain personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time."
    },
    {
      title: "8. Changes to This Policy",
      content: "We may update this privacy policy periodically. Changes will be posted on this page with an updated effective date. Your continued use of our website constitutes acceptance of the updated policy."
    },
    {
      title: "9. Contact Us",
      content: "For privacy-related questions or to exercise your rights, contact us at info@meehaan.com or +91 99235 88450. You can also write to us at Gat No.1326, Unit-II, Shelarvasti, Chikhali, Pune 411062, Maharashtra, India."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-[64px]">
      <SEOHead
        title="Privacy Policy — MEEHAAN Enterprise"
        description="MEEHAAN Enterprise privacy policy. Learn how we protect your data and personal information. Last updated May 2026."
        canonical="/privacy-policy"
        noIndex={false}
      />

      {/* HERO SECTION */}
      <section ref={heroRef} className="bg-nearBlack text-white py-[80px] px-6 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h1 className="font-syne font-bold text-5xl lg:text-[48px] leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="font-dm text-lg text-[#aaa] max-w-2xl">
              At MEEHAAN Enterprise, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information.
            </p>
            <p className="font-mono text-sm text-[#666] mt-6">
              Last updated: May 2, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-[80px] px-6 lg:px-[80px] bg-white">
        <div className="max-w-[900px] mx-auto">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10"
            >
              <h2 className="font-syne font-bold text-[22px] text-[var(--black)] mb-4">
                {section.title}
              </h2>
              <p className="font-dm text-[16px] text-[#555] leading-[1.8]">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-nearBlack text-white py-16 px-6 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-dm text-[16px] text-[#aaa] mb-6">
            Have questions about our privacy practices?
          </p>
          <p className="font-mono text-[14px] text-white">
            Contact us at <a href="mailto:info@meehaan.com" className="text-[var(--orange)] hover:underline">info@meehaan.com</a> or <a href="tel:+919923588450" className="text-[var(--orange)] hover:underline">+91 99235 88450</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
