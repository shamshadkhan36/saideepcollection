import React from 'react';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { BrandStory } from '../components/BrandStory';
import { WhyShopWithUs } from '../components/WhyShopWithUs';
import { Testimonials } from '../components/Testimonials';
import { InstagramGallery } from '../components/InstagramGallery';
import { Newsletter } from '../components/Newsletter';

export const HomePage = ({ 
  onSelectCategory, 
  onSelectProduct, 
  onNavigateShop, 
  onExploreBrand 
}) => {
  return (
    <div className="animate-fade-in">
      {/* 1. Fashion Hero Banner */}
      <Hero 
        onShopCategory={(dept) => onSelectCategory({ department: dept })} 
      />

      {/* 2. Shop By Category Grid */}
      <CategorySection 
        onSelectCategory={onSelectCategory} 
      />

      {/* 3. Featured Products: Trending Now (8 products) */}
      <FeaturedProducts 
        onSelectProduct={onSelectProduct} 
        onNavigateShop={onNavigateShop} 
      />

      {/* 4. Promotional Banner (Up to 40% Off Festive Sale) */}
      <PromotionalBanner 
        onShopSale={() => onSelectCategory({ discountMin: 35 })} 
      />

      {/* 5. Brand Heritage Story (Fashion Made For Every Occasion) */}
      <BrandStory 
        onExplore={onExploreBrand} 
      />

      {/* 6. Why Shop With Us (4 Feature Cards) */}
      <WhyShopWithUs />

      {/* 7. Customer Testimonials */}
      <Testimonials />

      {/* 8. Instagram Fashion Gallery */}
      <InstagramGallery />

      {/* 9. Newsletter & VIP Voucher */}
      <Newsletter />
    </div>
  );
};
