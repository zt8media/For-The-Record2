import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component that wraps its children with CartContext.Provider
export const CartProvider = ({ children }) => {
  // State to store the cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(cartItem => cartItem.record_id === item.record_id);
      if (existingItem) {
        // If it exists, increment its quantity
        return prevItems.map(cartItem =>
          cartItem.record_id === item.record_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If it doesn't exist, add it to the cart with a quantity of 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart by its ID
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.record_id !== id));
  };

  // Function to increment the quantity of an item in the cart by its ID
  const incrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.record_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement the quantity of an item in the cart by its ID
  const decrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.record_id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // Return the CartContext.Provider with the cart-related functions and state as its value
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
