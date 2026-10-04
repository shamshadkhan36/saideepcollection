import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = ({ onNavigateShop, onProceedToCheckout }) => {
  const {
    cart,
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

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-dark mb-4 border border-gray-200">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark mb-2">
          Your Shopping Bag Is Empty
        </h2>
        <p className="text-sm text-gray-600 max-w-md mb-8">
          Explore our collection of premium cotton shirts, designer kurtas, and traditional ethnic wear to fill your bag.
        </p>
        <button
          onClick={onNavigateShop}
          className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Collections</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark">
              Shopping Bag
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Review your items ({totalItemCount} garments)
            </p>
          </div>
          <button
            onClick={onNavigateShop}
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-brand-red hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Shipping Strip */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-brand-dark flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-red" />
              {isFreeShipping
                ? 'You have qualified for FREE Pan-India Shipping!'
                : `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more to unlock complimentary delivery.`}
            </span>
            <span className="font-mono text-gray-500 font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-red h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Two Column Layout: Cart Items + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={item.cartItemId} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-32 object-cover object-top rounded-2xl border border-gray-100 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">
                        {item.product.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-brand-dark">
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-gray-400 hover:text-brand-red p-1 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Variants */}
                  <div className="flex items-center gap-3 my-2 text-xs text-gray-600">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">Size: {item.size}</span>
                    <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md font-medium">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color.hex }} />
                      {item.color.name}
                    </span>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-gray-900 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base sm:text-lg font-bold text-brand-dark">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[11px] text-gray-400">
                          (₹{item.product.price.toLocaleString('en-IN')} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 sticky top-28">
            <h3 className="text-lg font-serif font-bold text-brand-dark pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Coupon field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Have A Promo Code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span>
                      <span className="block text-[11px] text-emerald-700">{appliedCoupon.discountPercent}% OFF applied</span>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-red-600 hover:underline font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. FIRSTORDER"
                    className="flex-1 text-xs px-3 py-2.5 uppercase font-mono border border-gray-300 rounded-lg focus:outline-none focus:border-brand-red"
                  />
                  <button
                    type="submit"
                    className="bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-brand-red transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-red font-medium">
                  <span>Voucher Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
                  ) : (
                    `₹${shippingFee.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold text-brand-dark">
                <span>Grand Total</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-gray-400 text-right">Includes all GST & taxes</p>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2 group hover:translate-y-[-1px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Assurance */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>100% Safe & Secure Checkout</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
