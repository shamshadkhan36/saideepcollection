import React from 'react';
import { Sparkles, Shield, HeartHandshake, Award } from 'lucide-react';

export const BrandStory = ({ onExplore }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Logo Watermark */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto relative border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
                  alt="Saideep Collection Artisanship"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Secondary Floating Image */}
              <div className="hidden sm:block absolute -bottom-10 -right-4 w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                  alt="Traditional Indian Embroidery"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -top-6 -left-4 sm:left-4 bg-brand-dark text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-brand-gold/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-gold font-bold">
                    <Award className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="block text-xl font-bold font-serif text-brand-gold">100%</span>
                    <span className="text-[11px] text-gray-300 uppercase tracking-wider">Pure Indian Fabrics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>THE SAIDEEP PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark leading-tight mb-6">
              Fashion Made For Every Occasion
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg">
              <p>
                At <strong className="text-brand-dark font-semibold">Saideep Collection</strong>, fashion is more than what you wear—it is a statement of grace, confidence, and heritage. We bring together contemporary urban aesthetics with timeless Indian craftsmanship to craft garments that empower you to express your true identity.
              </p>
              <p>
                From boardroom-ready Egyptian cotton shirts and breezy daily casuals to magnificent festive kurtas, hand-embroidered ethnic ensembles, and heritage sarees, every piece is tailored with meticulous attention to detail.
              </p>
              <p>
                We believe that authentic luxury shouldn't be reserved only for once-in-a-lifetime events. We design garments that elevate both your everyday moments and your grandest celebrations.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-50 text-brand-red mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">Artisanal Precision</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Master tailoring with reinforced seams and perfect drapes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-brand-gold mt-1">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">Ethically Sourced</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Direct partnership with generational weavers across India.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={onExplore}
                className="bg-brand-dark hover:bg-brand-red text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-lg transition-colors"
              >
                EXPLORE OUR STORY & CATALOG
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
