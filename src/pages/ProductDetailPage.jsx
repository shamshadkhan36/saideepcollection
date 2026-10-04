import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Ruler, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Share2, 
  Check, 
  ChevronRight,
  Sparkles,
  Info,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUIModal } from '../context/UIModalContext';
import { useToast } from '../context/ToastContext';

export const ProductDetailPage = ({ product, onNavigateShop, onBuyNow, onSelectRelatedProduct }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openSizeGuide } = useUIModal();
  const { addToast } = useToast();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'specs' | 'reviews' | 'returns'

  // Pincode Delivery Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null); // null | { valid: true, city: string, date: string, free: boolean }

  // Customer Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Vikram Malhotra',
      rating: 5,
      date: '14 Sept 2026',
      title: 'Breathtaking finish and royal comfort',
      comment: 'Wore this for an evening Diwali celebration. The stitch line and fabric quality are immaculate. Truly feels like bespoke high-end couture.',
      verified: true,
      city: 'Delhi',
    },
    {
      id: 2,
      author: 'Ananya Deshmukh',
      rating: 5,
      date: '28 August 2026',
      title: 'Exceptional craftsmanship',
      comment: 'The detailing on the placket is pure art. Soft on skin, zero irritation, and arrived neatly packaged with garment cover.',
      verified: true,
      city: 'Pune',
    },
    {
      id: 3,
      author: 'Karan Mehra',
      rating: 4,
      date: '02 August 2026',
      title: 'Great fit, premium feel',
      comment: 'Fit is true to size. If you prefer a loose relaxed drape, order your exact size. Beautiful color depth.',
      verified: true,
      city: 'Jaipur',
    }
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, title: '', comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWish = isInWishlist(product.id);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    const pin = pincode.trim();
    if (!/^\d{6}$/.test(pin)) {
      setPincodeStatus({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }

    // Realistic delivery calculation based on current date + 3 days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const dateStr = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const isMajorMetro = ['11', '40', '56', '70', '60', '50', '38'].some((prefix) => pin.startsWith(prefix));

    setPincodeStatus({
      valid: true,
      date: dateStr,
      city: isMajorMetro ? 'Metro Express Hub' : 'Standard Delivery Zone',
      free: product.price >= 999,
      codAvailable: true,
    });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleInstantBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    if (onBuyNow) {
      onBuyNow();
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewObj = {
      id: Date.now(),
      author: newReview.name,
      rating: Number(newReview.rating),
      date: 'Just now',
      title: newReview.title || 'Verified Customer Review',
      comment: newReview.comment,
      verified: true,
      city: 'India',
    };

    setReviews([reviewObj, ...reviews]);
    setNewReview({ name: '', rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
    addToast({
      title: 'Review Submitted',
      message: 'Thank you for sharing your feedback with Saideep Collection!',
      type: 'success',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Saideep Collection:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: 'Link Copied',
        message: 'Product link copied to your clipboard.',
        type: 'info',
      });
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <button onClick={() => onNavigateShop()} className="hover:text-brand-dark">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigateShop()} className="hover:text-brand-dark">Shop</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-400 capitalize">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-dark font-semibold truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Gallery & Thumbnails */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Vertical Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-26 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIdx === idx
                        ? 'border-brand-red ring-2 ring-brand-red/30'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image */}
            <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-luxury group">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-brand-dark text-brand-gold text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist and Share Floating Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full shadow-lg transition-all ${
                    isWish
                      ? 'bg-brand-red text-white'
                      : 'bg-white/90 text-gray-700 hover:text-brand-red hover:bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Watermark of Saideep Collection */}
              <div className="absolute bottom-4 right-4 bg-brand-dark/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 hidden sm:block">
                <span className="text-[10px] font-serif text-brand-gold font-semibold uppercase tracking-widest">
                  Saideep Authentic
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Purchasing Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
                  {product.category}
                </span>
                
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                  <span className="text-gray-400 text-xs">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-dark leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price & Savings */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200/80 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-brand-dark">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      SAVE {product.discount}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Inclusive of all taxes. Free shipping on this order.
                </p>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Color: <strong className="text-brand-dark">{selectedColor?.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor?.name === c.name
                            ? 'ring-2 ring-brand-red ring-offset-2 border-white scale-110'
                            : 'border-gray-200 hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    Select Size:
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="text-xs text-brand-red hover:text-brand-red-hover font-bold flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide & Chart</span>
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[48px] h-11 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${
                        selectedSize === s
                          ? 'bg-brand-dark border-brand-dark text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-800 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-gray-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3.5 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({product.stock} units available)
                </span>
              </div>

              {/* Main Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="bg-brand-dark hover:bg-brand-surface text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group hover:translate-y-[-1px]"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-gold" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleInstantBuyNow}
                  className="bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg shadow-brand-red/30 transition-all flex items-center justify-center gap-2 group hover:translate-y-[-1px]"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Delivery / Pincode Checker */}
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200/80 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                    Check Delivery & COD Availability
                  </h4>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN code (e.g. 400001)"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-red"
                  />
                  <button
                    type="submit"
                    className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus && (
                  <div className="mt-3 text-xs animate-fade-in">
                    {pincodeStatus.valid ? (
                      <div className="space-y-1 text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Estimated Delivery by {pincodeStatus.date}</span>
                        </div>
                        <p className="text-[11px] text-emerald-700">
                          {pincodeStatus.free ? '✓ FREE Express Delivery' : 'Standard Shipping ₹99'} • Cash on Delivery available
                        </p>
                      </div>
                    ) : (
                      <p className="text-red-600 font-semibold">{pincodeStatus.message}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Trust Strip */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-brand-gold mb-1" />
                  <span className="text-[11px] font-semibold text-gray-800">100% Authentic</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-brand-red mb-1" />
                  <span className="text-[11px] font-semibold text-gray-800">7-Day Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-brand-gold mb-1" />
                  <span className="text-[11px] font-semibold text-gray-800">Fast Shipping</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Tabs: Description, Specifications, Reviews, Return Policy */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-gray-200">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 space-x-6 sm:space-x-10 overflow-x-auto">
            {[
              { id: 'details', label: 'Product Description' },
              { id: 'specs', label: 'Fabric & Specifications' },
              { id: 'reviews', label: `Customer Reviews (${reviews.length})` },
              { id: 'returns', label: 'Returns & Shipping' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-brand-dark border-b-2 border-brand-red'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            
            {/* Description Tab */}
            {activeTab === 'details' && (
              <div className="max-w-3xl space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed animate-fade-in">
                <p>{product.description}</p>
                <div className="bg-[#FCFBF8] p-5 rounded-2xl border border-amber-200/50 mt-6">
                  <h4 className="font-serif font-bold text-brand-dark text-base mb-2">
                    Style Notes by Saideep Designers:
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Pair this ensemble with handcrafted mojaris or classic leather Oxfords. For evening weddings, accessorize with a royal pocket square or brooch to highlight the rich tone of the fabric.
                  </p>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl overflow-hidden rounded-2xl border border-gray-200 animate-fade-in">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-gray-50/50">
                      <td className="py-3.5 px-5 font-semibold text-gray-600 w-1/3">Fabric Blend</td>
                      <td className="py-3.5 px-5 font-bold text-brand-dark">{product.fabric}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-5 font-semibold text-gray-600">Fit Silhouette</td>
                      <td className="py-3.5 px-5 font-bold text-brand-dark">{product.fit}</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="py-3.5 px-5 font-semibold text-gray-600">Design & Pattern</td>
                      <td className="py-3.5 px-5 font-bold text-brand-dark">{product.pattern}</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-5 font-semibold text-gray-600">Care Instructions</td>
                      <td className="py-3.5 px-5 text-gray-800">{product.care}</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="py-3.5 px-5 font-semibold text-gray-600">Country of Origin</td>
                      <td className="py-3.5 px-5 font-bold text-brand-dark">India (Artisanal Weavers)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Customer Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-8 animate-fade-in">
                
                {/* Review Header Stats */}
                <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-brand-dark">{product.rating}</span>
                      <span className="text-gray-500 text-sm">out of 5.0</span>
                    </div>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">Based on {reviews.length} verified customer reviews</span>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-colors"
                  >
                    {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleAddReview} className="bg-white p-6 rounded-2xl border border-brand-red/30 shadow-lg space-y-4">
                    <h4 className="font-serif font-bold text-base text-brand-dark">Share Your Experience</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="e.g. Rohan Sharma"
                          className="w-full text-xs p-3 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Star Rating</label>
                        <select
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                          className="w-full text-xs p-3 border border-gray-200 rounded-lg"
                        >
                          <option value={5}>5 Stars - Outstanding</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Below Expectations</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        placeholder="e.g. Perfect festive kurta for family function"
                        className="w-full text-xs p-3 border border-gray-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Detailed Review</label>
                      <textarea
                        required
                        rows={3}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Tell us about the fabric feel, sizing, and comfort..."
                        className="w-full text-xs p-3 border border-gray-200 rounded-lg"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-brand-red transition-colors"
                    >
                      Post Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-brand-dark">{r.author}</span>
                          {r.verified && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                              Verified Buyer ({r.city})
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{r.date}</span>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>

                      <h5 className="text-xs font-bold text-gray-900 mb-1">{r.title}</h5>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Returns & Shipping Tab */}
            {activeTab === 'returns' && (
              <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed animate-fade-in">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-brand-dark mb-1">Complimentary Doorstep Exchange (7 Days)</h4>
                  <p>
                    We want you to feel completely confident in your purchase. If the size or fit isn't ideal, request an exchange within 7 days of delivery. Our courier will pick up the garment from your doorstep without hassle.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-brand-dark mb-1">Standard & Express Shipping</h4>
                  <p>
                    All prepaid and COD orders are dispatched within 24 to 48 hours. Orders above ₹999 qualify for 100% complimentary express shipping across India.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
