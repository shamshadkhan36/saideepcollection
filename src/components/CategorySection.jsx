import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORY_TILES } from '../data/products';

export const CategorySection = ({ onSelectCategory }) => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-brand-red text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>DISCOVER THE RANGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark tracking-tight">
            Shop By Category
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Impeccable silhouettes, handloom textiles and modern festive essentials tailored for your unique style.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.query)}
              className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-luxury hover:shadow-2xl transition-all duration-500 bg-brand-dark"
            >
              {/* Background Image with Zoom */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-top img-zoom-hover opacity-90 filter brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-brand-red/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {cat.tag}
                </span>
              </div>

              {/* Card Content & Action Button */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-brand-gold text-xs font-semibold tracking-wider uppercase mb-1">
                  {cat.count}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1.5 group-hover:text-brand-gold transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light mb-4">
                  {cat.subtitle}
                </p>

                {/* Explore Button */}
                <div>
                  <span className="inline-flex items-center gap-2 bg-white text-brand-dark group-hover:bg-brand-red group-hover:text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg shadow transition-all duration-300 transform group-hover:translate-x-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
