import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderConfirmationData, OrderPayload, CheckoutFormData } from '../types';
import { getActiveGoogleScriptUrl } from '../config';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSheetsGuideOpen: boolean;
  setIsSheetsGuideOpen: (open: boolean) => void;
  orderConfirmation: OrderConfirmationData | null;
  setOrderConfirmation: (data: OrderConfirmationData | null) => void;
  placeOrder: (formData: CheckoutFormData) => Promise<{ success: boolean; message?: string }>;
  isSubmitting: boolean;
  lastError: string | null;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mi_cafe_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSheetsGuideOpen, setIsSheetsGuideOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const clearError = () => {
    setLastError(null);
  };

  /**
   * Places an order and sends it automatically to Google Sheets via Google Apps Script Web App
   */
  const placeOrder = async (
    formData: CheckoutFormData
  ): Promise<{ success: boolean; message?: string }> => {
    if (cart.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }

    setIsSubmitting(true);
    setLastError(null);

    const now = new Date();
    // Format random readable order ID: MIC-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `MIC-${randomSuffix}`;

    const dateStr = now.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const timeStr = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Formatted items list: e.g. "2x Caramel Macchiato (₹480), 1x Velvet Cappuccino (₹190)"
    const itemsFormatted = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} (₹${item.product.price * item.quantity})`
      )
      .join(', ');

    const total = cartSubtotal;

    const payload: OrderPayload = {
      orderId,
      date: dateStr,
      time: timeStr,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      orderType: formData.orderType,
      tableNumber:
        formData.orderType === 'Dine In'
          ? (formData.tableNumber?.trim() || 'Unassigned')
          : 'Takeaway/Pickup',
      items: itemsFormatted,
      total,
      notes: formData.notes.trim() || 'None',
      status: 'New Order',
    };

    const scriptUrl = getActiveGoogleScriptUrl();
    const isPlaceholderUrl =
      !scriptUrl ||
      scriptUrl.includes('PASTE_GOOGLE_APPS_SCRIPT_URL_HERE') ||
      !scriptUrl.startsWith('http');

    try {
      if (isPlaceholderUrl) {
        // If developer/owner hasn't replaced the placeholder URL yet:
        // We simulate a realistic delay, log the structured order, and succeed cleanly,
        // while informing them how to connect their sheet!
        await new Promise((resolve) => setTimeout(resolve, 800));

        console.info(
          '[MI CAFE Google Sheets Integration] Order Payload ready to send:',
          payload
        );

        setOrderConfirmation({
          orderId,
          total,
          date: dateStr,
          time: timeStr,
          customerName: formData.name,
          orderType: formData.orderType,
          tableNumber: payload.tableNumber,
          items: itemsFormatted,
          savedToGoogleSheets: false,
        });

        // Clear cart after successful order
        clearCart();
        setIsCheckoutOpen(false);
        setIsSubmitting(false);
        return { success: true };
      } else {
        // Submit directly to Google Apps Script Web App
        // Using mode: 'no-cors' to avoid CORS issues with Google Apps Script redirects
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        setOrderConfirmation({
          orderId,
          total,
          date: dateStr,
          time: timeStr,
          customerName: formData.name,
          orderType: formData.orderType,
          tableNumber: payload.tableNumber,
          items: itemsFormatted,
          savedToGoogleSheets: true,
        });

        // Clear cart after successful order
        clearCart();
        setIsCheckoutOpen(false);
        setIsSubmitting(false);
        return { success: true };
      }
    } catch (err: unknown) {
      console.error('Failed to submit order to Google Sheets:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Connection failed. Please check your internet or retry.';
      // KEEP CART on failure!
      setLastError(errorMessage);
      setIsSubmitting(false);
      return { success: false, message: errorMessage };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSheetsGuideOpen,
        setIsSheetsGuideOpen,
        orderConfirmation,
        setOrderConfirmation,
        placeOrder,
        isSubmitting,
        lastError,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
