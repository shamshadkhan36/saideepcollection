import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85',
    tag: 'FESTIVE COUTURE 2026',
    headline: 'Style That Speaks For You',
    subheading: 'Discover the latest collection from Saideep Collection.',
    menCategory: 'men',
    womenCategory: 'women',
  },
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=85',
    tag: 'HANDCRAFTED HERITAGE',
    headline: 'Elegance In Every Thread',
    subheading: 'Artisanal kurtas, silk sets and contemporary royal ethnic wear.',
    menCategory: 'men',
    womenCategory: 'women',
  }
];

export const Hero = ({ onShopCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Slides with subtle zoom animation */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1.2s' }}
        >
          <img
            src={s.image}
            alt={s.headline}
            className="w-full h-full object-cover object-top filter brightness-[0.78]"
          />
        </div>
      ))}

      {/* Dark Gradient Overlay for Maximum Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40 z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 bg-brand-red/90 border border-brand-red text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5 shadow-lg shadow-brand-red/20 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>{slide.tag}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-4 drop-shadow-md">
            {slide.headline}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-light max-w-xl mb-8 leading-relaxed">
            {slide.subheading}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => onShopCategory('men')}
              className="bg-brand-red hover:bg-brand-red-hover text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-md uppercase tracking-wider transition-all duration-300 shadow-xl shadow-brand-red/30 flex items-center justify-center gap-2 group hover:translate-y-[-2px]"
            >
              <span>SHOP MEN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onShopCategory('women')}
              className="bg-white/10 hover:bg-white hover:text-brand-dark text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-md uppercase tracking-wider transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 group hover:translate-y-[-2px]"
            >
              <span>SHOP WOMEN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 mt-8">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-brand-gold' : 'w-2 bg-white/40'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Trust Badges Strip at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-brand-darker/80 backdrop-blur-md border-t border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-300">
              <Truck className="w-4 h-4 text-brand-gold" />
              <span>Complimentary Shipping Over ₹999</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>100% Authentic Indian Craftsmanship</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-300">
              <RefreshCw className="w-4 h-4 text-brand-gold" />
              <span>7-Day Easy Doorstep Exchanges</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
