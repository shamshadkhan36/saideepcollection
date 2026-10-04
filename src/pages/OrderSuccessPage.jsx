import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Share2, 
  Check, 
  Clock, 
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccessPage = ({ order, onContinueShopping }) => {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti effect on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F20D16', '#F5A623', '#111820', '#FFFFFF'],
      });
    } catch (e) {
      // Fallback silently if confetti blocked
    }
  }, []);

  if (!order) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">No Active Order</h2>
        <button
          onClick={onContinueShopping}
          className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-xl"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  // Delivery date estimate (+3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const estimatedDateStr = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
          
          {/* Decorative Corner Accents */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Celebration Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-dark px-4 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THANK YOU FOR SHOPPING</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-8">
            Your exquisite Indian fashion pieces are being prepared by our master artisans. We have emailed order invoice and confirmation to <strong>{order.customer.email}</strong>.
          </p>

          {/* Order Snapshot Box */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-gray-200 text-left mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-gray-400 uppercase font-semibold block mb-0.5">Order Number</span>
              <span className="font-mono font-bold text-base text-brand-dark">{order.orderNumber}</span>
            </div>

            <div>
              <span className="text-gray-400 uppercase font-semibold block mb-0.5">Estimated Delivery</span>
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {estimatedDateStr}
              </span>
            </div>

            <div>
              <span className="text-gray-400 uppercase font-semibold block mb-0.5">Total Amount</span>
              <span className="font-bold text-base text-brand-red">
                ₹{order.totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-gray-500">Paid via {order.paymentMethod}</span>
            </div>
          </div>

          {/* Delivery Timeline Indicator */}
          <div className="border border-gray-100 rounded-2xl p-6 mb-8 text-left bg-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-6">
              Delivery Progress Timeline:
            </h4>
            
            <div className="relative flex justify-between items-center">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-1000" />

              {[
                { status: 'Confirmed', desc: 'Order received', active: true, done: true },
                { status: 'Handcrafted', desc: 'Tailoring & QC', active: true, done: false },
                { status: 'Shipped', desc: 'With courier', active: false, done: false },
                { status: 'Delivered', desc: 'At doorstep', active: false, done: false },
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : step.active
                      ? 'bg-brand-red text-white ring-4 ring-red-100 animate-pulse'
                      : 'bg-white text-gray-400 border-2 border-gray-300'
                  }`}>
                    {step.done ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className="text-[11px] font-bold text-gray-900 mt-2">{step.status}</span>
                  <span className="text-[9px] text-gray-500 hidden sm:block">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="text-left border-t border-gray-100 pt-6 mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-4">
              Garments in this Package ({order.items.length}):
            </h4>
            <div className="space-y-3 divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center gap-4 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-18 object-cover object-top rounded-xl border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-brand-dark text-sm truncate">{item.product.name}</h5>
                    <p className="text-gray-500 text-[11px]">
                      Size: {item.size} • Color: {item.color.name} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-brand-dark text-sm">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="text-left bg-gray-50 p-4 rounded-xl text-xs text-gray-600 mb-8 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-gray-900 block mb-0.5">Shipping Destination:</span>
              <p className="leading-relaxed">
                {order.customer.fullName} • {order.customer.phone} <br />
                {order.customer.address}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="w-full sm:w-auto bg-brand-dark hover:bg-brand-surface text-white text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-brand-gold" />
              <span>Track Order Live</span>
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Live Track Order Modal */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-left shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-red" />
                <h4 className="font-serif font-bold text-base text-brand-dark">Tracking: {order.orderNumber}</h4>
              </div>
              <button
                onClick={() => setIsTrackModalOpen(false)}
                className="text-gray-400 hover:text-brand-dark text-xs uppercase font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1" />
                <div>
                  <span className="font-bold text-brand-dark block">Package Created & Verified</span>
                  <span className="text-[11px] text-gray-400">Today, Saideep Central Hub, Surat</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1" />
                <div>
                  <span className="font-bold text-brand-dark block">Assigned to Express Courier (BlueDart / Delhivery)</span>
                  <span className="text-[11px] text-gray-400">AWB # 8940218764 • Dispatched within 24h</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 mt-1" />
                <div>
                  <span className="font-semibold text-gray-500 block">Out for Doorstep Delivery</span>
                  <span className="text-[11px] text-gray-400">Expected by {estimatedDateStr}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsTrackModalOpen(false)}
                className="w-full bg-brand-dark text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
