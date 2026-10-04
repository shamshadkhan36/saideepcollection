import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout, onViewCartPage }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    finalTotal,
    totalItemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-brand-darker/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-brand-dark text-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
            <h3 className="text-lg font-serif font-bold">Shopping Bag ({totalItemCount})</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF8F5] px-5 py-3 border-b border-gray-200/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-brand-dark">
              <Truck className="w-4 h-4 text-brand-red" />
              <span>
                {isFreeShipping
                  ? '🎉 Congratulations! You unlocked FREE Shipping'
                  : `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Shipping`}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-red h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Your bag is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mb-6">
                Discover exceptional Indian attire designed for modern elegance.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="py-4 flex gap-4 items-start">
                {/* Product Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-top rounded-xl border border-gray-100 flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-gray-400 hover:text-brand-red p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Size & Color tags */}
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">Size: {item.size}</span>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded font-medium">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color.hex }} />
                      {item.color.name}
                    </span>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-gray-900 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-brand-dark">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-gray-400">
                          ₹{item.product.price.toLocaleString('en-IN')} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations and Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4">
            
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span>
                      <span className="text-[11px] block text-emerald-700">
                        {appliedCoupon.discountPercent}% OFF applied (-₹{discountAmount.toLocaleString('en-IN')})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. FIRSTORDER)"
                      className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg uppercase tracking-wider focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-dark hover:bg-brand-surface text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-red font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    `₹${shippingFee.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-bold text-brand-dark">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-right">Inclusive of all taxes</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2 group hover:translate-y-[-1px]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onViewCartPage();
                }}
                className="w-full text-center text-xs text-gray-600 hover:text-brand-dark font-semibold py-1.5"
              >
                View Full Bag Page
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
