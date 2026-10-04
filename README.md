# Saideep Collection — Premium Indian Fashion Ecommerce

<div align="center">
  <img src="public/assets/logo_transparent.png" alt="Saideep Collection Logo" width="280"/>
  <p><strong>Style That Speaks For You</strong></p>
  <p>Modern, luxury and fully-responsive Indian clothing ecommerce platform for Saideep Collection.</p>
</div>

---

## 🌟 Brand Style & Architecture
- **Primary Identity**: Authentic Saideep Collection brandmark preserving the signature red interlocking **SC** monogram, inner gold flame, and bespoke script lettering.
- **Color Palette**:
  - Deep Charcoal/Navy: `#111820`
  - Vibrant Red Accent: `#F20D16`
  - Warm Orange/Gold Accent: `#F5A623`
  - Crisp White & Light Cream: `#FFFFFF` / `#FAF8F5`
- **Typography**: Editorial luxury headings (*Playfair Display*, *Cormorant Garamond*) paired with ultra-clean modern ecommerce typography (*Plus Jakarta Sans*, *Inter*).

---

## 🚀 Key Features

### 1. Sticky Professional Header & Navigation
- Slim rotating announcement bar: *"FREE SHIPPING ON ORDERS ABOVE ₹999"*, festive promos, express delivery alerts.
- High-resolution Saideep Collection logo.
- Multi-category navigation: Home, Shop, Men, Women, Kids, New Arrivals, Offers.
- Expandable live search drawer with instant autocomplete and product preview.
- Wishlist drawer with badge count.
- Shopping bag drawer with real-time count and free-shipping progress meter.
- Account profile & order tracking modal.
- Mobile drawer navigation.

### 2. Fashion Hero Section
- Full-bleed Indian couture photography with dark gradient overlays.
- Headline: *"Style That Speaks For You"*.
- Subheading: *"Discover the latest collection from Saideep Collection."*.
- Action CTAs: `SHOP MEN` & `SHOP WOMEN`.
- Trust badges strip: Free Shipping over ₹999, 100% Authentic Indian Craftsmanship, 7-Day Doorstep Returns.

### 3. Shop By Category
- 6 curated category cards:
  - **Men** (Shirts, Kurtas & Jackets)
  - **Women** (Designer Kurtis & Sets)
  - **Kids** (Festive Wear & Modern Casuals)
  - **Ethnic Wear** (Kurtas, Sets & Sarees)
  - **Casual Wear** (Shirts, Tees & Everyday Comfort)
  - **New Arrivals** (Fresh Seasonal Releases)

### 4. Trending Now (Featured Products)
- 8 featured products with original pricing, discount % badges, and ratings:
  1. **Premium Cotton Shirt** – ₹1,299 (Original ₹1,999, 35% OFF)
  2. **Classic Casual Shirt** – ₹999 (Original ₹1,599, 38% OFF)
  3. **Men's Premium Kurta** – ₹1,499 (Original ₹2,499, 40% OFF)
  4. **Designer Women's Kurti** – ₹1,299 (Original ₹1,999, 35% OFF)
  5. **Embroidered Ethnic Set** – ₹1,899 (Original ₹2,999, 37% OFF)
  6. **Premium T-Shirt** – ₹799 (Original ₹1,199, 33% OFF)
  7. **Traditional Wear Set** – ₹1,699 (Original ₹2,699, 37% OFF)
  8. **Festive Collection Kurta** – ₹1,999 (Original ₹3,199, 38% OFF)
- Quick View modal, Wishlist toggle, and Add to Bag directly from grid.

### 5. Multi-Facet Product Filtering & Sorting (Shop Page)
- Live keyword search.
- Category filters (All, Men, Women, Kids, Ethnic Wear, Casual Wear, New Arrivals).
- Department toggles (Men, Women, Kids).
- Size filter multi-select (S, M, L, XL, XXL).
- Color swatch filters (Midnight Navy, Crimson Red, Royal Gold, Ivory White, Onyx Black, etc.).
- Price range slider (₹500 to ₹4,000+).
- Minimum discount filters (20%+, 35%+, 40%+).
- Customer star ratings filter.
- Sorting: Newest Arrivals, Price: Low to High, Price: High to Low, Best Selling, Highest Rated.

### 6. Product Detail Page (PDP)
- Multi-angle gallery with interactive thumbnails and zoom view.
- Color swatches, size selector, and stock availability.
- Quantity counter (+ / -).
- "Add to Bag" and instant "Buy Now" flow.
- Interactive Indian **Size Guide Modal** (Kurtas, Shirts, Kurtis with Chest, Shoulder, Length in inches and cm).
- Real-time **Pincode Delivery Checker** for Indian PIN codes (e.g. 400001, 110001) with estimated delivery dates.
- Fabric care, technical specifications, and 7-day return policy accordion.
- Verified customer reviews with rating submission form.

### 7. Interactive Cart Drawer & Full Cart Page
- Free shipping progress bar (threshold ₹999).
- Promo code engine (`FIRSTORDER` for 10% off, `FESTIVE20` for 20% off, `SAIDEEP10`).
- Variant details (Size, Color), quantity adjustments, item removal.
- Comprehensive breakdown: Subtotal, Shipping, Voucher Discount, Grand Total in ₹.

### 8. Multi-Step Checkout Flow
1. **Contact / Guest Checkout**: Email and phone with SMS OTP readiness.
2. **Shipping Address**: Complete Indian address structure with State dropdown and 6-digit PIN code.
3. **Delivery Method**: Standard Express (Free over ₹999) vs Priority Next-Day Dispatch.
4. **Payment Gateways**:
   - UPI (Google Pay, PhonePe, Paytm, QR Code simulator)
   - Credit / Debit Card (Visa, Mastercard, RuPay)
   - Net Banking (HDFC, ICICI, SBI, Axis, Kotak)
   - Cash on Delivery (COD)
   - Mock Razorpay simulation overlay with authorization animation.

### 9. Order Confirmation & Tracking
- Confirmed order celebration with confetti.
- Unique Order ID (e.g. `SDC-89241`).
- Delivery timeline status (Confirmed -> Handcrafted -> Shipped -> Delivered).
- Interactive Live Tracking modal with courier tracking info.

### 10. Brand Sections
- **Promotional Banner**: "UP TO 40% OFF - LIMITED TIME FESTIVE COLLECTION" with live countdown timer.
- **Brand Story**: "Fashion Made For Every Occasion" highlighting artisanal values.
- **Why Shop With Us**: Premium Quality, Secure Payments, Fast Delivery, Easy Returns.
- **Customer Testimonials**: Verified patrons across Mumbai, Bengaluru, Delhi, Ahmedabad.
- **Instagram Gallery**: Lookbook grid `@saideepcollection`.
- **Newsletter**: "Get 10% Off Your First Order" with instant code reveal (`FIRSTORDER`).
- **Footer**: Full navigation, contact information, store hours, policies, WhatsApp & social links.

---

## 🛠 Tech Stack
- **Framework**: React 18+
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom brand design tokens
- **Icons**: Lucide React + Custom SVG Brand Icons
- **Animation & Effects**: Canvas Confetti, Tailwind keyframe transitions
- **State Management**: React Context API with LocalStorage persistence for Cart, Wishlist, Orders, and User Sessions

---

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/shamshadkhan36/saideepcollection.git
cd saideepcollection

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

© 2026 **Saideep Collection**. All Rights Reserved.
