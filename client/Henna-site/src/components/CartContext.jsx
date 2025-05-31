import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (productToAdd) => {
    setCartItems((items) => {
      const productId = productToAdd._id || productToAdd.id;
      const existingIndex = items.findIndex(
        (item) => (item._id || item.id) === productId
      );

      if (existingIndex > -1) {
        const updatedItems = [...items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: (updatedItems[existingIndex].quantity || 1) + 1,
        };
        return updatedItems;
      } else {
        return [...items, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, qty) => {
    setCartItems((items) =>
      items.map((item) =>
        (item._id || item.id) === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => (item._id || item.id) !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
