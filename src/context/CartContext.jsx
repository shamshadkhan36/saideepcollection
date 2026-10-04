import React, { createContext, useContext, useState, useEffect } from 'react';
import { AVAILABLE_COUPONS } from '../data/coupons';
import { useToast } from './ToastContext';

const CartContext = createContext();

const CART_STORAGE_KEY = 'saideep_cart_v1';
const COUPON_STORAGE_KEY = 'saideep_coupon_v1';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    const size = selectedSize || product.sizes[0] || 'Standard';
    const color = selectedColor || product.colors[0] || { name: 'Default', hex: '#111820' };
    const cartItemId = `${product.id}-${size}-${color.name}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          cartItemId,
          product,
          size,
          color,
          quantity,
          addedAt: Date.now(),
        },
      ];
    });

    addToast({
      title: 'Added to Bag',
      message: `${product.name} (Size: ${size}) has been added to your shopping bag.`,
      type: 'success',
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast({
      title: 'Item Removed',
      message: 'Item has been removed from your shopping bag.',
      type: 'info',
    });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: Math.min(newQty, 10) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Financial calculations
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (codeStr) => {
    const code = codeStr.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === code);

    if (!found) {
      addToast({
        title: 'Invalid Coupon',
        message: `Coupon code "${code}" is not valid or expired.`,
        type: 'error',
      });
      return false;
    }

    if (subtotal < found.minOrder) {
      addToast({
        title: 'Minimum Order Not Met',
        message: `Coupon ${found.code} requires a minimum order value of ₹${found.minOrder.toLocaleString('en-IN')}.`,
        type: 'error',
      });
      return false;
    }

    setAppliedCoupon(found);
    addToast({
      title: 'Coupon Applied!',
      message: `Congratulations! ${found.discountPercent}% discount has been applied to your bag.`,
      type: 'success',
    });
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast({
      title: 'Coupon Removed',
      message: 'The promotional code has been removed.',
      type: 'info',
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemCount,
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
        FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
