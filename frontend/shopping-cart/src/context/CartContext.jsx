
import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component to wrap the application and provide cart state
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // State to hold cart items

    // Function to add item to the cart
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item._id === product._id);
        if (existingProduct) {
            // Update quantity if product already exists in the cart
            setCart(cart.map((item) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Add new product to the cart
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Function to remove item from the cart
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};