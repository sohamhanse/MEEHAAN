import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import meehaanApi from '../api/meehaanApi';

const ContactForm = ({ initialSubject = "" }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: initialSubject,
    message: '',
    agreeToTerms: false
  });
  
  // Update subject when prop changes
  useEffect(() => {
    if (initialSubject) {
      setFormData(prev => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);
  
  // Form status state
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Company validation (optional)
    
    // Phone validation (optional but if provided, validate format)
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Submit form
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      await meehaanApi.submitContactForm(formData);
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        agreeToTerms: false
      });
      
      setStatus({ submitting: false, success: true, error: null });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        submitting: false, 
        success: false, 
        error: 'Failed to send message. Please try again or contact us directly.'
      });
    }
  };
  
  const inputStyle = (hasError) => `w-full px-[14px] py-[10px] bg-[#FAFAF8] border rounded-[4px] font-dm text-[13px] text-[#1A1A1A] focus:outline-none focus:bg-white transition-colors ${
    hasError 
    ? 'border-[#E24B4A] focus:border-[#E24B4A] bg-[#FFF8F8]' 
    : 'border-[#E8E8E4] focus:border-[#F5A623]'
  }`;

  const labelStyle = "block font-mono text-[11px] text-[#888] tracking-[0.08em] uppercase mb-[6px]";
  const errorStyle = "mt-1 text-[11px] font-dm text-[#E24B4A]";

  return (
    <div className="p-0">
      {/* Success message */}
      {status.success && (
        <motion.div 
          className="mb-6 bg-[#F0FBF8] border border-[#00B8A0] rounded-[4px] p-4 flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[#00B8A0]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="font-dm text-[13px] text-[#1A1A1A]">
              Thank you for your message! Our team will contact you shortly.
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Error message */}
      {status.error && (
        <motion.div 
          className="mb-6 bg-[#FDF3F3] border border-[#E24B4A] rounded-[4px] p-4 flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[#E24B4A]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="font-dm text-[13px] text-[#1A1A1A]">{status.error}</p>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-1">
            <label htmlFor="name" className={labelStyle}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputStyle(errors.name)}
              placeholder="John Doe"
            />
            {errors.name && <p className={errorStyle}>{errors.name}</p>}
          </div>
          
          {/* Email */}
          <div className="col-span-1">
            <label htmlFor="email" className={labelStyle}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle(errors.email)}
              placeholder="johndoe@example.com"
            />
            {errors.email && <p className={errorStyle}>{errors.email}</p>}
          </div>
          
          {/* Company */}
          <div className="col-span-1">
            <label htmlFor="company" className={labelStyle}>
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputStyle(false)}
              placeholder="ABC Corporation"
            />
          </div>
          
          {/* Phone */}
          <div className="col-span-1">
            <label htmlFor="phone" className={labelStyle}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle(errors.phone)}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className={errorStyle}>{errors.phone}</p>}
          </div>
          
          {/* Subject */}
          <div className="col-span-full">
            <label htmlFor="subject" className={labelStyle}>
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={inputStyle(errors.subject)}
              placeholder="Product Inquiry"
            />
            {errors.subject && <p className={errorStyle}>{errors.subject}</p>}
          </div>
          
          {/* Message */}
          <div className="col-span-full">
            <label htmlFor="message" className={labelStyle}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={inputStyle(errors.message)}
              placeholder="Please provide details about your inquiry or requirements..."
            ></textarea>
            {errors.message && <p className={errorStyle}>{errors.message}</p>}
          </div>
          
          {/* Terms agreement */}
          <div className="col-span-full">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#F5A623] cursor-pointer"
                />
              </div>
              <div className="ml-3 font-dm text-[12px] text-[#888]">
                <label htmlFor="agreeToTerms" className="cursor-pointer">
                  I agree to the <a href="/privacy-policy" className="text-[#F5A623] hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-[#F5A623] hover:underline">Terms of Service</a> *
                </label>
                {errors.agreeToTerms && <p className={errorStyle}>{errors.agreeToTerms}</p>}
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={status.submitting}
            className="w-full bg-[#F5A623] hover:bg-[#e09600] text-[#1A1A1A] font-dm font-medium text-[14px] px-[13px] py-[13px] rounded-[4px] border-none cursor-pointer transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1A1A1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;