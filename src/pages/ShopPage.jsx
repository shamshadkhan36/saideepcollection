import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  Star, 
  Search, 
  Heart, 
  ShoppingBag, 
  Eye, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, SIZES, COLORS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUIModal } from '../context/UIModalContext';

export const ShopPage = ({ initialFilter, onSelectProduct }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useUIModal();

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialFilter?.category || 'all');
  const [selectedDepartment, setSelectedDepartment] = useState(initialFilter?.department || null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(4000);
  const [minDiscount, setMinDiscount] = useState(initialFilter?.discountMin || 0);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'newest', 'price-low', 'price-high', 'bestselling'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initialFilter prop if changed from header or category clicks
  useEffect(() => {
    if (initialFilter) {
      if (initialFilter.category) setSelectedCategory(initialFilter.category);
      if (initialFilter.department) setSelectedDepartment(initialFilter.department);
      if (initialFilter.discountMin) setMinDiscount(initialFilter.discountMin);
      if (initialFilter.isNewArrival) setSortBy('newest');
    }
  }, [initialFilter]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDepartment(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(4000);
    setMinDiscount(0);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    search || 
    selectedCategory !== 'all' || 
    selectedDepartment || 
    selectedSizes.length > 0 || 
    selectedColors.length > 0 || 
    priceRange < 4000 || 
    minDiscount > 0 || 
    minRating > 0;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.department.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory && selectedCategory !== 'all') {
        if (selectedCategory === 'Ethnic Wear' && product.category !== 'Ethnic Wear') return false;
        if (selectedCategory === 'Casual Wear' && product.category !== 'Casual Wear') return false;
        if (selectedCategory === 'New Arrivals' && !product.isNewArrival) return false;
        if (['men', 'women', 'kids'].includes(selectedCategory) && product.department !== selectedCategory) return false;
      }

      // Department
      if (selectedDepartment && product.department !== selectedDepartment) {
        return false;
      }

      // Size
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some((c) => selectedColors.includes(c.name));
        if (!hasColor) return false;
      }

      // Price Range
      if (product.price > priceRange) {
        return false;
      }

      // Discount Filter
      if (minDiscount > 0 && product.discount < minDiscount) {
        return false;
      }

      // Rating Filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'bestselling') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured'
    });
  }, [
    search, 
    selectedCategory, 
    selectedDepartment, 
    selectedSizes, 
    selectedColors, 
    priceRange, 
    minDiscount, 
    minRating, 
    sortBy
  ]);

  // Sidebar Filter Form Content
  const FilterContent = () => (
    <div className="space-y-6">
      
      {/* Search Input in Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
          Search Products
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Kurta, Silk, Shirt..."
            className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-red"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2.5">
          Categories
        </label>
        <div className="space-y-1.5 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                setSelectedDepartment(null);
              }}
              className={`w-full text-left py-1.5 px-2.5 rounded-md flex items-center justify-between transition-colors ${
                selectedCategory === cat.name || (cat.id === 'all' && selectedCategory === 'all')
                  ? 'bg-brand-red text-white font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Department Filter (Men, Women, Kids) */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2.5">
          Department
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'men', label: 'Men' },
            { id: 'women', label: 'Women' },
            { id: 'kids', label: 'Kids' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDepartment(selectedDepartment === d.id ? null : d.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                selectedDepartment === d.id
                  ? 'bg-brand-dark border-brand-dark text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
            Max Price:
          </label>
          <span className="text-xs font-bold text-brand-red">
            ₹{priceRange.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="4000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹500</span>
          <span>₹4,000+</span>
        </div>
      </div>

      {/* Size Filter */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2.5">
          Sizes
        </label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-9 h-9 rounded-lg text-xs font-bold border transition-all flex items-center justify-center ${
                selectedSizes.includes(size)
                  ? 'bg-brand-dark border-brand-dark text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2.5">
          Colors
        </label>
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((col) => (
            <button
              key={col.name}
              onClick={() => toggleColor(col.name)}
              className={`flex flex-col items-center p-1.5 rounded-lg border text-center transition-all ${
                selectedColors.includes(col.name)
                  ? 'border-brand-red bg-red-50/50'
                  : 'border-transparent hover:bg-gray-50'
              }`}
              title={col.name}
            >
              <span
                className="w-5 h-5 rounded-full border border-gray-300 shadow-xs mb-1"
                style={{ backgroundColor: col.hex }}
              />
              <span className="text-[9px] text-gray-600 truncate w-full">{col.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
          Minimum Discount
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: 'All', val: 0 },
            { label: '20% or more', val: 20 },
            { label: '35% or more', val: 35 },
            { label: '40% or more', val: 40 },
          ].map((d) => (
            <button
              key={d.val}
              onClick={() => setMinDiscount(d.val)}
              className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                minDiscount === d.val
                  ? 'bg-brand-red border-brand-red text-white font-bold'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
          Customer Rating
        </label>
        <div className="space-y-1.5 text-xs">
          {[
            { label: '4.8 ★ & above', val: 4.8 },
            { label: '4.5 ★ & above', val: 4.5 },
            { label: 'All Ratings', val: 0 },
          ].map((r) => (
            <button
              key={r.val}
              onClick={() => setMinRating(r.val)}
              className={`w-full text-left py-1.5 px-2.5 rounded-md flex items-center justify-between ${
                minRating === r.val
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{r.label}</span>
              {r.val > 0 && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={clearAllFilters}
            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </div>
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-brand-red font-semibold mb-1">
            SAIDEEP CATALOGUE
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark">
            Shop Indian Fashion & Ethnic Wear
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Explore authentic handloom kurtas, premium Egyptian cotton shirts, and designer festive sets.
          </p>
        </div>

        {/* Top Control Bar: Total Count, Active Filter Chips, Sort Dropdown & Mobile Filter Button */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/80 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden bg-brand-dark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span>Filters</span>
            </button>

            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              Showing <strong className="text-brand-dark">{filteredProducts.length}</strong> of {PRODUCTS.length} designs
            </span>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-brand-dark text-xs font-bold py-2 pl-3 pr-8 rounded-lg appearance-none focus:outline-none focus:border-brand-red cursor-pointer"
              >
                <option value="featured">Featured / Trending</option>
                <option value="newest">Sort by Newest</option>
                <option value="price-low">Sort by Price: Low to High</option>
                <option value="price-high">Sort by Price: High to Low</option>
                <option value="bestselling">Best Selling</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-red" />
                <h3 className="text-sm font-serif font-bold text-brand-dark">Filter By</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-brand-red hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>
            <FilterContent />
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red mx-auto flex items-center justify-center mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-dark mb-1">
                  No matching products found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                  Try adjusting your price range, clearing selected filters, or searching for broader terms.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isWish = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-luxury transition-all duration-300 overflow-hidden"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 cursor-pointer">
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
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          />
                        )}

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                          {product.badge && (
                            <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
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
                              ? 'bg-brand-red text-white'
                              : 'bg-white/90 text-gray-700 hover:text-brand-red hover:bg-white'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                        </button>

                        {/* Hover Quick View & Quick Add */}
                        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickView(product);
                            }}
                            className="flex-1 bg-white/95 hover:bg-white text-brand-dark text-xs font-semibold py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors border border-gray-200"
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
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                            <span className="font-semibold uppercase tracking-wider">{product.category}</span>
                            <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>{product.rating}</span>
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

                          <button
                            onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                            className="text-xs font-bold text-brand-dark hover:text-brand-red uppercase tracking-wider"
                          >
                            + ADD
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Slide Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-brand-darker/70 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="text-base font-serif font-bold text-brand-dark">Filter Products</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-400 hover:text-brand-dark p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterContent />
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-brand-red text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
