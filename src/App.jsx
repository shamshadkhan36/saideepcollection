import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIModalProvider } from './context/UIModalContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AccountModal } from './components/AccountModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AboutPage, ContactPage, PolicyView } from './pages/StaticPages';
import { PRODUCTS } from './data/products';

function AppContent() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'order-success' | 'about' | 'contact' | 'policy'
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [shopFilter, setShopFilter] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [activePolicy, setActivePolicy] = useState('shipping-policy');

  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShopWithFilter = (filterObj) => {
    setShopFilter(filterObj);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderPlaced = (orderData) => {
    setActiveOrder(orderData);
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPolicy = (policyKey) => {
    setActivePolicy(policyKey);
    setCurrentView('policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Sticky Professional Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectProduct={navigateToProduct}
        setShopFilter={navigateToShopWithFilter}
      />

      {/* 2. Main Page Views */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomePage
            onSelectCategory={navigateToShopWithFilter}
            onSelectProduct={navigateToProduct}
            onNavigateShop={() => navigateToShopWithFilter({ category: 'all' })}
            onExploreBrand={() => setCurrentView('about')}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            initialFilter={shopFilter}
            onSelectProduct={navigateToProduct}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigateShop={() => setCurrentView('shop')}
            onBuyNow={() => setCurrentView('checkout')}
            onSelectRelatedProduct={navigateToProduct}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onNavigateShop={() => setCurrentView('shop')}
            onProceedToCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onOrderPlaced={handleOrderPlaced}
            onBackToCart={() => setCurrentView('cart')}
          />
        )}

        {currentView === 'order-success' && (
          <OrderSuccessPage
            order={activeOrder}
            onContinueShopping={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onExplore={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}

        {currentView === 'policy' && (
          <PolicyView
            policyType={activePolicy}
            onBack={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* 3. Dark Premium Footer */}
      <Footer
        onNavigate={(view) => {
          if (['shipping-policy', 'return-policy', 'privacy-policy', 'terms'].includes(view)) {
            handleOpenPolicy(view);
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onFilterCategory={navigateToShopWithFilter}
      />

      {/* 4. Global Drawers & Modals */}
      <CartDrawer
        onProceedToCheckout={() => setCurrentView('checkout')}
        onViewCartPage={() => setCurrentView('cart')}
      />

      <WishlistDrawer
        onSelectProduct={navigateToProduct}
      />

      <QuickViewModal
        onSelectProduct={navigateToProduct}
      />

      <SizeGuideModal />

      <AccountModal
        onNavigateOrders={() => {
          // If orders exist, display latest order confirmation
          try {
            const savedOrders = JSON.parse(localStorage.getItem('saideep_orders') || '[]');
            if (savedOrders.length > 0) {
              setActiveOrder(savedOrders[0]);
              setCurrentView('order-success');
            } else {
              setCurrentView('shop');
            }
          } catch (e) {
            setCurrentView('shop');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <UIModalProvider>
            <AppContent />
          </UIModalProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
