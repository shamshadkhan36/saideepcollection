import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  CreditCard, 
  QrCode, 
  Building, 
  Banknote, 
  ShieldCheck, 
  Truck, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = ({ onOrderPlaced, onBackToCart }) => {
  const { cart, subtotal, discountAmount, shippingFee, finalTotal, clearCart } = useCart();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: Contact/Guest, 2: Address, 3: Delivery, 4: Payment

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Contact
    email: 'sharma.patron@example.com',
    phone: '9876543210',
    isGuest: true,
    
    // Step 2: Shipping
    fullName: 'Rajesh Sharma',
    addressLine1: 'B-402, Lotus Grand Residences',
    addressLine2: 'Near Fashion Boulevard',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    addressType: 'home',

    // Step 3: Delivery Method
    deliveryMethod: 'standard', // 'standard' | 'express'

    // Step 4: Payment
    paymentMethod: 'upi', // 'upi' | 'card' | 'netbanking' | 'cod'
    upiApp: 'gpay', // 'gpay' | 'phonepe' | 'paytm' | 'qr'
    cardNumber: '4532 •••• •••• 8821',
    cardName: 'Rajesh Sharma',
    cardExpiry: '08/29',
    cardCvv: '821',
    selectedBank: 'HDFC',
  });

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);

  // Delivery method fee calculation
  const expressFee = formData.deliveryMethod === 'express' ? 149 : 0;
  const calculatedGrandTotal = finalTotal + expressFee;

  const handleNextStep = () => {
    // Basic validation
    if (step === 1 && (!formData.email || !formData.phone)) {
      addToast({ title: 'Missing details', message: 'Please provide email and contact number.', type: 'error' });
      return;
    }
    if (step === 2 && (!formData.fullName || !formData.addressLine1 || !formData.city || !formData.pincode)) {
      addToast({ title: 'Missing address', message: 'Please complete all required address fields.', type: 'error' });
      return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcessOrder = () => {
    setIsProcessingPayment(true);
    setShowRazorpayModal(true);

    // Simulate Razorpay Gateway Interaction
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowRazorpayModal(false);

      const orderNumber = `SDC-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDetails = {
        orderNumber,
        items: [...cart],
        subtotal,
        discountAmount,
        shippingFee: shippingFee + expressFee,
        totalAmount: calculatedGrandTotal,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.addressLine1}, ${formData.addressLine2 ? formData.addressLine2 + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`,
        },
        deliveryMethod: formData.deliveryMethod === 'express' ? 'Priority Express (1-2 Days)' : 'Standard Delivery (3-5 Days)',
        paymentMethod: formData.paymentMethod.toUpperCase(),
        placedAt: new Date().toISOString(),
      };

      // Store in localStorage for persistence
      try {
        const existing = JSON.parse(localStorage.getItem('saideep_orders') || '[]');
        localStorage.setItem('saideep_orders', JSON.stringify([orderDetails, ...existing]));
      } catch (e) {
        console.error('Error saving order', e);
      }

      clearCart();
      onOrderPlaced(orderDetails);
    }, 2800);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header & Steps Bar */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl font-serif font-bold text-brand-dark mb-4">
            Secure Checkout
          </h1>

          {/* Stepper */}
          <div className="flex items-center justify-between relative max-w-xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            
            {[
              { num: 1, label: 'Contact' },
              { num: 2, label: 'Address' },
              { num: 3, label: 'Delivery' },
              { num: 4, label: 'Payment' },
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  disabled={s.num > step}
                  className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                    s.num === step
                      ? 'bg-brand-red text-white ring-4 ring-brand-red/20 shadow-md'
                      : s.num < step
                      ? 'bg-brand-dark text-white'
                      : 'bg-white text-gray-400 border border-gray-300'
                  }`}
                >
                  {s.num < step ? <Check className="w-4 h-4" /> : s.num}
                </button>
                <span className={`text-[11px] font-semibold mt-1.5 ${s.num === step ? 'text-brand-dark font-bold' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
            
            {/* STEP 1: Contact / Login */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-brand-dark">
                    1. Contact Information
                  </h3>
                  <span className="text-xs text-brand-red font-semibold">Guest Checkout Available</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Email Address (For Order Tracking & Invoice)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    placeholder="e.g. yourname@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Mobile Number (For Courier OTP & Updates)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-600 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full text-xs sm:text-sm p-3.5 bg-gray-50 border border-gray-200 rounded-r-xl focus:border-brand-red focus:bg-white focus:outline-none font-mono"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={onBackToCart}
                    className="text-xs font-bold uppercase text-gray-500 hover:text-brand-dark flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Bag</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center gap-2"
                  >
                    <span>Continue to Address</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Address */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-brand-dark">
                    2. Shipping Address
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    placeholder="e.g. Rajesh Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Flat / House No. / Building / Floor
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    placeholder="e.g. B-402, Lotus Grand Residences"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Street / Colony / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                    placeholder="e.g. Near Fashion Boulevard"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs sm:text-sm p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full text-xs sm:text-sm p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none font-mono"
                      placeholder="400050"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-red focus:bg-white focus:outline-none"
                  >
                    {[
                      'Maharashtra',
                      'Delhi',
                      'Gujarat',
                      'Karnataka',
                      'Rajasthan',
                      'Uttar Pradesh',
                      'Tamil Nadu',
                      'Telangana',
                      'West Bengal',
                      'Punjab',
                    ].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase text-gray-500 hover:text-brand-dark flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center gap-2"
                  >
                    <span>Delivery Method</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Delivery Method */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-serif font-bold text-brand-dark">
                    3. Delivery Options
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Standard */}
                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.deliveryMethod === 'standard'
                        ? 'border-brand-red bg-red-50/20 ring-1 ring-brand-red'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={() => {}}
                        className="mt-1 accent-brand-red"
                      />
                      <div>
                        <span className="font-bold text-sm text-brand-dark block">
                          Standard Express (3-5 Business Days)
                        </span>
                        <span className="text-xs text-gray-500">
                          Hand-packed in luxury Saideep protective garment bag
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 uppercase">
                      {shippingFee === 0 ? 'FREE' : '₹99'}
                    </span>
                  </label>

                  {/* Priority Next Day */}
                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.deliveryMethod === 'express'
                        ? 'border-brand-red bg-red-50/20 ring-1 ring-brand-red'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={() => {}}
                        className="mt-1 accent-brand-red"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-brand-dark">
                            Priority Next-Day Dispatch (1-2 Days)
                          </span>
                          <span className="bg-brand-gold text-brand-darker font-bold text-[9px] uppercase px-1.5 py-0.5 rounded">
                            Fastest
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          Priority warehouse dispatch with dedicated courier flight routing
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-dark">
                      ₹149
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold uppercase text-gray-500 hover:text-brand-dark flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-brand-dark">
                    4. Payment Selection
                  </h3>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
                  </span>
                </div>

                {/* Payment Options Radio List */}
                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-brand-red bg-red-50/20 ring-1 ring-brand-red'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={() => {}}
                          className="accent-brand-red"
                        />
                        <div className="flex items-center gap-2">
                          <QrCode className="w-5 h-5 text-brand-red" />
                          <span className="font-bold text-sm text-brand-dark">UPI Instant Payment</span>
                        </div>
                      </div>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Fastest & Recommended
                      </span>
                    </div>

                    {formData.paymentMethod === 'upi' && (
                      <div className="mt-4 pt-3 border-t border-gray-200/80 text-xs space-y-2">
                        <p className="text-gray-600">Select preferred UPI option:</p>
                        <div className="flex flex-wrap gap-2">
                          {['Google Pay', 'PhonePe', 'Paytm', 'Scan QR Code'].map((app) => (
                            <button
                              key={app}
                              type="button"
                              className="bg-white border border-gray-300 hover:border-brand-red px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-800 shadow-xs"
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-brand-red bg-red-50/20 ring-1 ring-brand-red'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => {}}
                        className="accent-brand-red"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-brand-dark" />
                        <span className="font-bold text-sm text-brand-dark">Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-gray-200/80 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Card Number</label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-lg font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Expiry Date</label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                              className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-lg font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={formData.cardCvv}
                              onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                              className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-lg font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-brand-red bg-red-50/20 ring-1 ring-brand-red'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'netbanking'}
                        onChange={() => {}}
                        className="accent-brand-red"
                      />
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-brand-dark" />
                        <span className="font-bold text-sm text-brand-dark">Net Banking (All Major Indian Banks)</span>
                      </div>
                    </div>

                    {formData.paymentMethod === 'netbanking' && (
                      <div className="mt-4 pt-3 border-t border-gray-200/80">
                        <select
                          value={formData.selectedBank}
                          onChange={(e) => setFormData({ ...formData, selectedBank: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-lg"
                        >
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="SBI">State Bank of India (SBI)</option>
                          <option value="Axis">Axis Bank</option>
                          <option value="Kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-brand-red bg-red-50/20 ring-1 ring-brand-red'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => {}}
                          className="accent-brand-red"
                        />
                        <div className="flex items-center gap-2">
                          <Banknote className="w-5 h-5 text-emerald-700" />
                          <span className="font-bold text-sm text-brand-dark">Cash on Delivery (Pay at Doorstep)</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500">Pay cash or scan UPI upon delivery</span>
                    </div>
                  </div>
                </div>

                {/* Final Order Submit Button */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="text-xs font-bold uppercase text-gray-500 hover:text-brand-dark flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleProcessOrder}
                    disabled={isProcessingPayment}
                    className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded-xl shadow-xl shadow-brand-red/30 transition-all flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting to Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>PAY ₹{calculatedGrandTotal.toLocaleString('en-IN')} & PLACE ORDER</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Mini Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-5">
            <h3 className="text-base font-serif font-bold text-brand-dark pb-3 border-b border-gray-100">
              Items In This Order ({cart.length})
            </h3>

            {/* Product list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 items-center text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover object-top rounded-lg border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 truncate">{item.product.name}</h5>
                    <span className="text-[10px] text-gray-500">
                      Size: {item.size} • {item.color.name} (Qty: {item.quantity})
                    </span>
                  </div>
                  <span className="font-bold text-brand-dark">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-red font-medium">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({formData.deliveryMethod === 'express' ? 'Priority Express' : 'Standard'})</span>
                <span>
                  {shippingFee + expressFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    `₹${(shippingFee + expressFee).toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-bold text-brand-dark">
                <span>Amount to Pay</span>
                <span>₹{calculatedGrandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <span>Free returns & exchanges within 7 days of doorstep delivery.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Razorpay Mock Gateway Overlay Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-red/10 text-brand-red mx-auto flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-brand-dark">Connecting Payment Gateway</h4>
              <p className="text-xs text-gray-500">
                Authorizing payment of <strong>₹{calculatedGrandTotal.toLocaleString('en-IN')}</strong> via {formData.paymentMethod.toUpperCase()}...
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Powered by Saideep Secure Checkout Engine</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
