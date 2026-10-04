import React from 'react';
import { Heart, Sparkles, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { INSTAGRAM_POSTS } from '../data/products';

export const InstagramGallery = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            <InstagramIcon className="w-4 h-4" />
            <span>COMMUNITY & LOOKBOOK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark">
            Follow The Saideep Style
          </h2>
          <div className="w-14 h-1 bg-brand-red mx-auto mt-3 rounded-full" />
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-brand-gold hover:text-brand-red transition-colors tracking-wide"
          >
            <span>@saideepcollection</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Fashion Imagery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt="Saideep Style Look"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Hover Dark Overlay with Likes and Instagram Icon */}
              <div className="absolute inset-0 bg-brand-dark/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <InstagramIcon className="w-6 h-6 text-brand-gold mb-1 transform scale-75 group-hover:scale-100 transition-transform" />
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 fill-brand-red text-brand-red" />
                  <span>{post.likes}</span>
                </div>
                <span className="text-[10px] text-gray-300 font-mono mt-1">{post.tag}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
