import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUIModal } from '../context/UIModalContext';
import { PRODUCTS } from '../data/products';

export const Header = ({ currentView, setCurrentView, onSelectProduct, setShopFilter }) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    isSearchOpen, 
    setIsSearchOpen, 
    isAccountOpen, 
    setIsAccountOpen,
    user 
  } = useUIModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  // Announcement bar items
  const announcements = [
    '✨ FREE SHIPPING ON ORDERS ABOVE ₹999 ✨',
    '🎉 FESTIVE OFFER: USE CODE "FESTIVE20" FOR 20% OFF',
    '⚡ EXPRESS 48-HOUR DISPATCH ON POPULAR ETHNIC WEAR',
  ];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search input handler
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      ).slice(0, 6);
      setSearchResults(matches);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleNavClick = (view, filterObj = null) => {
    setCurrentView(view);
    if (filterObj && setShopFilter) {
      setShopFilter(filterObj);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop', filter: { category: 'all' } },
    { label: 'Men', view: 'shop', filter: { department: 'men' } },
    { label: 'Women', view: 'shop', filter: { department: 'women' } },
    { label: 'Kids', view: 'shop', filter: { department: 'kids' } },
    { label: 'New Arrivals', view: 'shop', filter: { isNewArrival: true } },
    { label: 'Offers', view: 'shop', filter: { discountMin: 35 } },
  ];

  return (
    <>
      {/* Slim Announcement Bar */}
      <div className="bg-brand-dark border-b border-brand-surface/40 text-brand-gold text-[11px] sm:text-xs tracking-widest uppercase font-semibold py-2 px-4 transition-all duration-500 overflow-hidden text-center flex items-center justify-center relative z-40">
        <div className="animate-fade-in flex items-center gap-2">
          <span>{announcements[announcementIndex]}</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/10'
            : 'bg-brand-dark py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Hamburger & Logo Container */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-white/90 hover:text-white p-1 rounded-md focus:outline-none"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Saideep Collection Logo */}
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center group focus:outline-none text-left"
              >
                <div className="relative flex items-center">
                  <img
                    src="/assets/logo_transparent.png"
                    alt="Saideep Collection Logo"
                    className="h-9 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view, link.filter)}
                  className={`text-sm tracking-wide font-medium transition-all duration-200 relative py-1 ${
                    currentView === link.view && (!link.filter || link.label === 'Shop')
                      ? 'text-brand-gold font-semibold'
                      : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.label === 'Offers' && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-brand-red text-white rounded-full tracking-wider animate-pulse-subtle">
                      Sale
                    </span>
                  )}
                  {/* Subtle underline hover effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Header Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Expandable Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-200 hover:text-brand-gold hover:bg-white/5 rounded-full transition-colors flex items-center gap-2 group"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-xs text-gray-400 group-hover:text-gray-200">
                  Search fashion...
                </span>
              </button>

              {/* Wishlist Button with Counter */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-gray-200 hover:text-brand-red hover:bg-white/5 rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 transition-transform hover:scale-110" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-brand-dark animate-fade-in">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account Button */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="p-2 text-gray-200 hover:text-brand-gold hover:bg-white/5 rounded-full transition-colors relative hidden sm:flex items-center"
                aria-label="Account profile"
              >
                <User className="w-5 h-5 transition-transform hover:scale-110" />
                {user && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-brand-dark"></span>
                )}
              </button>

              {/* Shopping Bag / Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-brand-red hover:text-white text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-300 relative group"
                aria-label="Cart drawer"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold group-hover:text-white transition-colors" />
                <span className="text-xs sm:text-sm font-semibold">
                  {totalItemCount}
                </span>
                <span className="hidden md:inline text-xs font-medium text-gray-300 group-hover:text-white">
                  Bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Expandable Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-brand-darker/80 backdrop-blur-md animate-fade-in flex flex-col justify-start pt-16 sm:pt-24 px-4">
          <div className="max-w-2xl mx-auto w-full bg-brand-dark border border-white/15 rounded-2xl p-6 shadow-2xl relative text-white">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center border-b border-brand-surface pb-3 gap-3">
              <Search className="w-6 h-6 text-brand-gold" />
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kurtas, cotton shirts, kurtis, ethnic sets..."
                className="w-full bg-transparent text-lg text-white placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-white uppercase font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Trending Searches */}
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                Popular Searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Premium Kurta', 'Cotton Shirt', 'Ethnic Set', 'Festive Wear', 'T-Shirt', 'Kurti'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="text-xs bg-white/5 hover:bg-brand-red hover:text-white text-gray-300 px-3 py-1 rounded-full border border-white/10 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-4 max-h-80 overflow-y-auto divide-y divide-white/5">
                <p className="text-xs text-brand-gold uppercase tracking-wider font-semibold mb-3">
                  Products Found ({searchResults.length}):
                </p>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsSearchOpen(false);
                    }}
                    className="py-2.5 flex items-center justify-between hover:bg-white/5 px-2 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-md border border-white/10"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs text-gray-400">{product.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="block text-[11px] text-brand-red font-medium">
                        {product.discount}% OFF
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No products found matching "{searchQuery}". Try searching for "Kurta", "Shirt", or "Ethnic".
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-brand-dark h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-white/10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <img
                  src="/assets/logo_transparent.png"
                  alt="Saideep Collection"
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.view, link.filter)}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-gray-200 hover:bg-white/5 hover:text-brand-gold flex items-center justify-between transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.label === 'Offers' && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-brand-red text-white rounded-full">
                        Sale
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full flex items-center gap-3 py-2 px-3 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                <User className="w-5 h-5 text-brand-gold" />
                <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
              </button>
              <div className="text-xs text-gray-400 px-3">
                <p className="font-semibold text-white">Saideep Collection</p>
                <p>Support: +91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
