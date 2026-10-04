import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useUIModal } from '../context/UIModalContext';

export const WishlistDrawer = ({ onSelectProduct }) => {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { isWishlistOpen, setIsWishlistOpen } = useUIModal();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-darker/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-dark text-white">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-brand-red fill-brand-red" />
            <h3 className="text-lg font-serif font-bold">My Wishlist ({wishlistCount})</h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 text-brand-red">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mb-6">
                Explore our festive and everyday collections to save your favorite styles.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    onSelectProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-16 h-20 object-cover object-top rounded-xl border border-gray-100 cursor-pointer flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">{product.category}</span>
                  <h4
                    onClick={() => {
                      onSelectProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="text-xs sm:text-sm font-semibold text-gray-900 truncate cursor-pointer hover:text-brand-red transition-colors"
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-brand-dark">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        addToCart(product, product.sizes[0], product.colors[0], 1);
                        removeFromWishlist(product.id);
                      }}
                      className="text-xs bg-brand-red hover:bg-brand-red-hover text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full text-center text-xs text-gray-600 hover:text-brand-dark font-semibold py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
