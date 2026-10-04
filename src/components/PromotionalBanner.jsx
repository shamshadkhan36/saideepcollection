import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Tag, Clock } from 'lucide-react';

export const PromotionalBanner = ({ onShopSale }) => {
  // Festive countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-24 text-white">
      {/* Background with decorative Indian subtle motifs and gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-surface border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>LIMITED TIME FESTIVE COLLECTION</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white mb-4">
              UP TO <span className="text-brand-red underline decoration-brand-gold decoration-4 underline-offset-8">40% OFF</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-light">
              Celebrate weddings and grand festivities in signature Indian regal attire. Handcrafted kurtas, sherwanis, embroidered sets and pure silk weaves at special celebratory prices.
            </p>

            {/* Countdown Display */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-brand-surface/90 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-center min-w-[64px]"
                >
                  <span className="block text-xl sm:text-2xl font-bold text-brand-gold font-mono">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onShopSale}
                className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white text-sm sm:text-base font-bold uppercase tracking-wider px-8 py-4 rounded-lg shadow-xl shadow-brand-red/30 transition-all duration-300 flex items-center justify-center gap-3 group hover:translate-y-[-2px]"
              >
                <span>SHOP THE SALE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brand-gold" />
                Use code <span className="font-mono text-brand-gold font-bold">FESTIVE20</span>
              </span>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                  alt="Festive Indian Collection"
                  className="w-full h-full object-cover object-top filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                
                {/* Overlay Floating Card */}
                <div className="absolute bottom-5 inset-x-5 bg-brand-dark/90 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-gold font-bold">
                        Exclusive Drop
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white">
                        Royal Embroidered Kurta Sets
                      </h4>
                    </div>
                    <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded">
                      ₹1,899
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
