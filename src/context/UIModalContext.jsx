import React, { createContext, useContext, useState } from 'react';

const UIModalContext = createContext();

export const UIModalProvider = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('saideep_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('saideep_user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('saideep_user');
  };

  return (
    <UIModalContext.Provider
      value={{
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSizeGuideOpen,
        openSizeGuide,
        closeSizeGuide,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UIModalContext.Provider>
  );
};

export const useUIModal = () => {
  const context = useContext(UIModalContext);
  if (!context) throw new Error('useUIModal must be used within UIModalProvider');
  return context;
};
