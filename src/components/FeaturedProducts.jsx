import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUIModal } from '../context/UIModalContext';
import { PRODUCTS } from '../data/products';

export const FeaturedProducts = ({ onSelectProduct, onNavigateShop }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useUIModal();

  // The 8 trending products as requested
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-red text-xs font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>HANDPICKED FOR YOU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark tracking-tight">
              Trending Now
            </h2>
            <div className="w-16 h-1 bg-brand-red mt-3 rounded-full"></div>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl">
              The season's most coveted menswear, designer kurtis, and festive ensembles.
            </p>
          </div>

          <button
            onClick={() => onNavigateShop()}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-red group transition-colors"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-brand-red" />
          </button>
        </div>

        {/* 8 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => {
            const isWish = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-luxury transition-all duration-300 overflow-hidden"
              >
                {/* Product Image Wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 cursor-pointer">
                  {/* Primary & Hover Images */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onClick={() => onSelectProduct(product)}
                    loading="lazy"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.badge && (
                      <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-brand-dark text-brand-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 shadow-md ${
                      isWish
                        ? 'bg-brand-red text-white shadow-brand-red/30'
                        : 'bg-white/90 text-gray-700 hover:text-brand-red hover:bg-white'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className="flex-1 bg-white/95 hover:bg-white text-brand-dark text-xs font-semibold py-2.5 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors border border-gray-200"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-600" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.sizes[0], product.colors[0], 1);
                      }}
                      className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-semibold p-2.5 rounded-lg shadow-lg flex items-center justify-center transition-colors"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-gray-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-semibold text-gray-900 hover:text-brand-red transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-brand-dark">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Mobile visible Add to Cart button */}
                    <button
                      onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                      className="sm:hidden text-xs bg-brand-dark text-white font-semibold px-3 py-1.5 rounded-md hover:bg-brand-red transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
