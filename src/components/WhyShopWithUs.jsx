import React from 'react';
import { Award, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const WhyShopWithUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Artisanal Craftsmanship',
      description: 'Finest hand-selected cottons, silk blends, and precision tailoring built to last.',
      accent: 'border-brand-gold/30 group-hover:border-brand-gold',
      iconColor: 'text-brand-gold',
      badgeBg: 'bg-amber-50 group-hover:bg-amber-100',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: '100% Protected Checkout',
      description: 'End-to-end encrypted transactions via UPI, Credit/Debit cards, Net Banking & COD.',
      accent: 'border-brand-red/30 group-hover:border-brand-red',
      iconColor: 'text-brand-red',
      badgeBg: 'bg-red-50 group-hover:bg-red-100',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      subtitle: 'Express Pan-India Shipping',
      description: 'Complimentary shipping above ₹999. Real-time SMS and WhatsApp order tracking.',
      accent: 'border-brand-gold/30 group-hover:border-brand-gold',
      iconColor: 'text-brand-gold',
      badgeBg: 'bg-amber-50 group-hover:bg-amber-100',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      subtitle: '7-Day Hassle-Free Exchange',
      description: 'No questions asked doorstep reverse pickup with instant refunds or size swaps.',
      accent: 'border-brand-red/30 group-hover:border-brand-red',
      iconColor: 'text-brand-red',
      badgeBg: 'bg-red-50 group-hover:bg-red-100',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-red">
            THE SAIDEEP PROMISE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark mt-1">
            Why Shop With Us
          </h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group p-6 rounded-2xl bg-[#FCFBFA] border ${item.accent} transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] flex flex-col items-center text-center`}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.badgeBg} flex items-center justify-center mb-4 transition-colors`}>
                  <Icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-1">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider mb-2">
                  {item.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
