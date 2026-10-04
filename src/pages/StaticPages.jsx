import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  ArrowRight,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AboutPage = ({ onExplore }) => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>ESTABLISHED IN THE HEART OF TEXTILE TRADITIONS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark mb-4">
            The Story of Saideep Collection
          </h1>
          <div className="w-16 h-1 bg-brand-red mx-auto rounded-full mb-6" />
          <p className="text-base text-gray-600 leading-relaxed">
            Where generations of Indian textile heritage meet the sharp tailored sensibilities of contemporary luxury.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-16 aspect-[21/9] relative">
          <img
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85"
            alt="Saideep Collection Workshop"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent flex items-end p-8">
            <span className="text-white font-serif text-xl sm:text-2xl font-bold">
              “Every stitch tells a story of Indian heritage and dignity.”
            </span>
          </div>
        </div>

        {/* Story Narrative */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200/80 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark">
            Fashion Made For Every Occasion
          </h2>
          <p>
            Founded with a vision to redefine Indian fashion, <strong>Saideep Collection</strong> brings together the finest handloom fabrics, intricate zardozi, gota patti embroidery, and precision modern tailoring. We cater to the discerning individual who appreciates traditional grandeur without sacrificing everyday comfort.
          </p>
          <p>
            From our signature Egyptian cotton shirts and breathable linen kurtas to majestic wedding sherwanis and designer festive sets, every garment undergoes 18 distinct quality inspection checkpoints before reaching your wardrobe.
          </p>
          <p>
            We take immense pride in supporting artisanal weaving communities across Gujarat, Rajasthan, and Varanasi, preserving indigenous textile legacies while equipping them for global appreciation.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <span className="text-3xl font-bold font-serif text-brand-red block mb-1">100%</span>
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Natural Pure Fibers</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <span className="text-3xl font-bold font-serif text-brand-gold block mb-1">25,000+</span>
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Happy Patrons Across India</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <span className="text-3xl font-bold font-serif text-brand-dark block mb-1">7-Day</span>
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Hassle-Free Doorstep Exchange</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onExplore}
            className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded-xl shadow-xl shadow-brand-red/30 transition-all inline-flex items-center gap-2"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export const ContactPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      title: 'Message Received',
      message: 'Thank you for reaching out. Our concierge will get back to you within 4 hours.',
      type: 'success',
    });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-red">
            CONNECT WITH SAIDEEP
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark mt-1">
            Contact & Client Concierge
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Have questions about styling, bespoke orders, or order status? We are always here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-brand-dark text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6">
                Flagship Boutique
              </h3>

              <div className="space-y-6 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Address:</strong>
                    <span>Saideep Collection Flagship Store, Gandhi Chowk, Textile Market, Surat, Gujarat – 395002</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Phone / WhatsApp Support:</strong>
                    <span>+91 98765 43210 (10 AM – 8:30 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Email Inquiries:</strong>
                    <span>care@saideepcollection.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Operating Hours:</strong>
                    <span>Monday to Saturday: 10:00 AM – 8:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">
              Send Us A Message
            </h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-brand-dark mb-1">Message Sent Successfully</h4>
                <p className="text-xs text-gray-500 mb-6">Our style advisor will reach out to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold uppercase text-brand-red underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Order query, Sizing, Bulk festive"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-red hover:bg-brand-red-hover text-white font-bold uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export const PolicyView = ({ policyType, onBack }) => {
  const policies = {
    'shipping-policy': {
      title: 'Shipping & Delivery Policy',
      content: [
        'Complimentary Express Shipping is applicable on all domestic prepaid & COD orders valued above ₹999.',
        'Orders placed before 2:00 PM IST are processed and handed over to express flight couriers within 24 hours.',
        'Metropolitan delivery times range between 2 to 3 business days; other regions across India are delivered within 3 to 5 business days.',
        'Real-time tracking links via SMS and email are generated as soon as your package leaves our Surat fulfillment facility.'
      ]
    },
    'return-policy': {
      title: 'Return, Exchange & Refund Policy',
      content: [
        'We offer a 7-day hassle-free doorstep exchange guarantee from the date of package delivery.',
        'If the size or fit isn’t perfect, our courier partner will conduct a doorstep reverse pickup at zero additional charge to you.',
        'Items must remain unworn, unwashed, with original brand tags and garment bags intact.',
        'Refunds for prepaid orders are credited back to original payment mode within 48 hours of inspection; COD refunds are processed via UPI or direct bank transfer.'
      ]
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      content: [
        'Saideep Collection safeguards customer personal records with strict 256-bit encryption.',
        'Your contact details are solely utilized for order processing, shipping notifications, and opted-in promotional releases.',
        'We never sell, rent, or trade customer information with unauthorized third parties.',
        'All payment gateway interactions are tokenized and comply with RBI and PCI-DSS compliance standards.'
      ]
    },
    'terms': {
      title: 'Terms & Conditions',
      content: [
        'By browsing or purchasing from Saideep Collection, you agree to our standard terms of service.',
        'Product colors represented online match authentic studio captures; subtle tone variations may occur due to individual screen settings or hand-dyed natural textile characteristics.',
        'Discounts and promo codes are subject to individual promotional criteria and cannot be combined unless specified.'
      ]
    }
  };

  const current = policies[policyType] || policies['shipping-policy'];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-serif font-bold text-brand-dark mb-6 pb-4 border-b border-gray-100">
            {current.title}
          </h1>
          <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed mb-8">
            {current.content.map((para, i) => (
              <p key={i}>• {para}</p>
            ))}
          </div>
          <button
            onClick={onBack}
            className="bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-brand-red transition-colors"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
};
