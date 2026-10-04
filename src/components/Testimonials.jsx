import React from 'react';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials = () => {
  return (
    <section className="py-20 sm:py-24 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-brand-red text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>REAL STORIES & EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark tracking-tight">
            Loved By Over 25,000+ Patrons
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Hear from our discerning patrons across India who celebrate festive occasions and daily elegance with Saideep Collection.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-brand-gold/30 mb-3 group-hover:text-brand-gold/60 transition-colors" />

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-gold/40"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-brand-dark truncate">{t.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" title="Verified Buyer" />
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center justify-between">
                    <span>{t.city}</span>
                    <span className="text-[10px] text-brand-red font-medium">{t.purchasedItem}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
