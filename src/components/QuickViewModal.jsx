import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useUIModal } from '../context/UIModalContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const QuickViewModal = ({ onSelectProduct }) => {
  const { quickViewProduct, closeQuickView, openSizeGuide } = useUIModal();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setSelectedColor(quickViewProduct.colors[0] || null);
      setQuantity(1);
      setActiveImageIdx(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    onSelectProduct(product);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-brand-darker/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-brand-dark bg-white/80 hover:bg-gray-100 rounded-full transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left: Product Images */}
          <div className="md:col-span-6 bg-gray-50 p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 mb-4">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIdx === idx ? 'border-brand-red shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="uppercase tracking-wider font-semibold">{product.category}</span>
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount})</span>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">
                {product.name}
              </h3>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-brand-dark">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-brand-red bg-red-50 px-2 py-0.5 rounded">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Color: <span className="text-brand-dark font-semibold">{selectedColor?.name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor?.name === c.name ? 'scale-110 ring-2 ring-brand-red ring-offset-2' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Select Size:
                  </label>
                  <button
                    onClick={openSizeGuide}
                    className="text-xs text-brand-red hover:underline font-semibold"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'bg-brand-dark text-white shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWish
                      ? 'bg-red-50 border-brand-red text-brand-red'
                      : 'border-gray-200 text-gray-600 hover:text-brand-red hover:border-gray-300'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs text-gray-600 hover:text-brand-red font-semibold py-1.5 flex items-center justify-center gap-1"
              >
                <span>View Full Specifications & Pincode Checker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
