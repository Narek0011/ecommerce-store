import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
  id: number;
  quantity: number;
  title?: string;
  price?: number;
  image_url?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  phone: string;
  setPhone: (phone: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState<string>('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      const savedPhone = localStorage.getItem('phone');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedPhone) setPhone(savedPhone);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, initialized]);

  useEffect(() => {
    if (initialized && phone !== undefined) {
      localStorage.setItem('phone', phone);
    }
  }, [phone, initialized]);

  const addToCart = (product: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart')
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        updateQuantity,
        removeFromCart,
        phone,
        setPhone
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